import React from "react";
import { createRoot } from "react-dom/client";
import { IntlProvider } from 'react-intl';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

import LoginPage from "./components/LoginPage";

const getBrowserLanguage = () => {
    const language = navigator.language || navigator.userLanguage;
    return language.split('-')[0];
};
const language = getBrowserLanguage();

const getLocaleData = (lang) => {
    switch (lang) {
      case 'es':
        return { locale: 'es-ES', messages: localeEsMessages };
      default:
        return { locale: 'en-US', messages: localeEnMessages };
    }
};

const { locale, messages } = getLocaleData(language);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <IntlProvider locale={locale} messages={messages}>
        <LoginPage/>
    </IntlProvider>
);