/**
* Posts.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
		content: 'string',
		datetime: 'date',
		author: 'string'
  }
};
//sails.config.models.migrate='drop';
sails.config.models.migrate='safe';
