// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUsers = require('../../../app/model/users');

declare module 'egg' {
  interface IModel {
    Users: ReturnType<typeof ExportUsers>;
  }
}
