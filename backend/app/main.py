from fastapi import FastAPI, HTTPException

from app.gemini_service import generate_reply, extract_profile
from app.models import ChatRequest, ChatResponse, RecommendRequest, RecommendResponse, ProfileRequest, ProfileResponse, SendOtpRequest, VerifyOtpRequest, AssessmentAnswerRequest, AssessmentCompleteRequest, TrainingEnrollRequest
from app.recommendation import recommend_courses
from app.supabase_client import supabase

app = FastAPI(
    title="PM-AJAY AI Livelihood Assistant",
    description="MVP backend for livelihood guidance and course recommendations.",
    version="0.1.0",
)


@app.get("/")
def root():
    return {
        "name": "PM-AJAY AI Livelihood Assistant",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
def health():
    return {"status": "ok"}



demo_otps = {}
demo_sessions = {}


@app.post("/api/auth/beneficiary/send-otp")
def send_otp(request: SendOtpRequest):
    mobile = request.mobile

    if not mobile:
        return {
            "success": False,
            "message": "Mobile number is required"
        }

    otp = "123456"
    demo_otps[mobile] = otp

    return {
        "success": True,
        "message": "OTP sent successfully",
        "demo_otp": otp
    }


@app.post("/api/auth/beneficiary/verify-otp")
def verify_otp(request: dict):
    mobile = request.get("mobile")
    otp = request.get("otp")

    if not mobile or not otp:
        return {
            "success": False,
            "message": "Mobile number and OTP are required"
        }

    if demo_otps.get(mobile) != otp:
        return {
            "success": False,
            "message": "Invalid OTP"
        }

    existing = (
        supabase
        .table("beneficiaries")
        .select("id")
        .eq("mobile", mobile)
        .execute()
    )

    if not existing.data:
        supabase.table("beneficiaries").insert({
            "mobile": mobile
        }).execute()

    
    session_token = f"demo-session-{mobile}"
    demo_sessions[session_token] = mobile

    return {
        "success": True,
        "message": "Login successful",
        "mobile": mobile,
        "session_token": session_token
    }

@app.get("/api/beneficiary/profile")
def get_beneficiary_profile(session_token: str):
    mobile = demo_sessions.get(session_token)

    if not mobile:
        return {
            "success": False,
            "message": "Invalid session token"
        }

    result = (
        supabase
        .table("beneficiaries")
        .select("*")
        .eq("mobile", mobile)
        .limit(1)
        .execute()
    )

    if not result.data:
        return {
            "success": True,
            "profile": None,
            "message": "Profile not found"
        }

    return {
        "success": True,
        "profile": result.data[0]
    }

@app.post("/api/assessment/answer")
def save_assessment_answer(request: AssessmentAnswerRequest):
    mobile = demo_sessions.get(request.session_token)

    if not mobile:
        return {
            "success": False,
            "message": "Invalid session token"
        }

    beneficiary_result = (
        supabase
        .table("beneficiaries")
        .select("id")
        .eq("mobile", mobile)
        .limit(1)
        .execute()
    )

    if not beneficiary_result.data:
        return {
            "success": False,
            "message": "Beneficiary not found"
        }

    beneficiary_id = beneficiary_result.data[0]["id"]

    assessment_result = (
        supabase
        .table("assessments")
        .insert({
            "beneficiary_id": beneficiary_id,
            "conversation": {
                "question": request.question,
                "answer": request.answer
            },
            "completed": False
        })
        .execute()
    )

    return {
        "success": True,
        "message": "Assessment answer saved",
        "assessment": assessment_result.data[0]
    }


@app.post("/api/assessment/complete")
def complete_assessment(request: AssessmentCompleteRequest):
    mobile = demo_sessions.get(request.session_token)

    if not mobile:
        return {
            "success": False,
            "message": "Invalid session token"
        }

    beneficiary_result = (
        supabase
        .table("beneficiaries")
        .select("id")
        .eq("mobile", mobile)
        .limit(1)
        .execute()
    )

    if not beneficiary_result.data:
        return {
            "success": False,
            "message": "Beneficiary not found"
        }

    beneficiary_id = beneficiary_result.data[0]["id"]

    result = (
        supabase
        .table("assessments")
        .update({"completed": True})
        .eq("beneficiary_id", beneficiary_id)
        .execute()
    )

    return {
        "success": True,
        "message": "Assessment completed",
        "assessments": result.data
    }
@app.get("/api/beneficiary/assessment")
def get_assessment(session_token: str):
    mobile = demo_sessions.get(session_token)

    if not mobile:
        return {
            "success": False,
            "message": "Invalid session token"
        }

    beneficiary_result = (
        supabase
        .table("beneficiaries")
        .select("id")
        .eq("mobile", mobile)
        .limit(1)
        .execute()
    )

    if not beneficiary_result.data:
        return {
            "success": False,
            "message": "Beneficiary not found"
        }

    beneficiary_id = beneficiary_result.data[0]["id"]

    assessment_result = (
        supabase
        .table("assessments")
        .select("*")
        .eq("beneficiary_id", beneficiary_id)
        .order("created_at", desc=True)
        .limit(1)
        .execute()
    )

    if not assessment_result.data:
        return {
            "success": True,
            "assessment": None,
            "message": "No assessment found"
        }

    return {
        "success": True,
        "assessment": assessment_result.data[0]
    }


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    reply = generate_reply(request.message)
    return ChatResponse(reply=reply)


@app.post("/recommend", response_model=RecommendResponse)
def recommend(request: RecommendRequest):
    profile = {
        "education": request.education,
        "location": request.location,
        "occupation": request.occupation,
        "skills": request.skills,
        "interests": request.interests,
        "employment_preference": request.employment_preference,
    }
    results = recommend_courses(profile)
    return RecommendResponse(recommendations=results)

@app.get("/api/beneficiary/recommendations")
def get_beneficiary_recommendations(session_token: str):
    mobile = demo_sessions.get(session_token)

    if not mobile:
        return {
            "success": False,
            "message": "Invalid session token"
        }

    # Get beneficiary profile
    beneficiary_result = (
        supabase
        .table("beneficiaries")
        .select("*")
        .eq("mobile", mobile)
        .limit(1)
        .execute()
    )

    if not beneficiary_result.data:
        return {
            "success": False,
            "message": "Beneficiary not found"
        }

    beneficiary = beneficiary_result.data[0]

    # Build profile for recommendation engine
    profile = {
        "education": beneficiary.get("education") or "",
        "location": beneficiary.get("location") or "",
        "occupation": beneficiary.get("occupation") or "",
        "traditional_occupation": beneficiary.get("traditional_occupation") or "",
        "skills": beneficiary.get("skills") or [],
        "interests": beneficiary.get("interests") or [],
        "experience": beneficiary.get("experience") or "",
        "employment_preference": beneficiary.get("employment_preference") or "",
        "mobility_constraints": beneficiary.get("mobility_constraints") or "",
        "language": beneficiary.get("language") or "English"
    }

    # Run existing recommendation engine
    results = recommend_courses(profile)

    # Save latest recommendations for this beneficiary
    supabase.table("recommendations").delete().eq(
        "beneficiary_id", beneficiary.get("id")
    ).execute()

    for result in results:
        recommendation_row = {
            "beneficiary_id": beneficiary["id"],
            "course_name": result.get("course_name"),
            "nsqf_level": result.get("nsqf_level",0),
            "score": result.get("score",0),
            "skill_gaps": result.get("skill_gaps", []),
            "employment_type": result.get("employment_type",""),
        }
    

    supabase.table("recommendations").insert(
        recommendation_row
    ).execute()

    return {
        "success": True,
        "recommendations": results
    }


@app.post("/profile", response_model=ProfileResponse)
def profile(request: ProfileRequest):

    mobile = demo_sessions.get(request.session_token)

    if not mobile:
        if not mobile:
            raise HTTPException(
                status_code=401,
                detail="Invalid session token"
            )

    assessment_complete = all([
        request.education,
        request.location,
        request.occupation,
        request.skills,
        request.interests,
        request.employment_preference,
    ])

    row = {
        "education": request.education,
        "location": request.location,
        "occupation": request.occupation,
        "traditional_occupation": request.traditional_occupation,
        "skills": request.skills,
        "interests": request.interests,
        "experience": request.experience,
        "employment_preference": request.employment_preference,
        "mobility_constraints": request.mobility_constraints,
        "language": request.language,
    }

    supabase.table("beneficiaries").update(row).eq(
        "mobile", mobile
    ).execute()

    return ProfileResponse(
        profile=request,
        assessment_complete=assessment_complete,
    )
@app.post("/extract-profile")
def extract_profile_api(request: ChatRequest):
    conversation = request.message

    # Extract profile using Gemini
    profile = extract_profile(conversation)

    # Return the extracted profile
    return {
        "success": True,
        "profile": profile
    }

@app.post("/api/beneficiary/training/enroll")
def enroll_training(request: TrainingEnrollRequest):
    mobile = demo_sessions.get(request.session_token)

    if not mobile:
        return {
            "success": False,
            "message": "Invalid session token"
        }

    beneficiary_response = (
        supabase
        .table("beneficiaries")
        .select("id")
        .eq("mobile", mobile)
        .limit(1)
        .execute()
    )

    if not beneficiary_response.data:
        return {
            "success": False,
            "message": "Beneficiary not found"
        }

    beneficiary = beneficiary_response.data[0]

    training_row = {
        "beneficiary_id": beneficiary["id"],
        "course_name": request.course_name,
        "nsqf_level": request.nsqf_level,
        "status": "enrolled",
        "progress": 0,
        "certificate_status": "not_issued"
    }

    response = (
        supabase
        .table("training_enrollments")
        .insert(training_row)
        .execute()
    )

    return {
        "success": True,
        "message": "Training enrollment successful",
        "training": response.data[0] if response.data else training_row
    }

@app.get("/api/officer/dashboard")
def officer_dashboard():
    # Get beneficiaries
    beneficiaries_response = (
        supabase
        .table("beneficiaries")
        .select("*")
        .order("created_at", desc=True)
        .limit(100)
        .execute()
    )

    beneficiaries = beneficiaries_response.data or []

    # Get assessments
    assessments_response = (
        supabase
        .table("assessments")
        .select("*")
        .order("created_at", desc=True)
        .limit(100)
        .execute()
    )

    assessments = assessments_response.data or []

    # Get training enrollments
    training_response = (
        supabase
        .table("training_enrollments")
        .select("*")
        .order("enrolled_at", desc=True)
        .limit(100)
        .execute()
    )

    trainings = training_response.data or []

    return {
        "success": True,
        "summary": {
            "total_beneficiaries": len(beneficiaries),
            "total_assessments": len(assessments),
            "total_training_enrollments": len(trainings)
        },
        "recent_beneficiaries": beneficiaries[:10],
        "recent_training_enrollments": trainings[:10]
    }