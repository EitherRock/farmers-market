from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = FastAPI()

origins = [
    "http://localhost:5173",
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

def send_mail(form_data: ContactForm):
    sender_email = 'lesmann.dev@gmail.com'
    # receiver_email = 'nathanlesmann@gmail.com'
    receiver_email = 'magpiemeadowsnwa@gmail.com'
    password = 'wzzz buyh qybw uylj'

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