// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('@babel/register')({
  presets: [ '@babel/env' ],
  plugins: ['@babel/plugin-transform-async-to-generator']
});

// Import the rest of our application.
module.exports = require('./app.js');