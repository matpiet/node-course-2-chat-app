var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some Message';
    var message = generateMessage(from, text);

    expect(message.from).toBeA('string');
    expect(message.text).toBeA('string');
    expect(message.createdAt).toBeA('nummber');

    expect(message).toInclude({from, text});

  });
})
