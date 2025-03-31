module.exports = (sequelize, DataTypes) => {
  const Resume = sequelize.define(
    "Resume",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      workExperience: {
        type: DataTypes.JSON, // Stores an array of work experience objects (jobTitle, company, duration, description)
        allowNull: true,
      },
      education: {
        type: DataTypes.JSON, // Stores an array of education objects (degree, institution, duration, details)
        allowNull: true,
      },
      skills: {
        type: DataTypes.JSON, // Can store an array of skills, e.g., ["JavaScript", "React", "Node.js"]
        allowNull: true,
      },
      projects: {
        type: DataTypes.JSON, // Stores an array of project objects (title, description, technologies, link)
        allowNull: true,
      },
      certifications: {
        type: DataTypes.STRING, // Optionally, you can change this to JSON if you need to store multiple certifications with details
        allowNull: true,
      },
      languages: {
        type: DataTypes.STRING, // Alternatively, change to JSON for an array of languages
        allowNull: true,
      },
      volunteerExperience: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      interests: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "resumes",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  // Custom static method to retrieve the most recent resume
  Resume.getLatest = async function () {
    return await Resume.findOne({
      order: [["created_at", "DESC"]],
    });
  };

  return Resume;
};
