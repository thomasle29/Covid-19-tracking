class Node:
    def __init__(self, id):
        self.id = id
    id = str()
    edge = list()
    before = str()
    visited = False
    filial = -1
    def __str__(self):
        return "--ID: " + self.id + "--Filial: " + str(self.filial)
    def __eq__(self, other): 
        if not isinstance(other, None):
            return NotImplemented
        return self.id == other.id
     
class Person:
    id = str()
    before = str()
    filial = int()
    name = str()
    phone = str()
    bod = int()
    before = str()
    filial = int()
    def __init__(self,id, name, phone, bod, before, filial):
        self.id = id
        self.name = name
        self.phone = phone
        self.bod = bod
        self.before = before
        self.filial = filial