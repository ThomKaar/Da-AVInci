var AWS = require('aws-sdk');
AWS.config.loadFromPath('./dbconfig.json');
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// Get Item by id
exports.getItemById = async(id) => {
    try{
        var params = {
            "TableName": "Item",
            "Key": {
                "id":  {
                    "N": id
                }
            },
        };
        ddb.getItem(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                 return data;
            }
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getItemByIdReq = async(req, res) => {
    try{
        var params = {
            "TableName": "Item",
            "Key": {
                "id":  {
                    "N": req.params.id
                }
            },
        };
        ddb.getItem(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                return res.json(data);
            }
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getItemTitle = async(req, res) => {
    try {
        var params = {
            "TableName": "Item",
            "Key": {
                "id": {
                    "N": "11"
                }
            },
        };
        ddb.getItem(params, function(err, data) {
            if (err)  {
                console.log("Error", err);
            } else {
                if (data.Item.label.S == "title") {
                    return res.json(data);
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
};
 
// Get item(s) by the content string
exports.getItemByContent = async(req, res) => {
    try {
        var params = {
            "TableName": "Item",
            "ExpressionAttributeValues": {
                ":a": {
                    S: req.params.content
                },
            },
            "FilterExpression": "content = :a",
        };
        ddb.scan(params, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                res.json(data.Items);
            }
        });
    } catch (e) {
        console.log("Error caught in getItemByContent: ", e);
    }
};

// Get an item by the content string and the label string
exports.getItemByContentAndLabel = async(req, res) => {
    try {
        var params = {
            "TableName": "Item",
            "ExpressionAttributeValues": {
                ":a": {
                    S: req.params.content
                },
                ":b": {
                    S: req.params.label
                },
            },
            "FilterExpression": "content = :a AND label = :b",
        };
        ddb.scan(params, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                res.json(data.Items);
            }
        });
    } catch (e) {
        console.log("Error caught in getItemByContentANDLabel: ", e);
    }
};

exports.updateItemById = async(req, res) => {
    try {
        console.log(req.body);
        var params = {
            Item: req.body, 
            TableName: "Item",
        };
        ddb.putItem(params, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                res.json(data.Items);
            }
        });
    } catch (e) {
        console.log("Error caught in updateItemById: ", e);
    }
};

exports.createItem = async(req, res) => {
    try {
        var params = {
            ExpressionAttributeNames: {
                "#id": "id", 
            },
            ProjectionExpression: "#id",
            TableName: "Image",
        };
        ddb.scan(params, function(error, idData) {
            if (error) { 
                console.log(error);
            } else {
                let max = 0;
                for (item of idData.Items) {
                    if (item.id.N > max) {
                        max = item.id.N;
                    }
                }
                let newId = parseInt(max) + 1;
                var newparams = {
                    Item: {
                        "id": {
                            N: newId.toString(),
                        },
                        "title": {
                            S: req.body.title,
                        },
                        "url": {
                            S: req.body.url,
                        },
                    },
                    ReturnConsumedCapacity: "TOTAL", 
                    TableName: "Image",
                };
                ddb.putItem(newparams, function(err, data) {
                    if (err) {
                        console.log("error in the putting");
                        console.log(err);
                    } else {
                        res.json(data);
                    }
                });
            }

        });
        
    } catch (e) {
        console.log(e);
    }
};

exports.deleteItem = async(req, res) => {
    try {
        var params = {
            Key: {
                id: { N: req.params.id},
            },
            TableName: "Item",
        };
        ddb.deleteItem(params, function(err, data) {
            if(err) console.log(err);
            else res.json(data);
        });
    } catch (e) {
        console.log(e);
    }
};