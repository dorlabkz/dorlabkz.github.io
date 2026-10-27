/* DorLabKZ - theme switch: dark "One" look (default) <-> classic. Only adds an attribute and a button; no app logic touched. */
(function(){
"use strict";
var KEY="dorlab-ui",root=document.documentElement;
function get(){try{return localStorage.getItem(KEY)==="classic"?"classic":"one"}catch(e){return"one"}}
function set(v){try{localStorage.setItem(KEY,v)}catch(e){}}
function apply(v){if(v==="one")root.setAttribute("data-ui","one");else root.removeAttribute("data-ui");
 var m=document.querySelector('meta[name="theme-color"]');
 if(!m&&document.head){m=document.createElement("meta");m.name="theme-color";document.head.appendChild(m)}
 if(m)m.content=v==="one"?"#000000":"#F1F0EC"}
apply(get());
var TX={ru:["\u041a\u043b\u0430\u0441\u0441\u0438\u043a\u0430","\u041d\u043e\u0432\u044b\u0439 \u0432\u0438\u0434"],
 fr:["Classique","Nouveau style"],en:["Classic","New look"],
 kk:["\u041a\u043b\u0430\u0441\u0441\u0438\u043a\u0430","\u0416\u0430\u04a3\u0430 \u0442\u04af\u0440"],
 zh:["\u7ecf\u5178","\u65b0\u5916\u89c2"]};
function label(b){var L=TX[(root.lang||"ru").slice(0,2)]||TX.ru,one=get()==="one";
 b.textContent=one?L[0]:L[1];b.setAttribute("aria-pressed",one?"false":"true");b.title=one?L[0]:L[1]}
function init(){var host=document.querySelector("header.top .hrow");if(!host||document.getElementById("ui_toggle"))return;
 var wrap=document.createElement("div");wrap.className="ui-tools";
 var lang=host.querySelector(".lang");
 var b=document.createElement("button");b.type="button";b.id="ui_toggle";b.className="ui-toggle";
 b.onclick=function(){var v=get()==="one"?"classic":"one";set(v);apply(v);label(b)};
 if(lang){host.insertBefore(wrap,lang);wrap.appendChild(lang)}else host.appendChild(wrap);
 wrap.appendChild(b);label(b);
 try{new MutationObserver(function(){label(b)}).observe(root,{attributes:true,attributeFilter:["lang"]})}catch(e){}
 /* keep the selected tab visible in the scrollable tab bar (display only) */
 var row=document.getElementById("tabs");
 function center(){var t=row&&row.querySelector('[aria-selected="true"]');if(!t||row.scrollWidth<=row.clientWidth)return;
  var x=row.scrollLeft+(t.getBoundingClientRect().left-row.getBoundingClientRect().left)-(row.clientWidth-t.offsetWidth)/2;try{row.scrollTo({left:Math.max(0,x),behavior:"auto"})}catch(e){row.scrollLeft=Math.max(0,x)}}
 if(row)try{new MutationObserver(center).observe(row,{subtree:true,childList:true,attributes:true,attributeFilter:["aria-selected"]});center()}catch(e){}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
