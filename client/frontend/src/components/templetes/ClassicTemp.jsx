import React from 'react';

const ResumeTemplateClassic = ({ resumeData }) => {
  const {
    name,
    email,
    phone,
    address,
    summary,
    workExperience,
    education,
    skills,
    projects,
    certifications,
    languages,
    volunteerExperience,
    interests,
  } = resumeData;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md">
      {/* Header */}
      <header className="text-center mb-8 border-b pb-4">
        <h1 className="text-4xl font-bold">{name}</h1>
        <p>{email} | {phone} | {address}</p>
      </header>

      {/* Summary */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Profile</h2>
        <p>{summary}</p>
      </section>

      {/* Work Experience */}
      {workExperience && workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Work Experience</h2>
          {workExperience.map((job, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-bold">{job.jobTitle} - {job.company}</h3>
              <p className="text-sm text-gray-600">{job.duration}</p>
              <p className="mt-2">{job.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-bold">{edu.degree} - {edu.institution}</h3>
              <p className="text-sm text-gray-600">{edu.duration}</p>
              <p className="mt-2">{edu.details}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Skills</h2>
          <ul className="list-disc pl-5">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p>{project.description}</p>
              <p className="text-sm text-gray-600">Technologies: {project.technologies.join(', ')}</p>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  View Project
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Additional Sections */}
      {certifications && (
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Certifications</h2>
          <p>{certifications}</p>
        </section>
      )}
      {languages && (
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Languages</h2>
          <p>{languages}</p>
        </section>
      )}
      {volunteerExperience && (
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Volunteer Experience</h2>
          <p>{volunteerExperience}</p>
        </section>
      )}
      {interests && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Interests</h2>
          <p>{interests}</p>
        </section>
      )}
    </div>
  );
};

export default ResumeTemplateClassic;
