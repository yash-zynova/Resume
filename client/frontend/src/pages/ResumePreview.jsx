import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClassicTemplate from '../components/templates/ClassicTemp';
import ModernTemplate from '../components/templates/ModernTemp';
import MinimalTemplate from '../components/templates/MinimalTemp';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import html2pdf from 'html2pdf.js';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const ResumePreview = () => {
  const [resume, setResume] = useState(null);
  const [template, setTemplate] = useState('classic');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    if (location.state && location.state.resumeData) {
      setResume(location.state.resumeData);
      setTemplate(location.state.template || 'classic');
      setLoading(false);
    } else {
      axios.get('/api/resumes/latest')
        .then((response) => {
          setResume(response.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching resume:', err);
          setError('Failed to load resume. Please try again later.');
          setLoading(false);
        });
    }
  }, [location.state]);

  // Function to download resume as PDF using jsPDF and autoTable

  const downloadPDF = () => {
    const element = document.getElementById('resume-preview');
  
    const opt = {
      margin: 0.9, // Margins in inches, you will see diffrence in the pdf
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2},
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] }
    };
    html2pdf().set(opt).from(element).save();
  };
  
  // Function to download resume as DOCX using docx

  const downloadWord = () => {
    if (!resume) return;
    const doc = new Document({
      sections: [{
        children: [

          // Header

          new Paragraph({ text: resume.name, heading: 'Heading1' }),
          new Paragraph({ text: `${resume.email} | ${resume.phone} | ${resume.address}` }),
          new Paragraph({ text: '' }),

          // Summary

          new Paragraph({ text: 'Professional Summary', heading: 'Heading2' }),
          new Paragraph({ text: resume.summary || '' }),
          new Paragraph({ text: '' }),

          // Work Experience

          new Paragraph({ text: 'Work Experience', heading: 'Heading2' }),
          ...(
            resume.workExperience
              ? resume.workExperience.map(exp =>
                  new Paragraph({
                    children: [
                      new TextRun({ text: `${exp.jobTitle} at ${exp.company}`, bold: true }),
                      new TextRun({ text: ` (${exp.duration})\n${exp.description}`, break: 1 })
                    ]
                  })
                )
              : []
          ),
          new Paragraph({ text: '' }),

          // Education

          new Paragraph({ text: 'Education', heading: 'Heading2' }),
          ...(
            resume.education
              ? resume.education.map(edu =>
                  new Paragraph({
                    children: [
                      new TextRun({ text: `${edu.degree} from ${edu.institution}`, bold: true }),
                      new TextRun({ text: ` (${edu.duration})\n${edu.details}`, break: 1 })
                    ]
                  })
                )
              : []
          ),
          new Paragraph({ text: '' }),

          // Skills

          new Paragraph({ text: 'Skills', heading: 'Heading2' }),
          new Paragraph({ text: resume.skills || '' }),
          new Paragraph({ text: '' }),

          // Projects

          new Paragraph({ text: 'Projects', heading: 'Heading2' }),
          ...(
            resume.projects
              ? resume.projects.map(proj =>
                  new Paragraph({
                    children: [
                      new TextRun({ text: proj.title, bold: true }),
                      new TextRun({ text: `\n${proj.description}`, break: 1 }),
                      new TextRun({ text: `Technologies: ${proj.technologies}`, break: 1 }),
                      new TextRun({ text: `Link: ${proj.link || 'N/A'}`, break: 1 })
                    ]
                  })
                )
              : []
          ),
          new Paragraph({ text: '' }),

          // Certifications

          new Paragraph({ text: 'Certifications', heading: 'Heading2' }),
          new Paragraph({ text: resume.certifications || '' }),
          new Paragraph({ text: '' }),

          // Languages

          new Paragraph({ text: 'Languages', heading: 'Heading2' }),
          new Paragraph({ text: resume.languages || '' }),
          new Paragraph({ text: '' }),

          // Volunteer Experience

          new Paragraph({ text: 'Volunteer Experience', heading: 'Heading2' }),
          new Paragraph({ text: resume.volunteerExperience || '' }),
          new Paragraph({ text: '' }),

          // Interests

          new Paragraph({ text: 'Interests', heading: 'Heading2' }),
          new Paragraph({ text: resume.interests || '' })
        ]
      }]
    });

    Packer.toBlob(doc).then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.docx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  // Render chosen template based on user selection

  const renderTemplate = () => {
    if (!resume) return null;
    switch (template) {
      case 'modern':
        return <ModernTemplate resume={resume} />;
      case 'minimal':
        return <MinimalTemplate resume={resume} />;
      case 'classic':
      default:
        return <ClassicTemplate resume={resume} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Resume Preview</h1>
        <div className="download-buttons mb-4">
          <button 
            onClick={downloadPDF} 
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700 transition"
          >
            Download as PDF
          </button>
          <button 
            onClick={downloadWord} 
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Download as DOCX
          </button>
        </div>
        {loading ? (
          <p>Loading resume...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : resume ? (
          <div id="resume-preview">
          <div className="resume-section">
            {renderTemplate()}
          </div>
        </div>
      ) : (
        <p>No resume data available.</p>
      )}
    </main>
    <Footer />
  </div>
);
};

export default ResumePreview;
