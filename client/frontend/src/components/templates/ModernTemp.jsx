import React from 'react';

const ModernTemplate = ({ resume }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
        <h1 className="text-4xl font-bold">{resume.name}</h1>
        <p className="mt-2 text-sm">
          {resume.email} | {resume.phone} | {resume.address}
        </p>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b pb-2">Professional Summary</h2>
          <p className="mt-2 text-gray-700">{resume.summary}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b pb-2">Work Experience</h2>
          {resume.workExperience.map((exp, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-xl font-bold">{exp.jobTitle} at {exp.company}</h3>
              <p className="text-sm text-gray-500">{exp.duration}</p>
              <p className="mt-1 text-gray-600">{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b pb-2">Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-xl font-bold">{edu.degree} from {edu.institution}</h3>
              <p className="text-sm text-gray-500">{edu.duration}</p>
              <p className="mt-1 text-gray-600">{edu.details}</p>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b pb-2">Skills</h2>
          <p className="mt-2 text-gray-700">{resume.skills}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b pb-2">Projects</h2>
          {resume.projects.map((proj, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-xl font-bold">{proj.title}</h3>
              <p className="text-gray-600">{proj.description}</p>
              <p className="text-sm text-gray-500"><strong>Technologies:</strong> {proj.technologies}</p>
              {proj.link && (
                <p>
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    View Project
                  </a>
                </p>
              )}
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b pb-2">Certifications</h2>
          <p className="mt-2 text-gray-700">{resume.certifications}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b pb-2">Languages</h2>
          <p className="mt-2 text-gray-700">{resume.languages}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b pb-2">Volunteer Experience</h2>
          <p className="mt-2 text-gray-700">{resume.volunteerExperience}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold border-b pb-2">Interests</h2>
          <p className="mt-2 text-gray-700">{resume.interests}</p>
        </section>
      </div>
    </div>
  );
};

export default ModernTemplate;
