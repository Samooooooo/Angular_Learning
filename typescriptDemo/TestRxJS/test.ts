function producer(subscreiber: any) {
  setTimeout(() => {
    subscreiber.next(1);
  }, 1000);

  subscreiber.next(2);

  setTimeout(() => {
    subscreiber.next(3);
  }, 2000);
}
const myObserver = {
  next: (value: any) => console.log('Next Value: ', value),
  error: (err: any) => console.error('Error: ', err),
  complete: () => console.log('COMPLETE')
}

producer(myObserver);