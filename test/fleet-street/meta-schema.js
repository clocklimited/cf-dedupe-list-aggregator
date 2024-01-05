var schemata = require('schemata')

module.exports = function () {
  return schemata(
    { key:
      { type: String
      }
    , value:
      { type: String
      }
    }
  )
}
