import{g as E,f as P,r as x,P as y,h as v,V as S,c as D,k as m,b as p}from"./index.bfab535e.js";import{m as w,u as A,f as B,V as I}from"./VOverlay.1dedc219.js";import{f as O}from"./forwardRefs.54bb1675.js";import{V as R}from"./dialog-transition.959ceb6f.js";import{h as T,q as F}from"./CRUD.ebf42a23.js";const C=E()({name:"VDialog",props:{fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...w({origin:"center center",scrollStrategy:"block",transition:{component:R},zIndex:2400})},emits:{"update:modelValue":r=>!0},setup(r,g){let{slots:c}=g;const n=P(r,"modelValue"),{scopeId:V}=A(),t=x();function u(o){var l,s;const e=o.relatedTarget,a=o.target;if(e!==a&&((l=t.value)==null?void 0:l.contentEl)&&((s=t.value)==null?void 0:s.globalTop)&&![document,t.value.contentEl].includes(a)&&!t.value.contentEl.contains(a)){const i=[...t.value.contentEl.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])')].filter(f=>!f.hasAttribute("disabled")&&!f.matches('[tabindex="-1"]'));if(!i.length)return;const d=i[0],h=i[i.length-1];e===d?h.focus():d.focus()}}y&&v(()=>n.value&&r.retainFocus,o=>{o?document.addEventListener("focusin",u):document.removeEventListener("focusin",u)},{immediate:!0}),v(n,async o=>{var e,a;await S(),o?(e=t.value.contentEl)==null||e.focus({preventScroll:!0}):(a=t.value.activatorEl)==null||a.focus({preventScroll:!0})});const b=D(()=>m({"aria-haspopup":"dialog","aria-expanded":String(n.value)},r.activatorProps));return T(()=>{const[o]=B(r);return p(I,m({ref:t,class:["v-dialog",{"v-dialog--fullscreen":r.fullscreen,"v-dialog--scrollable":r.scrollable}]},o,{modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,"aria-role":"dialog","aria-modal":"true",activatorProps:b.value},V),{activator:c.activator,default:function(){for(var e=arguments.length,a=new Array(e),l=0;l<e;l++)a[l]=arguments[l];return p(F,{root:!0},{default:()=>{var s;return[(s=c.default)==null?void 0:s.call(c,...a)]}})}})}),O({},t)}});export{C as V};
