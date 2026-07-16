type ResultType = {
  explanation: string;
  issue: string;
  solution: string;
};

export default function ResultCard({ result }: { result: ResultType }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>🔍 What is this?</h3>
      <p>{result.explanation}</p>

      <h3>⚠️ Issue</h3>
      <p>{result.issue}</p>

      <h3>✅ Solution</h3>
      <p>{result.solution}</p>
    </div>
  );
}