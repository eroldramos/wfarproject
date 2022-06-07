from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from core.models import Faculty




def send_email(faculty_id, subject, message, enableUrl=False):
    faculty = Faculty.objects.get(id=faculty_id)
    subject = subject
    email_from = settings.EMAIL_HOST_USER
    html_content = render_to_string('notification_body.html', {
        "faculty": faculty,
        "message": message,
        "enableUrl": enableUrl,

    })
    text_content = strip_tags(html_content)
    recipient_list = [faculty.email]
    msg = EmailMultiAlternatives(subject, text_content, email_from, recipient_list)
    msg.attach_alternative(html_content, "text/html")
    msg.send()
