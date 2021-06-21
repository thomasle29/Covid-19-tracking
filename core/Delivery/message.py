import time
import json

message = {}

def buildMessage(data):
    message['returncode'] = 1
    message['data'] = data
    message['timestamp'] = time.time()
    return json.dumps(message)

def buildErrorMessage(err):
    message['returncode'] = -1
    message['data'] = err
    message['timestamp'] = time.time()
    return json.dumps(message)