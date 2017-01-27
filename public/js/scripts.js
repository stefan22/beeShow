(function() {
//inserts year in the footer dynamically
var footersYear = function() {
	var today = new Date();
	var year = today.getFullYear();
	document.getElementById('fyear').textContent = year;
}
//call it 

function openNav() {
    var aprire = document.getElementById('aprire');
    document.getElementById("mySidenavL").style.width = "350px";
    document.getElementById("mainL").style.marginLeft = "350px";
    
    //aprire
    aprire.classList.add('panclose');
    aprire.classList.add('panopen');
    //jenkins
    document.getElementById('jenkins').style.paddingLeft = "9em";
    document.getElementById('jenkins').style.maxWidth = "325px";
    document.getElementById('jenkins').style.transition = "slide-down,width,2s";

    

    

}

function closeNav() {
    var aprire = document.getElementById('aprire');
    document.getElementById("mySidenavL").style.width = "0";
    document.getElementById("mainL").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
    //aprire
    aprire.classList.remove('panopen');
    aprire.classList.add('panclose');

    //jenkins
    document.getElementById('jenkins').style.paddingLeft = "0";
    document.getElementById('jenkins').style.maxWidth = "230px";
    document.getElementById('jenkins').style.transition = "slide-up,width,3s";
}




document.getElementById('sesame').addEventListener('click',openNav,false);
document.getElementById('closa').addEventListener('click', closeNav,false);

footersYear();
		
		
})(); //self exec fun








