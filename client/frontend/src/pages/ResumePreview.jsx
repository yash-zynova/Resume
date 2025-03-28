import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ResumePreview = () => {
  const [resume, setResume] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.resumeData) {
      setResume(location.state.resumeData);
    } else {
      axios.get('/api/resumes/latest')
        .then(response => setResume(response.data.data))
        .catch(error => console.error('Error fetching resume:', error));
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Resume Preview</h1>
        {resume ? (
          <div className="border p-6 rounded shadow bg-white">
            <h2 className="text-2xl font-semibold">{resume.name}</h2>
            <p className="text-gray-600">{resume.email}</p>
            <div className="mt-4">
              <h3 className="text-xl font-bold">Professional Summary</h3>
              <p>{resume.summary}</p>
            </div>
          </div>
        ) : (
          <p>Loading resume...</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ResumePreview;
