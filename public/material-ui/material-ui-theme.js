var mui = require('material-ui');
var Colors = require('./colors');

module.exports = {
  getPalette: function() {
    return {
      primary1Color: Colors.purple500,
      primary2Color: Colors.purple700,
      primary3Color: Colors.purple100,
      textColor: Colors.darkWhite
    };
  },
  getComponentThemes: function(palette, spacing) {
    return {
      appBar: {
        color: palette.primary1Color,
        textColor: Colors.darkWhite,
        // height: spacing.desktopKeylineIncrement,
      },
    };
  }
};