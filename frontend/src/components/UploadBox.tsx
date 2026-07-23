type Props = {
  setImage: (file: File | null) => void;
  setPreview: (preview: string | null) => void;
};

export default function UploadBox({ setImage, setPreview }: Props) {

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleFile = async (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));

    // 🔥 Convert to base64
    const base64Full = await toBase64(file);

    // Split metadata + actual base64
    const [meta, base64] = base64Full.split(",");
    const type = meta.match(/data:(.*);base64/)?.[1];

    // 🚀 Send to backend
    const res = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: {
          base64,
          type,
        },
      }),
    });

    const data = await res.json();
    console.log("🧠 AI RESULT:", data);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}