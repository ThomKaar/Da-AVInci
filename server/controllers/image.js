var AWS = require('aws-sdk');
AWS.config.loadFromPath('./dbconfig.json');
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// Get Item by id
exports.getImagesById = async(req,res) => {
    try{
        var arr = req.params.ids;
        var num_ids = [];
        for (id of arr) {
            if (id >= '0' && id <= '9') {
                num_ids.push({ id: { N: id } });
            }
        }
        var params = {
            RequestItems: {
                "Image": {
                    Keys: num_ids,
                }, 
            },
        };
        ddb.batchGetItem(params, function(err, collectionData) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log(JSON.stringify(collectionData));
                res.json(collectionData);
            }
        });
    } catch (err) {
        console.log(err);
    }
};
