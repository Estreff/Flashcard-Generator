var inquirer = require('inquirer');
var fs = require('fs');
var basicObj = require('./basic.json');
var clozeObj = require('./cloze.json');
var colors = require('colors');


function playGame() {
inquirer
    .prompt([
        {
            type: 'list',
            name: 'gameType',
            message: 'Which game would you like to play?'.red,
            choices: ['Basic', 'Cloze', 'Both']
        }
    ]).then(function(gameReady){
        if(gameReady.gameType === 'Basic') {
            playBasic();
            function playBasic() {
                inquirer   
                    .prompt([
                        {
                            type: 'list',
                            name: 'basicFront',
                            message: 'Please show me the Flashcard!!'.green, 
                            choices: ['Play', 'Exit']   
                        }
                    ]).then(function(startBasic){
                        if(startBasic.basicFront === 'Play') {
                            var randomNumber = Math.floor(Math.random() * ((basicObj.length-1) + 1) + 0);
                            console.log(`${basicObj[randomNumber].front}\n`.magenta);
                            
                            inquirer
                                .prompt([
                                    {
                                        type: 'confirm',
                                        name: 'basicBack',
                                        message: 'Please show me the Answer!!'.green, 
                                        default: true   
                                    }
                                ]).then(function(answer){
                                    if(answer.basicBack === true) {
                                        console.log(`${basicObj[randomNumber].back}\n`.yellow);
                                    } else {
                                        return;
                                    }
                                }).then(function() {
                                    playBasic();
                                })
                        } else {
                            return;
                        }
                    });
            }
        }else if(gameReady.gameType == 'Cloze') {
            playCloze();
            function playCloze() {            
                inquirer   
                    .prompt([
                        {
                            type: 'list',
                            name: 'clozeStatement',
                            message: 'Please show me the statement!!'.green, 
                            choices: ['Play', 'Exit']   
                        }
                    ]).then(function(startCloze){
                        if(startCloze.clozeStatement == 'Play') {
                            var randomNumber = Math.floor(Math.random() * ((clozeObj.length-1) + 1) + 0);
                            console.log(`${clozeObj[randomNumber].partial}\n`.magenta);

                            inquirer
                                .prompt([
                                    {
                                        type: 'confirm',
                                        name: 'clozeAnswer',
                                        message: 'Please show me the Answer!!'.green, 
                                        default: true   
                                    }
                                ]).then(function(answer){
                                    if(answer.clozeAnswer === true) {
                                        console.log(`${clozeObj[randomNumber].cloze}\n`.yellow);
                                    } else {
                                        return;
                                    }
                                }).then(function() {
                                    playCloze();
                                })
                        } else {
                            return;
                        }
                    });
            }
        }else {
            playBoth();
            function playBoth() {            
                inquirer   
                    .prompt([
                        {
                            type: 'list',
                            name: 'bothQuestion',
                            message: 'Please show me the Statement or FlashCard!!'.green, 
                            choices: ['Play', 'Exit']   
                        }
                    ]).then(function(startBoth){
                        if(startBoth.bothQuestion == 'Play') {
                            var gameType = "";
                            if(Math.floor(Math.random() * 2) === 0) {
                                gameType = basicObj;
                            } else {
                                gameType = clozeObj;
                            }
                            var randomNumber = Math.floor(Math.random() * ((gameType.length-1) + 1) + 0);
                            if(gameType === basicObj) {
                                console.log(`${basicObj[randomNumber].front}\n`.magenta);
                            } else {
                                console.log(`${clozeObj[randomNumber].partial}\n`.magenta);
                            }

                            inquirer
                                .prompt([
                                    {
                                        type: 'confirm',
                                        name: 'bothAnswer',
                                        message: 'Please show me the Answer!!'.green, 
                                        default: true   
                                    }
                                ]).then(function(both){
                                    if(both.bothAnswer === true) {
                                        if(gameType === basicObj) {
                                            console.log(`${basicObj[randomNumber].back}\n`.yellow);
                                        } else {
                                            console.log(`${clozeObj[randomNumber].cloze}\n`.yellow);
                                        }
                                    } else {
                                        return;
                                    }
                                }).then(function() {
                                    playBoth();
                                })
                        } else {
                            return;
                        }
                    });
            }

        }
    });
}

playGame();
