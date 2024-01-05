var schemata = require('schemata')
  , validity = require('validity')
  , metaSchema = require('./meta-schema')

module.exports = function () {
  return schemata(
    { _id:
      { type: String }
    , type:
      { type: String
      , validators:
        { all: [validity.required]
        }
      }
    , tag:
      { type: String
      , validators:
        { all: [validity.required]
        }
      }
    , meta:
      { type: schemata.Array(metaSchema())
      }
    , dateCreated:
      { type: Date
      , defaultValue: function () { return new Date() }
      }
    }
  )
}
