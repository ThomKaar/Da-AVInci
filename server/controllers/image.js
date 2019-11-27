var AWS = require('aws-sdk');
AWS.config.loadFromPath('./dbconfig.json');
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

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
                res.json(collectionData);
            }
        });
    } catch (err) {
        console.log(err);
    }
};

exports.uploadImage = async(req, res) => {
    try {
        let key = "stillLife/" + req.body.title + ".jpg";
        console.log(req.body);
        var params = {
            Body: req.body.bs,
            Bucket: 'da-vinci-image-bucket',
            Key: key,
        };
        s3.putObject(params, function(error, data) {
            if (error) {
                console.log(error);
            } else {
                res.json("Success");
            }
        });
        
        res.json();
    } catch (err) {

    }
};

// Get Default Image Collection
exports.getDefaultImages = async(req, res) => {
    try {
        var params = {
            Key: {
               "type": {
                   S: "images"
               },
            },
            TableName: "Default"
        };
        ddb.getItem(params, function(e, data) {
            if (e) {
                console.log("Error", e);
            } else {
                if (data.Item && data.Item.images && data.Item.images.NS) {
                    let imageIds = [];
                    for (let id of data.Item.images.NS) {
                        imageIds.push({ id: {N: id} });
                    }
                    let imageParams = {
                        RequestItems: {
                            "Image": {
                                Keys: imageIds
                            },
                        },
                    };
                    ddb.batchGetItem(imageParams, function(error, defaultImages) {
                        if (error) {
                            console.log("Error" + error);
                        } else {
                            res.json(defaultImages);
                        }
                    });
                }
            }
        });
    } catch (err) {
        console.log("getDefaultImages catch error: ", err);
    }
};

exports.getAllImages = async(req, res) => {
    try {
        var params = {
            "TableName": "Image",
            "AttributesToGet": ["id", "title", "url"],
        };
        ddb.scan(params, function(err, imageData) {
            if (err) {
                console.log("Error: " + err);
            } else {
                res.json(imageData.Items);
            }
        });
    } catch (e) {
        console.log("getAllImages error catch:" + e);
    }  
};
