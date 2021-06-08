import time
import json

message = {}

def buildMessage(data):
    message['ReturnCode'] = 1
    message['data'] = data
    message['Timestamp'] = time.time()
    return json.dumps(message)

def buildErrorMessage(err):
    message['ReturnCode'] = -1
    message['data'] = err
    message['Timestamp'] = time.time()
    return json.dumps(message)