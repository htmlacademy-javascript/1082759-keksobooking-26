const isValid = (min, max, cut) => {
    const start = 0;
    const isNumber = (num) => !isNaN(parseFloat(num)) && isFinite(num);
    
    const result = (
        min < start 
        || max <= start
        || min >= max
        || cut < start
        || !isNumber(min)
        || !isNumber(max)
        || !isNumber(cut)
        || !Number.isInteger(cut)
    ) ? false : true;
    
    return result;
}

const randomGenerator = (min, max, cut = 0) => {
    
    const result = isValid(min, max, cut) 
    ? Number((Math.random() * (max - min + 1) + min).toFixed(cut))
    : console.warn('Недопустимые значения');
    
    return result
};

console.log(randomGenerator(1, 2)); 
console.log(randomGenerator(1.1, 1.2, 3));
