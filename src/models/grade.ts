import mongoose, { Schema } from "mongoose";

export interface ITeacher {
   name: string,
   enrollment_key: string,
}

export interface ITeacherModel extends ITeacher, Document { }

const TeacherSchema: Schema = new Schema({
   name: { type: String, required: true },
   enrollment_key: { type: String, required: true },
},
   {
      versionKey: false
   }
)

export default mongoose.model<ITeacherModel>("Teacher", TeacherSchema)