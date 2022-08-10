const express = require('express');
const Stream = require('stream')
const { Readable } = require('stream');
const app = express();

async function * generate() {
    while(true) {
        yield Date.now().toString()
        await sleep(100)
    }
}

const readable = Readable.from(generate());


app.get('/', function (req, res) {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Content-Encoding": "none"
      });
   readable.pipe(res);
});

app.get('/timeout', function (req, res) {
    setTimeout(function() {
        res.end("")
    }, 240000000)
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Content-Encoding": "none"
      });
});

 var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port);
 })

 async function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    }).catch(function() {});
  }  