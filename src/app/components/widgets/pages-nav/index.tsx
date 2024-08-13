import React, { useState, useEffect } from "react";
import "./index.scss";

interface PagesNavProps {
  sections: string[];
}

const PagesNav: React.FC<PagesNavProps> = ({ sections }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      const targetSection = document.querySelector("#" + sections[index]);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        setCurrentIndex(index);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sections.map((section) => {
        const element = document.getElementById(section);
        return element?.getBoundingClientRect().top ?? 0;
      });

      const closestIndex = offsets.findIndex(
        (offset) => offset > window.innerHeight * 0.2
      );
      setCurrentIndex(closestIndex === -1 ? sections.length - 1 : closestIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  return (
    <div className="pages-nav">
      <button
        className={
          "pages-nav__button up " + (currentIndex === 0 ? "hidden" : "")
        }
        onClick={() => scrollToSection(currentIndex - 1)}
      >
        ↑
      </button>
      <button
        className={
          "pages-nav__button down " +
          (currentIndex === sections.length ? "hidden" : "")
        }
        onClick={() => scrollToSection(currentIndex + 1)}
      >
        ↓
      </button>
    </div>
  );
};

export default PagesNav;
