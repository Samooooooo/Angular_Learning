// Projekt Namen einlesen und ausgeben
const prompt = require('prompt-sync')({ sigint: true })
const Namen = [];
while (true) {
    vorname = prompt('Geben Sie den Vorname Ein: ')
    if (vorname !== '') {
        Namen.push(vorname)
        console.log(Namen)
    }
    else if (vorname === '') {
        console.log('Eingegebne Namen')
        console.log(Namen)
        break
    }
}
// Ergänzung: Viele Namen einlesen, in einem Array speichern (Push)
//              wenn kein weiterer name eingegeben wird 
//              => Ausgabe des Array und Ende des Programms
