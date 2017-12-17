/**
 * Base App Controller
 */
var lastAccessed = new Date().getTime(),
    createdAt = new Date(),
    name = 'Controller';
var controller = Object.create();
Object.defineProperty(controller, 'LastAccessed', {
    get: function () {
        return lastAccessed;
    },
    set: function (value) {
        lastAccessed = value;
    }
});

Object.defineProperty(controller, 'Name', {
    get: function () {
        return name;
    },
    set: function (value) {
        name = value;
    }
});

Object.defineProperty(controller, 'CreatedAt', {
    get: function () {
        return createdAt;
    }
});