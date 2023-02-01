import { useEffect, useState } from "react";
import { useInterval } from 'usehooks-ts'

function getSecondsFromPrevTime(date: Date) {
  const now = new Date().getTime();
  const milliSecondsDistance = now - date.getTime();
  if (milliSecondsDistance > 0) {
    const val = milliSecondsDistance / 1000;
    return Math.round(val);
  }
  return 0;
}

function getTimeFromSeconds(secs: number) {
  const totalSeconds = Math.ceil(secs);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${hours}:${minutes}:${seconds}`;
}

const getDateFromSeconds = (seconds: number) => {
  return new Date(new Date().setSeconds(seconds));
}

type UseTrackTimeOptions = {
  seconds: number;
  isRunning: boolean;
  resetWhenChanges: any;
}

const useTrackTime = ({ seconds, isRunning: isRunningProp, resetWhenChanges }: UseTrackTimeOptions) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(seconds || 0);
  const [isRunning, setIsRunning] = useState(isRunningProp);

  useInterval(() => {
    setElapsedSeconds((secs) => secs + 1);
  }, isRunning ? 1000 : null)

  useEffect(() => {
    reset(seconds);
  }, resetWhenChanges)

  const reset = (secs?: number) => {
    setElapsedSeconds(secs || 0);
    setIsRunning(true);
  }

  return {
    elapsedTime: elapsedSeconds,
    readableTime: getTimeFromSeconds(elapsedSeconds),
    reset
  }

};

export default useTrackTime;