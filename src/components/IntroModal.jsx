import React from 'react';
import './IntroModal.css';

const IntroModal = ({ onStart }) => (
  <div className="intro-modal-overlay">
    <div className="intro-modal">
      <h2>SQL Murder Mystery</h2>
      <p className="intro-narration">
        <span className="intro-highlight">A chilling midnight rain falls over Central City.</span><br /><br />
        The peace is shattered by a single, urgent call: <b>A murder has been committed in Central Park.</b><br /><br />
        The city’s top detective—you—arrive at the scene. The only clues? Flickering security cameras, cryptic alibi logs, and a tangled web of suspects, each with secrets to hide.<br /><br />
        The Chief leans in:<br />
        <span className="intro-quote">“We need answers. Fast. The killer is still out there—and every second counts.”</span><br /><br />
        <b>Your mission:</b> Use your SQL skills to sift through digital evidence, connect the dots, and unmask the culprit before they strike again.<br /><br />
        <span className="intro-highlight">Every correct query reveals a new clue. Every mistake? The trail grows colder.</span><br /><br />
        Are you ready to crack the case and become a legend in the annals of Central City’s finest?
      </p>
      <button className="intro-btn" onClick={onStart}>Begin Investigation</button>
    </div>
  </div>
);

export default IntroModal;
