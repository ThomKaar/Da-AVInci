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

function organizeData(cData, iData) {
    // Sort the iData in ascending order by id
    iData.sort(function(a,b) {
        return a.id.N - b.id.N;
    });
    categories = []
    // Loop through categories connecting item data and category name
    for (let i = 0; i < cData.Count; i += 1) {
        var categoryName = cData.Items[i].name.S;
        var  items = [];
        for (let j = 0; j < cData.Items[i].items.NS.length; j += 1) {
            items.push(iData[cData.Items[i].items.NS[j]]);
        }
        categories.push({
            category: categoryName,
            items: items
        });
    }
    return categories
}