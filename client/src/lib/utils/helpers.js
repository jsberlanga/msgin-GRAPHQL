export default class Helpers {
  static formatDate = date => {
    const now = Date.now();
    const createdDate = new Date(date).getTime();

    const differenceInSeconds = (now - createdDate) / 1000;

    const days = Math.round(differenceInSeconds / 60 / 60 / 24);
    const hours = Math.round(differenceInSeconds / 60 / 60);
    const minutes = Math.round(differenceInSeconds / 60);

    if (differenceInSeconds > 60 * 60 * 24) {
      return `${days > 1 ? `${days} days ago` : "1 day ago"}`;
    }

    if (differenceInSeconds > 60 * 60 && differenceInSeconds < 60 * 60 * 24) {
      return `${hours > 1 ? `${hours} hours ago` : "1 hour ago"}`;
    }

    if (differenceInSeconds > 60 && differenceInSeconds < 3600) {
      return `${minutes > 1 ? `${minutes} minutes ago` : "1 minute ago"}`;
    }
    if (differenceInSeconds < 60) return `just now`;

    return date;
  };

  static shortenText = (string, chars) => {
    return string.length > chars
      ? `${string.slice(0, chars).trim()}...`
      : string;
  };
}
