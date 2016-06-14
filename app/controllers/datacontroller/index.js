'use strict'

let INVALID_CONTENT_TYPE = '{"status":"fail","message":"Not Acceptable request, content type will be application/json."}'
  , INVALID_PARAM_VALUE = '{"status":"fail","message":"Invalid parameter."}'
  , baseApiPath = null
  ;


function isValidRequest(req) {
  return (/application\/json/.test(req.get('content-type').toLowerCase()));
}

function apiGet(req, res) {
    let tplName = req.params.url;
    let request_path = tplName.split("/");
    let resource = request_path[0];
    resource = (resource.indexOf('.')>0)?resource.split('.')[0]:resource;
    let object_id = request_path[1];
    let filter = null;
    if(!!object_id){
        filter = {_id: object_id};
    }
    this.storage.list(resource, filter, function(list){
        res.send(JSON.stringify(list, null, 4));
    });
}

function apiPost(req, res) {
    if (!isValidRequest(req)) {
      return res.status(406).end(INVALID_CONTENT_TYPE);
    }
    let tplName = req.params.url;
    let request_path = tplName.split("/");
    let resource = request_path[0];
    resource = (resource.indexOf('.')>0)?resource.split('.')[0]:resource;
    this.storage.save(resource, req.body, function(saveData){
        res.send(JSON.stringify(saveData), null, 4);
    })
}

function apiPut(req, res) {
    if (!isValidRequest(req)) {
      return res.status(406).end(INVALID_CONTENT_TYPE);
    }
    let tplName = req.params.url;
    let request_path = tplName.split("/");
    let resource = request_path[0];
    resource = (resource.indexOf('.')>0)?resource.split('.')[0]:resource;
    let object_id = request_path[1];
    if(!object_id){
        return res.status(412).end(INVALID_PARAM_VALUE);
    }
    let filter = {_id: object_id};
    this.storage.update(resource, filter, req.body, function(updateData){
        res.send(JSON.stringify(updateData, null, 4));
    });
}

function apiDelete(req, res) {
    if (!isValidRequest(req)) {
      return res.status(406).end(INVALID_CONTENT_TYPE);
    }
    let tplName = req.params.url;
    let request_path = tplName.split("/");
    let resource = request_path[0];
    resource = (resource.indexOf('.')>0)?resource.split('.')[0]:resource;
    let object_id = request_path[1];
    if(!object_id){
        return res.status(412).end(INVALID_PARAM_VALUE);
    }
    let filter = {_id: object_id};
    this.storage.remove(resource, filter, function(deleted){
        res.send(JSON.stringify(deleted, null, 4));
    });
}

let routes = {
    "/api/:url([a-z]*)?": {
        "get": apiGet,
        "post": apiPost,
        "put": apiPut,
        "patch": apiPut,
        "delete": apiDelete
    }
}

module.exports = routes;