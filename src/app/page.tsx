'use client';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import styles from './home.module.scss';

import { handleTranslate } from '@/app/api/handletranslate';
import { InputSection } from '@/components/InputSection';
import { ResultSection } from '@/components/ResultSection';

export default function Home() {
  const languageOption = useMemo(
    () => [
      { label: 'English', id: 'en', default: true, active: false },
      { label: 'French', id: 'fr', default: true, active: false },
      { label: 'Spanish', id: 'es', default: false, active: false },
      { label: 'German', id: 'de', default: false, active: false },
      { label: 'Portuguese', id: 'pt', default: false, active: false },
    ],
    []
  );

  const [text, setText] = useState('Hello, how are you');
  const [language, setLanguage] = useState(
    languageOption.map((item) =>
      item.id === 'en' ? { ...item, active: true } : { ...item, active: false }
    )
  );
  const [secondLanguage, setSecondLanguage] = useState(
    languageOption.map((item) =>
      item.id === 'fr' ? { ...item, active: true } : { ...item, active: false }
    )
  );
  const [textResult, setTextResult] = useState('Bonjour, comment allez-vous');
  const handleSwap = () => {
    setLanguage(secondLanguage);
    setSecondLanguage(language);
    setText(textResult);
    setTextResult(text);
  };
  const translateText = async () => {
    const translateLanguage = language.find((item) => item.active)?.id;
    const resultLanguage = secondLanguage.find((item) => item.active)?.id;
    const languages = `${translateLanguage}|${resultLanguage}`;

    const payload = { languages, text };
    try {
      const response = await axios.post('/api/handletranslate', payload);
      const newText = response.data.responseData.translatedText.replace(
        /"/g,
        ''
      );
      setTextResult(newText);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleTranslate = () => {
    translateText();
  };
  return (
    <div className={styles.contain}>
      <div className={styles.img}>
        <Image
          src={'/images/hero_img.jpg'}
          alt={'logo'}
          width={200}
          height={100}
          className={styles['background-image']}
        />
        <Image
          src={'/images/logo.svg'}
          alt={'logo'}
          width={200}
          height={100}
          className={styles.logo}
        />
      </div>
      <div className={styles.content}>
        <InputSection
          text={text}
          setText={setText}
          handleTranslate={handleTranslate}
          languageOption={language}
          setLanguageOption={setLanguage}
        />
        <ResultSection
          textResult={textResult}
          languageOption={secondLanguage}
          setLanguageOption={setSecondLanguage}
          handleSwap={handleSwap}
        />
      </div>
    </div>
  );
}
