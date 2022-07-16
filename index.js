const fs = require('fs')
const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()

fs.writeFile(path.resolve(__dirname, 'bucket', 'req.log'), '', { flag: 'wx' }, () => {});
const log = require('simple-node-logger').createSimpleLogger({
  logFilePath: 'bucket/req.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
});

app.use(cors())
app.use(express.static(path.join(__dirname, "public")));

app.get('/log/search', (req, res) => {
  log.info('SEARCH - Query: ', req.query.q)
  res.status(200).send('OK')
})

app.get('/log/download', (req, res) => {
  log.info('DOWNLOAD - Video: ', req.query.v)
  res.status(200).send('OK')
})

app.listen(process.env.PORT || 8080, () => {
  console.log(`ChrisMusic Server listening at http://localhost:${process.env.PORT || 8080}`)
})

// ChrisMusic Search   - https://chrismusic.dheshal.com/search?q=n95A6G9IxlM&isID=true
//                       https://chrismusic.dheshal.com/search?q=Norman Greenbaum - Spirit In The Sky
//                       https://chrismusic.dheshal.com/search?q=https://www.youtube.com/watch?v=n95A6G9IxlM
// ChrisMusic Download - https://chrismusic.dheshal.com/download?v=n95A6G9IxlM