class Node:
    def __init__(self, id):
        self.id = id
    id = str()
    edges = []
    before = []
    visited = False
    filial = -1
    def __str__(self):
        return "--ID: " + self.id + "--Filial: " + str(self.filial) + "--Before: " 
    def __eq__(self, other): 
        if not isinstance(other, None):
            return NotImplemented
        return self.id == other.id
    def to_dict(self): 
         return {"person-id": self.id,"person-f-number":self.filial ,"person-before": self.before }
    def edges_list(self):
        lis_edge = []
        for edge in self.edges:
            lis_edge.append(edge.id)
        return lis_edge
        
class Person:
    id = str()
    before = []
    filial = int()
    name = str()
    phone = str()
    bod = int()
    def __init__(self,id, name, phone, bod, before, filial):
        self.id = id
        self.name = name
        self.phone = phone
        self.bod = bod
        self.before = before
        self.filial = filial