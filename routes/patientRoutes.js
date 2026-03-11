const express = require("express");
const router = express.Router();
const controller = require("../controllers/patientController");

// CREATE PATIENT
router.post("/patients", controller.createPatient);

// GET ALL PATIENTS
router.get("/patients", controller.getPatients);

// GET PATIENT BY ID
router.get("/patients/:id", controller.getPatientById);

// UPDATE PATIENT
router.put("/patients/:id", controller.updatePatient);

// DELETE PATIENT
router.delete("/patients/:id", controller.deletePatient);

// SEARCH PATIENT
router.get("/patients/search", controller.searchPatient);

module.exports = router;