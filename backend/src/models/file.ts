import { Schema, model, Document, Model } from 'mongoose';

export interface IFile extends Document {
    _id: string;
    name: string;
    originalname: string;
    mimetype: string;
    size: number;
    path: string;
}

export interface IFileModel extends Model<IFile> {

}

const FileSchema = new Schema({
    name: String,
    originalname: String,
    mimetype: String,
    size: Number,
    path: String,
}, { timestamps: true });

const FileModel = model<IFile>('File', FileSchema) as IFileModel;

export default FileModel;

