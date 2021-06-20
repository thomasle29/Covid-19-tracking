from . import message
import json
import flask

def ping():
    try:
        return message.buildMessage("pong")
    except:
        return message.buildErrorMessage("ping have error")

def test_json():
    try:
        # print(json.loads(flask.request.data))
        content = json.loads(flask.request.data)
        print(content["data"])
        data = json.loads(content["data"])
        print(data)
        return message.buildMessage("OK")
    except:
        return message.buildErrorMessage("test_json have error")
        
def graphRelativeCompute():
    try:
        content = json.loads(flask.request.data)
        data = json.loads(content["data"])
        print(data)
        return message.buildMessage("OK")
    except:
        return message.buildErrorMessage("graphRelativeCompute func have error")