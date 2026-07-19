import { useState } from "react";
import ImagePreview from "../components/ImagePreview";
import ResultCard from "../components/ResultCard";
import { analyzeImage } from "../services/api";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

type ResultType = {
  explanation: string;
  issue: string;
  solution: string;
};

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ResultType | null>(null);

  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await analyzeImage(image);
      setResult(res);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        console.error(err);
        alert("Error analyzing image");
    }

    setLoading(false);
  };

  return (
  <div className="home">
    <Navbar />

    <div className="container">
      
      <div className="upload-box">
  <input
    type="file"
    id="fileUpload"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
      }
    }}
    hidden
  />

  <label htmlFor="fileUpload" className="upload-btn">
    📁 Choose Image
  </label>
</div>
      {preview && (
        <ImagePreview
          preview={preview}
          setImage={setImage}
          setPreview={setPreview}
        />
      )}

      <button
        onClick={handleAnalyze}
        disabled={!image || loading}
        className="analyze-btn"
      >
        {loading ? "Analyzing..." : "Analyze Screenshot"}
      </button>

      {loading && <Loader />}
      {result && <ResultCard result={result} />}
    </div>
  </div>
);
}