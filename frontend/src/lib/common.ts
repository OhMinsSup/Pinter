export const escapeForUrl = (text: string): string => {
    return text
      .replace(
        /[^0-9a-zA-Zㄱ-힣\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf ]/g,
        ' ',
      )
      .replace(/ /g, '-')
      .replace(/--+/g, '-');
  };