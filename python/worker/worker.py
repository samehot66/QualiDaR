import sys
sys.path.append(sys.path[0] + "/..")

import uuid
from celery import Celery
from time import sleep
from model.utils import TaskStatus, task_dao
from worker.pdf_process import extract_text, clean_text


CELERY_ACCEPT_CONTENT = ["pickle"]

app = Celery("tasks", broker="amqp://admin:mypass@localhost:5673")


@app.task()
def pdf_process(task_id):
    task = task_dao.get_task(uuid.UUID(str(task_id)))
    print(f"Long running operation on task {task.job_definition}")
    try:
        print("Processing start")
        st = extract_text('D:/Project/20190621-bts-ar201819-th.pdf')
        clean_text(st)
        print(st[11])
    except:
        print("an error occur")
    task.job_result = "Task successfully finished."
    print(f"Long running operation finished.")
    print(f"Updating task with id {task.id}...")
    task.task_status = TaskStatus.DONE
    task_dao.update_task(task)
    print(f"Task updated.")
    return task