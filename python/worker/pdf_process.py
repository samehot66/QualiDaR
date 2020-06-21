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
        st[i] = st[i].replace('\uf70b','้').replace('\uf70a','่').replace('\uf70e','์').replace('\uf702','ี').replace('\uf710','ั').replace('\uf712','็').replace('\uf70c','๊').replace('\x0c','\n').replace('\uf06c','*').replace('\uf701','ิ').replace('\uf705','่').replace('\uf0a7','*').replace('\uf713','่').replace(' ้า','้ำ').replace('�','ำ').replace(' า','ำ').replace(' ่า','่ำ').replace(' ำ','ำ')
    
    if '\u0e33' in st[i]:
        st[i] = st[i].replace('\u0e33', 'า')

    if ' ' + '\u0e33' in st[i]:
        st[i] = st[i].replace(' ' + '\u0e33', 'ำ')

    if ' '+'\u0e32' in st[i]:
        st[i] = st[i].replace(' '+'\u0e32', 'ำ')

    if ' '+'\u0e49'+'\u0e32' in st[i]:
        st[i] = st[i].replace(' '+'\u0e49'+'\u0e32', '้ำ')
        
    if 'า' + 'า' in st[i]:
        st[i] = st[i].replace('า' + 'า', 'ำ')