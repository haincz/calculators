const ArticleData = require("./articleSchema.js")

function getList() {
    return new Promise((resolve, reject) => {

        ArticleData.find({}).sort({ _id: -1 }).limit(20).exec()
            .then((data) => resolve(data))
            .catch((err) => reject(err))
    })
}


function getCategory(param) {

    return new Promise((resolve, reject) => {

        ArticleData.find({}).where("category").equals(param).sort({ _id: -1 }).limit(20).exec()
            .then((data) => resolve(data))
            .catch((err) => reject(err))
    })

}

function getArticle(param) {
    
    let slug = `${param.category}/${param.url}/${param.id}`

    return new Promise((resolve, reject) => {

        ArticleData.find({category:param.category, url:slug}).exec()
            .then((data) => resolve(data))
            .catch((err) => reject(err))
    
    })
}



module.exports = {
    getList: getList,
    getCategory: getCategory,
    getArticle:getArticle
};