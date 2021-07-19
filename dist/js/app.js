class DrumKit {
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playButton = document.querySelector('.play');
        this.kickAudio = document.querySelectorAll('.kick-sound');
        this.clapSound = document.querySelector('.kick-sound');
        this.crashSound = document.querySelector('.crash-sound');
        this.index = 0;
        this.bpm = 40;
    }


    activePad(){
        this.classList.toggle('active');
    }

    repeat(){
        let step = this.index % 8;
        console.log(step);
        const activeBars = document.querySelectorAll(`.b${step}`);
        this.index++;
    }

    start(){
        const interval = (60/this.bpm)*1000;
        setInterval(() => {
            this.repeat();
        }, interval);
    }
}

const drumKit = new DrumKit;

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
})

drumKit.playButton.addEventListener('click', function(){
    drumKit.start();
});

