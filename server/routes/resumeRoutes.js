const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");

// Route to create a new resume

router.post("/create", resumeController.createResume);

// Route to get all resumes

router.get("/latest", resumeController.getLatestResume);

// Route to get a resume by ID

router.get("/:id", resumeController.getResumes);

// Route to update a resume by ID

router.put("/:id", resumeController.updateResume);

// Route to delete a resume by ID

router.delete("/:id", resumeController.deleteResume);

module.exports = router;
