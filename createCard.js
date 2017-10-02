var basicCard = require('./basicCard'); 
var clozeCard = require('./clozeCard'); 
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
                message: 'What type of card would you like to create?',
                choices: ['basicCard', 'clozeCard', 'Exit'] 
            }
    ]).then(function(cardType) {
        if(cardType.createType === 'basicCard') {
            inquirer
                .prompt([
                    {
                        type:'input',
                        name: 'basicQuestion',
                        message: 'What is the question you would like to ask?'
                    },
                    {
                        type:'input',
                        name: 'basicAnswer',
                        message: 'What is the answer to the question?'
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
        } else if(cardType.createType === 'clozeCard') {
            inquirer
                .prompt([
                    {
                        type:'input',
                        name: 'clozeQuestion',
                        message: 'What is the statement that you would like to show?'
                    },
                    {
                        type:'input',
                        name: 'clozeAnswer',
                        message: 'What words would you like to omit from statement?'
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
        } else {
            return;
        }
    });
}

createCard();