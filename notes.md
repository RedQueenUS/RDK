# Things to accomplish

[x] Add header to the top of the App as welcome to the Runecrafter
[x] Build the Link list into a Navbar so it follows from screen to screen 

Create Reusable components IE Card / Button / Table / Input ( Go through other Runes and pick out common Component occurances)
    [x] Card
    [x] Button
    [] Table
    [] Input
    [x] Navbar

Build out components
    [x] TaskList
    [] Fetch Examples
    [x] Documentation
    [] Asset Gallery

Create Documentation for 
    [x] Card
    [] Project itself 

[] Wire up Apollo Server w/ RESTDataSource 


rafc - import React and arrow function component
rcc - import React and class based component

# Documentation notes 

## Technologies used
    - React 
    - ApolloClient (& ApolloServer incoming)
    - React Router 
    - GraphQL
    - Styled Components

## How to start
    - npm install
    - npm start 

## Folder Structure 

* src/apollo:
In this part of our directory we create our resolvers (the functions that manage the local data of our app using queries and mutations)

* src/apollo/resolvers:
Here you can see we have a Mutations folder and index.js. The index is used to export any of the mutation resolvers created in the resolvers directory

* src/components: 
In here you will put all of your components for your project. We suggest placing components in a Domain architecture to allow grouping of parent and children components and styles (if you're using SASS or CSS

* src/components/RQUI:
Here we have our small library of reusable components built by RQ and it's community. Check out our documentation for examples of each component

* src/routes 
Here you can declare all your routes you'll need for your project. We use React Router to render a ```DefaultComponent``` to our Main Component via render prop. 


## Explain the app piece by piece

