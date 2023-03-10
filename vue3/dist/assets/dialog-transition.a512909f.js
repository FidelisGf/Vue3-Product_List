import{e as C,b as y,l as P,a7 as u}from"./index.68037d06.js";import{a as m,d as q,s as v,b as A,n as B}from"./forwardRefs.54bb1675.js";const F=C({name:"VDialogTransition",props:{target:Object},setup(c,o){let{slots:e}=o;const s={onBeforeEnter(t){t.style.pointerEvents="none",t.style.visibility="hidden"},async onEnter(t,h){var i;await new Promise(n=>requestAnimationFrame(n)),await new Promise(n=>requestAnimationFrame(n)),t.style.visibility="";const{x:a,y:l,sx:d,sy:g,speed:r}=x(c.target,t),f=m(t,[{transform:`translate(${a}px, ${l}px) scale(${d}, ${g})`,opacity:0},{}],{duration:225*r,easing:q});(i=w(t))==null||i.forEach(n=>{m(n,[{opacity:0},{opacity:0,offset:.33},{}],{duration:225*2*r,easing:v})}),f.finished.then(()=>h())},onAfterEnter(t){t.style.removeProperty("pointer-events")},onBeforeLeave(t){t.style.pointerEvents="none"},async onLeave(t,h){var i;await new Promise(n=>requestAnimationFrame(n));const{x:a,y:l,sx:d,sy:g,speed:r}=x(c.target,t);m(t,[{},{transform:`translate(${a}px, ${l}px) scale(${d}, ${g})`,opacity:0}],{duration:125*r,easing:A}).finished.then(()=>h()),(i=w(t))==null||i.forEach(n=>{m(n,[{},{opacity:0,offset:.2},{opacity:0}],{duration:125*2*r,easing:v})})},onAfterLeave(t){t.style.removeProperty("pointer-events")}};return()=>c.target?y(u,P({name:"dialog-transition"},s,{css:!1}),e):y(u,{name:"dialog-transition"},e)}});function w(c){var o;const e=(o=c.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list"))==null?void 0:o.children;return e&&[...e]}function x(c,o){const e=c.getBoundingClientRect(),s=B(o),[t,h]=getComputedStyle(o).transformOrigin.split(" ").map(b=>parseFloat(b)),[i,a]=getComputedStyle(o).getPropertyValue("--v-overlay-anchor-origin").split(" ");let l=e.left+e.width/2;i==="left"||a==="left"?l-=e.width/2:(i==="right"||a==="right")&&(l+=e.width/2);let d=e.top+e.height/2;i==="top"||a==="top"?d-=e.height/2:(i==="bottom"||a==="bottom")&&(d+=e.height/2);const g=e.width/s.width,r=e.height/s.height,f=Math.max(1,g,r),n=g/f||0,E=r/f||0,p=s.width*s.height/(window.innerWidth*window.innerHeight),$=p>.12?Math.min(1.5,(p-.12)*10+1):1;return{x:l-(t+s.left),y:d-(h+s.top),sx:n,sy:E,speed:$}}export{F as V};
