import Lenis from '@studio-freight/lenis'
import { gsap } from "gsap";  
import SplitType from 'split-type'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play()
    });
  }

  $("[words-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), { delay: (2), opacity: 0, yPercent: 100, duration: 0.5, ease: "back.out(2)", stagger: { amount: 0.5 } });
    tl.from(("#name"), { opacity: 0, duration: .8, ease: "power3.out"});
    createScrollTrigger($(this), tl);
  });

  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});

// loader
// Function to start the animation when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function(event) {
    // Start the animation
    gsap.fromTo(".loadinganimation", 
    { opacity: 1,
      display:"flex",
     }, 
    { opacity: 0, 
      duration: .3, 
      delay:1.5, 
      ease: "power2.in",
      onComplete: hideAnimation 
    });
});

// Function to hide the animation when the animation completes
function hideAnimation() {
    document.querySelector(".loadinganimation").style.display = "none";
}

// Function to end the animation when the page finishes loading
window.onload = function() { };