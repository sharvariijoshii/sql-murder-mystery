import React from 'react';
import './CaseClosedModal.css';

const CaseClosedModal = ({ onRestart }) => (
  <div className="case-closed-modal-overlay">
    <div className="case-closed-modal">
      <h2>Case Closed!</h2>
      <p className="case-conclusion">
        <b>The investigation is complete.</b><br /><br />
        Through your SQL detective work, you uncovered the truth:<br />
        <span className="culprit-name">John Smith</span> was the murderer!
        <br /><br />
        <b>How did you solve it?</b><br />
        - You traced suspicious movements through camera logs.<br />
        - You cross-referenced alibis and found inconsistencies.<br />
        - You discovered multiple suspects at the warehouse, but only John Smith’s alibi fell apart under scrutiny.<br /><br />
        <span className="final-remark">
          Congratulations, Detective! Central City is safe once again—thanks to your SQL skills and sharp mind.<br />
          <br />
          <i>Remember: In the world of data, every clue counts.</i>
        </span>
      </p>
      <button className="case-closed-btn" onClick={onRestart}>Restart Case</button>
    </div>
  </div>
);

export default CaseClosedModal;
