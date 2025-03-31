import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    summary: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('/api/resumes/create', formData);
      navigate('/preview', { state: { resumeData: data.data } });
    } catch  {
      setError('Failed to generate resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          className="w-full border rounded p-2 mt-1"
          value={formData.name}
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
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Professional Summary:</label>
        <textarea
          name="summary"
          className="w-full border rounded p-2 mt-1"
          value={formData.summary}
          onChange={handleChange}
          required
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
