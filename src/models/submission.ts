import mongoose, { Schema } from "mongoose";

export interface ISubmission {
   assaigment_id: string,
   student_id : string,
   submitted_at : Date,
   marks : Number,
   download_url :string
}

export interface ISubmissionModel extends ISubmission, Document { }

const SubmissionSchema: Schema = new Schema({
   assaigment_id: { type: String, required: true },
   student_id: { type: String, required: true },
   submitted_at: { type: Date, required: true },
   marks: { type: Number, required: true },
   download_url: { type: String, required: true },

},
   {
      versionKey: false
   }
)

export default mongoose.model<ISubmissionModel>("Submission", SubmissionSchema)