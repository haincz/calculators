const articles = require("../articles/articles.js")
const express = require("express");

const articleRouter = express.Router();

articleRouter.get('/', (req, res) => {

    articles.getList().then((data) => {

        if (data.length === 0){
            res.status(404)
        } 

        res.render('category', {
            article_list: data,
            categoryTitle: "Najnowsze artykuły"
        })
    })
})



articleRouter.get('/:category', (req, res) => {

    articles.getCategory(req.params.category).then((data) => {

        if (data.length === 0){
            res.status(404)
        } 

        res.render('category', {
            article_list: data,
            categoryTitle: req.params.category
        })
    })

})


articleRouter.get('/:category/:url/:id', (req, res) => {


    articles.getArticle(req.params).then((data) => {

        if (data.length === 0){
            res.status(404)
        }

        const { title, lead, content, author, image, titleSeo, datePublished, url, dateModified, publisher } = data[0]

        let articleDate = datePublished.slice(0,-5);

        res.render('article', {
            title: title,
            lead: lead,
            content: content,
            author: author,
            image: image,
            titleSeo: titleSeo,
            datePublished: datePublished,
            articleDate: articleDate,
            dateModified:dateModified,
            url: url,
            publisher:publisher
        })
    })

})



module.exports = articleRouter;