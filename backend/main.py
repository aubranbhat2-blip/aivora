import os
from supabase import create_client, Client
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
SUPABASE_URL = "https://vfyhomysiagpkyfziozb.supabase.co"

SUPABASE_KEY = "sb_publishable_QObbA9HRLnr9LTAtdV0m3Q_XdUDDl-7"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENROUTER_API_KEY = "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"

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {
        "message": "AUBRIX.AI Backend Running 🚀"
    }

def ask_openrouter(system_prompt: str, user_message: str):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    data = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message},
        ],
    }

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers=headers,
        json=data,
    )

    result = response.json()

    if "choices" not in result:
        return f"OpenRouter Error: {result}"

    return result["choices"][0]["message"]["content"]

@app.post("/chat")
def chat(request: ChatRequest):
    try:
        system_prompt = """
You are Kashmiri AI Mentor by AUBRIX.AI.

Guide Kashmiri youth in:
- AI
- ML
- Python
- Careers
- Freelancing
- Resume building
- Roadmaps
- Coding
- Motivation

Reply in simple, friendly language.
"""
        reply = ask_openrouter(system_prompt, request.message)
        return {"reply": reply}

    except Exception as e:
        return {"reply": f"Backend Error: {str(e)}"}

@app.post("/roadmap")
def roadmap(request: ChatRequest):
    try:
        system_prompt = f"""
You are AUBRIX.AI Universal Roadmap Generator.

Your job is to generate personalized roadmaps for ANY field, stream, subject, skill, career, exam, or goal.

IMPORTANT:
Generate roadmap ONLY according to user's exact goal.
Do NOT force AI Engineer roadmap unless the user specifically asks for AI Engineer.

Examples:
- AI Engineer
- Doctor
- UPSC
- NEET
- Businessman
- Freelancer
- Web Developer
- Data Analyst
- Graphic Designer
- Cybersecurity Expert
- YouTuber
- Trader
- Content Creator
- Startup Founder
- CA
- Lawyer
- Software Engineer
- Government Exams
- English Speaking
- Communication Skills
- Public Speaking
- Commerce
- Arts
- Science
- Any school subject
- Any college stream
- Any career path

For every roadmap generate:

1. Career/Goal Title
2. Beginner Explanation
3. Step-by-step roadmap
4. Weekly study plan
5. Skills to learn
6. Tools/platforms/resources
7. Best YouTube channels/websites
8. Real-world projects/tasks
9. Daily routine
10. Career guidance
11. Freelancing/job opportunities if relevant
12. Motivation/advice

User Goal:
{request.message}

Reply in beautiful clean formatting.
"""
        reply = ask_openrouter(system_prompt, request.message)
        return {"reply": reply}

    except Exception as e:
        return {"reply": f"Backend Error: {str(e)}"}
    # AI News Route
@app.post("/news")
def news(request: ChatRequest):
    try:
        system_prompt = """
You are AUBRIX.AI Daily AI News Assistant.

Generate a clean AI news briefing for students.

Include:
1. Top AI updates
2. New AI tools
3. AI career/job trends
4. AI learning opportunities
5. One practical tip for students

Important:
If you don't have real-time internet access, say this is an AI-generated learning briefing, not live news.

Reply in clean formatted text.
"""

        reply = ask_openrouter(system_prompt, request.message)

        return {
            "reply": reply
        }

    except Exception as e:
        return {
            "reply": f"Backend Error: {str(e)}"
        }
    # AI Resume Builder Route
@app.post("/resume")
def resume(request: ChatRequest):
    try:
        system_prompt = """
You are AIVORA Resume Builder by AURIX AI.

Create professional resumes for students and professionals.

Generate:
1. Professional Summary
2. Skills
3. Education
4. Projects
5. Certifications
6. Experience suggestions
7. Clean ATS-friendly formatting
8. Career objective

Make resume modern and professional.
"""

        reply = ask_openrouter(system_prompt, request.message)

        return {
            "reply": reply
        }

    except Exception as e:
        return {
            "reply": f"Backend Error: {str(e)}"
        }
    # AI Interview Simulator Route
