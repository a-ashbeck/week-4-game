$(document).ready(function() {
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

        characterObject = {
            'luke-skywalker': lukeSkywalker,
            'darth-vader': darthVader,
            'obi-wan-kenobi': obiWanKenobi,
            'kylo-ren': kyloRen
        },

        mainCharacter = {},
        defender = {},
        winCounter = 0;

    function postWins() {
        $('#status-wins').empty();
        $('#status-wins').append('Wins: ' + winCounter);
    }

    function renderDom() {
      $('body').append(
        '<div class="jumbotron"><h1 class="text-center">STAR WARS</h1><p class="text-center lead">...the RPG</p></div><div class="container"><div class="row"><div class="col-md-12 col-sm-12 col-xs-12" id="starting-characters"></div></div><div class="row"><div class="col-md-4 col-sm-6 col-xs-12 main-character"></div><div id="stats" class="col-md-4 col-sm-12 col-xs-12"><div class="panel panel-default"><div class="panel-heading"><h2>Battle Zone</h2></div><div class="panel-body"><div class="panel panel-info"><div class="panel-heading"><h2 class="panel-title">Status:</h2></div><div class="panel-body"><div class="col-md-12 col-sm-12 col-xs-12"><p id="status-wins"></p><p>R2\'s Battle Update:</p><div id="status" class="well"></div></div></div></div><div class="col-md-12 col-sm-12 col-xs-12" id="battle-zone"><div class="restart-row"><button id="restart" class="btn btn-warning btn-lg btn-block">Restart the Game</button></div><h6>Click the attack button to fight your opponent!</h6><button id="attack" class="btn btn-danger btn-lg btn-block">Attack!</button></div></div></div></div><div class="col-md-4 col-sm-6 col-xs-12 defender pull-right"></div></div><div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><h3>Enemy Combatants:</h3></div><div class="col-md-12 col-sm-12 col-xs-12" id="enemies"></div></div></div>'
      );
      createCharacters();
      generateCharacterPanels();
      $('.restart-row').hide();
      postWins();
    }

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

    function gameLost() {
        $('#status').append(
          '<div class="alert alert-dismissible alert-danger">' +
          'You have been defeated... <strong>GAME OVER!</strong></div>'
        );
        $('#attack').attr('disabled', true);
        $('.restart-row').show();
    }

    function battleWon() {
        winCounter++;
        postWins();
        $('#status').append(
          '<div class="alert alert-success">You have defeated ' +
          defender.name + ', you can choose to fight another enemy.</div>'
        );
        $('#attack').attr('disabled', true);
        $('.defender').empty();
        defender = {};
        disableAttackBtn();
    }

    function disableAttackBtn() {
        $('#attack').attr('disabled', false);
    }

    function wasGameWon() {
        if (winCounter === 3) {
            $('#status').append('<h3>You Won the Game!</h3>');
            $('.restart-row').show();
        };
    }

    function emptyStatusPanel() {
        $('#status').empty();
    }

    renderDom();

    // Logic dictating where characters are assigned based on click order
    $('.character').on('click', function() {
        if (Object.keys(mainCharacter).length === 0) {
            if ($(this).hasClass('luke-skywalker')) {
                mainCharacter = lukeSkywalker;
                $('.darth-vader').appendTo('#enemies');
                $('.obi-wan-kenobi').appendTo('#enemies');
                $('.kylo-ren').appendTo('#enemies');
            } else if ($(this).hasClass('darth-vader')) {
                mainCharacter = darthVader;
                $('.luke-skywalker').appendTo('#enemies');
                $('.obi-wan-kenobi').appendTo('#enemies');
                $('.kylo-ren').appendTo('#enemies');
            } else if ($(this).hasClass('obi-wan-kenobi')) {
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

            generateMainCharacter();
            $('#starting-characters').empty();
            $(this).addClass('chosen-character');
        } else if (
            (Object.keys(mainCharacter).length !== 0 &&
            Object.keys(defender).length === 0) &&
            (mainCharacter !== defender &&
            $(this).hasClass('chosen-character') === false)
          ) {
            if (
                $(this).hasClass('luke-skywalker')
            ) {
                defender = lukeSkywalker;
            } else if (
                $(this).hasClass('darth-vader')
            ) {
                defender = darthVader;
            } else if (
                $(this).hasClass('obi-wan-kenobi')
            ) {
                defender = obiWanKenobi;
            } else if (
                $(this).hasClass('kylo-ren')
            ) {
                defender = kyloRen;
            };

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
                ' damage.</p><p>' + defender.name + ' attacked you back for ' +
                defender.counterAttack + ' damage.</p>'
            );
            mainCharacter.attack = mainCharacter.attack + mainCharacter.attackIncrement;

            if (mainCharacter.health <= 0) {
                gameLost();
            } else if (defender.health <= 0) {
                battleWon();
                wasGameWon();
            };
        };
    });

    // Function to restart the game at any given moment
    $('#restart').on('click', function() {
        // $('#starting-characters').empty();
        // $('.main-character').empty();
        // $('.defender').empty();
        // $('#enemies').empty();
        // mainCharacter = {};
        // defender = {};
        // lukeSkywalker.health = lukeSkywalker.baseHealth;
        // lukeSkywalker.attack = lukeSkywalker.attackIncrement;
        // darthVader.health = darthVader.baseHealth;
        // darthVader.attack = darthVader.attackIncrement;
        // obiWanKenobi.health = obiWanKenobi.baseHealth;
        // obiWanKenobi.attack = obiWanKenobi.attackIncrement;
        // kyloRen.health = kyloRen.baseHealth;
        // kyloRen.attack = kyloRen.attackIncrement;
        // createCharacters();
        // $('#attack').attr('disabled', false);
        // $('#status').empty();
        // $('#restart').hide();
        location.reload(true);
    });
});
