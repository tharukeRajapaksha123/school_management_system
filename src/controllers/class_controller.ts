import { NextFunction, Router, Request, Response, request, response } from "express";
import Grade from "../models/grade";

import mongoose from "mongoose";

const router = Router();


//get Grades 
router.get("/get-classes", (req: Request, res: Response, next: NextFunction) => {
 
   return Grade.find()
      .then(Grades => res.status(200).json(Grades))
      .catch(error => res.status(500).json(error))
})


//add assaigment
router.post("/create-class", (req: Request, res: Response, next: NextFunction) => {
   const { name, enrollment_key} = req.body;

   const grade = new Grade(
      {
         _id: new mongoose.Types.ObjectId(),
      name, enrollment_key
      })

   return grade.save().then(grade => res.status(200)
      .json({ grade }))
      .catch(error => res.status(500).json(error))

})


//delete Grade
router.delete("/delete-class/:id", (req: Request, res: Response, next: NextFunction) => {
   const __id = req.params.id;

   return Grade.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})
//update Grade
router.put("/update-class/:id", (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;

   return Grade.findById(id)
      .then(Grade => {
         if (Grade) {
            Grade.set(req.body)
            Grade.save().then(result => res.status(201).json({ Grade: result })).catch(err => res.status(500).json({ error: err }))
         } else {
            return res.status(404).send({ error: "Grade not found" });
         }
      })
      .catch(err => res.status(500).json({ error: err }))
})




export = router