/**
 * Operating System: Windows 10
 * Browser version: Chrome 87.0.4280.88

 * Student Name: Xiang Mao
 * Student ID: 20251952
 */


/**
 * Setting Of Constant
 */
const __PLATE_LIGHTEN_DURATION__ = {
    'on': 500,
    'on-250': 200,
    'on-500': 250,
    'on-1000': 500,
    'on-2000': 1500,
    'flash': 2500
};
const __COLORS__ = ['green', 'red', 'blue', 'yellow'];
const __START_WAIT__ = 3000;
const __DELAY_TIME__ = 5000;
const __STATUS_TEXT__ = {
    unplayed: 'START',
    playing: 'PLAYING...',
}

/**
 * Setting of Global Variable
 */
var g_IsGameStart;
var g_IsDisplayOver;
var g_IsUnlockLighten;
var g_PlayerClickBox;
var g_GameClickBox;
var g_DelayTimer;
var g_RoundOverTime;
var g_RoundTime;
var g_Score_Top = 0;
var g_Score_Current;
var g_Model_Current;

/**
 * function about setting css, style
 */
settingContainer();
function settingContainer() {
    document.getElementsByClassName('container')[0].style.height = window.innerHeight-20 + 'px';
}

/**
 * function about game load
 */
pageLoaded();
function pageLoaded(){
    // let plates =  document.getElementsByClassName('plate');
    // for(let i=0; i<plates.length; i++)
    //     plates[i].addEventListener('click', plateClick);

    let mousePlates =  document.getElementsByClassName('mouse-plate');
    for(let i=0; i<mousePlates.length; i++) {
        mousePlates[i].addEventListener('mousedown', plateDown);
        mousePlates[i].addEventListener('mouseup', plateUp);
        mousePlates[i].addEventListener('mouseout', plateUp);
    }

    let startButton = document.getElementsByClassName("text-start")[0].getElementsByTagName('a')
    startButton[0].addEventListener('click', startClick);

    initGlobalVar();
}

/**
 * Initialize the global variable in the game to start a new turn
 */
function initGlobalVar(){
    g_IsGameStart = false;
    g_IsUnlockLighten = false;
    g_PlayerClickBox = [];
    g_GameClickBox = [];
    g_DelayTimer = {
        'times': __DELAY_TIME__,
        'timer': null
    };
    g_RoundTime = 1000;
    g_RoundOverTime = 1000;
    g_Score_Current = 0;
    g_Model_Current = {
        model: 'on-2000',
        duration: __PLATE_LIGHTEN_DURATION__["on-2000"]
    };
}

/**
 * Function about game
 */
/**
 * Click event of Start game button is clicked
 */
function startClick(){
    /**
     * Start button can not be clicked after the is begun.
     */
    if (g_IsGameStart)
        return false;

    g_IsGameStart = true;
    /**
     * Clear the class make sure it would stuck(this function just for fix some bug)
     */
    clearLightenClass();

    /**
     * Turn on the light
     */
    toggleBulb();
    let startButton = document.getElementById('start');
    startButton.innerHTML = __STATUS_TEXT__.playing;
    startButton.style.cursor = 'not-allowed';

    // document.getElementById('score-current').innerHTML = '00';

    /**
     * Game will start after __START_WAIT__ seconds later.
     */
    setTimeout(winTime, __START_WAIT__);
    // addGameClickBox();
    // playGameBoxList(g_GameClickBox);
    // setTimeout(runGame, __START_WAIT__);

    // alert(g_GameClickBox.length)
    // for(let i in g_GameClickBox)
    //     alert(g_GameClickBox[i]);
}

/**
 * Execute the game, emptying players' operation, and start a delay timer.
 */
function winTime(){
    let levels = runGame(g_GameClickBox);
    g_PlayerClickBox = [];
    g_DelayTimer.timer = setTimeout(function(){
        defeatTime();
    }, g_DelayTimer.times + levels*g_Model_Current.duration);
}

/**
 * Add a color into the game box for player memorizing it. and show all the color in the box that need player to memory.
 */
function runGame(gameBox){
    g_IsUnlockLighten = false;
    addGameClickBox();
    playGameBoxList(gameBox);

    return gameBox.length;
    // checkGame();
    // setTimeout(function(){}, g_GameClickBox);
}

/**
 * Lighten the Plate one by one
 */
