class DrumKit {
  constructor(){
    this.pads = document.querySelectorAll('.pad');
    this.playButton = document.querySelector('.play');
    this.currentKick = './sounds/clap-808.wav';
    this.currentSnare = './sounds/snare-808.wav';
    this.currentHihat = './sounds/hihat-808.wav';
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.crashAudio = document.querySelector('.crash-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');
    this.index = 0;
    this.bpm = 130;
    this.isPlaying = null;
    this.selects = document.querySelectorAll('select');
    this.muteBtns = document.querySelectorAll('.mute');
    this.tempoSlider = document.querySelector('.tempo-slider');
  }

  activePad(){
    this.classList.toggle('active');
  }

  repeat(){
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach(bar=>{
      bar.style.animation = 'playTrack 0.3s alternate ease-in-out 2';
      //check if pads are active
      if(bar.classList.contains('active')){
        if (bar.classList.contains('kick-pad')){
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains('snare-pad')){
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains('crash-pad')){
          this.crashAudio.currentTime = 0;
          this.crashAudio.play();
        }
        if (bar.classList.contains('hihat-pad')){
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }

  start(){
    const interval = (60/this.bpm)*1000;
    //check if it's playing
    if(this.isPlaying){
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else{
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }

  updateBtn(){
    if(!this.isPlaying){
      this.playButton.innerText = 'Play';
      this.playButton.classList.remove('active');
    }else{
      this.playButton.innerText = 'Stop';
      this.playButton.classList.add('active');
    }
  }

  changeSound(e){
    const selectionName = e.target.name;
    
    const selectionValue = e.target.value;
    
    switch(selectionName){
    case 'kick-select':
      this.kickAudio.src = selectionValue;
      break;

    case 'crash-select':
      this.crashAudio.src = selectionValue;
      break;

    case 'snare-select':
      this.snareAudio.src = selectionValue;
      break;

    case 'hihat-select':
      this.hihatAudio.src = selectionValue;
      break;
    }
  }

  mute(e){
   
    const muteIndex = e.target.getAttribute('data-track');
    e.target.classList.toggle('active');
    if(e.target.classList.contains('active')){
      switch(muteIndex){
      case '0':
        this.kickAudio.volume = 0;
        break;

      case '1':
        this.snareAudio.volume = 0;
        break;

      case '2':
        this.crashAudio.volume = 0;
        break;

      case '3':
        this.hihatAudio.volume = 0;
        break;
      }
    }else{
      switch(muteIndex){
      case '0':
        this.kickAudio.volume = 1;
        break;

      case '1':
        this.snareAudio.volume = 1;
        break;

      case '2':
        this.crashAudio.volume = 1;
        break;

      case '3':
        this.hihatAudio.volume = 1;
        break;
      }
    }
  }

  changeTempo(e){
    const tempoText = document.querySelector('.tempo-nr');
    console.log(e.target.value);
    tempoText.innerText = e.target.value;
  }

  updateTempo(e){
    clearInterval(this.isPlaying);
    this.bpm = e.target.value;
    this.isPlaying = null;
    if(this.playButton.classList.contains('active')){
      this.start();
    }
  }
}


const drumKit = new DrumKit;

drumKit.pads.forEach(pad => {
  pad.addEventListener('click', drumKit.activePad);
  pad.addEventListener('animationend', function(){
    this.style.animation = '';
  });
});

drumKit.playButton.addEventListener('click', function(){
  drumKit.start();
  drumKit.updateBtn();
});

drumKit.selects.forEach(select => {
  select.addEventListener('change', function(e){
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach(muteBtn => {
  muteBtn.addEventListener('click', function(e){
    drumKit.mute(e);
  });
});

drumKit.tempoSlider.addEventListener('input', function(e){
  drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener('change', function(e){
  drumKit.updateTempo(e);
});

