import{c as te,y as le,z as ae,g as C,h as se,q as G,B as ne,H as ue}from"./CRUD.c1c6f201.js";import{a as E}from"./index.0a737923.js";import{g as L,I as F,M as oe,a0 as ie,r as b,c as S,R as re,j as ce,b as h,$ as ve}from"./index.68037d06.js";function H(s){const u=Math.abs(s);return Math.sign(s)*(u/((1/.501-2)*(1-u)+1))}function B(s){let{selectedElement:v,containerSize:u,contentSize:n,isRtl:p,currentScrollOffset:a,isHorizontal:o}=s;const t=o?v.clientWidth:v.clientHeight,i=o?v.offsetLeft:v.offsetTop,c=p&&o?n-i-t:i,r=u+a,g=t+c,x=t*.4;return c<=a?a=Math.max(c-x,0):r<=g&&(a=Math.min(a-(r-g-x),n-u)),a}function fe(s){let{selectedElement:v,containerSize:u,contentSize:n,isRtl:p,isHorizontal:a}=s;const o=a?v.clientWidth:v.clientHeight,t=a?v.offsetLeft:v.offsetTop,i=p&&a?n-t-o/2-u/2:t+o/2-u/2;return Math.min(n-u,Math.max(0,i))}const q=Symbol.for("vuetify:v-slide-group"),he=L()({name:"VSlideGroup",props:{centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:q},nextIcon:{type:F,default:"$next"},prevIcon:{type:F,default:"$prev"},showArrows:{type:[Boolean,String],validator:s=>typeof s=="boolean"||["always","desktop","mobile"].includes(s)},...te(),...le({selectedClass:"v-slide-group-item--active"})},emits:{"update:modelValue":s=>!0},setup(s,v){let{slots:u}=v;const{isRtl:n}=oe(),{mobile:p}=ie(),a=ae(s,s.symbol),o=b(!1),t=b(0),i=b(0),c=b(0),r=S(()=>s.direction==="horizontal"),{resizeRef:g,contentRect:x}=C(),{resizeRef:f,contentRect:k}=C(),_=S(()=>a.selected.value.length?a.items.value.findIndex(e=>e.id===a.selected.value[0]):-1),N=S(()=>a.selected.value.length?a.items.value.findIndex(e=>e.id===a.selected.value[a.selected.value.length-1]):-1);if(re){let e=-1;ce(()=>[a.selected.value,x.value,k.value,r.value],()=>{cancelAnimationFrame(e),e=requestAnimationFrame(()=>{if(x.value&&k.value){const l=r.value?"width":"height";i.value=x.value[l],c.value=k.value[l],o.value=i.value+1<c.value}if(_.value>=0&&f.value){const l=f.value.children[N.value];_.value===0||!o.value?t.value=0:s.centerActive?t.value=fe({selectedElement:l,containerSize:i.value,contentSize:c.value,isRtl:n.value,isHorizontal:r.value}):o.value&&(t.value=B({selectedElement:l,containerSize:i.value,contentSize:c.value,isRtl:n.value,currentScrollOffset:t.value,isHorizontal:r.value}))}})})}const I=b(!1);let M=0,P=0;function W(e){const l=r.value?"clientX":"clientY";P=(n.value&&r.value?-1:1)*t.value,M=e.touches[0][l],I.value=!0}function X(e){if(!o.value)return;const l=r.value?"clientX":"clientY",d=n.value&&r.value?-1:1;t.value=d*(P+M-e.touches[0][l])}function Y(e){const l=c.value-i.value;t.value<0||!o.value?t.value=0:t.value>=l&&(t.value=l),I.value=!1}function j(){!g.value||(g.value[r.value?"scrollLeft":"scrollTop"]=0)}const R=b(!1);function D(e){if(R.value=!0,!(!o.value||!f.value)){for(const l of e.composedPath())for(const d of f.value.children)if(d===l){t.value=B({selectedElement:d,containerSize:i.value,contentSize:c.value,isRtl:n.value,currentScrollOffset:t.value,isHorizontal:r.value});return}}}function K(e){R.value=!1}function U(e){var l;!R.value&&!(e.relatedTarget&&(l=f.value)!=null&&l.contains(e.relatedTarget))&&m()}function $(e){!f.value||(r.value?e.key==="ArrowRight"?m(n.value?"prev":"next"):e.key==="ArrowLeft"&&m(n.value?"next":"prev"):e.key==="ArrowDown"?m("next"):e.key==="ArrowUp"&&m("prev"),e.key==="Home"?m("first"):e.key==="End"&&m("last"))}function m(e){if(!!f.value)if(e){if(e==="next"){var d;const y=(d=f.value.querySelector(":focus"))==null?void 0:d.nextElementSibling;y?y.focus():m("first")}else if(e==="prev"){var z;const y=(z=f.value.querySelector(":focus"))==null?void 0:z.previousElementSibling;y?y.focus():m("last")}else if(e==="first"){var w;(w=f.value.firstElementChild)==null||w.focus()}else if(e==="last"){var V;(V=f.value.lastElementChild)==null||V.focus()}}else{var l;(l=[...f.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(ee=>!ee.hasAttribute("disabled"))[0])==null||l.focus()}}function T(e){const l=t.value+(e==="prev"?-1:1)*i.value;t.value=ve(l,0,c.value-i.value)}const J=S(()=>{let e=t.value>c.value-i.value?-(c.value-i.value)+H(c.value-i.value-t.value):-t.value;t.value<=0&&(e=H(-t.value));const l=n.value&&r.value?-1:1;return{transform:`translate${r.value?"X":"Y"}(${l*e}px)`,transition:I.value?"none":"",willChange:I.value?"transform":""}}),A=S(()=>({next:a.next,prev:a.prev,select:a.select,isSelected:a.isSelected})),O=S(()=>{switch(s.showArrows){case"always":return!0;case"desktop":return!p.value;case!0:return o.value||Math.abs(t.value)>0;case"mobile":return p.value||o.value||Math.abs(t.value)>0;default:return!p.value&&(o.value||Math.abs(t.value)>0)}}),Q=S(()=>Math.abs(t.value)>0),Z=S(()=>c.value>Math.abs(t.value)+i.value);return se(()=>{var e,l,d;return h(s.tag,{class:["v-slide-group",{"v-slide-group--vertical":!r.value,"v-slide-group--has-affixes":O.value,"v-slide-group--is-overflowing":o.value}],tabindex:R.value||a.selected.value.length?-1:0,onFocus:U},{default:()=>{var z,w;return[O.value&&h("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!Q.value}],onClick:()=>T("prev")},[(z=(e=u.prev)==null?void 0:e.call(u,A.value))!=null?z:h(E,null,{default:()=>[h(G,{icon:n.value?s.nextIcon:s.prevIcon},null)]})]),h("div",{key:"container",ref:g,class:"v-slide-group__container",onScroll:j},[h("div",{ref:f,class:"v-slide-group__content",style:J.value,onTouchstartPassive:W,onTouchmovePassive:X,onTouchendPassive:Y,onFocusin:D,onFocusout:K,onKeydown:$},[(l=u.default)==null?void 0:l.call(u,A.value)])]),O.value&&h("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!Z.value}],onClick:()=>T("next")},[(w=(d=u.next)==null?void 0:d.call(u,A.value))!=null?w:h(E,null,{default:()=>[h(G,{icon:n.value?s.prevIcon:s.nextIcon},null)]})])]}})}),{selected:a.selected,scrollTo:T,scrollOffset:t,focus:m}}}),Se=L()({name:"VSlideGroupItem",props:{...ne()},emits:{"group:selected":s=>!0},setup(s,v){let{slots:u}=v;const n=ue(s,q);return()=>{var p;return(p=u.default)==null?void 0:p.call(u,{isSelected:n.isSelected.value,select:n.select,toggle:n.toggle,selectedClass:n.selectedClass.value})}}});export{he as V,Se as a};
