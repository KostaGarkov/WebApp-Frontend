// Глобални настройки за целия React проект

export const APP_CONFIG = {
    // API настройки
    apiBaseUrl: "http://localhost:5016/api",
    factorGridHeight: 0.8,

    // UI настройки
    defaultLanguage: "bg",
    debugMode: true,

    // Грид настройки
    grid: {
        defaultHeight: 600,
        defaultWidth: "90%",
        minHeight: 300,
        maxHeight: 1200,
        headerHeight: 48,
        rowHeight: 48
    },

    // Layout настройки
    layout: {
        headerHeight: 70,
        pagePadding: 20
    }
};
