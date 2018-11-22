var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});


describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Deb';
    var latitude = '40.5199693';
    var longitude = '-74.6583193';
    var url = 'https://www.google.com/maps/q=' + latitude + ',' + longitude;
    var message = generateLocationMessage(from, latitude,longitude);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});

  });
});
