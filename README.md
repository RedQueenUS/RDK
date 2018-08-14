# Red Queen Rune Development Kit (RDK) v1.0

A growing framework based on [React](https://reactjs.org/) and [Redux](https://redux.js.org/).

## Notes

Things get started in `src/index.js`. Ultimately, this file pulls in `src/index.css` and imports the `Rune` component.

The `Rune` component sets whether the Rune should load in `landscape` or `portrait` mode, and then engages the `Routes` defined in `src/routes/index.js`. The `Routes` control which components load, based on which "page" the user is attempting to view. Since most `Runes` should be a Single Page App (SPA), usually the only reason to change this file is to replace which React Component the default `Route` loads out of the box.

## 1.1 Component Structure

Components are made up of several parts. They include:

- Export (`index.js`)
- Stateless Component (In a file ending with: `*.js`)
- Styling (In a file ending with: `*.css`)
- Container (In a file ending with: `*Container.js`)
- Actions (In a file ending with: `*Reducer.js`)
- Reducers (In a file ending with: `*Reducer.js`)

To keep code organized and easy to read, these pieces are broken down into specific files.

For example, with a componant named `MyComponent`, you can expect the following structure:

### Component Directory

    src/components/MyComponent/

### Default Export

    src/components/MyComponent/index.js

For easy importing, this file aliases the default export for the component. In most cases, this is the `default` export from `MyComponentContainer.js`

### Stateless Function

    src/components/MyComponent/MyComponent.js

This file should contain a stateless function, consisting primarily of JSX.

### Styling

    src/components/MyComponent/MyComponent.css

### Container

    src/components/MyComponent/MyComponentContainer.js

This file connects the stateless component with the Redux Store. It will consist of: a `mapStateToProps(state, ownProps)` function and a `mapDispatchToProps(dispatch)` function. These functions are both connected to Redux through a call to `connect(mapStateToProps, mapDispatchToProps)(statelessComponent)`.

### Reducer & Actions

    src/components/MyComponent/MyComponentReducer.js

#### More Traditional React/Redux Conventions

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

// Action Dispatcher
export function onCreateShape(shapeType) {
  return {
    type: CREATE_CANVAS_SHAPE,
    data: shapeType
  };
}

// Action Dispatcher
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
import React { Component } from "react";
import { connect } from "redux";

// Import Action Dispatchers
import {onCreateShape, onCreateImage} from "./MyComponentActions";

// Define class to contain React Component, and extend base Component class
class MyComponentToolbar extends Component{
  
  // Components require a render() function, which has access to: this.props.
  // this.props is supplied action dispatchers, by the connect() call at the bottom of this file.
  render() {
    // Deconstruct the action dispatchers from this.props;
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
export default connect(mapStateToProps, {
  onCreateShape,
  onCreateImage
})(MyComponentToolbar);
```

Take note how a single `Action` Dispatcher (`onCreateShape`) is reused to create two different types of shapes. Also observe that there is only one `Reducer` Task and it's used to add both shapes and images to the imaginary canvas.

In this way, the defined `Actions` focus on what the user is trying to do (create a new thing) and the `Reducers` focus on how to update the Redux State to reflect what the user is trying to accomplish (adding a new thing to the canvasContents array).

#### Rune React/Redux Conventions

To simplify the things new Runecrafters need to master before they can get started, we've created what we believe to be some simplified conventions.

When creating a Rune, Runecrafters should identify User Interaction Events (UIE) they would like their Rune to support. A UIE consists of a UI element (noun) and event (verb). As a matter of style, these events are usually named after HTML counterparts, start with the word "on", and are followed by a description of the event that occurred.

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
- UI Event Dispatcher: `onChangeBuildForumlaText`
- UI Event Handler: `handleChangeBuildForumlaText`

When a user's focus leaves the `buildFormulaText`:

- UI Event Type Constant: `LOSE_FOCUS_BUILD_FORMULA_TEXT`
- UI Event Dispatcher: `onLoseFocusBuildFormulaText`
- UI Event Handler: `handleLoseFocusBuildFormulaText`

When a user clicks the `computeButton`:

- UI Event Type Constant: `CLICK_COMPUTE_BUTTON`
- UI Event Dispatcher: `onClickComputeButton`
- UI Event Handler: `handleClickComputeButton`

Fortunately, these conventions map to established Redux principles:

- UI Event Type Constants are the value supplied to the `action.type` property required on every Redux event.
- UI Event Dispatchers are the functions typically exported from a Redux `actions` library, and should return an object with at least a `type` property.
- UI Event Handlers are the Redux reducer functions a Redux developer is already familiar with.

#### Example UIE Implementation

Here's a React Component that's very similiar to the one in the previous example:

NOTE: This is a simplified implementation, so it includes the `Stateless Component` and the `Export` both in `index.js` instead of breaking them into 2 files. This is perfectly acceptable if you prefer this method.

```jsx
/**
  Simple React Component
    src/components/MyComponent/index.js
*/

// Import React and Redux dependencies
import React { Component } from "react";
import { connect } from "redux";

// Import Action Dispatchers
import {
    onClickCreateSquareButton,
    onClickCreateCircleButton,
    onClickCreateImageButton
} from "./MyComponentActions";

// Define class to contain React Component, and extend base Component class
class MyComponentToolbar extends Component{
  
  // Components require a render() function, which has access to: this.props.
  // this.props is supplied action dispatchers, by the connect() call at the bottom of this file.
  render() {
    // Deconstruct the action dispatchers from this.props;
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

Notice that instead of a single `onCreateShape` Action Dispatcher, there are now two dedicated Dispatchers: one for creating a square (`onClickCreateSquare`), and a different one for creating a circle (`onClickCreateCircle`). Also, instead of the `Action` Dispatchers explaining what the user is trying to do, now they explain what the User actually did: click a specific thing.

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

// onFunction (Redux Action Dispatcher)
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

// onFunction (Redux Action Dispatcher)
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

// onFunction (Redux Action Dispatcher)
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

// Export main reducer function
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

This convention simplifies tracing a User Behavior through the application, ensuring any one User Interaction will dispatch a predictable `Action` and it can be expected to trigger a predictable `Reducer`. Further, since these functions are so tightly coupled and similarly named, we recommend placing the `Event Type`, `onFunction`, and `handleFunction` in the `*Reducers.js` file, adjacent to one another. This ensures that if a developer changes one, they will likely notice the other two and be able to keep them all in sync.

Finally, while React has implemented things such as the Context API, and Redux is often more power than might be necessary, this approach reduces learning barriers for new developers, by teaching a single consistent way for handling both local and global scopes, without having to learn multiple techniques and the nuanced situations when to use each. Meanwhile, experienced developers and highly complex Runes are encouraged to employ whatever patterns and conventions are comfortable and efficient.

## 1.2 Your Code Goes Here

    src/
There's a suggested structure for your files, but you do you at your own peril. If you do it your way and it works, please pat yourself on the back, give yourself a belly rub, and then consider sharing it with the community!

## 1.2.1 Suggested `src/` Structure

### Images And Other Stuff

    src/assets/
Your project is going to have images, they probably go here. If for some reason they don't go here, they might go in the `public/` folder that sits next to `src/`. If that's confusing, do whatever feels comfortable.

### The Room Where It Happens

    src/components/
React Components go here. Most of your code will go here. Etch your Runes upon this land and make Magic for all to see! (Please always use Magic resposibly.)

### Component Hookup

    src/reducers/
Components that use Reducers need to be added to the `index.js` file in this folder, to get connected to the Redux store.

### Rune Pages

    src/routes/
Yes, we know the folder is named `routes`. Yes, we agree `pages` would be a better name. But that's not its name. Its name is `routes`.

### Data

    src/store/
When your Rune starts, it will probably need to have some values initialized and already seeded on the Redux Store. That happens in here.

### Friendly Conveniences

    src/utils/
I dream of a day when someone can `npm install rqrdk` and incorporate pieces of the RDK in other projects. This folder contains what might some day become that dream. 

### Master Styles

    src/index.css
At the time of this writing, you probably don't need to mess with this file, unless you're super awesome and know why you'd want to mess with this file. Being super awesome does have its perks.

### Scaffolding

    src/index.js
Unless words like `middleware`, `saga`, or `thunk` mean something to you, this file probably isn't very interesting.

### Themeing

    src/Rune.css
This is a great place to make your Rune pretty. We highly suggest you make it pretty because you're worth it.

### Kickstart the Whole Shebang

    src/Rune.js
This is where you configure `portrait` or `landscape` mode. (Update the `className` attribute on line `9`.) Otherwise, this is essentially the root of your project, but it immediately kicks off the Routes (Read: "Pages") located in the `src/routes/` folder, so you probably don't want to mess around much with this one.

    src/RuneContainer.js
The word "Container" is essentially an indicator that something is connected to the Redux Store. Everything ___can___ be connected, anything ___could___ be connected, not everything ___will___ be connected. This file connects the Rune to the Redux Store, which is initialized in `src/store/`.

## 1.3 FYI and Friendly Reminders

## 1.3.1 Rune Package

    /package.json
Make sure to update these values:

- `name`
- `description`
- `author`
- `version`
- `keywords`

## 1.3.2 Play Nice With Mobile

    /public/manifest.json
Make sure to update these values:

- `name`
- `short_name`

## 1.3.3 Metas, Title, Scripts & Styles

`public/index.html`
Make sure to update these values:

- `meta` : `apple-mobile-web-app-title`
- `meta` : `application-name`
- `title`
- add `<link>` and `<script>` tags where appropriate
