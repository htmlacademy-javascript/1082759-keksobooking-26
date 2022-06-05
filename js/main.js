const geoCoordGenerator = (min, max, cut = 0) => {
    const start = 0;
    const isNumber = (num) => !isNaN(parseFloat(num)) && isFinite(num);

    if (min < start 
        || max <= start
        || min >= max
        || cut < start
        || !isNumber(min)
        || !isNumber(max)
        || !isNumber(cut)
        || !Number.isInteger(cut)
    ) {
        console.warn('Недопустимые значения');
        return;
    }

    return Number((Math.random() * (max - min + 1) + min).toFixed(cut));
};

// console.log(geoCoordGenerator(1, 2)); 
// console.log(geoCoordGenerator(1.1, 1.2, 3));