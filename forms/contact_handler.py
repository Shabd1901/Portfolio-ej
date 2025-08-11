# Alternative lightweight contact handler for static hosting
# This can be used with serverless functions (Netlify Functions, Vercel API Routes)

import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime

def handler(event, context):
    """
    Serverless function handler for contact form
    Compatible with Netlify Functions and Vercel API Routes
    """
    
    # Handle CORS
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    }
    
    # Handle preflight requests
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    try:
        # Parse request body
        body = json.loads(event.get('body', '{}'))
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if not body.get(field):
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': f'{field} is required'})
                }
        
        name = body['name']
        email = body['email']
        subject = body['subject']
        message = body['message']
        
        # Email configuration from environment variables
        smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        email_address = os.environ.get('EMAIL_ADDRESS')
        email_password = os.environ.get('EMAIL_PASSWORD')
        recipient_email = os.environ.get('RECIPIENT_EMAIL', 'shabdansh@example.com')
        
        if not email_address or not email_password:
            return {
                'statusCode': 500,
                'headers': headers,
                'body': json.dumps({'error': 'Email configuration missing'})
            }
        
        # Create email message
        msg = MIMEMultipart()
        msg['From'] = email_address
        msg['To'] = recipient_email
        msg['Subject'] = f"Portfolio Contact: {subject}"
        
        # Email body
        email_body = f"""
        New contact form submission from your portfolio:
        
        Name: {name}
        Email: {email}
        Subject: {subject}
        
        Message:
        {message}
        
        ---
        Sent at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        """
        
        msg.attach(MIMEText(email_body, 'plain'))
        
        # Send email
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(email_address, email_password)
        text = msg.as_string()
        server.sendmail(email_address, recipient_email, text)
        server.quit()
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'message': 'Email sent successfully'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': 'Internal server error'})
        }

# For Vercel API Routes, export as default
def default(request):
    """Vercel API Route handler"""
    if request.method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            }
        }
    
    # Convert Vercel request to event format
    event = {
        'httpMethod': request.method,
        'body': request.body.decode('utf-8') if request.body else '{}'
    }
    
    return handler(event, {})
