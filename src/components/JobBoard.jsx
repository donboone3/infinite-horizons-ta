import { useState } from 'react';

const MOCK_JOBS = [
  {
    id: 1,
    title: 'Operations Coordinator',
    category: 'Operations',
    location: 'Wichita, KS (Hybrid)',
    type: 'Full-time',
    salary: '$52,000 - $65,000',
    description: 'Manage logistics, supply schedules, and administrative coordination for a growing regional distribution firm.'
  },
  {
    id: 2,
    title: 'Senior Staff Accountant',
    category: 'Finance',
    location: 'Overland Park, KS',
    type: 'Full-time',
    salary: '$80,000 - $95,000',
    description: 'Oversee general ledger, reconciliation, tax preparation, and financial reporting for an expanding logistics provider.'
  },
  {
    id: 3,
    title: 'Executive Assistant',
    category: 'Administrative',
    location: 'Kansas City, MO (Hybrid)',
    type: 'Full-time',
    salary: '$48,000 - $58,000',
    description: 'Support C-level executives with schedule management, client communications, and operational support at a tech consultancy.'
  },
  {
    id: 4,
    title: 'Sales Account Manager',
    category: 'Sales',
    location: 'Wichita, KS',
    type: 'Full-time',
    salary: '$60,000 - $75,000 + Commission',
    description: 'Maintain and scale corporate accounts for an established manufacturing parts supplier.'
  },
  {
    id: 5,
    title: 'IT Helpdesk Specialist',
    category: 'Technology',
    location: 'Wichita, KS (On-site)',
    type: 'Contract-to-Hire',
    salary: '$24 - $30 / hr',
    description: 'Provide tier 1 & 2 support, network troubleshooting, and hardware deployments for a local medical facility.'
  },
  {
    id: 6,
    title: 'Client Services Specialist',
    category: 'Customer Success',
    location: 'Remote (US-Central)',
    type: 'Full-time',
    salary: '$45,000 - $52,000',
    description: 'Serve as primary point of contact for small business clients onboarding to a payroll service platform.'
  }
];

export default function JobBoard({ onApply }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Operations', 'Finance', 'Administrative', 'Sales', 'Technology'];

  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || job.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="job-board-container">
      <div className="filters-wrapper">
        <div className="search-box-wrapper">
          <input
            type="text"
            placeholder="Search open positions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="jobs-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job.id} className="glass-card job-card">
              <div className="job-main">
                <h3 style={{ color: 'var(--text-heading)', margin: '0 0 0.5rem 0' }}>{job.title}</h3>
                <div className="job-meta-row">
                  <div className="job-meta-item">
                    <span>📍</span> {job.location}
                  </div>
                  <div className="job-meta-item">
                    <span>💼</span> {job.type}
                  </div>
                  <div className="job-meta-item">
                    <span>💰</span> {job.salary}
                  </div>
                </div>
                <p style={{ margin: '1rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  {job.description}
                </p>
              </div>
              
              <div className="job-badge">
                {job.category}
              </div>

              <div className="job-actions-wrapper">
                <button 
                  onClick={() => onApply(job.title)}
                  className="btn btn-secondary btn-sm"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="glass-card empty-jobs">
            <h4 style={{ margin: 0, color: 'var(--text-muted)' }}>
              No positions matching your search criteria.
            </h4>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
              Submit your resume below and we will contact you when a matching role opens.
            </p>
            <button 
              onClick={() => onApply('General Candidate Submission')}
              className="btn btn-primary btn-sm"
              style={{ marginTop: '1.5rem' }}
            >
              Submit General Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
