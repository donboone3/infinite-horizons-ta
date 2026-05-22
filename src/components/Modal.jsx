import { useState } from 'react';

export default function Modal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    roleDetails: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      roleDetails: '',
      notes: ''
    });
    setSubmitted(false);
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={resetForm}>
      <div className="glass-card modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={resetForm} aria-label="Close modal">&times;</button>
        
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
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
              Staffing Request Received!
            </h3>
            <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              Thank you for contacting us. Our recruiting specialists will review your requirements and reach out to schedule a diagnostic call within 24 hours.
            </p>
            <button className="btn btn-primary" onClick={resetForm} style={{ width: '100%' }}>
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                Submit Staffing Request
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Tell us about your open positions and let our experts find the perfect operations, admin, or sales fit for your company.
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
                <label htmlFor="modal-email">Business Email *</label>
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
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
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

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="modal-notes">Additional Context or Notes</label>
              <textarea
                id="modal-notes"
                name="notes"
                rows="2"
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
