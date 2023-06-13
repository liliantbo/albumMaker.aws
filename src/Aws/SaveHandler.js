import AWS from 'aws-sdk';
import { format } from 'date-fns';

AWS.config.update({
    accessKeyId: 'ASIATIFAYCUF6BJA3L4J',
    secretAccessKey: '9uHVtVzWeBwzrcLGelzlXiTNwM1UwtmhZoOOYLMJ',
    region: 'us-east-1',
    sessionToken: 'FwoGZXIvYXdzEKb//////////wEaDI9kqD7bYK4e/V9c7CLBAaGb75hDy6TpTe/M9OvkCAIOQS0zDG6sm6DGsEOCPD42SXpX9xkUeEBv7+J+/qddC3GdyEqFhgy7hwwvufSTAPEce8XZ2PEKgLgUQN0x19TgKXtarNVUmT/BxIyfJ1mRd+3KzzI8mUZn+xsHjdvF5J9GB99qFZg6tLhHD+rd2TuMWC2Mnwm97JpcSD3WDfWYaNTcJyMnmz7Y2SoDOU9vvvsxUa+3oVxXiOuADjwUszxtNkMKsfUcmcpwD49uPRC2luEonv6dpAYyLRSGPjfNPNcEqM/8aUpyQwAf+AkLg7oesLlMY+EpDzrSNFToghTVcyBs/Fu4Yw=='
});

const s3 = new AWS.S3();
const dynamo = new AWS.DynamoDB();

const uploadToS3 = async (file) => {
    if (!file) {
        return;
    }
    const params = {
        Bucket: 'albummaker',
        Key: `${Date.now()}.${file.name}`,
        Body: file
    };
    const { Location } = await s3.upload(params).promise();
    console.log('cargando a s3', Location);
    return Location;
}

export default async function SaveHandler(datos) {
   

    const { billing, shipping, imageList, template } = datos
    const currentDate = format(new Date(), 'yyyyMMddHHmmss');
    const dynamoAlbumId = billing.identificationNumber + "-" + Date.now();
    
    const imageUrlList=imageList.map((file)=>{
        const image=file&&file.file;
        return  uploadToS3(image)});
    const dynamoImageList = imageUrlList.map((image) => ({ S: image }));
    
    var paramsDynamo = {
        TableName: 'albumMaker',
        Item: {
            'albumId': { S: dynamoAlbumId },
            'fecha': {S: currentDate},
            'identificationNumber': { S: billing.identificationNumber },
            'name': { S: billing.name },
            'telephone': { S: billing.telephone },
            'city': { S: billing.city },
            'address': { S: billing.address },
            'identificationNumberS': { S: shipping.identificationNumber },
            'nameS': { S: shipping.name },
            'telephoneS': { S: shipping.telephone },
            'cityS': { S: shipping.city },
            'addressS': { S: shipping.address },
            'imageList': { L: dynamoImageList },
            'template': { S: template }
        }
    };
    dynamo.putItem(paramsDynamo, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    })
}
