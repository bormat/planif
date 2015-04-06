
Class.create("Fenetre",{
	initialize:function(montrer){
		this._visible = montrer;
		this._isAnime="";
	},
	afficher:function (montrer){
		if (montrer === undefined) montrer = true;
		this._visible = montrer;
	},
	isAfficher:function (){
		return this._visible;
	},
	getNameToInclude : function(){
		return "html/" + this._name +".html";
	},
	anime : function(){
		this._isAnime=" anime"
	},
	getClasses:function(){
		return (this._visible ? "fenVisible" : "fenInvisible") + this._isAnime + " fen " + this._name;
	},
	getteurEtSetteur:"name"
})




