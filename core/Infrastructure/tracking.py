import json
from os import X_OK
from typing import List, final
from domain.entity import *

def to_Graph(J_str): # cover array to Graph List_obj  O(n)
    
    #f = open(J_name)
    data = json.loads(J_str)

    List_1 = data["relative-from"]
    List_2 = data["relative-to"]
    
    Graph = dict()

    for i in range(len(List_1)):
        if List_1[i] in Graph:
            (Graph[List_1[i]]).extend([List_2[i]])
        else :
            Graph[List_1[i]] = [List_2[i]]
    for i in range(len(List_1)):
        if List_2[i] in Graph:
            (Graph[List_2[i]]).extend([List_1[i]])
        else :
            Graph[List_2[i]] = [List_1[i]]

    #print(Graph)
    List_obj = list()
    
    for i in Graph:
        a = Node(i)
        List_obj.append(a)
    # input edges in Graph
    for obj in List_obj:
        gr = Graph[obj.id]
        temp = conver(gr, List_obj)
        obj.edges = temp
    return List_obj

def Tracking(gr, id,fi): # O(n^2)
    final_list = []
    num = gr_Search(gr,id)
    if num == -1:
        print("there is no this ID...STOP")
        return
    queue = [] # queue for Graph traversal
    for edge in gr[num].edges:
        queue.append(edge)
        edge.before = gr[num].id
    gr[num].visited = True
    gr[num].filial = 0
    final_list.append(gr[num])
    #print(gr[num])
    while len(queue) !=0:
        vertex = queue[0]
        queue = queue[1:len(queue)]
        if vertex.visited is False:
            vertex.filial = low_filial(vertex.edges) + 1
            vertex.visited = True
            
            if vertex.filial <= fi:
                #print(vertex)
                final_list.append(vertex)
            else:
                continue
            for ed in vertex.edges:
                queue.append(ed)
    return final_list
            
def gr_Search(gr,id):   # return located of id in gr list       O(n)
    for i in range(len(gr)):
        if gr[i].id == id:
            return i
    return -1
    
# conver stuffs in list
def conver(stuffs,lis_obj):     #O(n^2)
    arr = list()
    for stuff in stuffs:
        for obj in lis_obj:
            if stuff == obj.id:
                arr.append(obj)
    return arr

# find the lowest filial 
def low_filial(stuffs):
    low = 100
    for stuff in stuffs:
        if stuff.filial == -1:
            continue
        elif stuff.filial < low:
            low = stuff.filial  
    return low

def before_Tracking(stuffs,fi):    
    for stuff in stuffs:
        if stuff.filial == 0:
            stuff.before = ["0"]
            continue
        low = 100
        temp = []
        if stuff.filial == 0:
            continue
        for edge in stuff.edges:
            if stuff.filial >= (edge.filial + 1) or (int(edge.filial) +1) <= fi:
                temp.append(edge.id)
            stuff.before = temp

def to_json(gr):    # list_obj to json file
    dic = []
    for person in gr:
        if person.filial == -1:
            continue
        dic.append(person.to_dict())
    return json.dumps(dic)


def GetTrackingResult(fi,id,j_str):  # call this function to get json str
    list_obj = to_Graph(j_str)
    final_list = Tracking(list_obj,id,fi)
    del list_obj
    before_Tracking(final_list,fi)
    return to_json(final_list)


