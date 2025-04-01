import React from 'react';
import './Templates.css';

const ModernTemplate = ({ resume }) => {
  return (
    <div className="resume-template modern">
      <header className="modern-header">
        <div className="modern-header-content">
          <h1>{resume.name}</h1>
          <div className="contact-details">
            <p>{resume.email}</p>
            <p>{resume.phone}</p>
            <p>{resume.address}</p>
          </div>
        </div>
      </header>

      <div className="modern-content">
        <section className="modern-section">
          <h2>About Me</h2>
          <p>{resume.summary}</p>
        </section>

        <section className="modern-section">
          <h2>Experience</h2>
          {resume.workExperience.map((exp, index) => (
            <div key={index} className="modern-item">
              <h3>{exp.jobTitle} at {exp.company}</h3>
              <p className="modern-duration">{exp.duration}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="modern-section">
          <h2>Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="modern-item">
              <h3>{edu.degree} from {edu.institution}</h3>
              <p className="modern-duration">{edu.duration}</p>
              <p>{edu.details}</p>
            </div>
          ))}
        </section>

        <section className="modern-section">
          <h2>Skills</h2>
          <p>{resume.skills}</p>
        </section>

        <section className="modern-section">
          <h2>Projects</h2>
          {resume.projects.map((proj, index) => (
            <div key={index} className="modern-item">
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

        <section className="modern-section">
          <h2>Certifications</h2>
          <p>{resume.certifications}</p>
        </section>

        <section className="modern-section">
          <h2>Languages</h2>
          <p>{resume.languages}</p>
        </section>

        <section className="modern-section">
          <h2>Volunteer</h2>
          <p>{resume.volunteerExperience}</p>
        </section>

        <section className="modern-section">
          <h2>Interests</h2>
          <p>{resume.interests}</p>
        </section>
      </div>
    </div>
  );
};

export default ModernTemplate;
