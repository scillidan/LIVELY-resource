class EnJin {
    constructor() {
        console.clear();
        console.log('%c 🕹️ enJin core active', 'color: #970fff');
    }

    // Dynamically add any modules made for EnJin. We might not want them all.
    add(module, debug = false) {
        if(module == 'audio') {
            this.createAudioController(debug);
        } else if(module == 'utilities') {
            this.createUtilities();
        } else {
            console.warn(`Module ${module} does not exist.`);
        }
    }

    // Create an audio controller using the enJin audio module
    createAudioController(debug) {
        this.audioController = new AudioController(debug);
    }

    // Create a utilities controller using the enJin utilities module
    createUtilities() {
        this.utils = new UtilityController();
    }
}