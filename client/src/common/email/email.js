require('dotenv').config()
const AWS = require('aws-sdk');

const AWS_SES_REGION = "us-east-1"

// Amazon SES configuration
const SESConfig = {

    apiVersion: '2010-12-01',
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: "us-east-1"
}

export const sendAnEmail = (to, data) => {
    var params = {
        Source: 'Score A Match <support@scoreamatch.com>',
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




