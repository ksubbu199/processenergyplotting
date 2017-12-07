function hbsHelpers(hbs) {
  return hbs.create({
    helpers: { // This was missing
      inc: function(value, options) {
        console.log('reading it');
        return parseInt(value) + 1;
      },
      xif:  function (expression, options) {
              return hbs.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
      },
      yif:  function(v1, v2, options) {
              if(v1 === v2) {
                return options.fn(this);
              }
            return options.inverse(this);
      }

      // More helpers...
    }

  });
}

module.exports = hbsHelpers;
