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
var startBtn = document.getElementById('startGame');
var resultLayer = document.getElementById('resultLayer');
var bestScoreElement = document.getElementById('bestScoreValue');
var descriptionContainer = document.getElementById('descriptionContainer');
var failContainer = document.getElementById('failContainer');

var init = function() {
    particlesJS('particles-js', particlesConfig);
    stopwatchShow();
    var canvas = document.getElementById('particles-js-canvas');
    canvas.oncontextmenu = function() {
        return false;
    }
};

var start = function() {
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

document.addEventListener('GameOver', function(e) {
    stop();
    showStartPanel();
});

startBtn.onclick = function() {
    start();
    stopwatchReset();
    stopwatchStart();
    hideStartPanel();
}

init();
