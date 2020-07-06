const fs = require("fs");

//First method
fs.writeFileSync("nota.txt", "Firs method in Node js");
console.log("wrote the file 1 successfully");

//Second method
fs.writeFile("nota2.txt", "Second method in Node js", "utf8", function (err) {
  if (err) throw err;
  console.log("wrote the file 2 successfully");
});

//Third ethod
// specify the path to the file, and create a buffer with characters we want to write
let path = "nota3.txt";
let buffer = new Buffer.from("Third method in Node js");

// open the file in writing mode, adding a callback function where we do the actual writing
fs.open(path, "w", function (err, fd) {
  if (err) {
    throw "could not open file: " + err;
  }

  // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
  fs.write(fd, buffer, 0, buffer.length, null, function (err) {
    if (err) throw "error writing file: " + err;
    fs.close(fd, function () {
      console.log("wrote the file 3 successfully");
    });
  });
});

//Fourth method
let writeStream = fs.createWriteStream("nota4.txt");

// write some data with a base64 encoding
writeStream.write("Fourth method in Node js", "base64");

// the finish event is emitted when all data has been flushed from the stream
writeStream.on("finish", () => {
  console.log("wrote the file 4 successfully");
});

// close the stream
writeStream.end();

// ------------------------Append data at the end--------------------------

fs.appendFile("nota.txt", "\nEsto es nuevo con appendfile", (err) => {
  if (err) throw err;
  console.log("Nota 1 were updated!");
});

// Events
fs.watch("nota.txt", (eventType, filename) => {
  console.log(`event type is: ${eventType}`);
  if (filename) {
    console.log(`filename provided: ${filename}`);
  } else {
    console.log("filename not provided");
  }
});

// Events
fs.watchFile("nota.txt", (curr, prev) => {
  console.log(`the current mtime is: ${curr.mtime}`);
  console.log(`the previous mtime was: ${prev.mtime}`);
});

// Truncate
fs.truncate("nota5.txt", function (err) {
  if (err) throw err;
  console.log("File note5.txt truncated");
});

// Read
fs.readFile("nota.txt", "utf8", function (err, data) {
  if (err) throw err;
  console.log("Reading nota.txt: " + data);
});
