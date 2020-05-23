isExpanded = false;

function getIndex(el) {
   ind = null;
   for (i=0; i<document.layers.length; i++) {
	whichEl = document.layers[i];
	if (whichEl.id == el) {
	   ind = i;
	   break;
	}
   }
   return ind;
}

function arrange() {
   nextY = document.layers[firstInd].pageY + document.layers[firstInd].document.height;
   for (i=firstInd+1; i<document.layers.length; i++) {
	whichEl = document.layers[i];
	   if (whichEl.visibility != "hide") {
		whichEl.pageY = nextY;
		nextY += whichEl.document.height;
	   }
   }
}

function initIt(){
   if (NS4) {
	for (i=0; i<document.layers.length; i++) {
	   whichEl = document.layers[i];
		if (whichEl.id.indexOf("Child") != -1) whichEl.visibility = "hide";
	}
	arrange();
   }
   else {
	tempColl = document.all.tags("DIV");
	for (i=0; i<tempColl.length; i++) {
	   if (tempColl(i).className == "child") tempColl(i).style.display = "none";
	}
   }
}

function expandIt(el) {
   if (!ver4) return;
   if (IE4) {expandIE(el)} else {expandNS(el)}
}

function expandIE(el) { 
   whichEl = eval(el + "Child");
   whichIm = event.srcElement;

   if (whichEl.style.display == "none") {
	whichEl.style.display = "block";
	whichIm.src = "bullet-minus.gif";		
   }
   else {
	whichEl.style.display = "none";
	whichIm.src = "bullet-plus.gif";
   }
}

function expandNS(el) {
   whichEl = eval("document." + el + "Child");
   whichIm = eval("document." + el + "Parent.document.images['imEx']");
   if (whichEl.visibility == "hide") {
	whichEl.visibility = "show";
	whichIm.src = "bullet-minus.gif";
   }
   else {
	whichEl.visibility = "hide";
	whichIm.src = "bullet-plus.gif";
   }
   arrange();
}

function showAll() {
   for (i=firstInd; i<document.layers.length; i++) {
	whichEl = document.layers[i];
	whichEl.visibility = "show";
   }
}

function expandAll(isBot) {
   newSrc = (isExpanded) ? "bullet-plus.gif" : "bullet-minus.gif";

   if (NS4) {
        document.images["imEx"].src = newSrc;
	for (i=firstInd; i<document.layers.length; i++) {
		whichEl = document.layers[i];
		if (whichEl.id.indexOf("Parent") != -1) {
		   whichEl.document.images["imEx"].src = newSrc;
		}
		if (whichEl.id.indexOf("Child") != -1) {
		   whichEl.visibility = (isExpanded) ? "hide" : "show";
		}
	}

	arrange();
	if (isBot && isExpanded) scrollTo(0,document.layers[firstInd].pageY);
   }
   else {
	divColl = document.all.tags("DIV");
	for (i=0; i<divColl.length; i++) {
		if (divColl(i).className == "child") {
		   divColl(i).style.display = (isExpanded) ? "none" : "block";
		}
	}
	imColl = document.images.item("imEx");
	for (i=0; i<imColl.length; i++) {
		imColl(i).src = newSrc;
	}
   }

   isExpanded = !isExpanded;
}

with (document) {
   write("<STYLE TYPE='text/css'>");
   if (NS4) {
	write(".parent {position:absolute; visibility:hidden}");
	write(".child {position:absolute; visibility:hidden}");
	write(".regular {position:absolute; visibility:hidden}")
   }
   else {
	write(".child {display:none}")
   }
   write("</STYLE>");
}

onload = initIt;

