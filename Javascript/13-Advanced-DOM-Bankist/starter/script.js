'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const section1 = document.querySelector('#section--1')
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// // COOKIE MESSAGE
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent='We use cokkies for improved functionality and analytics';
// message.innerHTML= 'We use cokkies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'
// // it cannot be prepended and appended at the same time, it is a live element
// header.prepend(message);
// // // header.append(message);
// // // header.append(message.cloneNode(true));
// // header.before(message);
// // header.after(message);
// document.querySelector('.btn--close-cookie').addEventListener('click',function(){
//   message.remove();
// });


// Building Tabbed components
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Bad practice
// tabs.forEach(t=> t.addEventListener('click',function(){

// }));

// using event delegation
tabsContainer.addEventListener('click',function(e){
  // using a matching strategy
  const clickedTab = e.target.closest('.operations__tab');
 
  
  if (!clickedTab) return;
  console.log(clickedTab);
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clickedTab.classList.add('operations__tab--active');
  console.log(clickedTab);

  // activate content area
  // remove
  tabsContent.forEach(
    content => content.classList.remove('operations__content--active')
  );
  
  document.querySelector(`.operations__content--${clickedTab.dataset.tab}`)
  .classList.add('operations__content--active');
  
 
});


// Passing Arguments to event handlers
// Menu fade animation
const handleHover = function(e){
   if(e.target.classList.contains('nav__link')){
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('img');

      siblings.forEach(el=>{
        if (el!== link) el.style.opacity=this;
      });

      logo.style.opacity=this;

      
    }
}

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const navHeight = nav.getBoundingClientRect().height;
// sticky navigation on certain position
// get initial coordinates of section1 
// const initialcoords = section1.getBoundingClientRect().top;
// console.log(initialcoords);


// using scroll event
// not ideal for performance
// window.addEventListener('scroll',function(){
//   console.log(window.scrollY);
//   if (window.scrollY > initialcoords) nav.classList.add('sticky');
//   else  nav.classList.remove('sticky');

// })

// const obsCallback = function(entries,observer){
//   // entries are an array of threshold entries
//   entries.forEach(entry=>{
//     console.log(entry);
//   })
// };

const stickyNav = function(entries,headerObserver){
   const [entry] = entries;
   console.log(entry);
   if(!entry.isIntersecting){
      nav.classList.add('sticky');
   }
   else{
    nav.classList.remove('sticky');
   }
};

// objserver options
const obsOptions = {
  // root is the element that the object is intersecting
  // null to look for the entire viewport
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`
};

// using intersection observer api
const headerObserver = new IntersectionObserver(stickyNav,obsOptions);
headerObserver.observe(header);



// revealing elements on scroll
// revealing sections
const allSections = document.querySelectorAll('.section');


const revealSection = function(entries,observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
    // sectionObserver.target.classList.remove('section--hidden');'
    // entry.target.classList.remove('section--hidden');
    
  entry.target.classList.remove('section--hidden');
  // unobserver
  observer.unobserve(entry.target);
  

};


const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold: 0.15,
});





allSections.forEach(function(section){
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});








// SELECTING DOCUMENTS
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section-1');
// const allButtons = document.getElementsByTagName('button');
// // live html collection
// if one button is removed the the collection updates
// this doesn't happen on a Nodelist
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// creating and inserting elements

