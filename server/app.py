# GET /track-complaint
# POST /feedback

# POST /raise-grievience ---- FormData 2sdk - image-text, categorization
# POST /book-ticket

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from db.supabasecrud import create
import random, string

load_dotenv()
 
UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
    
def genRefNo():
    return "".join(random.choices(string.digits, k=6))


app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"], methods=["GET", "POST"], allow_headers=["Content-Type", "Authorization"], supports_credentials=True)

@app.route("/raise-grievance", methods=["POST"])
def raise_grievance():
    name = request.form.get("name")
    phone = request.form.get("phone")
    email = request.form.get("email")
    pnr = request.form.get("pnr")
    grievance_type = request.form.get("grievanceType")
    description = request.form.get("description")

    file = request.files.get("image")
    if file:
        print(f"File received: {file.filename}")
        file.save(os.path.join(UPLOAD_FOLDER, file.filename))
    refno = genRefNo()
    # Save grievance data to Supabase
    data = {
        "date": "2024-08-30",
        "name": name,
        "phone": phone,
        "email": email,
        "pnr": pnr,
        "grievancetype": grievance_type,
        "description": description,
        "file": file.filename if file else "",
        "querytype": "grievance",
        "status": "pending",
        "refno": refno
    }
    create("railmadad", data=data)
    
    return jsonify({"message": "Grievance submitted successfully", "refno": refno})


@app.route("/book-ticket", methods=["POST"])
def book_ticket():
    return jsonify({"message": "Ticket booked successfully"})

if __name__ == "__main__":
    app.run(debug=True)

