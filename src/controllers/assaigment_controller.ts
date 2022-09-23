import { NextFunction, Router, Request, Response, request, response } from "express";
import Assaigment from "../models/assaigment";

import mongoose from "mongoose";

const router = Router();


//get assaigments t sutudents
router.get("/get-assaigments/:class_id", (req: Request, res: Response, next: NextFunction) => {
   const classId = req.params.class_id;
   const query = { post_to: classId }
   return Assaigment.find(query)
      .then(assaigments => res.status(200).json(assaigments))
      .catch(error => res.status(500).json(error))
})

//get assaigments to teachers
router.get("/get-assaigments-teacher/:teacher_id", (req: Request, res: Response, next: NextFunction) => {
   const teacher_id = req.params.teacher_id;
   const query = { post_by: teacher_id }
   return Assaigment.find(query)
      .then(assaigments => res.status(200).json(assaigments))
      .catch(error => res.status(500).json(error))
})


//add assaigment
router.post("/create-assaigment", (req: Request, res: Response, next: NextFunction) => {
   const { name, deadline, post_by, post_to } = req.body;

   const assaigment = new Assaigment(
      {
         _id: new mongoose.Types.ObjectId(),
         name, deadline, post_by, post_to
      })

   return assaigment.save().then(assaigment => res.status(200)
      .json({ assaigment }))
      .catch(error => res.status(500).json(error))

})


//close assaigment
router.delete("/delete-assaigment/:id", (req: Request, res: Response, next: NextFunction) => {
   const __id = req.params.id;

   return Assaigment.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})
//update assaigment
router.put("/update-assaigment/:id", (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;

   return Assaigment.findById(id)
      .then(assaigment => {
         if (assaigment) {
            assaigment.set(req.body)
            assaigment.save().then(result => res.status(201).json({ assaigment: result })).catch(err => res.status(500).json({ error: err }))
         } else {
            return res.status(404).send({ error: "assaigment not found" });
         }
      })
      .catch(err => res.status(500).json({ error: err }))
})




export = router