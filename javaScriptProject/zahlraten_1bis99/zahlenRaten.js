const prompt = require('prompt-sync')({ sigint: true })
repeat = true
while (repeat == true) {
    number = Math.floor(Math.random() * 100)
    for (let i = 6; i > -1; i--) {
        input = prompt('Geben Sie einen Zahl Zwichen 1-99 ein: ')
        if (input == number) {
            console.log(`Du Hast Gewonnwn Mit Den Number ${number}`)
            break
        }
        else if (input < number) {
            console.log('Es ist nedrig')
            console.log(`Du hast noch ${i} Versuch`)
        }
        else {
            console.log('Es ist hoch')
            console.log(`Du hast noch ${i} Versuch`)
        }
        if (i == 0) {
            console.log('Loser')
        }
    }
    inputRepeat = prompt('Wieder Spielen: (J für Ja)').toLowerCase()
    if (inputRepeat !== 'j') {
        repeat = false
    }
    else{
        repeat = true
    }
}