import React, { useState } from 'react';
import './ResumeForm.css';

const ResumeForm = () => {
  const [resume, setResume] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    workExperience: [{ jobTitle: '', company: '', duration: '', description: '' }],
    education: [{ degree: '', institution: '', duration: '', details: '' }],
    skills: '',
    projects: [{ title: '', description: '', technologies: '', link: '' }],
    certifications: '',
    languages: '',
    volunteerExperience: '',
    interests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResume((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const newWork = [...resume.workExperience];
    newWork[index][field] = value;
    setResume((prev) => ({ ...prev, workExperience: newWork }));
  };

  // Always adds a new entry at the end.
  const handleAddWorkExperience = () => {
    setResume((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        { jobTitle: '', company: '', duration: '', description: '' }
      ]
    }));
  };

  // Removes the entry at the given index, if more than one exists.
  const handleRemoveWorkExperience = (index) => {
    if (resume.workExperience.length > 1) {
      setResume((prev) => ({
        ...prev,
        workExperience: prev.workExperience.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to the backend API
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* Personal Information */}
      <div className="form-section">
        <h2>Personal Information</h2>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          value={resume.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={resume.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          value={resume.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />

        <label htmlFor="address">Address</label>
        <input
          id="address"
          name="address"
          value={resume.address}
          onChange={handleChange}
          placeholder="Address"
        />
      </div>

      {/* Professional Summary */}
      <div className="form-section">
        <h2>Professional Summary</h2>
        <label htmlFor="summary">Summary</label>
        <textarea
          id="summary"
          name="summary"
          value={resume.summary}
          onChange={handleChange}
          placeholder="Summary"
        />
      </div>

      {/* Work Experience */}
      <div className="form-section">
        <h2>Work Experience</h2>
        {resume.workExperience.map((exp, index) => (
          <div key={index} className="experience-section">
            <div className="experience-header">
              <h3>Experience {index + 1}</h3>
              <div className="btn-group">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={handleAddWorkExperience}
                  title="Add Work Experience"
                >
                  +
                </button>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => handleRemoveWorkExperience(index)}
                  title="Remove Work Experience"
                  // Optionally disable remove if only one exists:
                  disabled={resume.workExperience.length === 1}
                >
                  &times;
                </button>
              </div>
            </div>

            <label htmlFor={`jobTitle-${index}`}>Job Title</label>
            <input
              id={`jobTitle-${index}`}
              name="jobTitle"
              value={exp.jobTitle}
              onChange={(e) =>
                handleWorkExperienceChange(index, 'jobTitle', e.target.value)
              }
              placeholder="Job Title"
            />

            <label htmlFor={`company-${index}`}>Company</label>
            <input
              id={`company-${index}`}
              name="company"
              value={exp.company}
              onChange={(e) =>
                handleWorkExperienceChange(index, 'company', e.target.value)
              }
              placeholder="Company Name"
            />

            <label htmlFor={`duration-${index}`}>Duration</label>
            <input
              id={`duration-${index}`}
              name="duration"
              value={exp.duration}
              onChange={(e) =>
                handleWorkExperienceChange(index, 'duration', e.target.value)
              }
              placeholder="Duration"
            />

            <label htmlFor={`description-${index}`}>Description</label>
            <textarea
              id={`description-${index}`}
              name="description"
              value={exp.description}
              onChange={(e) =>
                handleWorkExperienceChange(index, 'description', e.target.value)
              }
              placeholder="Description"
            />
          </div>
        ))}
      </div>

      <div className="button-group">
        <button type="submit">Generate Resume</button>
      </div>
    </form>
  );
};

export default ResumeForm;
