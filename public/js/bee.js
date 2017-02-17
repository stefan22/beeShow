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
	var beeCannon2 = null;

	
	//initiliaze counters
	
	var qcount = 0;		//queen bees counter
	var wcount = 0;		//worker bees counter
	var dcount = 0;		//drone bees counter
	var count = 0;		//counting b-adds
	//i want an id!
	var id=0;	
	

	//max settings
	var mxqb = 3;		//max queen bees
	var mxwb = 5;		//max worker bees
	var mxdb = 7;		//max drone bees
	var mxbees = (mxqb + mxwb + mxdb); 	//max bees num


/*****
Bee function
******/	

	function Bee(type) {
	
		this.type = type || 'no type';

		// gets x positions from zero to canvas width (left-to-right)
		this.x = Math.round(Math.random() * context.canvas.width)
		// get y positions across y-axis (or canvas height)
		this.y = Math.round(Math.random() * context.canvas.height);

		//fly-off
		this.fly = (Math.random() * 5) +7;

		//for now all bees same size
		this.width = 18;
		this.height = 22;


		//handle for outercanvas border at init style
		var oc = document.getElementById('outercanvas');
		oc.style.cursor = "pointer";
		oc.style.borderWidth = "1px";

		
		//image handle | for later, bees arent flying yet
		var ibee = document.getElementById('ibee');
		//right positioning
		ibee.style.right = this.width;
		//bottom position
		ibee.style.bottom = this.height;

		//for now bee img resets canvas   //n bees only load on page refresh
		ibee.onclick = function() {
			//reset bees array but does not remove bees
			beesArr = [];   // or beesArr.length = 0;
			//remove bees
			beeDraw();
			//remove border
			oc.style.borderWidth = 0;


			document.onkeydown = function(e) {
  			  e.preventDefault();
			  if (e.keyCode === 90) {
			  	//clear previous console.logs from here on
			  	console.clear();
			    console.log('z key pressed');
			    //console.log(e);					//keyboardEvent
			    //console.log(e.which);				//90
			    //after bees been cleared only
			    this.location.reload();


			  }
			};//onkeydown
		};//onclick


		


		


	}//bee const


	//bee functions| getHealth
	Bee.prototype.addHealth = function() {

		if (this.type == "qBee") {
			this.health = 100;
			return this.health;

		}
		else if (this.type == "wBee") {
			this.health = 75;
		}
		else if (this.type == "dBee") {
			this.health = 50;
		}

	}//getHealth

	console.log()

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
		beeDraw();
		//calling beeDraw
		beeCannon2 = setInterval(beeDraw,100);

	}//init


/*****
beeDraw function
******/

	function beeDraw() {
		console.log('step4: entered beeDraw');
		//canvas bg color
		bufferCanvasCtx.fillStyle = "white";   //"rgba(255, 230, 255, 0.1)";	//purple
		bufferCanvasCtx.fillRect(0,0,bufferCanvasCtx.canvas.width, bufferCanvasCtx.canvas.height);


		//loop array
		for (var i=0; i < beesArr.length; i++) {
			//bees are colored here
			//bufferCanvasCtx.fillStyle = "rgba(178, 102, 255, 0.75)";	
			bufferCanvasCtx.fillStyle = "#400d63";	//#460d63
			bufferCanvasCtx.fillRect(
				beesArr[i].x,
				beesArr[i].y,
				beesArr[i].width,
				beesArr[i].height
			);//rect

		}//for loop

		//copy buffer
		context.drawImage(bufferCanvas,0,0,bufferCanvas.width, bufferCanvas.height);


	}//beeDraw	



/*****
addBee function
******/



	function addBee() {
		console.log('step:3 enter addBee');


		//debugger;
		
		function addToArr(obj) {


			if(count < mxbees  || obj.type != "no type") {

				//drones less than max setting
				if (dcount < mxdb) {
				id++;
				count++;
				dcount++;
					obj.type = "dBee";
					obj.health = 100;
					obj.id = id;
					beesArr.push(obj);
					console.log(obj);						

				}//drones

				//workers less than max setting
				else if (wcount < mxwb) {
				id++;
				count++;
				wcount++;
					obj.type = "wBee";
					obj.health = 75;
					obj.id = id;
					beesArr.push(obj);
					console.log(obj);	

				}//workers

				//queens less than max allowed
				else if (qcount < mxqb) {
				id++;
				count++;
				qcount++;
					obj.type = "qBee";
					obj.health = 50;
					obj.id = id;
					beesArr.push(obj);
					console.log(obj);	

				}//queens

			}//outer if

			else {
				//cut off timer all bees been added
				clearInterval(beeCannon);
				clearInterval(beeCannon2);
				//console.log('all bees created and added - shutting off timer');
				

			}//reached max bcount - can't add anymore bees
			


	}//addToArr





/*****  not created yet for loop
beegate function
*****/

		//Adding all bees with for loops
		console.log('beegate - bee creation begins');
		//debugger;
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


