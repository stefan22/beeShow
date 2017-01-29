(function() {

	//globals
	var beesArr = [];
	//bees count
	var bcount = beesArr.length;
	//qb count
	//var qbcount = queenCount();
	//wkcount
	//var wkcount = workerCount();
	//drcount
	//var drcount = droneCount();

	//3 types of bees
	var qBee = {};
	var wBee = {};
	var dBee = {};

	//bee const
	function Bee(type) {

		//if bcount less than or equals 15
		if (bcount < 15) {
			//add to count each time new bee is created
			bcount++;
			console.log('bee count: ' + bcount);

			if ((type).toString() === 'qBee') {
				this.type = 'qBee';
				this.health = 100;
				console.log(this.type);
				console.log(this.health);
				return;

			}//if qBee

			if ((type).toString() === 'wBee') {
				this.type = 'wBee';
				this.health = 75;
				console.log(this.type);
				console.log(this.health);
				return;
			
			}//if wBee

			if ((type).toString() === 'dBee') {
				this.type = 'dBee';
				this.health = 50;
				console.log(this.type);
				console.log(this.health);
				return;
			
			}//if dBee

			else {
				console.log('not a valid bee type!');
				return true;
			}

		}//if bCount less than 15
		
		//reached max bees amount
		else {

			console.log('sorry, max bees amount has been reached!');
			return true;

		}//bcount greater than 15	










		
	
	}//bee const

	//create new bees

	var bee1 = new Bee('qBee');
	console.log(bee1);

	var bee2 = new Bee('wBee');
	console.log(bee2);
	
	var bee3 = new Bee('dBee');
	console.log(bee3);

	var bee4 = new Bee('qBee');
	console.log(bee4);

	var bee5 = new Bee('wBee');
	console.log(bee5);
	
	var bee6 = new Bee('dBee');
	console.log(bee6);

	var bee7 = new Bee('qBee');
	console.log(bee7);

	var bee8 = new Bee('wBee');
	console.log(bee8);
	
	var bee9 = new Bee('dBee');
	console.log(bee9);

	var bee10 = new Bee('qBee');
	console.log(bee10);

	var bee11 = new Bee('wBee');
	console.log(bee11);
	
	var bee12 = new Bee('dBee');
	console.log(bee12);

	var bee13 = new Bee('qBee');
	console.log(bee13);

	var bee14 = new Bee('wBee');
	console.log(bee14);
	
	var bee15 = new Bee('dBee');
	console.log(bee15);

	// here count equals 15
	// and i get => sorry, max bees amount has been reached!

	var bee16 = new Bee('dBee');
	console.log(bee16);
	
	













})();//self exe funct