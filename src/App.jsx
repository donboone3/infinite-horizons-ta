import { useState, useEffect } from 'react';
import logoImg from './assets/logo.png';
import HiringCalculator from './components/HiringCalculator';
import Modal from './components/Modal';


export default function App() {
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Modals state
  const [modalOpen, setModalOpen] = useState(false);

  // Routing and B2B Funnel states
  const [view, setView] = useState('home'); // 'home' | 'partner'
  const [funnelFormData, setFunnelFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    roleNeed: 'Operations Coordinator',
    timeline: 'Immediate'
  });
  const [funnelSubmitted, setFunnelSubmitted] = useState(false);

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

  const openModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/partner' || window.location.hash === '#/grow') {
        setView('partner');
        window.scrollTo(0, 0);
      } else {
        setView('home');
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleFunnelSubmit = (e) => {
    e.preventDefault();
    setFunnelSubmitted(true);
    // Meta Ads Pixel Event Mock
    console.log("Meta Pixel Event: fbq('track', 'Lead', { content_name: '" + funnelFormData.roleNeed + "', company_name: '" + funnelFormData.company + "' });");
  };

  const handleTallySubmit = (e) => {
    e.preventDefault();
    setTallySubmitted(true);
  };

  const handleTimeSlotSelect = (time) => {
    setSelectedTimeSlot(time);
    setCalendlyState('confirmed');
  };

  if (view === 'partner') {
    return (
      <>
        {/* Background Glow Elements */}
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>

        {/* Simplified Header for Funnel Page */}
        <header className="header scrolled">
          <div className="container nav-container" style={{ justifyContent: 'space-between' }}>
            <a href="#" className="logo-wrapper" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}>
              <img src={logoImg} alt="Infinite Horizons Logo" className="logo-img" />
              <span className="logo-text">Infinite Horizons</span>
            </a>
            <a href="#" className="btn btn-secondary btn-sm" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}>
              ← Back to Main Site
            </a>
          </div>
        </header>

        {/* Funnel Page Content */}
        <main className="funnel-page" style={{ paddingTop: '130px', paddingBottom: '80px' }}>
          <div className="container">
            <div className="funnel-hero-grid">
              
              {/* Left Column: B2B Offer Details */}
              <div className="funnel-hero-copy">
                <div className="section-tag" style={{ width: 'max-content', marginBottom: '1rem' }}>Elite Staffing Partner</div>
                <h1 className="funnel-hero-title">
                  Build a High-Performing Operation With <span className="gradient-text">Vetted Midwest Talent</span>
                </h1>
                <p className="funnel-hero-desc">
                  We eliminate the overhead of candidate screening. Partner with us to secure top-tier operations, finance, admin, and sales professionals in under 17 days. 100% risk-free.
                </p>

                {/* Bullet list of trust points */}
                <div className="funnel-benefits-list">
                  <div className="funnel-benefit-item">
                    <span className="benefit-icon">⚡</span>
                    <div>
                      <h4>17-Day Average Fill Time</h4>
                      <p>Skip the wait. Our active regional network lets us introduce highly-qualified candidates in record time.</p>
                    </div>
                  </div>
                  <div className="funnel-benefit-item">
                    <span className="benefit-icon">🛡️</span>
                    <div>
                      <h4>90-Day Free Replacement Guarantee</h4>
                      <p>We stand behind our vetting. If your new hire doesn't work out within 90 days, we'll replace them at zero extra cost.</p>
                    </div>
                  </div>
                  <div className="funnel-benefit-item">
                    <span className="benefit-icon">🎯</span>
                    <div>
                      <h4>Rigorous Pre-Screening</h4>
                      <p>Every candidate passes comprehensive skill assessments and integrity checks before you meet them.</p>
                    </div>
                  </div>
                </div>

                {/* Review Badge */}
                <div className="funnel-trust-row">
                  <div className="trust-metric-box">
                    <div className="trust-val">94%</div>
                    <div className="trust-lbl">1-Year Retention</div>
                  </div>
                  <div className="trust-metric-box">
                    <div className="trust-val">4.9/5</div>
                    <div className="trust-lbl">Owner Rating</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Lead Form Card */}
              <div className="funnel-form-wrapper">
                <div className="glass-card funnel-form-card">
                  {funnelSubmitted ? (
                    <div className="funnel-form-success text-center" style={{ padding: '2.5rem 1rem' }}>
                      <div className="success-icon-ring" style={{ margin: '0 auto 1.5rem' }}>
                        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                          <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                          <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                      </div>
                      <h3>Staffing Discovery Scheduled!</h3>
                      <p style={{ margin: '1rem 0 1.5rem 0', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        Thank you, <strong>{funnelFormData.name}</strong>. We've received your inquiry regarding <strong>{funnelFormData.roleNeed}</strong> needs at <strong>{funnelFormData.company}</strong>.
                      </p>
                      <div style={{ padding: '1rem', background: 'rgba(254, 195, 17, 0.05)', border: '1px solid rgba(254, 195, 17, 0.2)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'left' }}>
                        <strong>Meta Ads Pixel Event Fired:</strong>
                        <code style={{ display: 'block', marginTop: '0.25rem', fontFamily: 'monospace', color: 'var(--color-secondary)' }}>
                          fbq('track', 'Lead', &#123; role: '{funnelFormData.roleNeed}', company: '{funnelFormData.company}' &#125;);
                        </code>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        A senior talent partner will review your requirements and call you at <strong>{funnelFormData.phone}</strong> within 12 hours.
                      </p>
                      <button 
                        className="btn btn-secondary btn-sm" 
                        style={{ marginTop: '1.5rem', width: '100%' }}
                        onClick={() => {
                          setFunnelFormData({ name: '', email: '', phone: '', company: '', roleNeed: 'Operations Coordinator', timeline: 'Immediate' });
                          setFunnelSubmitted(false);
                        }}
                      >
                        Submit Another Request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFunnelSubmit}>
                      <h3>Get Pre-Vetted Candidates</h3>
                      <p className="form-subtitle">Tell us about your operations or admin needs. We'll present matches in 48 hours.</p>

                      <div className="form-group">
                        <label htmlFor="funnel-name">Full Name *</label>
                        <input
                          id="funnel-name"
                          type="text"
                          required
                          value={funnelFormData.name}
                          onChange={(e) => setFunnelFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="form-input"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="funnel-email">Business Email *</label>
                          <input
                            id="funnel-email"
                            type="email"
                            required
                            value={funnelFormData.email}
                            onChange={(e) => setFunnelFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="form-input"
                            placeholder="john@company.com"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="funnel-phone">Phone Number *</label>
                          <input
                            id="funnel-phone"
                            type="tel"
                            required
                            value={funnelFormData.phone}
                            onChange={(e) => setFunnelFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="form-input"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="funnel-company">Company Name *</label>
                          <input
                            id="funnel-company"
                            type="text"
                            required
                            value={funnelFormData.company}
                            onChange={(e) => setFunnelFormData(prev => ({ ...prev, company: e.target.value }))}
                            className="form-input"
                            placeholder="Acme Corp"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="funnel-role">Role Needed *</label>
                          <select
                            id="funnel-role"
                            value={funnelFormData.roleNeed}
                            onChange={(e) => setFunnelFormData(prev => ({ ...prev, roleNeed: e.target.value }))}
                            className="form-input"
                            style={{ background: 'var(--bg-input)', color: 'var(--text-heading)', height: '42px', padding: '0 0.75rem' }}
                          >
                            <option value="Operations Coordinator">Operations Manager / Coord.</option>
                            <option value="Executive Assistant">Executive / Admin Assistant</option>
                            <option value="Sales / Account Executive">Sales Rep / Account Mgr</option>
                            <option value="Finance & Accounting">Finance / Bookkeeper</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Target Hiring Timeline</label>
                        <div className="timeline-selector" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                          {['Immediate', '1-2 Months', 'Planning'].map((t) => (
                            <button
                              key={t}
                              type="button"
                              className={`need-badge ${funnelFormData.timeline === t ? 'active' : ''}`}
                              onClick={() => setFunnelFormData(prev => ({ ...prev, timeline: t }))}
                              style={{ width: '100%', fontSize: '0.75rem', padding: '0.5rem' }}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button type="submit" className="btn btn-accent" style={{ width: '100%', fontSize: '1rem', padding: '0.85rem' }}>
                        Get Vetted Talent Options
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* How It Works Section */}
            <div className="funnel-process-section" style={{ marginTop: '5rem', borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
              <div className="section-header text-center" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
                <span className="section-tag">How It Works</span>
                <h2 className="section-title" style={{ fontSize: '2rem' }}>Our Rigorous 4-Step Pipeline</h2>
                <p>We source and screen so you only interview the absolute best.</p>
              </div>

              <div className="process-timeline-grid">
                <div className="process-step">
                  <div className="step-num">01</div>
                  <h4>Diagnostic Mapping</h4>
                  <p>We analyze your operating structure, tools, and local salary benchmarks to build a profile of the ideal hire.</p>
                </div>
                <div className="process-step">
                  <div className="step-num">02</div>
                  <h4>Active Midwest Sourcing</h4>
                  <p>We leverage our vetted databases and target local Operations channels to discover passive specialists.</p>
                </div>
                <div className="process-step">
                  <div className="step-num">03</div>
                  <h4>Skills & Grit Testing</h4>
                  <p>Every candidate undergoes detailed assessments measuring software fluency, administrative competence, and alignment.</p>
                </div>
                <div className="process-step">
                  <div className="step-num">04</div>
                  <h4>Onboarded Placement</h4>
                  <p>We present the top 2-3 pre-screened options, arrange panels, and support onboarding with a 90-day guarantee.</p>
                </div>
              </div>
            </div>

            {/* Placement Guarantee Row */}
            <div className="glass-card trust-guarantee-card" style={{ marginTop: '4rem', padding: '2.5rem', border: '1px solid rgba(254, 195, 17, 0.3)', background: 'linear-gradient(135deg, rgba(15, 22, 42, 0.8) 0%, rgba(254, 195, 17, 0.03) 100%)' }}>
              <div className="trust-grid">
                <div className="trust-main-info">
                  <span className="trust-badge">Replacement Protection</span>
                  <h3>Our 90-Day Performance Promise</h3>
                  <p style={{ margin: '0 0 1.5rem 0' }}>
                    Recruiting carries risks—unless you partner with Infinite Horizons. We absorb the uncertainty so you can scale with confidence.
                  </p>
                  <div className="trust-guarantee-badge">
                    <span className="gold-check">✓</span> <strong>Zero placement replacement fee for the first 90 days.</strong>
                  </div>
                </div>
                <div className="trust-pillars">
                  <div className="trust-pillar">
                    <h4>Direct Compensation Vetting</h4>
                    <p>We align client salary parameters with local realities so that candidates stay committed long-term.</p>
                  </div>
                  <div className="trust-pillar">
                    <h4>Pre-tested Competency</h4>
                    <p>No training delays. Candidates hit the ground running with direct proficiency in modern cloud systems.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Simplified Footer */}
        <footer className="footer" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div className="container text-center" style={{ padding: '2rem 0' }}>
            <div className="logo-wrapper" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
              <img src={logoImg} alt="Infinite Horizons Logo" className="logo-img" />
              <span className="logo-text">Infinite Horizons</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} Infinite Horizons Talent Acquisition. Mock Design Setup. All Rights Reserved.
            </p>
          </div>
        </footer>
      </>
    );
  }

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
          {/* Nav Menu */}
          <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-active' : ''}`}>
            <li><a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Solutions</a></li>
            <li><a href="#calculator" className="nav-link" onClick={() => setMobileMenuOpen(false)}>ROI Calculator</a></li>
            <li><a href="#why-us" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Why Infinite Horizons</a></li>
            <li><a href="#integrations" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Workflow</a></li>
            <li><a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
            <li className="mobile-only-cta">
              <button 
                className="btn btn-primary btn-sm" 
                style={{ width: '100%' }} 
                onClick={() => { setMobileMenuOpen(false); window.location.hash = '#/partner'; }}
              >
                Hire Talent
              </button>
            </li>
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
            <button className="btn btn-primary btn-sm nav-cta-desktop" onClick={() => window.location.hash = '#/partner'}>
              Hire Talent
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="theme-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-nav-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
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
              <button className="btn btn-accent" onClick={openModal}>
                Hire Elite Talent
              </button>
              <a href="#why-us" className="btn btn-secondary">
                Why Infinite Horizons
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
              <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={openModal}>
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
              <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={openModal}>
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
              <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={openModal}>
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

      {/* Hiring Pain Points & B2B Trust Section */}
      <section id="why-us" className="section why-us-section" style={{ backgroundColor: 'rgba(254, 195, 17, 0.015)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header text-center" style={{ maxWidth: '800px', margin: '0 auto 50px' }}>
            <span className="section-tag">Hiring Realities</span>
            <h2 className="section-title">The Real Cost of Hiring Friction</h2>
            <p className="section-subtitle">
              For growing small businesses, talent acquisition is the single biggest bottleneck. Traditional recruiting processes drain focus, burn capital, and delay execution.
            </p>
          </div>

          {/* Grid of 4 Pain Points */}
          <div className="pain-grid">
            {/* Pain 1: Bandwidth Drain */}
            <div className="glass-card pain-card">
              <div className="pain-icon-wrapper">
                <span className="pain-icon">⏰</span>
              </div>
              <div className="pain-content">
                <div className="pain-badge">Bandwidth Drain</div>
                <h3>Owner Acting as Recruiter</h3>
                <p className="pain-metric">40+ Hours Lost Per Role</p>
                <p className="pain-description">
                  Small business owners waste weeks reviewing hundreds of low-intent resumes, chasing ghosts, and conducting first-round phone screens, pulling focus away from core operations and revenue growth.
                </p>
              </div>
            </div>

            {/* Pain 2: Bad Hire Risk */}
            <div className="glass-card pain-card">
              <div className="pain-icon-wrapper">
                <span className="pain-icon">⚠️</span>
              </div>
              <div className="pain-content">
                <div className="pain-badge danger">Turnover Penalty</div>
                <h3>The $25,000 Bad Hire Cost</h3>
                <p className="pain-metric">30% Salary Waste</p>
                <p className="pain-description">
                  Hiring the wrong operations manager, admin lead, or sales rep is catastrophic. Between training overhead, lost productivity, and severance, a single hiring mistake costs tens of thousands of dollars.
                </p>
              </div>
            </div>

            {/* Pain 3: Compensation Gap */}
            <div className="glass-card pain-card">
              <div className="pain-icon-wrapper">
                <span className="pain-icon">📊</span>
              </div>
              <div className="pain-content">
                <div className="pain-badge warning">Benefits Disadvantage</div>
                <h3>The Compensation Gap</h3>
                <p className="pain-metric">Corporate Competitiveness</p>
                <p className="pain-description">
                  Small businesses struggle to compete with massive corporate benefits and salary budgets. We help you reposition your roles to attract entrepreneurial, high-grit professionals who value growth over bureaucracy.
                </p>
              </div>
            </div>

            {/* Pain 4: Vacancy Bottleneck */}
            <div className="glass-card pain-card">
              <div className="pain-icon-wrapper">
                <span className="pain-icon">⏳</span>
              </div>
              <div className="pain-content">
                <div className="pain-badge info">Operational Delay</div>
                <h3>The Vacancy Bottleneck</h3>
                <p className="pain-metric">42+ Days to Fill</p>
                <p className="pain-description">
                  Leaving key positions vacant forces other team members to absorb the workload, leading to burnout, errors, and delayed project delivery. Our pre-vetted talent pipeline reduces time-to-hire by over 50%.
                </p>
              </div>
            </div>
          </div>

          {/* B2B Trust Guarantee Row */}
          <div className="glass-card trust-guarantee-card" style={{ marginTop: '3rem', padding: '2.5rem', border: '1px solid rgba(254, 195, 17, 0.3)', background: 'linear-gradient(135deg, rgba(15, 22, 42, 0.8) 0%, rgba(254, 195, 17, 0.03) 100%)' }}>
            <div className="trust-grid">
              <div className="trust-main-info">
                <span className="trust-badge">Guaranteed Outcomes</span>
                <h3>Protecting Your Bottom Line</h3>
                <p>
                  As a leading Midwest recruiting agency, we build trust through accountability. Our small business staffing solutions are structured to mitigate risk and guarantee alignment.
                </p>
                <div className="trust-guarantee-badge">
                  <span className="gold-check">✓</span> <strong>90-Day Free Replacement Guarantee</strong>
                </div>
              </div>
              <div className="trust-pillars">
                <div className="trust-pillar">
                  <h4>94% Retention Rate</h4>
                  <p>Our placements stay long-term because we screen for both technical capability and small-business cultural alignment.</p>
                </div>
                <div className="trust-pillar">
                  <h4>Elite Pre-Vetting</h4>
                  <p>Every operations, admin, and sales candidate undergoes rigorous vetting before they reach your inbox.</p>
                </div>
              </div>
            </div>
          </div>
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
          <div className="glass-card tool-card tool-card-double">
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
          <div className="contact-grid">
            <div>
              <span className="section-tag">Let's Connect</span>
              <h2 className="contact-title">Ready to Scale Your Recruiting?</h2>
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

            <div className="glass-card contact-card-glass">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Request Staffing Details</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Fill out the brief contact inquiry below and one of our client engagement representatives will follow up within 24 hours.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <button className="btn btn-primary" style={{ justifySelf: 'left' }} onClick={openModal}>
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
              <h4>Why Us</h4>
              <ul className="footer-links">
                <li><a href="#why-us" className="footer-link">Hiring Realities</a></li>
                <li><a href="#services" className="footer-link">Our Capabilities</a></li>
                <li><a href="#calculator" className="footer-link">ROI Calculator</a></li>
                <li><a href="#integrations" className="footer-link">Workflow Diagnostic</a></li>
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
      />
    </>
  );
}

