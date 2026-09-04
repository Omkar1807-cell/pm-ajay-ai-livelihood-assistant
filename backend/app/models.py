from typing import List
from pydantic import BaseModel, Field


# -----------------------------
# CHAT
# -----------------------------

class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


# -----------------------------
# AUTHENTICATION
# -----------------------------

class SendOtpRequest(BaseModel):
    mobile: str


class VerifyOtpRequest(BaseModel):
    mobile: str
    otp: str


# -----------------------------
# RECOMMENDATION
# -----------------------------

class RecommendRequest(BaseModel):
    session_token: str
    education: str
    location: str
    occupation: str
    skills: List[str] = Field(default_factory=list)
    interests: List[str] = Field(default_factory=list)
    employment_preference: str


class RecommendationItem(BaseModel):
    course_name: str
    sector: str
    nsqf_level: int
    score: float
    why_recommended: str
    skill_gaps: List[str]
    employment_type: str


class RecommendResponse(BaseModel):
    recommendations: List[RecommendationItem]


# -----------------------------
# BENEFICIARY PROFILE
# -----------------------------

class ProfileRequest(BaseModel):
    session_token: str 
    education: str
    location: str
    occupation: str
    traditional_occupation: str = ""
    skills: List[str] = Field(default_factory=list)
    interests: List[str] = Field(default_factory=list)
    experience: str = ""
    employment_preference: str
    mobility_constraints: str = ""
    language: str = "English"


class ProfileResponse(BaseModel):
    profile: ProfileRequest
    assessment_complete: bool
    assessment_score: float = 0.0
    assessment_rank: int = 0
    assessment_rank_percentile: float = 0.0
    assessment_rank_percentile_formatted: str = ""
    assessment_rank_percentile_formatted_with_percent: str = ""


# -----------------------------
# ASSESSMENT
# -----------------------------

class AssessmentAnswerRequest(BaseModel):
    session_token: str
    question: str
    answer: str


class AssessmentCompleteRequest(BaseModel):
    session_token: str

class TrainingEnrollRequest(BaseModel):
    session_token: str
    course_name: str
    nsqf_level: int = 0