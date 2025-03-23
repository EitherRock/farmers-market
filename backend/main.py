from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import os
from dotenv import load_dotenv

load_dotenv()

EMAIL_TO = os.getenv('EMAIL_TO')
EMAIL_FROM = os.getenv('EMAIL_FROM')
EMAIL_PASS = os.getenv('EMAIL_PASSWORD')


app = FastAPI()

origins = [
    'http://localhost:3000',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

class ContactForm(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ResourceFile(BaseModel):
    file_name: str

def send_mail(form_data: ContactForm):
    sender_email = EMAIL_FROM
    receiver_email = EMAIL_TO
    password = EMAIL_PASS

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = form_data.subject

    body = f'Name: {form_data.name}\nEmail: {form_data.email}\nMessage:\n{form_data.message}'
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, password)
        text = msg.as_string()
        server.sendmail(sender_email, receiver_email, text)
        server.quit()
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f'Error sending email: {str(e)}'
        )
    
@app.post('/api/send-email')
async def send_email_route(form_data: ContactForm):
    try:
        send_mail(form_data)
        return JSONResponse(
            status_code=200, 
            content={'message': 'Email sent successfully!'}
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f'Error sending email: {str(e)}'
        )
    
@app.get('/api/download/{file_name}')
async def download_file(file_name):
    file_path = f'backend/resources/{file_name}'
    if os.path.exists(file_path):
        return FileResponse(file_path, filename=file_name, media_type="application.octet-stream")
    
    return {"error": "File not found"}