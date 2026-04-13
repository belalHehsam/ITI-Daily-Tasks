class SoundService {
    bg = new Audio("../../assets/audio/openmindaudio-cinematic-the-sun-explodes-behind-the-hero-short-preview-492714.mp3");
    match = new Audio("../../assets/audio/Match.mp3");
    fail = new Audio("../../assets/audio/fail.mp3");
    flip = new Audio('../../assets/audio/flip.mp3');
    notMatch = new Audio('../../assets/audio/notMatch.mp3');
    coutnDown = new Audio('../../assets/audio/freesound_community-robotic-countdown-43935.mp3');
    congratulation = new Audio('../../assets/audio/Congratulation.mp3');
    bgcongratulation = new Audio('../../assets/audio/sf0_mis_complete.mp3');
    constructor() {
        this.bg.loop = true;
    }
    playBackground() {
        this.bg.volume = 0.1;
        this.bg.play();
    }
    stopBackground() {
        this.bg.pause();
    }
    playMatch() { this.match.play(); }
    playFail() { this.fail.play(); }
    playCongratulaions() { this.congratulation.play(); }
    playBGCongratulaions() {
        this.bgcongratulation.play();
        this.bgcongratulation.volume = 0.2;
    }
    playFlip() { this.flip.play(); }
    playNotMatch() { this.notMatch.play(); }
    countDown() { this.coutnDown.play(); }
}
export default new SoundService();
//# sourceMappingURL=gameServices.js.map