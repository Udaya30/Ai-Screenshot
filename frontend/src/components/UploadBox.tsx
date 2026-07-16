type Props = {
  setImage: (file: File | null) => void;
  setPreview: (preview: string | null) => void;
};

export default function UploadBox({ setImage, setPreview }: Props) {
  const handleFile = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
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