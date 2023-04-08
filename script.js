window.onscroll = function() {
  var nav = document.getElementsByTagName('nav')[0];
  if (window.pageYOffset > 0) {
      nav.classList.add('fixed');
  } else {
      nav.classList.remove('fixed');
  }
}

let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');
let contBox = document.querySelector('.contBox');

toggle.onclick = function() {
  navigation.classList.toggle('active');
  main.classList.toggle('active');
  contBox.classList.toggle('active');
}

let list = document.querySelectorAll('.navigation li');
function activeLink(){
  list.forEach((item) => item.classList.remove('hovered'));
  this.classList.add('hovered');
}
list.forEach((item) => item.addEventListener('mouseover', activeLink));