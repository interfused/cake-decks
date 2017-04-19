var score=0;

function showDirections(){
	document.getElementById("instructions").classList.add("active");
}

function hideDirections(){
	document.getElementById("instructions").classList.remove("active");
}

function evalTowers(){
	score++;
	document.getElementById('scoreText').textContent = score;
//loop through each tower allow only first to be draggable
for (var i=1;i<=3;i++){
	var tower = document.getElementById('t'+i);
	tower.setAttribute('data-smallest',0 );
	var dragBool=true;
	var elCnt=0;

	for (var j=1;j<=3;j++){
		var dragEl = document.getElementById('d'+j);

		if(tower.querySelector('#d'+j) != null){
			elCnt++;

			if(dragBool==true){
				tower.setAttribute('data-smallest',dragEl.getAttribute('dataval') );

			}
			dragEl.setAttribute('draggable',dragBool);
			dragBool = false;
		}
		tower.setAttribute('data-total-elements',elCnt);
	}
	///game over chekc
	if(elCnt==3 && document.getElementById('t3').getAttribute("data-smallest")=="1"){
			//small timeout used bc Chrome showing window before visual representation of finalized state
			setTimeout(function(){ 
				var ask = window.confirm("Congrats, you solved the puzzle in "+score+" moves. Would you like to play again?");
		if (ask) {
			document.location.href = "hanoi.html";
		}
		}, 50);
		
	}
}

}
function checkdraggable(ev){
	ev.preventDefault();
	if(ev.target.getAttribute('draggable')){
		alert('You may only drag the top most disc in any tower.');
	}
}

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var a= document.getElementById(ev.target.id);

    //get droptarget smallest number
    var smallest = a.getAttribute('data-smallest');
    var data = ev.dataTransfer.getData("text");
    
    //check if 
    var dropTarget = ev.target;
    var a=document.getElementById(data);
    var calcVal = a.getAttribute("dataval");

    if(smallest > calcVal || smallest ==0 ){
    	dropTarget.insertBefore(document.getElementById(data) , dropTarget.firstChild);    	
    	evalTowers();
    }else{
    	alert("Only a smaller disc may be placed upon a larger disc in a tower");
    }
}