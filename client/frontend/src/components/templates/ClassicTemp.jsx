import React from 'react';
import './Templates.css';

const ClassicTemplate = ({ resume }) => {
  return (
    <div className="resume-template classic">
      <header className="classic-header">
        <h1>{resume.name}</h1>
        <p className="contact-info">
          {resume.email} | {resume.phone} | {resume.address}
        </p>
      </header>

      <section className="section">
        <h2>Professional Summary</h2>
        <p>{resume.summary}</p>
      </section>

      <section className="section">
        <h2>Work Experience</h2>
        {resume.workExperience.map((exp, index) => (
          <div key={index} className="section-item">
            <h3>{exp.jobTitle} at {exp.company}</h3>
            <p className="duration">{exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>Education</h2>
        {resume.education.map((edu, index) => (
          <div key={index} className="section-item">
            <h3>{edu.degree} from {edu.institution}</h3>
            <p className="duration">{edu.duration}</p>
            <p>{edu.details}</p>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>Skills</h2>
        <p>{resume.skills}</p>
      </section>

      <section className="section">
        <h2>Projects</h2>
        {resume.projects.map((proj, index) => (
          <div key={index} className="section-item">
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
            <p><strong>Technologies:</strong> {proj.technologies}</p>
            {proj.link && (
              <p>
                <a href={proj.link} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </p>
            )}
          </div>
        ))}
      </section>

      <section className="section">
        <h2>Certifications</h2>
        <p>{resume.certifications}</p>
      </section>

      <section className="section">
        <h2>Languages</h2>
        <p>{resume.languages}</p>
      </section>

      <section className="section">
        <h2>Volunteer Experience</h2>
        <p>{resume.volunteerExperience}</p>
      </section>

      <section className="section">
        <h2>Interests</h2>
        <p>{resume.interests}</p>
      </section>
    </div>
  );
};

export default ClassicTemplate;
