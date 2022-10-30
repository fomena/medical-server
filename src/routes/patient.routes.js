import express from "express";
import PatientCtrl from "../controllers/patient.controllers.js";
const router = express.Router();
router.route("/api/patients")
    .get(PatientCtrl.list)
    .post(PatientCtrl.create);




router.route("/api/patients/:patientId")
    .get(PatientCtrl.read)
    .put( PatientCtrl.update)
    .delete(PatientCtrl.remove);





router.param('patientId', PatientCtrl.userByID);





export default router;