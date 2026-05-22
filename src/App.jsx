import { useState, useEffect } from 'react';
import logoImg from './assets/logo.png';
import HiringCalculator from './components/HiringCalculator';
import JobBoard from './components/JobBoard';
import Modal from './components/Modal';


export default function App() {
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('employer'); // 'employer' | 'candidate'
  const [selectedJob, setSelectedJob] = useState('');

  // Tool integrations state
  const [calendlyState, setCalendlyState] = useState('select-slot'); // 'select-slot' | 'confirmed'
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [tallySubmitted, setTallySubmitted] = useState(false);
  const [tallyData, setTallyData] = useState({ name: '', email: '', message: '' });

  // Hero contact form state
  const [heroFormData, setHeroFormData] = useState({
    name: '',
    email: '',
    company: '',
    need: 'Operations',
    message: ''
  });
  const [heroFormSubmitted, setHeroFormSubmitted] = useState(false);

  const handleHeroFormSubmit = (e) => {
    e.preventDefault();
    setHeroFormSubmitted(true);
  };

  // Handle header background transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Toggler
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  const openEmployerModal = () => {
    setModalType('employer');
    setSelectedJob('');
    setModalOpen(true);
  };

  const openCandidateModal = (jobTitle) => {
    setModalType('candidate');
    setSelectedJob(jobTitle);
    setModalOpen(true);
  };

  const handleTallySubmit = (e) => {
    e.preventDefault();
    setTallySubmitted(true);
  };

  const handleTimeSlotSelect = (time) => {
    setSelectedTimeSlot(time);
    setCalendlyState('confirmed');
  };

  return (
    <>
      {/* Background Glow Elements */}
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      {/* Navigation Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#home" className="logo-wrapper">
            <img src={logoImg} alt="Infinite Horizons Logo" className="logo-img" />
            <span className="logo-text">
              Infinite Horizons
            </span>
          </a>

          {/* Nav Menu */}
          <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-active' : ''}`} style={mobileMenuOpen ? {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '70px',
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(7, 10, 19, 0.95)',
            padding: '2rem',
            borderBottom: '1px solid var(--border-color)',
            zIndex: 999,
            gap: '1.5rem'
          } : {}}>
            <li><a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Solutions</a></li>
            <li><a href="#calculator" className="nav-link" onClick={() => setMobileMenuOpen(false)}>ROI Calculator</a></li>
            <li><a href="#jobs" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Job Board</a></li>
            <li><a href="#integrations" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Workflow</a></li>
            <li><a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>

          <div className="nav-actions">
            {/* Theme Toggle */}
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle visual theme">
              {theme === 'dark' ? (
                /* Sun Icon */
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                /* Moon Icon */
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Desktop CTA */}
            <button className="btn btn-primary btn-sm" onClick={openEmployerModal}>
              Post a Role
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="theme-toggle" 
              style={{ display: 'none' }} /* Visible on mobile under CSS grid media queries */
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-nav-toggle"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="section hero-section">
        {/* Looping Background Video */}
        <div className="hero-video-bg">
          <video src="https://media.githubusercontent.com/media/donboone3/infinite-horizons-ta/master/public/hero_header.mp4" autoPlay loop muted playsInline />
          <div className="hero-video-overlay"></div>
        </div>

        <div className="container hero-wrapper">
          <div className="hero-content">
            <div className="hero-tag">
              <span className="hero-tag-dot"></span>
              Modern Staffing Solutions
            </div>
            
            <h1 className="hero-title">
              Elevate Your Operations With <span className="gradient-text">Elite Talent</span>
            </h1>
            
            <p className="hero-desc">
              We help growing small businesses fill key roles with vetted operations, finance, admin, and sales professionals. Guaranteed retention and a faster hiring cycle.
            </p>
            
            <div className="hero-actions">
              <button className="btn btn-accent" onClick={openEmployerModal}>
                Hire Elite Talent
              </button>
              <a href="#jobs" className="btn btn-secondary">
                Explore Job Board
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <h4>17 Days</h4>
                <p>Avg. Time-to-Hire</p>
              </div>
              <div className="stat-item">
                <h4>94%</h4>
                <p>Retention Rate</p>
              </div>
              <div className="stat-item">
                <h4>$15K+</h4>
                <p>Saved Per Placement</p>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-backdrop"></div>
            
            {/* Premium Glassmorphic Intake Form */}
            <div className="glass-card hero-form-card">
              {heroFormSubmitted ? (
                <div className="hero-form-success">
                  <div className="success-icon-ring">
                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                      <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                      <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                  </div>
                  <h3>Intake Form Submitted!</h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: '1rem 0' }}>
                    Thank you, <strong>{heroFormData.name}</strong>. We have received your staffing request for <strong>{heroFormData.company}</strong> regarding <strong>{heroFormData.need}</strong> roles.
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Our recruiting specialists are scanning our talent networks. We will reach out to you at <strong>{heroFormData.email}</strong> within 24 hours.
                  </p>
                  <button 
                    className="btn btn-secondary btn-sm" 
                    style={{ marginTop: '1.5rem', width: '100%' }}
                    onClick={() => {
                      setHeroFormData({ name: '', email: '', company: '', need: 'Operations', message: '' });
                      setHeroFormSubmitted(false);
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleHeroFormSubmit}>
                  <h3>Get Matched with Talent</h3>
                  <p className="form-subtitle">Submit your hiring needs below and get matched with qualified professionals in 48 hours.</p>
                  
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label htmlFor="hero-name">Full Name</label>
                    <input
                      id="hero-name"
                      type="text"
                      required
                      value={heroFormData.name}
                      onChange={(e) => setHeroFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="form-input"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="form-row" style={{ marginBottom: '0' }}>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label htmlFor="hero-email">Business Email</label>
                      <input
                        id="hero-email"
                        type="email"
                        required
                        value={heroFormData.email}
                        onChange={(e) => setHeroFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="form-input"
                        placeholder="jane@company.com"
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label htmlFor="hero-company">Company Name</label>
                      <input
                        id="hero-company"
                        type="text"
                        required
                        value={heroFormData.company}
                        onChange={(e) => setHeroFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="form-input"
                        placeholder="Acme Corp"
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Talent Requirement</label>
                    <div className="talent-need-selector">
                      {['Operations', 'Finance', 'Admin', 'Sales'].map((role) => (
                        <button
                          key={role}
                          type="button"
                          className={`need-badge ${heroFormData.need === role ? 'active' : ''}`}
                          onClick={() => setHeroFormData(prev => ({ ...prev, need: role }))}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label htmlFor="hero-message">Role Details (Optional)</label>
                    <textarea
                      id="hero-message"
                      rows="2"
                      value={heroFormData.message}
                      onChange={(e) => setHeroFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="form-input"
                      placeholder="Briefly describe the roles you need filled..."
                      style={{ resize: 'none' }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Request Candidates
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services / Solutions Section */}
      <section id="services" className="section" style={{ backgroundColor: 'rgba(2, 61, 239, 0.02)' }}>
        <div className="container text-center">
          <div className="section-header">
            <span className="section-tag">Our Capabilities</span>
            <h2 className="section-title">Designed for Growing Small Businesses</h2>
            <p>We eliminate the recruiting bottleneck, delivering top-performing candidates ready to drive business results.</p>
          </div>

          <div className="services-grid">
            {/* Service 1 */}
            <div className="glass-card service-card">
              <div className="service-icon-wrapper">💼</div>
              <h3>Direct Hire Placements</h3>
              <p>Acquire top-tier talent for full-time key positions. We handle sourcing, screening, panel scheduling, and salary negotiation.</p>
              <ul className="service-features-list">
                <li className="service-feature-item"><span className="feature-check">✓</span> Pre-vetted candidates</li>
                <li className="service-feature-item"><span className="feature-check">✓</span> 90-day retention guarantee</li>
                <li className="service-feature-item"><span className="feature-check">✓</span> Structured onboarding support</li>
              </ul>
              <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={openEmployerModal}>
                Discuss Direct Hire
              </button>
            </div>

            {/* Service 2 */}
            <div className="glass-card service-card">
              <div className="service-icon-wrapper">🕒</div>
              <h3>Contract-to-Hire</h3>
              <p>Mitigate hiring risk. Evaluate a candidate's hard skills and cultural alignment in your actual workflow before making a long-term commitment.</p>
              <ul className="service-features-list">
                <li className="service-feature-item"><span className="feature-check">✓</span> Flexible trial periods</li>
                <li className="service-feature-item"><span className="feature-check">✓</span> Seamless conversion process</li>
                <li className="service-feature-item"><span className="feature-check">✓</span> Weekly check-ins</li>
              </ul>
              <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={openEmployerModal}>
                Explore Contract Trial
              </button>
            </div>

            {/* Service 3 */}
            <div className="glass-card service-card">
              <div className="service-icon-wrapper">📈</div>
              <h3>Talent Audit & Retention</h3>
              <p>Optimize your internal hiring engine. We analyze your job descriptions, compensation benchmarks, and culture to improve employee retention.</p>
              <ul className="service-features-list">
                <li className="service-feature-item"><span className="feature-check">✓</span> Local salary benchmarking</li>
                <li className="service-feature-item"><span className="feature-check">✓</span> Retention risk assessments</li>
                <li className="service-feature-item"><span className="feature-check">✓</span> Custom hiring playbooks</li>
              </ul>
              <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={openEmployerModal}>
                Request Intake Audit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="calculator" className="section container">
        <div className="text-center" style={{ maxWidth: '650px', margin: '0 auto 40px' }}>
          <span className="section-tag">Time & Capital ROI</span>
          <h2 className="section-title">Measure the Cost of Slow Hiring</h2>
          <p>Downtime and poor matches bleed resources. Calculate your potential overhead and see how much you regain by working with Infinite Horizons.</p>
        </div>
        <HiringCalculator />
      </section>

      {/* Job Board Section */}
      <section id="jobs" className="section" style={{ backgroundColor: 'rgba(254, 195, 17, 0.01)' }}>
        <div className="container text-center">
          <div className="section-header">
            <span className="section-tag">Live Careers</span>
            <h2 className="section-title">Open Opportunities</h2>
            <p>We represent top-tier employers across the Midwest. Find your next role with career growth and competitive pay.</p>
          </div>
          <JobBoard onApply={openCandidateModal} />
        </div>
      </section>

      {/* Tool Integrations & Workflow Section */}
      <section id="integrations" className="section container">
        <div className="text-center" style={{ maxWidth: '650px', margin: '0 auto 50px' }}>
          <span className="section-tag">Modern Workflow</span>
          <h2 className="section-title">Connected Tool Integrations</h2>
          <p>We leverage automated diagnostic pipelines to coordinate interviews instantly, capture candidate metadata, and keep hiring managers updated.</p>
        </div>

        <div className="tools-grid">
          {/* Card 1: Calendly Booking */}
          <div className="glass-card tool-card" style={{ gridColumn: 'span 2' }}>
            <span className="tool-tag">Calendly Automated Scheduling</span>
            <h3>Book a 30-Minute Talent Diagnostic Call</h3>
            <p style={{ margin: '0.25rem 0 1.5rem 0' }}>Select an available time slot below to coordinate with our lead acquisition specialist.</p>
            
            {calendlyState === 'select-slot' ? (
              <div className="calendly-mock">
                <div className="calendly-mock-header">
                  <span className="calendly-mock-title">📅 30-Min Diagnostic Discovery</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Timezone: Central Time</span>
                </div>
                <div className="calendly-mock-body">
                  <div className="calendly-left">
                    <h4>Infinite Horizons</h4>
                    <p style={{ color: 'var(--color-secondary)', fontWeight: 'bold' }}>30 Min Call</p>
                    <p>Brief call to review your current organizational chart, open requisitions, and details regarding compensation budgets.</p>
                  </div>
                  <div className="calendly-time-slot">
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Select Time Slot:</span>
                    <button className="time-slot-btn" onClick={() => handleTimeSlotSelect('Friday at 10:00 AM (CT)')}>Fri 10:00 AM</button>
                    <button className="time-slot-btn" onClick={() => handleTimeSlotSelect('Friday at 1:30 PM (CT)')}>Fri 1:30 PM</button>
                    <button className="time-slot-btn" onClick={() => handleTimeSlotSelect('Monday at 9:00 AM (CT)')}>Mon 9:00 AM</button>
                    <button className="time-slot-btn" onClick={() => handleTimeSlotSelect('Monday at 3:00 PM (CT)')}>Mon 3:00 PM</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card" style={{ 
                padding: '2.5rem', 
                width: '100%', 
                textAlign: 'center', 
                border: '1px solid var(--color-secondary)',
                backgroundColor: 'rgba(254, 195, 17, 0.03)'
              }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>🎉</span>
                <h4 style={{ color: 'var(--text-heading)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Booking Confirmed!</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  Your discovery session is scheduled for <strong>{selectedTimeSlot}</strong>.
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  A calendar invite and Zoom link has been generated and dispatched to your email.
                </p>
                <button 
                  className="btn btn-secondary btn-sm" 
                  style={{ marginTop: '1rem' }} 
                  onClick={() => setCalendlyState('select-slot')}
                >
                  Reschedule Session
                </button>
              </div>
            )}
          </div>

          {/* Card 2: Intake Submission Form (Tally Form Mock) */}
          <div className="glass-card tool-card">
            <span className="tool-tag" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
              Tally Intake Form
            </span>
            <h3>Quick Intake Query</h3>
            <p>Need custom talent options? Message us directly via this mock intake gateway. All responses sync to our candidate pool.</p>

            {tallySubmitted ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' }}>✓</span>
                <h4 style={{ color: 'var(--text-heading)' }}>Form Dispatched</h4>
                <p style={{ fontSize: '0.85rem' }}>Your query was routed to the onboarding pipeline. We will review details and reply shortly.</p>
                <button className="btn btn-secondary btn-sm" onClick={() => setTallySubmitted(false)} style={{ marginTop: '1rem' }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleTallySubmit} className="tally-mock">
                <div className="form-group">
                  <label htmlFor="tally-name">Your Name</label>
                  <input
                    id="tally-name"
                    type="text"
                    required
                    value={tallyData.name}
                    onChange={(e) => setTallyData(prev => ({ ...prev, name: e.target.value }))}
                    className="form-input"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tally-email">Your Email</label>
                  <input
                    id="tally-email"
                    type="email"
                    required
                    value={tallyData.email}
                    onChange={(e) => setTallyData(prev => ({ ...prev, email: e.target.value }))}
                    className="form-input"
                    placeholder="jane@company.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tally-message">Requirement Details</label>
                  <textarea
                    id="tally-message"
                    required
                    rows="3"
                    value={tallyData.message}
                    onChange={(e) => setTallyData(prev => ({ ...prev, message: e.target.value }))}
                    className="form-input"
                    placeholder="What specific talent challenges are you facing?"
                    style={{ resize: 'none' }}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                  Submit Intake Info
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section id="contact" className="section" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'rgba(7, 10, 19, 0.2)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span className="section-tag">Let's Connect</span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to Scale Your Recruiting?</h2>
              <p style={{ fontSize: '1.05rem', marginBottom: '2rem' }}>
                We provide premium placement, pre-screened talent, and flexible hiring trials. Connect with our principal recruiter today for a complimentary staffing analysis.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem', color: 'var(--color-secondary)' }}>✉</span>
                  <div>
                    <h5 style={{ margin: 0, fontSize: '0.95rem' }}>Direct Email</h5>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>info@infinitehorizonsta.com</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem', color: 'var(--color-secondary)' }}>📍</span>
                  <div>
                    <h5 style={{ margin: 0, fontSize: '0.95rem' }}>Regional HQ</h5>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Wichita, KS & Kansas City Metro</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Request Staffing Details</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Fill out the brief contact inquiry below and one of our client engagement representatives will follow up within 24 hours.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <button className="btn btn-primary" style={{ justifySelf: 'left' }} onClick={openEmployerModal}>
                  Submit Hiring Requirement Form
                </button>
                
                <span style={{ alignSelf: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>- OR -</span>
                
                <a href="#integrations" className="btn btn-secondary" style={{ textAlign: 'center' }}>
                  Select Time via Calendly Scheduler
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#home" className="logo-wrapper">
                <img src={logoImg} alt="Infinite Horizons Logo" className="logo-img" />
                <span className="logo-text">Infinite Horizons</span>
              </a>
              <p>Elite talent acquisition & staffing solutions for growing businesses in the Midwest and beyond.</p>
            </div>
            
            <div className="footer-col">
              <h4>Solutions</h4>
              <ul className="footer-links">
                <li><a href="#services" className="footer-link">Direct Placement</a></li>
                <li><a href="#services" className="footer-link">Contract-to-Hire</a></li>
                <li><a href="#services" className="footer-link">Staffing Audits</a></li>
                <li><a href="#calculator" className="footer-link">ROI Calculator</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Careers</h4>
              <ul className="footer-links">
                <li><a href="#jobs" className="footer-link">Browse Jobs</a></li>
                <li><a href="#jobs" className="footer-link">Submit Resume</a></li>
                <li><a href="#jobs" className="footer-link">Compensation Guide</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <ul className="footer-links">
                <li><a href="#contact" className="footer-link">Hiring Inquiry</a></li>
                <li><a href="#integrations" className="footer-link">Book Diagnostic Call</a></li>
                <li><span className="footer-link" style={{ cursor: 'pointer' }} onClick={toggleTheme}>Toggle Theme ({theme})</span></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-copy">
              © {new Date().getFullYear()} Infinite Horizons Talent Acquisition. Mock Design Setup. All Rights Reserved.
            </span>
            <div className="footer-socials">
              <a href="https://github.com/donboone3" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Forms Modals Overlay */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        type={modalType} 
        jobTitle={selectedJob} 
      />
    </>
  );
}

