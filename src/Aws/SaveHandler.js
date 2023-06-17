import AWS from 'aws-sdk';
import { format } from 'date-fns';

export default async function SaveHandler(datos) {

    try {

        let s3=null;
        let dynamo =null;
        AWS.config.update({
            accessKeyId: 'ASIATIFAYCUFQQWM567C',
            secretAccessKey: 'XDhz6Sn/uX/n6tSU/YIVb8xkTYaUGrnSRdndDrF3',
            region: 'us-east-1',
            sessionToken: 'FwoGZXIvYXdzEB4aDBi8S6+a45ZFLzTujyLBAUXkkXmEpqu5Zf4oN6EffPuoyl/6/zSh2Jkmb2CkqTzLc6dH42SIPUbxO8rCZzKBG/IQ7US0Inq3apQHmjDbfo9zIQ6MzYBzWazhg4FLyqGCn/0T6Kru/jFs2vKVB7zSlrQzhFj1SPxoRWW+szs1U6CmaU/Y3VszxA3WlQkiTSpsRMbvBmRXLVW5Sz02DSikWX0Wc0SPv0fCFGDCB1Z0Z53NX9n3wjFPWV3MKDwazIhaICcyX43qTnxCm5PXw+/teE4og7a4pAYyLSEgHllkeXxxgMe0AnpIyo79UtAaiu22CHFTiQJ7IRRXZaRo4136TdXKaIIAvA=='
        });
        try {
            s3 = new AWS.S3();
        } catch (error) {
            console.log("SaveHandler :: S3 :: Error estableciendo conexion con el S3 ")
        }
        try {
            dynamo = new AWS.DynamoDB();
        } catch (error) {
            throw console.log("SaveHandler :: SDynamo :: Error estableciendo conexion con el Dynamo ")
        }
        if (s3==null ||dynamo==null){
            throw new Error("SaveHandler :: AWS ::No se pudo completar la conexion con AWS");
        }

        const uploadToS3 = async (file) => {
            if (!file) {
                return;
            }
            const params = {
                Bucket: 'albummaker',
                Key: `${Date.now()}.${file.name}`,
                Body: file
            };
            try {
                const { Location } = await s3.upload(params).promise();
                console.log('cargando a s3', Location);
                return Location;
            } catch (error) {
                console.log("SaveHandler :: uploadingS3 :: Error al ejecutar el uploadToS3")
                throw(error);
            }
        }

        const { billing, shipping, imageList, template } = datos
        const currentDate = format(new Date(), 'yyyyMMddHHmmss');
        const dynamoAlbumId = billing.identificationNumber + "-" + Date.now();

        let imageUrlList = imageList.filter((e) => e != null);


        const uploadPromises = imageUrlList.map(async (element) =>
                 await uploadToS3(element.file));
        
        const uploadedResults = await Promise.all(uploadPromises);
        const uploadedUrls = uploadedResults.filter((result) => result !== null);

        if (uploadedUrls.length === 0) {
            throw new Error("SaveHandler :: S3 :: No se pudo cargar ninguna imagen a S3");
        }

        const dynamoImageList = uploadedUrls.map((imageUrl) => ({ S: imageUrl }));

        let paramsDynamo = {
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
                    console.log("SaveHandler :: Dynamo :: Error PutItem", err);
                    reject(err);
                } else {
                    console.log("SaveHandler :: Dynamo :: Success datos guardados en Dynamo!", data);
                    resolve();
                }
            });
        })
    } catch (error) {
        console.log('SaveHandler :: Error', error);
        throw error;
    }
}
