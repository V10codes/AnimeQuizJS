console.log("Anime Song Quiz");

let DURATION = 100;

class Song {
  constructor(animeName, songName, path) {
    this.animeName = animeName;
    this.songName = songName;
    this.path = path;
  }
}

const song1 = new Song(
  "Neon Genesis Evangelion",
  "a cruel angels thesis",
  "songs/a_cruel_angels_thesis.mp3"
);
const song2 = new Song(
  "Black Clover",
  "Black Catcher",
  "songs/black_catcher.mp3"
);
const song3 = new Song("Black Clover", "Black Rover", "songs/black_rover.mp3");
const song4 = new Song("Naruto", "Blue Bird", "songs/blue_bird.mp3");
const song5 = new Song(
  "Rent a Girlfriend",
  "Centimeter",
  "songs/centimeter.mp3"
);
const song6 = new Song("Vinland Saga", "Drown", "songs/drown.mp3");
const song7 = new Song(
  "Your Lie in April",
  "Hikaru Nara",
  "songs/hikaru_nara.mp3"
);
const song8 = new Song(
  "Noragami Aragato",
  "Kyouran Hey Kids",
  "songs/kyouran_hey_kids.mp3"
);
const song9 = new Song(
  "Attack On Titan",
  "Shinzou Wo Sasageyou",
  "songs/shinzou_wo_sasagewou.mp3"
);
const song10 = new Song(
  "Death Note",
  "The World",
  "songs/the_world_death_note.mp3"
);
const song11 = new Song(
  "Vinland Saga",
  "Torches ed1",
  "songs/vinland_saga_ed1.mp3"
);
const song12 = new Song(
  "Vinland Saga",
  "MUKANJYO op1",
  "songs/vinland_saga_op1.mp3"
);
const song13 = new Song(
  "Vinland Saga",
  "Against the Fate",
  "songs/vinland_saga_s2_ed.mp3"
);
const song14 = new Song(
  "Attack On Titan",
  "You See Big Girl",
  "songs/you_see_big_girl.mp3"
);

const songs = [
  song1,
  song2,
  song3,
  song4,
  song5,
  song6,
  song7,
  song8,
  song9,
  song10,
  song11,
  song12,
  song13,
  song14,
];

//access elements DOM
let points = 0;
let songIndex = 0;
let audioElement = new Audio(songs[songIndex].path);
let score = document.getElementById("score");
let progressBar = document.getElementById("progressBar");
let forward = document.getElementById("forward");
let backward = document.getElementById("backward");
let playPause = document.getElementById("play");
let heading = document.getElementById("heading");
let option1 = document.getElementById("option-1");
let option2 = document.getElementById("option-2");
let option3 = document.getElementById("option-3");
let option4 = document.getElementById("option-4");
let evaluate = document.getElementById("evaluate");

const options = [option1, option2, option3, option4];
//audioElement.play()
let toggle = 0;
heading.addEventListener("click", () => {
  if (toggle === 0) {
    //show
    heading.innerHTML = "Hide Buttons";
    options.forEach((element) => {
      element.classList.remove("hidden");
      evaluate.classList.remove("hidden");
    });
  } else {
    heading.innerHTML = "Show Buttons";
    options.forEach((element) => {
      element.classList.add("hidden");
      evaluate.classList.add("hidden");
    });
  }
  toggle ^= 1;
});
//add event listeners to options
var selected;
options.forEach((element) => {
  element.addEventListener("click", () => {
    element.style.backgroundColor = "white";
    element.style.color = "black";
  });
});

evaluate.addEventListener("click", () => {
  options.forEach((element) => {
    if (element.innerHTML == songs[songIndex].songName) {
      element.style.backgroundColor = "green";
    } else {
      element.style.backgroundColor = "red";
    }
  });
});

score.innerHTML = "score: " + points;

//forward playBack
forward.addEventListener("click", () => {
  if (!audioElement.paused) {
    audioElement.pause();
    playPause.classList.remove("fa-play-circle");
    playPause.classList.add("fa-pause-circle");
  } else {
    playPause.classList.remove("fa-pause-circle");
    playPause.classList.add("fa-play-circle");
  }
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = randomNumber(songs.length);
    tion;
  }
  audioElement.src = songs[songIndex].path;
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
  }
  fillButtons();
});
//backward playBack
backward.addEventListener("click", () => {
  if (!audioElement.paused) {
    audioElement.pause();
    playPause.classList.remove("fa-play-circle");
    playPause.classList.add("fa-pause-circle");
  } else {
    playPause.classList.remove("fa-pause-circle");
    playPause.classList.add("fa-play-circle");
  }
  songIndex--;
  if (songIndex < 0) {
    songIndex = randomNumber(songs.length);
  }
  audioElement.src = songs[songIndex].path;
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
  }
  fillButtons();
});
// play/pause click
playPause.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    playPause.classList.remove("fa-play-circle");
    playPause.classList.add("fa-pause-circle");
  } else {
    audioElement.pause();
    playPause.classList.add("fa-play-circle");
    playPause.classList.remove("fa-pause-circle");
  }
});

audioElement.addEventListener("timeupdate", () => {
  // console.log(audioElement.currentTime);
  let progress = parseInt((audioElement.currentTime / DURATION) * 100);
  progressBar.value = progress;
  if (DURATION >= audioElement.duration) {
    DURATION = audioElement.duration * 0.5;
  }
  if (audioElement.currentTime >= DURATION) {
    audioElement.pause();
    playPause.classList.add("fa-play-circle");
    playPause.classList.remove("fa-pause-circle");
  }
});

progressBar.addEventListener("change", () => {
  audioElement.currentTime = parseFloat((progressBar.value * DURATION) / 100);
});

//scrambling effect
// const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// let interval = null;
// heading.onmouseover = (event) => {
//   let iteration = 0;
//   clearInterval(interval);
//   interval = setInterval(() => {
//     event.target.innerText = event.target.innerText
//       .split("")
//       .map((letter, index) => {
//         if (index < iteration) {
//           return event.target.dataset.value[index];
//         }

//         return letters[Math.floor(Math.random() * 26)];
//       })
//       .join("");

//     if (iteration >= event.target.dataset.value.length) {
//       clearInterval(interval);
//     }

//     iteration += 1 / 3;
//   }, 30);
// };

function randomNumber(n) {
  var number = Math.floor(Math.random() * n);
  // if(number===correctOptionindex){
  //     number=(number+1)%n;
  // }
  return number;
}

//when forward or backward is clicked fill options
//initialize innerHTML of options
if (songIndex === 0) {
  for (let i = 0; i < 4; i++) {
    options[i].innerHTML = songs[i].songName;
  }
}

function fillButtons() {
  //fill correct anime name
  let correctOptionindex = -1;
  correctOptionindex = randomNumber(options.length);
  // console.log(correctOptionindex);
  options[correctOptionindex].innerHTML = songs[songIndex].songName;
  let temp = songIndex + 1;
  let fillingOptions = [];
  while (fillingOptions.length <= 3) {
    if (temp >= songs.length) {
      temp = temp % songs.length;
    }
    fillingOptions.push(temp);
    temp++;
  }
  let index = 0;
  for (let i = 0; i < options.length; i++) {
    if (i === correctOptionindex) {
      continue;
    } else {
      options[i].innerHTML = songs[fillingOptions[index]].songName;
      index++;
    }
  }
  console.log(fillingOptions);
  fillingOptions.length = 0;
}
