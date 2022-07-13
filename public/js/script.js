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
    this.ele.innerHTML = `<div class="progress ${this.progressIDs.join(" ")}">
      <div class="indeterminate ${this.indeterminateClasses.join(" ")}"></div>
    </div>`
    const width = document.body.clientWidth;
    if (width <= 900) {
      document.querySelector('.' + this.progressIDs.join(" ")).style.marginLeft = '40px';
    } else if (width > 900) {
      document.querySelector('.' + this.progressIDs.join(" ")).style.marginLeft = '11px';
    }
  }

  stop() {
    this.ele.innerHTML = ``;
  }
}

class HTTP {
  static get(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open(type, url);
    xhr.send();
    xhr.onload = function() { cb(this.responseText) }
  }

  static post() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    xhr.onload = function() { cb(this.responseText) }
  }
}

function startDownload(ele, url) {
  const downloadProgress = new ProgressBar(ele.querySelector('div#musicLoaderHolder'), ['cProgress'], ['cIndeterminate'])
  M.toast({ html: `Downloading...`, classes: 'rounded' });
  downloadProgress.start()
  HTTP.get(url, (res) => {
    if (res != 'error') {
      downloadProgress.stop()
      window.location.href = res;
    } else {
      downloadProgress.stop()
      M.toast({ html: `Error! Try again`, classes: 'rounded' });
    }
  });
}

function returnIsSI(ShowImage, thumbnail, timestamp) {
  return ShowImage ? `<div class="card-image waves-effect waves-block waves-light"><img class="activator" id="musicImg" src="${thumbnail}"><span class="card-title right-align musicLength"><span class="tintBackground">${timestamp}</span></span></div>` : ``
}

function search(e, ele) {
  if (e.key === 'Enter' || e.keyCode == '13') {
    const searchProgress = new ProgressBar((ele.parentElement.parentElement).querySelector('div#searchLoaderHolder'), ['c2Progress'], ['c2Indeterminate'])
    searchProgress.start()
    document.getElementById('videoContainer').innerHTML = ``
    HTTP.get('https://chrismusic.dheshal.com/search?q=' + ele.value, (res) => {
      const ShowImage = document.getElementById('isSI').checked
      if (JSON.parse(res).videos) {
        JSON.parse(res).videos.forEach(video => {
          document.getElementById('videoContainer').innerHTML += parseResult(video, ShowImage)
        })
      } else if (JSON.parse(res).videoId) {
        document.getElementById('videoContainer').innerHTML += parseResult(JSON.parse(res), ShowImage)
      }
      searchProgress.stop()
    });
  }
}

function parseResult(video, ShowImage) {
  return `<div class="col s12 m4">
    <div class="card sticky-action hoverable" style="overflow: visible;">
      ${returnIsSI(ShowImage, video.thumbnail, video.duration.timestamp)}
      <div id="musicLoaderHolder"></div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4 musicTitle">
          ${video.title}
          <i class="material-icons right">more_vert</i>
        </span>
        <a href="${video.author.url}">${video.author.name}</a>
      </div>
      <div class="card-action">
          <a href="javascript:void(0);" onclick="window.location.href = '${video.url}'">
            <i class="material-icons iconColor">play_circle_filled</i>
          </a>
          <a href="javascript:void(0);" onclick="startDownload(this.parentElement.parentElement, "https://chrismusic.dheshal.com/download?v=${video.videoId}")">
            <i class="material-icons iconColor">file_download</i>
          </a>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4 musicTitle">
          ${video.title}
          <i class="material-icons right">close</i>
        </span>
        <p>${(video.views).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} views • ${video.ago}</p>
      </div>
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