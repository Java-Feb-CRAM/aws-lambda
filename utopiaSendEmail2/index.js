var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-east-1" });

exports.handler = async (event, context, callback) => {
  const { sendTo, subject, body } = event;
  if (!sendTo || !subject || !body) {
    return {
      statusCode: 400,
      body: "Missing sendTo, subject or body",
    };
  }
  var params = {
    Destination: {
      ToAddresses: [sendTo],
    },
    Message: {
      Body: {
        Html: { Data: body },
      },
      Subject: { Data: subject },
    },
    Source: "Utopia Airlines <robert.maes@smoothstack.com>",
  };
  const data = ses.sendEmail(params).promise();
  return data;
};
