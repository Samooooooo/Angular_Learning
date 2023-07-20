const prompt = require('prompt-sync')({ sigint: true });
const tierliste = ["Elephant", "Delphin", "Fuchs", "Dacahs", "Gans", "Eierlegendewollmilchsau"]
let tiername = RandomName().toUpperCase()
let hashedName = tiername.replace(/./gi, '.')
index = []
const alphabeticPattern = /^[A-Za-z]+$/;
for (let i = tiername.length + 7; i > 0; i--) {
    console.log(`Du Hast Noch ${i} Versuch\n`, hashedName, '\n')
    input = prompt('Gib ein Buchstaben ein: ').toUpperCase()
    if (input.length === 1 & input.trim() !== '' & alphabeticPattern.test(input)) {
        if (tiername.includes(input)) {
            index = GetCharIndexs(input, tiername)
            for (x of index) {
                hashedName = hashedName.substring(0, x) + input + hashedName.substring(x + 1);
            }
            i++
        }
        if (!hashedName.includes('.')) {
            console.log('\nRichtige Antwort: ', hashedName, '\nBRAVO TEZE\n')
            break
        }
        else if (i === 1){
            console.log(`\nDein Antwort: ${hashedName}\nRichtige Antwort: ${tiername}\n`)
        }
    }
    else {
        console.log('Falsche Eingabe')
        i++
    }
}
function RandomName() {
    nameIndex = Math.floor(Math.random() * tierliste.length)
    return tierliste[nameIndex]
}
function GetCharIndexs(input, tiername) {
    const index = [];
    for (let i = 0; i < tiername.length; i++) {
        if (tiername[i] === input) {
            index.push(i);
        }
    }
    return index;
}
