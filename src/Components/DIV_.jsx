import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
export const DIV_ = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [Xdiv, setXDiv] = useState(localStorage.getItem("Xdiv") || 5);
  const [Ydiv, setYDiv] = useState(localStorage.getItem("Ydiv") || 6);
  const navigate = useNavigate();
  const divRef = useRef(null);
  const handleDragStart = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setXDiv(e.clientX - divRef.current.offsetWidth / 2);
        setYDiv(e.clientY - divRef.current.offsetHeight / 2);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("dragstart", handleDragStart);
    }
    localStorage.setItem("Ydiv", Ydiv);
    localStorage.setItem("Xdiv", Xdiv);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, [isDragging]);
  const handleDoubleClick = () => {
    navigate("/");
  };

  const handleMouseDown = (e) => {
    if (e.target === divRef.current) {
      setIsDragging(true);
      setXDiv(e.clientX - divRef.current.offsetWidth / 2);
      setYDiv(e.clientY - divRef.current.offsetHeight / 2);
    }
  };

  return (
    <div
      onDragStart={handleDragStart}
      onDoubleClick={handleDoubleClick}
      className="divsuper"
      ref={divRef}
      onMouseDown={handleMouseDown}
      style={{
        top: `${Ydiv}px`,
        left: `${Xdiv}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
    />
  );
};
