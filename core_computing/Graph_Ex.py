import json
from Obj import *


def read_js(j_name): # receiving json and convert to list 
    f = open(j_name)
    data = json.load(f)
    receiving = data["couble"]
    f.close()
    return receiving

def to_Graph(receiving):
    new_li = list()
    for i in range(int(len(receiving)/2)):
        ids = list()
        for number in range(i*2,(i+i)+2):
            ids.append(receiving[number])
        new_li.append(ids)

    Graph = dict()
    for st in new_li:
        if st[0] in Graph:
            (Graph[st[0]]).extend([st[1]])
        else :
            Graph[st[0]] = [st[1]]

    for st in new_li:
        if st[1] in Graph:
            (Graph[st[1]]).extend([st[0]])
        else: 
            Graph[st[1]] = [st[0]]

    List_obj = list()
    for i in Graph:
        List_obj.append(Node(i))
    for i in List_obj:
        X = Graph[i.id]
        big = list()
        for x in X:
            for j in List_obj:
                if x == j.id:
                    big.append(j)
        Node(i).edge.extend(big)
    return List_obj

def Tracking(Gr):
    pass