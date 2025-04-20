import React from 'react';

const Introduction = ({ onStart }) => {
  return (
    <div className="introduction">
      <div className="intro-content">
        <div className="intro-header">
          <div className="header-decoration left"></div>
          <h1>The Database Detective</h1>
          <div className="header-decoration right"></div>
        </div>
        
        <div className="case-file">
          <div className="case-header">
            <div className="case-stamp">
              <div className="stamp-content">TOP SECRET</div>
            </div>
            <h2>CASE FILE: #SQL-137</h2>
          </div>
          
          <div className="evidence-grid">
            <div className="evidence-item museum">
              <div className="evidence-label">Crime Scene</div>
            </div>
            <div className="evidence-item prototype">
              <div className="evidence-label">Stolen Item</div>
            </div>
            <div className="evidence-item security">
              <div className="evidence-label">Security Feed</div>
            </div>
            <div className="evidence-item blueprint">
              <div className="evidence-label">Museum Layout</div>
            </div>
          </div>
          
          <div className="case-details">
            <div className="details-header">
              <div className="detail-item">
                <span className="detail-label">TIME:</span>
                <span className="detail-value">22:15, Last Night</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">LOCATION:</span>
                <span className="detail-value">Central Park Tech Museum</span>
              </div>
            </div>
            
            <div className="narrative">
              <p className="typewriter">URGENT: A quantum computer prototype has been stolen from the Tech Museum's high-security vault during the annual "Future of Computing" gala.</p>
              
              <div className="suspects-grid">
                {[
                  { name: 'John Smith', role: 'Cybersecurity Expert', image: 'suspect1' },
                  { name: 'Emily Davis', role: 'Quantum Computing Researcher', image: 'suspect2' },
                  { name: 'Michael Wong', role: 'Museum Security Chief', image: 'suspect3' },
                  { name: 'Sarah Johnson', role: 'AI Professor', image: 'suspect4' },
                  { name: 'Robert Brown', role: 'Museum Maintenance Head', image: 'suspect5' }
                ].map((suspect, index) => (
                  <div key={index} className="suspect-card">
                    <div className={`suspect-image ${suspect.image}`}></div>
                    <div className="suspect-info">
                      <div className="suspect-name">{suspect.name}</div>
                      <div className="suspect-role">{suspect.role}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="evidence-types">
                <h3>Available Database Tables:</h3>
                <div className="table-grid">
                  <div className="table-item">
                    <div className="table-icon camera"></div>
                    <span>Security Cameras</span>
                  </div>
                  <div className="table-item">
                    <div className="table-icon alibi"></div>
                    <span>Suspect Alibis</span>
                  </div>
                  <div className="table-item">
                    <div className="table-icon access"></div>
                    <span>Access Logs</span>
                  </div>
                  <div className="table-item">
                    <div className="table-icon witness"></div>
                    <span>Witness Reports</span>
                  </div>
                </div>
              </div>
              
              <div className="mission-brief">
                <div className="brief-header">MISSION BRIEFING</div>
                <p>Detective, your SQL expertise is crucial. The prototype must be recovered within 24 hours, or the future of quantum computing could be compromised. Use the database to:</p>
                <ul className="mission-objectives">
                  <li>Track suspect movements through camera feeds</li>
                  <li>Cross-reference alibis with access logs</li>
                  <li>Identify suspicious patterns in the data</li>
                  <li>Expose the mastermind behind the heist</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <button className="start-btn" onClick={onStart}>
          <span className="btn-icon">⌘</span>
          BEGIN INVESTIGATION
          <span className="btn-icon">⌘</span>
        </button>
      </div>
    </div>
  );
};

export default Introduction;
