import { useState } from 'react';

export default function Modal({ isOpen, onClose, type, jobTitle = '' }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    roleDetails: '',
    notes: '',
    resume: null
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API Submission
    setSubmitted(true);
    setTimeout(() => {
      // Keep success state open for a bit
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      roleDetails: '',
      notes: '',
      resume: null
    });
    setSubmitted(false);
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={resetForm}>
      <div className="glass-card modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={resetForm}>&times;</button>
        
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              backgroundColor: 'rgba(16, 185, 129, 0.15)', 
              color: '#10b981', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '2.5rem',
              margin: '0 auto 1.5rem auto',
              border: '2px solid #10b981'
            }}>
              ✓
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
              Submission Received!
            </h3>
            <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '2rem' }}>
              {type === 'candidate' 
                ? "Thank you for applying. A representative from Infinite Horizons will review your profile and reach out shortly if there is a match." 
                : "Thank you for contacting us. Our recruiting specialists will review your requirements and reach out to schedule a diagnostic call within 24 hours."
              }
            </p>
            <button className="btn btn-primary" onClick={resetForm}>
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h3>
                {type === 'candidate' 
                  ? `Apply for ${jobTitle || 'Role'}`
                  : 'Submit Staffing Request'
                }
              </h3>
              <p>
                {type === 'candidate'
                  ? 'Fill out the form below to submit your application directly to our talent acquisition team.'
                  : 'Tell us about your open positions and let our experts find the perfect fit for your company.'
                }
              </p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="modal-name">Full Name *</label>
                <input
                  type="text"
                  id="modal-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label htmlFor="modal-email">Email Address *</label>
                <input
                  type="email"
                  id="modal-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="modal-phone">Phone Number</label>
                <input
                  type="tel"
                  id="modal-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="(555) 000-0000"
                />
              </div>
              {type === 'employer' && (
                <div className="form-group">
                  <label htmlFor="modal-company">Company Name *</label>
                  <input
                    type="text"
                    id="modal-company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Acme Corp"
                  />
                </div>
              )}
            </div>

            {type === 'employer' ? (
              <div className="form-group">
                <label htmlFor="modal-roleDetails">What roles are you looking to fill? *</label>
                <textarea
                  id="modal-roleDetails"
                  name="roleDetails"
                  required
                  rows="3"
                  value={formData.roleDetails}
                  onChange={handleInputChange}
                  className="form-input"
                  style={{ resize: 'vertical' }}
                  placeholder="e.g. Operations Coordinator, Staff Accountant (Full-time)"
                />
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="modal-resume">Upload Resume (PDF, DOCX) *</label>
                <input
                  type="file"
                  id="modal-resume"
                  required
                  accept=".pdf,.docx,.doc"
                  onChange={handleFileChange}
                  style={{ 
                    color: 'var(--text-main)', 
                    padding: '0.5rem 0',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="modal-notes">Additional Context or Notes</label>
              <textarea
                id="modal-notes"
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleInputChange}
                className="form-input"
                style={{ resize: 'vertical' }}
                placeholder="Include any specific details or timeline constraints..."
              />
            </div>

            <div style={{ display: 'flex', justifySelf: 'right', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
