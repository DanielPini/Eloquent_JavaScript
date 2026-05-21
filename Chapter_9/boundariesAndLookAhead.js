"use strict";
// getDate() will also happily extract a date from the string "100-1-30000"
// If we want to enforce that the match must span the whole string, we can add the markers ^ and $
// ^ marks the beginning of the input string and $ marks the end
// Thus /^\d+$/ matches a string consisting entirely of one or more digits, /^!/ matches any string that starts with an exclamation mark, and /x^/ does not match any string
// There is also a \b marker tha matches word boundaries, positions that have a word character on one side and a non-word character on the other
// Look-ahead tests do something similar. They provide a pattern and will make the match fail if the input doesn't match that pattern, but don't actually move the match position forward. They are written between (?= and )
console.log(/a(?=e)/.exec("braeburn")); // ["a"]
// The (?! ) notation expresses a negative look-ahead which matches only if the pattern doesn't match (below is a space after the "a").
console.log(/a(?! )/.exec("a b")); // null
// Choice patterns
// The pipe character "|" denotes a choice between the pattern to its left and the pattern to its right
let animalCount = /\d+ (pig|cow|chicken)s?/;
console.log(animalCount.test("15 pigs")); // true
console.log(animalCount.test("15 pugs")); // false
// The mechanics of matching
// When you use exec() or test(), the regular expression engine looks for a match in your string by trying to match the expression first from the start of the string, then from the second character and so on until it finds a match or reaches the end of a string
// It'll either return the first match that can be found or fail to find any match at all
// To do the actual matching, the engine treats a regular expression something like a flow diagram
// If a path is found from the left side of the diagram to the right hand side, the expression matches
// Backtracking
// The regular expression /^([01]+b|[\da-f]+h|\d+)$/ matches either a binary number followed by a "b", a hexadecimal number (base 16), followed by an "h", or a regular decimal number with no suffix character
// When matching this expression, the top branch will often be entered even though the input doesn't actually contain a binary number.
// When matching the string "103", for example, it becomes clear only at the 3 that we are in the wrong branch.
// The string does match the expression, just not the branch we currently in
// So the matcher backtracks. When entering a branch, it remembers its current position (in this case, at the start of the string, just past the first boundary box in teh diagram) so that it can go back and try another branch if the current one doesn not work out.
// The matcher stops as soon as it finds a full match. This means that if multiple branches could potentially match a string, only the first one is used
// Backtracking also happens for repetition operators like + and *. If you match /^.*x/ against "abcxe", the .* part will first try to consume the whole string. The engine will then realise that it needs to match an x to match the pattern.
// Since there is no x past the end of the string, the star operator tries to match one character less. But the matcher doesn't find an x after abcx either, so it backtracks again.
// Since backtracking doubles the amount of work with each additional optional character, be thoughtful with the construction of these regular expressions
// replace()
// String values have a replace method that can be used to replace part of the string with another string
console.log("papa".replace("p", "m")); // mapa
// The first argument can also be a regular expression in which the first match of the regular expression is replaced
console.log("Borobudur".replace(/[ou]/, "a")); // Barobudur
// Adding a g option (for global) replaces all matches
console.log("Borobudur".replace(/[ou]/g, "a")); // Barabadar
// The real power of using regular expressions with replace comes from teh fact that we can refer to matched groups in the replacement string.
// For example if we have a big string containing the names of people, one name per line, in the format Lastname, Firstname. If we want to swap these names and remove the comma to get a Firstname Lastname format, we can use the following:
console.log("Liskov, Barbara\nMcCarthy, John\nMilner, Robin".replace(/(\p{L}+), (\p{L}+)/gu, "$2 $1")); // Barbara Liskov\nJohn McCarthy\nRobin Milner
// The $1 and $2 in the replacement string refer tot he parenthesized groups in the pattern
// $1 is replaced by the text that matched against the first group, $2 by the second, and so on up to $9
// It is possible to pass a function as the second argument to replace.
let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
    amount = Number(amount) - 1;
    if (amount == 1) {
        unit = unit.slice(0, unit.length - 1);
    }
    else if (amount == 0) {
        amount = "no";
    }
    return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\p{L}+)/gu, minusOne)); // no lemon, 1 cabbage, and 100 eggs
