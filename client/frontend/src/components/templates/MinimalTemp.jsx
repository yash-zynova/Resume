import React from 'react';
import './Templates.css';

const MinimalTemplate = ({ resume }) => {
  return (
    <div className="resume-template minimal">
      <header className="minimal-header">
        <h1>{resume.name}</h1>
        <p>{resume.email} | {resume.phone}</p>
      </header>
      <div className="minimal-body">
        {resume.summary && (
          <section className="minimal-section">
            <h2>Summary</h2>
            <p>{resume.summary}</p>
          </section>
        )}
        {resume.workExperience && resume.workExperience.length > 0 && (
          <section className="minimal-section">
            <h2>Experience</h2>
            {resume.workExperience.map((exp, index) => (
              <div key={index}>
                <strong>{exp.jobTitle} at {exp.company}</strong>
                <p>{exp.duration}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </section>
        )}
        {resume.education && resume.education.length > 0 && (
          <section className="minimal-section">
            <h2>Education</h2>
            {resume.education.map((edu, index) => (
              <div key={index}>
                <strong>{edu.degree} from {edu.institution}</strong>
                <p>{edu.duration}</p>
                <p>{edu.details}</p>
              </div>
            ))}
          </section>
        )}
        {resume.skills && (
          <section className="minimal-section">
            <h2>Skills</h2>
            <p>{resume.skills}</p>
          </section>
        )}
        {resume.projects && resume.projects.length > 0 && (
          <section className="minimal-section">
            <h2>Projects</h2>
            {resume.projects.map((proj, index) => (
              <div key={index}>
                <strong>{proj.title}</strong>
                <p>{proj.description}</p>
                <p>{proj.technologies}</p>
                {proj.link && (
                  <p>
                    <a href={proj.link} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
        {resume.certifications && (
          <section className="minimal-section">
            <h2>Certifications</h2>
            <p>{resume.certifications}</p>
          </section>
        )}
        {resume.languages && (
          <section className="minimal-section">
            <h2>Languages</h2>
            <p>{resume.languages}</p>
          </section>
        )}
        {resume.volunteerExperience && (
          <section className="minimal-section">
            <h2>Volunteer</h2>
            <p>{resume.volunteerExperience}</p>
          </section>
        )}
        {resume.interests && (
          <section className="minimal-section">
            <h2>Interests</h2>
            <p>{resume.interests}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default MinimalTemplate;
