# Where to Stream

## Description:
Where to Stream is an application that allows users to input any movie or tv show and access links where the movie or show can be streamed online. Where to Stream users can also add or remove movies & shows to their very own Watchlist. Finally, users can also add a personal review of any movie or show on their Watchlist.

## Installation Instructions:
Download the repository from Github. Install the dependencies (using npm -i or node install). Then, follow the steps below to configure your db connection:

1. Copy the contents of .env.EXAMPLE into a new file .env
2. Fill in the user name and password for your database

Next, follow these steps to set up your database:
1. Navigate to the DB in your terminal ("cd db")
2. Type "mysql source schema.sql" into your terminal
3. Type "quit" into your terminal

Then, follow these steps to seed the database (optional):
1. Enter "npm run seed" in your terminal

Finally, to start the server enter "npm start" into your terminal.

You're all set!

## Built With:
- JavaScript
- Node.js
- MySQL2
- MySQL Workbench
- Sequelize
- Connect Session Store using Sequelize
- Express.js
- express-session
- bcryps.js
- dotenv
- Handlebars
- file-system
- HTML
- CSS


## Deployed Links:
* [See Live Site](https://where-to-stream.herokuapp.com/)
* [Link to GitHub Repo](https://github.com/egraham96/Where-To-Stream)

## Preview of Working Site:
![Screenshot of Deployed Application](./public/images/ScreenshotofDeployedApplication.PNG)
![Screenshot of Deployed Application](./public/images/ScreenshotofDeployedApplication2.PNG)
![Screenshot of Deployed Application](./public/images/ScreenshotofDeployedApplication3.PNG)

## How to Contribute:
If you'd like to contribute to this project please send an email to eeg4@uw.edu.

## How to Test the Application:
Please see installation instructions above. 

## License:

![Github licence](http://img.shields.io/badge/license-MIT-blue.svg)

