import sys
sys.path.append(sys.path[0] + "/..")

import uuid
#import requests 
import mysql.connector
from mysql.connector import Error
from celery import Celery
from time import sleep
from model.utils import TaskStatus, task_dao
from worker.pdf_process import extract_text, clean_text, clean_text2


CELERY_ACCEPT_CONTENT = ["pickle"]

app = Celery("tasks", broker="amqp://admin:mypass@localhost:5673")


@app.task()
def pdf_process(task_id):
    task = task_dao.get_task(uuid.UUID(str(task_id)))
    print(f"Long running operation on task {task.job_definition}")
    try:
        print("Processing start")
        print(task.location)
        st = extract_text(task.location)
<<<<<<< HEAD
<<<<<<< HEAD
        #clean_text(st)
        #clean_text2(st)
=======
        clean_text(st)
        clean_text2(st)
>>>>>>> origin/master
=======
        #clean_text(st)
        #clean_text2(st)
>>>>>>> origin/master
        try:
            connection = mysql.connector.connect(host='localhost',
                                         database='testdb',
                                         user='root',
                                         password='Decade65*')
            cursor = connection.cursor()

            for i in range(len(st)):
<<<<<<< HEAD
                mySql_insert_query = "INSERT INTO pdf_texts (page_number, text, createdAt, updatedAt, pdfid) VALUES (" + str(i + 1) + ", '" + st[i].decode(encoding='utf-8',errors="ignore") + "', CURRENT_TIME(), CURRENT_TIME(), " + str(task.pdfid) + ");"
=======
                mySql_insert_query = "INSERT INTO pdf_texts (page_number, text, createdAt, updatedAt, pdfid) VALUES (" + str(i + 1) + ", '" + str(st[i]) + "', CURRENT_TIME(), CURRENT_TIME(), " + str(task.pdfid) + ");"
>>>>>>> origin/master
                cursor.execute(mySql_insert_query)
                connection.commit()
                print(cursor.rowcount, "Record inserted successfully into Laptop table")
            
            cursor.close()
        except mysql.connector.Error as error:
            print("Failed to insert record into pdf_texts table {}".format(error))
        finally:
            if (connection.is_connected()):
                cursor.close()
                connection.close()
                print("MySQL connection is closed")
        #for i in range(len(st)):
        #    print(st[i])
        #r = requests.post(url = API_ENDPOINT, json = st, headers=headers, verify=False)
        #print(r.text)
    except ValueError as e:
        print(e)
    
    #find_phrases(st, ['สื่อโฆษณา', 'ด้านสิ่งแวดล้อม', 'ด้านสังคม'])
    task.job_result = "Task successfully finished."
    print(f"Long running operation finished.")
    print(f"Updating task with id {task.id}...")
    task.task_status = TaskStatus.DONE
    task_dao.update_task(task)
    print(f"Task updated.")
    return task