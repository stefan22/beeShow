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

	//sub arrays
	var qArr = [];	//queen bees arr
	var wArr = [];	//worker bees arr
	var dArr = [];	//drone bees arr

	//initiliaze counters
	var bcount = (qArr.length + wArr.length + dArr.length);		//all bees array
	var qcount = 0;		//queen bees array
	var wcount = 0;		//worker bees array
	var dcount = 0;		//drone bees array
	var count = 0;		//counting adds	
	

	//max settings
	var mxqb = 3;		//max queen bees
	var mxwb = 5;		//max worker bees
	var mxdb = 7;		//max drone bees
	var mxbees = (mxqb + mxwb + mxdb); 	//max bees num


/*****
Bee function
******/	

	//bee const
	function Bee(type) {

		// if bcount less than or equals 15
		// ================================
		if (bcount < mxbees) {
			
			// queen bees
			// ==========
//debugger;
			if (type === 'qBee' &&  (qcount < mxqb) ) {
				//all bees counter
				bcount++;
				this.type = 'qBee';
				this.health = 100;

				// add a unique id  | 2 two parts: 
				// =========================
				// charAt(0)=> type name  
				// number from 1 to their max

				var qid = function(id) {
					qcount++;
					this.id  = qcount;
					return this.id;	
				};

				//adding first character from their type to the id
				this.id = this.type.charAt(0).concat(qid(this.id).toString());

				return;

			}//if qBee

			//worker bees
			//==========
			if (type === 'wBee' &&  (wcount < mxwb)    ) {
				//add new bee
				bcount++;
				
				this.type = 'wBee';
				this.health = 75;

				//adding id number
				var wid = function(id) {
					wcount++;
					this.id  = wcount;
					return this.id;	
				};

				//adding id letter
				this.id = this.type.charAt(0).concat(wid(this.id).toString());

				return;
			
			}//if wBee

			//drone bees
			//==========
			if (type === 'dBee'  &&  (dcount < mxdb)   ) {
				//add new bee
				bcount++;
				
				this.type = 'dBee';
				this.health = 50;

				//adding id number
				var did = function(id) {
					dcount++;
					this.id  = dcount;
					return this.id;	
				};

				//adding id letter
				this.id = this.type.charAt(0).concat(did(this.id).toString());
				

				//console.log(this.type);
				//console.log(this.health);
				//console.log(this.id);
				return;
			
			}//if dBee


			else {

				//reached these type of bees max amount
				console.log('maxed out!');
				return true;
			}

		}
		//if bCount less than 15
		//======================
			
		

		//reached max bees amount for all types
		//=====================================		
		else {

				clearInterval(beeCannon);
				
		}//bcount greater than 15	

	//console.log('sorry no vacany - max bees amount has been reached!');

	}//bee const



/*****
init function
******/


	function init() {

		//console.log('enter init');

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
		//console.log('called addBee -init');

		//draw blank page
		//drawPage();



	}//init







/*****
addBee function
******/

debugger;
	function addBee() {
		
		function addToArr(obj) {

					switch (this.type) {

						case "qBee":
						qArr.push(obj);
						
						break;

						case "wBee":
						wArr.push(obj);
						
						break;
						
						case "dBee":
						dArr.push(obj);
						

					}//switch

			
		}//addToArr funct

	//call all bees on timer
	//======================


		//all bees array |mxbees=15
		for (var i=0; i < mxbees; i++) {

			//queen bees |mxqb=3
			for(var ii=0; ii < mxqb; ii++) {
				addToArr(new Bee('qBee'));
			}
			//worker bees |mxqb=5
			for(var iii=0; iii < mxwb; iii++) {
				addToArr(new Bee('wBee'));
			}
			//drone bees |mxdb=7
			for(var iiii=0; iiii < mxdb; iiii++) {
				addToArr(new Bee('dBee'));
			}

			//console.log('called bees');
		}//outer for loop
	
	
	

	//var bee1 = new Bee();
	//bee1.type = 'qBee';
	//console.log(bee1);

	}//addBee

	












/*
-----------------------------------------
Calling bees returns :

Bee {type:"qBee", health:100, id:"q1"}    //first 1
....
......
........
Bee {type:"dBee", health:50, id:"d5"}     //last 15 
-----------------------------------------
*/


/*
	

	
	console.log('what is all bees count: ' + bcount);
	console.log('qcounter: ' + qcount);
	console.log('wcounter: ' + wcount);
	console.log('dcounter: ' + dcount);

*/


	//fire up init//
	document.addEventListener('DOMContentLoaded', init, false);
	console.log('event working');


})();//self exe funct