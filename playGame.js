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
                                        type: 'input',
                                        name: 'basicBack',
                                        message: 'Please answer the question: '.green  
                                    }
                                ]).then(function(answer){
                                    if(answer.basicBack === basicObj[randomNumber].back) {
                                        console.log(`That is the correct answer!!!`.yellow);
                                    } else {
                                        console.log(`That answer is INCORRECT!!!!`.red.bold);
                                        console.log(`The correct answer is ${basicObj[randomNumber].back}\n`.yellow);
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
                                        type: 'input',
                                        name: 'clozeAnswer',
                                        message: 'Please fill in the ... : '.green
                                    }
                                ]).then(function(answer){
                                    if(answer.clozeAnswer === clozeObj[randomNumber].cloze) {
                                        console.log(`That is the correct answer!!!`.yellow);
                                    } else {
                                        console.log(`That answer is INCORRECT!!!!`.red.bold);
                                        console.log(`The correct answer is ${clozeObj[randomNumber].cloze}!!\n`.yellow);
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
                                        type: 'input',
                                        name: 'bothAnswer',
                                        message: 'Please answer the question or fill in the ... : '.green
                                    }
                                ]).then(function(both){
                                        if(gameType === basicObj) {
                                            if(both.bothAnswer == basicObj[randomNumber].back) {
                                                console.log(`That is the correct answer!!!`.yellow);
                                            } else {
                                                console.log(`That answer is INCORRECT!!!!`.red.bold);
                                                console.log(`The correct answer is ${basicObj[randomNumber].back}\n`.yellow);
                                            }    
                                        } else {
                                            if(both.bothAnswer == clozeObj[randomNumber].cloze) {
                                                console.log(`That is the correct answer!!!`.yellow);
                                            } else {
                                                console.log(`That answer is INCORRECT!!!!`.red.bold);
                                                console.log(`The correct anser is ${clozeObj[randomNumber].cloze}\n`.yellow);
                                            }
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
