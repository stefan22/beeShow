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

		

		//added automatically by addBee funct
		//this.id = id || null;


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



/*
===================== getting back at this time =======================

	Bee {
		
		type:'dBee',
		health:50,
		id:1

	}


		beesArr = [
(pos)
0.		{
			type:'dBee',
			health:50,
			id:1
		},

1.		{
			type:'dBee',
			health:50,
			id:2
		},

2.		{
			type:'dBee',
			health:50,
			id:3
		},

3.		{
			type:'dBee',
			health:50,
			id:4
		},

4.		{
			type:'dBee',
			health:50,
			id:5
		},

5.		{
			type:'dBee',
			health:50,
			id:6
		},

6.		{
			type:'wBee',
			health:75,
			id:7
		},

7.		{
			type:'wBee',
			health:75,
			id:8
		},

8.		{
			type:'wBee',
			health:75,
			id:9
		},


		...
		.....
		.........


14.		{
			type:'qBee',
			health:100,
			id:15
		}


	]

	length:15
	Array[0]

=========================== end ==========================================
*/


