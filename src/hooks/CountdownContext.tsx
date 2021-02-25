import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFinished: boolean;
  startCountDown: () => void;
  resetCountDown: () => void;
}

interface CountdownProviderProps {
  children : ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({children} : CountdownProviderProps) {
  const {startNewChallenge} = useContext(ChallengesContext);
  
  const [time, setTime] = useState(.05 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes =  Math.floor(time / 60);
  const seconds = time % 60;

  const startCountDown = useCallback(() => {
    setIsActive(true);
  }, []);
  
  const resetCountDown = useCallback(() => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(.05 * 60);
  }, []);
  
  useEffect(() => {
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() =>{
        setTime(time -1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);
  
  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      isActive,
      hasFinished,
      startCountDown,
      resetCountDown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}