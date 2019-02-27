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

myEmitter.on('привет', function() {
    console.log('здравствуй');
});
myEmitter.on('как дела?', function() {
    console.log('все отлично');
});
myEmitter.on('что делаешь?', function() {
    console.log('гуляю');
});
myEmitter.emit('привет');
myEmitter.emit('как дела?');
myEmitter.emit('что делаешь?');