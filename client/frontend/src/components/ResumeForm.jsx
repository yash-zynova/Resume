import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle changes for top-level fields
  const handleChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.value });
  };

  // Handle changes for work experience fields
  const handleWorkExperienceChange = (index, e) => {
    const newWorkExperience = resume.workExperience.map((item, i) => {
      if (i === index) {
        return { ...item, [e.target.name]: e.target.value };
      }
      return item;
    });
    setResume({ ...resume, workExperience: newWorkExperience });
  };

  // Handle changes for education fields
  const handleEducationChange = (index, e) => {
    const newEducation = resume.education.map((item, i) => {
      if (i === index) {
        return { ...item, [e.target.name]: e.target.value };
      }
      return item;
    });
    setResume({ ...resume, education: newEducation });
  };

  // Handle changes for project fields
  const handleProjectsChange = (index, e) => {
    const newProjects = resume.projects.map((item, i) => {
      if (i === index) {
        return { ...item, [e.target.name]: e.target.value };
      }
      return item;
    });
    setResume({ ...resume, projects: newProjects });
  };

  // Add new work experience entry
  const addWorkExperience = () => {
    setResume({
      ...resume,
      workExperience: [
        ...resume.workExperience,
        { jobTitle: '', company: '', duration: '', description: '' },
      ],
    });
  };

  // Add new education entry
  const addEducation = () => {
    setResume({
      ...resume,
      education: [
        ...resume.education,
        { degree: '', institution: '', duration: '', details: '' },
      ],
    });
  };

  // Add new project entry
  const addProject = () => {
    setResume({
      ...resume,
      projects: [
        ...resume.projects,
        { title: '', description: '', technologies: '', link: '' },
      ],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('/api/resumes/create', resume);
      navigate('/preview', { state: { resumeData: data.data } });
    } catch {
      setError('Failed to generate resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
      {error && <p className="text-red-500">{error}</p>}

      {/* Basic Information */}
      <div>
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          className="w-full border rounded p-2 mt-1"
          value={resume.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          name="email"
          className="w-full border rounded p-2 mt-1"
          value={resume.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Phone:</label>
        <input
          type="text"
          name="phone"
          className="w-full border rounded p-2 mt-1"
          value={resume.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Address:</label>
        <input
          type="text"
          name="address"
          className="w-full border rounded p-2 mt-1"
          value={resume.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Professional Summary:</label>
        <textarea
          name="summary"
          className="w-full border rounded p-2 mt-1"
          value={resume.summary}
          onChange={handleChange}
          required
        />
      </div>

      {/* Work Experience Section */}
      <div>
        <h3 className="text-lg font-bold mt-4">Work Experience</h3>
        {resume.workExperience.map((exp, index) => (
          <div key={index} className="border p-4 rounded mt-2">
            <div>
              <label className="block text-gray-700">Job Title:</label>
              <input
                type="text"
                name="jobTitle"
                className="w-full border rounded p-2 mt-1"
                value={exp.jobTitle}
                onChange={(e) => handleWorkExperienceChange(index, e)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Company:</label>
              <input
                type="text"
                name="company"
                className="w-full border rounded p-2 mt-1"
                value={exp.company}
                onChange={(e) => handleWorkExperienceChange(index, e)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Duration:</label>
              <input
                type="text"
                name="duration"
                className="w-full border rounded p-2 mt-1"
                value={exp.duration}
                onChange={(e) => handleWorkExperienceChange(index, e)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Description:</label>
              <textarea
                name="description"
                className="w-full border rounded p-2 mt-1"
                value={exp.description}
                onChange={(e) => handleWorkExperienceChange(index, e)}
                required
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addWorkExperience}
          className="bg-green-500 text-white px-3 py-1 rounded mt-2"
        >
          Add Work Experience
        </button>
      </div>

      {/* Education Section */}
      <div>
        <h3 className="text-lg font-bold mt-4">Education</h3>
        {resume.education.map((edu, index) => (
          <div key={index} className="border p-4 rounded mt-2">
            <div>
              <label className="block text-gray-700">Degree:</label>
              <input
                type="text"
                name="degree"
                className="w-full border rounded p-2 mt-1"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, e)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Institution:</label>
              <input
                type="text"
                name="institution"
                className="w-full border rounded p-2 mt-1"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, e)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Duration:</label>
              <input
                type="text"
                name="duration"
                className="w-full border rounded p-2 mt-1"
                value={edu.duration}
                onChange={(e) => handleEducationChange(index, e)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Details:</label>
              <textarea
                name="details"
                className="w-full border rounded p-2 mt-1"
                value={edu.details}
                onChange={(e) => handleEducationChange(index, e)}
                required
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addEducation}
          className="bg-green-500 text-white px-3 py-1 rounded mt-2"
        >
          Add Education
        </button>
      </div>

      {/* Skills */}
      <div>
        <label className="block text-gray-700">Skills:</label>
        <textarea
          name="skills"
          className="w-full border rounded p-2 mt-1"
          value={resume.skills}
          onChange={handleChange}
          required
        />
      </div>

      {/* Projects Section */}
      <div>
        <h3 className="text-lg font-bold mt-4">Projects</h3>
        {resume.projects.map((proj, index) => (
          <div key={index} className="border p-4 rounded mt-2">
            <div>
              <label className="block text-gray-700">Title:</label>
              <input
                type="text"
                name="title"
                className="w-full border rounded p-2 mt-1"
                value={proj.title}
                onChange={(e) => handleProjectsChange(index, e)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Description:</label>
              <textarea
                name="description"
                className="w-full border rounded p-2 mt-1"
                value={proj.description}
                onChange={(e) => handleProjectsChange(index, e)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Technologies:</label>
              <input
                type="text"
                name="technologies"
                className="w-full border rounded p-2 mt-1"
                value={proj.technologies}
                onChange={(e) => handleProjectsChange(index, e)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Link:</label>
              <input
                type="url"
                name="link"
                className="w-full border rounded p-2 mt-1"
                value={proj.link}
                onChange={(e) => handleProjectsChange(index, e)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addProject}
          className="bg-green-500 text-white px-3 py-1 rounded mt-2"
        >
          Add Project
        </button>
      </div>

      {/* Additional Information */}
      <div>
        <label className="block text-gray-700">Certifications:</label>
        <textarea
          name="certifications"
          className="w-full border rounded p-2 mt-1"
          value={resume.certifications}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-gray-700">Languages:</label>
        <input
          type="text"
          name="languages"
          className="w-full border rounded p-2 mt-1"
          value={resume.languages}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-gray-700">Volunteer Experience:</label>
        <textarea
          name="volunteerExperience"
          className="w-full border rounded p-2 mt-1"
          value={resume.volunteerExperience}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-gray-700">Interests:</label>
        <textarea
          name="interests"
          className="w-full border rounded p-2 mt-1"
          value={resume.interests}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        {loading ? 'Generating...' : 'Generate Resume'}
      </button>
    </form>
  );
};

export default ResumeForm;
