$(document).ready(function() {
    var lukeSkywalker = {
        name: 'Luke Skywalker',
        health: 100,
        attack: 5,
        image: 'assets/images/luke.jpg'
    };

    var darthVader = {
        name: 'Darth Vader',
        health: 180,
        attack: 25,
        image: 'assets/images/vader.jpg'
    };

    var obiWanKenobi = {
        name: 'Obi-Wan Kenobi',
        health: 120,
        attack: 8,
        image: 'assets/images/kenobi.jpg'
    };

    var kyloRen = {
        name: 'Kylo Ren',
        health: 150,
        attack: 20,
        image: 'assets/images/kylo.jpg'
    };

    var mainCharacter = {};
    var enemies = [];
    var defender = {};

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
            $(this).appendTo('#main-character');
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
            $(this).appendTo('#defender');
        };
        console.log(mainCharacter);
        console.log(defender);
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
