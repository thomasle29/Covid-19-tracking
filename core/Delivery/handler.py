from . import api

def setup(router):
    router.add_url_rule('/ping', 'ping', api.ping,  methods=['GET'])

    router.add_url_rule('/test', 'test', api.test_json, methods=['POST'])
    return router
