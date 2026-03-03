const SCRIPT_TAG_REGEX =
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const EVENT_HANDLER_REGEX =
  /\son[a-z]+\s*=\s*("[^"]*"|'[^']*')/gi;
const JAVASCRIPT_PROTOCOL_REGEX = /javascript:/gi;

export const sanitizeHtml = (rawHtml: string): string => {
  if (!rawHtml) return "";

  return rawHtml
    .replace(SCRIPT_TAG_REGEX, "")
    .replace(EVENT_HANDLER_REGEX, "")
    .replace(JAVASCRIPT_PROTOCOL_REGEX, "");
};
