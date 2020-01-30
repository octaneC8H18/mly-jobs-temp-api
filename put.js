"use strict";

const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.put = (event, context, callback) => {
  const parsedData = JSON.parse(event.body);

  const params = {
    TableName: "Jobs",
    Key: {
      id: event.pathParameters.id
    },
    UpdateExpression:
      "SET title = :title, description = :description, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":title": parsedData.title || null,
      ":description": parsedData.description || null,
      ":updatedAt": new Date().getTime()
    },
    ReturnValues: "ALL_NEW"
  };

  documentClient.update(params, (error, result) => {
    if (error) {
      console.error(error);

      callback(new Error("Can not be updated"));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };

    callback(null, response);
  });
};
