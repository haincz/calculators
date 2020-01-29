const express = require("express");
const dataNetto = require("../netto_brutto/databruttonetto.json");
const nettoBrutto = require("../netto_brutto/netto-brutto");
const coursesCur = require("../courses/coursesCur");




const router = express.Router({strict: true});

router.get('/kalkulator-wynagrodzen/', function (req, res) {
    res.render('kalkulator-wynagrodzen',{
        title: "Kalkulator wynagrodzeń Brutto Netto 2020"
    });
});

router.get('/kalkulator-wynagrodzen', function (req, res) {
    res.redirect(301, '/kalkulator-wynagrodzen/')  
});

router.get('/kalkulator-wynagrodzen', function (req, res) {
    res.redirect(301, '/kalkulator-wynagrodzen/')  
});

router.post('/kalkulator-wynagrodzen/', function (req, res) {
    var postData = req.body.kalkulatorwynagrodzen;    
    if (isNaN(postData) === true){
        
    res.redirect(301, '/kalkulator-wynagrodzen/')    

     } else {

    var slug = req.body.kalkulatorwynagrodzen + "-brutto-ile-to-netto.html";
    nettoBrutto.add(req.body.kalkulatorwynagrodzen)
    res.redirect(301, '/kalkulator-wynagrodzen/' + slug)
    
    }
});

router.get('/kalkulator-wynagrodzen/:slug', function (req, res, next) {

    var url = "/" + req.params.slug;

    if ( nettoBrutto.data(url) === null){
        res.redirect(301, '/kalkulator-wynagrodzen/')
    } else {
       res.render('netto-brutto', nettoBrutto.data(url));
    }
});

router.get('/kalkulator-wynagrodzen/amp/:slug', function (req, res, next) {


    var url = "/" + req.params.slug;


    if ( nettoBrutto.ampData(url) === null){
       res.redirect(301, "/kalkulator-wynagrodzen/")    
    } else {
        res.render('netto-brutto-amp', nettoBrutto.ampData(url));    
    }

});


router.get('/kursy-walut/', function (req, res, next) {



    res.render('kursy-walut',{
        title:"Kursy Walut. Notowania Walut - wykresy",
        h1:"Kursy walut"
    });
    

});


router.get('/kursy-walut/:slug', function (req, res, next) {

    var url = "/kursy-walut/" + req.params.slug;

    if (coursesCur.data(url) === null){
        res.redirect(301, '/kursy-walut/')
    } else {
       res.render('course-single', coursesCur.data(url));
    }
});

router.get('/kalkulator-walut/', function(req, res){

    res.render('kalkulator-walut');

})

router.get('/ustawienia-przegladarek', function(req, res){

    res.render('ustawienia-przegladarek',{
        title:"Ustawienia przeglądarek",
        meta: "noindex"
    });

})

router.get('/polityka-prywatnosci', function(req, res){

    res.render('polityka-prywatnosci', {
        title:"Polityka prywatności",
        meta: "noindex"
    });

})



router.get('/sitemap-nettobrutto.xml', function(req, res){

    var sitemap = nettoBrutto.siteMapGenerator(dataNetto);
    res.header('Content-Type', 'text/xml');
    res.send(sitemap);     


});

module.exports = router;