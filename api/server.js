const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session'); //1- install express-session and bring it on

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

//an HTTP cookie (web cookie, browser cookie) is a small piece of data that a server sends to the user's web browser.
const sessionConfig = {
  name: 'monkey',
  secret: 'keep it secret, keep it safe, keep it long', //don't put it outside of source control (like we are doing here) => .env/
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false //needs to be true in production, only do this over https
  },
  httpOnly: true, //to prevent cross-site scripting (XSS) attacks, HttpOnly cookies are inaccessible to JavaScript's Document.cookie API; they are only sent to the server. For example, cookies that persist server-side sessions don't need to be available to JavaScript, and the HttpOnly flag should be set.
  resave: false, //don't recreate the session if nothing has changed
  saveOnInitialized: false //if there are no changes, don't save anything unless something changed
};
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig)); //2-use express-session middleware

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
