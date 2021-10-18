import * as multerGoogleStorage from "multer-google-storage";
import * as uuid from 'uuid';
import {extname, resolve} from 'path';


export const storageConfig = {
    storage: multerGoogleStorage.storageEngine({
        projectId: 'cp-itr',
        keyFilename: resolve(__dirname, 'cp-itr-b84639e70e2f.json'),
        bucket: 'staging.cp-itr.appspot.com',
        filename: (req, file, cb) => {
            console.log(file)
            const fileExt = extname(file.originalname);
            cb(null,  `${uuid.v4()}${fileExt}`);
        },
    })
};