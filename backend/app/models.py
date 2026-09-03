from typing import List

from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


class RecommendRequest(BaseModel):
    education: str
    location: str
    occupation: str
    skills: List[str]
    interests: List[str]
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

class ProfileRequest(BaseModel):
    education: str
    location: str
    occupation: str
    traditional_occupation: str = ""
    skills: List[str] = []
    interests: List[str] = []
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
