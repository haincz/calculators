const moongose = require('mongoose');

const articleSchema = new moongose.Schema({

    "type": String,
    "title": String,
    "url": String,
    "datePublished": String,
    "dateModified":String,
    "lead": String,
    "content": String,
    "image": String,
    "author": String,
    "publisher": String,
    "category": String,
    "titleSeo":String

});

module.exports = moongose.model("articles", articleSchema);