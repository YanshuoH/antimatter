var particlesConfig = {
    particles: {
        number: {
            value: 60,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            'value': '#ffffff'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            },
            polygon: {
                'nb_sides': 5
            },
            image: {
                src: 'img/github.svg',
                width: 100,
                height: 100
            }
        },
        opacity: {
            value: 1,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.75,
                sync: false
            }
        },
        size: {
            value: 5,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 2,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 200,
            color: '#ffffff',
            opacity: 0.8,
            width: 3,
            grab_color: '#ffff33'
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'bubble'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 100,
                line_linked: {
                    opacity: 1
                }
            },
            repulse: {
                distance: 200
            },
            "bubble": {
                "distance": 200,
                "size": 40,
                "duration": 1,
                "opacity": 8,
                "speed": 3
            },
        }
    },
    'retina_detect': true
};

var bestScore;
var startPanel = document.getElementById('startPanel');
var scorePanel = document.getElementById('scorePanel');
var startBtn = document.getElementById('startGame');
var resultLayer = document.getElementById('resultLayer');
var bestScoreElement = document.getElementById('bestScoreValue');
var descriptionContainer = document.getElementById('descriptionContainer');
var failContainer = document.getElementById('failContainer');
var isPaused = false;
var isInGmae = false;

var init = function() {
    particlesJS('particles-js', particlesConfig);
    initScore();
    stopwatchShow();
    setPauseListener();
};

var start = function() {
    isInGmae = true;
    hideResultLayer();
    hideDescriptionContainer();
    setTimeout(function() {
        pJSDom[0].pJS.fn.vendors.updateOnHoverMode('grab');
    }, 500);
}

var stop = function() {
    if (pJSDom) {
        var duration = stopwatchStop();
        handleBestScore(duration);
        showFailContainer();
        var exportImageurl = pJSDom[0].pJS.fn.vendors.getCanvasDataUrl();
        showResultLayer(exportImageurl);
        pJSDom[0].pJS.fn.vendors.updateOnHoverMode('repulse');
    }
};

var setPauseListener = function() {
    stats.domElement.onmouseenter = function() {
        if (isInGmae) {
            console.log('In stats container');
            isPaused = true;
            stopwatchStop();
            if (isPaused) {
                stats.domElement.onmouseleave = function() {
                    if (isInGmae) {
                        console.log('Out stats container');
                        isPaused = false;
                        stopwatchStart();
                    }
                };
            }
        }
    };

    scorePanel.onmouseenter = function() {
        if (isInGmae) {
            console.log('In score panel container');
            isPaused = true;
            stopwatchStop();
            if (isPaused) {
                scorePanel.onmouseleave = function() {
                    if (isInGmae) {
                        console.log('Out score panel container');
                        isPaused = false;
                        stopwatchStart();
                    }
                }
            }
        }
    }

    document.onmouseleave = function() {
        if (isInGmae) {
            console.log('Out document');
            isPaused = true;
            stopwatchStop();
            if (isPaused) {
                document.onmouseenter = function() {
                    if (isInGmae) {
                        console.log('In document');
                        isPaused = false;
                        stopwatchStart();
                    }
                };
            }
        }
    }
}

var showResultLayer = function(imgUrl) {
    resultLayer.style.display = 'block';
    resultLayer.style.backgroundImage = 'url(' + imgUrl + ')';
};

var hideResultLayer = function() {
    resultLayer.style.display = 'none';
};

var showStartPanel = function() {
    startPanel.style.display = 'inline-block';
}

var hideStartPanel = function() {
    startPanel.style.display = 'none';
}

var hideDescriptionContainer = function() {
    descriptionContainer.style.display = 'none';
}

var showFailContainer = function() {
    failContainer.style.display = 'block';
    startGame.innerHTML = 'Run Forest run!';
}

var handleBestScore = function(currentScore) {
    var updateBestScore = false;
    if (bestScore === undefined || bestScore < currentScore) {
        bestScore = currentScore;
        updateBestScore = true;
    }

    var formattedTime = formatTime(bestScore);
    bestScoreElement.innerHTML = formattedTime;
    if (updateBestScore) {
        $time.innerHTML = formattedTime;
    }
}

var initScore = function() {
    var count_particles, update;
    stats = new Stats;
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
    count_particles = document.querySelector('.js-count-particles');
    update = function() {
        stats.begin();
        stats.end();
        if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
            count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
        }
        requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

document.addEventListener('GameOver', function(e) {
    isInGmae = false;
    stop();
    showStartPanel();
});

startBtn.onclick = function() {
    console.log('Starting');
    start();
    stopwatchReset();
    stopwatchStart();
    hideStartPanel();
}

init();