@app.post("/interview")
def interview(request: ChatRequest):
    try:
        system_prompt = """
You are AIVORA AI Interview Simulator by AURIX AI.

Help students practice interviews for any field:
- AI/ML
- Web development
- Data science
- Business
- HR
- Government jobs
- Medical
- Freelancing
- Communication skills

Based on the user's input, generate:
1. Interview question
2. Ideal answer
3. Feedback
4. Score out of 10
5. Improvement tips
6. Follow-up question

Keep it practical, friendly, and beginner-friendly.
"""

        reply = ask_openrouter(system_prompt, request.message)

        return {
            "reply": reply
        }

    except Exception as e:
        return {
            "reply": f"Backend Error: {str(e)}"
        }
    # AI Coding Mentor Route
@app.post("/coding")
def coding(request: ChatRequest):
    try:
        system_prompt = """
You are AIVORA AI Coding Mentor by AURIX AI.

Help students with coding in:
- Python
- JavaScript
- React
- Next.js
- FastAPI
- HTML/CSS
- SQL
- Machine Learning

Provide:
1. Simple explanation
2. Bug fixes
3. Corrected code
4. Step-by-step guidance
5. Beginner-friendly tips
"""

        reply = ask_openrouter(system_prompt, request.message)

        return {
            "reply": reply
        }

    except Exception as e:
        return {
            "reply": f"Backend Error: {str(e)}"
        }
    # AI Freelancing Mentor Route
@app.post("/freelancing")
def freelancing(request: ChatRequest):
    try:
        system_prompt = """
You are AIVORA Freelancing Mentor by AURIX AI.

Help students and beginners learn freelancing.

Guide them in:
- Fiverr
- Upwork
- LinkedIn
- client communication
- pricing
- portfolio building
- AI services
- website services
- automation services
- resume services
- content creation
- getting first client

Generate:
1. Simple action plan
2. Best freelancing service ideas
3. Profile improvement tips
4. Client message template
5. Pricing suggestion
6. Weekly plan
7. Motivation

Keep it beginner-friendly, practical, and clear.
"""

        reply = ask_openrouter(system_prompt, request.message)

        return {
            "reply": reply
        }

    except Exception as e:
        return {
            "reply": f"Backend Error: {str(e)}"
        }
    # AI Notes Generator Route
@app.post("/notes")
def notes(request: ChatRequest):
    try:
        system_prompt = """
You are AIVORA AI Notes Generator by AURIX AI.

Generate notes for any topic, subject, chapter, skill, exam, or concept.

Provide:
1. Simple explanation
2. Key points
3. Important definitions
4. Examples
5. Short revision notes
6. Possible exam questions
7. Mini task for practice

Keep it student-friendly, clear, and easy to revise.
"""

        reply = ask_openrouter(system_prompt, request.message)

        return {
            "reply": reply
        }

    except Exception as e:
        return {
            "reply": f"Backend Error: {str(e)}"
        }
    # AI Learning Hub Route
@app.post("/learning")
def learning(request: ChatRequest):
    try:
        system_prompt = """
You are AIVORA AI Learning Coach by AURIX AI.

Help students learn any subject, skill, course, or concept.

Support:
- Python
- AI/ML
- Data Science
- Web Development
- Communication Skills
- School subjects
- College subjects
- Exams
- Career skills

Generate:
1. Simple explanation
2. What to learn first
3. Step-by-step learning path
4. Best resources
5. Practice tasks
6. Mini project ideas
7. Daily study routine
8. Motivation

Keep it beginner-friendly and practical.
"""

        reply = ask_openrouter(system_prompt, request.message)

        return {
            "reply": reply
        }

    except Exception as e:
        return {
            "reply": f"Backend Error: {str(e)}"
        }
