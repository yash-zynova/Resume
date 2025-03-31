const crypto = require("crypto");
const { Resume } = require("../models");

// Create a new resume

exports.createResume = async (req, res) => {
  try {
    const { name, email, summary } = req.body;

    const resume = await Resume.create({
      name,
      email,
      summary,
    });
    res.status(201).json(resume);
  } catch (error) {
    console.error("Error creating resume:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get Resume by Id

exports.getResumes = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findByPk(id);
    if (!resume) {
      return res
        .status(404)
        .json({ success: false, message: "Resume not found" });
    }
    res.status(200).json({ success: true, resume });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Resume by Id

exports.updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, summary } = req.body;
    const resume = await Resume.findByPk(id);
    if (!resume) {
      return res
        .status(404)
        .json({ success: false, message: "Resume not found" });
    }

    // Update fields directly

    resume.name = name;
    resume.email = email;
    if (summary) {
      resume.summary = summary;
    }
    await resume.save();
    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    console.error("Error updating resume:  ", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Resume by Id

exports.deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findByPk(id);
    if (!resume) {
      return res
        .status(404)
        .json({ success: false, message: "Resume not found" });
    }
    await resume.destroy();
    res
      .status(200)
      .json({ success: true, message: "Resueme deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Latest Resume

exports.getLatestResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ order: [["id", "DESC"]] });
    if (!resume) {
      return res
        .status(404)
        .json({ success: false, message: "Resume not found" });
    }
    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    console.error("Error getting latest resume:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
