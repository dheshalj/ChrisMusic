const path = require('path')
const fs = require('fs');
const express = require('express')
const useragent = require('express-useragent');
const cors = require('cors')
const { ChrisMusic, ChrisMusicSearch } = require('./chrisMusic')
const app = express()

const cm = new ChrisMusic()
const cms = new ChrisMusicSearch()

app.use(cors())
app.use(useragent.express());
app.use(express.static(path.join(__dirname, "public")));

app.get('/search', async (req, res) => {
  res.status(200).jsonp(await cms.search(req.query.q))
})

app.get('/download', (req, res) => {
  cm.getURL(res, req.query.v)
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`ChrisMusic Server listening at http://localhost:${process.env.PORT || 8080}`)
})

// ChrisMusic Search   - https://chrismusic.dheshal.com/search?q=n95A6G9IxlM&isID=true
//                       https://chrismusic.dheshal.com/search?q=Norman Greenbaum - Spirit In The Sky&isID=false
//                       https://chrismusic.dheshal.com/search?q=https://www.youtube.com/watch?v=n95A6G9IxlM&isID=false
// ChrisMusic Download - https://chrismusic.dheshal.com/download?v=n95A6G9IxlM