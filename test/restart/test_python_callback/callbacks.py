def nowCallback(obj):
    obj = "pre"

def postCallback(obj):
    assert obj == "post"

def failCallback(obj):
    assert True is False
