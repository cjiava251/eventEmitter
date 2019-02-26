const EventEmitter=require('events');
const myEmitter =new EventEmitter();
myEmitter.on('hello', function(a) {
    console.log(a);
});
myEmitter.on('how are you?', function(a) {
    console.log(a);
});
myEmitter.on('what are you doing?', function(a) {
    console.log(a);
});
myEmitter.emit('hello','hello');
myEmitter.emit('how are you?','i am fine');
myEmitter.emit('what are you doing?', 'i am walking');

