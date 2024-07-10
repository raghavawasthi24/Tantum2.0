export const convertToSeconds = (timespan: string): number => {
  const regex = /(\d+)([smhd])/;
  const matches = regex.exec(timespan);

  if (!matches) {
    throw new Error("Invalid timespan format");
  }

  const value = parseInt(matches[1]);
  const unit = matches[2];

  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 24 * 60 * 60;
    default:
      throw new Error("Invalid timespan unit");
  }
};
