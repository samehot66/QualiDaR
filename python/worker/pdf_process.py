import io
import re
from pdfminer3.layout import LAParams, LTTextBox
from pdfminer3.pdfpage import PDFPage
from pdfminer3.pdfinterp import PDFResourceManager
from pdfminer3.pdfinterp import PDFPageInterpreter
from pdfminer3.converter import PDFPageAggregator
from pdfminer3.converter import TextConverter
#from pdfminer.converter import TextConverter
#from pdfminer.pdfinterp import PDFPageInterpreter
#from pdfminer.pdfinterp import PDFResourceManager
#from pdfminer.pdfpage import PDFPage
#from pdfminer.layout import LAParams

def extract_text_by_page(pdf_path):
    with open(pdf_path, 'rb') as fh:
        for page in PDFPage.get_pages(fh,
                                      caching=True,
                                      check_extractable=True):
            resource_manager = PDFResourceManager()
            fake_file_handle = io.StringIO()
            converter = TextConverter(resource_manager, fake_file_handle, codec="tis-620")
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

def clean_text2(st):
    print("Start clean texts 2!")
    for i in range(len(st)):
        if 'า' + 'า' in st[i]:
            st[i] = st[i].replace('า' + 'า', 'ำ')
        if ' ' + 'า' in st[i]:
            st[i] = st[i].replace(' ' + 'า', 'ำ')
        if '' in st[i]:
            st[i] = st[i].replace('', '์')
        if '' in st[i]:
            st[i] = st[i].replace('', '่')
        if '' in st[i]:
            st[i] = st[i].replace('', '้')
        if '' in st[i]:
            st[i] = st[i].replace('', '่')
        if '' in st[i]:
            st[i] = st[i].replace('', '้')
        if '' in st[i]:
            st[i] = st[i].replace('', 'ั')
        if '' in st[i]:
            st[i] = st[i].replace('', '็')
        if '' in st[i]:
            st[i] = st[i].replace('', 'ี')

def clean_text(st):
    print("Start clean texts!")
    for i in range(len(st)):
        #if '\u0e33' + '\ufffd' in st[i]:
        #    st[i] = st[i].replace('\u0e33' + '\ufffd', '\u0e33')
        #if '\ufffd' in st[i]:
        #    st[i] = st[i].replace('\ufffd', '\u0e32')
        #if '\u0e40' + ' ' in st[i]:
        #    st[i] = st[i].replace('\u0e40' + ' ', '\u0e40')    
        #if '\u0e33' + '\u0e32' in st[i]:
        #    st[i] = st[i].replace('\u0e33' + '\u0e32', '\u0e33')
        #if '\u0e32' + '\u0e32' in st[i]:s
        #    st[i] = st[i].replace('\u0e32' + '\u0e32', '\u0e33')
        
        #if '\n' in st[i]:
        #    st[i] = st[i].replace('\n', '')
        #if '\xe0\xb8\xb3' + '\xef\xbf\xbd' in st[i]:
        #    st[i] = st[i].replace('\xe0\xb8\xb3' + '\xef\xbf\xbd', '\xe0\xb8\xb3')
        #if '\xef\xbf\xbd' + '\xe0\xb8\xb3' in st[i]:
        #    st[i] = st[i].replace('\xef\xbf\xbd' + '\xe0\xb8\xb3', '\xe0\xb8\xb3')
        #if '\xe0\xb8\xb3' in st[i]:
        #    st[i] = st[i].replace('\xe0\xb8\xb3', '\xe0\xb8\xb2')
        #if '\xef\xbf\xbd' in st[i]:
        #    st[i] = st[i].replace('\xef\xbf\xbd', '\xe0\xb8\xb2')
        #if '\xe0\xb9\x80' + ' ' in st[i]:
        #    st[i] = st[i].replace('\xe0\xb9\x80' + ' ', '\xe0\xb9\x80')    
        #if '\xe0\xb8\xb3' + '\xe0\xb8\xb2' in st[i]:
        #    st[i] = st[i].replace('\xe0\xb8\xb3' + '\xe0\xb8\xb2', '\xe0\xb8\xb3')
        #if '\xe0\xb8\xb2' + '\xe0\xb8\xb2' in st[i]:
        #    st[i] = st[i].replace('\xe0\xb8\xb2' + '\xe0\xb8\xb2', '\xe0\xb8\xb3')
        #if '\xef\x9c\x82' in st[i]:
        #    st[i] = st[i].replace('\xef\x9c\x82', '\xe0\xb8\xb5')
        #if '\xef\x9c\x8a' in st[i]:
        #    st[i] = st[i].replace('\xef\x9c\x8a', '\xe0\xb9\x88')
        #if '\xef\x9c\x92' in st[i]:
        #    st[i] = st[i].replace('\xef\x9c\x92', '\xe0\xb9\x87')
        #if '\xef\x9c\x8b' in st[i]:
        #    st[i] = st[i].replace('\xef\x9c\x8b', '\xe0\xb9\x89')
        if 'ำ' in st[i]:
            st[i] = st[i].replace('ำ', 'า')
        #if '�' + 'า' in st[i]:
        #    st[i] = st[i].replace('�' + 'า', 'ำ')
        if '�' in st[i]:
            st[i] = st[i].replace('�', 'า')
        if '' in st[i]:
            st[i] = st[i].replace('', '่')
        if '' in st[i]:
            st[i] = st[i].replace('', '่')
        if '' in st[i]:
            st[i] = st[i].replace('', '้')
        if '' in st[i]:
            st[i] = st[i].replace('', '้')
        if '' in st[i]:
            st[i] = st[i].replace('', '์')
        if '' in st[i]:
            st[i] = st[i].replace('', 'ี')
        if '' in st[i]:
            st[i] = st[i].replace('', '็')
        #if '\xef\x80\x97' in st[i]:
        #    st[i] = st[i].replace('\xef\x80\x97', '\xe0\xb9\x8c')

        #st[i] = st[i].replace('\uf70b','้').replace('\uf70a','่').replace('\uf70e','์').replace('\uf702','ี').replace('\uf710','ั').replace('\uf712','็').replace('\uf70c','๊').replace('\x0c','\n').replace('\uf06c','*').replace('\uf701','ิ').replace('\uf705','่').replace('\uf0a7','*').replace('\uf713','่').replace(' ำ','ำ').replace('�','า').replace('ำา','ำ')