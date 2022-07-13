const axios = require('axios');
var FormData = require('form-data');
const yts = require('yt-search')
const getVideoId = require('get-video-id');

class ChrisMusic {
  static getURL(res, v) {
    var data = new FormData();
    data.append('u', 'https://www.youtube.com/watch?v=' + v);
    data.append('c', 'US');
    var config = {
      method: 'POST',
      url: 'https://154.82.111.113.sslip.io/newp',
      headers: {
        "accept": "application/json",
        "accept-language": "en-US,en;q=0.9,si;q=0.8",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "uuid": "15f50b6a32692242af4ecbac80412fbe",
        "Referer": "https://ytmp3.cc/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        ...data.getHeaders()
      },
      data : data
    };
    axios(config).then(function (response) {
      if (response.data.data.mp3_cdn) {
        res.send(response.data.data.mp3_cdn)
      } else {
        res.send('error')
      }      
    }).catch(function (error) {
      console.log(error);
      res.send(error).status(404)
    });
  }
}

class ChrisMusicSearch {
  static async search(text) {
    var videoD;
    var getId = getVideoId(text).id
    if (getId) {
      videoD = await yts({ videoId: getId });
    } else {
      videoD = await yts({ query: text + ' song' });
    }
    return videoD;
  }

  // const list = await yts( { listId: 'PL7k0JFoxwvTbKL8kjGI_CaV31QxCGf1vJ' } )

  // console.log( 'playlist title: ' + list.title )
  // list.videos.forEach( function ( video ) {
  //   console.log( video.title )
  // } )
}

module.exports = {
  CM: ChrisMusic,
  CMS: ChrisMusicSearch
}