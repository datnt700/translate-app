import Image from 'next/image';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';

import styles from '../styles.module.scss';

import { FeatureSection } from '@/components/FeatureSection';

interface LanguageOption {
  label: string;
  id: string;
  default: boolean;
  active: boolean;
}
interface inputSectionProps {
  text: string;
  setText: (e) => void;
  handleTranslate: () => void;
  languageOption: LanguageOption[];
  setLanguageOption: (options: LanguageOption[]) => void;
}

export const InputSection = ({
  text,
  setText,
  handleTranslate,
  languageOption,
  setLanguageOption,
}: inputSectionProps) => {
  const [activeList, setActiveList] = useState(false);
  const [count, setCount] = useState('Hello, how are you'.length);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setCount(newText.length);
  };
  const handleLanguage = (lang) => {
    setActiveList(false);

    if (lang.id === languageOption[0].id || lang.id === languageOption[1].id) {
      const updated = languageOption.map((item) =>
        item.id === lang.id
          ? { ...item, active: true }
          : { ...item, active: false }
      );
      setLanguageOption(updated);
    } else {
      const updatedOptions = languageOption.map((item) =>
        item.id === lang.id
          ? { ...item, default: true, active: true }
          : { ...item, default: false, active: false }
      );
      const selectedLang = updatedOptions.find((item) => item.default);
      const reorderedLanguages = selectedLang
        ? [selectedLang, ...updatedOptions.filter((item) => !item.default)]
        : [...updatedOptions];

      setLanguageOption(reorderedLanguages);
    }
  };

  const handleList = () => {
    setActiveList((e) => !e);
  };

  function handleSound() {
    const message = new SpeechSynthesisUtterance(text);
    message.lang =
      (languageOption.find((item) => item.active && !item.default)
        ?.id as string) || 'en';
    speechSynthesis.speak(message);
  }

  function handleCopy() {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className={styles['input-section']}>
      <div className={styles.tabs}>
        <div className={styles.wrapper}>
          <span className={styles.btn}>Detect Language</span>
          <ul className={styles['tab-list']}>
            {languageOption.slice(0, 2).map((lang) => (
              <li key={lang.id}>
                <button
                  onClick={() => handleLanguage(lang)}
                  className={`${styles.tab} ${lang.active && styles.activeTab}`}
                >
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.list}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <div
              className={styles.selected}
              onClick={handleList}
              role="button"
              tabIndex={0}
            >
              <span className={styles.btn}>
                Select More
                {activeList ? (
                  <Icon icon="ri:arrow-down-s-line" />
                ) : (
                  <Icon icon="solar:alt-arrow-up-linear" />
                )}
              </span>
            </div>
            {activeList && (
              <div className={`${styles.menu} ${styles.activeList}`}>
                <ul>
                  {languageOption.slice(2).map((lang) => (
                    <li key={lang.id}>
                      <button onClick={() => handleLanguage(lang)}>
                        {lang.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles['input-text']}>
        <textarea
          className={styles.area}
          onChange={handleChange}
          value={text}
          maxLength={500}
        ></textarea>
        <span className={styles.count}>{count}/500</span>
      </div>
      <div className={styles.features}>
        <FeatureSection handleSound={handleSound} handleCopy={handleCopy} />

        <button onClick={handleTranslate}>
          <Image
            src={'images/Sort_alfa.svg'}
            alt={'img'}
            width={30}
            height={30}
          />
          Translate
        </button>
      </div>
    </div>
  );
};
