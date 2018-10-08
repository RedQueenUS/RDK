import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import Rune from "./RuneContainer";
import { initialState } from "./store";

describe("Rune", () => {
    const store = {
        getState: () => {
            return initialState;
        },
        subscribe: jest.fn(),
        dispatch: jest.fn()
    };

    it("Renders without crashing...", () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Rune /></Provider>, div);
    })
})
