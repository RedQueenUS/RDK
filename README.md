# Red Queen Rune Development Kit (RDK) v1.1

A growing framework based on [React](https://reactjs.org/) and [Redux](https://redux.js.org/).

## Getting Started

Congratulations! You're ready to begin building your Rune!

If you're an experienced web developer, the first thing you'll want to do is checkout this repository. Then navigate your command line to where you placed the files and run:

```sh
npm install
npm start
```

If you're new to web development, the following section contains some notes and explanations for what's in this package and how to work with it.

## Resources

### JavaScript Fundamentals

- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)

### React / Redux

- [React: A popular JavaScript Framework by Facebook](https://github.com/facebook/react)
- [Redux: A predictable State Container for JavaScript apps](https://github.com/reduxjs/redux)
- [Official React bindings for Redux](https://github.com/reduxjs/react-redux)
- [List of training projects to assist with learning React](https://github.com/ReactTraining)

## 1. Notes

Things get started in `src/index.js`. Ultimately, this file pulls in `src/index.css` and imports the `Rune` component.

The `Rune` component sets whether the Rune should load in `landscape` or `portrait` mode, and then engages the `Routes` defined in `src/routes/index.js`. The `Routes` control which components load, based on which view path the user is attempting to view. Since most Runes should be a Single Page App (SPA), they can usually get by with just a single route, and the only reason to change this file is to replace which React Component the default `Route` loads out of the box. While it is possible to make Runes with multiple pages, Runes run wrapped inside an iframe, which negates many of the benefits, since URL paths are never exposed to the user, or available for bookmarking.

## 1.1 Component Structure

Components are made up of several parts. They include:

- Entry Point (`index.js`)
- Functional Stateless Component (In a file ending with: `*.js`) [JavaScript function that accepts props and returns JSX](https://reactjs.org/docs/components-and-props.html)
- Styling (In a file ending with: `*.css`)
- Container (In a file ending with: `*Container.js`)
- Actions (In a file ending with: `*Reducer.js`)
- Reducers (In a file ending with: `*Reducer.js`)

To keep code organized and easy to read, we recommend breaking these pieces into specific files.

For example, with a componant named `MyComponent`, you can expect this folder `src/components/MyComponent` and it will contain the following files:

| Filename | Purpose | Details |
| --- | --- | --- |
| `index.js` | Default Entry Point | For easy importing, this file aliases the default export for the component. In most cases, this is the `default` export from `MyComponentContainer.js` |
| `MyComponent.js` | Stateless Component | This file should contain a stateless function, consisting primarily of JSX. |
| `MyComponent.css` | Styling | |
| `MyComponentContainer.js` | Redux Container | Connects the stateless function with the Redux Store. `connect(mapStateToProps, mapDispatchToProps)(statelessFunction)` |
| `MyComponentReducer.js` | Reducer & Actions | |

## 1.2 Rune Component Conventions

### 1.2.1 More Traditional React/Redux Conventions

While Rune Developers are encouraged to use whatever conventions are comfortable to them, the RDK attempts to make building Runes easier for novice developers, by introducing some non-standard conventions. One place this is most obvious is the RDK's convention for Redux `Reducers` and `Actions`.

In other Redux implementations, `Actions` tend to relate to user behavior:

```jsx
/**
  Actions
  
  Typically located in:
    src/actions/index.js
  or
    src/actions/MyComponentActions.js
  or
    src/components/MyComponent/MyComponentActions.js
*/

// Type Constants
export const CREATE_CANVAS_SHAPE = "CREATE_CANVAS_SHAPE";
export const CREATE_CANVAS_IMAGE = "CREATE_CANVAS_IMAGE";

// Action Creator
export function onCreateShape(shapeType) {
  return {
    type: CREATE_CANVAS_SHAPE,
    data: shapeType
  };
}

// Action Creator
export function onCreateImage(imageUrl) {
  return {
    type: CREATE_CANVAS_SHAPE,
    data: imageUrl
  };
}
```

And `Reducers` tend to opperate independently, relative to how they impact the Redux store:

```jsx
/**
  Reducers
  
  Typically located in:
    src/reducers/index.js
  or
    src/reducers/MyComponentReducer.js
  or
    src/components/MyComponent/MyComponentReducer.js
*/

// Import Imaginary Canvas Object Classes
import { CanvasShape, CanvasImage } from "../models/Canvas";

// Import Action Type constant
import { CREATE_CANVAS_SHAPE, CREATE_CANVAS_IMAGE } from "./MyComponentActions";

// Define reducer task functions
function handleAddCanvasContent(state, objectType, objectDetails) {
  const objectClass = (objectType === "SHAPE") ? CanvasShape : CanvasImage;
  const newObject = new objectClass(objectDetails);
  
  return {
    ...state,
    canvasContents: [
      ...state.canvasContents,
      newObject
    ]
  };
}

// Export main reducer function
export const reducer = (state = {}, action) => {
  switch(action.type) {
    case CREATE_CANVAS_SHAPE:
      return handleAddCanvasContent(state, "SHAPE", action.data);
    case CREATE_CANVAS_IMAGE:
      return handleAddCanvasContent(state, "IMAGE", action.data);
    default:
      return state;
  }
};
```

Together, they might be used in a component, like this:

```jsx
/**
  Components & Sub-components
  
  Typically located in:
    src/components/MyComponent/MyComponentToolbar.js

  (And then imported and used inside:
    src/components/MyComponent/index.js
  or
    src/components/MyComponent/MyComponent.js
  )
*/

// Import React and Redux dependencies
import React, { Component } from "react";
import { connect } from "redux";

// Import Action Creators
import {onCreateShape, onCreateImage} from "./MyComponentActions";

// Define class to contain React Component, and extend base Component class
class MyComponentToolbar extends Component{
  
  // Components require a render() function, which has access to: this.props.
  // this.props is supplied action creators, by the connect() call at the bottom of this file.
  render() {
    // Destructure the action creators from this.props;
    const {onCreateShape, onCreateImage} = this.props;

    // Return the content to be rendered.
    return (
      <div>
        <button onClick={onCreateShape("square")}>Create Square</button>
        <button onClick={onCreateShape("circle")}>Create Circle</button>
        <button onClick={onCreateImage("myFavoriteImage.jpg")}>Create Image</button>
      </div>
    );
  }
}

// Simple example implementation
//   mapStateToProps is a fundemental piece of Redux's implementation pattern.
function mapStateToProps(state = {}, ownProps = {}) {
  return state;
}

// Export the React Component
//   The first parameter is the mapStateToProps function.
//   The second parameter is an object that supplies Action Creators for dispatching.
//   Finally, connect((state, ownProps) => {}, {}) actually returns a function, which is then passed the `MyComponentToolbar` component as a parameter.
//
//   Connect creates a wrapped MyComponentToolbar component that passes the Redux Store into mapStateToProps as the current State of the application, and feeds the returned value into the component, as props. Additionally, it supplements the supplied props with dispatch-ready Actions, which can be fired by onClick handlers inside your component.
export default connect(mapStateToProps, {
  onCreateShape,
  onCreateImage
})(MyComponentToolbar);
```

Take note how a single `Action` Creator (`onCreateShape`) is reused to create two different types of shapes. Also observe that there is only one `Reducer` Task and it's used to add both shapes and images to the imaginary canvas.

In this way, the defined `Actions` focus on what the user is trying to do (create a new thing) and the `Reducers` focus on how to update the Redux State to reflect what the user is trying to accomplish (adding a new thing to the canvasContents array).

### 1.2.2 Rune React/Redux Conventions

To simplify the things new Runecrafters need to master before they can get started, we've created what we believe to be some simplified conventions.

These nouns and verbs then get combined to create names for the 3 pieecs that make up a UIE definition:

- UI Event Type Constant (aka "Event Type"): VERB_NOUN
- UI Event Dispatcher (aka "onFunction"): onVerbNoun
- UI Event Handler (aka "handleFunction"): handleVerbNoun

For example, here's a list created for a Rune with a button and a text input field:

- Noun: `<input id="buildFormula" type="text" />` (buildFormulaText)
  - Verb: `onChange`
  - Verb: `onLoseFocus`
- Noun: `<button>Compute</button>` (computeButton)
  - Verb: `onClick`

When a user changes the value of the `buildFormulaText`:

- UI Event Type Constant: `CHANGE_BUILD_FORMULA_TEXT`
- UI Event Dispatcher: `onChangeBuildFormulaText`
- UI Event Handler: `handleChangeBuildFormulaText`

When a user's focus leaves the `buildFormulaText`:

- UI Event Type Constant: `LOSE_FOCUS_BUILD_FORMULA_TEXT`
- UI Event Dispatcher: `onLoseFocusBuildFormulaText`
- UI Event Handler: `handleLoseFocusBuildFormulaText`

When a user clicks the `computeButton`:

- UI Event Type Constant: `CLICK_COMPUTE_BUTTON`
- UI Event Dispatcher: `onClickComputeButton`
- UI Event Handler: `handleClickComputeButton`

Fortunately, these conventions map to established Redux principles:

- UI Event Type Constants are the values supplied to the `action.type` property required on every Redux event.
- UI Event Dispatchers are the functions typically exported from a Redux `actions` library, and should return an object with at least a `type` property.
- UI Event Handlers are the Redux reducer functions a Redux developer is already familiar with.

Following this convention simplifies tracing a User Behavior through the application, ensuring any one User Interaction will dispatch a predictable `Action` and it can be expected to trigger a predictable `Reducer`.

When creating a Rune, Runecrafters should identify User Interaction Events (UIE) they would like their Rune to support. A UIE consists of a UI element (noun) and event (verb). As a matter of style, these events are usually named after HTML counterparts, start with the word "on", and are followed by a description of the event that occurred.

### 1.2.3 Example UIE Implementation

Here's a React Component that's very similiar to the one in the previous example:

NOTE: This is a simplified implementation, so it includes the `Stateless Component` and the `Export` both in `index.js` instead of breaking them into 2 files. This is perfectly acceptable if you prefer this method.

```jsx
/**
  Simple React Component
    src/components/MyComponent/index.js
*/

// Import React and Redux dependencies
import React, { Component } from "react";
import { connect } from "redux";

// Import Action Creators
import {
    onClickCreateSquareButton,
    onClickCreateCircleButton,
    onClickCreateImageButton
} from "./MyComponentReducer";

// Define class to contain React Component, and extend base Component class
class MyComponentToolbar extends Component{
  
  // Components require a render() function, which has access to: this.props.
  // this.props is supplied action creators, by the connect() call at the bottom of this file.
  render() {
    // Destructure the action creators from this.props;
    const {
        onClickCreateSquareButton,
        onClickCreateCircleButton,
        onClickCreateImageButton
    } = this.props;

    // Return the content to be rendered.
    return (
      <div>
        <button onClick={onClickCreateSquareButton}>Create Square</button>
        <button onClick={onClickCreateCircleButton}>Create Circle</button>
        <button onClick={onClickCreateImageButton("myFavoriteImage.jpg")}>Create Image</button>
      </div>
    );
  }
}

// Simple example implementation
//   mapStateToProps is a fundemental piece of Redux's implementation pattern.
function mapStateToProps(state = {}, ownProps = {}) {
  return state;
}

// Export the React Component
export default connect(mapStateToProps, {
    onClickCreateSquareButton,
    onClickCreateCircleButton,
    onClickCreateImageButton
})(MyComponentToolbar);
```

Notice that instead of a single `onCreateShape` Action Creator, there are now two dedicated Creators: one for creating a square (`onClickCreateSquareButton`), and a different one for creating a circle (`onClickCreateCircleButton`). Also, instead of the `Action` Creators explaining what the user is trying to do, now they explain what the User actually did: click a specific thing.

To make this work, this component would be coupled with comparable `Actions` and `Reducers` combined in a single `MyComponentReducer.js` file, as shown below:

```jsx
/**
  Actions & Reducers
    src/components/MyComponent/MyComponentReducer.js
*/

// Import Imaginary Canvas Object Classes
import { CanvasShape, CanvasImage } from "../models/Canvas";

/**
 * User Interaction Events
 *    UI Event Type Constant (Redux Action Type)
 *    UI Event Dispatcher (Redux Action)
 *    UI Event Handler (Redux Reducer)
 */

/* **** **** ****
    When the user clicks the Create Square Button:
 */

// Event Type (Redux Action Type)
export const CLICK_CREATE_SQUARE_BUTTON = "CLICK_CREATE_SQUARE_BUTTON";

// onFunction (Redux Action Creator)
export function onClickCreateSquareButton() {
  return {
    type: CLICK_CREATE_SQUARE_BUTTON
  };
}

// handleFunction (Redux Reducer)
function handleClickCreateSquareButton(state, action) {
  return {
    ...state,
    canvasContents: [
      ...state.canvasContents,
      new CanvasShape("square")
    ]
  };
}


/* **** **** ****
    When the user clicks the Create Circle Button:
 */

// Event Type (Redux Action Type)
export const CLICK_CREATE_CIRCLE_BUTTON = "CLICK_CREATE_CIRCLE_BUTTON";

// onFunction (Redux Action Creator)
export function onClickCreateCircleButton() {
  return {
    type: CLICK_CREATE_CIRCLE_BUTTON
  };
}

// handleFunction (Redux Reducer)
function handleClickCreateCircleButton(state, action) {
  return {
    ...state,
    canvasContents: [
      ...state.canvasContents,
      new CanvasShape("circle");
    ]
  };
}


/* **** **** ****
    When the user clicks the Create Image Button:
 */

// Event Type (Redux Action Type)
export const CLICK_CREATE_IMAGE_BUTTON = "CLICK_CREATE_IMAGE_BUTTON";

// onFunction (Redux Action Creator)
export function onClickCreateImageButton(imageUrl) {
  return {
    type: CLICK_CREATE_IMAGE_BUTTON,
    data: {
      imageUrl
    }
  };
}

// handleFunction (Redux Reducer)
function handleClickCreateImageButton(state, action) {
  return {
    ...state,
    canvasContents: [
      ...state.canvasContents,
      new CanvasImage(action.imageUrl)
    ]
  };
}

// Export main Redux Reducer function
export const reducer = (state = {}, action) => {
  switch(action.type) {
    case CLICK_CREATE_SQUARE_BUTTON:
      return handleClickCreateSquareButton(state, action);
    case CLICK_CREATE_CIRCLE_BUTTON:
      return handleClickCreateCircleButton(state, action);
    case CLICK_CREATE_IMAGE_BUTTON:
      return handleClickCreateImageButton(state, action);
    default:
      return state;
  }
};
```

Since these functions are so tightly coupled and similarly named, we recommend placing the `Event Type`, `onFunction`, and `handleFunction` in the `*Reducers.js` file, adjacent to one another. This ensures that if a developer changes one, they will likely notice the other two and be able to keep them all in sync.

Finally, while React has implemented things such as the Context API, and Redux is often more power than might be necessary, this approach reduces learning barriers for new developers, by teaching a single consistent way for handling both local and global scopes, without having to learn multiple techniques and the nuanced situations when to use each. Meanwhile, experienced developers and highly complex Runes are encouraged to employ whatever patterns and conventions are comfortable and efficient.

## 1.3 Your Code Goes Here

We suggest the following structure for your files, but you do you (at your own peril). If you do it your way and it works, please pat yourself on the back, give yourself a belly rub, and then consider sharing it with the community!

Here's how we break down our `src/` folder:

| Folder | Purpose | Details |
| --- | --- | --- |
| `assets/` | Images And Other Stuff | Your project is going to have images, they probably go here. If for some reason they don't go here, they might go in the `public/` folder that sits next to `src/`. If that's confusing, do whatever feels comfortable. |
| `components/` | The Room Where It Happens | `React Components` go here. Most of your code will go here. Etch your Runes upon this land and make Magic for all to see! (Please use Magic responsibly.) |
| `reducers/` | Reducer Management | `React Components` that use `Reducers` need to be added to the `index.js` file in this folder, to get connected to the `Redux Store`. |
| `routes/` | Rune Pages | This is the Rune's `Routing Table`. `Routes` map `URL Paths` to specific `React Components`, ending with the `Page` suffix. |
| `store/` | Redux Store | When your Rune starts, it will probably need to have some values initialized and already seeded in the `Redux Store`. That happens in here. |
| `utils/` | Friendly Conveniences | I dream of a day when someone can `npm install rqrdk` and incorporate pieces of the RDK in other projects. This is not that day. However, this folder contains what might some day become that dream.  |
| `index.css` | Master Styles | At the time of this writing, you probably don't need to mess with this file, unless you're super awesome and know why you'd want to mess with this file. Being super awesome does have its perks. |
| `index.js` | Scaffolding | Unless words like `middleware`, `saga`, or `thunk` mean something to you, this file probably isn't very interesting. |
| `Rune.css` | Themeing | This is a great place to make your Rune pretty. We highly suggest you make it pretty. You're worth it. |
| `Rune.js` | Root Component | This is where you configure `portrait` or `landscape` mode. (Update the `className` attribute on line `9`.) Otherwise, while this is essentially the root of your project, it immediately kicks off the `Routing Table` located in the `src/routes/` folder, so you probably don't want to mess around much with this one. |
| `RuneContainer.js` | Connect Redux | The word "Container" is essentially an indicator that something is connected to the `Redux Store`. Everything ___can___ be connected, anything ___could___ be connected, not everything ___will___ be connected. This file connects the Rune to the Redux Store, which is initialized in `src/store/`. |

## 1.4 FYI and Friendly Reminders

### 1.4.1 Rune Package

    /package.json
Make sure to update these values:

- `name`
- `description`
- `author`
- `version`
- `keywords`

### 1.4.2 Play Nice With Mobile

    /public/manifest.json
Make sure to update these values:

- `name`
- `short_name`

### 1.4.3 Metas, Title, Scripts & Styles

`public/index.html`
Make sure to update these values:

- `meta` : `apple-mobile-web-app-title`
- `meta` : `application-name`
- `title`
- add `<link>` and `<script>` tags where appropriate
