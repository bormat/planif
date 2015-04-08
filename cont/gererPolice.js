var gererPolice=function($){
	/*******************************/
	/********Changement police*************/
	/*******************************/
	$.changerPolice=function(){			
			var f=$.formPerso;
			$$("#changeStyle" + f.classCss).html("."+f.classCss+"{color:"+f.polCouleur+";font-size:"+
			f.polTaille+"px;font-family:"+f.polStyle+";}");
	}
	
}