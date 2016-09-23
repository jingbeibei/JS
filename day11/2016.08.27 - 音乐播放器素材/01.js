var background = document.getElementsByClassName('background')[0];
var time = document.getElementsByTagName('time')[0];
var progress = document.getElementsByTagName('progress')[0];
var volume = document.getElementsByTagName('progress')[1];
var musicname = document.getElementsByClassName('musicname')[0];
var musicer = document.getElementsByClassName('musicer')[0];

//播放控制
var myAudio = $("audio")[0];
myAudio.volume = 0.5;
// 播放/暂停控制
$(".btn1").click(function () {
    if (myAudio.paused) {
        myplay()
    } else {
        mypause()
    }
});
// 上一首
$(".btn2").click(function () {
    prev();
   
});
// 播放下一曲音乐
$(".btn3").click(function () {
    next();
   
});
function myplay() {
    myAudio.play();
    // $('.btn1').removeClass('btn1').addClass('btn01');
    // $('.btn1').removeClass('m-play').addClass('m-pause');
    $('.btn1').removeClass('m-pause').addClass('m-play');
    // $('.btn1').style.content="\e073";
//   $('.btn1').attr('content','\e072');
 
  
}
function mypause() {
    myAudio.pause();
    // $('.btn1').removeClass('m-pause').addClass('m-play');
     $('.btn1').removeClass('m-play').addClass('m-pause');
}

var playList = [
    { name: '传奇', singer: '王菲', src: '传奇.mp3', pic: 'wf.png' },
    { name: '知道不知道', singer: '刘若英', src: '知道不知道.mp3', pic: 'lry.jpg' }];

var current = 0;

function prev() {
    current--;
    start();
}

function next() {
    current++;
    start();
}

function updateTime() {
    progress.value = myAudio.currentTime / myAudio.duration;

    var seconds = Math.ceil(myAudio.currentTime) % 60;
    var minutes = Math.floor(myAudio.currentTime / 60);
    if (seconds < 10) seconds = '0' + seconds;
    time.textContent = minutes + ':' + seconds;
}

function next() {
    current++;
    start();
}

function play(item) {
    myAudio.src = item.src;
    musicname.innerHTML = item.name;
    musicer.innerHTML = item.singer;
    background.style.backgroundImage= 'url(' + item.pic + ')';
    myAudio.play();
}

function start() {
    if (current >= playList.length) current = 0;
    if (current < 0) current = playList.length - 1;
    var item = playList[current];
    if (item) {
        play(item);
    }
}
function updateVolume(){
                volume.value = myAudio.volume;
            }
 function volumeDown(){
                if(myAudio.volume > 0) myAudio.volume -= 0.1;
            }
            
            function volumeUp(){
                if(myAudio.volume < 1) myAudio.volume += 0.1;
            }
myAudio.addEventListener('ended', next);
myAudio.addEventListener('timeupdate', updateTime);
            myAudio.addEventListener('volumechange', updateVolume);
start();