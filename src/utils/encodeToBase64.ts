export const encodeToBase64 = (
  inputString: string
): string => {
  return Buffer.from(inputString, "utf8").toString("base64");
};
