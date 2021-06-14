import json
from Graph_Ex import *
print("Start...")
js = read_js("list.json")
list_obj = to_Graph(js)
Tracking(list_obj,"004")
print("End...")