import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TemplateSelector from './TemplateSelector';
import './ResumeForm.css';

const ResumeForm = () => {
  const navigate = useNavigate();

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

  const [selectedTemplate, setSelectedTemplate] = useState('classic');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResume((prev) => ({ ...prev, [name]: value }));
  };

  // Generic handler for array fields
  const handleArrayChange = (field, index, key, value) => {
    const newArr = [...resume[field]];
    newArr[index][key] = value;
    setResume((prev) => ({ ...prev, [field]: newArr }));
  };

  const handleAddArrayItem = (field, emptyItem) => {
    setResume((prev) => ({
      ...prev,
      [field]: [...prev[field], emptyItem]
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    if (resume[field].length > 1) {
      setResume((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure the URL matches your backend endpoint
      const response = await axios.post('/api/resumes/create', resume);
      if (response.status === 201) {
        const createdResume = response.data;
        // Navigate to preview page with the created resume data and selected template
        navigate('/resume-preview', { state: { resumeData: createdResume, template: selectedTemplate } });
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* Personal Information */}
      <div className="form-section">
        <h2>Personal Information</h2>
        <label htmlFor="name">Full Name</label>
        <input id="name" name="name" value={resume.name} onChange={handleChange} placeholder="Full Name" required />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={resume.email} onChange={handleChange} placeholder="Email" required />

        <label htmlFor="phone">Phone Number</label>
        <input id="phone" name="phone" value={resume.phone} onChange={handleChange} placeholder="Phone Number" />

        <label htmlFor="address">Address</label>
        <input id="address" name="address" value={resume.address} onChange={handleChange} placeholder="Address" />
      </div>

      {/* Professional Summary */}
      <div className="form-section">
        <h2>Professional Summary</h2>
        <label htmlFor="summary">Summary</label>
        <textarea id="summary" name="summary" value={resume.summary} onChange={handleChange} placeholder="Summary" />
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
                  onClick={() => handleAddArrayItem('workExperience', { jobTitle: '', company: '', duration: '', description: '' })}
                  title="Add Work Experience"
                >
                  +
                </button>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => handleRemoveArrayItem('workExperience', index)}
                  title="Remove Work Experience"
                  disabled={resume.workExperience.length === 1}
                >
                  &times;
                </button>
              </div>
            </div>
            <label htmlFor={`jobTitle-${index}`}>Job Title</label>
            <input
              id={`jobTitle-${index}`}
              value={exp.jobTitle}
              onChange={(e) => handleArrayChange('workExperience', index, 'jobTitle', e.target.value)}
              placeholder="Job Title"
            />

            <label htmlFor={`company-${index}`}>Company</label>
            <input
              id={`company-${index}`}
              value={exp.company}
              onChange={(e) => handleArrayChange('workExperience', index, 'company', e.target.value)}
              placeholder="Company Name"
            />

            <label htmlFor={`duration-${index}`}>Duration</label>
            <input
              id={`duration-${index}`}
              value={exp.duration}
              onChange={(e) => handleArrayChange('workExperience', index, 'duration', e.target.value)}
              placeholder="Duration"
            />

            <label htmlFor={`description-${index}`}>Description</label>
            <textarea
              id={`description-${index}`}
              value={exp.description}
              onChange={(e) => handleArrayChange('workExperience', index, 'description', e.target.value)}
              placeholder="Description"
            />
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="form-section">
        <h2>Education</h2>
        {resume.education.map((edu, index) => (
          <div key={index} className="education-section">
            <div className="section-header">
              <h3>Education {index + 1}</h3>
              <div className="btn-group">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => handleAddArrayItem('education', { degree: '', institution: '', duration: '', details: '' })}
                  title="Add Education"
                >
                  +
                </button>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => handleRemoveArrayItem('education', index)}
                  title="Remove Education"
                  disabled={resume.education.length === 1}
                >
                  &times;
                </button>
              </div>
            </div>
            <label htmlFor={`degree-${index}`}>Degree</label>
            <input
              id={`degree-${index}`}
              value={edu.degree}
              onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
              placeholder="Degree"
            />
            <label htmlFor={`institution-${index}`}>Institution</label>
            <input
              id={`institution-${index}`}
              value={edu.institution}
              onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
              placeholder="Institution"
            />
            <label htmlFor={`durationEdu-${index}`}>Duration</label>
            <input
              id={`durationEdu-${index}`}
              value={edu.duration}
              onChange={(e) => handleArrayChange('education', index, 'duration', e.target.value)}
              placeholder="Duration"
            />
            <label htmlFor={`details-${index}`}>Details</label>
            <textarea
              id={`details-${index}`}
              value={edu.details}
              onChange={(e) => handleArrayChange('education', index, 'details', e.target.value)}
              placeholder="Details"
            />
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="form-section">
        <h2>Skills</h2>
        <label htmlFor="skills">List your skills (comma separated)</label>
        <textarea id="skills" name="skills" value={resume.skills} onChange={handleChange} placeholder="e.g. JavaScript, React, Node.js" />
      </div>

      {/* Projects */}
      <div className="form-section">
        <h2>Projects</h2>
        {resume.projects.map((proj, index) => (
          <div key={index} className="project-section">
            <div className="section-header">
              <h3>Project {index + 1}</h3>
              <div className="btn-group">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => handleAddArrayItem('projects', { title: '', description: '', technologies: '', link: '' })}
                  title="Add Project"
                >
                  +
                </button>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => handleRemoveArrayItem('projects', index)}
                  title="Remove Project"
                  disabled={resume.projects.length === 1}
                >
                  &times;
                </button>
              </div>
            </div>
            <label htmlFor={`title-${index}`}>Title</label>
            <input
              id={`title-${index}`}
              value={proj.title}
              onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
              placeholder="Project Title"
            />
            <label htmlFor={`descriptionProj-${index}`}>Description</label>
            <textarea
              id={`descriptionProj-${index}`}
              value={proj.description}
              onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
              placeholder="Project Description"
            />
            <label htmlFor={`technologies-${index}`}>Technologies</label>
            <input
              id={`technologies-${index}`}
              value={proj.technologies}
              onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value)}
              placeholder="Technologies Used"
            />
            <label htmlFor={`link-${index}`}>Link</label>
            <input
              id={`link-${index}`}
              value={proj.link}
              onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)}
              placeholder="Project URL"
            />
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="form-section">
        <h2>Certifications</h2>
        <label htmlFor="certifications">Certifications (comma separated)</label>
        <textarea id="certifications" name="certifications" value={resume.certifications} onChange={handleChange} placeholder="e.g. AWS Certified, PMP" />
      </div>

      {/* Languages */}
      <div className="form-section">
        <h2>Languages</h2>
        <label htmlFor="languages">Languages</label>
        <input id="languages" name="languages" value={resume.languages} onChange={handleChange} placeholder="e.g. English, Spanish" />
      </div>

      {/* Volunteer Experience */}
      <div className="form-section">
        <h2>Volunteer Experience</h2>
        <label htmlFor="volunteerExperience">Volunteer Experience</label>
        <textarea id="volunteerExperience" name="volunteerExperience" value={resume.volunteerExperience} onChange={handleChange} placeholder="Describe any volunteer work" />
      </div>

      {/* Interests */}
      <div className="form-section">
        <h2>Interests</h2>
        <label htmlFor="interests">Interests</label>
        <textarea id="interests" name="interests" value={resume.interests} onChange={handleChange} placeholder="e.g. Reading, Traveling" />
      </div>

      {/* Template Selection */}
      <div className="form-section">
        <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
      </div>

      <div className="button-group">
        <button type="submit">Generate Resume</button>
      </div>
    </form>
  );
};

export default ResumeForm;
