import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { saveToLocalStorage } from '../lib/localStorage';

const useSettingsData = () => {
  const [hardMode, setHardMode] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [message, setMessage] = useState('');

  const [settings, setSettings] = useState({
    hardMode: false,
    darkTheme: false,
    highContrast: false,
    initialized: false,
  });

  type LocalSettings = {
    hardMode: boolean;
    darkTheme: boolean;
    highContrast: boolean;
  };

  const getSettingsFromLocalStorage = useCallback(() => {
    const rawSettings = localStorage.getItem('settings');
    return rawSettings ? (JSON.parse(rawSettings) as LocalSettings) : null;
  }, []);

  useEffect(() => {
    const localStorageSettings = getSettingsFromLocalStorage();

    if (localStorageSettings && !settings.initialized) {
      const newSettings = { ...localStorageSettings, initialized: true };
      setSettings(newSettings);
    }
  }, [getSettingsFromLocalStorage, settings]);

  // Update local storage when state changes
  useEffect(() => {
    if (settings.initialized) {
      const { hardMode, darkTheme, highContrast } = settings;
      const newSettings = {
        hardMode,
        darkTheme,
        highContrast,
      };
      saveToLocalStorage<LocalSettings>('settings', newSettings);
      const htmlEl = document.querySelector('html');
      if (!htmlEl) {
        throw new Error('Document is undefined');
      }
      if (darkTheme) {
        htmlEl.classList.add('dark');
      } else {
        htmlEl.classList.remove('dark');
      }
    }
  }, [darkTheme, hardMode, highContrast, settings]);

  const toggleHardMode = (gameState: string, currentRowIndex: number) => {
    if (gameState === 'active' && currentRowIndex > 0 && !settings.hardMode) {
      setMessage('Hard mode can only be enabled at the start of a round');
      setTimeout(() => setMessage(''), 2000);
      return;
    }
    const { hardMode, darkTheme, highContrast } = settings;

    const newSettings = {
      hardMode: !hardMode,
      darkTheme,
      highContrast,
      initialized: true,
    };

    setSettings(newSettings);
  };

  const toggleDarkTheme = () => {
    const { hardMode, darkTheme, highContrast } = settings;
    const newSettings = {
      hardMode,
      darkTheme: !darkTheme,
      highContrast,
      initialized: true,
    };

    setSettings(newSettings);

    // saveToLocalStorage<LocalSettings>('settings', settings);

    // const htmlEl = document.querySelector('html');

    // if (!htmlEl) {
    //   throw new Error('Document is undefined');
    // }

    // if (darkTheme) {
    //   htmlEl.classList.add('dark');
    // } else {
    //   htmlEl.classList.remove('dark');
    // }
  };

  const toggleHighContrast = () => {
    const { hardMode, darkTheme, highContrast } = settings;
    const newSettings = {
      hardMode,
      darkTheme,
      highContrast: !highContrast,
      initialized: true,
    };

    setSettings(newSettings);
  };

  return {
    settings,
    toggleHardMode,
    toggleDarkTheme,
    toggleHighContrast,
    message,
  };
};

type Settings = ReturnType<typeof useSettingsData>;

const SettingsContext = createContext<Settings | null>(null);

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const contextValue = useSettingsData();

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };

export const useSettings = () => {
  const settingsCtx = useContext(SettingsContext);
  if (!settingsCtx) {
    throw new Error('Settings context does not exist');
  }
  const {
    settings,
    toggleHardMode,
    toggleDarkTheme,
    toggleHighContrast,
    message,
  } = settingsCtx;

  return {
    settings,
    toggleHardMode,
    toggleDarkTheme,
    toggleHighContrast,
    message,
  };
};
