'use strict';

const supertest = require('supertest'); 
const test = require('unit.js');
const app = require('../server/server.js');
const assert = require('assert');


var {generateMessage, generateLocationMessage} = require('../server/utils/message.js');

const request = supertest(app);

describe('Tests app', function() {
  it('verifies get', function(done) {
    request.get('/').expect(200).end(function(err, result) {
      test.string(result.text).contains('Congratulations');
      test.value(result).hasHeader('content-type', 'text/html; charset=UTF-8');
      done(err);
    });
  });
});


describe('generateMessage', function(){
  it('should generate correct message object', function()  {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);
    
    assert(typeof message.createdAt == "number" && !isNaN(message.createdAt));
    assert(message.from);
    assert(message.text);
    
    
  });
});


describe('generateLocationMessage', function() {
  it('should generate correct location object', function() {
    var from = 'Deb';
    var latitude = 40.5199693;
    var longitude = -74.6583193;
    var expectedUrl = 'https://www.google.com/maps?q=40.5199693,-74.6583193';
    var message = generateLocationMessage(from, latitude, longitude);
    

    assert(typeof message.createdAt == "number" && !isNaN(message.createdAt));
    assert(message.from);
    assert(message.url);
    assert(message.url == expectedUrl);

    //expect(message.createdAt).toBeA('number');
    //expect(message).toInclude({from, url});
   

  });
});
