import mongoose, { Schema } from "mongoose";

export interface IStudent {
   name: string,
}

export interface IStudentModel extends IStudent, Document { }

const StudentSchema: Schema = new Schema({
   name: { type: String, required: true },
},
   {
      versionKey: false
   }
)

export default mongoose.model<IStudentModel>("Student", StudentSchema)