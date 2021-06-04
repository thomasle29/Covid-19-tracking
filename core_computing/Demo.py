import json
from Graph_Ex import *
print("Start...")
js = read_js("list.json")
list_obj = to_Graph(js)
list_obj[0].filial = 5
list_obj[0].edge[0].filial = 10
for obj in list_obj:
    print(obj)

print("End...")