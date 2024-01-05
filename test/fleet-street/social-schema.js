var schemata = require('schemata')
  , socialSchema = schemata(
    { platform:
      { type: String
      , defaultValue: 'Platform'
      }
  , text:
      { type: String
      , defaultValue: 'Text'
      }
  , enabled:
      { type: Boolean
      , defaultValue: true
      }
  })

module.exports = function () {
  return socialSchema
}
