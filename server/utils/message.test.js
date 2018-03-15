var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some Message';
    var message = generateMessage(from, text);
    expect(typeof(message.createdAt)).toBe('number');
    expect(message.from).toBe('Jen');
    expect(message.text).toBe('Some Message');

    expect(message).toMatchObject({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object.', () => {
    let from = 'Testman';
    let lat = 51.5007;
    let long = 0.1246;
    let url = 'https://www.google.com/maps?q=51.5007,0.1246';
    var message = generateLocationMessage(from, lat, long);
    expect(message.url).toBe(url);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, url});
  });
});
