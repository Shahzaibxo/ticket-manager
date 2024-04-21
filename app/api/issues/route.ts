import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import AWS from "aws-sdk"
import { randomUUID } from "crypto";
import prisma from "@/prisma/client";


const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

const FileSchema = z.object({
    name: z.string(),
    type: z.string().refine((type) => ACCEPTED_IMAGE_TYPES.includes(type), {
        message: "File type must be 'image/png', 'image/jpeg', or 'image/webp'.",
    }),
    size: z.number().max(MAX_FILE_SIZE, {
        message: "File size must be less than or equal to 5MB.",
    }),
});

const createIssueSchema2 = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
})
const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
    image: FileSchema.optional()
})

export const POST = async (req) => {
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.BUCKET_REGION
    });
    const s3 = new AWS.S3({});

    const formData = await req.formData();

    if (formData.get("image")) {
        const formdata = {
            image: formData.get("image"),
            title: formData.get("title"),
            description: formData.get("description")
        }

        const validatedData = createIssueSchema.safeParse(formdata);
        if (!validatedData.success) {
            return NextResponse.json(validatedData.error.format(), { status: 400 });
        }

        const buffer = Buffer.from(await formdata.image.arrayBuffer());

        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${randomUUID()}.png`,
            Body: buffer
        };

        const objects = await s3.upload(params).promise();
        await prisma.issue.create({
            data: { title: formdata.title, description: formdata.description, Image_URL: objects.Location }
        })
        return NextResponse.json("Form submitted", { status: 201 })
    }
    else {
        const formdata = {
            title: formData.get("title"),
            description: formData.get("description")
        }
        const validatedData = createIssueSchema.safeParse(formdata);
        if (!validatedData.success) {
            return NextResponse.json(validatedData.error.format(), { status: 400 });
        }
        await prisma.issue.create({
            data: { title: formdata.title, description: formdata.description, Image_URL: "No image given" }
        })
        return NextResponse.json("Form submitted", { status: 201 })
    }
};
