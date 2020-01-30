"use strict";

const AWS = require("aws-sdk");
const uuid = require("uuid");

// Create a dynamodb client
const documentClient = new AWS.DynamoDB.DocumentClient();

// Request handler
module.exports.create = (event, context, callback) => {
  // Parse event body.
  const parsedBody = JSON.parse(event.body);

  // // Simple validation for request body
  if (
    !parsedBody.description &&
    !parsedBody.companyId &&
    typeof parsedBody.title === "string"
  ) {
    console.log("Invalid request body");

    callback(new Error("Invalid request body"));

    return;
  }

  // Create a simple json object to describing the data to be put
  // in the dynamoDB table.

  const params = {
    TableName: "Jobs",
    Item: {
      id: uuid.v1(),
      title: parsedBody.title,
      createAt: new Date().getTime(),
      description: parsedBody.description,
      companyId: parsedBody.companyId
    }
  };

  // Perform put operation
  documentClient.put(params, (error, data) => {
    // if theres an error error will always be a truthy value.
    if (error) {
      console.log("An error occured", error);

      callback(new Error("Could not create the job"));
      return;
    }

    // create response body.
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    };

    // // call back with the response
    callback(null, response);
  });
};
