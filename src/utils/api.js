import {RUNE_ID} from "../";

const API_URL = `https://api.redqueen.us/v1/slate`;
const getApiEndpoint = (ID) => (`${API_URL}${ID}`);

export function createSlate(newBuild) {
    return fetch(getApiEndpoint(RUNE_ID), {
        method: "POST",
        body: JSON.stringify(newBuild)
    });
}

export function getSlates() {
    return fetch(getApiEndpoint(RUNE_ID)).then((results) => {
        return results.json();
    });
}
