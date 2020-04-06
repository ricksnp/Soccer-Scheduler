
const AWS = require('aws-sdk');

const AWS_SES_REGION = "us-east-1"
const AWS_SES_ACCESS_KEY_ID = "AKIA5GWYDREOYZBN3QOM"
const AWS_SES_SECRET_ACCESS_KEY = "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"
// Amazon SES configuration
const SESConfig = {
    apiVersion: '2010-12-01',
    accessKeyId: "AKIA5GWYDREOYZBN3QOM",
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
                Data: 'Score A Match'
            }
        }
    };

    new AWS.SES(SESConfig).sendEmail(params).promise().then((res) => {
        console.log(res);
    });

}




