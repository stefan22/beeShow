var counter = 0;

var allBees = {
  
  bee1: {type:'qBee', health:100 },
  
  bee2: {type: 'wBee', health:75 },
  
  bee3: {type: 'dBee', health:50 },
  
  "bee total": 0 
 
  
};

function Bee(name,type,health,beeTotal) {
  
  this.name = name | 'default';
  this.type = type | 'default';
  this.health = health | 'default';
  this.beeTotal = "bee total";
 
  
}


function addbees(type) {
  
   var bee = new Bee();
  
  allBees.beeTotal = counter++;
 
  if (bee.type == 'qBee') {
    
     allBees["bee" + allBees.beeTotal] = {type:'qBee',health:100};
    
  }
  
  else if (bee.type == 'wBee') {
    
     allBees["bee" + allBees.beeTotal] = {type:'wBee',health:75};
    
  }
  
  if (bee.type == 'dBee') {
    
     allBees["bee" + allBees.beeTotal] = {type:'dBee',health:50};
    
  }
  
  //console.log(allBees["bee" + allBees.beeTotal] = {type:type,health:100});

}//addbees

  addbees('qBee');
  addbees('wBee');
//addbees('wBee');
//addbees('dBee');
//addbees('dBee');

console.log(allBees);
