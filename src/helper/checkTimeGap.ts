const checkTimeBetween = (databaseTime: string) => {

    const dbDate = new Date(databaseTime);

    const currentTime = Date.now();
    const timeDifference = currentTime - dbDate.getTime();

    const differenceInHours = timeDifference / (1000 * 60 * 60);

    const isWithin24Hours = differenceInHours <= 24;

    return isWithin24Hours

}

export default checkTimeBetween