class DrumKit {
  constructor(){
    this.pads = document.querySelectorAll('.pad');
    this.playButton = document.querySelector('.play');
    this.kickAudio = document.querySelector('.kick-sound');
    this.clapAudio = document.querySelector('.clap-sound');
    this.crashAudio = document.querySelector('.crash-sound');
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }

  activePad(){
    this.classList.toggle('active');
  }

  repeat(){
    let step = this.index % 8;
    console.log(step);
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
          this.clapAudio.currentTime = 0;
          this.clapAudio.play();
        }
        if (bar.classList.contains('crash-pad')){
          this.crashAudio.currentTime = 0;
          this.crashAudio.play();
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
}

const drumKit = new DrumKit;

console.log(drumKit);

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

