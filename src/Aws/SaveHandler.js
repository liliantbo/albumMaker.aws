import AWS from 'aws-sdk';
import { format } from 'date-fns';

export default async function SaveHandler(datos) {

    try {

        let s3=null;
        let dynamo =null;
        AWS.config.update({
            accessKeyId: 'ASIATIFAYCUFTZBBLFGZ',
            secretAccessKey: 'Fr9wqQCpXXWXgUpcOYO0H5bKLUqUdXvDn9sDO/S3',
            region: 'us-east-1',
            sessionToken: 'FwoGZXIvYXdzECUaDC/Wlad0M4Fxt4tkpyLBAbOKn9TaSqmM+KzINRQYwJsvzi+OO87EakviA/BSlPhDFowWj2Y1oWFEBn1+6vycwAeHpYYfRuTu8vwrjWl6yRbgO5cSP4+3uc1S6H4U548W4V2oU33ACBDDCLSZTSVZzq9LU82OLNEqpQHqxf++TAV8mckQBj4Zpim9ikn+N8WJMm3lz9MJdp+54XfHy/+y25YYdywaorUdWmfnm38ujKUoxL9FROUx6YT+TjT9MmJ3Q+I/tptrvkyuNtFLsjSqmxAosvO5pAYyLagRGp+jyMpk8DatnXrTQx0M07CPRNZN85cKasjGWDLt49CnJ5Vab/T3LhR7+A=='
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
