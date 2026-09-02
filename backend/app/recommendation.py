import json
from pathlib import Path

COURSES_PATH = Path(__file__).resolve().parent.parent / "data" / "courses.json"

EDUCATION_RANK = {
    "8th": 1,
    "10th": 2,
    "12th": 3,
    "iti": 3,
    "diploma": 4,
    "graduate": 5,
}


def load_courses():
    with open(COURSES_PATH, encoding="utf-8") as f:
        return json.load(f)


def normalize(text):
    return str(text).strip().lower().replace("-", " ").replace("_", " ")


def education_rank(value):
    text = normalize(value)
    for key, rank in EDUCATION_RANK.items():
        if key in text:
            return rank
    return 0


def items_overlap(left, right):
    """True when two phrases are the same or one is contained as whole words."""
    if left == right:
        return True

    left_words = left.split()
    right_words = right.split()
    shorter_words = left_words if len(left_words) <= len(right_words) else right_words
    if len(shorter_words) == 1 and len(shorter_words[0]) < 8:
        return False

    def contains_phrase(phrase_words, hay_words):
        n = len(phrase_words)
        if n == 0:
            return False
        for i in range(len(hay_words) - n + 1):
            if hay_words[i : i + n] == phrase_words:
                return True
        return False

    return contains_phrase(left_words, right_words) or contains_phrase(
        right_words, left_words
    )


def list_match_score(user_items, course_items):
    """Return 0 to 1: how many of the user's items appear in the course list."""
    if not course_items:
        return 0.0
    if not user_items:
        return 0.0

    user_norm = [normalize(item) for item in user_items if item]
    course_norm = [normalize(item) for item in course_items if item]
    matches = 0
    for user_item in user_norm:
        for course_item in course_norm:
            if items_overlap(user_item, course_item):
                matches += 1
                break
    return matches / len(user_norm)


def education_match_score(user_education, minimum_education):
    user_rank = education_rank(user_education)
    required_rank = education_rank(minimum_education)
    if user_rank >= required_rank:
        return 1.0
    if user_rank == required_rank - 1:
        return 0.5
    return 0.0


def employment_match_score(user_preference, course_employment_type):
    pref = normalize(user_preference)
    course_type = normalize(course_employment_type)
    if course_type == "both":
        return 1.0
    if pref == course_type:
        return 1.0
    return 0.0


def demand_score(demand):
    value = normalize(demand)
    if value == "high":
        return 1.0
    if value == "medium":
        return 0.6
    return 0.3


def build_why_recommended(profile, course, parts):
    reasons = []
    if parts["interest"] >= 0.4:
        reasons.append("Matches your stated interests.")
    if parts["skill"] >= 0.4:
        reasons.append("Builds on skills you already have.")
    if parts["education"] >= 1.0:
        reasons.append(
            "Your education meets the minimum requirement ("
            + course["minimum_education"]
            + ")."
        )
    if parts["employment"] >= 1.0:
        reasons.append("Fits your employment preference.")
    if parts["demand"] >= 0.6:
        reasons.append("This course is in " + course["demand"] + " demand.")
    if not reasons:
        reasons.append("This is a nearby option based on overall fit.")
    return " ".join(reasons)


def score_course(profile, course):
    interest = list_match_score(profile["interests"], course["interests"])
    skill = list_match_score(profile["skills"], course["skills"])
    education = education_match_score(profile["education"], course["minimum_education"])
    employment = employment_match_score(
        profile["employment_preference"], course["employment_type"]
    )
    demand = demand_score(course["demand"])

    parts = {
        "interest": interest,
        "skill": skill,
        "education": education,
        "employment": employment,
        "demand": demand,
    }

    total = (
        interest * 0.40
        + skill * 0.25
        + education * 0.15
        + employment * 0.10
        + demand * 0.10
    )
    score = round(total * 100, 1)
    return score, parts


def recommend_courses(profile, top_n=3):
    courses = load_courses()
    ranked = []
    for course in courses:
        score, parts = score_course(profile, course)
        ranked.append(
            {
                "course_name": course["course_name"],
                "sector": course["sector"],
                "nsqf_level": course["nsqf_level"],
                "score": score,
                "why_recommended": build_why_recommended(profile, course, parts),
                "skill_gaps": course["skill_gaps"],
                "employment_type": course["employment_type"],
            }
        )
    ranked.sort(key=lambda item: item["score"], reverse=True)
    return ranked[:top_n]
