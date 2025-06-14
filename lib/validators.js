export const EMAIL_REGEX_VALIDATION =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PHONE_REGEX_VALIDATION =
  /^\+?[0-9]{1,4}?[-.\s]?(\(?\d{1,5}\)?)[-.\s]?\d{1,5}[-.\s]?\d{1,9}$/;
export const ZIP_CODE_REGEX_VALIDATION = /^[A-Za-z0-9][A-Za-z0-9\s\-]{2,10}$/;
export const PASSWORD_REGEX_VALIDATION =
  /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
