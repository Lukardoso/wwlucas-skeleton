import { useEffect, useState } from "react";

type TranslateSheet = {
    [key: string]: { [key: string]: string }
}

export default function useTranslate(tSheet: TranslateSheet, forceLang?: string) {
    const translateSheet = tSheet;
    const [preferedLang, setPreferedLang] = useState(localStorage.getItem('lang') || navigator.language.substring(0, 2));

    useEffect(() => {
        if (forceLang) {
            setPreferedLang(forceLang);

        } else {
            const urlParams = new URLSearchParams(window.location.search);
            const langParam = urlParams.get('lang');

            if (langParam && langParam !== preferedLang) {
                setPreferedLang(langParam);
            }
        }

    }, [])

    function handlePreferedLang(lang: string) {
        setPreferedLang(() => {
            localStorage.setItem('lang', lang);
            window.location.search = `?lang=${lang}`;
            return lang;
        });
    }

    function translate(text: string): string {

        if (!translateSheet) throw 'No translate sheet.';

        if (!translateSheet[text] || !translateSheet[text][preferedLang]) {
            return text;
        }

        return translateSheet[text][preferedLang];
    }

    return { translate, handlePreferedLang, preferedLang }
}