function playGameBoxList(gameBox){
    let items = document.getElementsByClassName('plate');
    let o = function (items, gameBox, i) {
        if (i > gameBox.length - 1)
            return g_IsUnlockLighten = true;
        // alert(i);
        for (let j = 0; j < items.length; j++)
            if (items[j].getAttribute('value') === gameBox[i])
                lightenPlate(items[j], g_Model_Current);
        setTimeout(o, g_Model_Current.duration+100, items, gameBox, i + 1);
    };
    // alert(gameBox.length+'dd');
    o(items, gameBox, 0);



    // for (let i in gameBox)
    //     for(let j =0; j<items.length; j++)
    //         if (items[j].getAttribute('value') === gameBox[i]){
    //             lightenPlate(items[j], 'on');
                // setTimeout(playGameBoxList())
                // break;
            // }
}

/**
 * lighten a plate
 * @param bulb - Which Plate needed to be lit
 * @param currentModel - Which game speed should be used
 */
function lightenPlate(bulb, currentModel){
    // bulb.classList.remove('on');
    // if (bulb.classList.contains(currentModel.model))
    //     return false;
    let models = Object.keys(__PLATE_LIGHTEN_DURATION__);
    for (let i in models)
        if (bulb.classList.contains(models[i]))
            return false;

    bulb.classList.add(currentModel.model);
    setTimeout(function(bulb, currentModel){
        bulb.classList.remove(currentModel.model);
        let keys = Object.keys(__PLATE_LIGHTEN_DURATION__);
        for(let i in keys)
            bulb.classList.remove(keys[i])

    }, currentModel.duration, bulb, currentModel);
}

/**
 * Add a color into the memory box.
 */
function addGameClickBox(){
    g_GameClickBox.push(__COLORS__[Math.floor(Math.random()*4)]);
}

// function flashBulb(){
//
// }

// function lightenBulbThree(){
//
// }

// function setBulbGreen(){
//     let bulb = document.getElementsByClassName('light-box')[0];
//     bulb.classList.add('on');
// }
//
// function setBulbRed(){
//     let bulb = document.getElementsByClassName('light-box')[0];
//     bulb.classList.remove('on');
// }

/**
 * On-off light
 */
function toggleBulb(){
    let bulb = document.getElementsByClassName('light-box')[0];
    bulb.classList.toggle('on');
}


function plateClick(){
    // if(!(g_IsGameStart && g_IsUnlockLighten && this.getAttribute('usable')))
    //     return false;
    //
    // this.setAttribute('usable', false);
    // setTimeout(function(o){
    //     o.setAttribute('usable', true);
    // },g_Model_Current.duration, this);
    //
    // lightenPlate(this, g_Model_Current);
    // addPlayerClick(this.getAttribute('value'))
    // clearTimeout(g_DelayTimer.timer);
    // if(!checkGame())
    //     defeatTime();
    // else if(g_GameClickBox.length === g_PlayerClickBox.length) {
    //     g_IsUnlockLighten = false;
    //     addScoreCurrent();
    //     if (g_Score_Current===5)
    //         modelUp();
    //     else if (g_Score_Current===9)
    //         modelUp();
    //     else if (g_Score_Current===13)
    //         modelUp();
    //
    //     setTimeout(winTime, g_RoundOverTime+g_RoundTime);
    // }
    // else{
    //     g_DelayTimer.timer = setTimeout(function () {
    //         defeatTime();
    //     }, g_DelayTimer.times);
    // }
}

/**
 * Player click the plate when game is running and the plate is not locked only.
 */
function plateDown(){
    if(!(g_IsGameStart && g_IsUnlockLighten))
        return false;

    /**
     * Show the plate player click
     */
    showMousePlate(this);
    /**
     * Save the color which player click
     */
    addPlayerClick(this.getAttribute('value'))
    clearTimeout(g_DelayTimer.timer);
    if(!checkGame())
        defeatTime();
    else if(g_GameClickBox.length === g_PlayerClickBox.length) {
        g_IsUnlockLighten = false;
        addScoreCurrent();
        if (g_Score_Current===5)
            modelUp();
        else if (g_Score_Current===9)
            modelUp();
        else if (g_Score_Current===13)
            modelUp();

        setTimeout(winTime, g_RoundOverTime+g_RoundTime);
    }
    else{
        g_DelayTimer.timer = setTimeout(function () {
            defeatTime();
        }, g_DelayTimer.times);
    }

}

