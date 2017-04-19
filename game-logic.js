function showDirections(){
	document.getElementById("instructions").classList.add("active");
}
function hideDirections(){
	document.getElementById("instructions").classList.remove("active");
}

function init(){
	t1_arr=[ {label:'d1',val:1},{label:'d2',val:2},{label:'d3',val:3} ];
	t2_arr=[];
	t3_arr=[];
}
function evalTowers(){
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
	if(document.getElementById('t3').getAttribute("data-smallest")=="1"){
		console.log('game over');
	}

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
    console.log('drop ev: '+a.id +' smallest: '+smallest);
    var data = ev.dataTransfer.getData("text");
    
    //check if 
    var dropTarget = ev.target;
    var a=document.getElementById(data);
    var calcVal = a.getAttribute("dataval");

    if(smallest > calcVal || smallest ==0 ){
    	//dropTarget.appendChild(document.getElementById(data));
    	dropTarget.insertBefore(document.getElementById(data) , dropTarget.firstChild);
    	
    	evalTowers();
    }else{
    	//console.log('nope');
    	alert("Only a smaller disc may be placed upon a larger disc in a tower");
    }
    console.log(data + ' calcVal: '+calcVal +' tgt: '+dropTarget.id);
    ;
    console.log(calcVal);    

}

init();