"use client";

import * as React from "react";

interface TitleContextType {
  title: string;
  setTitle: (title: string) => void;
  description?: string;
  setDescription: (description?: string) => void;
  count?: number;
  setCount: (count?: number) => void;
  namespace: string;
  setNamespace: (namespace: string) => void;
}

const TitleContext = React.createContext<TitleContextType | undefined>(
  undefined,
);

export function TitleProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState<string | undefined>();
  const [count, setCount] = React.useState<number | undefined>();
  const [namespace, setNamespace] = React.useState("All Namespaces");

  return (
    <TitleContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        count,
        setCount,
        namespace,
        setNamespace,
      }}
    >
      {children}
    </TitleContext.Provider>
  );
}

export function useTitle() {
  const context = React.useContext(TitleContext);
  if (!context) {
    throw new Error("useTitle must be used within a TitleProvider");
  }
  return context;
}
