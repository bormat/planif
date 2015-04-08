var gererPlanning = function($){
	$.reinitialiser=function(){
		if(confirm('Vous �tes sur le point de r�initialiser votre planning.\n\n'
				+ 'Attention, cette action est irr�versible !') && $.planning.getColonnes().length>0){
			$.planning.reinitialiser();
		}
	}
	$.creerPlanning = function(mode) {
		$.afficherAccueil(false);
		//ne pas effacer le planning si le mode est le m�me
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
	planning.ajouterCategories("red","uml");
		planning.ajouterCategories("orange","informatique");
		planning.ajouterCategories("white","mathematique");
		planning.ajouterCategories("green","developement");
		planning.ajouterCategories("cyan","anglais");
		planning.ajouterCategories("yellow","droit");
		planning.repartirColonnes();
	}
}