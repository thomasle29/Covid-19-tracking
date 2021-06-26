import json
from Infrastructure import tracking

def printJson(data):
    print(json)

def computeRelativeGraph(data):
    resRelative = json.dumps(data['person-relative'])

    try:
        resultTracking = tracking.GetTrackingResult(data['number-of-f'], data['person-id'], resRelative)
    except:
        print('GetTrackingResult get error')

    # print(resultTracking)

    # # test result
    # x = [
    #     {
    #         # A Dang Anh An
    #         "person-id": "6c629517-c66a-11eb-9a1e-42010ab80002",
    #         "person-f-number": 0,
    #         "person-before": ["0"]
    #     },
    #     {
    #         # B Hoai Duc Cuong
    #         "person-id": "6c649445-c66a-11eb-9a1e-42010ab80002",
    #         "person-f-number": 1,
    #         "person-before": ["6c629517-c66a-11eb-9a1e-42010ab80002"]
    #     },
    #     {
    #         # D Hoang Gia Binh
    #         "person-id": "6c63a201-c66a-11eb-9a1e-42010ab80002",
    #         "person-f-number": 1,
    #         "person-before": ["6c629517-c66a-11eb-9a1e-42010ab80002"]
    #     },
    #     {
    #         # E Lam Anh Hieu
    #         "person-id": "6c6afe65-c66a-11eb-9a1e-42010ab80002",
    #         "person-f-number": 2,
    #         "person-before": ["6c63a201-c66a-11eb-9a1e-42010ab80002", "6c6eea3c-c66a-11eb-9a1e-42010ab80002"]
    #     },
    #     {
    #         # C Le Gia Vy
    #         "person-id": "6c6c325c-c66a-11eb-9a1e-42010ab80002",
    #         "person-f-number": 2,
    #         "person-before": ["6c649445-c66a-11eb-9a1e-42010ab80002", "6c63a201-c66a-11eb-9a1e-42010ab80002"]
    #     },
    #     {
    #         # F Luong Gia Phuc
    #         "person-id": "6c6eea3c-c66a-11eb-9a1e-42010ab80002",
    #         "person-f-number": 2,
    #         "person-before": ["6c649445-c66a-11eb-9a1e-42010ab80002", "6c6afe65-c66a-11eb-9a1e-42010ab80002"]
    #     }
    # ]

    # convert into JSON:
    # y = json.dumps(x)
    return resultTracking
