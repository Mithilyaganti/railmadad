# GET /track-complaint
# POST /feedback

# POST /raise-grievience ---- FormData 2sdk - image-text, categorization
# POST /book-ticket
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from db.supabasecrud import create
from dotenv import load_dotenv
load_dotenv()
 # Import the initialized supabase client
import os
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

# Configure CORS (adjust origins as necessary)
origins = [
    "http://localhost:5173",
    
    # Add more origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/raise-grievance")
async def raise_grievance(
    name: str = Form(...),
    phone: str = Form(...),
    email: str = Form(...),
    pnr: str = Form(...),
    grievanceType: str = Form(...),
    description: str = Form(...)
):
    # Save grievance data to Supabase
    data = {
        "name": name,
        "phone": phone,
        "email": email,
        "pnr": pnr,
        "grievanceType": grievanceType,
        "description": description
    }
    
    create("railmadad", data=data)
    # if response.status_code == 201:
    #     return {"message": "Grievance submitted successfully"}
    # else:
    #     return {"error": "Failed to submit grievance"}
    
    return {"message": "Grievance submitted successfully"}
