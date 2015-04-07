"use strict";
/***************************
***** classe evenement ******
****************************/
Class.create("Evenement",{
	initialize:function(periode, visibility){
			this._periode=periode;
			this._visibility = visibility;
	},
	//margin-top
	margeHaut : function(calc){
		var plan=this.getColonne().getPage().getPlanning()
		var nbCelluleAvant = (this._periode.getEnMinDebut() - plan.getHoraire().getEnMinDebut())/60 ;
		var res="("+plan.getHauteurCell() + " * " + nbCelluleAvant + " + " + plan.getHauteurLigne1() + "px)"
		if (calc){
			res="calc"+res;
		}
		return res;
	},
	//height
	hauteur : function(calc){
		var plan=this.getColonne().getPage().getPlanning();
		var nbcell = this.getPeriode().getIntervalle()/60
		var res = "("+plan.getHauteurCell() +" * " +nbcell+")"
		if (calc){
			res="calc"+res;
		}
		return res;
	},
	largeur : function() {
		return 0+"%";
	},
	getteurEtSetteur : "periode,colonne",
	getteur : "visibility"
	
})

Class.create("EvenementClassique",{
	extend: Evenement,
	initialize:function(nom,description,periode,categorie, nbCol){
		$super(periode,true);
		this._nom=nom;
		this._description=description;
		this._tabEvenementAutreCol = this._tabEvenementAutreCol || new Tab();
		this.setCategorie(categorie);
		this._nbCol = nbCol;
	},
	supprimer: function(){
        var tabTaches  =  this.getColonne().getTaches().suppElmt(this);
		this.setNbEvenementSecondaire(0);
	},
	undo: function(){
		this._colonne.ajouterEvenement(this)
	},	
	setNbEvenementSecondaire:function(nb){
		var colonnes = this.getColonne().getPage().getColonnes();
		var indiceMaCol = colonnes.indexOf(this.getColonne());
		var indMax = this._tabEvenementAutreCol.length ;
		//ajout si necessaire
		for( var i= 1 ; i < nb-indMax; i++){
		  var evnmt = new EvenementInvisible(this._periode);
		  evnmt.setEvenementClassique(this);
		  this._tabEvenementAutreCol.push(evnmt);
		  colonnes[indiceMaCol + i].ajouterEvenement(evnmt)
		}
		//suppression si necessaire
		while(nb  <= indMax && indMax>0 ){
			indMax--;
			this._tabEvenementAutreCol[indMax].supprimer();
		}
	},
	largeur : function() {
		var largeur=0;
		for( var i=0; i < this._tabEvenementAutreCol.length; i++){
		  largeur += this._tabEvenementAutreCol[i].getColonne().getLargeur();
		}
		var maLarg = this.getColonne().getLargeur();
		return 100 * (maLarg + largeur)/maLarg + "%"
	},
	getteurEtSetteur : "nom,description,tabEvenementAutreCol,categorie,nbCol",

})

Class.create("EvenementInvisible",{
	extend: Evenement,
	initialize: function(periode){
		$super(periode,false);
	},  
  
	supprimer: function(){
        //supression dans colonne classique
        var tabTaches  =  this.getColonne().getTaches().suppElmt(this)     
        var tabTaches2 =  this.getEvenementClassique().getTabEvenementAutreCol().suppElmt(this);
	},
  	getteurEtSetteur : "evenementClassique",
})




