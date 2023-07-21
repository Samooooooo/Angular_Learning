"use strict";
const myprompt = require('prompt-sync')({ sigint: true });
let repeat = true;
while (repeat == true) {
    const number = Math.floor(Math.random() * 100);
    for (let i = 6; i > -1; i--) {
        let input = myprompt('Geben Sie einen Zahl Zwichen 1-99 ein: ');
        if (input == number) {
            console.log(`Du Hast Gewonnwn Mit Den Number ${number}`);
            break;
        }
        else if (input < number) {
            console.log('Es ist nedrig');
            console.log(`Du hast noch ${i} Versuch`);
        }
        else {
            console.log('Es ist hoch');
            console.log(`Du hast noch ${i} Versuch`);
        }
        if (i == 0) {
            console.log('Loser');
        }
    }
    const inputRepeat = myprompt('Wieder Spielen: (J für Ja)').toLowerCase();
    if (inputRepeat !== 'j') {
        repeat = false;
    }
}
