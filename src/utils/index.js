import moment from 'moment';

export const NO_USER_ID = "00000000-0000-0000-0000-000000000000";

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

export function createUIEHandler(type, onFunction, handleFunction) {
    return {
        type,
        onFunction: (payload) => {
            return {
                type,
                payload: onFunction(payload)
            };
        },
        handleFunction
    };
}

export function setSessionData(sessionSlate, hashMap) {
    if (!sessionSlate || !sessionSlate.data) {
        return [];
    }
    const sessionData = JSON.parse(sessionSlate.data);
    const newSessionData = {
        ...sessionData,
        ...hashMap
    };
    const newSessionSlate = {
        ...sessionSlate,
        data: JSON.stringify(newSessionData)
    };
    return newSessionSlate;
}

export const simpleSort = (a, b) => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};
export function getSessionData(sessionSlate, key) {
    if (!sessionSlate || !sessionSlate.data) {
        return [];
    }
    const {data} = sessionSlate;
    const sessionData = JSON.parse(data);
    return sessionData[key];
};

export function unixToDate(obj) {
    const timeStamp = obj.createdAt;
    let date = moment(timeStamp);
    let formattedDate = date.utc().format('MMM DD, YYYY');
    return formattedDate;
}

export function convertTimestampTo(timestamp, pattern = 'MMM DD, YYYY') {
    const date = moment(timestamp);
    return date.utc().format(pattern);
}

export function indexedMapToArray(obj) {
    return Object.keys(obj).map((key) => {
        return obj[key]
    })
};