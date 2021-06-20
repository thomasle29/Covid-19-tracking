from . import api

def setup(router):
    router.add_url_rule('/ping', 'ping', api.ping,  methods=['GET'])

    router.add_url_rule('/test', 'test', api.test_json, methods=['POST'])

    router.add_url_rule('/compute/tracking/graph', 'graph', api.graphRelativeCompute, methods=['GET'])
    return router
