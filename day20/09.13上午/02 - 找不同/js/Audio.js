// Audio.js

// 统一管理页面上的所有音效

function Audio() {
    this.audios = $('audio').toArray();
    // 背景音乐
    this.music = this.audios[0];
    // 点击时的音效
    this.click = this.audios[1];
    // 过关时的音效
    this.pass = this.audios[2];
    // 游戏通关时的音效
    this.complete = this.audios[3];
    // 超时的音效
    this.timeout = this.audios[4];
}

// 停止所有音乐
Audio.prototype.pauseAll = function(){
    this.audios.forEach(function(audio){
        audio.pause();
    })
}

// 播放背景音乐
Audio.prototype.playMusic = function(only){
    if(only) this.pauseAll();
    this.music.load();
    this.music.play();
}

// 播放点击音效
Audio.prototype.playClick = function(){
    // 为了让点击音效更清晰，让背景音乐静音
    // this.muteMusic();
    
    this.click.load();
    this.click.play();
    
    // setTimeout(function() {
    //     this.recoverMusic();
    // }.bind(this), 500);
}