export const TextFunctions = {
  sliceWords(words: string, slice: number = 24) {
    if (words.length > slice) return words.slice(0, slice) + ' ...';
    else return words.slice(0, slice);
  },
  maskText: (text: string) => {
    const masked = text
      // .slice(text.length , text.length)
      .split('')
      .map((i, index) => (index < 12 && index > 3 ? (i = '*') : i));
    return {
      masked: masked.join(''),
      actual: text,
    };
  },
  maskEmail(email: string, visibleLength = 4) {
    // Regex:
    // (.{4})  -> Capture the first 4 characters (or whatever visibleLength is).
    // (.+?)   -> Capture one or more subsequent characters non-greedily.
    // (@.+)   -> Capture the '@' and everything that follows it (the domain).
    const regex = new RegExp(`(.{${visibleLength}})(.+?)(@.+)`);

    // Replace the second captured group (the rest of the username) with asterisks.
    return email?.replace(regex, (match, visible, rest, domain) => {
      return visible + '*'.repeat(rest.length) + domain;
    });
  },
};
