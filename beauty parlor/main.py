from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector

app = FastAPI()

# ✅ CORS (frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ DATABASE CONNECTION
try:
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",   # 👉 your MySQL password
        database="salon"
    )
    cursor = db.cursor(dictionary=True)
    print("✅ Database Connected Successfully")

except Exception as e:
    print("❌ Database Connection Error:", e)

# =========================
# 📦 MODELS
# =========================

class SignupUser(BaseModel):
    name: str
    email: str
    password: str

class LoginUser(BaseModel):
    email: str
    password: str

# 📦 APPOINTMENT MODEL
class Appointment(BaseModel):
    name: str
    email: str
    phone: str
    date: str
    time: str
    service: str
    message: str


# =========================
# 🏠 HOME ROUTE
# =========================

@app.get("/")
def home():
    return {"message": "Salon Backend Running 🚀"}


# =========================
# ✅ SIGNUP API
# =========================

@app.post("/signup")
def signup(user: SignupUser):
    try:
        cursor.execute("SELECT * FROM users WHERE email=%s", (user.email,))
        existing = cursor.fetchone()

        if existing:
            return {"status": "exists"}

        cursor.execute(
            "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
            (user.name, user.email, user.password)
        )
        db.commit()

        return {"status": "success"}

    except Exception as e:
        print("ERROR:", e)
        return {"status": "error", "message": str(e)}


# =========================
# ✅ LOGIN API
# =========================

@app.post("/login")
def login(user: LoginUser):
    try:
        cursor.execute(
            "SELECT * FROM users WHERE email=%s AND password=%s",
            (user.email, user.password)
        )
        result = cursor.fetchone()

        if result:
            return {
                "status": "success",
                "name": result["name"]
            }
        else:
            return {"status": "fail"}

    except Exception as e:
        print("ERROR:", e)
        return {"status": "error", "message": str(e)}


# =========================
# ✅ CREATE APPOINTMENT
# =========================

@app.post("/appointments")
def create_appointment(app_data: Appointment):
    try:
        cursor.execute(
            "INSERT INTO appointments (name, email, phone, date, time, service, message) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (
                app_data.name,
                app_data.email,
                app_data.phone,
                app_data.date,
                app_data.time,
                app_data.service,
                app_data.message
            )
        )
        db.commit()

        return {"status": "success"}

    except Exception as e:
        print("ERROR:", e)
        return {"status": "error", "message": str(e)}


# =========================
# ✅ GET ALL APPOINTMENTS (ADMIN)
# =========================

@app.get("/appointments")
def get_appointments():
    try:
        cursor.execute("SELECT * FROM appointments")
        data = cursor.fetchall()
        return data

    except Exception as e:
        print("ERROR:", e)
        return {"status": "error"}