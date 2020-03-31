
const AWS = require('aws-sdk');

AWS_SES_REGION = "us-east-1"
AWS_SES_ACCESS_KEY_ID = "AKIA5GWYDREOZX3BXCPE"
AWS_SES_SECRET_ACCESS_KEY = "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"
// Amazon SES configuration
const SESConfig = {
    apiVersion: '2010-12-01',
    accessKeyId: "AKIA5GWYDREOZX3BXCPE",
    secretAccessKey: "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",
    region: "us-east-1"
}

function sendAnEmail(to, data) {
    var params = {
        Source: 'rickspnathan@gmail.com',
        Destination: {
            ToAddresses: [
                to
            ]
        },

        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: data

                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Node + SES Example'
            }
        }
    };

    new AWS.SES(SESConfig).sendEmail(params).promise().then((res) => {
        console.log(res);
    });

}

sendAnEmail("rickspnathan@gmail.com", 'IT IS <a href="http://scoreamatch.com/">WORKING</a>!');

