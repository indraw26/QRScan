import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface HistoryItem {
  id: string;
  content: string;
  type: "created" | "scanned";
  timestamp: number;
}

interface HistoryContextType {
  historyItems: HistoryItem[];
  autoSave: boolean;
  addToHistory: (content: string, type: "created" | "scanned") => void;
  deleteItem: (id: string) => void;
  clearHistory: () => void;
  toggleAutoSave: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem("qr-history");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load history", e);
      return [];
    }
  });

  const [autoSave, setAutoSave] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("qr-autosave");
      return stored !== null ? JSON.parse(stored) : true;
    } catch (e) {
      console.error("Failed to load autosave setting", e);
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("qr-history", JSON.stringify(historyItems));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  }, [historyItems]);

  useEffect(() => {
    try {
      localStorage.setItem("qr-autosave", JSON.stringify(autoSave));
    } catch (e) {
      console.error("Failed to save autosave setting", e);
    }
  }, [autoSave]);

  const addToHistory = (content: string, type: "created" | "scanned") => {
    if (!autoSave) return;

    // Prevent duplicates for the same content and type if it was added recently?
    // For now, just add to top
    const newItem: HistoryItem = {
      id: crypto.randomUUID(),
      content,
      type,
      timestamp: Date.now(),
    };
    setHistoryItems((prev) => [newItem, ...prev]);
  };

  const deleteItem = (id: string) => {
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    setHistoryItems([]);
  };

  const toggleAutoSave = () => {
    setAutoSave(prev => !prev);
  };

  return (
    <HistoryContext.Provider value={{ historyItems, autoSave, addToHistory, deleteItem, clearHistory, toggleAutoSave }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};
