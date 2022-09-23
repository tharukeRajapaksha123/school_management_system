import { NextFunction, Router, Request, Response, request, response } from "express";
import Submission, { ISubmission } from "../models/submission";
import Assaigment, { IAssaigment } from "../models/assaigment";
const router = Router()




//add submission
router.post("/create-submission", (req: Request, res: Response, next: NextFunction) => {
   const { assaigment_id, student_id, submitted_at, marks, download_url } = req.body
   const submission = new Submission(
      { assaigment_id, student_id, submitted_at, marks, download_url }
   )

   return submission.save().then(() => res.status(201).json({ submission })).catch(err => res.status(500).json({ error: err }))
})


//edit submission marks
router.put("/update-submission/:id", (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return Submission.findById(id).then(submission => {
      if (submission) {
         submission.set(req.body)
         submission.save()
              .then(result => res.status(201)
               .json({ assaigment: result }))
            .catch(err => res.status(500).json({ error: err }))
      } else {
         return res.status(404).json({ "message": "submission not found" })
      }
   }).catch(err => res.status(500).json({ error: err }))
})

//delete submission
router.delete("/delete-submission/id", (req: Request, res: Response, next: NextFunction) => {
    const __id = req.params.id;

   return Submission.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})

//get submisions to teachers
router.get("/get-submissions-teachers/:assaigment_id", (req: Request, res: Response, next: NextFunction) => {

   const assaigment_id = req.params.assaigment_id;

    const query = { assaigment_id: assaigment_id }
   return Submission.find(query)
      .then(submission => res.status(200).json(submission))
      .catch(error => res.status(500).json(error))

})

//get submison to students
router.get("/get-submissions-students/:id", (req: Request, res: Response, next: NextFunction) => {
   const studetn_id = req.params.id;
   const query = { student_id: studetn_id }
   return Submission.find(query)
      .then(submission => res.status(200).json(submission))
      .catch(error => res.status(500).json(error))
})






export = router