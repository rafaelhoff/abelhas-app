const info = require('./info');

exports.handler = (event, context, callback) => {
  // https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-custom-message.html
  // Example of the event object available in ../test/test.js

  // CustomMessage_SignUp	Custom message – To send the confirmation code post sign-up.
  // CustomMessage_AdminCreateUser	Custom message – To send the temporary password to a new user.
  // CustomMessage_ResendCode	Custom message – To resend the confirmation code to an existing user.
  // CustomMessage_ForgotPassword	Custom message – To send the confirmation code for Forgot Password request.
  // CustomMessage_UpdateUserAttribute	Custom message – When a user's email or phone number is changed, this trigger sends a verification code automatically to the user. Cannot be used for other attributes.
  // CustomMessage_VerifyUserAttribute	Custom message – This trigger sends a verification code to the user when they manually request it for a new email or phone number.
  // CustomMessage_Authentication	Custom message – To send MFA code during authentication.

  if (event.triggerSource === "CustomMessage_SignUp") {
    CustomMessage_SignUp(event);
  }

  // Return to Amazon Cognito
  callback(null, event);
};


function CustomMessage_SignUp(event) {
  let locale = event.request.userAttributes.locale;
  if (!locale) {
    locale = 'en';
  }

  const dataObj = { ...event.request, ...info }

  event.response.smsMessage = replacer(info.signup[locale].smsMessage, dataObj);
  event.response.emailSubject = replacer(info.signup[locale].emailSubject, dataObj);
  event.response.emailMessage = replacer(info.signup[locale].emailMessage, dataObj);
}

function replacer(template, obj) {
  var keys = Object.keys(obj);
  var func = Function(...keys, "return `" + template + "`;");

  return func(...keys.map(k => obj[k]));
}
