import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
});

export async function uploadToBucket(file: File) {
    const url = process.env.S3_ENDPOINT + "/" + process.env.S3_BUCKET_NAME + "/" + file.name;
    const params = {
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: file.name,
        Body: file,
    };
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    if (response.$metadata.httpStatusCode === 200) {
        return url;
    }
    return null;
}

export async function deleteObject(key: string) {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: key,
    };
    const command = new DeleteObjectCommand(params);
    const response = await s3Client.send(command);
    return response;
}


