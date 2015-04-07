/***************************
****test serial planning****
****************************/


QUnit.test( "testModifierCategorie", function( assert ) {
	var cont = controlleur();
	cont.creerPlanning("hebdomadaire");
	var cat = new Categorie("green","azeret");
	cont.titreCat.val = cat.getNom();
	cont.couleurCat.val = cat.getCouleur();
	cont.ajoutCategorie();
	var res = cont.planning._categories.length;
	cont.formEvmt.categorie = cat;
	cont.titreCat.val = "azerty";
	cont.modifierCategorie();
	
	assert.equal( cont.planning._categories[res-1].getNom(), "azerty");
});


QUnit.test( "testSupprimerCategorie", function( assert ) {
	var cont = controlleur();
	cont.creerPlanning("hebdomadaire");
	var res = cont.planning._categories.length;
	cont.formEvmt.categorie = cont.planning._categories[0];
	cont.supprimerCategorie();
	
	assert.equal( cont.planning._categories.length, res-1);
});

QUnit.test( "testAjoutCategorie", function( assert ) {
	var cont = controlleur();
	cont.creerPlanning("hebdomadaire");
	var res = cont.planning._categories.length;
	cont.titreCat.val = "Test";
	cont.couleurCat.val = "green";
	cont.ajoutCategorie();
	
	assert.equal( cont.planning._categories.length, res+1);
	assert.equal( cont.planning._categories[res].getNom(), "Test");
	assert.equal( cont.planning._categories[res].getCouleur(), "green");
});

QUnit.test( "testAfficherAjouterCategorie", function( assert ) {
	var cont = controlleur();
	cont.creerPlanning("hebdomadaire");
	cont.afficherAjouterCategorie();
	
	assert.equal( cont.fenCategorie._visible, false);
	assert.equal( cont.fenetreAjoutCategorie._visible, true);
	assert.equal( cont.titreCat.val, "");
	assert.equal( cont.couleurCat.val, "#000000");
});

QUnit.test( "testAfficherModifierCategorie", function( assert ) {
	var cont = controlleur();
	cont.creerPlanning("hebdomadaire");
	cont.afficherModifierCategorie();
	
	assert.equal( cont.fenCategorie._visible, true);
	assert.equal( cont.titreCat.val, "");
	assert.equal( cont.couleurCat.val, cont.planning.getCategories()[0].getCouleur());
});

QUnit.test( "testRetourModifierCategorie", function( assert ) {
	var cont = controlleur();
	cont.creerPlanning("hebdomadaire");
	cont.retourModifierCategorie();
	
	assert.equal( cont.fenCategorie._visible, true);
	assert.equal( cont.fenetreAjoutCategorie._visible, false);
	assert.equal( cont.formEvmt.categorie, "");
});

QUnit.test( "testGetCategoriesUtilises", function( assert ) {
	var cont = controlleur();
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	cont.creerPlanning("hebdomadaire");
	cont.formEvmt.titre = "titre";
	cont.formEvmt.description = "description";
	cont.formEvmt = periodeTest;
	cont.formEvmt.categorie = cont.planning._categories[1];
	cont.formEvmt.nbCol = 1;
	cont.form.col = cont.planning._page[0]._colonnes[0];
	var eve = new EvenementClassique ("titre","description",periodeTest,cont.planning._categories[1], 1);
	cont.validationFormulaireEvenement();
	var tab = cont.getCategoriesUtilises();
	
	assert.equal( tab.length, 1);
	assert.equal( tab[0], eve.getCategorie());
});


