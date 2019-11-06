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

