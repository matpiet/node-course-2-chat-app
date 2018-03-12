var expect = require('expect');

var {generateMessage} = require('./message');

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
})
