from fastapi import FastAPI

from app.gemini_service import generate_reply
from app.models import ChatRequest, ChatResponse, RecommendRequest, RecommendResponse, ProfileRequest, ProfileResponse
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
@app.post("/profile", response_model=ProfileResponse)
def profile(request: ProfileRequest):
    assessment_complete = all([
        request.education,
        request.location,
        request.occupation,
        request.skills,
        request.interests,
        request.employment_preference,
    ])

    # Save beneficiary profile to Supabase
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

    supabase.table("beneficiaries").insert(row).execute()

    return ProfileResponse(
        profile=request,
        assessment_complete=assessment_complete,
    )