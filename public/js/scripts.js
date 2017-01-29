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
    document.getElementById("mySidenavL").style.width = "285px";
    document.getElementById("mainL").style.marginLeft = "285px";
    document.getElementById('bee6').style.opacity = "0";
    

    //aprire
    aprire.classList.add('panclose');
    aprire.classList.add('panopen');
    //bee6
    document.getElementById('bee6').style.paddingLeft = "9em";
    document.getElementById('bee6').style.maxWidth = "285px";

    document.getElementById('bee6').style.transition = "slide-down,width,2s";

    

    

}

function closeNav() {
    var aprire = document.getElementById('aprire');
    document.getElementById("mySidenavL").style.width = "0";
    document.getElementById("mainL").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
    document.getElementById('bee6').style.opacity = "1";
    //aprire
    aprire.classList.remove('panopen');
    aprire.classList.add('panclose');
    

    //bee6  //230
    document.getElementById('bee6').style.paddingLeft = "0";
    document.getElementById('bee6').style.maxWidth = "90px";
    document.getElementById('bee6').style.transition = "slide-up,width,2s";


    
}




document.getElementById('sesame').addEventListener('click',openNav,false);
document.getElementById('closa').addEventListener('click', closeNav,false);

footersYear();
		
		
})(); //self exec fun








