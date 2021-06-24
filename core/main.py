import flask
import json
from Config.Server import config
from Delivery import handler
from Infrastructure.tracking import *
app = flask.Flask(config.SERVER_NAME)
app.config["DEBUG"] = True

app = handler.setup(app)
app.run(host="0.0.0.0", port=config.PORT)
#a = '{"relative-from": ["001" ,"004" ,"001","003","005","005","005","004" ,"008" ,"010" ,"010","007","020","021"] ,"relative-to":["002","008" , "003", "004", "008", "007", "006", "007", "001", "006", "007", "002", "010","020"]   }'
#print(GetTrackingResult(3,"002",a))