@app.post("/signup")
def signup(request: ChatRequest):
    try:
        email = request.message.split("|")[0]
        password = request.message.split("|")[1]

        data = {
            "email": email,
            "password": password
        }

        response = supabase.table("users").insert(data).execute()

        return {
            "reply": "Signup successful",
            "data": response.data
        }

    except Exception as e:
        return {
            "reply": f"Signup Error: {str(e)}"
        }


@app.post("/login")
def login(request: ChatRequest):
    try:
        email = request.message.split("|")[0].strip().lower()
        password = request.message.split("|")[1].strip()

        result = supabase.table("users").select("*").execute()

        for user in result.data:
            db_email = user["email"].strip().lower()
            db_password = user["password"].strip()

            if db_email == email and db_password == password:
                return {"reply": "Login successful"}

        return {
            "reply": "Invalid credentials",
            "debug_users": result.data
        }

    except Exception as e:
        return {"reply": f"Login Error: {str(e)}"}
@app.post("/save-progress")    
def save_progress(request: ChatRequest):
    try:
        email = request.message.split("|")[0]
        goal = request.message.split("|")[1]
        tasks = int(request.message.split("|")[2])
        streak = int(request.message.split("|")[3])

        existing = supabase.table("progress").select("*").eq("email", email).execute()

        data = {
            "email": email,
            "goal": goal,
            "tasks": tasks,
            "streak": streak
        }

        if existing.data:
            supabase.table("progress").update(data).eq("email", email).execute()
        else:
            supabase.table("progress").insert(data).execute()

        return {
            "reply": "Progress saved"
        }

    except Exception as e:
        return {
            "reply": f"Save Progress Error: {str(e)}"
        }
@app.post("/get-progress")    
def get_progress(request: ChatRequest):
    try:
        email = request.message

        result = supabase.table("progress").select("*").eq("email", email).execute()

        if result.data:
            return result.data[0]

        return {
            "goal": "AI Engineer",
            "tasks": 0,
            "streak": 0
        }

    except Exception as e:
        return {
            "reply": f"Get Progress Error: {str(e)}"
        }
@app.post("/save-history")    
def save_history(request: ChatRequest):
    try:
        parts = request.message.split("|||")

        email = parts[0]
        feature = parts[1]
        user_input = parts[2]
        ai_output = parts[3]

        supabase.table("ai_history").insert({
            "email": email,
            "feature": feature,
            "input": user_input,
            "output": ai_output
        }).execute()

        return {
            "reply": "History saved"
        }

    except Exception as e:
        return {
            "reply": f"History Save Error: {str(e)}"
        }
@app.post("/get-history")    
def get_history(request: ChatRequest):
    try:
        parts = request.message.split("|||")

        email = parts[0]
        feature = parts[1]

        result = (
            supabase
            .table("ai_history")
            .select("*")
            .eq("email", email)
            .eq("feature", feature)
            .order("created_at", desc=True)
            .execute()
        )

        return {
            "reply": "History fetched",
            "history": result.data
        }

    except Exception as e:
        return {
            "reply": f"History Fetch Error: {str(e)}",
            "history": []
        }
@app.get("/admin-stats")    
def admin_stats():
    try:
        users = supabase.table("users").select("*").execute()
        progress = supabase.table("progress").select("*").execute()
        history = supabase.table("ai_history").select("*").execute()

        return {
            "users_count": len(users.data),
            "progress_count": len(progress.data),
            "history_count": len(history.data),
            "users": users.data,
            "progress": progress.data,
            "history": history.data
        }

    except Exception as e:
        return {
            "error": str(e)
        }
@app.post("/save-mentor-chat")   
def save_mentor_chat(request: ChatRequest):
    try:
        parts = request.message.split("|||")

        email = parts[0]
        user_message = parts[1]
        ai_reply = parts[2]

        supabase.table("mentor_chats").insert({
            "email": email,
            "user_message": user_message,
            "ai_reply": ai_reply
        }).execute()

        return {"reply": "Mentor chat saved"}

    except Exception as e:
        return {"reply": f"Mentor Chat Save Error: {str(e)}"}


