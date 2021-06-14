import json
from os import X_OK
from Obj import *


def read_js(j_name): # receiving json and convert to list 
    f = open(j_name)
    data = json.load(f)
    receiving = data["couble"]
    f.close()
    return receiving

def to_Graph(receiving): # cover array to Graph List_obj
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
    print(Graph)
    List_obj = list()
    
    for i in Graph:
        a = Node(i)
        List_obj.append(a)
    print(List_obj)
    print("---------------")
    # input edges in Graph
    for obj in List_obj:
        gr = Graph[obj.id]
        temp = conver(gr, List_obj)
        obj.edges = temp
    return List_obj

def Tracking(gr, id):
    cycle = 0
    num = gr_Search(gr,id)
    if num == -1:
        print("there is no this ID...STOP")
        return

    
    queue = []
    for edge in gr[num].edges:
        queue.append(edge)
        edge.before = gr[num].id
    gr[num].visited = True
    gr[num].filial = 0
    print(gr[num])
    while len(queue) !=0:
        vertex = queue[0]
        queue = queue[1:len(queue)]
        if vertex.visited is False:
            vertex.filial = low_filial(vertex.edges) + 1
            print(vertex)
            vertex.visited = True
            for ed in vertex.edges:
                ed.before = vertex.id
                queue.append(ed)
            
def gr_Search(gr,id):
    for i in range(len(gr)):
        if gr[i].id == id:
            return i
    return -1

def conver(stuffs,lis_obj):
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