# cf-dedupe-list-aggregator

[![Greenkeeper badge](https://badges.greenkeeper.io/clocklimited/cf-dedupe-list-aggregator.svg)](https://greenkeeper.io/)

Dedupe version of cf-dedupe-list-aggregator

## Installation

      npm install --save cf-dedupe-list-aggregator

## Usage

```js
var aggregate = createDedupeAggregator(listService, sectionService, articleService, { logger: logger })

aggregate(listId, dedupe, limit, section, function (err, results) {})
```

## Credits
Built by developers at [Clock](http://clock.co.uk).

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
