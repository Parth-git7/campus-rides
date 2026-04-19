import { useState, useEffect } from "react";

const useUI = () => {
  // --- UI State ---
  const [activeTab, setActiveTab] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // --- Search State ---
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");

  // --- Close post-ride form when tab changes ---
  // Same logic you had in App.js useEffect
  useEffect(() => {
    setShowForm(false);
  }, [activeTab]);

  return {
    activeTab, setActiveTab,
    darkMode, setDarkMode,
    showForm, setShowForm,
    searchFrom, setSearchFrom,
    searchTo, setSearchTo,
  };
};

export default useUI;