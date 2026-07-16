import Tesseract from "tesseract.js";

export const extractTextFromImage = async (file: File): Promise<string> => {
  try {
    const result = await Tesseract.recognize(file, "eng", {
      logger: (m) => {
        console.log("OCR Progress:", m); // optional
      },
    });

    return result.data.text;
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("Failed to extract text from image");
  }
};