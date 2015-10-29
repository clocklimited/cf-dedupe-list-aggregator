var _ = require('lodash')
  , createNoDedupeListAggregator = require('cf-list-aggregator')

_.extend(createAggregator, createNoDedupeListAggregator)

module.exports = createAggregator

function createAggregator (listService, sectionService, crudService, options) {

  function aggregate (lists, dedupe, limit, section, cb) {
    var listAggregator = createNoDedupeListAggregator(listService, sectionService, crudService, options)

    if (typeof limit !== 'number') limit = Infinity

    // If section isn't defined, use the old API
    if (typeof section === 'function') {
      options.logger.warn('Section has not be passed as an argument, ' +
        '{CURRENT} and {CURRENTANDCHILD} in lists will NOT work')
      cb = section
      section = {}
    }

    listAggregator(lists, dedupe, null, section, function (error, items) {

      if (error) return cb(error)

      if (!dedupe) return cb(null, Number.isFinite(limit) ? items.slice(0, limit) : items)

      var toReturn = []

      // Handle the dedupe consumption
      items.some(function (item) {

        // Using `.some`, returning false will stop the
        // iteration once enough items have been gathered
        if (toReturn.length >= limit) return true

        // Custom items don't have IDs and are never deduped
        if (!item._id) {
          toReturn.push(item)
          return false
        }

        if (!dedupe.has(item._id)) {
          dedupe(item._id)
          toReturn.push(item)
          return false
        }

        return false

      })

      cb(null, toReturn)

    })
  }

  return aggregate
}
