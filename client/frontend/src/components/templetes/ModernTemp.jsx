import React from 'react';

const ResumeTemplateModern = ({ resumeData }) => {
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
    <div className="max-w-4xl mx-auto p-8 bg-gray-50">
      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-1/3 p-4 bg-white shadow-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-sm text-gray-600">{email}</p>
            <p className="text-sm text-gray-600">{phone}</p>
            <p className="text-sm text-gray-600">{address}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold border-b pb-2">Skills</h2>
            {skills && skills.length > 0 && (
              <ul className="mt-2">
                {skills.map((skill, index) => (
                  <li key={index} className="text-sm text-gray-700">{skill}</li>
                ))}
              </ul>
            )}
          </div>
          {languages && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold border-b pb-2">Languages</h2>
              <p className="text-sm text-gray-700">{languages}</p>
            </div>
          )}
          {certifications && (
            <div>
              <h2 className="text-xl font-semibold border-b pb-2">Certifications</h2>
              <p className="text-sm text-gray-700">{certifications}</p>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-2/3 p-4">
          {/* Profile/Summary */}
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
                  <p className="text-sm text-gray-500">{job.duration}</p>
                  <p className="mt-2 text-gray-700">{job.description}</p>
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
                  <p className="text-sm text-gray-500">{edu.duration}</p>
                  <p className="mt-2 text-gray-700">{edu.details}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Projects</h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-gray-700">{project.description}</p>
                  <p className="text-sm text-gray-500">Technologies: {project.technologies.join(', ')}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))}
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
        </main>
      </div>
    </div>
  );
};

export default ResumeTemplateModern;
