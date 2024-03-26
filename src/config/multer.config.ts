import { NotAcceptableException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AllowedFileTypes } from 'src/enum/allowed-file-type.enum';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(
        null,
        file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
      );
    },
  }),
  fileFilter: (req, file, callback) => {
    // Extract file type from the mime type
    let fileType = file.mimetype.split('/')[0];

    if(fileType === 'application'){
      fileType = file.mimetype.split('/')[1];
    }

    fileType = fileType?.split('.')?.pop()

    // Check if the file type is in the allowed types
    if (Object.values(AllowedFileTypes).includes(fileType)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type'), false);
    }
  },
};
