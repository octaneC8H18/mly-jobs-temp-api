"use strict";

const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: "Jobs"
};

module.exports.get = (event, context, callback) => {
  documentClient.scan(params, (error, result) => {
    if (error) {
      console.error(error);

      callback(new Error("Unable to receive data from DB"));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };

    callback(null, response);

    return;
  });
};
