import mongoose, { Schema } from "mongoose";

export interface INotice {
   published_by: string,
   notice: string,
   published_at : Date
}

export interface INoticeModel extends INotice, Document { }

const NoticeSchema: Schema = new Schema({
   published_by: { type: String, required: true },
   notice: { type: String, required: true },
   published_date : {type :Date,default : Date.now() }
},
   {
      versionKey: false
   }
)

export default mongoose.model<INoticeModel>("Notice", NoticeSchema)