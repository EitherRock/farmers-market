from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware

import boto3
from botocore.exceptions import BotoCoreError, ClientError

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import os
from dotenv import load_dotenv

load_dotenv()

EMAIL_TO = os.getenv('EMAIL_TO')
EMAIL_FROM = os.getenv('EMAIL_FROM')
EMAIL_PASS = os.getenv('EMAIL_PASSWORD')
ACCESS_KEY = os.getenv('ACCESS_KEY')
SECRET_KEY = os.getenv('SECRET_KEY')
AWS_REGION = "us-east-2"


app = FastAPI()

origins = [
    'http://localhost',
    "http://frontend",
    "http://nlesmann.site",
    "https://nlesmann.site",
    "https://www.nlesmann.site"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

client = boto3.client(
    'ses',
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
    region_name=AWS_REGION
)

class ContactForm(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ResourceFile(BaseModel):
    file_name: str

def send_mail(form_data: ContactForm):
    msg = MIMEMultipart()
    msg['From'] = EMAIL_FROM
    msg['To'] = EMAIL_TO
    msg['Subject'] = form_data.subject

    body = f'Name: {form_data.name}\nEmail: {form_data.email}\nMessage:\n{form_data.message}'
    msg.attach(MIMEText(body, 'plain'))

    try:
        response = client.send_raw_email(
            Source="lesmann.dev@gmail.com",
            Destinations=["nathanlesmann@gmail.com"],
            RawMessage={"Data": msg.as_string()},
        )
        print("Email sent! Message ID:", response["MessageId"])

    except (BotoCoreError, ClientError) as e:
        print("Error sending email:", e)

@app.options("/api/send-email")
async def handle_options():
    return {}

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