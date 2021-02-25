import { useContext } from 'react';
import { CountdownContext } from '../hooks/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export default function Countdown() {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountDown,
    resetCountDown
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button 
          disabled
          className={styles.countdownButton}>
            Ciclo Finalizado
        </button>
      ) : (
        <>
          { isActive ? (
            <button 
              type="button"
              onClick={resetCountDown}
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                Cancelar
            </button>
          ) : (
            <button 
              type="button"
              onClick={startCountDown}
              className={styles.countdownButton}>
                Começar
            </button>
          )}
        </>
      ) }

    </div>
  )
}