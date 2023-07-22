import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { googleFormsToJson } from "react-google-forms-hooks";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGoogleFormAsJson = async () => {
  // can use both full and shortened form url
  const formUrl = process.env.NEXT_APP_GOOGLE_FORM_URL as string;
  const result = await googleFormsToJson(formUrl?.toString());
  console.log(formUrl, "formUrl");
  console.log(result.fields, "result.fields");
  // return result.fields;
};
