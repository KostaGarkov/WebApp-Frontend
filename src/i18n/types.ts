import translations from "../shared/translations.json";

export type Lang = keyof typeof translations;
export type TranslationKey = keyof typeof translations["en"];