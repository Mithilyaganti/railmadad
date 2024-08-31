from flask import Flask, request, jsonify
from flask_cors import CORS
import os, sys
from dotenv import load_dotenv, dotenv_values
load_dotenv()
from db.supabasecrud import create, get_by_column
import random, string
import google.generativeai as genai

# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
# import Department_mapping.keyword_desc as kd

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash"
)


 
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
    grievance_type = request.form.get("grievancetype")
    description = request.form.get("description")
    
    file = request.files.get("image")
    if file:
        print(f"File received: {file.filename}")
        file.save(os.path.join(UPLOAD_FOLDER, file.filename))
    refno = genRefNo()
    
    # dept = kd.departments(os.path.join(UPLOAD_FOLDER, file.filename), description)
    dept = "railways"
    
    data = {
        "name": name,
        "phone": phone,
        "email": email,
        "pnr": pnr,
        "grievancetype": grievance_type,
        "description": description,
        "file": file.filename if file else "",
        "querytype": "grievance",
        "status": "pending",
        "refno": refno,
        "department": dept if dept else "railways"
    }

    # print(data)
    
    try:
        create("railmadad", data=data)
        return jsonify({"success": True,"message": "Grievance submitted successfully", "refno": refno})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})


@app.route("/book-ticket", methods=["POST"])
def book_ticket():
    refno = genRefNo()
    print(request.form)
    return jsonify({"success": True, "message": "Ticket booked successfully", "refno": refno})

@app.route("/track-complaint", methods=["GET"])
def track_complaint():
    refno = request.args.get("refno")
    try:
        complaint = get_by_column("railmadad", "refno", refno)
        if complaint is None or len(complaint) == 0:
            return jsonify({"success": False, "message": "Complaint not found"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})
    
    return jsonify({
        "success": True, 
        "message": "Complaint found, please wait while being processed", 
        "data": complaint
    })

@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.json
    user_message = data.get("message")

    if not user_message:
        return jsonify({"success": False, "message": "No message provided"})

    try:
        response = model.generate_content(f"You are a Railmadad Chatbot of Indian Railways. you respond to user queries related to railways.If the user has any queries related to railways, you can respond to them. If the user has query not related to railways, grace fully repond with 'I am a Railmadad Chatbot of Indian Railways. I respond to user queries related to railways. If you have any queries related to railways, I can respond to them.' here is the user query: {user_message}, please respond to the user query in html format so that it can be displayed using dangerouslySetInnerHTML in react, only use h3, br, p, strong tags, dont give markdown.") 
        aires = response.text[7:-5]
        return jsonify({"success": True, "response": aires})

    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

if __name__ == "__main__":
    app.run(debug=True)

