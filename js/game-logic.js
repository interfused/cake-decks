var score=0;

function startGame(){
	document.getElementById('intro').classList.add('hidden');
	document.getElementById('gameScreen').classList.remove('hidden');
}
function showHelp(helpID){

	var a = document.getElementById("helpScreen");
	a.classList.add("animate");
	var b= a.getElementsByClassName('content');
	for(i=0;i<b.length;i++){
		b[i].classList.remove('active');
	}
	var b=document.getElementById(helpID);
	console.log('b: '+b);
	b.classList.add('active');
	return false;
}

function hideHelp(){
	document.getElementById("helpScreen").classList.remove("animate");
}

function evalTowers(){
	score++;
	document.getElementById('scoreText').textContent = score;
	document.getElementById('scoreTextFinal').textContent = score;
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
				//var ask = window.confirm("Congrats, you solved the puzzle in "+score+" moves. Would you like to play again?");
				document.getElementById('gameScreen').classList.add('hidden');
				document.getElementById('outro').classList.remove('hidden');
			}, 50);

		}
	}

}
function checkdraggable(ev){
	ev.preventDefault();
	if(ev.target.getAttribute('draggable')){
		showHelp('drag_error');
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
    	showHelp('drop_error');
    }
}