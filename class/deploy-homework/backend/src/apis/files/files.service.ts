import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async upload({ files }) {
    // 파일을 클라우드 스토리지에 저장하는 로직

    // console.log(files);
    // const aaa = await files[0];
    // const bbb = await files[1];

    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles); // [file, file]

    const bucket = 'codecamp-backend04-storage';
    const storage = new Storage({
      projectId: 'codecamp-backend04',
      keyFilename: 'gcp-file-storage.json',
    }).bucket(bucket);

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${el.filename}`))
              .on('error', () => reject('Fail !!'));
          }),
      ),
    );

    return results;
  }
}
