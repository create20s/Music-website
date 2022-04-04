console.log("welcome to sasta spotify");

// Initialize the variable

let songIndex = 0;
let audioElement = new Audio('songs/2.mp3');
let masterPlay= document.getElementById('masterPlay');
let myprogressBar= document.getElementById('myprogressBar');
let gif= document.getElementById('gif');
let playGif= document.getElementById('playGif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let masterSongName= document.getElementById('masterSongName');

let songs =[
    {
        songName: "Leke Pehela Pehela Peyar", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"
    },
    {
        songName: "Kehndi Hundi Si Chan Tak Raah Bana De", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"
    },
    {
        songName: "Meri Jaan", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"
    },
    {
        songName: "no copyright music", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"
    },
    {
        songName: "no copyright music", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"
    },
    {
        songName: "no copyright music", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"
    },
    {
        songName: "no copyright music", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"
    },
]

// update covers image

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// handle Play pause

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove  ('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        playGif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        playGif.style.opacity = 0;
    }
})




audioElement.addEventListener('timeupdate', ()=>{


    // Update seekbar

    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);

    myprogressBar.value= progress;
})

myprogressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myprogressBar.value * audioElement.duration/100;
})


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        playGif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})