const TextFilter = require('bad-words');

const filter = new TextFilter();

async function profanityFilter(text) {
    if (filter.isProfane(text)) {
        return true
    }
    else {
        return false
    }
}

module.exports = profanityFilter;