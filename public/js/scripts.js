(function() {
//inserts year in the footer dynamically
var footersYear = function() {
	var today = new Date();
	var year = today.getFullYear();
	document.getElementById('fyear').textContent = year;
}
//call it 

var sideNav = document.querySelector('section.apiarea');

function openNav() {
    var aprire = document.getElementById('aprire');
    document.getElementById("mySidenavL").style.width = "285px";
    //document.getElementById("mainL").style.marginLeft = "285px";
    document.getElementById('bee6').style.opacity = "0";
    document.getElementById('sesame').style.opacity = "0";
    

    //aprire
    aprire.classList.remove('panclose');
    aprire.classList.add('panclose');
    aprire.classList.add('panopen');
    //bee6
    document.getElementById('bee6').style.paddingLeft = "0em";
   

    document.getElementById('bee6').style.transition = "slide-down,width,2s";


    //toggle sideNav
    sideNav.classList.remove('apiarea');
    sideNav.classList.add('curtain');
    

}//openNav

function closeNav() {
    var aprire = document.getElementById('aprire');
    document.getElementById("mySidenavL").style.width = "0";
    document.getElementById("mainL").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
    document.getElementById('bee6').style.opacity = "1";
    //aprire
    aprire.classList.remove('panopen');
    aprire.classList.add('panclose');

    //toggle sideNav
    sideNav.classList.add('apiarea');
    sideNav.classList.remove('curtain');

    

    //bee6  //230
    document.getElementById('bee6').style.paddingLeft = "0";
    document.getElementById('bee6').style.maxWidth = "70px";
    document.getElementById('bee6').style.transition = "slide-up,width,1s";
    document.getElementById('sesame').style.opacity = "1";
    document.getElementById('sesame').style.marginLeft = '14.5em';


    
}




document.getElementById('sesame').addEventListener('click',openNav,false);
document.getElementById('closa').addEventListener('click', closeNav,false);

footersYear();
		
		
})(); //self exec fun








