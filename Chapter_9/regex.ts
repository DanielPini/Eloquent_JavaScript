// Using Regular Expressions

// To make a Regular Expression, either use the new RegExp("<string>") keyword or insert a string between two forward slashes: /<string>/;
let re1: RegExp = new RegExp("abc");
let re2: RegExp = /abc/;

// .test() method returns a boolean returning if the string contains a match of the pattern
// <RegExp>.test("<string to be tested>");
console.log(re1.test("abcde")); // true
console.log(re2.test("cba")); // false

// Match any. To match any of a set, put that set between square brackets: /[0123456789]/;
// Within square brackets, a hyphen represents a range: /[0-9]/;
console.log(/[0123456789]/.test("in 1989")); // true
console.log(/[0-9]/.test("in 1989")); // true

/**
 * \d Any digit character
 * \D Any non-digit character
 * \w Any alphanumeric character ("word character")
 * \W Any non-alphanumeric character
 * \s Any whitespace character (space, tab, newline, etc.)
 * \S Any nonwhitespace character
 * . Any character except for newline (this loses special meaning when between square brackets! It just becomes a full stop. The same is true for other special characters like the plus sign: +)
 * [^] inverts a set of characters (select any character except for the ones in the set: /[^0-9]/;)
 * ^ start of input
 * $ end of input
 * /x+?/ One or more occurrences, non-greedy
 * /a|b|c/ Any one of several patterns
 *
 * for use with an appended u for unicode:
 * \p{L} Any letter
 * \P{L} Any nonletter
 * \p{N} Any numeric character
 * \p{P} Any punctuation character
 * \p{Script=Hangul} Any character from the given script
 */

// You can match a time and date format like: 01-30-2003 15:20
let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("01-30-2003 15:20")); // true

let nonBinary = /[^01]/;

console.log(nonBinary.test("1100100010100110")); // false
console.log(nonBinary.test("0111010112101001")); // true

console.log(/\p{L}/u.test("α")); // true
console.log(/\p{L}/u.test("!")); // false
console.log(/\p{Script=Greek}/u.test("α")); // true
console.log(/\p{Script=Arabic}/u.test("α")); // false

// To search for a repeating pattern use the + sign ( \d+ searches for one or more digits)
// A * symbol matches zero or more times ??? Still not sure how this is useful...
// A question mark makes part of the pattern optional. It may occur zero or one time.
// In the following, the u is allowed to occur, but will match when missing as well.
let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour")); // true
console.log(neighbor.test("neighbor")); // true

// Braces with a digit inside {<number>} indicate that the pattern should occur a precise number of times.
// Specify a range with two digits separated by a comma: {2,4} or open ended ranges with one digit and a comma {5,}
let dateTime2 = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime2.test("1-30-2003 8:45")); // true

// To use the * or + symbol on more than one element, you must use parentheses to enclose an element
// In the following, the first + applies only to the "o" characters in boo and hoo, and the third applies to the group of the word hoo
// The i at the end makes the Regular Expression case insensitive
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo")); // true

// .exec() method returns null if no match found, and an object with information otherwise
// such an object has an index property that tells us where in the string the successful match begins
let match = /\d+/.exec("one two 100"); // ["100"]
console.log(match?.index); // 8
// String values have a match method that behaves similarly
console.log("one two 100".match(/\d+/)); // ["100"]

// When the regular expression contains subexpressions grouped with parentheses the text that matched those groups will also show up in the array
let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'")); // ["'hello'", "hello"];
// When a group doesn't end up being matched at all (such as when followed by a "?"), its position in the otput array will hold undefined
// When a group is matched multiple times, only the last match ends up in the array
console.log(/bad(ly)?/.exec("bad")); // ["bad", undefined]
console.log(/(\d)+/.exec("123")); // ["123", "3"]

// If you want to use parentheses purely for grouping, without having them show up in the array of matches, you can put ?: after the opening parenthesis
console.log(/(?:na)+/.exec("banana")); // ["nana"]
