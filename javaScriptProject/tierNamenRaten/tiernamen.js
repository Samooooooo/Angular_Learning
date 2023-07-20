const prompt = require('prompt-sync')({ sigint: true });

const tierliste = ["Elephant", "Delphin", "Fuchs", "Dachs", "Gans", "Eierlegendewollmilchsau"]

let tiername = RandomName().toUpperCase()

for (i = tiername.length + 7; i > 0; i--) {
    input = prompt('Gib ein Buchstaben ein').toUpperCase()
    let hashedName = tiername.replace(/./gi, '.')
    if (tiername.includes(input)) {
        index = GetCharIndex(input, tiername)
        hashedName = tiername.substring(0, index) + input + tiername.substring(index + 1);
        console.log(hashedName)
    }
}

function RandomName() {
    nameIndex = Math.floor(Math.random() * tierliste.length)
    return tierliste[nameIndex]
}

function GetCharIndex(input, tiername) {
    index = tiername.indexOf(input)
    return index
}
