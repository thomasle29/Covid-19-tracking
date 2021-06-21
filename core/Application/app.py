import json

def printJson(data):
    print(json)

def computeRelativeGraph(data):
    print(data)

    # test result
    x = [
        {
            "person-id": "6c6b9747-c66a-11eb-9a1e-42010ab80002",
            "person-f-number": 0,
            "person-before": ["0"]
        },
        {
            "person-id": "6c6c3efd-c66a-11eb-9a1e-42010ab80002",
            "person-f-number": 1,
            "person-before": ["1", "2"]
        }
    ]

    # convert into JSON:
    y = json.dumps(x)
    return y
    