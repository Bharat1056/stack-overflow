function formatNumber(number: number) {
  if (number >= 1000000000) {
    // For billions
    return (
      (number / 1000000000)
        .toFixed(number % 1000000000 === 0 ? 0 : 3)
        .replace(/\.000$/, "") + "B"
    );
  } else if (number >= 1000000) {
    // For millions
    return (
      (number / 1000000)
        .toFixed(number % 1000000 === 0 ? 0 : 3)
        .replace(/\.000$/, "") + "M"
    );
  } else if (number >= 1000) {
    // For thousands
    return (
      (number / 1000)
        .toFixed(number % 1000 === 0 ? 0 : 3)
        .replace(/\.000$/, "") + "K"
    );
  }
  return number.toString();
}

export default formatNumber;
