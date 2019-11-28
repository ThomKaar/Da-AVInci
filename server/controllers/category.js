const ItemController = require('./items');

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./dbconfig.json');
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// Get All Categories
exports.getAllCategoryItems = async(req, res, callback) => {
    try{
        var params = {
            "TableName": "Category",
            "AttributesToGet": ["name", "items"],
        };
        ddb.scan(params, function(err, categoryData) {
            if (err) {
                console.log("Error", err);
            } else {
                var keys = [];
                for (let i = 0; i < categoryData.Items.length; i += 1) {
                    for (let j = 0; j < categoryData.Items[i].items.NS.length; j +=1) {
                        keys.push({ id: { 
                            N: categoryData.Items[i].items.NS[j] }
                        });
                    }
                }
                var params = {
                    RequestItems: {
                     "Item": {
                       Keys: keys, 
                      }
                    },
                };
                ddb.batchGetItem(params, function(err, itemData) {
                    if (err) {
                        console.log("Error", err);
                    } else {
                        res.json(organizeData(categoryData, itemData.Responses.Item));
                    }
                });
            }
        });
    } catch (err) {
        console.log(err);
    }
};

// Create A Category
exports.createCategory = async(req, res) => {
    try {
        var params = {
            Item: {
                "name": {
                    S: req.params.category
                },
            },
            ReturnConsumedCapacity: "TOTAL", 
            TableName: "Category"
        };
        ddb.putItem(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {
                // successful response
                res.json(data);
            }  
          });
    } catch (err) {
        console.log(err);
    }
};

exports.updateCategory = async(req, res) => {
    try {
        var params = {
            Item: {
                "name": {
                    S: req.body.name
                },
                "items": {
                    NS: req.body.items
                },
            },
            ReturnConsumedCapacity: "TOTAL", 
            TableName: "Category"
        };
        ddb.putItem(params, function(e, data) {
            if (e) {
                console.log("putItem for updateCateogry didn't work..." + e);
            } else {
                res.json(data);
            }
        });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteCategory = async(req, res) => {
    try {
        console.log(req.params.name);
        var params = {
            Key: {
                "name": { S: req.params.name },
            },
            TableName: "Category",
        };
        
        ddb.deleteItem(params, function(err, data) {
            if (err) console.log(err);
            else res.json(data);
        });
    } catch (e) {

    }
};

function organizeData(cData, iData) {
    categories = []
    // Loop through categories connecting item data and category name
    for (let i = 0; i < cData.Count; i += 1) {
        var categoryName = cData.Items[i].name.S;
        var  items = [];
        for (let j = 0; j < cData.Items[i].items.NS.length; j += 1) {
            for (let  k = 0 ; k < iData.length; k += 1) {
                if (iData[k].id.N == cData.Items[i].items.NS[j]) {
                    items.push(iData[k]);
                }
            }
        }
        categories.push({
            category: categoryName,
            items: items
        });
    }
    return categories
}