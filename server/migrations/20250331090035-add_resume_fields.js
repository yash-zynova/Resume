"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("resumes", "phone", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("resumes", "address", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("resumes", "workExperience", {
      type: Sequelize.JSON, // Stores an array of objects (jobTitle, company, duration, description)
      allowNull: true,
    });
    await queryInterface.addColumn("resumes", "education", {
      type: Sequelize.JSON, // Stores an array of education objects (degree, institution, duration, details)
      allowNull: true,
    });
    await queryInterface.addColumn("resumes", "skills", {
      type: Sequelize.JSON, // Stores an array of skills
      allowNull: true,
    });
    await queryInterface.addColumn("resumes", "projects", {
      type: Sequelize.JSON, // Stores an array of project objects (title, description, technologies, link)
      allowNull: true,
    });
    await queryInterface.addColumn("resumes", "certifications", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("resumes", "languages", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("resumes", "volunteerExperience", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn("resumes", "interests", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("resumes", "phone");
    await queryInterface.removeColumn("resumes", "address");
    await queryInterface.removeColumn("resumes", "workExperience");
    await queryInterface.removeColumn("resumes", "education");
    await queryInterface.removeColumn("resumes", "skills");
    await queryInterface.removeColumn("resumes", "projects");
    await queryInterface.removeColumn("resumes", "certifications");
    await queryInterface.removeColumn("resumes", "languages");
    await queryInterface.removeColumn("resumes", "volunteerExperience");
    await queryInterface.removeColumn("resumes", "interests");
  },
};
