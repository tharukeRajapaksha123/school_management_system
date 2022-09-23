import { NextFunction, Router, Request, Response, request, response } from "express";
import Notice from "../models/notice";

import mongoose from "mongoose";

const router = Router();


//get Notices of student or teacher
router.get("/get-notices", (req: Request, res: Response, next: NextFunction) => {
   return Notice.find()
      .then(Notices => res.status(200).json(Notices))
      .catch(error => res.status(500).json(error))
})


//add assaigment
router.post("/create-notice", (req: Request, res: Response, next: NextFunction) => {
   const { published_by, notice } = req.body;

   const n = new Notice(
      {
         _id: new mongoose.Types.ObjectId(),
         published_by, notice
      })

   return n.save().then(notice => res.status(200)
      .json({ notice }))
      .catch(error => res.status(500).json(error))

})


//delete Notice
router.delete("/delete-notice/:id", (req: Request, res: Response, next: NextFunction) => {
   const __id = req.params.id;

   return Notice.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})
//update Notice
router.put("/update-notice/:id", (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;

   return Notice.findById(id)
      .then(Notice => {
         if (Notice) {
            Notice.set(req.body)
            Notice.save().then(result => res.status(201).json({ Notice: result })).catch(err => res.status(500).json({ error: err }))
         } else {
            return res.status(404).send({ error: "Notice not found" });
         }
      })
      .catch(err => res.status(500).json({ error: err }))
})




export = router