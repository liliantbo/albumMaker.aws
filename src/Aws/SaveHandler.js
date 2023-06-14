import AWS from 'aws-sdk';
import { format } from 'date-fns';

export default async function SaveHandler(datos) {

    try {

        let s3=null;
        let dynamo =null;
        AWS.config.update({
            accessKeyId: 'ASIATIFAYCUF2GFK4KU7',
            secretAccessKey: 'Qr/YAD+pu1yM+0k+gpLGu8qivrbHV0oYj6zFxUov',
            region: 'us-east-1',
            sessionToken: 'FwoGZXIvYXdzEMT//////////wEaDE9eJCE0SnYUgYv1yCLBATtKt92kQWYEGDgIhEu7eSQ9tP8LDer1eOEo6biRouAfCw0dVtSYVKLkygyhEK8mTMUZmLx3Pi5cyZzXrKhqLf8Z64JHeXvPFpjGqA5MY1vcyXTB/5l+FpnFuAI31s5B7L9qGGi3RClxbmORbLXolQTpN+QglPaYlPo0Ix0G1cgrcYXlIBOpkkB+z2fM8Ub4BuVcXnkPGCWs17JY3fwKlsvYDouJ5CSUHeQ+RBGAvBy5wAMZzR7CX+w/Z+uIGoGxaXgo5sykpAYyLaaxNl8AWI2lpoQyPnutu8lPSr+tmdp/r2TuX8g70dJOBTC58Bp7AZuVcLU10A=='
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
