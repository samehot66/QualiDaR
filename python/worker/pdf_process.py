import io
import re
import json
import mysql.connector
from mysql.connector import Error
from pythainlp import correct, sent_tokenize, word_tokenize
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

#def find_phrases(st, keyword):
#    keyword = 'สื่อโฆษณา'  #keyword from users
#    size_word = len(keyword)
#
#    print(f'Keyword: {keyword}\nLength of word: {size_word}')
#
#    matched_setences = []  #store index of matched keyword
#    matched_pages = []
#    p = re.compile(keyword)  #compile pattern of string
#
#    for i in range(len(st)):
#        temp_arr = []
#        for m in p.finditer(st[i]):  #find all position of matched keyword
#            if m is not None:
#                temp_arr.append(m.start())
#                matched_pages.append(i)
#            #matched_pages.append(i)
#            #print(m.start(), m.group())
#        if temp_arr is not None: 
#            matched_setences.append(temp_arr)
    
#    print(f'All matched index: {matched_setences}')

#    for i in matched_pages:
#        for item in matched_setences:  #display sentences that matched keyword
#            for index in item:
#                print(sent_tokenize(st[i][index-50:index+size_word+50]))
#                print(f'Index {index}: {st[i][index-50:index+size_word+50]}')
    #print(f'Keyword: {keyword}')
    
    #matched_setences = []  #store index of matched keyword
    #for item in keyword:
    #    for i in range(len(st)):
            #print(item)
    #        p = re.compile(item)  #compile pattern of string
    #        for m in p.finditer(st[i]):  #find all position of matched keyword
    #            matched_setences.append(m.start())
                #print(m.start(), m.group())
    
    #print(f'All matched index: {matched_setences}')

    #for index in matched_setences:  #display sentences that matched keyword
    #    print(sent_tokenize(st[i][index-50:index+100]))
    #    print(f'Index {index}: {st[i][index-100:index+100]}')

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

def find_phrases(pdfid, pid, keywordgroups, tid, wordlength):
    query_result = []
    try:
        print("Finding phrases start")
        try:
            connection = mysql.connector.connect(host='localhost',
                                         database='testdb',
                                         user='root',
                                         password='Decade65*')
            cursor = connection.cursor()
            for item in keywordgroups:
                #print(item)
                keyword = item['keywordtext']
                kid = item['kid']
                #print(f'keyword {keyword}')
                mySql_select_query = 'SELECT pdf_texts.pdftextid, pdf_texts.page_number, pdf_texts.text FROM pdf_texts JOIN pdffiles ON pdffiles.pdfid = ' + str(pdfid) + ' JOIN projects ON projects.pid = ' + str(pid) + ' WHERE pdf_texts.text LIKE "%' + keyword + '%";'
                cursor.execute(mySql_select_query)
                for (pdftextid, page_number, text) in cursor:
                    j = '{"kid": "' + str(kid) + '", "keyword": "' + str(keyword) + '", "pdftextid": "' + str(pdftextid) + '", "page_number": "' + str(page_number) + '", "text": "' + str(text) + '"}'
                    j = j.replace("'", '"')
                    j = j.replace('\r\n', '')
                    #print(j)
                    temp_json = {}
                    temp_json = json.loads(str(j), strict=False)
                    #print(temp_json)
                    query_result.append(temp_json)
                    #print(f"{str(v)}, {pdftextid}, {page_number}, {text}")
            
            cursor.close()
        except mysql.connector.Error as error:
            print("Failed to select record into pdf_texts table {}".format(error))
        except ValueError as e:
            print(e)
        finally:
            if (connection.is_connected()):
                cursor.close()
                connection.close()
                print("MySQL connection is closed")
        #print(query_result[50]['page_number'])
        print('result')
        #for item in query_result:
        #    print(item)
        #for item in query_result:
        #    temp_text

        for item in query_result:
            page = item['page_number']
            keyword = item['keyword']
            text = item['text']
            kid = item['kid']
            pdftextid = item['pdftextid']
            size_word = len(keyword)
            #print(f'Keyword: {keyword}\nLength of word: {size_word}')
            matched_setences = []  #store index of matched keyword
            p = re.compile(keyword)  #compile pattern of string

            for m in p.finditer(text):  #find all position of matched keyword
             matched_setences.append(m.start())
             #print(m.start(), m.group())
    
            #print(f'All matched index: {matched_setences}')

            for index in matched_setences:  #display sentences that matched keyword
                #print(sent_tokenize(text[index-200:index+size_word+200]))
                print(f'keyword {keyword}, page {page}: {text[index-int(wordlength/2):index+size_word+int(wordlength/2)]}')
                tempJS = '{"start": ' + str(index-int(wordlength/2)) + ', "end": ' + str(index+size_word+int(wordlength/2)) + '}'
                tempJS = tempJS.replace("'", '"')
                kindex = json.dumps(str(tempJS))
                kindex = kindex.replace('\\', '')
                kindex = "'" + kindex[1:]
                kindex = kindex[:len(kindex)-1] + "'"
                #print(kindex)
                try:
                    connection = mysql.connector.connect(host='localhost',
                                         database='testdb',
                                         user='root',
                                         password='Decade65*')
                    cursor = connection.cursor()
                    if(str(text[index-int(wordlength/2):index+size_word+int(wordlength/2)])!='' or  str(text[index-int(wordlength/2):index+size_word+int(wordlength/2)])!=None or str(text[index-int(wordlength/2):index+size_word+int(wordlength/2)])!=' '):
                        mySql_insert_query = 'INSERT INTO phrases (kindex, text, createdAt, updatedAt, tid, pdftextid, kid) VALUES (' + str(kindex) + ', "' + str(text[index-int(wordlength/2):index+size_word+int(wordlength/2)]) + '", CURRENT_TIME(), CURRENT_TIME(), ' + str(tid) + ', ' + str(pdftextid) + ', ' + str(kid) + ');'
                        #print(mySql_insert_query)
                        cursor.execute(mySql_insert_query)
                        connection.commit()
                        #print(cursor.rowcount, "Record inserted successfully into Laptop table")
                    
                    cursor.close()
                except mysql.connector.Error as error:
                    print("Failed to insert record into phrases table {}".format(error))
                finally:
                    if (connection.is_connected()):
                        cursor.close()
                        connection.close()
                        print("MySQL connection is closed")

        # for index in matched_setences:  #display sentences that matched keyword
        #     print(sent_tokenize(st[11][index-50:index+size_word+50]))
        #     print(f'Index {index}: {st[11][index-50:index+size_word+50]}')
        #keyword = 'สื่อโฆษณา'  #keyword from users
        # size_word = len(keyword)

        # print(f'Keyword: {keyword}\nLength of word: {size_word}')

        # matched_setences = []  #store index of matched keyword
        # p = re.compile(keyword)  #compile pattern of string
    
        # for m in p.finditer(st[11]):  #find all position of matched keyword
        #     matched_setences.append(m.start())
        #     #print(m.start(), m.group())
    
        # print(f'All matched index: {matched_setences}')

        # for index in matched_setences:  #display sentences that matched keyword
        #     print(sent_tokenize(st[11][index-50:index+size_word+50]))
        #     print(f'Index {index}: {st[11][index-50:index+size_word+50]}')
    except ValueError as e:
        print(e)