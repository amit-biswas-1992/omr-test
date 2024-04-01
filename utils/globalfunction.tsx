// @ts-ignore
import Cookies from "js-cookie";

export default function JwtTokenDecoder(): any {
  try {
    if (
      Cookies.get("accessToken") === "undefined" ||
      Cookies.get("accessToken") === "" ||
      Cookies.get("accessToken") === null
    )
      return false;
    else return true;
  } catch (e) {
    return false;
  }
}

export function addLog(data: any): any {
  try {
    let body = data;
  } catch (e) {
    return null;
  }
}

const numberMap: { [key: string]: string } = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

export const convertEnglishToBanglaNumber = (inputStr: string): string => {
  
  return inputStr.replace(/\d/g, (match) => numberMap[match]);
  
};

