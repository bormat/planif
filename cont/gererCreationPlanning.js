var gererPlanning = function($){
	$.reinitialiser=function(){
		if(confirm('Vous êtes sur le point de réinitialiser votre planning.\n\n'
				+ 'Attention, cette action est irréversible !') && $.planning.getColonnes().length>0){
			$.planning.reinitialiser();
		}
	}
	$.creerPlanning = function(mode) {
		$.afficherAccueil(false);
		//ne pas effacer le planning si le mode est le même
		if ($.planning && $.planning.getMode() == mode){
			return ;
		}
		var planning = $.planning = new Planning(mode)	;
		planning.addPage();
		$.getHautCell=function(){
			return "calc("+planning.getHauteurCell()+")";
		}		
		if (planning.getMode() === 'hebdomadaire'){
			['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].forEach(function(jour){
				planning.ajoutColonne(new Colonne(jour));
			})
		}
		planning.setHoraire(new Periode($.horaire));
		planning.ajouterCategories("#ccb800","Default");
	planning.ajouterCategories("red","");
		planning.ajouterCategories("orange","");
		planning.ajouterCategories("white","");
		planning.ajouterCategories("green","");
		planning.ajouterCategories("cyan","");
		planning.ajouterCategories("yellow","");
		planning.repartirColonnes();
	}
}