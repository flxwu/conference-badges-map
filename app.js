import '@babel/polyfill';
import debug from 'debug';
debug('conference-badges-map:server');
import http from 'http';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
// import cookieParser from 'cookie-parser';
import logger from 'morgan';
import AWS from 'aws-sdk';

import badgeRouter from './routes/badge';

const app = express();
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb', parameterLimit: 1000000}));
// app.use(cookieParser()); Cookies not needed yet
app.use(express.static(path.join(__dirname, 'frontend/dist')));

AWS.config.update({ region: 'eu-west-1'});
const rekognition = new AWS.Rekognition();

// Top-level middleware
app.use((req, res, next) => {
  req.debug = debug;
  next();
});

app.use('/api/badge', badgeRouter(rekognition));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**
 * Initialize HTTP Server
 */

const port = 5000;
app.set('port', port);
const server = http.createServer(app);

server.listen(port);
server.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
  case 'EACCES':
    console.error(`Port ${port} requires elevated privileges`); // eslint-disable-line no-console
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(`Port ${port} is already in use`); // eslint-disable-line no-console
    process.exit(1);
    break;
  default:
    throw error;
  }
});
server.on('listening', () => debug(`Listening on port ${port}`));
