"use strict";
// // Projekt Namen einlesen und ausgeben
const myprompt = require('prompt-sync')({ sigint: true });
const Namen = [];
while (true) {
    var vorname = myprompt('Geben Sie den Vorname Ein: ');
    if (vorname !== '') {
        Namen.push(vorname);
        console.log(Namen);
    }
    else if (vorname === '') {
        console.log('Eingegebne Namen');
        console.log(Namen);
        break;
    }
}
// Ergänzung: Viele Namen einlesen, in einem Array speichern (Push)
//              wenn kein weiterer name eingegeben wird 
//              => Ausgabe des Array und Ende des Programms
// const prompt = require('prompt-sync')({ sigint: true });
// // Function to read names and store them in an array
// function readNames() {
//   const names = [];
//   while (true) {
//     const firstName = prompt('Enter the first name (or press Enter to finish): ');
//     if (firstName !== '') {
//       names.push(firstName);
//     } else {
//       break;
//     }
//   }
//   return names;
// }
// // Function to display the list of names
// function displayNames(names) {
//   console.log('Entered names:');
//   console.log(names);
// }
// // Main function to execute the script
// function main() {
//   const names = readNames();
//   displayNames(names);
// }
// // Call the main function to start the script
// main();
