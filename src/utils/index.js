export const getUnixTimeStamp = (dateVal) => {
    return Math.floor(new Date(dateVal).getTime() / 1000);
  };