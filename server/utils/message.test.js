var expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', function () {
    it('shoud generate correct message object', function (){
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        })
    })
})
describe('generateLocationMessage', function () {
    it('should generate correct location object', function (from, latitude,longitude) {
        var from = 'Jen';
        var latitude = 25;
        var longitude = 28;
        var url = 'https://www.google.com/maps?q=25,28';
        var message = generateLocationMessage(from, latitude, longitude);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,url});
    })
})