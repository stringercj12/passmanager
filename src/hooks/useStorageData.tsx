import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext } from 'react';


interface StorageDataProviderProps {
  children: ReactNode;
}

interface storageDataProps {
  setStorage: (key: string, data: any) => void;
  getStorage: (key: string) => void;
}

const StorageDataContext = createContext({} as storageDataProps);


function StorageDataProvider({ children }: StorageDataProviderProps) {
  const storageProjectName = '@passmanager:';


  async function setStorage(key: string, data: any) {
    await AsyncStorage.setItem(`${storageProjectName}${key}`, JSON.stringify(data));
  }

  async function getStorage(key: string) {
    const data = await AsyncStorage.getItem(`${storageProjectName}${key}`);
    const currentData = data ? JSON.parse(data) : [];

    return currentData;
  }

  return (
    <StorageDataContext.Provider value={{
      setStorage,
      getStorage,
    }}>
      {children}
    </StorageDataContext.Provider>
  );
}


function useStorageData() {
  const context = useContext(StorageDataContext);

  return context;
}


export {
  StorageDataProvider,
  useStorageData,
}