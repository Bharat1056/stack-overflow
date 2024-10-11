function timeDifference(postTime: string) {
  const dbDate = new Date(postTime);
  const currentTime = Date.now();
  const timeDiff = currentTime - dbDate.getTime();

  const seconds = timeDiff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const months = days / 30;
  const years = days / 365;

  if (years >= 1) {
    const roundedYears = Math.floor(years);
    const remainingMonths = months - roundedYears * 12;
    if (remainingMonths >= 6) {
      return `${roundedYears}.5 years ago`;
    }
    return `${roundedYears} years ago`;
  }

  if (months >= 1) {
    const roundedMonths = Math.floor(months);
    const remainingDays = days - roundedMonths * 30;
    if (remainingDays >= 15) {
      return `${roundedMonths}.5 months ago`;
    }
    return `${roundedMonths} months ago`;
  }

  if (days >= 1) {
    const roundedDays = Math.floor(days);
    const remainingHours = hours - roundedDays * 24;
    if (remainingHours >= 12) {
      return `${roundedDays}.5 days ago`;
    }
    return `${roundedDays} days ago`;
  }

  if (hours >= 1) {
    const roundedHours = Math.floor(hours);
    const remainingMinutes = minutes - roundedHours * 60;
    if (remainingMinutes >= 30) {
      return `${roundedHours}.5 hours ago`;
    }
    return `${roundedHours} hours ago`;
  }

  if (minutes >= 1) {
    const roundedMinutes = Math.floor(minutes);
    return `${roundedMinutes} minutes ago`;
  }

  return `Just now`;
}

export default timeDifference
