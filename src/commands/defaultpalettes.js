const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function defaultPalettes(program) {
  program
    .command('defaultpalettes [file]')
    .alias('dp')
    .description('Convert public palettes export to default palettes file')
    .option(
      '-s, --firstsimple [name]',
      'Label of the first (and thus default) palette in an unordered list'
    )
    .option(
      '-c, --firstcontinuous [name]',
      'Label of the first (and thus default) palette in an unordered list'
    )
    .action(function(file, options) {
      if (file === undefined) {
        file = 'palettes.json';
      }
      var firstsimpleOption =
        options.firstsimple !== undefined ? options.firstsimple : false;
      var firstcontinuousOption =
        options.firstcontinuous !== undefined ? options.firstcontinuous : false;
      var palettesfile = path.resolve(file);

      var palettes = require(palettesfile);

      var defaults = {
        ColorPalette: []
      };
      allpalettes = palettes.data;
      var firstsimple = {};
      var firstcontinuous = {};
      var simpleP = 0;
      var contP = 0;
      for (var i = 0; i < allpalettes.length; i++) {
        var palette = allpalettes[i];

        var insert = {
          label: palette.content.label,
          description: 'unused',
          icon: 'unused',
          fillType: palette.content.fillType,
          //    defaultName: palette.content.label,
          fills: palette.content.fills
        };

        if (palette.content.valueType) {
          insert.valueType = palette.content.valueType;
        }

        if (insert.fillType == 'simple') {
          var label = (simpleP + 1) % 10;
          insert.label = 'IDS_PALETTE_' + label;
          insert.id = 'colorPalette' + simpleP;
          simpleP++;
        }
        if (insert.fillType === 'continuous') {
          // The first continuous entry must have the blue name without a number;
          insert.id = contP
            ? 'blueContinuousSequential'
            : 'blueContinuousSequential' + contP;
          insert.label = 'IDS_PALETTE_CONTINUOUS_BLUE';
          contP++;
        }

        if (simpleP == 0) {
          firstsimple = insert;
        } else {
          if (palette.content.label === firstsimpleOption) {
            // remove the first item
            // put the current item at the top
            // add the (stored) first item at the end
            defaults.ColorPalette.shift();
            firstsimple.id = insert.id;
            insert.id = 'colorPalette0';
            defaults.ColorPalette.unshift(insert);
            insert = firstsimple;
          } else {
          }
        }

        if (contP == 0) {
          firstcontinuous = insert;
        } else {
          if (palette.content.label === firstcontinuousOption) {
            // remove the first item
            // put the current item at the top
            // add the (stored) first item at the end
            defaults.ColorPalette.shift();
            firstcontinuous.id = insert.id;
            insert.id = 'colorPalette0';
            defaults.ColorPalette.unshift(insert);
            insert = firstcontinuous;
          } else {
          }
        }

        defaults.ColorPalette.push(insert);
      }
      var str = JSON.stringify(defaults, null, 4);

      console.log(str);

      return program;
    });
}

module.exports = defaultPalettes;
