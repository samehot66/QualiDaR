import sys
sys.path.append(sys.path[0] + "/..")
import os
import uuid
#import requests 
import mysql.connector
from mysql.connector import Error
from celery import Celery
from time import sleep
from model.utils import TaskStatus, task_dao
from worker.pdf_process import extract_text, clean_text, clean_text2
from dotenv import load_dotenv
from pathlib import Path

env_path = Path('..') / '.env'
load_dotenv(dotenv_path=env_path)

HOST = os.getenv("HOST")
DATABASE = os.getenv("DATABASE")
USER = os.getenv("USER")
PASSWORD = os.getenv("PASSWORD")
BROKER = os.getenv("BROKER")


CELERY_ACCEPT_CONTENT = ["pickle"]

app = Celery("tasks", broker=BROKER)


@app.task()
def pdf_process(task_id):
    task = task_dao.get_task(uuid.UUID(str(task_id)))
    print(f"Long running operation on task {task.job_definition}")
    try:
        print("Processing start")
        print(task.location)
        st = extract_text(task.location)
        clean_text(st)
        clean_text2(st)
        try:
            connection = mysql.connector.connect(host=HOST,
                                         database=DATABASE,
                                         user=USER,
                                         password=PASSWORD)
            cursor = connection.cursor()

            for i in range(len(st)):
                mySql_insert_query = "INSERT INTO pdf_texts (page_number, text, createdAt, updatedAt, pdfid) VALUES (" + str(i + 1) + ", '" + str(st[i]) + "', CURRENT_TIME(), CURRENT_TIME(), " + str(task.pdfid) + ");"
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