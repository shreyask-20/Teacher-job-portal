import React, { useState } from 'react';
import './TeacherProfileForm.css';

const TeacherProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    location: '',
    website: '',
    phone: '',
    age: '',
    profilePic: null,
    resume: null,
    education: [{ degree: '', field: '', from: '', to: '', school: '', description: '' }],
    experience: [{ company: '', role: '', from: '', to: '', description: '' }],
    skills: [{ name: '', proficiency: '' }]
  });

  const [isEditable, setIsEditable] = useState(true);
  const [isProfileSaved, setIsProfileSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleDynamicChange = (section, index, e) => {
    const { name, value } = e.target;
    const updated = [...formData[section]];
    updated[index][name] = value;
    setFormData({ ...formData, [section]: updated });
  };

  const addField = (section, emptyObj) => {
    setFormData({ ...formData, [section]: [...formData[section], emptyObj] });
  };

  const deleteLastField = (section) => {
    const updated = [...formData[section]];
    updated.splice(updated.length - 1, 1);
    setFormData({ ...formData, [section]: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saved Data:', formData);
    alert('Profile saved!');
    setIsEditable(false);
    setIsProfileSaved(true);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  return (
    <div className="tp-profile-container">
      {isProfileSaved && !isEditable && (
        <div className="tp-header-buttons">
          <button className="tp-button-style tp-edit-button" onClick={handleEdit}>✏️ Edit</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="tp-profile-form">
        {formData.profilePic && (
          <div className="tp-image-preview">
            <img src={URL.createObjectURL(formData.profilePic)} alt="Profile Preview" className="tp-preview-img" />
          </div>
        )}

        <h3 className="tp-section-title">Basic Information</h3>
        <div className="tp-grid-two-columns">
          <input name="name" placeholder="Name" onChange={handleChange} value={formData.name} className="tp-input-style" disabled={!isEditable} />
          <input name="email" placeholder="Email" onChange={handleChange} value={formData.email} className="tp-input-style" disabled={!isEditable} />
          <input name="profession" placeholder="Profession" onChange={handleChange} value={formData.profession} className="tp-input-style" disabled={!isEditable} />
          <input name="location" placeholder="Location" onChange={handleChange} value={formData.location} className="tp-input-style" disabled={!isEditable} />
          <input name="website" placeholder="Website" onChange={handleChange} value={formData.website} className="tp-input-style" disabled={!isEditable} />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} value={formData.phone} className="tp-input-style" disabled={!isEditable} />
          <input type="number" name="age" placeholder="Age" onChange={handleChange} value={formData.age} className="tp-input-style" disabled={!isEditable} />
          <input type="file" name="profilePic" onChange={handleChange} className="tp-input-style" disabled={!isEditable} />
        </div>

        <h3 className="tp-section-title">Resume Upload</h3>
        <input type="file" name="resume" onChange={handleChange} className="tp-input-style tp-full-width" disabled={!isEditable} />
        {formData.resume && (
          <p style={{ marginTop: '10px' }}>
            <strong>Uploaded:</strong> {formData.resume.name}{' '}
            <a href={URL.createObjectURL(formData.resume)} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px', color: '#3b82f6' }}>
              Preview
            </a>
          </p>
        )}

        <h3 className="tp-section-title">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="tp-section-block">
            <input name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleDynamicChange('education', index, e)} className="tp-input-style" disabled={!isEditable} />
            <input name="field" placeholder="Field of Study" value={edu.field} onChange={(e) => handleDynamicChange('education', index, e)} className="tp-input-style" disabled={!isEditable} />
            <input type="date" name="from" value={edu.from} onChange={(e) => handleDynamicChange('education', index, e)} className="tp-input-style" disabled={!isEditable} />
            <input type="date" name="to" value={edu.to} onChange={(e) => handleDynamicChange('education', index, e)} className="tp-input-style" disabled={!isEditable} />
            <input name="school" placeholder="School" value={edu.school} onChange={(e) => handleDynamicChange('education', index, e)} className="tp-input-style tp-full-width" disabled={!isEditable} />
            <textarea name="description" placeholder="Description" value={edu.description} onChange={(e) => handleDynamicChange('education', index, e)} className="tp-input-style tp-textarea tp-full-width" disabled={!isEditable} />
          </div>
        ))}
        {isEditable && (
          <div className="tp-action-group">
            <button type="button" onClick={() => addField('education', { degree: '', field: '', from: '', to: '', school: '', description: '' })} className="tp-button-style">➕ Add Education</button>
            {formData.education.length > 1 && (
              <button type="button" onClick={() => deleteLastField('education')} className="tp-button-style tp-delete">🗑️ Delete Last</button>
            )}
          </div>
        )}

        <h3 className="tp-section-title">Work Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index} className="tp-section-block">
            <input name="company" placeholder="Company Name" value={exp.company} onChange={(e) => handleDynamicChange('experience', index, e)} className="tp-input-style" disabled={!isEditable} />
            <input name="role" placeholder="Role" value={exp.role} onChange={(e) => handleDynamicChange('experience', index, e)} className="tp-input-style" disabled={!isEditable} />
            <input type="date" name="from" value={exp.from} onChange={(e) => handleDynamicChange('experience', index, e)} className="tp-input-style" disabled={!isEditable} />
            <input type="date" name="to" value={exp.to} onChange={(e) => handleDynamicChange('experience', index, e)} className="tp-input-style" disabled={!isEditable} />
            <textarea name="description" placeholder="Description" value={exp.description} onChange={(e) => handleDynamicChange('experience', index, e)} className="tp-input-style tp-textarea tp-full-width" disabled={!isEditable} />
          </div>
        ))}
        {isEditable && (
          <div className="tp-action-group">
            <button type="button" onClick={() => addField('experience', { company: '', role: '', from: '', to: '', description: '' })} className="tp-button-style">➕ Add Experience</button>
            {formData.experience.length > 1 && (
              <button type="button" onClick={() => deleteLastField('experience')} className="tp-button-style tp-delete">🗑️ Delete Last</button>
            )}
          </div>
        )}

        <h3 className="tp-section-title">Skills</h3>
        {formData.skills.map((skill, index) => (
          <div key={index} className="tp-grid-two-columns tp-mb-1rem">
            <input name="name" placeholder="Skill Name" value={skill.name} onChange={(e) => handleDynamicChange('skills', index, e)} className="tp-input-style" disabled={!isEditable} />
            <input name="proficiency" placeholder="Proficiency (e.g., 5/5)" value={skill.proficiency} onChange={(e) => handleDynamicChange('skills', index, e)} className="tp-input-style" disabled={!isEditable} />
          </div>
        ))}
        {isEditable && (
          <div className="tp-action-group">
            <button type="button" onClick={() => addField('skills', { name: '', proficiency: '' })} className="tp-button-style">➕ Add Skill</button>
            {formData.skills.length > 1 && (
              <button type="button" onClick={() => deleteLastField('skills')} className="tp-button-style tp-delete">🗑️ Delete Last</button>
            )}
          </div>
        )}

        {isEditable && (
          <button type="submit" className="tp-submit-button">💾 Save</button>
        )}
      </form>
    </div>
  );
};

export default TeacherProfileForm;