@app.post("/get-mentor-chats")
def get_mentor_chats(request: ChatRequest):
    try:
        email = request.message

        result = (
            supabase
            .table("mentor_chats")
            .select("*")
            .eq("email", email)
            .order("created_at", desc=False)
            .execute()
        )

        return {
            "reply": "Mentor chats fetched",
            "chats": result.data
        }

    except Exception as e:
        return {
            "reply": f"Mentor Chat Fetch Error: {str(e)}",
            "chats": []
        }
@app.post("/mentor-personality")    
def mentor_personality(request: ChatRequest):
    try:
        email = request.message

        progress = (
            supabase
            .table("progress")
            .select("*")
            .eq("email", email)
            .execute()
        )

        if progress.data:
            user = progress.data[0]

            streak = user.get("streak", 0)
            tasks = user.get("tasks", 0)
            goal = user.get("goal", "AI Learning")

            if streak >= 30:
                mood = "🔥 You're unstoppable right now."
            elif streak >= 10:
                mood = "🚀 Your consistency is becoming powerful."
            else:
                mood = "✨ Every small step matters."

            return {
                "message": f"Welcome back champion 🚀\n\nCurrent Focus: {goal}\nTasks Completed: {tasks}\nStreak: {streak} days\n\n{mood}"
            }

        return {
            "message": "Welcome to AIVORA 🚀"
        }

    except Exception as e:
        return {
            "message": f"Personality Error: {str(e)}"
        }
@app.post("/dashboard-insights")    
def dashboard_insights(request: ChatRequest):
    try:
        email = request.message

        progress = supabase.table("progress").select("*").eq("email", email).execute()
        history = supabase.table("ai_history").select("*").eq("email", email).execute()

        user_progress = progress.data[0] if progress.data else {
            "goal": "AI Learning",
            "tasks": 0,
            "streak": 0
        }

        history_items = history.data or []

        feature_count = {}
        for item in history_items:
            feature = item.get("feature", "Unknown")
            feature_count[feature] = feature_count.get(feature, 0) + 1

        most_used = "No activity yet"
        if feature_count:
            most_used = max(feature_count, key=feature_count.get)

        return {
            "goal": user_progress.get("goal", "AI Learning"),
            "tasks": user_progress.get("tasks", 0),
            "streak": user_progress.get("streak", 0),
            "history_count": len(history_items),
            "most_used_feature": most_used,
            "ai_level": "Beginner" if user_progress.get("tasks", 0) < 20 else "Rising Builder" if user_progress.get("tasks", 0) < 50 else "AI Power User",
            "recommendation": f"Continue with {most_used} today and complete one more learning task."
        }

    except Exception as e:
        return {
            "error": str(e)
        }
@app.post("/daily-missions")    
def daily_missions(request: ChatRequest):
    try:
        email = request.message

        progress = (
            supabase
            .table("progress")
            .select("*")
            .eq("email", email)
            .execute()
        )

        user = progress.data[0] if progress.data else {
            "tasks": 0,
            "streak": 0
        }

        tasks = user.get("tasks", 0)
        streak = user.get("streak", 0)

        missions = [
            {
                "title": "Generate an AI Roadmap",
                "reward": "+10 XP",
                "completed": tasks >= 5
            },
            {
                "title": "Complete a Coding Session",
                "reward": "+15 XP",
                "completed": tasks >= 10
            },
            {
                "title": "Use AI Mentor",
                "reward": "+20 XP",
                "completed": streak >= 5
            },
            {
                "title": "Read AI News",
                "reward": "+5 XP",
                "completed": tasks >= 15
            }
        ]

        return {
            "missions": missions,
            "streak": streak,
            "tasks": tasks
        }

    except Exception as e:
        return {
            "missions": [],
            "error": str(e)
        }