import AWS from 'aws-sdk';
import { format } from 'date-fns';

AWS.config.update({
    accessKeyId: 'ASIATIFAYCUF4UE3PBS5',
    secretAccessKey: '/isJArxsG6ybXYBcaEJKXvwwxN+fGThfRByDoLk0',
    region: 'us-east-1',
    sessionToken: 'FwoGZXIvYXdzEKr//////////wEaDArZMf2+MnDfqu+nyyLBAZekyVG+GCxBKkHzmNtqAoiZI+7dAP1u6CoxUEktCxKkvitnZmDnkVDAYc4jprX1CVW9keoQ7MRtJMQo1TCnOVrYA9oEXqfrTuadpovl3DhsO4Y/9nr+UCfbemFvzY0Ax57Sc8kSRWEGY7AJz3n2q8SvbjXE4kd2zr49gDFBAzg/gl+XwEUzK3OFG/go9lVT2BDtRfg7klxpRmARNDNtMNBYIgW27sv4QcoW+eBGDkLQgCc2q9Lk5tPOMENy/iwpsGsov/WepAYyLVTIGhUwGjDCm2DZdB4oMQxAoXTUbbey1vlBptO/sYWeAxzsVjW21bzKV6L7sw=='
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
    
    let imageUrlList=imageList.filter((e)=>e!=null);
    console.log("total imagenes a guardar "+imageUrlList.length );

    imageUrlList.forEach(async element => {
        await uploadToS3(element.file);
    });

    const dynamoImageList = imageUrlList.map((image) => ({ "S": image }));
    
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
