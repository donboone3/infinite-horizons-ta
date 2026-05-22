import { useState } from 'react';

export default function HiringCalculator() {
  const [positions, setPositions] = useState(3);
  const [salary, setSalary] = useState(80000);
  const [weeksToHire, setWeeksToHire] = useState(6);

  // Calculate values dynamically during rendering instead of using effects and states
  const singleInternalCost = (salary * 0.12) + 2500; 
  const internalCost = Math.round(singleInternalCost * positions);

  // Internal hours spent (sourcing, screening, scheduling, interviewing)
  const hoursPerPosition = 45;
  const hoursSpent = Math.round(hoursPerPosition * positions);

  // Infinite Horizons saves approximately 35% on recruitment cost
  const ihCostSavings = Math.round(internalCost * 0.35);
  
  // Days saved (internal time-to-hire is weeksToHire, IH average time is 17 days)
  const internalDays = weeksToHire * 7;
  const ihDays = 17;
  const daysSaved = Math.round(Math.max(0, (internalDays - ihDays) * positions));


  return (
    <div className="glass-card calculator-container">
      <div className="calc-inputs">
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>
          Hiring Impact & ROI Calculator
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Estimate the internal overhead and time spent on your current recruiting process, and see how much you save with Infinite Horizons.
        </p>

        {/* Positions Input */}
        <div className="input-group">
          <div className="input-label-row">
            <span className="input-label">Open Positions to Fill</span>
            <span className="input-value-badge">{positions} {positions === 1 ? 'Role' : 'Roles'}</span>
          </div>
          <input
            type="range"
            min="1"
            max="15"
            step="1"
            value={positions}
            onChange={(e) => setPositions(parseInt(e.target.value))}
            className="range-slider"
          />
        </div>

        {/* Salary Input */}
        <div className="input-group">
          <div className="input-label-row">
            <span className="input-label">Average Annual Salary</span>
            <span className="input-value-badge">${salary.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="40000"
            max="160000"
            step="5000"
            value={salary}
            onChange={(e) => setSalary(parseInt(e.target.value))}
            className="range-slider"
          />
        </div>

        {/* Time To Hire Input */}
        <div className="input-group">
          <div className="input-label-row">
            <span className="input-label">Avg. Weeks to Fill Internally</span>
            <span className="input-value-badge">{weeksToHire} Weeks</span>
          </div>
          <input
            type="range"
            min="3"
            max="12"
            step="1"
            value={weeksToHire}
            onChange={(e) => setWeeksToHire(parseInt(e.target.value))}
            className="range-slider"
          />
        </div>
      </div>

      <div className="calc-results-card">
        <span className="savings-label">Estimated Business Savings</span>
        <span className="savings-amount">${ihCostSavings.toLocaleString()}</span>
        
        <div className="savings-metrics">
          <div className="metric-row">
            <span style={{ color: 'var(--text-muted)' }}>Internal Recruitment Overhead</span>
            <span className="metric-val">${internalCost.toLocaleString()}</span>
          </div>
          <div className="metric-row">
            <span style={{ color: 'var(--text-muted)' }}>Internal Staff Hours Wasted</span>
            <span className="metric-val">{hoursSpent} Hours</span>
          </div>
          <div className="metric-row" style={{ borderTop: '1px solid rgba(2, 61, 239, 0.1)', paddingTop: '0.75rem' }}>
            <span style={{ color: 'var(--text-heading)', fontWeight: '600' }}>Opportunity Time Restored</span>
            <span className="metric-val" style={{ color: 'var(--color-secondary)' }}>{daysSaved} Days Faster</span>
          </div>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 1.5rem' }}>
          *Overhead calculations are based on average HR search, advertisement, screening software, and opportunity downtime costs.
        </p>

        <a href="#contact" className="btn btn-primary" style={{ width: '100%' }}>
          Claim Your Hiring Savings
        </a>
      </div>
    </div>
  );
}
