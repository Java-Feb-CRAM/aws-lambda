var aws = require("aws-sdk");
aws.config.update({ region: "us-east-1" });

exports.handler = async (event, context, callback) => {
  const { sendToNumber, message } = event;
  if (!sendToNumber || !message) {
    return {
      statusCode: 400,
      body: "Missing sendToNumber or message",
    };
  }

  var formattedMsg =
    "UTOPIA AIRLINES:\n\n" +
    message +
    "\n\nREPLY WITH 'STOP' TO OPT OUT OF THESE MESSAGES";

  var params = {
    Message: formattedMsg,
    PhoneNumber: sendToNumber,
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: "UtopiaAir",
      },
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: "Transactional",
      },
    },
  };

  const data = new aws.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();
  return data;
};
