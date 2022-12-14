import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';


//navigation responsive
const primaryNav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener('click', () => {
    const visibility = primaryNav.getAttribute('data-visible');
    
    if(visibility === "false") {
        primaryNav.setAttribute("data-visible", true)
        navToggle.setAttribute('aria-expanded', true)
    } else if (visibility === "true"){
        primaryNav.setAttribute("data-visible", false)
        navToggle.setAttribute('aria-expanded', false)
    }
})
//nav animation
const nav = document.querySelector("#primary-navigation, .primary-header")
const sectionOne = document.querySelector(".logo")

const sectionOneOptions = {
    rootmargin:""
};

const sectionOneObserver = new IntersectionObserver(function(entries, sectionOneObserver) {
entries.forEach(entry => {
    if(!entry.isIntersecting) {
        nav.classList.add("nav-scrolled")
    }else {
        nav.classList.remove("nav-scrolled")
    }
})
}, sectionOneOptions)
sectionOneObserver.observe(sectionOne)


//loading screen
var loader = document.getElementById("loading-scr");

window.addEventListener("load", function(){
    loader.style.display = "none";
})


// stripe design
var c = document.getElementById('canv');
var $ = c.getContext('2d');


var col = function(x, y, r, g, b) {
  $.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  $.fillRect(x, y, 1,1);
}
var R = function(x, y, t) {
  return( Math.floor(192 + 64*Math.cos( (x*x-y*y)/300 + t )) );
}

var G = function(x, y, t) {
  return( Math.floor(192 + 64*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
}

var B = function(x, y, t) {
  return( Math.floor(192 + 64*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
}

var t = 0;
var x;
var y;

var run = function() {
  for(x=0;x<=35;x++) {
    for(y=0;y<=35;y++) {
      col(x, y, R(x,y,t), G(x,y,t), B(x,y,t));
    }
  }
  t = t + 0.05;
  window.requestAnimationFrame(run);
}

run();


//rotating text
"use strict";

let words = document.querySelectorAll(".word");

words.forEach((word) => {
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach((letter) => {
    let span =document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
  });
});

let currentWordIndex = 0;
let maxWordIndex = words.length -1;
words[currentWordIndex].style.opacity = "1";

let rotateText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord =
  currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
  // rotate out letters off current words
  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(()=> {
      letter.className = "letter out"
    }, i*80);
  });

  //reveal and rotate next word
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;

};

rotateText();
setInterval(rotateText, 4000);
