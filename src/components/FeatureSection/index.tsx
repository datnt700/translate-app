import Image from 'next/image';

import styles from './styles.module.scss';

interface FeatureProps {
  handleSound: () => void;
  handleCopy: () => void;
}

export const FeatureSection = ({ handleSound, handleCopy }: FeatureProps) => {
  return (
    <div className={styles.wrapper}>
      <button onClick={handleSound} className={styles.item}>
        <Image
          src={'images/sound_max_fill.svg'}
          alt={'img'}
          width={20}
          height={20}
        />
      </button>
      <button onClick={handleCopy} className={styles.item}>
        <Image src={'images/Copy.svg'} alt={'img'} width={20} height={20} />
      </button>
    </div>
  );
};
