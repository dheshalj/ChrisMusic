const axios = require('axios');
var FormData = require('form-data');
const yts = require('yt-search')
const getVideoId = require('get-video-id');

const bUrls = [
  'https://154.82.111.45.nip.io',
  'https://154.82.111.41.sslip.io',
  'https://154.82.111.42.sslip.io',
  'https://154.82.111.111.sslip.io',
  'https://154.82.111.112.sslip.io',
  'https://154.82.111.113.sslip.io',
  'https://154.82.111.116.sslip.io',
  'https://154.82.111.99.sslip.io',
  'https://154.82.111.77.sslip.io',
  'https://66.90.84.66.sslip.io',
]

class ChrisMusic {
  static getURL(res, v) {
    var data = new FormData();
    data.append('u', 'https://www.youtube.com/watch?v=' + v);
    var burl = bUrls[Math.floor(Math.random()*bUrls.length)]
    var config = {
      method: 'post',
      url: burl + '/p',
      headers: {
        'authority': burl, 
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"', 
        'accept': 'application/json, text/plain, */*', 
        'sec-ch-ua-mobile': '?0', 
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36', 
        'sec-ch-ua-platform': '"Windows"', 
        'origin': 'https://www.mp3juices.cc', 
        'sec-fetch-site': 'cross-site', 
        'sec-fetch-mode': 'cors', 
        'sec-fetch-dest': 'empty', 
        'referer': 'https://www.mp3juices.cc/', 
        'accept-language': 'en-US,en;q=0.9,si;q=0.8',
        'Access-Control-Allow-Origin': '*',
        ...data.getHeaders()
      },
      data : data
    };
    axios(config).then(function (response) {
      if (response.data.mp3) {
        var url = config.url.replace('/p','') + response.data.mp3
        res.send(url)
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