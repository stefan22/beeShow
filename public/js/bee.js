(function() {

	//globals

	//canvas
	var canvas = null;
	var context = null;

	//offscreen canvas
	var bufferCanvas = null;
	var bufferCanvasCtx = null;



	var beesArr = [];

	//timer
	var beeCannon = null;

	
	//initiliaze counters
	
	var qcount = 0;		//queen bees counter
	var wcount = 0;		//worker bees counter
	var dcount = 0;		//drone bees counter
	var count = 0;		//counting b-adds	
	

	//max settings
	var mxqb = 3;		//max queen bees
	var mxwb = 5;		//max worker bees
	var mxdb = 7;		//max drone bees
	var mxbees = (mxqb + mxwb + mxdb); 	//max bees num


/*****
Bee function
******/	

	function Bee(type,health) {
	
		this.type = type || 'no type';

		this.health = function() {
			addHealth();
		}

		//added automatically by addBee funct
		//this.id = id || null;


	}//bee const


	//bee functions| getHealth
	Bee.prototype.addHealth = function() {

		if (this.type == "qBee") {
			return {
				health:100
			}
		}
		else if (this.type == "wBee") {
			return {
				health:75
			}
		}
		else if (this.type == "dBee") {
			return {
				health:50
			}
		}
	}//getHealth


	//bee functions| getHit (substract from health)
	Bee.prototype.getHit = function() {

		if (this.type == "qBee") {
			this.health - 7;
		}
		else if (this.type == "wBee") {
			this.health -12;
		}
		else if (this.type == "dBee") {
			this.health - 18;
		}
	}//getHit
	


/*****
init function
******/


	function init() {

		console.log('step1: enter init');

		//handle dom
		canvas = document.getElementById('beeCanvas');
		//ref inst
		context = canvas.getContext('2d');

		//create new elem based on canvas
		bufferCanvas = document.createElement("canvas");
		//new elem inst
		bufferCanvasCtx = bufferCanvas.getContext("2d");
		
		//buffers new width and height same as original canvas already in page
		bufferCanvasCtx.canvas.width = context.canvas.width;
		bufferCanvasCtx.canvas.height = context.canvas.height;

		//set interval timer -> add/shoot bees randomly to page
		beeCannon = setInterval(addBee,200);
		console.log('step:2 call addBee');

		//draw blank page
		//drawPage();

	}//init



/*****
addBee function
******/



	function addBee() {
		console.log('step:3 enter addBee');


debugger;
		
		function addToArr(obj) {


			if(count < mxbees  || obj.type != "no type") {

				//drones less than max setting
				if (dcount < mxdb) {
				count++;
				dcount++;
					obj.type = "dBee";
					beesArr.push(obj);
					console.log(obj);						

				}//drones

				//workers less than max setting
				else if (wcount < mxwb) {
				count++;
				wcount++;
					obj.type = "wBee";
					beesArr.push(obj);
					console.log(obj);	

				}//workers

				//queens less than max allowed
				else if (qcount < mxqb) {
				count++;
				qcount++;
					obj.type = "qBee";
					beesArr.push(obj);
					console.log(obj);	

				}//queens

			}//outer if

			else {
				//cut off timer all bees been added
				clearInterval(beeCannon);
				console.log('added 15 bees and getting turn off');

			}//reached max bcount - can't add anymore bees


		}//addToArr
		
		

		//Adding all bees with for loops
		console.log('starts adding new objects here');
		debugger;
		for(var i=0; i< mxdb; i++) {
			addToArr(new Bee());
		}
		for(var i=0; i< mxwb; i++) {
			addToArr(new Bee());
		}
		for(var i=0; i< mxqb; i++) {
			addToArr(new Bee());
		}
		
		

		
	}//addBee

		
	  

	
	
	console.log('qcounter: ' + qcount);
	console.log('wcounter: ' + wcount);
	console.log('dcounter: ' + dcount);

	//fire up init//
	document.addEventListener('DOMContentLoaded', init, false);

	
	


})(); //self exe funct



//self exec function is part of the window.object
window.console.log('event fired up');






