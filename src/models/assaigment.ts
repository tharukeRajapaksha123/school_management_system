import mongoose, { Schema } from "mongoose";

export interface IAssaigment {
   name: string,
   deadline: Date,
   post_by: string,
   post_to: string,
}

export interface IAssaigmentModel extends IAssaigment, Document { }

const AssaigmentSchema: Schema = new Schema({
   name: { type: String, required: true },
   deadline: { type: Date, required: true },
   post_by: { type: String, required: true },
   post_to: { type: String, required: true },
},
   {
      versionKey: false
   }
)

export default mongoose.model<IAssaigmentModel>("Assaigment", AssaigmentSchema)