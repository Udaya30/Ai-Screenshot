import { useState } from "react";
import UploadBox from "../components/UploadBox";
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
    <div className="min-h-screen bg-gray-100 p-6">
        <Navbar />

        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <UploadBox setImage={setImage} setPreview={setPreview} />

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
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
            {loading ? "Analyzing..." : "Analyze Screenshot"}
        </button>

        {loading && <Loader />}
        {result && <ResultCard result={result} />}
        </div>
    </div>
    );
}