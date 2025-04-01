import React from 'react';

const ResumeTemplateMinimal = ({ resumeData }) => {
  const {
    name,
    email,
    phone,
    address,
    summary,
    workExperience,
    education,
    skills,
  } = resumeData;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-sm text-gray-600">{email} • {phone} • {address}</p>
      </header>

      {/* Summary */}
      <section className="mb-4">
        <p className="text-base">{summary}</p>
      </section>

      {/* Work Experience */}
      {workExperience && workExperience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Experience</h2>
          {workExperience.map((job, index) => (
            <div key={index} className="mb-3">
              <p className="font-bold">{job.jobTitle} - {job.company}</p>
              <p className="text-sm text-gray-500">{job.duration}</p>
              <p className="text-sm">{job.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <p className="font-bold">{edu.degree} - {edu.institution}</p>
              <p className="text-sm text-gray-500">{edu.duration}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 text-sm px-2 py-1 m-1 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumeTemplateMinimal;
