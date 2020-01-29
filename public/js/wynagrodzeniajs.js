$(document).ready(function() {

	var yourSalaryBrutto;

	function obliczWynagrodzenie(yourSalaryBrutto) {

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
		var	pensjaNetto;
		var sallaryNetto;

		var pensjaSkladkiNetto = {
			skladkaEmerytalna: yourSalaryBrutto * procentSkladkiEmerytalnej,
			skladkaRentowa: yourSalaryBrutto * prcentSkladkiRentowej,
			skladkaChorobowa: yourSalaryBrutto * procentSkladkiChorobowej,
		}

		ubezpieczeniespoleczne = pensjaSkladkiNetto.skladkaEmerytalna + pensjaSkladkiNetto.skladkaRentowa + pensjaSkladkiNetto.skladkaChorobowa;
		ubezpieczeniezdrowotne = (yourSalaryBrutto - ubezpieczeniespoleczne) * procentSkladkiZdrowotnej;
		skladkaZdrowotnaOdliczona = (yourSalaryBrutto - ubezpieczeniespoleczne) * procentSkladkiZdrowotnejOdliczony;
		zaliczkaNaPodatekDochodowy = (yourSalaryBrutto - ubezpieczeniespoleczne - kosztyUzyskaniaPrzychodu) * podatekDochodowy - kwotaWolnaOdPodatku - skladkaZdrowotnaOdliczona;
		pensjaNetto = yourSalaryBrutto - ubezpieczeniespoleczne - ubezpieczeniezdrowotne - zaliczkaNaPodatekDochodowy;

		sallaryNetto = '<p> Pensja Netto: ' + pensjaNetto.toFixed(2) + '</p><p> Ubezpiecznie społeczne: ' + ubezpieczeniespoleczne.toFixed(2) + '</p><p> Składka Zdrowotna: ' + skladkaZdrowotnaOdliczona.toFixed(2) + '</p><p> Zaliczka na podatek: ' + zaliczkaNaPodatekDochodowy.toFixed(2) + '</p>'


		$('#netto-score').append(sallaryNetto);
	}

	function resetData() {
				
		$('#netto-score').empty();

	};


	
	$('#oblicz').on('click', function(event){
		yourSalaryBrutto = $("#kalkulatorwynagrodzen").val();
		obliczWynagrodzenie(yourSalaryBrutto);
	});

	$('#kalkulatorwynagrodzen, #resetdata').on('click', function(event){
		resetData();
	})

});