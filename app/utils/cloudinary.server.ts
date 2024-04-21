import cloudinary from 'cloudinary';
import { writeAsyncIterableToWritable } from '@remix-run/node';

cloudinary.v2.config({
  cloud_name: 'dfsjjkfn8',
  api_key: '567738349734712',
  api_secret: '0b1XvTD1UnoWphiwW9Z8FK1Dlsg',
});

async function uploadImage(data: any) {
  try {
    // eslint-disable-next-line no-async-promise-executor
    const uploadPromise = new Promise(async (resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { folder: 'remixImages' },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        },
      );
      await writeAsyncIterableToWritable(data, uploadStream);
    });
    return uploadPromise as any;
  } catch (err) {
    throw new Error(err as string);
  }
}

export { uploadImage };
