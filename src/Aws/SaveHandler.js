import AWS from 'aws-sdk';
import { format } from 'date-fns';

AWS.config.update({
    accessKeyId: 'ASIATIFAYCUFWHCYUW6S',
    secretAccessKey: '+1C6CZSaaLMPEVW2rAMMxMYIhsixD2BJ6EUsTaA6',
    region: 'us-east-1',
    sessionToken: 'FwoGZXIvYXdzEKz//////////wEaDJ/7N7g6jK6FrSeFUCLBAVLhvBPxTB0FeoPH4TqUqNwoBZ7kT2CZjmvl+Vu+bx2gdBP/L3VmV0IH39WMrX22D5bxC1C5HEzCV6jHXnKxSgX1V7jYsLK9adbE1CeEfXIWUR7vZ/+ss1HOMlVHRbcnuDaX6GM6K2cdkaI4rQfCB+2rx9UzRwMaLXVv5wb9KcgUCzg2na3AaiTT9PjfvOpy7qYwqrXJCicTn54Ak/skk79aARzKS/E6VEsItirfZ+fo6kniExOUDGgX/hm+YcGcX9Iom52fpAYyLWe0EoiEqAtQaRUfUhTWP1OnZiCbWap8ILn/Ls7RerHUVVcQ3aPZwn/LTZRwVg=='
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

    let imageUrlList = imageList.filter((e) => e != null);

    const uploadPromises = imageUrlList.map(async (element) => {
        return await uploadToS3(element.file);
    });
    const uploadedUrls = await Promise.all(uploadPromises);

    const dynamoImageList = uploadedUrls.map((imageUrl) => ({ S: imageUrl }));
    var paramsDynamo = {
        TableName: 'albumMaker',
        Item: {
            'albumId': { S: dynamoAlbumId },
            'fecha': { S: currentDate },
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
            'imageList': { L: [...dynamoImageList] },
            'template': { S: template }
        }
    };
    await new Promise((resolve, reject) => {
        dynamo.putItem(paramsDynamo, function (err, data) {
            if (err) {
                console.log("Error Dynamo", err);
                reject(err);
            } else {
                console.log("Success datos guardados en Dynamo!", data);
                resolve();
            }
        });
    });
}
