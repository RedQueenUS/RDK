# Red Queen Rune Development Kit (RDK) v1.0

A growing framework based on [React](https://reactjs.org/) and [Redux](https://redux.js.org/).

## Notes

Things get started in `src/index.js`. Ultimately, this file pulls in `src/index.css` and imports the `Rune` component.


### How Are Components Structured?

Components are made up of several parts. They include:

- Export (`index.js`)
- Stateless Component (In a file ending with: `*.js`)
- Styling (In a file ending with: `*.css`)
- Container (In a file ending with: `*Container.js`)
- Actions (In a file ending with: `*Reducer.js`)
- Reducers (In a file ending with: `*Reducer.js`)

To keep code organized and easy to read, these pieces are broken down into specific files.

For example, with a componant named `MyComponent`, you can expect the following structure:

#### Component Directory

    src/components/MyComponent/

#### Default Export

    src/components/MyComponent/index.js

For easy importing, this file aliases the default export for the component. In most cases, this is the `default` export from `MyComponentContainer.js`

#### Stateless Function

    src/components/MyComponent/MyComponent.js

This file should contain a stateless function, consisting primarily of JSX.

#### Styling

    src/components/MyComponent/MyComponent.css

#### Container

    src/components/MyComponent/MyComponentContainer.js

This file connects the stateless component with the redux store. It will consist of a `mapStateToProps(state, ownProps)` function and a `mapDispatchToProps(dispatch)` function. These functions are both connected to redux via a call to `connect(MSTP, MDTP)(statelessComponent)`.

#### Reducer & Actions

    src/components/MyComponent/MyComponentReducer.js

While Rune Developers are encouraged to use whatever conventions are comfortable to them, the RDK attempts to make building Runes easier for novice developers, by introducing some non-standard conventions. One place this is most obvious in the RDK convention for `Reducers` and `Actions`.

In other React/Redux implementations, `Actions` tend to relate to user behavior, and `Reducers` tend to opperate independently, relative to how they impact the Redux store. For example, toolbar buttons that add Shapes to a Canvas might call these `Action` dispatchers, each of which dispatches an `Action` of type `CREATE_CANVAS_SHAPE`:

    onCreateShape("circle")
    onCreateShape("square")
    onCreateShape("triangle")

Meanwhile, the Canvas component might contain a `Reducer` which is responsible for loading the Redux Store with whatever should be visible on the Canvas. That `Reducer` function might be named `handleCanvasContents()`, it could be responsible for adding or removing Shapes (or anything else) to the Canvas, and it might process every `CREATE_SHAPE` `Action`, and possibly others such as `CREATE_CANVAS_IMAGE`.

However, we recommend approaching Rune development a little differently. When creating a Rune, look for UI elements which which a user is expected to interact, and list each type of interaction a user should be able to perform. Each unique pair of UI element and User Interaction should be given a unique `Action` dispatcher (called `onFunctions`), a dedicated `Action` type (`ACTION_AS_NOUN_WITH_VERB`) and a unique `Reducer` (called `handlerFunctions`).

##### (Simple) Example 1

For example, a `MyButton` UI button, which is intended to be clicked, might call the function: `onMyButtonClicked()` which dispatches an `Action` of type `MY_BUTTON_CLICKED`, and triggers the `Reducer`: `handleMyButtonClicked()`. Notice that the difference between these two functions is their prefix `on` and `handle`. This convention, while not necessarily maximally efficient, simplifies tracing a User Behavior through the application, ensuring any one interaction calls a predictable `Action` dispatcher, which dispatches an `Action` with a predictable type, and it can be expected to trigger a predictable `Reducer`. Further, since these functions are so tightly coupled and similarly named, we recommend that the `onFunction`, `handleFunction` and `Action` type constant, all be placed in the `*Reducers.js` file, adjacent to one another.

##### (Advanced) Example 2

Revisiting the Shapes and Canvas example, the three toolbar buttons would result in 3 `onFunctions`, 3 `Actions`, and 3 `Reducers`.

- `onFunctions`

        onCreateCircleToolbarButtonClicked
        onCreateSquareToolbarButtonClicked
        onCreateTriangleToolbarButtonClicked

- Action Types:

        CREATE_CIRCLE_TOOLBAR_BUTTON_CLICKED
        CREATE_SQUARE_TOOLBAR_BUTTON_CLICKED
        CREATE_TRIANGLE_TOOLBAR_BUTTON_CLICKED

- `handleFunctions`

        handleCreateCircleToolbarButtonClicked
        handleCreateSquareToolbarButtonClicked
        handleCreateTriangleToolbarButtonClicked

Hopefully it will be obvious that one of these sets might be implemented thusly:

The UI element defiend by this JSX

    <button onClick={onCreateCircleToolbarButtonClicked}>Create Circle</button>

Calls this `Action` Dispatcher

    onCreateCircleToolbarButtonClicked()

Which dispatches an `Action` of Type

    CREATE_CIRCLE_TOOLBAR_BUTTON_CLICKED

Which triggers this `Reducer` `handleFunction`:

    handleCreateCircleToolbarButtonClicked()

### Why We Did This

There are several reasons for this convention. First, grouping the `Action` dispatcher, `Action` type constant,and the `Reducer` function close together ensures that should one of them need to have their names changed, the corresponding pieces are easy to find and resynchrnize. Further, the consistent naming convention will ease development and integration of community-supported components. Additionally, since all of the files related to a UI compnent live in a compartmentalized domain-driven folder structure, components are likely to be self-contained and easily dragged from one project to another.

Finally, while React has implemented things such as the Context API, and Redux is often more power than might be necessary, this approach reduces learning barriers for new developers, by teaching a single consistent way for handling both local and global scopes, without having to learn two techniques, and the nuanced situations when to use each. Meanwhile, experienced developers and highly complex Runes are encouraged to employ whatever patterns and conventions are comfortable and efficient.

### Files to customize (besides `/src`):

- `package.json`
  - `name`
  - `description`
  - `author`
  - `version`
  - `keywords`

- `public/manifest.json`
  - `name`
  - `short_name`

- `public/index.html`
  - `meta` : `apple-mobile-web-app-title`
  - `meta` : `application-name`
  - `title`
  - add `<link>` and `<script>` tags where appropriate
