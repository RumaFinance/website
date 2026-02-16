"use client";

import React, { createContext, useContext, ReactNode } from "react";

type Dictionary = Record<string, any>;

interface TranslationsContextType {
  dictionary: Dictionary;
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(
  undefined,
);

interface TranslationsProviderProps {
  children: ReactNode;
  dictionary: Dictionary;
}

export function TranslationsProvider({
  children,
  dictionary,
}: TranslationsProviderProps) {
  return (
    <TranslationsContext.Provider value={{ dictionary }}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations(namespace?: string) {
  const context = useContext(TranslationsContext);

  if (context === undefined) {
    throw new Error(
      "useTranslations must be used within a TranslationsProvider",
    );
  }

  return (key: string) => {
    const { dictionary } = context;

    if (namespace) {
      const namespaceData = dictionary[namespace];
      if (namespaceData && typeof namespaceData === "object") {
        return namespaceData[key] || key;
      }
      return key;
    }

    return dictionary[key] || key;
  };
}
