// AppContext_act7.js
// Global state (Context API) shared by every tab screen.
import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

const lightTheme = {
  background: '#F5F7FA',
  card: '#FFFFFF',
  text: '#1A1A2E',
  subtext: '#6B7280',
  primary: '#4F46E5',
  error: '#DC2626',
};

const darkTheme = {
  background: '#0F172A',
  card: '#1E293B',
  text: '#F1F5F9',
  subtext: '#94A3B8',
  primary: '#818CF8',
  error: '#F87171',
};

export function AppProvider({ children }) {
  const [name, setName] = useState('Juan Dela Cruz');
  const [darkMode, setDarkMode] = useState(false);
  const [saving, setSaving] = useState(false); // loading state
  const [error, setError] = useState(null); // error state

  // Simulates saving: shows "Saving..." for 1 second, then applies the update.
  const updateProfile = useCallback((newName, newDarkMode) => {
    const trimmed = newName.trim();

    if (trimmed.length === 0) {
      setError('Name cannot be empty.');
      return;
    }

    setError(null);
    setSaving(true);

    setTimeout(() => {
      setName(trimmed);
      setDarkMode(newDarkMode);
      setSaving(false);
    }, 1000);
  }, []);

  const value = {
    name,
    darkMode,
    saving,
    error,
    setError,
    updateProfile,
    theme: darkMode ? darkTheme : lightTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook so screens can simply call useApp() instead of prop drilling.
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used inside an <AppProvider>');
  }
  return context;
}
