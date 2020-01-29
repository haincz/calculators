const dataNetto = require("./databruttonetto");
const fs = require("fs");
const path = require("path");

function getData (url) {

    var id = dataNetto.filter(function(elem){
    		return elem.slug === url
    	})[0];

    if (id === undefined){
        return null
    } else {    

        return {
        	title:dataNetto[id.id].title,
        	ampslug:"/kalkulator-wynagrodzen/amp" + dataNetto[id.id].ampslug,
            h1:dataNetto[id.id].h1,
            PensjaNetto: dataNetto[id.id].PensjaNetto,
            UbezpiecznieSpołeczne:dataNetto[id.id].UbezpiecznieSpołeczne,
            SkładkaZdrowotna: dataNetto[id.id].SkładkaZdrowotna,
            ZaliczkaNaPodatek:dataNetto[id.id].ZaliczkaNaPodatek,
            content: dataNetto[id.id].content,
            getLastAdd:getLastAdd()
        };
    }
}

function getLastAdd () {

    let lastAdd = dataNetto.slice(-5);

    let asideData =   '';            

    for (let i = 0; i < lastAdd.length; i++){

       asideData += `<a href="/kalkulator-wynagrodzen${lastAdd[i].slug}" class="list-group-item">${lastAdd[i].h1}</a>`

    }

    return asideData

}


function getDataAmp (url){
    
    var id = dataNetto.filter(function(elem){
        return elem.ampslug === url
    })[0];

    if (id === undefined){
        return null
    } else { 

        return {
            title:dataNetto[id.id].title,
            h1:dataNetto[id.id].h1,
            PensjaNetto: dataNetto[id.id].PensjaNetto,
            UbezpiecznieSpołeczne:dataNetto[id.id].UbezpiecznieSpołeczne,
            SkładkaZdrowotna: dataNetto[id.id].SkładkaZdrowotna,
            ZaliczkaNaPodatek:dataNetto[id.id].ZaliczkaNaPodatek,
            content: dataNetto[id.id].content,
            canonical: "/kalkulator-wynagrodzen" + dataNetto[id.id].slug
        };

    };

};

function countSalary(data) {

    var id = dataNetto.length
    var procentSkladkiEmerytalnej = 0.0976;
        var prcentSkladkiRentowej = 0.015;
        var procentSkladkiChorobowej = 0.0245;
        var procentSkladkiZdrowotnej = 0.09;
        var kosztyUzyskaniaPrzychodu = 111.25;
        var podatekDochodowy = 0.18;
        var kwotaWolnaOdPodatku = 46.33;
        var procentSkladkiZdrowotnejOdliczony = 0.0775;

        var ubezpieczeniespoleczne;
        var ubezpieczeniezdrowotne;
        var skladkaZdrowotnaOdliczona;
        var zaliczkaNaPodatekDochodowy;
        var pensjaNetto;
        var sallaryNetto;

        var pensjaSkladkiNetto = {
            skladkaEmerytalna: data * procentSkladkiEmerytalnej,
            skladkaRentowa: data * prcentSkladkiRentowej,
            skladkaChorobowa: data * procentSkladkiChorobowej,
        }

        ubezpieczeniespoleczne = pensjaSkladkiNetto.skladkaEmerytalna + pensjaSkladkiNetto.skladkaRentowa + pensjaSkladkiNetto.skladkaChorobowa;
        ubezpieczeniezdrowotne = (data - ubezpieczeniespoleczne) * procentSkladkiZdrowotnej;
        skladkaZdrowotnaOdliczona = (data - ubezpieczeniespoleczne) * procentSkladkiZdrowotnejOdliczony;
        zaliczkaNaPodatekDochodowy = (data - ubezpieczeniespoleczne - kosztyUzyskaniaPrzychodu) * podatekDochodowy - kwotaWolnaOdPodatku - skladkaZdrowotnaOdliczona;
        pensjaNetto = data - ubezpieczeniespoleczne - ubezpieczeniezdrowotne - zaliczkaNaPodatekDochodowy;

        var dataToSave = {
            id: id,
            title: data + " brutto ile to netto - Kalkulator Wynagrodzeń 2019",
            slug: "/" + data + "-brutto-ile-to-netto.html",
            ampslug: "/" + data + "-brutto-ile-to-netto.amp",
            h1: data + " brutto ile to netto",
            PensjaNetto: "Pensja Netto: " + pensjaNetto.toFixed(2),
            UbezpiecznieSpołeczne: "Ubezpiecznie społeczne: " + ubezpieczeniespoleczne.toFixed(2),
            SkładkaZdrowotna: "Składka Zdrowotna: " + skladkaZdrowotnaOdliczona.toFixed(2),
            ZaliczkaNaPodatek: "Zaliczka na podatek: " + zaliczkaNaPodatekDochodowy.toFixed(2),
        }

       save(dataToSave);


}


function save(dataToSave) {

    dataNetto.push(dataToSave);

    fs.writeFile(path.join(__dirname, "databruttonetto.json"), JSON.stringify(dataNetto, null, 4));

}


function addNewData (data) {

    var url = "/" + data + "-brutto-ile-to-netto.html";

    if (getData(url) === null) {
        countSalary(data);
    }

}


function siteMapGenerator (dataNetto){
    var sitemapUrls = dataNetto.map(function (data) {
        return "calculators.pl/kalkulator-wynagrodzen" + data.slug;
    })
    
    var xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    for (var i in sitemapUrls) {
        xml += '<url>';
        xml += '<loc>' + "http://" + sitemapUrls[i] + '</loc>';
        xml += '</url>';
        i++;
    }
    xml += '</urlset>';
    return xml;

}


module.exports = {
    data: getData,
    ampData: getDataAmp,
    add: addNewData,
    siteMapGenerator: siteMapGenerator,
};