const getFormattedTimeValue = (value: number) => {
  return value < 10 ? `0${value}` : value;
}

export function getTimeFromSeconds(secs: number) {
  const totalSeconds = Math.ceil(secs);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${getFormattedTimeValue(hours)}:${getFormattedTimeValue(minutes)}:${getFormattedTimeValue(seconds)}`;
}