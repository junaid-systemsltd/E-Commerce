import path from 'path';
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    // Checking Request Content Type must be multipart/form-data
    if (!req.headers.get('content-type')?.startsWith('multipart/form-data')) {
        return NextResponse.json(
            {
                message: 'Content-Type must be multipart/form-data',
                status: false,
            },
            {
                status: 400,
            },
        );
    }

    // Extracting Image from formData
    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file) {
        return NextResponse.json(
            { message: 'No files received.', status: false },
            { status: 400 },
        );
    }

    // converting file into buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // generate unique file name
    const filename = `${Date.now()}_${file.name
        .toLowerCase()
        .replaceAll(' ', '_')}`;

    // file destination path
    const filePath = path.join(process.cwd(), 'public/images/' + filename);

    try {
        // write filing desired location
        await writeFile(filePath, buffer);
        return NextResponse.json(
            { message: 'Success', status: true, file: `/images/${filename}` },
            { status: 201 },
        );
    } catch (error) {
        console.log('Error occurred ', error);
        return NextResponse.json({ message: 'Failed', status: false });
    }
};
