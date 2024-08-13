import React, { useState, useEffect } from "react";
import JsGoogleTranslateFree from "@kreisler/js-google-translate-free";
import "./index.scss";

interface MyFormValues {
  location: string;
  cameraType: string;
  action: string;
  pose: string;
  characterDescription: string;
  clothing: string;
}

interface FormField {
  name: keyof MyFormValues;
  label: string;
  placeholder: string;
}

const formFields: FormField[] = [
  { name: "location", label: "Локація", placeholder: "Опис локації..." },
  { name: "cameraType", label: "Вид камери", placeholder: "Тип камери..." },
  { name: "action", label: "Дія", placeholder: "Що робить персонаж..." },
  { name: "pose", label: "Поза", placeholder: "Опис пози..." },
  {
    name: "characterDescription",
    label: "Опис персонажа",
    placeholder: "Зовнішність, риси характеру...",
  },
  { name: "clothing", label: "Одяг", placeholder: "Опис одягу..." },
];

const HomePage: React.FC = () => {
  const [formValues, setFormValues] = useState<MyFormValues>(() => {
    const savedValues = localStorage.getItem("formValues");
    return savedValues
      ? JSON.parse(savedValues)
      : {
          location: "",
          cameraType: "",
          action: "",
          pose: "",
          characterDescription: "",
          clothing: "",
        };
  });

  const [visibility, setVisibility] = useState<
    Record<keyof MyFormValues, boolean>
  >(() => {
    const savedVisibility = localStorage.getItem("visibility");
    return savedVisibility
      ? JSON.parse(savedVisibility)
      : {
          location: true,
          cameraType: true,
          action: true,
          pose: true,
          characterDescription: true,
          clothing: true,
        };
  });

  const [generatedTexts, setGeneratedTexts] = useState<string[]>(() => {
    const savedTexts = localStorage.getItem("generatedTexts");
    return savedTexts ? JSON.parse(savedTexts) : [];
  });

  const [translatedText, setTranslatedText] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("formValues", JSON.stringify(formValues));
  }, [formValues]);

  useEffect(() => {
    localStorage.setItem("visibility", JSON.stringify(visibility));
  }, [visibility]);

  useEffect(() => {
    localStorage.setItem("generatedTexts", JSON.stringify(generatedTexts));
  }, [generatedTexts]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const toggleVisibility = (field: keyof MyFormValues) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  };

  const translateText = async (text: string) => {
    try {
      const result = await JsGoogleTranslateFree.translate({
        text,
        from: "uk",
        to: "en",
      });
      return result;
    } catch (error) {
      console.error("Translation error:", error);
      return "Error translating text.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Об'єднуємо всі значення з formValues в один рядок
    const combinedText = Object.values(formValues).join(", ");

    // Викликаємо функцію перекладу для об'єднаного тексту
    const translatedText = await translateText(combinedText);

    // Зберігаємо перекладений текст у стані та додаємо до історії
    setTranslatedText(translatedText);
    setGeneratedTexts((prevTexts) => [...prevTexts, translatedText]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000); // Скидаємо статус через 2 секунди
  };

  const handleDelete = (index: number) => {
    setGeneratedTexts((prevTexts) => prevTexts.filter((_, i) => i !== index));
  };

  return (
    <section className="wrapper">
      <h1 className="w-full text-center">Промпт генератор</h1>
      <form className="my-form" onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div className="form-group" key={field.name}>
            <div className="flex justify-between">
              <label htmlFor={field.name}>{field.label}</label>
              <button
                type="button"
                className="toggle-button"
                onClick={() => toggleVisibility(field.name)}
              >
                {visibility[field.name] ? "Приховати" : "Показати"}
              </button>
            </div>
            {visibility[field.name] && (
              <textarea
                name={field.name}
                id={field.name}
                rows={3}
                value={formValues[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}

        <button className="toggle-button generate-button" type="submit">
          Генерувати
        </button>
      </form>

      {translatedText && (
        <div className="generated-text">
          <p>{translatedText}</p>
          <div className="flex justify-end mt-4">
            <button className="toggle-button" onClick={handleCopy}>
              {copyStatus ? "✔️" : "Копіювати"}
            </button>
          </div>
        </div>
      )}

      {generatedTexts.length > 0 && (
        <div className="history">
          <h3 className="w-full text-center">Історія згенерованих текстів</h3>
          <ul>
            {generatedTexts.map((text, index) => (
              <li key={index}>
                <p>{text}</p>
                <div className="flex justify-end gap-4 mt-4">
                  <button className="toggle-button" onClick={() => handleCopy()}>Копіювати</button>
                  <button className="toggle-button" onClick={() => handleDelete(index)}>Видалити</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default HomePage;
