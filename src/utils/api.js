import {RUNE_ID} from "../Rune";

const API_URL = `https://api.redqueen.us/v1`;
const makeGetRuneSlatesUrl = () => {return `${API_URL}/slates/${RUNE_ID}`;};
const makeGetEventsUrl = (slateId, eventName) => {return `${API_URL}/events/${slateId}/${eventName}`;};
const makeGetSlateUrl = (slateId) => {return `${API_URL}/slate/${slateId}`;};
const makePostEventUrl = () => {return `${API_URL}/event`;};
const makeGetUserSessionUrl = (userId) => {return `${API_URL}/session/${RUNE_ID}/${userId}`;};
const makePostUserSessionUrl = (userId) => {return `${API_URL}/session/${RUNE_ID}/${userId}`;};
const makePostSlateUrl = () => {return `${API_URL}/slate`;};
const makeGetUsernameUrl = (userId) => {return `${API_URL}/user/${userId}/username`;};

export function fetchAllRuneSlatesAsJson() {
    return fetch(makeGetRuneSlatesUrl()).then((results) => {
        return results.json();
    });
};

export function fetchBuildSlateAsJson(slateId) {
    return fetch(makeGetSlateUrl(slateId)).then((results) => {
        return results.json();
    });
}

export async function addSlateComment(slateId, ownerId, message) {
    return getUsernameFromUserId(ownerId).then(({username}) => {
        return postEvent({
            name: "COMMENT",
            slateId,
            ownerId,
            value: JSON.stringify({"content": message, "authorName": username})
        });
    });
};

export function getSlateComments(slateId) {
    return fetch(makeGetEventsUrl(slateId, "COMMENT")).then((results) => {
        return results.json();
    });
};

export function postEvent(eventData) {
    const {name, slateId, ownerId, value} = eventData;

    const data = {
        runeId: RUNE_ID,
        eventName: name,
        slateId,
        ownerId,
        value: value || "",
        isMostRecent: true
    };

    const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(data)
    };

    return fetch(makePostEventUrl(), fetchConfig).then((results) => {
        return results.json();
    });
};

export function getUserSession(userId) {
    return fetch(makeGetUserSessionUrl(userId)).then((results) => {
        return results.json();
    }).catch(() => {return {}});
};

export function postUserSession(userId, session) {
    const data = {
        runeId: RUNE_ID,
        ownerId: userId,
        data: JSON.stringify(session)
    };

    const fetchConfig = {
        method: 'PUT',
        body: JSON.stringify(data)
    };

    return fetch(makePostUserSessionUrl(userId), fetchConfig).then((results) => {
        return results.json();
    });
};

export function postNewSlate(ownerId, data) {
    let preparedData = "";
    try {
        preparedData = (JSON.parse(data)) ? data : JSON.stringify(data);
    } catch (e) {
        preparedData = JSON.stringify(data);
    }

    const fetchConfig = {
        method: 'POST',
        body: JSON.stringify({
            runeId: RUNE_ID,
            ownerId,
            data: preparedData,
            isPublic: true
        })
    };

    return fetch(makePostSlateUrl(), fetchConfig).then((results) => {
        return results.json();
    });
}

export function getUsernameFromUserId(userId) {
    return fetch(makeGetUsernameUrl(userId)).then((results) => {
        return results.json();
    }).catch(() => {return {}});
}
