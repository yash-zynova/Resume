import React from 'react';

const TemplateSelector = ({ selectedTemplate, onSelectTemplate }) => {
  return (
    <div className="template-selector">
      <label htmlFor="template">Select Resume Template:</label>
      <select
        id="template"
        value={selectedTemplate}
        onChange={(e) => onSelectTemplate(e.target.value)}
      >
        <option value="classic">Classic</option>
        <option value="modern">Modern</option>
        <option value="minimal">Minimal</option>
      </select>
    </div>
  );
};

export default TemplateSelector;
