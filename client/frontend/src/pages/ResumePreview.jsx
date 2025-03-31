import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Document, Packer, Paragraph, TextRun } from "docx";

const ResumePreview = () => {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    if (location.state && location.state.resumeData) {
      setResume(location.state.resumeData);
      setLoading(false);
    } else {
      axios
        .get('/api/resumes/latest')
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

  const downloadPDF = () => {
    if (!resume) return;
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text('Resume', 105, 20, null, null, 'center');

    let y = 30; // Starting Y position

    const addSection = (title, content) => {
      if (!content) return;
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(title, 15, y);
      y += 6;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text(content, 15, y, { maxWidth: 180 });
      y += 10;
    };

    // Basic Information
    addSection('Name:', resume.name);
    addSection('Email:', resume.email);
    addSection('Phone:', resume.phone);
    addSection('Address:', resume.address);

    // Summary
    addSection('Summary:', resume.summary);

    // Work Experience
    if (resume.workExperience && resume.workExperience.length > 0) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Work Experience', 15, y);
      y += 6;
      resume.workExperience.forEach((exp) => {
        autoTable(pdf, {
          startY: y,
          head: [['Job Title', 'Company', 'Duration', 'Description']],
          body: [[exp.jobTitle, exp.company, exp.duration, exp.description]],
          theme: 'striped',
        });
        y = pdf.lastAutoTable.finalY + 8;
      });
    }

    // Education
    if (resume.education && resume.education.length > 0) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Education', 15, y);
      y += 6;
      resume.education.forEach((edu) => {
        autoTable(pdf, {
          startY: y,
          head: [['Degree', 'Institution', 'Duration', 'Details']],
          body: [[edu.degree, edu.institution, edu.duration, edu.details]],
          theme: 'striped',
        });
        y = pdf.lastAutoTable.finalY + 8;
      });
    }

    // Skills
    addSection('Skills:', resume.skills);

    // Projects
    if (resume.projects && resume.projects.length > 0) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Projects', 15, y);
      y += 6;
      resume.projects.forEach((proj) => {
        autoTable(pdf, {
          startY: y,
          head: [['Title', 'Description', 'Technologies', 'Link']],
          body: [[proj.title, proj.description, proj.technologies, proj.link || 'N/A']],
          theme: 'striped',
        });
        y = pdf.lastAutoTable.finalY + 8;
      });
    }

    // Certifications
    addSection('Certifications:', resume.certifications);
    // Languages
    addSection('Languages:', resume.languages);
    // Volunteer Experience
    addSection('Volunteer Experience:', resume.volunteerExperience);
    // Interests
    addSection('Interests:', resume.interests);

    pdf.save('resume.pdf');
  };

  const downloadWord = () => {
    if (!resume) return;

    const doc = new Document({
      sections: [
        {
          children: [
            // Basic Information
            new Paragraph({
              children: [new TextRun({ text: resume.name, bold: true, size: 32 })],
            }),
            new Paragraph({ children: [new TextRun({ text: `Email: ${resume.email}`, size: 24 })] }),
            new Paragraph({ children: [new TextRun({ text: `Phone: ${resume.phone}`, size: 24 })] }),
            new Paragraph({ children: [new TextRun({ text: `Address: ${resume.address}`, size: 24 })] }),
            new Paragraph({ text: '' }),
            // Summary
            new Paragraph({ text: 'Summary', heading: 'Heading2' }),
            new Paragraph({ text: resume.summary || '' }),
            new Paragraph({ text: '' }),
            // Work Experience
            new Paragraph({ text: 'Work Experience', heading: 'Heading2' }),
            ...(resume.workExperience
              ? resume.workExperience.map((exp) =>
                  new Paragraph({
                    children: [
                      new TextRun({ text: `${exp.jobTitle} at ${exp.company}`, bold: true }),
                      new TextRun({ text: ` (${exp.duration})\n${exp.description}`, break: 1 }),
                    ],
                  })
                )
              : []),
            new Paragraph({ text: '' }),
            // Education
            new Paragraph({ text: 'Education', heading: 'Heading2' }),
            ...(resume.education
              ? resume.education.map((edu) =>
                  new Paragraph({
                    children: [
                      new TextRun({ text: `${edu.degree} from ${edu.institution}`, bold: true }),
                      new TextRun({ text: ` (${edu.duration})\n${edu.details}`, break: 1 }),
                    ],
                  })
                )
              : []),
            new Paragraph({ text: '' }),
            // Skills
            new Paragraph({ text: 'Skills', heading: 'Heading2' }),
            new Paragraph({ text: resume.skills || '' }),
            new Paragraph({ text: '' }),
            // Projects
            new Paragraph({ text: 'Projects', heading: 'Heading2' }),
            ...(resume.projects
              ? resume.projects.map((proj) =>
                  new Paragraph({
                    children: [
                      new TextRun({ text: proj.title, bold: true }),
                      new TextRun({ text: `\n${proj.description}`, break: 1 }),
                      new TextRun({ text: `Technologies: ${proj.technologies}`, break: 1 }),
                      new TextRun({ text: `Link: ${proj.link || 'N/A'}`, break: 1 }),
                    ],
                  })
                )
              : []),
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
            new Paragraph({ text: resume.interests || '' }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.docx";
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Resume Preview</h1>
        {loading ? (
          <p>Loading resume...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : resume ? (
          <>
            <div className="mb-4 flex space-x-4">
              <button
                onClick={downloadPDF}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Download as PDF
              </button>
              <button
                onClick={downloadWord}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Download as Word
              </button>
            </div>
            <div
              id="resume-preview"
              className="border p-6 rounded shadow bg-white"
            >
              {/* Basic Information */}
              <h2 className="text-2xl font-semibold">{resume.name}</h2>
              <p className="text-gray-600">{resume.email}</p>
              <p className="text-gray-600">{resume.phone}</p>
              <p className="text-gray-600">{resume.address}</p>
              {/* Summary */}
              {resume.summary && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Summary</h3>
                  <p>{resume.summary}</p>
                </div>
              )}
              {/* Work Experience */}
              {resume.workExperience && resume.workExperience.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Work Experience</h3>
                  {resume.workExperience.map((exp, index) => (
                    <div key={index} className="mt-2 border-b pb-2">
                      <h4 className="font-semibold">
                        {exp.jobTitle} at {exp.company}
                      </h4>
                      <p>{exp.duration}</p>
                      <p>{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}
              {/* Education */}
              {resume.education && resume.education.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Education</h3>
                  {resume.education.map((edu, index) => (
                    <div key={index} className="mt-2 border-b pb-2">
                      <h4 className="font-semibold">
                        {edu.degree} from {edu.institution}
                      </h4>
                      <p>{edu.duration}</p>
                      <p>{edu.details}</p>
                    </div>
                  ))}
                </div>
              )}
              {/* Skills */}
              {resume.skills && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Skills</h3>
                  <p>{resume.skills}</p>
                </div>
              )}
              {/* Projects */}
              {resume.projects && resume.projects.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Projects</h3>
                  {resume.projects.map((proj, index) => (
                    <div key={index} className="mt-2 border-b pb-2">
                      <h4 className="font-semibold">{proj.title}</h4>
                      <p>{proj.description}</p>
                      <p>{proj.technologies}</p>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Project Link
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {/* Certifications */}
              {resume.certifications && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Certifications</h3>
                  <p>{resume.certifications}</p>
                </div>
              )}
              {/* Languages */}
              {resume.languages && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Languages</h3>
                  <p>{resume.languages}</p>
                </div>
              )}
              {/* Volunteer Experience */}
              {resume.volunteerExperience && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Volunteer Experience</h3>
                  <p>{resume.volunteerExperience}</p>
                </div>
              )}
              {/* Interests */}
              {resume.interests && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Interests</h3>
                  <p>{resume.interests}</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <p>No resume data available.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ResumePreview;
