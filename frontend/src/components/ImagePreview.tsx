type Props = {
  preview: string;
  setImage: (file: File | null) => void;
  setPreview: (preview: string | null) => void;
};

export default function ImagePreview({ preview, setImage, setPreview }: Props) {
  return (
    <div style={{ marginTop: "10px" }}>
      <img src={preview} alt="preview" width="300" />
      <br />
      <button
        onClick={() => {
          setImage(null);
          setPreview(null);
        }}
      >
        Remove
      </button>
    </div>
  );
}