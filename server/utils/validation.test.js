const expect = require('expect');

var { isRealString } = require('./validation');

describe('isRealString', function () {
    it('shoud reject non string values', function () {
        var res = isRealString(1);
        expect(res).toBe(false);
    })
    it('should reject string with only spaces', function () {
        var res = isRealString('  ');
        expect(res).toBe(false);
    })
    it('should allow string with non space characters', function () {
        var res = isRealString('aa')
        expect(res).toBe(true);
    })

})