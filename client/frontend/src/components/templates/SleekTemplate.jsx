import React from 'react';

const SleekTemplateA4 = ({ resume }) => {
  return (
    <div className="mx-auto my-4 print:my-0" style={{ width: '210mm', minHeight: '297mm' }}>
      <div className="bg-gray-50 shadow-md rounded-lg overflow-hidden print:shadow-none print:rounded-none">
        <div className="md:flex">
          {/* Sidebar */}
          <aside className="md:w-1/3 bg-gradient-to-br from-gray-800 to-gray-700 text-white p-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold">{resume.name}</h1>
              <p className="mt-2 text-sm">{resume.email}</p>
              <p className="text-sm mt-1">{resume.phone}</p>
              <p className="text-sm mt-1">{resume.address}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold border-b pb-2">Skills</h2>
              <ul className="mt-2">
                {resume.skills.split(',').map((skill, index) => (
                  <li key={index} className="text-sm mt-1">{skill.trim()}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold border-b pb-2">Languages</h2>
              <p className="mt-2 text-sm">{resume.languages}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold border-b pb-2">Certifications</h2>
              <p className="mt-2 text-sm">{resume.certifications}</p>
            </div>
          </aside>
          {/* Main Content */}
          <main className="md:w-2/3 p-6">
            <section className="mb-6">
              <h2 className="text-2xl font-semibold border-b pb-2">Professional Summary</h2>
              <p className="mt-2 text-gray-700">{resume.summary}</p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold border-b pb-2">Work Experience</h2>
              {resume.workExperience.map((exp, index) => (
                <div key={index} className="mt-4">
                  <h3 className="text-xl font-bold">
                    {exp.jobTitle} at {exp.company}
                  </h3>
                  <p className="text-sm text-gray-500">{exp.duration}</p>
                  <p className="mt-1 text-gray-600">{exp.description}</p>
                </div>
              ))}
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold border-b pb-2">Education</h2>
              {resume.education.map((edu, index) => (
                <div key={index} className="mt-4">
                  <h3 className="text-xl font-bold">
                    {edu.degree} from {edu.institution}
                  </h3>
                  <p className="text-sm text-gray-500">{edu.duration}</p>
                  <p className="mt-1 text-gray-600">{edu.details}</p>
                </div>
              ))}
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold border-b pb-2">Projects</h2>
              {resume.projects.map((proj, index) => (
                <div key={index} className="mt-4">
                  <h3 className="text-xl font-bold">{proj.title}</h3>
                  <p className="text-gray-600">{proj.description}</p>
                  <p className="text-sm text-gray-500">
                    <strong>Technologies:</strong> {proj.technologies}
                  </p>
                  {proj.link && (
                    <p>
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Project
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold border-b pb-2">Volunteer Experience</h2>
              <p className="mt-2 text-gray-700">{resume.volunteerExperience}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold border-b pb-2">Interests</h2>
              <p className="mt-2 text-gray-700">{resume.interests}</p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SleekTemplateA4;
