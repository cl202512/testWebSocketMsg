 'use strict';
 
exports.static = true;

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.cache = {
  enable: true,
  package: 'egg-cache',
};

exports.jwt = {
  enable: true,
  package: "egg-jwt"
};