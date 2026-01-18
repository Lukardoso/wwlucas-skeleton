import { useState } from "react";

type tSheet = {
    [key: string]: { [key: string]: string }
}

export default function useTranslate(tSheet: tSheet) {
    const [preferedLang, setPreferedLang] = useState(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');

        return langParam ?? navigator.language.substring(0, 2);
    });

    function handlePreferedLang(lang: string) {
        setPreferedLang(() => {
            window.location.search = `?lang=${lang}`;
            return lang;
        });
    }

    function translate(text: string): string {

        if (!tSheet) throw 'No translate sheet.';

        if (!tSheet[text] || !tSheet[text][preferedLang]) {
            return text;
        }

        return tSheet[text][preferedLang];
    }

    return { translate, handlePreferedLang, preferedLang }
}