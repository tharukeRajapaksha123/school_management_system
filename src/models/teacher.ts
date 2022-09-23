import mongoose, { Schema } from "mongoose";

export interface ITeacher {
   name: string,
}

export interface ITeacherModel extends ITeacher, Document { }

const TeacherSchema: Schema = new Schema({
   name: { type: String, required: true },
},
   {
      versionKey: false
   }
)

export default mongoose.model<ITeacherModel>("Teacher", TeacherSchema)