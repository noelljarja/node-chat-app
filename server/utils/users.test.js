const expect = require('expect');
const { Users } = require('./Users');
describe('Users', function () {
    var users;
    beforeEach(function () {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node'
            },
            {
                id: '2',
                name: 'Jen',
                room: 'React'
            },

            {
                id: '3',
                name: 'Julie',
                room: 'Node'
            }]
    })
    it('should remove a user', function () {
        userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    })
    it('should not remove a user', function () {
        userId = '99';
        var user = users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    })
    it('should find  a user', function () {
        var user = users.getUser('2');
        expect(user.id).toBe('2');
    })
    it('should not find a user', function () {
        var user = users.getUser('4');
        expect(user).toNotExist();
    })

    it('should add new user', function () {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Noel',
            room: 'Office Fans'
        }
        var resUsers = users.addUsers(user.id, user.name, user.room)
        expect(users.users).toEqual([user]);
    });
    it('should return names for node course', function () {
        var userList = users.getUserList('Node');

        expect(userList).toEqual(['Mike', 'Julie']);

    })
})