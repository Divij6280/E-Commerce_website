import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Set the initial theme to light mode
        document.body.classList.remove('dark-mode');
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
        // Update the body class based on the new mode
        if (darkMode === false) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return React.useContext(ThemeContext);
};
