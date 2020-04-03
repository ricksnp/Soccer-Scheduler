
const AWS = require('aws-sdk');

const AWS_SES_REGION = "us-east-1"
const AWS_SES_ACCESS_KEY_ID = "AKIA5GWYDREOZX3BXCPE"
const AWS_SES_SECRET_ACCESS_KEY = "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"
// Amazon SES configuration
const SESConfig = {
    apiVersion: '2010-12-01',
    accessKeyId: "AKIA5GWYDREOZX3BXCPE",
    secretAccessKey: "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",
    region: "us-east-1"
}

export const sendAnEmail = (to, data) => {
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




