export function uniqueArrayElements(array) {
    return Object.keys(array.reduce((aggr, item) => {
        return {...aggr, [item]: true};
    }, {}));
}

// 60*60*24*1000 = 86400000
export const TwentyFourHours = 86400000;

export function hasExpired(creationTime) {
    return ((creationTime + TwentyFourHours) > Date.now());
}
