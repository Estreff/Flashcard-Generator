var basicCard = require('./basicCard'); 
var clozeCard = require('./clozeCard'); 
var playGame = require('./playGame');
var basicObj = require('./basic.json');
var clozeObj = require('./cloze.json');
var inquirer = require('inquirer');
var colors = require('colors');
var fs = require('fs');

function createCard() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'createType',
                message: 'Select what you would like to do:',
                choices: ['Create a Basic Card', 'Create a Cloze Card', 'Play Game', 'Exit'] 
            }
    ]).then(function(cardType) {
        if(cardType.createType === 'Create a Basic Card') {
            inquirer
                .prompt([
                    {
                        type:'input',
                        name: 'basicQuestion',
                        message: 'What is the question you would like to ask?'.magenta
                    },
                    {
                        type:'input',
                        name: 'basicAnswer',
                        message: 'What is the answer to the question?'.green
                    }
                ]).then(function(basicStatement){
                    var newBasic = new basicCard(basicStatement.basicQuestion, basicStatement.basicAnswer);
                    basicObj.push(newBasic);
                    fs.writeFile('./basic.json', JSON.stringify(basicObj, null, 2) , function(err) {
                        if(err) {
                            return console.log(err);
                            }
                    });
                    console.log('New Basic Card has been created!!'.yellow);                   
                }).then(function() {
                    createCard();
                });
        } else if(cardType.createType === 'Create a Cloze Card') {
            inquirer
                .prompt([
                    {
                        type:'input',
                        name: 'clozeQuestion',
                        message: 'What is the statement that you would like to show?'.magenta
                    },
                    {
                        type:'input',
                        name: 'clozeAnswer',
                        message: 'What words would you like to omit from statement?'.green
                    }
                ]).then(function(clozeStatement){
                    var newCloze = new clozeCard(clozeStatement.clozeQuestion, clozeStatement.clozeAnswer);
                    clozeObj.push(newCloze);
                    fs.writeFile('./cloze.json', JSON.stringify(clozeObj, null, 2) , function(err) {
                        if(err) {
                            return console.log(err);
                            }
                        });
                    console.log('New Cloze Card has been created!!'.yellow);                   
                }).then(function() {
                    createCard();
                });
        }else if(cardType.createType === 'Play Game') {
            playGame();
        }else {
            return;
        }
    });
}

createCard();