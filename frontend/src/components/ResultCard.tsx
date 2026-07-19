type ResultType = {
  explanation: string;
  issue: string;
  solution: string;
};

export default function ResultCard({ result }: { result: ResultType }) {
  const speakText = (text: string) => {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 1;   // speed (0.5–2)
  speech.pitch = 1;  // tone (0–2)

  window.speechSynthesis.cancel(); // stop previous speech
  window.speechSynthesis.speak(speech);
};
  return (
    // <div style={{ marginTop: "20px" }}>
    //   <h3>🔍 What is this?</h3>
    //   <p>{result.explanation}</p>

    //   <h3>⚠️ Issue</h3>
    //   <p>{result.issue}</p>

    //   <h3>✅ Solution</h3>
    //   <p>{result.solution}</p>
    // </div>
    <div className="result-card">

  <div className="result-section">
    <div className="section-header">
      <h3>What is this?</h3>
      <button
        className="speaker-btn"
        onClick={() => speakText(result.explanation)}
      >
        🔊
      </button>
    </div>
    <p>{result.explanation}</p>
  </div>

  <div className="result-section">
    <div className="section-header">
      <h3>Issue</h3>
      <button
        className="speaker-btn"
        onClick={() => speakText(result.issue)}
      >
        🔊
      </button>
    </div>
    <p>{result.issue}</p>
  </div>

  <div className="result-section">
    <div className="section-header">
      <h3>Solution</h3>
      <button
        className="speaker-btn"
        onClick={() => speakText(result.solution)}
      >
        🔊
      </button>
    </div>
    <p>{result.solution}</p>
  </div>

</div>
  );
}