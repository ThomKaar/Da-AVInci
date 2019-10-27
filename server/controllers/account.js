var AWS = require('aws-sdk');

AWS.config.update({region: 'us-west-2'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});


exports.getAccountByUsername = async(req, res) => {
    try{
        var params = {
            TableName: 'Accounts',
            Key: {
                'USERNAME': {S: req.params.username}
            },
            ProjectionExpression: 'HASHED'
        }

        ddb.getItem(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                if (req.params.hashed == data) {
                    return 0;
                } else {
                    return 1;
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}
// Create an account function

