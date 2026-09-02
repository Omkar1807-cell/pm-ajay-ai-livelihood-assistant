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
