function producer(subscreiber) {
    setTimeout(function () {
        subscreiber.next(1);
    }, 1000);
    subscreiber.next(2);
    setTimeout(function () {
        subscreiber.next(3);
    }, 2000);
}
var myObserver = {
    next: function (value) { return console.log('Next Value: ', value); },
    error: function (err) { return console.error('Error: ', err); },
    complete: function () { return console.log('COMPLETE'); }
};
producer(myObserver);
