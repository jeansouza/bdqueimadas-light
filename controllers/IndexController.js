"use strict";

/**
 * Controller of the system index.
 * @class IndexController
 *
 * @author Jean Souza [jean.souza@funcate.org.br]
 *
 * @property {object} memberPath - 'path' module.
 * @property {object} memberFs - 'fs' module.
 * @property {object} memberFs - 'fs' module.
 */
var IndexController = function(app) {

  // 'path' module
  var memberPath = require('path');
  // 'fs' module
  var memberFs = require('fs');
  // Filter model
  var memberFilter = new (require('../models/Filter.js'))();

  /**
   * Processes the request and returns a response.
   * @param {json} request - JSON containing the request data
   * @param {json} response - JSON containing the response data
   *
   * @function indexController
   * @memberof IndexController
   * @inner
   */
  var indexController = function(request, response) {

    // Load of the configuration files to be sent to the front end
    var filterConfigurations = JSON.parse(memberFs.readFileSync(memberPath.join(__dirname, '../configurations/Filter.json'), 'utf8')),
        attributesTableConfigurations = JSON.parse(memberFs.readFileSync(memberPath.join(__dirname, '../configurations/AttributesTable.json'), 'utf8')),
        mapConfigurations = JSON.parse(memberFs.readFileSync(memberPath.join(__dirname, '../configurations/Map.json'), 'utf8')),
        graphicsConfigurations = JSON.parse(memberFs.readFileSync(memberPath.join(__dirname, '../configurations/Graphics.json'), 'utf8')),
        applicationConfigurations = JSON.parse(memberFs.readFileSync(memberPath.join(__dirname, '../configurations/Application.json'), 'utf8')),
        tablesConfigurations = JSON.parse(memberFs.readFileSync(memberPath.join(__dirname, '../configurations/Tables.json'), 'utf8'));

    var configurations = {
      filterConfigurations: filterConfigurations,
      attributesTableConfigurations: attributesTableConfigurations,
      mapConfigurations: mapConfigurations,
      graphicsConfigurations: graphicsConfigurations,
      applicationConfigurations: applicationConfigurations,
      firesDateFormat: tablesConfigurations.Fires.DateFormat
    };

    memberFilter.getCountries(function(err, result) {
      if(err) return console.error(err);

      memberFilter.getBiomes(function(err, resultBiomes) {
        if(err) return console.error(err);

        // Response parameters
        var params = {
          countries: result,
          biomes: resultBiomes,
          configurations: configurations,
        };

        // Response (page rendering)
        response.render('index', params);
      });
    });
  };

  return indexController;
};

module.exports = IndexController;
