function Location() {
    this.url = window.location.href
}
function getApiDataForCurrency() {
    var e = "http://api.nbp.pl/api/exchangerates/rates/a/" + codeLocattion.findValueCode() + "/last/28/";
    $.ajax({
        url: e + "?format=json",
        method: "GET",
        success: drawCrosshairs
    })
}
function drawCrosshairs(e) {
    function t() {
        var t = google.visualization.arrayToDataTable([["dzień", "kurs"], [e.rates[0].effectiveDate, e.rates[0].mid], [e.rates[1].effectiveDate, e.rates[1].mid], [e.rates[2].effectiveDate, e.rates[2].mid], [e.rates[3].effectiveDate, e.rates[3].mid], [e.rates[4].effectiveDate, e.rates[4].mid], [e.rates[5].effectiveDate, e.rates[5].mid], [e.rates[6].effectiveDate, e.rates[6].mid], [e.rates[7].effectiveDate, e.rates[7].mid], [e.rates[8].effectiveDate, e.rates[8].mid], [e.rates[9].effectiveDate, e.rates[9].mid], [e.rates[10].effectiveDate, e.rates[10].mid], [e.rates[11].effectiveDate, e.rates[11].mid], [e.rates[12].effectiveDate, e.rates[12].mid], [e.rates[13].effectiveDate, e.rates[13].mid], [e.rates[14].effectiveDate, e.rates[14].mid], [e.rates[15].effectiveDate, e.rates[15].mid], [e.rates[16].effectiveDate, e.rates[16].mid], [e.rates[17].effectiveDate, e.rates[17].mid], [e.rates[18].effectiveDate, e.rates[18].mid], [e.rates[19].effectiveDate, e.rates[19].mid], [e.rates[20].effectiveDate, e.rates[20].mid], [e.rates[21].effectiveDate, e.rates[21].mid], [e.rates[22].effectiveDate, e.rates[22].mid], [e.rates[23].effectiveDate, e.rates[23].mid], [e.rates[24].effectiveDate, e.rates[24].mid], [e.rates[25].effectiveDate, e.rates[25].mid], [e.rates[26].effectiveDate, e.rates[26].mid], [e.rates[27].effectiveDate, e.rates[27].mid]])
          , a = {
            title: "Uśredniony kurs waluty na podstawie danych NBP",
            curveType: "function",
            legend: {
                position: "bottom"
            }
        };
        new google.visualization.LineChart(document.getElementById("curve_chart")).draw(t, a)
    }
    google.charts.load("current", {
        packages: ["corechart"]
    }),
    google.charts.setOnLoadCallback(t),
    $("#todayCours").append(e.rates[27].mid)
}
function gerApiDataAskBid() {
    var e = "http://api.nbp.pl/api/exchangerates/rates/c/" + codeLocattion.findValueCode() + "/last/1/";
    $.ajax({
        url: e + "?format=json",
        method: "GET",
        success: showAskBid
    })
}
function showAskBid(e) {
    var t = e.rates[0].ask
      , a = e.rates[0].bid
      , r = e.rates[0].effectiveDate;
    askBidContent = "                         <h2>                         <p>Kupno z dnia " + r + ": <strong>" + t + "</strong></p>                         <p>Sprzedaż z dnia " + r + ": <strong>" + a + "</strong></p>                         ",
    $("#showAskBid").append(askBidContent)
}
Location.prototype.findValueCode = function() {
    var e = this.url.slice(0, -5);
    return e.substr(e.length - 3)
}
;
var codeLocattion = new Location;
getApiDataForCurrency(),
gerApiDataAskBid();
