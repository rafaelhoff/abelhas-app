let AWS = require("aws-sdk");

// https://serverless-stack.com/chapters/create-a-cognito-test-user.html#:~:text=Create%20User&text=In%20your%20terminal%2C%20run.,created%20in%20Cognito%20User%20Pool.

// AWS.config.update({
//   accessKeyId: "YOURKEY",
//   secretAccessKey: "YOURSECRET",
//   region: "us-east-1"
// });

var credentials = new AWS.SharedIniFileCredentials({ profile: 'rhPrivateAmplify' });
AWS.config.credentials = credentials;


const COGNITO_CLIENT = new AWS.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-19",
  region: "us-east-1"
});

var poolData = {
  UserPoolId: '...', // your user pool id here
  ClientId: '...' // your client id here
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
var userData = {
  Username: '...', // your username here
  Pool: userPool
};


var poolData = {
  UserPoolId: "41qv36nnfhf9imjb7naamof176",
  Username: "rafael.hoff@gmail.com",
  DesiredDeliveryMediums: ["EMAIL"],
  TemporaryPassword: "Abc@321",
  UserAttributes: [
    {
      Name: "email",
      Value: "rafael.hoff@gmail.com"
    },
    {
      Name: "email_verified",
      Value: "true"
    }
  ]
};
COGNITO_CLIENT.adminCreateUser(poolData, (error, data) => {
  console.log(error);
  console.log(data);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(data)
  });
});
