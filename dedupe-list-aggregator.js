var _ = require('lodash')
  , createNoDedupeListAggregator = require('cf-list-aggregator')

_.extend(createAggregator, createNoDedupeListAggregator)

module.exports = createAggregator

function createAggregator(listService, sectionService, articleService, options) {

  function aggregate(lists, dedupe, limit, section, cb) {
    var listAggregator = createNoDedupeListAggregator(listService, sectionService, articleService, options)

    if (typeof limit !== 'number') limit = Infinity

    // If section isn't defined, use the old API
    if (typeof section === 'function') {
      options.logger.warn('Section has not be passed as an argument, ' +
        '{CURRENT} and {CURRENTANDCHILD} in lists will NOT work')
      cb = section
      section = {}
    }

    listAggregator(lists, dedupe, null, section, function (error, articles) {

      if (error) return cb(error)

      var returnArticles = []

      if (dedupe) {

        // Handle the dedupe consumption
        articles.some(function (article) {
          if (returnArticles.length >= limit) return false

          if (article.type === 'custom') {
            returnArticles.push(article)
          } else if (!dedupe.has(article._id)) {
            // Only add non-custom to deduper
            dedupe(article._id)
            returnArticles.push(article)
          }
        })
      } else {
        returnArticles = Number.isFinite(limit) ? articles.slice(0, limit) : articles
      }

      cb(null, returnArticles)
    })
  }

  return aggregate
}
