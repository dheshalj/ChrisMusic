const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT || 8080, () => {
  console.log(`ChrisMusic Server listening at http://localhost:${process.env.PORT || 8080}`)
})

// ChrisMusic Search   - https://chrismusic.dheshal.com/search?q=n95A6G9IxlM&isID=true
//                       https://chrismusic.dheshal.com/search?q=Norman Greenbaum - Spirit In The Sky
//                       https://chrismusic.dheshal.com/search?q=https://www.youtube.com/watch?v=n95A6G9IxlM
// ChrisMusic Download - https://chrismusic.dheshal.com/download?v=n95A6G9IxlM