/**
 * Quench the plate after player click or mouseup at one plate.
 */
function plateUp(){
    //log: 更换before
    hiddenMousePlate(this);
}

/**
 * Show the plate
 */
function showMousePlate(obj) {
    obj.style.opacity = '1';
}

/**
 * hidden the plate
 */
function hiddenMousePlate(obj) {
    obj.style.opacity = '0.3';
}


/**
 * Add the score into HTML Page after the round is over.
 */
function addScoreCurrent(){
    g_Score_Current++;
    // setScoreCurrent(g_Score_Current);
}

/**
 * Set the score into HTML Page after the round is over.
 */
function setScoreCurrent(score){
    if(score>9)
        document.getElementById('score-current').innerHTML = g_Score_Current;
    else
        document.getElementById('score-current').innerHTML = '0' + g_Score_Current;
}

/**
 * Compare both of Current Score with The Top Score, and set the biggest on the HTML Page
 */
function setScoreTop(score) {
    if (score > 9)
        document.getElementById('score-top').innerHTML = g_Score_Top;
    else
        document.getElementById('score-top').innerHTML = '0' + g_Score_Top;
}

/**
 *  Add a color which player click
 */
function addPlayerClick(peek){
    g_PlayerClickBox.push(peek);
}

/**
 * Compare the color that player clicked with saved in the game box that random by system
 */
function checkGame(){
    for (let i=0; i<g_PlayerClickBox.length; i++)
        if (g_GameClickBox[i] !== g_PlayerClickBox[i])
            return false;
    return true;
}

/**
 * Improve game speed
 */
function modelUp(){
    let keys = Object.keys(__PLATE_LIGHTEN_DURATION__);
    let i = keys.indexOf(g_Model_Current.model)
    let levelUp = keys[i-1];
    g_Model_Current.model = levelUp;
    g_Model_Current.duration = __PLATE_LIGHTEN_DURATION__[levelUp];
}

/**
 * Set Score, lit all colors and initialize game variate
 */
function defeatTime(){

    g_Score_Top = g_Score_Current>g_Score_Top? g_Score_Current: g_Score_Top;
    setScoreTop(g_Score_Top);
    setScoreCurrent(g_Score_Current);
    flashPlate();
    gameOver();
}

/**
 * Make all the lights flash
 */
function flashPlate(){
    clearLightenClass();
    let items = document.getElementsByClassName('plate');
    g_Model_Current.model = 'flash';
    g_Model_Current.duration = __PLATE_LIGHTEN_DURATION__.flash ;
    for (let i=0; i<items.length; i++)
        lightenPlate(items[i], g_Model_Current);

    // below code works, but above is better
    // let items = document.getElementsByClassName('plate');
    // let o = function(items, cur, duration){
    //     if(cur) {
    //         for (let i=0; i<items.length; i++)
    //             lightenPlate(items[i], 'flash');
    //         setTimeout(o, duration+20, items, cur-1, duration);
    //     }
    // };
    // o(items, times, duration);
}

/**
 * Clear the Class before it be used, this function just for fixing bug.
 */
function clearLightenClass() {
    let plates = document.getElementsByClassName('plate');
    let keys = Object.keys(__PLATE_LIGHTEN_DURATION__);
    for (let i=0; i<plates.length; i++)
        for(let j in keys)
            plates[i].classList.remove(keys[j])
}

/**
 * Do something after game over.
 */
function gameOver(){
    initGlobalVar();
    toggleBulb();
    let startButton = document.getElementById('start');
    startButton.innerHTML = __STATUS_TEXT__.unplayed;
    startButton.style.cursor= 'pointer';

}

// NOTE Window
/**
 *  STATE: The following code just for show my Student Information,
 *         Neither addition nor deletion will affect the functionality of Assignment-2
 */
/*The following JS is about my Student card only*/
// var titBar = document.getElementById("tit-bar");
// titBar.addEventListener("click", expandWindow);
// // close
// var titClose = document.getElementById("tit-close");
// titClose.addEventListener("click", foldWindow);
//
// setTimeout(expandWindow,3000);
// function expandWindow(){
//     document.getElementById("notice-box").classList.remove("closed");
// }
// function foldWindow(){
//     document.getElementById("notice-box").classList.add("closed");
// }
// NOTE END