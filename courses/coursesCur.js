const dataCourse = require("./datacourses");

function getData (url) {

    console.log(url)

    var id = dataCourse.filter(function(elem){
    		return elem.slug === url
    	})[0];

    if (id === undefined){
        return null
    } else {    

        return {
        	title:dataCourse[id.id].name,
            name:dataCourse[id.id].name,
            content: dataCourse[id.id].content
        };
    }
}


module.exports = {
    data: getData
};