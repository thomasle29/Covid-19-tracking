from . import message
from Application import app
import json
import flask

def ping():
    try:
        return message.buildMessage("pong")
    except:
        return message.buildErrorMessage("ping have error")
        
def graphRelativeCompute():
    try:
        content = json.loads(flask.request.data)
        log = app.computeRelativeGraph(content)

        if log != None:
            return message.buildMessage(log)
            # return message.buildMessage("OK")

        return message.buildMessage("No result")
    except:
        return message.buildErrorMessage("graphRelativeCompute func have error")