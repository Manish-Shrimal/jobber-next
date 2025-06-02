'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import BaseApi from '@/app/(api)/BaseApi';

const ConfigContext = createContext(null);

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch(`${BaseApi}/getconstant`);
        const data = await res.json();
        setConfig(data);
      } catch (err) {
        console.error('Failed to fetch config:', err);
      }
    }

    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
