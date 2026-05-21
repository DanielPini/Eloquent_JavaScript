// The Date class represents a point in time
console.log(new Date()); // Thursday May 21 2026 09:17:31 GMT+0900 (AEST)

// You can also create an object for a specific time
console.log(new Date(2009, 11, 9, 12, 59, 59, 999)); // Wed Dec 09 2009 12:59:59 GMT+0100 (CET);
// In JavaScript, the months are zero-indexed. Be careful

// Timestamps are in miliseconds since the start of 1970.
// This is called Unix time.
// Negative numbers go before 1970.
// The getTime() method on a date object returns the miliseconds.

// If you give the date constructor a single argument, it will be treated as a milisecond count
// You can either get the current milisecond count by calling Date.now() or creating a new Date() and calling getTime()

/**
 * Methods on the Date object include:
 * getFullYear
 * getMonth
 * getDate
 * getHours
 * getMinutes
 * getSeconds
 * ***** Don't use getYear. It returns the year minus 1900 and is mostly useless *****
 */

// Putting parentheses around the parts of the expression that we are interested in, we can now create a date object from a string
function getDate(string: string) {
  const match = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  if (!match) {
    throw new Error("Invalid date format");
  }
  const [_, month, day, year] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}
// The underscore binding is ignored and used only to skip the full match element in the array returned by exec
