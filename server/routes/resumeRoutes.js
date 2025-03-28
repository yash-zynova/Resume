const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");

// Route to create a new resume

router.post("/resumes", resumeController.createResume);

// Route to get a resume by ID

router.get("/resumes/:id", resumeController.getResumeById);

// Route to update a resume by ID

router.put("/resumes/:id", resumeController.updateResume);

// Route to delete a resume by ID

router.delete("/resumes/:id", resumeController.deleteResume);

// Route to get all resumes

router("/resumes", resumeController.getAllResumes);

module.exports = router;
