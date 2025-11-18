import { useState, useEffect } from 'react';

const getInitialTheme = () => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
        return localStorage.getItem('theme');
    }
    
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
};

const useTheme = () => {
   
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;

        
        if (theme === 'dark') {
            root.classList.add('dark');
            root.setAttribute('data-theme', 'dark'); 
        } else {
            root.classList.remove('dark');
            root.setAttribute('data-theme', 'light');
        }
        
        
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    return { theme, toggleTheme };
};

export default useTheme;