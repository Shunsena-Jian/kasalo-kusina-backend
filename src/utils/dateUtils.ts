export const getCurrentUnixTimeStamp = (): number => {
    return Math.floor(Date.now() / 1000);
}