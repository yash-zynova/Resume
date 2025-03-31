// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ResumeForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     summary: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const { data } = await axios.post('/api/resumes/create', formData);
//       navigate('/preview', { state: { resumeData: data.data } });
//     } catch  {
//       setError('Failed to generate resume. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
//       {error && <p className="text-red-500">{error}</p>}
//       <div>
//         <label className="block text-gray-700">Name:</label>
//         <input
//           type="text"
//           name="name"
//           className="w-full border rounded p-2 mt-1"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700">Email:</label>
//         <input
//           type="email"
//           name="email"
//           className="w-full border rounded p-2 mt-1"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700">Professional Summary:</label>
//         <textarea
//           name="summary"
//           className="w-full border rounded p-2 mt-1"
//           value={formData.summary}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
//       >
//         {loading ? 'Generating...' : 'Generate Resume'}
//       </button>
//     </form>
//   );
// };

// export default ResumeForm;





import React, { useState } from 'react';

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

  // Add handlers for adding multiple work experience, education, etc.
  // E.g., for workExperience, you may have addExperience and updateExperience functions

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to the backend API
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Personal Information</h2>
      <input name="name" value={resume.name} onChange={handleChange} placeholder="Full Name" required />
      <input name="email" type="email" value={resume.email} onChange={handleChange} placeholder="Email" required />
      <input name="phone" value={resume.phone} onChange={handleChange} placeholder="Phone Number" />
      <input name="address" value={resume.address} onChange={handleChange} placeholder="Address" />

      <h2>Professional Summary</h2>
      <textarea name="summary" value={resume.summary} onChange={handleChange} placeholder="Summary" />

      {/* Render work experience dynamically */}
      <h2>Work Experience</h2>
      {resume.workExperience.map((exp, index) => (
        <div key={index}>
          <input
            name="jobTitle"
            value={exp.jobTitle}
            onChange={(e) => {
              const newWork = [...resume.workExperience];
              newWork[index].jobTitle = e.target.value;
              setResume((prev) => ({ ...prev, workExperience: newWork }));
            }}
            placeholder="Job Title"
          />
          <input
            name="company"
            value={exp.company}
            onChange={(e) => {
              const newWork = [...resume.workExperience];
              newWork[index].company = e.target.value;
              setResume((prev) => ({ ...prev, workExperience: newWork }));
            }}
            placeholder="Company Name"
          />
          <input
            name="duration"
            value={exp.duration}
            onChange={(e) => {
              const newWork = [...resume.workExperience];
              newWork[index].duration = e.target.value;
              setResume((prev) => ({ ...prev, workExperience: newWork }));
            }}
            placeholder="Duration"
          />
          <textarea
            name="description"
            value={exp.description}
            onChange={(e) => {
              const newWork = [...resume.workExperience];
              newWork[index].description = e.target.value;
              setResume((prev) => ({ ...prev, workExperience: newWork }));
            }}
            placeholder="Description"
          />
        </div>
      ))}
      {/* Add button for adding more work experience entries */}
      <button
        type="button"
        onClick={() =>
          setResume((prev) => ({
            ...prev,
            workExperience: [...prev.workExperience, { jobTitle: '', company: '', duration: '', description: '' }]
          }))
        }
      >
        Add Work Experience
      </button>

      {/* Similar sections for Education, Projects, Certifications, etc. */}

      <button type="submit">Generate Resume</button>
    </form>
  );
};

export default ResumeForm;
