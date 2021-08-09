function game() {
    //declare svg drum elements

    const entireKit = document.querySelector(".entire_kit")

    const playButton = document.querySelector(".play_button");
    const playButton1 = document.querySelector(".play_button1");
    const startButton = document.querySelector(".start_button");
    const message = document.querySelector(".message");
    const messageHeader = document.querySelector(".message_header");
    const messageContent = document.querySelector(".message_content");
    const instructions = document.querySelector(".instructions");
    const score = document.querySelector(".score_num");
    const scoreboard = document.querySelector(".score");

    entireKit.classList.add("no_pointer");

    //animate message
    function messageScale(scaletime) {
        gsap.from(".message", {
            duration: scaletime,
            scale: 0.2,
            transformOrigin: "50% 50%",
            ease: "power1"
        });
    }

    messageScale(1);
    //define startbutton function
    startButton.addEventListener("click", () => {
        startButton.classList.add("hidden");
        playButton.classList.remove("hidden");
        entireKit.classList.remove("low_opacity");
        messageHeader.classList.add("hidden");
        instructions.classList.add("hidden");
        messageContent.textContent = "Click PLAY to hear your first beat";
        messageScale(0.3);
        setTimeout(() => {
            scoreboard.classList.remove("hidden");
        }, 1000);

    })


    //animate and add sounds to elements
    function bassHit() {
        gsap.from("#bass", {
            duration: .5,
            scale: 1.1,
            transformOrigin: "50% 50%",
            ease: "bounce"
        });
        gsap.from("#bassleg", {
            duration: .5,
            scale: 1.1,
            transformOrigin: "50% 0",
            rotation: "-5",
            ease: "bounce"
        });
        gsap.from("#bassleg-2", {
            duration: .5,
            scale: 1.1,
            rotation: "5",
            transformOrigin: "50% 0",
            ease: "bounce"
        });
        document.getElementById('bass_sound').currentTime = 0;
        document.getElementById('bass_sound').play();
    }

    function tom1Hit() {
        gsap.from("#tom1", {
            duration: .5,
            rotation: "5",
            scaleY: .9,
            transformOrigin: "0 50%",
            ease: "bounce"
        });
        document.getElementById('tom1_sound').currentTime = 0;
        document.getElementById('tom1_sound').play();
    }

    function tom2Hit() {
        gsap.from("#tom2", {
            duration: .5,
            rotation: "-5",
            scaleY: .9,
            transformOrigin: "100% 50%",
            ease: "bounce"
        });
        document.getElementById('tom2_sound').currentTime = 0;
        document.getElementById('tom2_sound').play();
    }

    function floorHit() {
        gsap.from("#floor", {
            duration: .5,
            scaleY: .9,
            transformOrigin: "50% 100%",
            ease: "bounce"
        });
        gsap.from("#floorleg", {
            duration: .5,
            scale: 1.1,
            rotation: "5",
            transformOrigin: "50% 0",
            ease: "bounce"
        });
        document.getElementById('floor_sound').currentTime = 0;
        document.getElementById('floor_sound').play();
    }

    function snareHit() {
        gsap.from("#snare", {
            duration: .5,
            scaleY: .9,
            transformOrigin: "50% 100%",
            ease: "bounce"
        });
        document.getElementById('snare_sound').currentTime = 0;
        document.getElementById('snare_sound').play();
    }

    function hatsHit() {
        gsap.from("#hats", {
            duration: .5,
            rotation: "-10",
            scaleY: .9,
            transformOrigin: "50% 50%",
            ease: "bounce"
        });
        document.getElementById('hats_sound').currentTime = 0;
        document.getElementById('hats_sound').play();
    }

    function crashHit() {
        gsap.from("#crash", {
            duration: .5,
            rotation: "15",
            scaleY: .9,
            transformOrigin: "50% 50%",
            ease: "bounce"
        });
        document.getElementById('crash_sound').currentTime = 0;
        document.getElementById('crash_sound').play();
    }



    //play random beat adding one beat each click from 1 to 20

    let beat = [];
    let beatPlay = [];
    let beatInput = [];
    let start = 1;

    function setBeat() {
        for (randomBeats = 0; randomBeats < 20; randomBeats++) {
            const randomNumber = Math.ceil(Math.random() * 7);
            beat.push(randomNumber);
        }
    }

    setBeat();

    function playDrums() {
        beatPlay = []

        for (i = 0; i < start; i++) {
            beatPlay.push(beat[i]);
        }

        const beatLenght = beatPlay.length;
        for (let a = 0; a < beatLenght; a++) {
            setTimeout(() => {
                if (beatPlay[a] == 1) {
                    bassHit();
                }
                if (beatPlay[a] == 2) {
                    tom1Hit();
                }
                if (beatPlay[a] == 3) {
                    tom2Hit();
                }
                if (beatPlay[a] == 4) {
                    floorHit();
                }
                if (beatPlay[a] == 5) {
                    snareHit();
                }
                if (beatPlay[a] == 6) {
                    hatsHit();
                }
                if (beatPlay[a] == 7) {
                    crashHit();
                }
            }, 500 * a);

            setTimeout(() => {
                entireKit.classList.remove("no_pointer");
            }, 500 * beatLenght);
        }

        start++;
        if (start > 20) {
            start = 1
        }
    }

    //set play button after beat
    playButton.addEventListener("click", () => {
        message.classList.add("hidden");
        setTimeout(() => {
            playDrums();
        }, 300);
    })

    playButton1.addEventListener("click", () => {
        message.classList.add("hidden");
        setTimeout(() => {
            playDrums();
            playButton.classList.remove("hidden");
            playButton1.classList.add("hidden");
            score.textContent = "0";
        }, 300);
    })

    //check result when array lenghts are equal
    function checkResult() {
        if (beatPlay.length == beatInput.length) {
            function arraysMatch(arr1, arr2) {
                for (var i = 0; i < arr1.length; i++) {
                    if (arr1[i] !== arr2[i]) return false;
                }
                return true;
            }
            if (arraysMatch(beatInput, beatPlay) == true) {
                messageScale(0.3);
                messageHeader.classList.remove("hidden");
                messageHeader.textContent = "WELL DONE!";
                messageContent.textContent = "Press PLAY to continue.";
                message.classList.remove("hidden");
                score.textContent = beatInput.length;
            } else {
                messageScale(0.3);
                messageHeader.classList.remove("hidden");
                messageHeader.textContent = "OOPS!";
                messageContent.textContent = "Press PLAY to start again.";
                message.classList.remove("hidden");
                playButton.classList.add("hidden");
                playButton1.classList.remove("hidden");
                beat = [];
                setBeat();
                start = 1;
            }
            beatInput = []
            entireKit.classList.add("no_pointer");
        }
    }
    //play drum when clicked
    bass.addEventListener("click", () => {
        bassHit();
        beatInput.push(1);
        checkResult();
    })

    tom1.addEventListener("click", () => {
        tom1Hit();
        beatInput.push(2);
        checkResult();
    })

    tom2.addEventListener("click", () => {
        tom2Hit();
        beatInput.push(3);
        checkResult();
    })

    floor.addEventListener("click", () => {
        floorHit();
        beatInput.push(4);
        checkResult();
    })

    snare.addEventListener("click", () => {
        snareHit();
        beatInput.push(5);
        checkResult();
    })

    hats.addEventListener("click", () => {
        hatsHit();
        beatInput.push(6);
        checkResult();
    })

    crash.addEventListener("click", () => {
        crashHit();
        beatInput.push(7);
        checkResult();
    })
}

game();