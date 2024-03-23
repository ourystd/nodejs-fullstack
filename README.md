# Node.js Fullstack Project

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Stack](#stack)
- [Features](#features)
- [License](#license)
- [Contact](#contact)

## Description

This is a full-stack web application built with Node.js and React. This project is open-source and suggestions are welcome.
It started from educative.io's ["Become a MERN Stack Developer"](https://www.educative.io/path/become-a-mern-stack-developer)  course.
I am trying to improve it as I learn new stuff.


## Installation

To get started with this project, do the following:

1. Clone the repo: `git clone https://github.com/ourystd/nodejs-fullstack.git`
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Make sure to add the environment variables to `.env` file.

### .env

The following environment variables are required to run the server.

```env
#SERVER
PORT=
API_URL=http://localhost:<PORT>

#DB
MONGO_URI=mongodb://127.0.0.1:27017/

# Encryption
SALT=
TOKEN_SECRET_KEY=
CRYPTO_ALGORITHM=
CONFIRMATION_SECRET_KEY=
INITIALIZATION_VECTOR=

#OAUTH2
OAUTH_CLIENT_ID=
OAUTH_CLIENT_SECRET=
OAUTH_REFRESH_TOKEN=

#MAILING
GMAIL_EMAIL=
```

## Usage

After starting the server, open your web browser and navigate to `http://localhost:<PORT>` to view the application.

## Stack

- [NPM](https://www.npmjs.com/) for package management
- [Node.js](https://nodejs.org/en/) & [Express.js](https://expressjs.com/) for server-side development
- [React](https://reactjs.org/) for client-side development
- [MongoDB](https://www.mongodb.com/) for database
- [Nodemon](https://nodemon.io/) and [Mongoose](https://mongoosejs.com/) for development (hot reload)
- [Nodemailer](https://nodemailer.com/), [Google OAuth](https://developers.google.com/identity/protocols/oauth2) and [Google Gmail API] (https://developers.google.com/gmail/api/) for email sending
- [JWT](https://jwt.io/) and [bcrypt](https://www.npmjs.com/package/bcrypt) for encryption and authentication
- [Joi](https://joi.dev/) for data validation

## Features
...

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

If you have any questions or suggestions, feel free to [open an issue](https://github.com/ourystd/nodejs-fullstack/issues), leave a message on [Twitter](https://twitter.com/ourystd), or reach out to me at [ourystd224@gmail.com](mailto:ourystd224@gmail.com).