// Greed
// We can use replace to write a function that removes all comments from a piece of JavaScript code
function stripComments(code) {
    return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
console.log(stripComments("1 + /* 2 */3")); // 1 + 3
console.log(stripComments("x = 10; // ten!")); // x = 10;
console.log(stripComments("1 /* a */+/* b */ 1")); // 1 1
// [^] is used as any character that is not in the empty set of characters
// This is to match any character
// We cannot use a period here because block comments can continue on a new line, and the period character does not match newline characters
// The output on the last line is wrong. Why?
// The [^]* part of the expression will first match as much as it can. It is greedy.
// Because of this behaviour, we say that the repetition operators(+, *, ? and {} are greedy)
// This means they match as mucha s they can and backtrack from there.
// Putting a question mark after them makes them non-greedy and they start by matching as little as possible.
function stripCommentsNonGreedily(code) {
    return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripCommentsNonGreedily("1 /* a */+/* b */ 1")); // 1 + 1
// Dynamically creating RegExp objects
// In some cases you may not know the exact pattern you need to match against when you start writing your code.
// Say you want to test for the user's name in a piece of text, you can build up a string and use the RegExp constructor on that
let firstName = "harry";
let regexp = new RegExp("(^|\\s)" + firstName + "($|\\s)", "gi");
console.log(regexp.test("Harry is a dodgy character.")); // true
// Note: when writing the \s part of the string, we need to use two backslashes as we are writing this in a normal string, not in a backslash-encoded regular expression
// What do we do if the name is "dea+hl[]rd" because our useer is an edgelord?
// To work around this, we can add backslashes before any character that has a special meaning
let edgeLord = "dea+hl[]rd";
let escaped = edgeLord.replace(/[\\[.+*?(){|^$]/g, "\\$&");
let edgelordRegexp = new RegExp("(^|\\s)" + escaped + "($|\\s)", "gi");
let text = "This dea+hl[]rd guy is super annoying.";
console.log(edgelordRegexp.test(text)); // true
// search()
// While the indexOf() method on strings can't be called with regular expressions, there is another method, search() that does expect a regular expression.
// Like indexOf() it returns the first index that is found or -1
console.log(" word".search(/\S/)); // 2
console.log(".   ".search(/\S/)); // -1
// search(), unfortunately, does not allow the search to start at a specific index
// lastIndex property
// The exec() method does not provide a convenient way to start searching from a given position in the string.
// But it does provide an inconvenient way
// Regular Expression objects have properties.
// One such property is source, which contains the string that that expression is taken from
// Another property is lastIndex, which controls in some limited circumstances, where the next match will start.
// Those circumstances are that the regular expression must have the global (g), or sticky (y) option enabled, and the match must happen through the exec method.
// Again, a less confusing solution would have been to just allow an extra argument to be passed to exec, but confusion is an essential feature of JavaScript's regular expression interface.
let pattern = /y/g;
pattern.lastIndex = 3;
let lastIndexMatch = pattern.exec("xyzzy");
if (lastIndexMatch)
    console.log(lastIndexMatch.index); // 4
console.log(pattern.lastIndex); // 5
// If the match was successful, the call to exec automatically updates the lastIndex property to point after the match. If no match was found, lastIndex is set back to 0, which is also the value it has in a newly constructed regular expression object.
// The difference between the global and sticky options is that when sticky is enabled, the match will succeed only if it starts directly at lastIndex, whereas with global, it will search ahead for a position where a match can start
let global = /abc/g;
console.log(global.exec("xyz abc")); // ["abc"]
let sticky = /aby/y;
console.log(sticky.exec("xyz abc")); // null
// When using a shared regular expression value for multiple exec calls, these autmoatic updates to lastIndex property can cause problems.
// Your regular expression might be accidentally starting at an index left over from a previous call.
let digit = /\d/g;
console.log(digit.lastIndex); // 0
console.log(digit.exec("here it is: 1")); // ["1"]
console.log(digit.lastIndex); // 13
console.log(digit.exec("and now: 1")); // null
// Another interesting effect of the global option is that it changes the way the match method works on strings.
// When called with a global expression, instead of returning an array similar to theat returned by exec, match will find all matches of the pattern in the string and return an array containing the matched strings
console.log("Banana".match(/an/g)); // ["an", "an"]
