import uuid
import json

from flask import Flask, logging, request, jsonify

from model.utils import task_dao
from model.task import Task
from worker.pdf_process import find_phrases

#Ref: https://github.com/golechwierowicz/long_computation_rest

app = Flask(__name__)
log = logging.create_logger(app)
log.setLevel("INFO")


@app.route("/task", methods=["POST"])
def create_task():
    print(request.json)
    data = request.json
    print(data['file'])
    task = Task.create_task()
    task.file_location(data['file'])
    task.pdfid_set(data['pdfid'])
    task_dao.add_task(task)
    log.info(f"Created task: {task}")
    return str(task.id), 201


@app.route("/task/<task_id>", methods=["GET", "PUT", "DELETE"])
def task(task_id):
    try:
        id = uuid.UUID(task_id)
    except ValueError as e:
        log.error(e)
        return "WrongTaskIdFormat", 400
    task = task_dao.get_task(id)
    if task is None:
        return "TaskDoesNotExist", 404
    if request.method == "GET":
        return str(task)
    if request.method == "PUT":
        task.run_task()
        task_dao.update_task(task)
        return "", 202
    if request.method == "DELETE":
        latest_status = task.status
        task_dao.delete_task(task.id)
        return latest_status, 200

@app.route("/findphrases", methods=["POST"])
def findphrases():
    data = request.json
    try:
        print(data['keywordgroups'][0])
        wordlength = int(data['wordlength'])
        pdfid = data['pdfid']
        pid = data['pid']
        keywordgroups = data['keywordgroups'][0]
        tid = data['tid']
        print(keywordgroups[0])
        find_phrases(pdfid, pid, keywordgroups, tid, wordlength)
    except ValueError as e:
        log.error(e)
        return "An error occur!", 500
    return 'Ok', 200