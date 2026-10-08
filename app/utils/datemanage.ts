
// Desc: get a random date
export function getRandomDate() {
    const min = Date.parse("1995-6-16");
    const max = Date.now();
    const randomStamp = Math.floor(Math.random() * (max-min)) + min;
    const randomDate = new Date(randomStamp).toISOString();
    return randomDate;
}
// Desc: convert ISO date string to simple format (YYMMDD)
export function simpleDate(dateStr: string) {
    const simple = dateStr.split('T')[0].split('-').join('').substring(2);
    return simple;
}