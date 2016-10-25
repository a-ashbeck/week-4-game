$(document).ready(function() {
    var lukeSkywalker = {
        name: 'Luke Skywalker',
        health: 100,
        baseHealth: 100,
        attack: 5,
        attackIncrement: 5,
        image: 'assets/images/luke.jpg'
    };

    var darthVader = {
        name: 'Darth Vader',
        health: 180,
        baseHealth: 180,
        attack: 25,
        attackIncrement: 25,
        image: 'assets/images/vader.jpg'
    };

    var obiWanKenobi = {
        name: 'Obi-Wan Kenobi',
        health: 120,
        baseHealth: 120,
        attack: 8,
        attackIncrement: 8,
        image: 'assets/images/kenobi.jpg'
    };

    var kyloRen = {
        name: 'Kylo Ren',
        health: 150,
        baseHealth: 150,
        attack: 20,
        attackIncrement: 20,
        image: 'assets/images/kylo.jpg'
    };

    var mainCharacter = {};
    var defender = {};
    var winCounter = 0;

    function createCharacters() {
        $('#starting-characters').append(
            '<div class="col-md-12 col-sm-12 col-xs-12">' +
            '<h2>Choose a character to start the game!</h2></div>' +
            '<div class="character col-md-3 col-sm-6 col-xs-12 ' +
            'luke-skywalker"></div>' +
            '<div class="character col-md-3 col-sm-6 col-xs-12 darth-vader">' +
            '</div><div class="character col-md-3 col-sm-6 col-xs-12 ' +
            'obi-wan-kenobi"></div><div ' +
            'class="character col-md-3 col-sm-6 col-xs-12 kylo-ren"></div>'
        );
        // Creates html and outputs character object data for Luke Skywalker
        $('.luke-skywalker').append(
            '<div class="panel panel-default"><div class="panel-heading">' +
            lukeSkywalker.name + '</div>' +
            '<div class="panel-body"><img class="img-responsive" src="' +
            lukeSkywalker.image + '"></div>' +
            '<div class="panel-footer">' + lukeSkywalker.health + '</div></div>'
        );

        // Creates html and outputs character object data for Darth Vader
        $('.darth-vader').append(
            '<div class="panel panel-default"><div class="panel-heading">' +
            darthVader.name + '</div>' +
            '<div class="panel-body"><img class="img-responsive" src="' +
            darthVader.image + '"></div>' +
            '<div class="panel-footer">' + darthVader.health + '</div></div>'
        );

        // Creates html and outputs character object data for Obi-Wan Kenobi
        $('.obi-wan-kenobi').append(
            '<div class="panel panel-default"><div class="panel-heading">' +
            obiWanKenobi.name + '</div>' +
            '<div class="panel-body"><img class="img-responsive" src="' +
            obiWanKenobi.image + '"></div>' +
            '<div class="panel-footer">' + obiWanKenobi.health + '</div></div>'
        );

        // Creates html and outputs character object data for Kylo Ren
        $('.kylo-ren').append(
            '<div class="panel panel-default"><div class="panel-heading">' +
            kyloRen.name + '</div>' +
            '<div class="panel-body"><img class="img-responsive" src="' +
            kyloRen.image + '"></div>' +
            '<div class="panel-footer">' + kyloRen.health + '</div></div>'
        );
    }

    createCharacters();
    $('.restart-row').hide();

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

            $('.main-character').append(
                '<div class="panel panel-info"><div class="panel-heading">' +
                mainCharacter.name + '</div>' +
                '<div class="panel-body"><img class="img-responsive" src="' +
                mainCharacter.image + '"></div>' +
                '<div class="panel-footer">' + mainCharacter.health +
                '</div></div>'
            );

            $('#starting-characters').empty();
            $(this).addClass('chosen-character');
        } else if (
            (Object.keys(mainCharacter).length !== 0 &&
            Object.keys(defender).length === 0) &&
            (mainCharacter !== defender &&
            $(this).hasClass('chosen-character') === false)
          ) {
            if (
                $(this).hasClass('character') &&
                $(this).hasClass('luke-skywalker')
            ) {
                defender = lukeSkywalker;
            } else if (
                $(this).hasClass('character') &&
                $(this).hasClass('darth-vader')
            ) {
                defender = darthVader;
            } else if (
                $(this).hasClass('character') &&
                $(this).hasClass('obi-wan-kenobi')
            ) {
                defender = obiWanKenobi;
            } else if (
                $(this).hasClass('character') &&
                $(this).hasClass('kylo-ren')
            ) {
                defender = kyloRen;
            };

            $(this).hide();

            $('.defender').append(
                '<div class="panel panel-danger"><div class="panel-heading">' +
                defender.name + '</div>' +
                '<div class="panel-body"><img class="img-responsive" src="' +
                defender.image + '"></div>' +
                '<div class="panel-footer">' + defender.health +
                '</div></div>'
            );
        };
    });

    $('#attack').on('click', function() {
        if (Object.keys(defender).length === 0) {
            $('#status').empty();
            $('#status').append(
                '<h3>No enemy here</h3>'
            );
        } else {
            $('#status').empty();
            $('.main-character').empty();
            $('.defender').empty();
            defender.health = defender.health - mainCharacter.attack;
            mainCharacter.health = mainCharacter.health - defender.attack;
            $('.main-character').append(
                '<div class="panel panel-info"><div class="panel-heading">' +
                mainCharacter.name + '</div>' +
                '<div class="panel-body"><img class="img-responsive" src="' +
                mainCharacter.image + '"></div>' +
                '<div class="panel-footer">' + mainCharacter.health +
                '</div></div>'
            );
            $('.defender').append(
                '<div class="panel panel-danger"><div class="panel-heading">' +
                defender.name + '</div>' +
                '<div class="panel-body"><img class="img-responsive" src="' +
                defender.image + '"></div>' +
                '<div class="panel-footer">' + defender.health +
                '</div></div>'
            );
            $('#status').append(
                '<p>You attacked ' + defender.name + ' for ' +
                mainCharacter.attack +
                ' damage.</p><p>' + defender.name + ' attacked you back for ' +
                defender.attack + ' damage.</p>'
            );
            mainCharacter.attack = mainCharacter.attack + mainCharacter.attackIncrement;

            if (mainCharacter.health <= 0) {
                $('#status').append(
                  '<h3>You have been defeated... GAME OVER!</h3>'
                );
                $('#attack').attr('disabled', true);
                $('.restart-row').show();
            } else if (defender.health <= 0) {
                winCounter++;
                $('#status').append(
                  '<h3>You have defeated ' + defender.name + ', you can choose to fight another enemy.</h3>'
                );
                $('#attack').attr('disabled', true);
                $('.defender').empty();
                defender = {};
                disableAttackBtn();
                wasGameWon();
            };
        };
    });

    function disableAttackBtn() {
        $('#attack').attr('disabled', false);
    }

    function wasGameWon() {
        if (winCounter === 3) {
            $('#status').append('<h3>You Won the Game!</h3>');
            $('.restart-row').show();
        };
    }

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


    // push object.health of each defender to this array
    // var defenderHealthArray = [];

    // if (defenderHealthArray <= [0, 0, 0]) {
        // Display you win!
        // Give option to restart
    // };

    // if (mainCharacter.health <= 0) {
        // Display you lose!
        // give option to restart
    // };

    // The first character click assign mainCharacter the selected character object.
    // remaining character clicks assign character object to defender.
    //
    //
    // restart function will activate upon click of restart button, and will reset all object data back to baseline and move all elements back to their original positions and colors.

});
