const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);


const studentsRouter = require('./students/students-router.js');
const adminsRouter = require('./admins/admins-router.js');
const teachersRouter = require('./teachers/teachers-router.js');
const parentsRouter = require('./parents/parents-router.js');
const classesRouter = require('./classes/classes-router.js');
const dbConnection = require('./data/dbConfig');

const server = express();


const sessionConfig = {
  name: 'school', // would name the cookie sid by default
  secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe',
  cookie: {
    maxAge: 1000 * 60 * 60, // in milliseconds
    secure: false, // true means only send cookie over https
    httpOnly: true, // true means JS has no access to the cookie
  },
  resave: false,
  saveUninitialized: true, // GDPR compliance
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: 'knexsessions',
    sidfieldname: 'sessionid',
    createtable: true,
    clearInterval: 1000 * 60 * 30, // clean out expired session data
  }),
};


server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/students', studentsRouter);
server.use('/api/parents', parentsRouter);
server.use('/api/admins', adminsRouter);
server.use('/api/teachers', teachersRouter);
server.use('/api/classes', classesRouter);

module.exports = server;
