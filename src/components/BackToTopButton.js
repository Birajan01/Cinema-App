
import React, { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    visible && (
      <button
        className="fixed bottom-6 right-6 text-white bg-indigo-600 p-2 rounded-full shadow-lg z-50"
        onClick={scrollToTop}
      >
        <FaArrowCircleUp size={24} />
      </button>
    )
  );
}
