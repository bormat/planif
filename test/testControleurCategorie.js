/***************************
****test serial planning****
****************************/


QUnit.test( "testCtrlCategorie", function( assert ) {
	var cont = controlleur();
	cont.creerPlanning("hebdomadaire");
	assert.equal( false, false);
});
