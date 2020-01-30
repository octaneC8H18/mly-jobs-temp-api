"use strict";

const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: "Jobs",
    Key: {
      id: event.pathParameters.id
    }
  };

  documentClient.get(params, (error, result) => {
    if (error) {
      console.error(error);

      callback(new Error("Could not receive the job"));

      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result)
    };

    callback(null, response);

    return;
  });
};
