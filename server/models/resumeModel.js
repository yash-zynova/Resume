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
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "resumes",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false, // if you don't need an updatedAt column, set to false
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
