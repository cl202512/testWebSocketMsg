// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApp = require('../../../app/controller/app');
import ExportBase = require('../../../app/controller/base');
import ExportHome = require('../../../app/controller/home');

declare module 'egg' {
  interface IController {
    app: ExportApp;
    base: ExportBase;
    home: ExportHome;
  }
}
