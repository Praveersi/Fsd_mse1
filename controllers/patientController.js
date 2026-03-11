const Patient = require("../models/Patient");

// CREATE PATIENT
exports.createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PATIENTS
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PATIENT BY ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PATIENT
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PATIENT
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH PATIENT BY NAME
exports.searchPatient = async (req, res) => {
  try {
    const name = req.query.name;

    const patients = await Patient.find({
      fullName: { $regex: name, $options: "i" }
    });

    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};