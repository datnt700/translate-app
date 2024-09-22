import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@iconify/react';

import styles from '../styles.module.scss';

import { FeatureSection } from '@/components/FeatureSection';

interface LanguageOption {
  label: string;
  id: string;
  default: boolean;
  active: boolean;
}
interface ResultSectionProps {
  handleSwap: () => void;
  textResult: string;
  languageOption: LanguageOption[];
  setLanguageOption: (options: LanguageOption[]) => void;
}

export const ResultSection = ({
  textResult,
  handleSwap,
  languageOption,
  setLanguageOption,
}: ResultSectionProps) => {
  const [activeList, setActiveList] = useState(false);

  const handleLanguage = (lang: LanguageOption) => {
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
    const message = new SpeechSynthesisUtterance(textResult);
    message.lang = languageOption.find((item) => item.active && !item.default)
      ?.id as string;
    speechSynthesis.speak(message);
  }

  function handleCopy() {
    navigator.clipboard.writeText(textResult);
  }

  return (
    <div className={styles['input-section']}>
      <div className={styles.tabs}>
        <div className={styles.wrapper}>
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
            <button className={styles.selected} onClick={handleList}>
              <span className={styles.btn}>
                Select More
                {activeList ? (
                  <Icon icon="ri:arrow-down-s-line" />
                ) : (
                  <Icon icon="solar:alt-arrow-up-linear" />
                )}
              </span>
            </button>
            <div
              className={
                activeList ? `${styles.menu} ${styles.activeList}` : styles.menu
              }
            >
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
          </div>
        </div>

        <button className={styles.icon} onClick={handleSwap}>
          <Image
            src={'images/Horizontal_top_left_main.svg'}
            alt={'img'}
            width={20}
            height={20}
          />
        </button>
      </div>
      <div className={styles.line}></div>
      <div className={styles['input-text']}>
        <textarea className={styles.area} defaultValue={textResult}></textarea>
      </div>
      <div className={styles.features}>
        <FeatureSection handleSound={handleSound} handleCopy={handleCopy} />
      </div>
    </div>
  );
};
