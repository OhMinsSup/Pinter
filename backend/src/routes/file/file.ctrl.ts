import { Request, Response } from 'express';
import * as filesize from 'filesize';
import * as AWS from 'aws-sdk';
import * as config from '../../config/config';
import User, { IUser } from '../../database/models/User';

const s3 = new AWS.S3({
  region: 'ap-northeast-2',
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_KEY,
});

/**@return {void}
 * @description 파일을 업로드하는 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const createSignedUrl = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({
      name: 'file',
      payload: '파일이 존재하지 않습니다.',
    });
  }

  const userId: string = req['user']._id;
  const displayName: string = req['user'].displayName;
  const stats = filesize(file.size);

  // 10MB 크기 제한
  if (parseInt(stats, 10) > 10000) {
    res.status(413).json({
      name: '파일 사이즈 초과',
      payload: '10MB',
    });
  }

  try {
    const { _id: id }: IUser = await User.findById(userId)
      .lean()
      .exec();
    const filePath: string = `pinter-file/${displayName}/${id}/${
      file.originalname
    }`;

    const response = await s3
      .upload({
        Bucket: 'pinterfiles',
        Key: filePath,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();

    if (!response || !response.ETag) return res.status(418);

    res.json({
      url: response.Location,
      path: response.Key,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};
