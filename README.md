## Runtime Terror CoffeShop App

### Installation Instructions:
#### `npm install`
After installing the dependencies in the main project folder, open a new terminal for the server application.<br/>
Then, in the new terminal do the following commands:
#### `cd mongodb-api-app`
#### `npm install`

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## MongoDB Server App

**Note: the server must be started for the Coffe Shop app to have database access!**

To run the server follow these commands in a separate terminal:
`cd monogodb-api-app`
`npm install`
`npm start`

The server application will now be listening for client connections.

## Overview

#### REPORTS: 
  ##### Contents (final report, user's manual, installation instructions)
  
#### SRC: 
  ##### Contents (assets, components, config, css, views, App.js, index.js, routes.js, serviceWorker.js)
  This folder contains all of the neccessities of running the web application. The assets folder is for storing images for the web pages.<br />

#### COMPONENTS: 
  ##### Contents (Channel, ChannelList, ChatInput, FriendList, Message, Messages, NavBar, NavBarData)
  In the components folder there are ReactJS components for rendering data that isn't page specific.<br/>

#### CSS: 
  ##### Contents (App, ChannelList, Chat, ChatRoom, CreateChatRoom, Home, Login, Messages, NavBar, Profile, Register, Search, SuccessPage, index)
#### VIEWS:
  ##### Contents (About, Chat, ChatRoomPage, CreateChatRoom, Home, Login, Profile, Register, Search, SuccessPage)

#### MONGODB-API-APP: 
  ##### Contents (app, package.json, passport.js, server.js, validateInput.js)
  Contains the necessary files and folders for running the server application.

#### APP:
##### Contents (Controllers, models, routes)
The app folder in side of the server application contains all the neccessary files for running the server.<br/>
In controllers there is a controller for Users, ChatRooms, and FriendRequests.<br/>
Similarly, the models folder houses User, ChatRoom, FriendRequest, and Message models for the database.<br/>
Lastly, the routes for the api include: User, ChatRoom, and Friend routes for accessing the data.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
