if (!navigator.serviceWorker.controller) {
  navigator.serviceWorker.register("/sw.js").then(function(reg) {
    console.log("Service worker has been registered for scope: " + reg.scope);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var materialbox = M.Materialbox.init(document.querySelectorAll('.materialboxed'), {});
  var tooltip = M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
  var formselect = M.FormSelect.init(document.querySelectorAll('select'), {});
});

class ProgressBar {
  constructor(ele, progressIDs, indeterminateClasses) {
    this.ele = ele
    this.progressIDs = progressIDs
    this.indeterminateClasses = indeterminateClasses
  }
  start() {
    this.ele.innerHTML = `<div class="progress ` + this.progressIDs.join(" ") + `"><div class="indeterminate ` + this.indeterminateClasses.join(" ") + `"></div></div>`
    const width = document.body.clientWidth;
    if (width <= 900) { document.querySelector('.' + this.progressIDs.join(" ")).style.marginLeft = '40px'; }
    else if (width > 900) { document.querySelector('.' + this.progressIDs.join(" ")).style.marginLeft = '11px'; }
  }
  stop() { this.ele.innerHTML = ``; }
}

function httprq(type, url, params, callback) {
  if (type == 'GET') {
    const getHTTP = new XMLHttpRequest();
    getHTTP.onload = function() { callback(this.responseText) }
    getHTTP.open(type, url);
    getHTTP.send();
  } else if (type == 'POST') {
    const postHTTP = new XMLHttpRequest();
    postHTTP.open('POST', url, true);
    postHTTP.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    postHTTP.onload = function() { callback(this.responseText) }
    postHTTP.send(params); // user=person&pwd=password
  }
}

function startDownload(ele, url) {
  const downloadProgress = new ProgressBar(ele.querySelector('div#musicLoaderHolder'), ['cProgress'], ['cIndeterminate'])
  M.toast({ html: `Downloading...`, classes: 'rounded' });
  downloadProgress.start()
  httprq('GET', url, '', (res) => {
    if (res != 'error') {
      downloadProgress.stop()
      window.location.href = res;
    } else {
      downloadProgress.stop()
      M.toast({ html: `Error! Try again`, classes: 'rounded' });
    }
  });
}

function returnIsSI(isSI, thumbnail, timestamp) {
  return isSI ? `<div class="card-image waves-effect waves-block waves-light"><img class="activator" id="musicImg" src="` + thumbnail + `"><span class="card-title right-align musicLength"><span class="tintBackground">` + timestamp + `</span></span></div>` : ``
}

function search(e, ele) {
  if (e.key === 'Enter' || e.keyCode == '13') {
    const searchProgress = new ProgressBar((ele.parentElement.parentElement).querySelector('div#searchLoaderHolder'), ['c2Progress'], ['c2Indeterminate'])
    searchProgress.start()
    document.getElementById('videoContainer').innerHTML = ``
    httprq('GET', 'https://chrismusic.dheshal.com/search?q=' + ele.value, '', (res) => {
      const isSILocal = document.getElementById('isSI').checked
      if (JSON.parse(res).videos) {
        JSON.parse(res).videos.forEach(video => {
          document.getElementById('videoContainer').innerHTML += parseResult(video, isSILocal)
        })
      } else if (JSON.parse(res).videoId) {
        document.getElementById('videoContainer').innerHTML += parseResult(JSON.parse(res), isSILocal)
      }
      searchProgress.stop()
    });
  }
}

function parseResult(video, isSI) {
  return `<div class="col s12 m4">
        <div class="card sticky-action hoverable" style="overflow: visible;">` + returnIsSI(isSI, video.thumbnail, video.duration.timestamp) + `
            <div id="musicLoaderHolder"></div>
            <div class="card-content"><span class="card-title activator grey-text text-darken-4 musicTitle">` + video.title + `<i class="material-icons right">more_vert</i></span><a href="` + video.author.url + `">` + video.author.name + `</a></div>
            <div class="card-action">
                <a href="javascript:void(0);" onclick="window.location.href = '` + video.url + `'"><i class="material-icons iconColor">play_circle_filled</i></a>
                <a href="javascript:void(0);" onclick="startDownload(this.parentElement.parentElement, 'https://chrismusic.dheshal.com/download?v=` + video.videoId + `')"><i class="material-icons iconColor">file_download</i></a>
            </div>
            <div class="card-reveal"><span class="card-title grey-text text-darken-4 musicTitle">` + video.title + `<i class="material-icons right">close</i></span><p>` + (video.views).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ` views • ` + video.ago + `</p></div>
        </div>
    </div>`
}

function rsz() {
  const width = document.body.clientWidth;
  if (width <= 900) {
    document.getElementById('searchContainer').style.paddingLeft = '20px'
    document.getElementById('searchBox').style.paddingRight = '60px'
    document.getElementById('videosContainer').style.paddingLeft = '25px'
    document.getElementById('videosContainer').style.paddingRight = '25px'
  } else if (width > 900) {
    document.getElementById('searchContainer').style.paddingLeft = '80px'
    document.getElementById('searchBox').style.paddingRight = '0px'
    document.getElementById('videosContainer').style.paddingLeft = '80px'
    document.getElementById('videosContainer').style.paddingRight = '80px'
  }
}