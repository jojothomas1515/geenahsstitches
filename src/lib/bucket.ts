import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const s3Client = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    forcePathStyle: true,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
});

export async function uploadToBucket(file: File) {
    // Sanitize filename: strip path separators and prefix with UUID to avoid collisions
    const safeName = file.name.replace(/[/\\]/g, "_");
    const key = `${randomUUID()}-${safeName}`;
    const url = process.env.S3_PUBLIC_ENDPOINT + "/" + process.env.S3_BUCKET_NAME + "/" + key;
    const buffer = Buffer.from(await file.arrayBuffer());
    const params = {
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: file.type,
    };
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    if (response.$metadata.httpStatusCode === 200) {
        return { url, key };
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


