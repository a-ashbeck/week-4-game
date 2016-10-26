$(document).ready(function() {
        // Character objects containing stats and images
    var lukeSkywalker = {
            name: 'Luke Skywalker',
            health: 100,
            baseHealth: 100,
            attack: 26,
            attackIncrement: 26,
            counterAttack: 6,
            image: 'assets/images/luke.jpg'
        },

        darthVader = {
            name: 'Darth Vader',
            health: 150,
            baseHealth: 150,
            attack: 8,
            attackIncrement: 8,
            counterAttack: 25,
            image: 'assets/images/vader.jpg'
        },

        obiWanKenobi = {
            name: 'Obi-Wan Kenobi',
            health: 120,
            baseHealth: 120,
            attack: 12,
            attackIncrement: 12,
            counterAttack: 10,
            image: 'assets/images/kenobi.jpg'
        },

        kyloRen = {
            name: 'Kylo Ren',
            health: 130,
            baseHealth: 130,
            attack: 10,
            attackIncrement: 10,
            counterAttack: 20,
            image: 'assets/images/kylo.jpg'
        },

        // Object of characters with ID's paired with object names
        characterObject = {
            'luke-skywalker': lukeSkywalker,
            'darth-vader': darthVader,
            'obi-wan-kenobi': obiWanKenobi,
            'kylo-ren': kyloRen
        },

        // Declaring and initializing active character objects and win counter
        mainCharacter = {},
        defender = {},
        winCounter = 0;

    // Function to post and update win counter in status section
    function postWins() {
        $('#status-wins').empty();
        $('#status-wins').append('Wins: ' + winCounter);
    }

    // Function to call base HTML structure
    function renderStartContent() {
        $('body').append(
          '<div class="jumbotron">' +
            '<h1 class="text-center">STAR WARS</h1>' +
            '<p class="text-center lead">...the RPG</p>' +
          '</div>' +
          '<div class="container">' +
            '<div class="row">' +
              '<div class="col-md-12 col-sm-12 col-xs-12" id="starting-characters">' +

              '</div>' +
            '</div>' +

            '<div class="row">' +
              '<div class="col-md-4 col-sm-6 col-xs-12 main-character">' +

              '</div>' +

              '<div id="stats" class="col-md-4 col-sm-12 col-xs-12">' +
                '<div class="panel panel-default">' +
                  '<div class="panel-heading">' +
                    '<h2>Battle Zone</h2>' +
                  '</div>' +
                  '<div class="panel-body">' +

                    '<div class="panel panel-info">' +
                      '<div class="panel-heading">' +
                        '<h2 class="panel-title">Status:</h2>' +
                      '</div>' +

                      '<div class="panel-body">' +
                        '<div class="col-md-12 col-sm-12 col-xs-12">' +
                          '<p id="status-wins"></p>' +
                          '<p>R2\'s Battle Update:</p>' +
                          '<div id="status" class="well">' +

                          '</div>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +

                    '<div class="col-md-12 col-sm-12 col-xs-12" id="battle-zone">' +
                      '<div class="restart-row">' +
                        '<button id="restart" class="btn btn-warning btn-lg btn-block">' +
                          'Restart the Game' +
                        '</button>' +
                      '</div>' +
                      '<h6>Click the attack button to fight your opponent!</h6>' +
                      '<button id="attack" class="btn btn-danger btn-lg btn-block">' +
                        'Attack!' +
                      '</button>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +

              '<div class="col-md-4 col-sm-6 col-xs-12 defender pull-right">' +

              '</div>' +
            '</div>' +

            '<div class="row">' +
              '<div class="col-md-12 col-sm-12 col-xs-12">' +
                '<h3>Enemy Combatants:</h3>' +
              '</div>' +
              '<div class="col-md-12 col-sm-12 col-xs-12" id="enemies">' +

              '</div>' +
            '</div>' +
          '</div>'
        );
    }

    //  Function to call render the DOM
    function renderDom() {
      renderStartContent();
      createCharacters();
      generateCharacterPanels();
      $('.restart-row').hide();
      postWins();
    }

    //  Function that creates the character field in the DOM
    function createCharacters() {
        $('#starting-characters').append(
            '<div class="col-md-12 col-sm-12 col-xs-12">' +
            '<h2>Choose a character to start the game!</h2></div>' +
            '<div class="character col-md-2 col-sm-4 col-xs-12 ' +
            'luke-skywalker"></div>' +
            '<div class="character col-md-2 col-sm-4 col-xs-12 darth-vader">' +
            '</div><div class="character col-md-2 col-sm-4 col-xs-12 ' +
            'obi-wan-kenobi"></div><div ' +
            'class="character col-md-2 col-sm-4 col-xs-12 kylo-ren"></div>'
        );
    }

    //  Function that generates the available characters in the DOM
    function generateCharacterPanels() {
        jQuery.each( characterObject, function( i, val ) {
            $('.' + i ).append(
                '<div class="panel panel-default"><div ' +
                'class="panel-heading">' + val.name + '</div>' +
                '<div class="panel-body"><img class="img-responsive" ' +
                'src="' +  val.image + '"></div>' +
                '<div class="panel-footer">' + val.health + '</div></div>'
            );
        });
    }

    //  Function that generates the main character in the DOM
    function generateMainCharacter() {
        $('.main-character').append(
            '<h3>Your Character:</h3>' +
            '<div class="panel panel-primary"><div class="panel-heading">' +
            mainCharacter.name + '</div>' +
            '<div class="panel-body"><img class="img-responsive" src="' +
            mainCharacter.image + '"></div>' +
            '<div class="panel-footer">' + mainCharacter.health +
            '</div></div>'
        );
    }

    //  Function that generates the defender in the DOM
    function generateDefender() {
        $('.defender').append(
            '<h3>Your Opponent:</h3>' +
            '<div class="panel panel-danger"><div class="panel-heading">' +
            defender.name + '</div>' +
            '<div class="panel-body"><img class="img-responsive" src="' +
            defender.image + '"></div>' +
            '<div class="panel-footer">' + defender.health +
            '</div></div>'
        );
    }

    //  Function that adjusts data and alerts of a game lost
    function gameLost() {
        $('#status').append(
          '<div class="alert alert-dismissible alert-danger">' +
          'You have been defeated... <strong>GAME OVER!</strong></div>'
        );
        $('#attack').attr('disabled', true);
        showRestartBtn();
        restart();
    }

    // Function that adjusts data and alerts of a battle won
    function battleWon() {
        winCounter++;
        postWins();
        $('#status').append(
          '<div class="alert alert-success">You have defeated ' +
          defender.name + ', you can choose to fight another enemy...</div>'
        );
        $('#attack').attr('disabled', true);
        $('.defender').empty();
        defender = {};
        disableAttackBtn();
    }

    // Function that disables attack button
    function disableAttackBtn() {
        $('#attack').attr('disabled', false);
    }

    // Function that determines if the game was won
    function wasGameWon() {
        if (winCounter === 3) {
            $('#status').append('<h3>You Won the Game!</h3>');
            showRestartBtn();
            restart();
        };
    }

    // Function to unhide the restart button
    function showRestartBtn() {
        $('.restart-row').show();
    }

    // Function to empty the status panel of content
    function emptyStatusPanel() {
        $('#status').empty();
    }

    //  Function to handle logic of main character assignment
    function mainCharacterAssigner(a) {
        if ($(a).hasClass('luke-skywalker')) {
            mainCharacter = lukeSkywalker;
            $('.darth-vader').appendTo('#enemies');
            $('.obi-wan-kenobi').appendTo('#enemies');
            $('.kylo-ren').appendTo('#enemies');
        } else if ($(a).hasClass('darth-vader')) {
            mainCharacter = darthVader;
            $('.luke-skywalker').appendTo('#enemies');
            $('.obi-wan-kenobi').appendTo('#enemies');
            $('.kylo-ren').appendTo('#enemies');
        } else if ($(a).hasClass('obi-wan-kenobi')) {
            mainCharacter = obiWanKenobi;
            $('.luke-skywalker').appendTo('#enemies');
            $('.darth-vader').appendTo('#enemies');
            $('.kylo-ren').appendTo('#enemies');
        } else {
            mainCharacter = kyloRen;
            $('.luke-skywalker').appendTo('#enemies');
            $('.darth-vader').appendTo('#enemies');
            $('.obi-wan-kenobi').appendTo('#enemies');
        };
    }

    // Function to handle logic of defender assignment
    function defenderAssigner(b) {
        if (
            $(b).hasClass('luke-skywalker')
        ) {
            defender = lukeSkywalker;
        } else if (
            $(b).hasClass('darth-vader')
        ) {
            defender = darthVader;
        } else if (
            $(b).hasClass('obi-wan-kenobi')
        ) {
            defender = obiWanKenobi;
        } else if (
            $(b).hasClass('kylo-ren')
        ) {
            defender = kyloRen;
        };
    }

    // Function that updates the status panel with game updates each click
    function attackUpdates() {
        emptyStatusPanel();
        $('.main-character').empty();
        $('.defender').empty();
        defender.health = defender.health - mainCharacter.attack;
        mainCharacter.health = mainCharacter.health -
            defender.counterAttack;
        generateMainCharacter();
        generateDefender();
        $('#status').append(
            '<p>You attacked ' + defender.name + ' for ' +
            mainCharacter.attack +
            ' damage...</p><p>' + defender.name +
            ' attacked you back for ' +
            defender.counterAttack + ' damage...</p>'
        );
        mainCharacter.attack = mainCharacter.attack + mainCharacter.attackIncrement;

        if (mainCharacter.health <= 0) {
            gameLost();
        } else if (defender.health <= 0) {
            battleWon();
            wasGameWon();
        };
    }

    // Function that handles character assignments and attack clicking
    function gamePlay() {
        $('.character').on('click', function() {
            if (Object.keys(mainCharacter).length === 0) {
                mainCharacterAssigner(this);
                generateMainCharacter();
                $('#starting-characters').empty();
                $(this).addClass('chosen-character');
            } else if (
                (Object.keys(mainCharacter).length !== 0 &&
                Object.keys(defender).length === 0) &&
                (mainCharacter !== defender &&
                $(this).hasClass('chosen-character') === false)
              ) {
                defenderAssigner(this);
                $(this).hide();
                generateDefender();
            };
        });

        $('#attack').on('click', function() {
            if (Object.keys(defender).length === 0) {
                emptyStatusPanel();
                $('#status').append(
                    '<h4>No enemy here</h4>'
                );
            } else {
                attackUpdates();
            };
        });
    }

    // Function to reset the character objects to starting data
    function resetCharacterObjectData() {
        lukeSkywalker.health = lukeSkywalker.baseHealth;
        lukeSkywalker.attack = lukeSkywalker.attackIncrement;
        darthVader.health = darthVader.baseHealth;
        darthVader.attack = darthVader.attackIncrement;
        obiWanKenobi.health = obiWanKenobi.baseHealth;
        obiWanKenobi.attack = obiWanKenobi.attackIncrement;
        kyloRen.health = kyloRen.baseHealth;
        kyloRen.attack = kyloRen.attackIncrement;
    }


    // Function to restart the game
    function restart() {
        $('#restart').on('click', function() {
            mainCharacter = {},
            defender = {},
            winCounter = 0;
            resetCharacterObjectData();
            $('body').empty();
            renderDom();
            gamePlay();
        });
    }

    // Calling the functions to render the DOM and activate the game
    renderDom();
    gamePlay();
});
