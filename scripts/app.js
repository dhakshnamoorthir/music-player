let songContainer = document.querySelector('#song-container');
let playerContainer = document.querySelector('#player-container');
let title = document.querySelector('.title');
let welcome = document.querySelector('.welcome');
let playingSong;
let progressBar = document.querySelector(".progress-bar");
let pause;
let play;
let sound;
let mute;
var currentTimeDisplay;
var durationDisplay;
function getAllSongItemsList() {
    let songItemsList = '';
    for (let i = 0; i < songs.length; i++) {
        songItemsList = songItemsList + getSongItem(songs[i], false)
    }
    let listItems = document.createElement('div')
    listItems.innerHTML = songItemsList;
    listItems.classList.add('song-list');
    songContainer.appendChild(listItems)
}

function getSongItem(song, fromPlayer) {
    let songItem = `<div class="song-item" id="song-item-${song.id}" onclick="${!fromPlayer ? `openPlayer(${song.id})` : `loadSong(${song.id})`}">
    <div class="song-details">
        <img src="${song.imagePath}" alt="">
        <div class="song-detail">
            <p class="song-name">${song.name}</p>
            <p class="artist">${song.artist}</p>
        </div>
    </div>
    <div class="song-actions">
        <p>${song.time}</p>
    </div>
</div>`
    return songItem;
}

getAllSongItemsList();

function openPlayer(id) {
    songContainer.classList.add('hide');
    playerContainer.classList.remove('hide');
    title.classList.add('hide');
    welcome.classList.add('hide');
    let selectedSong = songs.find(x => x.id === id);
    let playingSong = getPlayingSongPlayer(selectedSong);
    let player = document.createElement('div');
    player.innerHTML = playingSong;
    player.classList.add('player');
    playerContainer.appendChild(player)
    let songItemsList = '';
    for (let i = 0; i < songs.length; i++) {
        songItemsList = songItemsList + getSongItem(songs[i], true)
    }
    let songLists = `<div class="song-list">${songItemsList}</div>`
    let listItems = document.createElement('div');
    listItems.innerHTML = songLists;
    listItems.classList.add('song-items');
    playerContainer.appendChild(listItems);
    playSelectedSong(`song-${id}`);
    let items = document.querySelectorAll(`#song-item-${id}`);
    items.forEach(ele => {
        ele.classList.add('green-border');
    })
}

function getPlayingSongPlayer(song) {
    return `<div class="player-head">
    <div onClick="closePlayer()"><i class="fas fa-window-close"></i></div>
    <p><i class="fas fa-music"></i> Playing Now...</p>
</div>
<div class="player-img">
    <img src="${song.imagePath}" alt="">
</div>
<div class="song-playing-details">
    <div class="palying-song">
        <p class="sound" onClick="soundOrMute()"><i class="fas fa-volume-up"></i></p>
        <p class="mute" onClick="soundOrMute()"><i class="fas fa-volume-mute"></i></p>
        <p>${song.name}</p>
        <p  onClick="likeSong()"><i class="far fa-heart heart"></i></p>
    </div>
    <p class="song-artist">${song.artist}</p>
</div>
<div class="player-conrols">
    <div><i class="fas fa-step-backward" onClick="previous(${song.id - 1})"></i></div>
    <div class="controls">
        <i class="fas fa-backward" onClick="rewind()"></i>
        <i class="fas fa-pause" id="pause" onClick="pauseOrResume()"></i>
        <i class="fas fa-play" id="play" onClick="pauseOrResume()"></i>
        <i class="fas fa-forward" onClick="forward()"></i>
    </div>
    <div><i class="fas fa-step-forward" onClick="next(${song.id + 1})"></i></div>
</div>
<audio id="song-${song.id}" src="${song.songPath}"></audio>
<div class="bar">
        <p class="current-time">00:00</p>
        <div class="progress-bar-container">
            <div class="progress-bar"></div>
        </div>
        <p class="audio-duration">00:00</p>
</div>
`
}

function closePlayer(){
    playerContainer.classList.add('hide');
    playerContainer.innerHTML = '';
    songContainer.classList.remove('hide');
    title.classList.remove('hide');
    welcome.classList.remove('hide');
}

function loadSong(id) {
    let borders = document.querySelectorAll('.green-border');
    borders.forEach(ele => {
        ele.classList.remove('green-border');
    })
    let playerEle = document.querySelector('.player');
    let selectedSong = songs.find(x => x.id === id);
    let playingSong = getPlayingSongPlayer(selectedSong);
    let player = document.createElement('div');
    player.innerHTML = playingSong;
    player.classList.add('player');
    playerEle.replaceWith(player);
    playSelectedSong(`song-${id}`);
    let items = document.querySelectorAll(`#song-item-${id}`);
    items.forEach(ele => {
        ele.classList.add('green-border');
    })
}

function playSelectedSong(id) {
    playingSong = document.getElementById(id);
    playingSong.play();
    playingSong.addEventListener("timeupdate", updateProgressBar);
    progressBar = document.querySelector(".progress-bar");
    pause = document.getElementById('pause');
    play = document.getElementById('play');
    sound = document.querySelector('.sound');
    mute = document.querySelector('.mute');
    play.classList.add('hide');
    mute.classList.add('hide');
    currentTimeDisplay = document.querySelector(".current-time");
    durationDisplay = document.querySelector(".audio-duration");
    updateProgressBar();
}

function updateProgressBar(){
    var percentage = (playingSong.currentTime / playingSong.duration) * 100;
        progressBar.style.width = percentage + "%";


        var currentTimeMinutes = Math.floor(playingSong.currentTime / 60);
        var currentTimeSeconds = Math.floor(playingSong.currentTime % 60);
        currentTimeDisplay.innerText = currentTimeMinutes + ":" + (currentTimeSeconds < 10 ? "0" : "") + currentTimeSeconds;

        var durationMinutes = Math.floor(playingSong.duration / 60);
        var durationSeconds = Math.floor(playingSong.duration % 60);
        durationDisplay.innerText = durationMinutes + ":" + (durationSeconds < 10 ? "0" : "") + durationSeconds;

}

function pauseOrResume (){
    if (playingSong.paused) {
        playAudio();
        play.classList.add('hide');
        pause.classList.remove('hide');
    } else {
        pauseAudio();
        pause.classList.add('hide');
        play.classList.remove('hide');
    }
}

function playAudio() {
    playingSong.play();
    updateProgressBar();
}

function pauseAudio() {
    playingSong.pause();
}

function forward(){
    playingSong.currentTime = playingSong.currentTime + 5
    updateProgressBar();
  }

  function rewind(){
    playingSong.currentTime = playingSong.currentTime - 5
    updateProgressBar();
  }

function previous(id){
    if(id > 0 && id <= songs.length) {
        loadSong(id);
    }
}

function next(id){
    if(id > 0 && id <= songs.length) {
        loadSong(id);
    }
}

function getMinutes(t){
    var min = parseInt(parseInt(t)/60);
    var sec = parseInt(t%60);
    if (sec < 10) {
      sec = "0"+sec
    }
    if (min < 10) {
      min = "0"+min
    }
    return min+":"+sec
  }

  function soundOrMute(){
    if (playingSong.muted) {
        playingSong.muted = false;
        mute.classList.add('hide');
        sound.classList.remove('hide');
    } else {
        playingSong.muted = true;
        sound.classList.add('hide');
        mute.classList.remove('hide');
    }   
  }

  function likeSong(){
    let likeEle = document.querySelector('.heart');
    if(likeEle.classList.contains('red')){
        likeEle.classList.remove('red');
    } else {
        likeEle.classList.add('red');
    }
  }