"use strict";
/**
 * Write the smallest regexp that tests for the following within a string:
 * car and cat
 * pop and prop
 * ferret, ferry, and ferrari
 * Any word ending in ious
 * A whitespace character followed by a period, comma, colon, or semicolon
 * A word longer than six characters
 * A word without the letter e (or E)
 */
// Car and Cat
const carcat = /\bca[rt]\b/gi;
const string1 = "A car was carting with a cat catastrophiser";
console.log(string1.match(carcat));
// Pop and Prop
const popProp = /\bpr?op\b/gi;
const string2 = "When the proppelor went pop I thought it was just a prop";
console.log(string2.match(popProp));
// Ferret, ferry, and ferrari
const ferretFerryFerrari = /\bferr(?:et|y|ari)\b/gi;
const string3 = "The ferrari regularly transported a ferret across the feral ferrule of a ferry";
console.log(string3.match(ferretFerryFerrari));
// ...ious
const ious = /\b\w+ious\b/gi;
const string4 = "Pious and perilous, the pouce pions piously ousted the plious";
console.log(string4.match(ious));
// Whitespace character followed by a period, a comma, a colon, or semicolon
const whitePunct = /\s[.,:;]/gi;
const string5 = " . , : ; a. b, c: d;";
console.log(string5.match(whitePunct));
// Word longer than 6 characters
const long = /\b\w{6,}\b/gi;
const string6 = "Peter piper picked a pack of pickled peppers";
console.log(string6.match(long));
// Word without e
const noE = /\b[^\se]+\b/gi;
const string7 = "This is going to be interesting giraffe rhino";
console.log(string7.match(noE));
