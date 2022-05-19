from django.shortcuts import render
from reportlab.pdfgen import canvas
from reportlab.platypus import Image
from datetime import datetime
from reportlab.lib.units import inch

from tkinter import CENTER, Image
from tkinter.ttk import Style
from tkinter import CENTER
from django.shortcuts import render
from datetime import datetime
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.platypus import Paragraph, Spacer, Image
from reportlab.lib.units import cm, inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate
from reportlab.platypus import TableStyle
from reportlab.platypus import Table
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from django.utils import timezone
import PIL.Image
from reportlab.rl_config import defaultPageSize
from django.db.models import Q
from io import BytesIO
from reportlab.lib.units import mm
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
import datetime


class PageNumCanvas(canvas.Canvas):
    """
    http://code.activestate.com/recipes/546511-page-x-of-y-with-reportlab/
    http://code.activestate.com/recipes/576832/
    """
    #----------------------------------------------------------------------

    def __init__(self, *args, **kwargs):
        """Constructor"""
        canvas.Canvas.__init__(self, *args, **kwargs)
        self.pages = []

    #----------------------------------------------------------------------
    def showPage(self):
        """
        On a page break, add information to the list
        """
        self.pages.append(dict(self.__dict__))
        self._startPage()

    #----------------------------------------------------------------------
    def save(self):
        """
        Add the page number to each page (page x of y)
        """
        page_count = len(self.pages)

        for page in self.pages:
            self.__dict__.update(page)
            self.draw_page_number(page_count)
            canvas.Canvas.showPage(self)

        canvas.Canvas.save(self)

    #----------------------------------------------------------------------
    def draw_page_number(self, page_count):
        """
        Add the page number
        """
        page = "Page %s of %s" % (self._pageNumber, page_count)
        now = datetime.datetime.now()
        now_text = now.strftime("%m/%d/%Y %I:%M:%S %p")
        extra = ("Generated on "+now_text)
        self.setFont("Helvetica", 9)
        self.drawString(inch, 0.85 * inch, page)
        self.drawString(inch, 0.70 * inch, extra)
