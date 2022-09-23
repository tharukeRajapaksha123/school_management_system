import { NextFunction, Router, Request, Response, request, response } from "express";
import Enrollment from "../models/enrollment";

import mongoose from "mongoose";

const router = Router();


//get Enrollments of student or teacher
router.get("/get-enrollements/:id", (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;

   const query = {enroller_id : id}
   return Enrollment.find(query)
      .then(Enrollments => res.status(200).json(Enrollments))
      .catch(error => res.status(500).json(error))
})


//add assaigment
router.post("/create-enrollement", (req: Request, res: Response, next: NextFunction) => {
   const { class_id, enroller_id } = req.body;

   const enrollment = new Enrollment(
      {
         _id: new mongoose.Types.ObjectId(),
         class_id, enroller_id
      })

   return enrollment.save().then(enrollment => res.status(200)
      .json({ enrollment }))
      .catch(error => res.status(500).json(error))

})


//delete Enrollment
router.delete("/delete-enrollement/:id", (req: Request, res: Response, next: NextFunction) => {
   const __id = req.params.id;

   return Enrollment.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})
//update Enrollment
router.put("/update-enrollement/:id", (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;

   return Enrollment.findById(id)
      .then(Enrollment => {
         if (Enrollment) {
            Enrollment.set(req.body)
            Enrollment.save().then(result => res.status(201).json({ Enrollment: result })).catch(err => res.status(500).json({ error: err }))
         } else {
            return res.status(404).send({ error: "Enrollment not found" });
         }
      })
      .catch(err => res.status(500).json({ error: err }))
})




export = router