
const event = {
  request: {
    userAttributes: {
      // "string": "string"
      locale: 'pt'
    },
    codeParameter: '1234',
    usernameParameter: 'test@test.com',
    clientMetadata: {
      // "string": "string"
    }
  },
  triggerSource: 'CustomMessage_SignUp',
  response: {
    smsMessage: '',
    emailMessage: '',
    emailSubject: ''
  }
}

const lambda = require('../src/custom');
lambda.handler(event, null, (err, event) => {
  console.log(JSON.stringify(event.response));
});
