import{aD as V,an as x,o as g,a as h,w as a,b as t,n as C,q as i,z as w,d as l}from"./index.bfab535e.js";import{V as r,a as n}from"./VRow.5238d267.js";import{V as y}from"./VAvatar.62c25bed.js";import{V as E,a as b,b as z,c as D,d as I}from"./VCard.30f22632.js";import{r as c}from"./CRUD.ebf42a23.js";import"./transition.a7013c9d.js";const S={class:"font-weight-medium text-h6 font-card"},k={__name:"CardProdutos",props:{widthCard:String,heightCard:String,index:Number,produto:Object,heightImg:String,detail:Boolean},emits:["detailProductEsp","defineCorEsp"],setup(e,{emit:u}){const{smAndDown:d}=x();function m(s){u("detailProductEsp",s)}function p(s){u("defineCorEsp",s)}return(s,o)=>(g(),h(I,{class:"ma-3 cards corpo-card",height:e.heightCard,width:e.widthCard},{default:a(()=>[(g(),h(r,{key:e.index},{default:a(()=>[t(n,{cols:"12",class:"img-card justify-center align-content-center"},{default:a(()=>[t(y,{src:e.produto.IMAGE,height:e.heightImg,class:"img-detail",onClick:o[0]||(o[0]=f=>m(e.produto.ID))},null,8,["src","height"])]),_:1})]),_:1})),t(E,{class:"text-body-1 text-sm-h5 font-weight-medium mt-3 font-card"},{default:a(()=>[C(i(e.produto.NOME),1)]),_:1}),t(b,{class:"text-justify text-subtitle-1 font-weight-medium font-card"},{default:a(()=>[C(i(e.produto.DESC),1)]),_:1}),t(z,null,{default:a(()=>[t(r,null,{default:a(()=>[t(n,{cols:"12",align:"start",class:"text-caption"},{default:a(()=>[w("p",S,i(parseFloat(e.produto.VALOR).toLocaleString("pt-br",{style:"currency",currency:"BRL"})),1)]),_:1})]),_:1})]),_:1}),t(D,null,{default:a(()=>[t(r,{class:"mt-n8"},{default:a(()=>[t(n,{cols:"12",sm:"12",align:"start"},{default:a(()=>[t(c,{class:"ml-n1",onClick:o[1]||(o[1]=f=>m(e.produto.ID)),color:"#F0E68C",icon:"mdi-information-outline",size:l(d)?"small":""},null,8,["size"]),t(c,{color:"#32de84",onClick:o[2]||(o[2]=f=>p(e.produto)),icon:"mdi-cart-outline",size:l(d)?"small":""},null,8,["size"]),t(c,{color:"#32de84",icon:"mdi-whatsapp",size:l(d)?"small":""},null,8,["size"])]),_:1})]),_:1})]),_:1})]),_:1},8,["height","width"]))}},j=V(k,[["__scopeId","data-v-80e85cf1"]]);export{j as default};
