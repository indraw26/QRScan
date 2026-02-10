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
  addToHistory: (content: string, type: "created" | "scanned") => void;
  deleteItem: (id: string) => void;
  clearHistory: () => void;
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

  useEffect(() => {
    try {
      localStorage.setItem("qr-history", JSON.stringify(historyItems));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  }, [historyItems]);

  const addToHistory = (content: string, type: "created" | "scanned") => {
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

  return (
    <HistoryContext.Provider value={{ historyItems, addToHistory, deleteItem, clearHistory }}>
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
