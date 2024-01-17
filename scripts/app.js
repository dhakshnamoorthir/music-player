let songContainer = document.querySelector('#song-container');
let playerContainer = document.querySelector('#player-container');
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
    let songItem = `<div class="song-item" onclick="${!fromPlayer ? `openPlayer(${song.id})` : `loadSong(${song.id})`}">
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
    playerContainer.appendChild(listItems)
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
        <p class="sound"><i class="fas fa-volume-up"></i></p>
        <p>${song.name}</p>
        <p class="heart"><i class="far fa-heart"></i></p>
    </div>
    <p class="song-artist">${song.artist}</p>
</div>
<div class="player-conrols">
    <div><i class="fas fa-step-backward"></i></div>
    <div class="controls">
        <i class="fas fa-backward"></i>
        <i class="fas fa-pause"></i>
        <i class="fas fa-forward"></i>
    </div>
    <div><i class="fas fa-step-forward"></i></div>
</div>`
}

function closePlayer(){
    playerContainer.classList.add('hide');
    playerContainer.innerHTML = '';
    songContainer.classList.remove('hide');
}

function loadSong(id) {
    let playerEle = document.querySelector('.player');
    let selectedSong = songs.find(x => x.id === id);
    let playingSong = getPlayingSongPlayer(selectedSong);
    let player = document.createElement('div');
    player.innerHTML = playingSong;
    player.classList.add('player');
    playerEle.replaceWith(player);
}