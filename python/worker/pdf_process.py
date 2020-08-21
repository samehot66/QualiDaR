import io
import re
from pdfminer.converter import TextConverter
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.pdfpage import PDFPage

def extract_text_by_page(pdf_path):
    with open(pdf_path, 'rb') as fh:
        for page in PDFPage.get_pages(fh,
                                      caching=True,
                                      check_extractable=True):
            resource_manager = PDFResourceManager()
            fake_file_handle = io.StringIO()
            converter = TextConverter(resource_manager, fake_file_handle)
            page_interpreter = PDFPageInterpreter(resource_manager, converter)
            page_interpreter.process_page(page)

            text = fake_file_handle.getvalue()
            yield text

            # close open handles
            converter.close()
            fake_file_handle.close()



def extract_text(pdf_path):
    text = []
    for page in extract_text_by_page(pdf_path):
        text.append(page)
    return text

def clean_text(st):
    for i in range(len(st)):
        if '\u0e33' + '\ufffd' in st[i]:
            st[i] = st[i].replace('\u0e33' + '\ufffd', '\u0e33')
        if '\ufffd' in st[i]:
            st[i] = st[i].replace('\ufffd', '\u0e32')
        if '\u0e40' + ' ' in st[i]:
            st[i] = st[i].replace('\u0e40' + ' ', '\u0e40')    
        if '\u0e33' + '\u0e32' in st[i]:
            st[i] = st[i].replace('\u0e33' + '\u0e32', '\u0e33')