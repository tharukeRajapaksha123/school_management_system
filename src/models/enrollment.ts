import mongoose, { Schema } from "mongoose";

export interface IEnrollment {
   class_id: string,
   enroller_id: string,
}

export interface IEnrollmentModel extends IEnrollment, Document { }

const EnrollmentSchema: Schema = new Schema({
   class_id: { type: String, required: true },
   enroller_id: { type: String, required: true },
},
   {
      versionKey: false
   }
)

export default mongoose.model<IEnrollmentModel>("Enrollment", EnrollmentSchema)