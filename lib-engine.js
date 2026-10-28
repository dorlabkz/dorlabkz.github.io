/* DorLabKZ — библиотека методик испытаний: схемы (SVG) и отображение карточек */
(function(){
"use strict";
var UI={
 ru:{why:"Зачем это делают",when:"Когда это делают",whenNote:"Точную периодичность сверяйте с действующим СТ РК и проектом.",tab:"Методики",h:"Методики испытаний",hint:"Все испытания дорожной лаборатории: подготовка, выполнение по шагам, формулы, расчёт на примере и таблица результатов.",search:"Найти испытание или ГОСТ…",all:"Все",back:"Все методики",norm:"Нормативный документ",goal:"Что определяем",eq:"Оборудование и материалы",prep:"Подготовка пробы и образцов",steps:"Проведение испытания",calc:"Формулы",legend:"Обозначения",ex:"Пример расчёта",exIn:"Исходные данные (результаты взвешиваний и измерений)",exCalc:"Расчёт по шагам",exRes:"Таблица результатов",concl:"Заключение",req:"Требования и допуски",notes:"Важно",print:"Печать карточки",fig:"Схема",none:"Ничего не найдено. Попробуйте другое слово или номер стандарта.",count:function(n){return n+" "+(n%10===1&&n%100!==11?"методика":(n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?"методики":"методик"))},loading:"Загрузка методик…",fail:"Не удалось загрузить методики. Проверьте интернет и обновите страницу.",denied:"Методики и режим «Наставник» доступны только после входа на сайт.",check:"Значения требований и допусков приведены для ориентира — сверяйте с действующей редакцией стандарта и проектом.",fallback:""},
 fr:{why:"Pourquoi on le fait",when:"Quand on le fait",whenNote:"Vérifier la fréquence exacte dans le СТ РК en vigueur et le projet.",tab:"Méthodes",h:"Méthodes d'essai",hint:"Tous les essais du laboratoire routier : préparation, exécution pas à pas, formules, calcul sur un exemple et tableau de résultats.",search:"Chercher un essai ou un ГОСТ…",all:"Tous",back:"Toutes les méthodes",norm:"Norme",goal:"Ce que l'on détermine",eq:"Matériel et produits",prep:"Préparation de l'échantillon et des éprouvettes",steps:"Exécution de l'essai",calc:"Formules",legend:"Notations",ex:"Exemple de calcul",exIn:"Données (pesées et mesures)",exCalc:"Calcul pas à pas",exRes:"Tableau de résultats",concl:"Conclusion",req:"Exigences et tolérances",notes:"Important",print:"Imprimer la fiche",fig:"Schéma",none:"Aucun essai trouvé. Essaie un autre mot ou un numéro de norme.",count:function(n){return n+" méthode"+(n>1?"s":"")},loading:"Chargement des méthodes…",fail:"Impossible de charger les méthodes. Vérifie la connexion et recharge la page.",denied:"Les méthodes et l'accompagnement sont visibles uniquement après connexion au site.",check:"Les exigences et tolérances sont données à titre indicatif : vérifie-les dans l'édition en vigueur de la norme et dans le projet.",fallback:""},
 en:{why:"Why it is done",when:"When it is done",whenNote:"Check the exact frequency in the current СТ РК and the project.",tab:"Methods",h:"Test methods",hint:"Every road-lab test: preparation, step-by-step procedure, formulas, a worked example and the results table.",search:"Find a test or a GOST…",all:"All",back:"All methods",norm:"Standard",goal:"What is determined",eq:"Equipment and materials",prep:"Sample and specimen preparation",steps:"Test procedure",calc:"Formulas",legend:"Notation",ex:"Worked example",exIn:"Input data (weighings and readings)",exCalc:"Step-by-step calculation",exRes:"Results table",concl:"Conclusion",req:"Requirements and tolerances",notes:"Important",print:"Print this sheet",fig:"Diagram",none:"No test found. Try another word or a standard number.",count:function(n){return n+" method"+(n>1?"s":"")},loading:"Loading methods…",fail:"Could not load the methods. Check the connection and reload the page.",denied:"Methods and guided mode are only visible after signing in.",check:"Requirements and tolerances are given for guidance: check them against the current edition of the standard and the project.",fallback:""},
 kk:{why:"Не үшін жасалады",when:"Қашан жасалады",whenNote:"Нақты кезеңділікті қолданыстағы СТ РК және жобамен тексеріңіз.",tab:"Әдістемелер",h:"Сынақ әдістемелері",hint:"Жол зертханасының барлық сынақтары: дайындық, қадамдық орындау, формулалар, мысал есептеу және нәтижелер кестесі.",search:"Сынақты немесе ГОСТ іздеу…",all:"Барлығы",back:"Барлық әдістемелер",fallback:"Әдістеме мәтіндері әзірге орыс тілінде."},
 zh:{why:"为什么做",when:"什么时候做",whenNote:"具体频次请以现行 СТ РК 和设计文件为准。",tab:"试验方法",h:"试验方法",hint:"道路实验室全部试验：准备、分步操作、公式、算例及结果表。",search:"搜索试验或标准…",all:"全部",back:"全部方法",fallback:"方法正文暂为俄文。"}
};
function ui(lang){var b=UI[lang]||UI.ru,r={};for(var k in UI.ru)r[k]=UI.ru[k];for(k in b)r[k]=b[k];return r}

/* ---------------- SVG primitives ---------------- */
var LG="ru";
function W(ru,fr,en){return LG==="fr"?fr:LG==="en"?en:ru}
function E(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
function tx(x,y,s,o){o=o||{};return'<text x="'+x+'" y="'+y+'" class="'+(o.c||"st")+'"'+(o.a?' text-anchor="'+o.a+'"':'')+(o.s?' font-size="'+o.s+'"':'')+'>'+E(s)+'</text>'}
function R(x,y,w,h,c,r){return'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'"'+(r?' rx="'+r+'"':'')+' class="'+(c||"sk")+'"/>'}
function L(x1,y1,x2,y2,c){return'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" class="'+(c||"sl")+'"/>'}
function P(d,c){return'<path d="'+d+'" class="'+(c||"sl")+'"/>'}
function C(x,y,r,c){return'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" class="'+(c||"sk")+'"/>'}
function EL(x,y,rx,ry,c){return'<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" class="'+(c||"sk")+'"/>'}
function num(x,y,n){return'<g>'+C(x,y,11,"snc")+tx(x,y+4.5,n,{c:"snt",a:"middle"})+'</g>'}
function arrowD(x,y,len,lab){return L(x,y,x,y+len,"sa")+P("M"+(x-6)+" "+(y+len-10)+" L"+x+" "+(y+len)+" L"+(x+6)+" "+(y+len-10),"sa")+(lab?tx(x+9,y+12,lab,{c:"sv"}):"")}
function arrowR(x,y,len,lab){return L(x,y,x+len,y,"sa")+P("M"+(x+len-10)+" "+(y-6)+" L"+(x+len)+" "+y+" L"+(x+len-10)+" "+(y+6),"sa")+(lab?tx(x+len/2,y-7,lab,{c:"sv",a:"middle"}):"")}
function flow(x1,x2,y){return L(x1,y,x2-6,y,"sf")+P("M"+(x2-12)+" "+(y-5)+" L"+(x2-3)+" "+y+" L"+(x2-12)+" "+(y+5),"sf2")}
function dimH(x1,x2,y,lab){return L(x1,y,x2,y,"sd")+P("M"+(x1+7)+" "+(y-3)+" L"+x1+" "+y+" L"+(x1+7)+" "+(y+3)+"M"+(x2-7)+" "+(y-3)+" L"+x2+" "+y+" L"+(x2-7)+" "+(y+3),"sd")+L(x1,y-6,x1,y+6,"sd")+L(x2,y-6,x2,y+6,"sd")+tx((x1+x2)/2,y-4,lab,{c:"sdt",a:"middle"})}
function dimV(x,y1,y2,lab,left){return L(x,y1,x,y2,"sd")+P("M"+(x-3)+" "+(y1+7)+" L"+x+" "+y1+" L"+(x+3)+" "+(y1+7)+"M"+(x-3)+" "+(y2-7)+" L"+x+" "+y2+" L"+(x+3)+" "+(y2-7),"sd")+L(x-6,y1,x+6,y1,"sd")+L(x-6,y2,x+6,y2,"sd")+tx(left?x-6:x+6,(y1+y2)/2+4,lab,{c:"sdt",a:left?"end":"start"})}
/* callout: point (x,y) → label at (lx,ly) */
function co(x,y,lx,ly,lab){var left=lx<x,w=String(lab).length*6.3;if(left)lx=Math.max(lx,32+11+w);else lx=Math.min(lx,748-11-w);return C(x,y,2,"scd")+P("M"+x+" "+y+" L"+lx+" "+ly+" h"+(left?-8:8),"scl")+tx(lx+(left?-11:11),ly+4,lab,{c:"sco",a:left?"end":"start"})}
function waves(x,y,w){var d="M"+x+" "+y;for(var i=0;i+16<=w;i+=16)d+=" q4 -3 8 0 t8 0";return P(d,"sw2")}
function note(lines){return lines.map(function(l,i){return tx(40,378+i*19,l,{c:"sform"})}).join("")}
function defs(){return'<defs>'+
 '<pattern id="pMesh" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 0 L5 5 M5 0 L0 5" class="pmesh"/></pattern>'+
 '<pattern id="pHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" class="phatch"/></pattern>'+
 '<pattern id="pAsp" width="14" height="12" patternUnits="userSpaceOnUse"><rect width="14" height="12" class="pasp0"/><path d="M2 3 l3 -1 l1 3 l-3 1z M9 8 l3 -1 l1 2 l-3 2z" class="pasp1"/><circle cx="10" cy="3" r=".9" class="pasp2"/><circle cx="4" cy="9" r=".9" class="pasp2"/></pattern>'+
 '<pattern id="pAgg" width="18" height="14" patternUnits="userSpaceOnUse"><rect width="18" height="14" class="pagg0"/><path d="M1 4 l5 -3 l4 3 l-2 5 l-6 -1z M10 9 l5 -2 l3 4 l-4 3 l-4 -2z" class="pagg1"/></pattern>'+
 '<pattern id="pSand" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" class="pagg0"/><circle cx="2" cy="2" r=".8" class="pagg2"/><circle cx="6" cy="5" r=".8" class="pagg2"/><circle cx="3" cy="7" r=".6" class="pagg2"/></pattern>'+
 '<pattern id="pSoil" width="16" height="10" patternUnits="userSpaceOnUse"><rect width="16" height="10" class="psoil0"/><path d="M1 3 h5 M9 7 h5 M12 2 h3" class="psoil1"/><circle cx="6" cy="8" r=".8" class="psoil2"/></pattern>'+
 '<pattern id="pConc" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" class="pconc0"/><path d="M3 4 l3 -2 l1 3z M9 10 l3 -1 l-1 3z" class="pconc1"/><circle cx="10" cy="4" r=".8" class="pconc1"/><circle cx="4" cy="11" r=".7" class="pconc1"/></pattern>'+
 '</defs>'}
function stamp(norm,fig){return'<g>'+R(470,356,280,54,"sframe")+L(470,374,750,374,"sframe")+L(650,356,650,410,"sframe")+tx(476,369,norm,{c:"sstamp",s:10})+tx(700,369,fig,{c:"sstamp",a:"middle",s:10})+tx(476,398,"DorLabKZ",{c:"sstamp2",s:13})+tx(700,398,W("без масштаба","sans échelle","not to scale"),{c:"sstamp",a:"middle",s:9.5})+'</g>'}
function sheet(inner,norm,fig,title){var s='<svg viewBox="0 0 760 420" role="img" aria-label="'+E(title)+'" class="lsvg">'+defs()+'<rect x="0" y="0" width="760" height="420" class="sbg"/>'+R(6,6,748,408,"sframe")+R(26,10,724,400,"sframe2")+inner+stamp(norm,fig)+'</svg>';
 return LG==="en"?s.replace(/(\d),(\d)/g,"$1.$2"):s}

/* ---------------- equipment ---------------- */
/* balance: (x, y) = centre of the pan surface */
function bal(x,y,rd){return R(x-36,y,72,4,"sk",2)+R(x-4,y+4,8,8,"sk")+P("M"+(x-54)+" "+(y+12)+" h108 l7 32 h-122 z","sk")+R(x-30,y+20,46,14,"sdisp",2)+tx(x-7,y+31,rd||"0,00 g",{c:"sdispt",a:"middle",s:9})+C(x+28,y+27,3.5,"sin")+C(x+40,y+27,3.5,"sin")+C(x-44,y+27,3,"sin")+R(x-56,y+44,12,4,"sk")+R(x+44,y+44,12,4,"sk")}
/* hydrostatic weighing: balance on a table with under-hook, basket in water tank */
function hbal(x,y,rd,spec){return R(x-90,y+52,180,8,"fhatch")+L(x-82,y+60,x-82,y+178,"sl")+L(x+82,y+60,x+82,y+178,"sl")+bal(x,y,rd)+L(x,y+48,x,y+120,"sl")+C(x,y+50,2.5,"sk")+
 tank(x-60,y+92,120,86,"",{nolab:1})+R(x-24,y+120,48,40,"fmesh")+L(x-24,y+120,x,y+112,"sl")+L(x+24,y+120,x,y+112,"sl")+(spec===false?"":R(x-17,y+126,34,30,"fasp",2))}
function therm(x,y,h){var s=R(x-3.5,y,7,h-10,"sk",3.5)+C(x,y+h-5,6,"sacc")+L(x,y+h-12,x,y+h*0.42,"sacc2");for(var i=1;i<6;i++)s+=L(x+3.5,y+i*(h-16)/6,x+7,y+i*(h-16)/6,"sd");return s}
function tank(x,y,w,h,t,o){o=o||{};return R(x,y,w,h,"sk",2)+R(x+4,y+12,w-8,h-16,"swat")+waves(x+4,y+16,w-8)+(o.heat?P("M"+(x+10)+" "+(y+h-10)+(function(){var d="";for(var i=0;i<(w-30)/10;i++)d+=" l5 -6 l5 6";return d})(),"sheat"):"")+(o.noth?"":therm(x+w-14,y-18,o.th||h-6))+(o.nolab||!t?"":tx(x+w/2,y+h+16,t,{c:"sv",a:"middle"}))}
function oven(x,y,t,o){o=o||{};return R(x-60,y,120,104,"sk",5)+R(x-52,y+8,80,82,"sin",2)+L(x-52,y+38,x+28,y+38,"sl")+L(x-52,y+68,x+28,y+68,"sl")+(o.sample===false?"":P("M"+(x-42)+" "+(y+38)+" l4 -10 h52 l4 10","sk")+R(x-36,y+30,48,6,o.fill||"fagg"))+
 R(x+32,y+8,20,82,"sk",2)+R(x+34,y+12,16,11,"sdisp",1)+tx(x+42,y+21,o.disp||"110",{c:"sdispt",a:"middle",s:7})+C(x+42,y+36,4,"sin")+C(x+42,y+50,4,"sin")+L(x+28,y+40,x+28,y+60,"sk3")+
 R(x-56,y+104,10,5,"sk")+R(x+46,y+104,10,5,"sk")+L(x-40,y-4,x-20,y-4,"sd")+L(x-10,y-4,x+10,y-4,"sd")+tx(x,y+126,t||"105–110 °C",{c:"sv",a:"middle"})}
function desic(x,y,o){o=o||{};return P("M"+(x-60)+" "+(y+40)+" h120 l-10 80 h-100 z","sk")+R(x-50,y+64,100,52,"swat")+waves(x-50,y+68,100)+(o.spec===false?"":R(x-36,y+84,28,28,"fasp",2)+R(x+4,y+84,28,28,"fasp",2))+
 P("M"+(x-66)+" "+(y+40)+" q66 -50 132 0 z","sk")+R(x-6,y-4,12,14,"sk")+R(x-14,y-10,28,6,"sk",2)+L(x+6,y+2,x+70,y+2,"shose")+
 R(x+70,y-14,60,34,"sk",4)+C(x+86,y+3,9,"sin")+C(x+86,y+3,1.5,"sk")+L(x+86,y+3,x+91,y-3,"sacc2")+R(x+100,y-6,24,18,"sk",2)+L(x+104,y+20,x+104,y+28,"sl")+L(x+124,y+20,x+124,y+28,"sl")+
 co(x+86,y-6,x+120,y-40,W("вакуумметр","vacuomètre","vacuum gauge"))+co(x+112,y+12,x+150,y+40,W("насос","pompe","pump"))+tx(x,y+138,o.t||"≤ 2 kPa",{c:"sv",a:"middle"})}
function spec(x,y,w,h,c){c=c||"fasp";return R(x,y,w,h,c)+EL(x+w/2,y+h,w/2,5,c)+EL(x+w/2,y,w/2,5,c)+EL(x+w/2,y,w/2,5,"sasp2")}
/* press: (x, y) = top of columns; kind of specimen; lab = force label; sp = speed */
function press(x,y,kind,lab,sp,nolab){var top=kind==="split"||kind==="marsh"?y+86:kind==="cube"?y+102:kind==="beam"?y+110:y+108,b=y+178;
 var s=R(x-78,y,12,190,"sk")+R(x+66,y,12,190,"sk")+R(x-84,y-14,168,16,"sk",2)+R(x-88,y-20,14,8,"sk")+R(x+74,y-20,14,8,"sk")+R(x-96,b+12,192,16,"fhatch",2)+R(x-96,b+12,192,16,"sframe",2)+
  EL(x,y+22,18,14,"sk")+EL(x,y+22,11,8,"sin")+L(x,y+22,x+6,y+16,"sacc2")+L(x,y+2,x,y+8,"sl")+L(x,y+36,x,top-26,"sscrew")+R(x-44,top-26,88,10,"fhatch")+R(x-44,top-26,88,10,"sframe")+(kind==="cyl"||kind==="conf"?EL(x,top-12,10,4,"sk"):"")+
  R(x-48,b-14,96,12,"fhatch")+R(x-48,b-14,96,12,"sframe")+R(x-30,b-2,60,14,"sk")+C(x+50,b+4,9,"sin")+L(x+50,b+4,x+55,b-2,"sacc2");
 if(kind==="split")s+=EL(x,y+130,44,44,"fasp")+R(x-6,y+82,12,5,"sacc")+R(x-6,y+174,12,5,"sacc")+L(x,y+90,x,y+172,"sd");
 else if(kind==="cube")s+=R(x-38,y+92,76,72,"fconc");
 else if(kind==="beam")s+=R(x-60,y+128,120,34,"fconc")+C(x-46,y+165,4,"sacc")+C(x+46,y+165,4,"sacc")+C(x-16,y+125,4,"sacc")+C(x+16,y+125,4,"sacc")+R(x-26,y+106,52,8,"sk")+L(x-16,y+114,x-16,y+121)+L(x+16,y+114,x+16,y+121)+dimH(x-46,x+46,y+186-6,"l");
 else if(kind==="marsh")s+=P("M"+(x-48)+" "+(y+96)+" a54 54 0 0 0 0 68 M"+(x+48)+" "+(y+96)+" a54 54 0 0 1 0 68","sacc3")+EL(x,y+130,40,40,"fasp")+R(x-58,y+92,14,8,"sk")+R(x+44,y+92,14,8,"sk");
 else if(kind==="conf")s+=R(x-46,y+108,9,56,"fhatch")+R(x+37,y+108,9,56,"fhatch")+spec(x-34,y+110,68,54);
 else s+=spec(x-34,y+110,68,54);
 return s+arrowD(x,y-70,46,lab||"P")+(sp?tx(x+96,y+8,sp,{c:"sv"}):"")+(nolab?"":co(x-78,y+70,x-112,y+70,W("станина","bâti","frame"))+co(x-12,y+22,x-112,y+22,W("силоизмеритель","dynamomètre","load cell"))+co(x-44,b-8,x-112,b-8,W("плита","plateau","platen")))}
function sieve(x,y,w,lab,fill,c){return R(x,y,w,26,"sk",2)+R(x+3,y+18,w-6,4,"fmesh")+(fill?P("M"+(x+8)+" "+(y+18)+" q"+((w-16)/2)+" -14 "+(w-16)+" 0 z",c||"fagg"):"")+(lab?tx(x+w+8,y+19,lab,{c:"sdt"}):"")}
function stack(x,y,w,labs,fill,c){var s=R(x-4,y-10,w+8,10,"sk",3);labs.forEach(function(l,i){s+=sieve(x,y+i*28,w,l,fill&&fill[i],c)});return s+R(x,y+labs.length*28,w,16,"sk",3)}
function shaker(x,y,w){return R(x-10,y,w+20,18,"sk",3)+R(x-4,y+18,w+8,10,"sk")+P("M"+(x-12)+" "+(y+9)+" l-8 -5 m0 10 l8 -5 M"+(x+w+12)+" "+(y+9)+" l8 -5 m0 10 l-8 -5","sa")}
function tray(x,y,w,c){return P("M"+x+" "+y+" l8 16 h"+(w-16)+" l8 -16","sk")+P("M"+(x+6)+" "+(y+12)+" q"+((w-12)/2)+" -14 "+(w-12)+" 0 z",c||"fagg")}
function beaker(x,y,w,h,lvl,c){var s=P("M"+x+" "+y+" v"+h+" q0 4 4 4 h"+(w-8)+" q4 0 4 -4 v"+(-h)+" M"+(x-4)+" "+y+" h"+(w+8),"sl");for(var i=1;i<5;i++)s+=L(x+2,y+h-i*h/5,x+10,y+h-i*h/5,"sd");return(lvl?R(x+1,y+h-lvl,w-2,lvl+3,c||"swat"):"")+s}
function flask(x,y,lvl,c){return(lvl?P("M"+(x-28)+" "+(y+64)+" l-14 24 q-3 7 6 7 h72 q9 0 6 -7 l-14 -24 z",c||"swat"):"")+P("M"+(x-9)+" "+y+" v34 l-34 54 q-4 7 6 7 h74 q10 0 6 -7 l-34 -54 v-34","sl")+R(x-12,y-8,24,8,"sk",2)+L(x-9,y+20,x+9,y+20,"sd")}
function burner(x,y){return R(x-16,y+30,32,8,"sk",2)+R(x-5,y+4,10,26,"sk")+L(x+5,y+22,x+22,y+22,"shose")+P("M"+(x-6)+" "+(y+4)+" q6 -26 6 -34 q0 12 6 34 z","sflame")}
function hotplate(x,y,w){return R(x,y,w,14,"sk",3)+L(x+8,y+5,x+w-8,y+5,"sheat")+C(x+w-14,y+20,4,"sin")+R(x+6,y+14,w-12,12,"sk",2)}
function heap(x,y,w,h,c){return P("M"+(x-w/2)+" "+y+" Q"+x+" "+(y-h*2)+" "+(x+w/2)+" "+y+" Z",c||"fagg")}
function shovel(x,y){return P("M"+x+" "+y+" l44 -44","sk4")+P("M"+(x-10)+" "+(y-6)+" l20 20 l-18 12 l-14 -14 z","sk")}
function quarter(x,y){return heap(x,y,130,24)+L(x-70,y-18,x+70,y-18,"sdash")+L(x,y-52,x,y+12,"sdash")+P("M"+(x-60)+" "+(y-5)+" l20 -10 M"+(x+40)+" "+(y-25)+" l20 10","sa")+tx(x,y+26,"¼ + ¼",{c:"sdt",a:"middle"})}
function mould(x,y,w,h,fill){return R(x,y,8,h,"fhatch")+R(x+w-8,y,8,h,"fhatch")+R(x,y,8,h,"sframe")+R(x+w-8,y,8,h,"sframe")+R(x+8,y+h*0.18,w-16,h*0.66,fill||"fasp")+R(x+8,y+h*0.84,w-16,h*0.16,"fhatch")+R(x+8,y+h*0.84,w-16,h*0.16,"sframe")+R(x+8,y+h*0.06,w-16,h*0.12,"fhatch")+R(x+8,y+h*0.06,w-16,h*0.12,"sframe")+R(x-10,y+h,w+20,8,"sk",2)}
function cyl(x,y,w,h,c){return spec(x,y,w,h,c||"fasp")}
function stopwatch(x,y,t){return C(x,y,13,"sk")+R(x-3,y-19,6,5,"sk")+L(x,y,x,y-8,"sl")+L(x,y,x+6,y+3,"sacc2")+(t?tx(x+18,y+4,t,{c:"sv"}):"")}
function stand(x,y,h){return R(x-40,y+h,80,8,"sk",2)+R(x-30,y,6,h,"sk")}

/* ---------------- schematics by key ---------------- */
var S={};
/* --- asphalt --- */
S.sampleMix=function(){return num(48,34,1)+P("M60 70 h120 v60 l-20 30 h-80 l-20 -30 z","sk")+R(100,160,40,10,"sk")+heap(120,248,150,26,"fasp")+L(120,170,120,226,"sa")+co(176,80,210,58,W("мешалка / кузов","malaxeur / benne","mixer / truck"))+co(150,240,210,226,W("3 точки","3 points","3 points"))+tx(120,60,"t ≥ 120 °C",{c:"sv",a:"middle"})+
 flow(230,262,200)+num(272,34,2)+quarter(340,240)+tx(340,300,W("квартование","quartage","quartering"),{c:"sv",a:"middle"})+
 flow(420,452,200)+num(462,34,3)+R(470,140,80,60,"sk",4)+P("M478 140 v-14 h64 v14","sk")+heap(510,196,60,14,"fasp")+co(548,150,590,110,W("тара с крышкой","bac avec couvercle","lidded container"))+
 flow(560,600,200)+num(612,34,4)+bal(660,204,"12,6 kg")+R(642,190,36,14,"sk",2)+tx(660,278,W("этикетка: объект, дата, t","étiquette : chantier, date, t","label: site, date, t"),{c:"sv",a:"middle"})+
 note([W("M = (n·m₁ + Mэкстр + Mпикн) · 1,2","M = (n·m₁ + Mextr + Mpycn) · 1,2","M = (n·m₁ + Mextr + Mpycn) · 1,2"),"m₁ = π·d²/4 · h · ρ"])}
S.form=function(){return num(48,34,1)+oven(120,60,"140–160 °C",{fill:"fasp",disp:"150"})+co(90,96,130,240,W("смесь на противне","mélange sur plateau","mix on tray"))+
 flow(196,236,150)+num(246,34,2)+mould(262,60,90,190)+co(270,120,226,276,W("форма (разрез)","moule (coupe)","mould (section)"))+co(307,74,380,50,W("верхний вкладыш","piston supérieur","top plunger"))+co(307,240,380,276,W("нижний вкладыш","piston inférieur","bottom plunger"))+dimH(270,344,296,"d = 71,4")+dimV(372,94,220,"h = d")+
 flow(420,470,150)+num(480,34,3)+press(600,96,"cyl","40 МПа · 3 min")+note(["F = p · A = 40 N/mm² · π·d²/4","m = π·d²/4 · h · ρ"])}
S.dens=function(){return num(48,34,1)+bal(120,190,"m")+spec(98,140,44,48)+co(120,162,170,110,W("сухой образец","éprouvette sèche","dry specimen"))+
 flow(196,232,214)+num(250,34,2)+hbal(330,60,"m₂")+co(306,150,240,320,W("корзинка","panier","basket"))+co(374,140,420,310,W("вода 20 ± 2 °C","eau 20 ± 2 °C","water 20 ± 2 °C"))+
 flow(434,468,214)+num(486,34,3)+stopwatch(520,90,"30 min")+bal(590,190,"m₁")+spec(568,140,44,48)+co(612,150,640,290,W("промокнуть тканью","essuyer au chiffon","blot with cloth"))+
 note(["ρm = m · ρw / (m₁ − m₂)","V = m₁ − m₂"])}
S.wsat=function(){return num(48,34,1)+desic(150,120)+co(130,200,180,290,W("образцы в воде","éprouvettes dans l'eau","specimens in water"))+stopwatch(110,70,"1 h + 30 min")+
 flow(330,372,214)+num(390,34,2)+bal(450,190,"m₃")+spec(428,140,44,48)+flow(520,552,214)+num(566,34,3)+hbal(640,60,"m₄")+
 note(["W = (m₃ − m) / (m₁ − m₂) · 100 %","Н = [(m₃ − m₄) − (m₁ − m₂)] / (m₁ − m₂) · 100 %"])}
S.truedens=function(){return num(48,34,1)+bal(110,220,"g")+flask(110,110,22,"fasp")+co(110,196,150,300,W("проба ≤ 6 мм","échantillon ≤ 6 mm","sample ≤ 6 mm"))+
 flow(180,214,200)+num(228,34,2)+desic(310,110,{spec:false})+flask(310,140,60)+R(280,190,60,10,"fasp")+co(330,172,400,300,W("вода + смачиватель","eau + mouillant","water + wetting agent"))+
 flow(480,510,200)+num(526,34,3)+bal(600,220,"g₃")+flask(600,110,74)+R(572,188,56,8,"fasp")+co(600,104,670,80,W("до метки","au trait","to the mark"))+
 note(["ρ = (g − g₁) · ρw / [(g − g₁) − (g₃ − g₂)]","ρмин = 100 / Σ(qᵢ/ρᵢ);  ρ = (100 + qб) / (100/ρмин + qб/ρб)"])}
S.porosity=function(){var s=R(70,50,220,220,"fasp");[[120,110,9],[200,90,7],[150,190,8],[240,210,6],[100,230,5],[230,150,7]].forEach(function(v){s+=C(v[0],v[1],v[2],"svoid")});
 return num(48,34,1)+s+co(200,90,340,70,W("воздушная пора","vide d'air","air void"))+co(130,150,340,130,W("битум + мелочь","bitume + fines","bitumen + fines"))+co(180,240,340,240,W("зёрна щебня","gravillons","stone grains"))+
 R(470,70,40,180,"sk")+R(470,70,40,24,"svoid")+R(470,94,40,40,"sbit")+R(470,134,40,116,"fagg")+dimV(530,70,94,"Vост")+dimV(560,70,134,"Vмин")+tx(490,270,W("объём 100 %","volume 100 %","volume 100 %"),{c:"sv",a:"middle"})+
 note(["Vост = (1 − ρm / ρ) · 100 %","Vмин = (1 − ρmᵐⁱⁿ / ρмин) · 100 %;  ρmᵐⁱⁿ = ρm · 100 / (100 + qб)"])}
S.comp=function(){return num(48,34,1)+tank(60,120,170,120,W("50 / 20 / 0 °C — 1 ч","50 / 20 / 0 °C — 1 h","50 / 20 / 0 °C — 1 h"),{heat:1})+cyl(90,170,46,46)+cyl(150,176,46,40)+co(112,180,80,90,W("образцы","éprouvettes","specimens"))+co(140,232,200,290,W("нагреватель","chauffage","heater"))+
 flow(250,300,220)+num(316,34,2)+press(480,100,"cyl","P","3 mm/min")+note(["R = P / F · 10⁻² (MPa);  F = π·d² / 4","P, N;  F, cm²"])}
S.wres=function(){return num(48,34,1)+desic(150,110)+tx(150,280,W("насыщение: 1 ч вакуум + 30 мин","saturation : 1 h vide + 30 min","saturation: 1 h vacuum + 30 min"),{c:"sv",a:"middle"})+flow(300,330,214)+num(344,34,2)+tank(350,150,120,90,W("20 °C · 15 сут","20 °C · 15 jours","20 °C · 15 days"))+cyl(380,190,40,36)+
 flow(480,512,214)+num(530,34,3)+press(640,100,"cyl","Pw")+note(["Kw = Rw / R20","Kw.дл = R15 / R20"])}
S.split=function(){return num(48,34,1)+tank(60,120,170,120,"0 ± 2 °C · 1 h")+EL(110,196,30,30,"fasp")+EL(176,200,26,26,"fasp")+P("M80 150 l8 -8 l8 8 M180 148 l8 -8 l8 8","sice")+co(188,146,250,96,W("лёд","glace","ice"))+
 flow(250,300,220)+num(316,34,2)+press(480,100,"split","P","50 mm/min")+co(486,184,600,330,W("опорные полосы","réglettes de chargement","loading strips"))+note(["Rp = P / (h · d) · 10⁻²  (MPa)"])}
S.shear=function(){return num(48,34,1)+tank(44,140,130,96,"50 °C · 1 h",{heat:1})+cyl(80,180,46,40)+num(220,34,2)+press(320,100,"cyl","Pсж","50 mm/min",1)+num(470,34,3)+press(590,100,"conf","Pм","",1)+co(546,250,500,334,W("обойма Маршалла","mâchoires Marshall","Marshall jig"))+
 note(["A = P·l / 2;  tg φ = 3·(Am − Ac) / (3·Am − 2·Ac)","Cл = (1/6)·(3 − 2·tg φ)·Rс"])}
S.marshall=function(){return num(48,34,1)+R(84,40,12,120,"sk")+R(66,160,48,10,"sk")+R(60,60,60,22,"sacc",3)+co(120,70,160,50,"4,54 kg")+dimV(140,82,160,"457 mm")+R(64,170,52,70,"fhatch")+R(70,176,40,58,"fasp")+R(52,240,76,10,"sk",2)+tx(90,272,W("2 × 75 ударов","2 × 75 coups","2 × 75 blows"),{c:"sv",a:"middle"})+
 flow(176,208,214)+num(222,34,2)+tank(214,150,120,92,"60 °C · 30–40 min",{heat:1})+cyl(250,190,48,38)+flow(344,376,214)+num(392,34,3)+press(520,100,"marsh","S","50,8 mm/min")+co(620,236,660,330,W("индикатор текучести","comparateur de fluage","flow gauge"))+
 note(["S' = S · k (" + W("поправка на высоту","correction de hauteur","height correction") + ")","MQ = S' / F"])}
S.rut=function(){return num(48,34,1)+R(60,220,330,60,"sk",3)+R(74,230,302,40,"fasp")+R(60,280,330,10,"fhatch")+C(225,182,40,"sk")+C(225,182,30,"sin")+C(225,182,8,"sacc")+R(215,80,20,94,"sk")+R(160,70,130,14,"sk",2)+arrowD(250,30,40,"700 N")+P("M176 182 h-50 M274 182 h50","sa")+P("M126 176 l-10 6 l10 6 M324 176 l10 6 l-10 6","sa")+P("M190 230 q35 14 70 0","sacc3")+
 co(225,152,320,120,W("колесо с шиной","roue caoutchouc","rubber wheel"))+co(100,250,140,320,W("плита 300 × 300","plaque 300 × 300","slab 300 × 300"))+tx(225,312,W("камера 60 °C","enceinte 60 °C","chamber 60 °C"),{c:"sv",a:"middle"})+
 num(430,34,2)+P("M460 300 V70 M460 300 H730","sl")+P("M460 300 C520 190 600 175 720 160","sacc3")+L(600,300,600,174,"sdash")+L(720,300,720,160,"sdash")+tx(470,80,"RD, mm",{c:"sv"})+tx(728,318,"N",{c:"sv",a:"end"})+tx(600,318,"5000",{c:"sdt",a:"middle"})+tx(700,318,"10000",{c:"sdt",a:"middle"})+
 note(["WTS = (d₁₀₀₀₀ − d₅₀₀₀) / 5","PRD = d₁₀₀₀₀ / t · 100 %"])}
S.binder=function(){return num(48,34,1)+oven(116,70,"105–110 °C",{fill:"fasp"})+co(80,104,120,250,W("сушка навески","séchage de la prise","drying the portion"))+flow(186,220,200)+num(236,34,2)+
 R(272,60,60,30,"sk",3)+L(282,68,322,68,"sd")+L(282,78,322,78,"sd")+co(332,72,380,60,W("холодильник","réfrigérant","condenser"))+R(282,80,40,110,"sl")+R(290,96,24,70,"fmesh")+R(294,140,16,24,"fasp")+co(310,120,380,120,W("гильза с пробой","cartouche + prise","thimble with sample"))+flask(302,190,30,"sbitw")+co(320,262,380,252,W("растворитель","solvant","solvent"))+hotplate(262,286,80)+
 flow(410,450,200)+num(466,34,3)+bal(560,214,"g₁")+tray(522,198,76)+co(560,200,640,160,W("чистая мин. часть","granulats propres","clean aggregate"))+
 note(["Б = (g − g₁) / g₁ · 100 %","Бсм = (g − g₁) / g · 100 %"])}
S.extrGrad=function(){return num(48,34,1)+heap(110,250,140,30,"fagg")+tx(110,276,"g₁",{c:"sv",a:"middle"})+flow(190,226,200)+num(240,34,2)+stack(260,50,110,["20","15","10","5","2,5","1,25","0,63"],[1,1,1,1,1,1,1])+shaker(260,262,110)+
 co(370,80,430,40,W("сито","tamis","sieve"))+co(370,262,430,290,W("встряхиватель","tamiseuse","shaker"))+flow(440,480,200)+num(496,34,3)+bal(600,214,"mᵢ")+tray(562,198,76)+note(["aᵢ = mᵢ / g₁ · 100 %;  Aᵢ = Σaᵢ;  Пᵢ = 100 − Aᵢ"])}
S.drain=function(){return num(48,34,1)+beaker(70,120,90,110,70,"fasp")+co(160,170,180,70,W("стакан 1000 мл","bécher 1000 ml","1000 ml beaker"))+bal(115,250,"g₂")+
 flow(220,256,200)+num(270,34,2)+oven(350,90,W("T макс. · 60 ± 1 мин","T max · 60 ± 1 min","T max · 60 ± 1 min"),{sample:false})+R(306,120,40,26,"fasp")+flow(430,466,200)+num(480,34,3)+P("M520 120 l40 70 M560 120 l-6 4","sl")+beaker(510,120,70,100,0)+P("M512 216 q34 -10 66 0","sbitl")+co(545,212,470,300,W("стёкший битум","bitume égoutté","drained bitumen"))+bal(650,250,"g₃")+
 note(["B = (g₃ − g₁) / (g₂ − g₁) · 100 %"])}
/* --- binders: СТ РК 1211, emulsions СТ РК 1274, sand 1217 §9 --- */
function cylg(x,y,h,lvl,c){var s=P("M"+x+" "+y+" v"+h+" h28 v"+(-h),"sl")+R(x-6,y+h,40,6,"sk",2);for(var i=1;i<8;i++)s+=L(x,y+h-i*h/8,x+8,y+h-i*h/8,"sd");return(lvl?R(x+1,y+h-lvl,26,lvl,c||"swat"):"")+s}
function dish(x,y,w,c){return P("M"+(x-w/2)+" "+y+" q"+(w/2)+" "+(w*0.45)+" "+w+" 0","sk")+(c?P("M"+(x-w/2+8)+" "+(y+6)+" q"+(w/2-8)+" "+(w*0.3)+" "+(w-16)+" 0 z",c):"")}
S.visc=function(){return num(48,34,1)+oven(130,70,"135 ± 5,5 °C · 10 min",{sample:false})+flow(220,262,150)+num(280,34,2)+tank(290,100,190,190,"60 ± 0,3 °C · 30 min",{heat:0})+
 P("M360 70 v150 q0 22 22 22 q22 0 22 -22 v-40 M382 70 v120","sl")+C(382,200,7,"sbit")+R(376,140,12,40,"sbitl")+L(352,120,368,120,"sacc2")+L(352,150,368,150,"sacc2")+co(352,150,200,250,W("метки t₁, t₂","traits t₁, t₂","marks t₁, t₂"))+
 L(404,60,560,60,"shose")+R(560,40,90,44,"sk",4)+C(584,62,12,"sin")+L(584,62,590,55,"sacc2")+tx(605,104,"40 000 Pa",{c:"sv",a:"middle"})+num(560,140,3)+stopwatch(600,200,"t, 0,1 s")+note(["η = C · t   (C — Pa, t — s)"])}
S.emix=function(){return num(48,34,1)+heap(120,250,120,40)+tx(120,280,W("65 г + 50 г + 8 г","65 g + 50 g + 8 g","65 g + 50 g + 8 g"),{c:"sv",a:"middle"})+beaker(170,90,40,70,40)+co(190,120,250,90,W("14 см³ эмульсии","14 cm³ d'émulsion","14 cm³ emulsion"))+stopwatch(110,90,"45 s")+
 flow(260,300,220)+num(320,34,2)+P("M360 250 q60 -40 120 0","sbitl")+tx(420,280,W("плёнка сплошная → тип 3","film continu → type 3","continuous film → type 3"),{c:"sv",a:"middle"})+
 num(540,34,3)+heap(620,250,110,34,"fagg")+C(600,226,5,"sbit")+C(640,232,4,"sbit")+tx(620,280,W("сгустки → пористая смесь","grumeaux → mélange poreux","lumps → open mix"),{c:"sv",a:"middle"})+note([W("тип 1 — не смешивается;","type 1 — ne se mélange pas ;","type 1 — does not mix;"),W("тип 2 — только пористая; тип 3 — обе","type 2 — poreux ; type 3 — les deux","type 2 — open only; type 3 — both")])}
S.ebreak=function(){return num(48,34,1)+bal(130,220,"M₁ · M₂")+dish(130,200,90,"sbitl")+num(270,34,2)+dish(380,200,110,"fsand")+P("M380 80 l0 90","sa")+heap(380,80,40,14,"fsand")+co(380,110,470,90,W("кварцевый песок 0,14–0,315","sable siliceux 0,14–0,315","quartz sand 0.14–0.315"))+
 num(520,34,3)+bal(620,220,"M₃")+dish(620,200,90,"fsand")+note(["Ир = (M₃ − M₂) / (M₂ − M₁) · 100"])}
S.ebind=function(){return num(48,34,1)+bal(130,220,"m₂")+dish(130,200,90,"sbitl")+flow(210,250,200)+num(260,34,2)+hotplate(300,230,160)+dish(380,222,110,"sbitl")+P("M350 170 q6 -14 0 -28 M380 165 q6 -14 0 -28 M410 170 q6 -14 0 -28","sw2")+co(380,150,250,90,W("пузырьки исчезли, зеркальная поверхность","plus de bulles, surface miroir","no bubbles, mirror surface"))+
 flow(470,510,200)+num(520,34,3)+bal(620,220,"m₃")+dish(620,200,90,"sbit")+note(["Мб = (m₃ − m₁) / (m₂ − m₁) · 100 %"])}
S.esieve=function(){return num(48,34,1)+beaker(70,80,70,90,60,"sbitl")+P("M140 120 q40 -10 60 40","sbitl")+sieve(170,170,110,"0,63",1,"sbit")+P("M190 196 l35 40 l35 -40","sl")+beaker(205,240,40,50,20,"swat")+co(260,180,330,140,W("1 % раствор","solution 1 %","1 % solution"))+
 num(360,34,2)+oven(470,90,"105–110 °C",{sample:false})+num(560,34,3)+bal(650,220,"m₂")+R(620,200,60,20,"fmesh")+note(["H = (m₂ − m₁) / m₃ · 100 %",W("повторить через 7 суток хранения","refaire après 7 jours de stockage","repeat after 7 days of storage")])}
S.estrat=function(){var s=num(48,34,1);[0,1,2,3,4,5,6].forEach(function(i){var x=90+i*86,l=6+i*2;s+=cylg(x,90,180,170,"sbitl")+R(x+1,90+180-170,26,l,"swat")+tx(x+14,300,W("сут ","j ","d ")+(i+1),{c:"sv",a:"middle"})});
 return s+co(117,96,200,70,W("уровень расслоения P, мл","niveau de séparation P, ml","separation level P, ml"))+note(["РА = (P₁ + … + P₇) / (7 · V) · 100 %"])}
S.eadh=function(){return num(48,34,1)+heap(120,200,110,30,"fagg")+tx(120,230,"200 g + 10 g",{c:"sv",a:"middle"})+num(230,34,2)+oven(320,90,"60 °C · 24 h",{fill:"fasp"})+num(420,34,3)+beaker(450,100,110,130,100)+P("M470 210 l16 -8 l14 12 l-8 14 l-18 -2 z","sbitstone")+P("M510 196 l16 -8 l14 12 l-8 14 l-18 -2 z","sbitstone")+tx(505,260,"60 °C · 20 h",{c:"sv",a:"middle"})+
 num(600,34,4)+R(600,180,120,8,"sk")+P("M620 176 l14 -10 l14 8 l-6 10 z M660 176 l14 -10 l14 8 l-6 10 z","sbitstone")+tx(660,220,"100 / 90 / 75 / 50 %",{c:"sv",a:"middle"})}
S.etransp=function(){return num(48,34,1)+R(150,250,320,20,"sk",4)+P("M120 260 l-16 -8 m0 16 l16 -8 M500 260 l16 -8 m0 16 l-16 -8","sa")+flask(240,140,40,"sbitl")+flask(380,140,40,"sbitl")+tx(310,300,W("130 колебаний/мин · 8 мм · 2 ч","130 oscill./min · 8 mm · 2 h","130 strokes/min · 8 mm · 2 h"),{c:"sv",a:"middle"})+
 num(560,34,2)+flask(640,140,40,"sbitl")+co(640,225,700,120,W("нет границы битум/вода","pas de limite bitume/eau","no bitumen/water boundary"))}
S.eph=function(){return num(48,34,1)+beaker(110,120,110,130,90,"sbitl")+R(150,40,30,150,"sk",10)+L(165,190,165,232,"sl")+L(180,60,280,60,"shose")+R(280,30,140,70,"sk",6)+R(295,45,110,30,"sdisp",3)+tx(350,66,"pH 3,1",{c:"sdispt",a:"middle",s:14})+
 num(480,34,2)+R(520,150,30,90,"sacc",3)+tx(535,270,W("индикаторная бумага","papier indicateur","indicator paper"),{c:"sv",a:"middle"})+note([W("анионные 10–13 · катионные 2,5–3,5","anioniques 10–13 · cationiques 2,5–3,5","anionic 10–13 · cationic 2.5–3.5")])}
S.sswell=function(){return num(48,34,1)+sieve(70,90,110,"0,16",1,"fsand")+tx(125,150,W("200 г, < 0,16 мм","200 g, < 0,16 mm","200 g, < 0.16 mm"),{c:"sv",a:"middle"})+num(260,34,2)+cylg(300,70,220,40,"fsand")+cylg(360,70,220,40,"fsand")+co(328,250,440,250,"V₀ = 10 ml")+
 num(470,34,3)+cylg(520,70,220,220,"swat")+R(521,290-52,26,52,"fsand")+cylg(580,70,220,220,"swat")+R(581,290-54,26,54,"fsand")+co(548,240,660,200,"V, 24 h")+tx(560,330,"CaCl₂ 5 % · 5 ml",{c:"sv",a:"middle"})+note(["K = (V − V₀) / V₀ ;  Пгл = A · Г / 100"])}
/* --- asphalt: СТ РК 1218-2024, new sections --- */
function freezer(x,y,t){var s="",i;for(i=0;i<4;i++)s+=P("M"+(x+28+i*24)+" "+(y+18)+" v18 M"+(x+20+i*24)+" "+(y+22)+" l16 10 M"+(x+20+i*24)+" "+(y+32)+" l16 -10","sice");
 return R(x,y,120,130,"sk",8)+R(x+8,y+8,104,114,"sin",4)+s+L(x+8,y+52,x+112,y+52,"sl")+R(x+112,y+50,6,24,"sk",2)+(t?tx(x+60,y+148,t,{c:"sv",a:"middle"}):"")}
function bag(x,y,w,h){return R(x-4,y-4,w+8,h+8,"sdash",6)+spec(x,y,w,h)}
S.bend=function(){return num(48,34,1)+therm(80,110,130)+R(110,190,110,40,"fconc")+R(110,190,110,40,"fasp")+stopwatch(170,140,"2 h")+tx(165,268,W("воздух 20 ± 2 °C","air 20 ± 2 °C","air 20 ± 2 °C"),{c:"sv",a:"middle"})+
 flow(250,290,214)+num(306,34,2)+press(470,100,"beam","P","3 mm/min")+
 co(424,232,612,330,W("опоры, пролёт l","appuis, portée l","supports, span l"))+co(486,225,612,120,W("стержень ⌀ 10 мм","barreau ⌀ 10 mm","rod ⌀ 10 mm"))+
 R(590,190,60,40,"sk",4)+C(620,210,13,"sin")+L(620,210,628,202,"sacc2")+co(620,197,676,160,W("прогиб f","flèche f","deflection f"))+
 note(["Rизг = 3·P·l / (2·b·h²) · 10⁻²;  εпр = 6·f·h / l²","E = P·l³ / (4·f·b·h³) · 10⁻²"])}
S.wlong=function(){return num(48,34,1)+desic(150,110)+tx(150,280,W("вакуумное насыщение (п. 13.3)","saturation sous vide (§ 13.3)","vacuum saturation (cl. 13.3)"),{c:"sv",a:"middle"})+
 flow(300,330,214)+num(344,34,2)+tank(350,150,140,92,"20 ± 2 °C · 15 "+W("сут","j","days"))+cyl(374,190,40,40)+cyl(426,194,40,36)+
 flow(500,530,214)+num(546,34,3)+press(650,100,"cyl","Rвд","",1)+note(["Kвд = Rвд / R20"])}
S.wacc=function(){return num(48,34,1)+tank(40,150,120,90,"50 °C · 1 h",{heat:1})+cyl(70,190,40,38)+
 flow(170,196,214)+num(212,34,2)+desic(270,100,{t:"50 °C · ≤ 2 kPa · 1 h"})+tx(300,290,W("затем 1 ч при атм. давлении 50 °C, 1 ч в воде 20 °C","puis 1 h à pression atm. 50 °C, 1 h dans l'eau à 20 °C","then 1 h at atm. pressure 50 °C, 1 h in water at 20 °C"),{c:"sv",a:"middle"})+
 flow(470,500,214)+num(516,34,3)+press(620,100,"cyl","Rву","",1)+note(["Kву = Rву / R20"])}
S.wacc60=function(){return num(48,34,1)+oven(90,60,"125 ± 2 °C · 2 h",{fill:"fasp",disp:"125"})+tx(90,216,"20,7 MPa · 2 min",{c:"sdt",a:"middle"})+
 flow(160,186,150)+num(200,34,2)+oven(250,60,"60 °C · 24 h",{sample:false,disp:"60"})+R(214,94,40,26,"fasp")+
 flow(320,340,150)+num(356,34,3)+R(350,70,120,90,"sk",4)+cyl(364,104,36,40)+cyl(416,108,36,36)+tx(410,180,W("S₁: воздух 20 °C · 4 h","S₁ : air 20 °C · 4 h","S₁: air 20 °C · 4 h"),{c:"sdt",a:"middle"})+
 tank(350,212,120,80,"",{heat:1,nolab:1})+cyl(380,240,36,36)+tx(410,322,W("S₂: вода 60 °C 24 h → 20 °C 2 h","S₂ : eau 60 °C 24 h → 20 °C 2 h","S₂: water 60 °C 24 h → 20 °C 2 h"),{c:"sdt",a:"middle"})+
 flow(482,508,214)+num(524,34,4)+press(630,110,"cyl","S","",1)+note(["Kву' = S₂ / S₁"])}
S.tsr=function(){return num(44,34,1)+desic(92,96,{t:"13–67 kPa · 5–10 min"})+tx(92,262,"W = 70–80 %",{c:"sdt",a:"middle"})+
 flow(262,292,170)+num(306,34,2)+freezer(300,80,"−15…−21 °C · ≥ 16 h")+bag(340,150,40,30)+
 flow(420,442,170)+num(456,34,3)+tank(446,100,100,84,"60 ± 1 °C · 24 h",{heat:1})+cyl(468,134,40,32)+tank(446,224,100,70,"",{nolab:1})+cyl(468,246,40,32)+tx(496,316,"20 °C · 2 h",{c:"sdt",a:"middle"})+
 num(562,34,4)+press(652,110,"split","P","",1)+co(652,196,600,330,W("пластины 19 мм","plaques 19 mm","19 mm strips"))+
 note(["S = 2000·P / (π·h·d);  TSR = S₂ / S₁;  50 mm/min","W = 100·J / Va;  J = (B − A) / ρw"])}
S.afrost=function(){return num(48,34,1)+desic(92,110)+tx(92,280,W("насыщение по 13.3","saturation § 13.3","saturation cl. 13.3"),{c:"sv",a:"middle"})+
 flow(272,296,214)+num(310,34,2)+freezer(300,90,"−18 ± 2 °C · ≥ 4 h")+cyl(338,160,36,30)+
 flow(424,448,214)+num(462,34,3)+tank(450,150,92,90,"18 ± 2 °C · 4 h")+cyl(472,190,36,34)+
 P("M496 132 C496 60 380 60 372 84","sa")+P("M366 76 l6 9 l7 -8","sa")+tx(434,58,"× 5…75 "+W("циклов","cycles","cycles"),{c:"sdt",a:"middle"})+
 num(566,34,4)+press(650,110,"cyl","Rм","",1)+note(["ΔR = (Rв − Rм) / Rв · 100 %"])}
S.adhMix=function(){return num(48,34,1)+beaker(120,90,200,190,150,"swat")+hotplate(110,288,220)+
 R(150,206,140,6,"fmesh")+P("M156 206 q64 -26 128 0 z","fasp")+P("M150 206 v-122 q0 -12 -10 -12 M290 206 v-122 q0 -12 10 -12","sl")+
 C(180,140,3,"sbit")+C(250,124,2.5,"sbit")+dimV(330,130,192,"30–40 mm")+
 co(220,200,370,260,W("навеска 50 г на сетке","prise de 50 g sur grille","50 g portion on mesh"))+co(150,110,60,60,W("проволочные дужки","crochets en fil","wire hooks"))+co(220,250,370,300,W("15 % NaCl, 97 ± 1 °C","NaCl 15 %, 97 ± 1 °C","15 % NaCl, 97 ± 1 °C"))+
 stopwatch(420,90,W("вязкое 30 мин / жидкое 3 мин","visqueux 30 min / fluide 3 min","viscous 30 min / liquid 3 min"))+
 num(540,160,2)+R(570,200,110,60,"sk",4)+P("M582 250 l14 -16 l18 6 l10 -14 l20 8 l14 -12 l12 28 z","sbitstone")+tx(625,288,W("≥ ¾ поверхности в плёнке","≥ ¾ de surface enrobée","≥ ¾ surface coated"),{c:"sdt",a:"middle"})+
 note([W("сравнение с контрольной навеской после высыхания","comparer au témoin non bouilli une fois sec","compare with the unboiled reference once dry")])}
S.cake=function(){return num(48,34,1)+R(80,300,200,14,"fhatch",2)+R(80,300,200,14,"sframe",2)+R(110,282,140,18,"sk")+cyl(140,226,80,56)+R(176,226,8,56,"sin")+
 L(180,60,180,250,"sneedle")+P("M174 236 L180 262 L186 236 Z","sk")+R(170,140,20,90,"sk")+R(150,90,60,40,"sacc",3)+R(166,60,28,10,"sk",2)+
 co(180,110,300,90,W("груз 500 г","masse 500 g","500 g weight"))+co(180,66,300,50,W("упорное кольцо","bague d'arrêt","stop ring"))+co(186,250,300,250,W("конус 15°","cône 15°","15° cone"))+co(140,250,40,240,W("образец","éprouvette","specimen"))+
 dimV(116,70,130,"200 mm",1)+
 num(420,34,2)+P("M440 300 V80 M440 300 H720","sl")+P("M450 290 L480 250 L520 220 L560 190 L600 150 L640 120 L680 90","sacc3")+tx(452,92,W("разрушение","rupture","failure"),{c:"sv"})+tx(712,318,W("удары, N","coups, N","blows, N"),{c:"sv",a:"end"})+
 note([W("N = среднее из 3 образцов; Nmax − Nmin ≤ 4","N = moyenne de 3 éprouvettes ; Nmax − Nmin ≤ 4","N = mean of 3 specimens; Nmax − Nmin ≤ 4")])}
S.homog=function(){var bars=[2,4,7,10,8,5,3],s="";bars.forEach(function(b,i){s+=R(120+i*60,300-b*20,52,b*20,"fasp")});
 return num(48,34,1)+s+P("M90 300 H560 M90 300 V70","sl")+P("M120 296 C220 290 260 90 330 90 C400 90 440 290 540 296","sacc3")+L(330,80,330,300,"sdash")+tx(330,72,"X̄",{c:"sdt",a:"middle"})+
 dimH(270,390,320,"± Sn")+tx(660,212,W("R50 (горячие) / W (холодные)","R50 (chauds) / W (froids)","R50 (hot) / W (cold)"),{c:"sv",a:"middle"})+tx(100,64,"n",{c:"sv"})+
 R(590,90,140,96,"sk",4)+tx(660,118,"n ≥ 20",{c:"sdt",a:"middle"})+tx(660,146,W("из журнала","du journal","from the log"),{c:"sv",a:"middle"})+tx(660,170,W("за период","sur la période","over the period"),{c:"sv",a:"middle"})+
 note(["Cv = Sn / X̄;  X̄ = Σxᵢ / n","Sn = √[ Σ(X̄ − xᵢ)² / (n − 1) ]"])}
S.mixTemp=function(){return num(48,34,1)+P("M60 150 h260 l-20 90 h-220 z","sk")+P("M70 160 q120 -40 240 0 v6 h-240 z","fasp")+R(70,166,240,64,"fasp")+C(110,262,18,"sk")+C(270,262,18,"sk")+
 [100,160,220,280].map(function(x){return L(x,120,x,196,"sneedle")+C(x,118,5,"sacc")}).join("")+dimV(330,166,196,"≥ 100 mm")+dimH(70,100,108,"≥ 500")+
 tx(190,310,W("≥ 4 точки вдоль каждого борта","≥ 4 points par côté de benne","≥ 4 points along each side"),{c:"sv",a:"middle"})+
 num(420,34,2)+heap(520,290,200,46,"fasp")+L(470,210,490,262,"sneedle")+L(570,200,556,256,"sneedle")+dimV(640,262,290,"≥ 300",0)+tx(520,316,W("штабель: по периметру","stock : sur le pourtour","stockpile: around perimeter"),{c:"sv",a:"middle"})+
 R(600,80,120,70,"sk",4)+R(612,92,96,26,"sdisp",2)+tx(660,110,"152 °C",{c:"sdispt",a:"middle"})+tx(660,138,"± 2 °C",{c:"sv",a:"middle"})+
 note(["T = " + W("среднее всех показаний, округлённое до целого","moyenne de toutes les lectures, arrondie à l'unité","mean of all readings, rounded to integer")])}
S.pavTemp=function(){return num(48,34,1)+R(40,180,420,60,"fasp")+R(40,240,420,50,"fasp2")+R(40,290,420,40,"fagg")+
 R(110,180,14,10,"sin")+R(220,180,14,30,"sin")+R(330,180,14,60,"sin")+
 L(117,110,117,184,"sneedle")+L(227,110,227,206,"sneedle")+L(337,110,337,236,"sneedle")+C(117,106,6,"sacc")+C(227,106,6,"sacc")+C(337,106,6,"sacc")+
 tx(117,96,W("поверхность","surface","surface"),{c:"sdt",a:"middle"})+tx(227,96,"20 mm",{c:"sdt",a:"middle"})+tx(337,96,"h / 2",{c:"sdt",a:"middle"})+
 dimV(480,180,240,"h",0)+co(124,186,200,350,W("отверстие ⌀ +5 мм, загерметизировать","trou ⌀ +5 mm, à boucher","hole ⌀ +5 mm, sealed"))+
 num(500,34,2)+stopwatch(510,110,W("≥ 15 мин после сверления","≥ 15 min après perçage","≥ 15 min after drilling"))+stopwatch(510,170,W("отсчёт ≥ 3 мин после контакта","lecture ≥ 3 min après contact","read ≥ 3 min after contact"))+
 tx(600,240,W("3 параллельных измерения, ± 0,5 °C","3 mesures parallèles, ± 0,5 °C","3 parallel readings, ± 0.5 °C"),{c:"sv",a:"middle"})+
 note(["T = (T₁ + T₂ + T₃) / 3"])}
/* --- bitumen --- */
S.bitSample=function(){return num(48,34,1)+R(64,90,90,120,"sk",4)+R(70,120,78,84,"sbit")+burner(110,212)+co(150,140,200,100,W("битум","bitume","bitumen"))+tx(110,72,"≤ Tразм + 90 °C",{c:"sv",a:"middle"})+
 flow(176,212,190)+num(228,34,2)+P("M240 110 h90 l-10 70 h-70 z","sk")+R(252,180,66,4,"fmesh")+co(286,182,340,250,W("сито 0,7 мм","tamis 0,7 mm","0.7 mm sieve"))+flow(356,392,190)+num(408,34,3)+
 R(420,150,70,44,"sk",3)+R(424,166,62,26,"sbit")+R(510,150,70,44,"sk",3)+R(514,166,62,26,"sbit")+co(455,160,470,110,W("чашки 2 шт.","2 coupelles","2 cups"))+tx(500,220,W("остывание 60–90 мин","refroidissement 60–90 min","cool 60–90 min"),{c:"sv",a:"middle"})+
 tank(600,130,120,90,"25 °C · 60–90 min",{nolab:0})+R(630,174,60,26,"sbit")+note([W("перегрев и повторный нагрев запрещены","pas de surchauffe ni de 2e chauffe","no overheating, no second heating")])}
S.pen=function(){return num(48,34,1)+R(100,40,16,250,"sk")+R(70,290,260,14,"fhatch",2)+R(70,290,260,14,"sframe",2)+R(116,70,140,16,"sk")+R(200,86,20,50,"sk")+R(190,136,40,14,"sacc",2)+L(210,150,210,226,"sneedle")+co(210,190,280,170,W("игла","aiguille","needle"))+co(230,143,300,128,W("груз 100 г","masse 100 g","100 g load"))+
 R(220,40,70,40,"sk",4)+C(255,60,16,"sin")+L(255,60,264,50,"sacc2")+co(268,52,300,30,W("индикатор 0,1 мм","cadran 0,1 mm","dial 0.1 mm"))+tank(130,206,150,80,"",{nolab:1,th:70})+R(170,232,70,40,"sk",2)+R(174,246,62,24,"sbit")+co(176,262,90,330,W("вода 25 °C","eau 25 °C","water 25 °C"))+
 num(440,60,2)+stopwatch(490,100,"5 s")+P("M440 200 h220 M460 140 v60 M520 158 v42 M580 150 v50","sl")+tx(550,230,W("3 погружения на расстоянии ≥ 10 мм","3 mesures à ≥ 10 mm","3 readings ≥ 10 mm apart"),{c:"sv",a:"middle"})+
 note(["П25 = " + W("глубина в 0,1 мм (среднее из 3)","profondeur en 0,1 mm (moyenne de 3)","depth in 0.1 mm (mean of 3)")])}
S.rb=function(){return num(48,34,1)+beaker(110,70,200,230,200)+R(130,120,160,6,"sk")+R(130,246,160,6,"sk")+L(140,120,140,252,"sl")+L(280,120,280,252,"sl")+R(160,110,30,10,"sbit")+R(230,110,30,10,"sbit")+C(175,103,7,"sacc")+C(245,103,7,"sacc")+P("M175 120 q-2 60 0 120","sbitl")+P("M245 120 q-1 30 0 60","sbitl")+
 therm(210,40,180)+dimV(300,126,246,"25 mm")+hotplate(110,306,200)+co(175,103,60,60,W("шарик 3,5 г","bille 3,5 g","ball 3.5 g"))+co(140,123,60,150,W("кольцо с битумом","anneau + bitume","ring with bitumen"))+co(140,246,60,290,W("касание пластины","contact plaque","touches the plate"))+
 num(420,34,2)+P("M440 260 V80 M440 260 H720","sl")+P("M450 250 L700 100","sacc3")+tx(452,92,"t, °C",{c:"sv"})+tx(712,278,"τ, min",{c:"sv",a:"end"})+tx(590,150,"5 ± 0,5 °C/min",{c:"sv"})+
 note(["Tразм = " + W("среднее двух шариков; Δ ≤ 1 °C","moyenne des 2 billes ; Δ ≤ 1 °C","mean of 2 balls; Δ ≤ 1 °C")])}
S.duct=function(){return num(48,34,1)+tank(50,140,670,110,"25 °C / 0 °C",{noth:1})+R(80,176,22,40,"sk")+R(560,176,22,40,"sk")+P("M102 196 C250 190 420 190 560 196","sbitl")+R(582,192,140,8,"sk")+arrowR(610,230,70,"5 cm/min")+dimH(102,560,124,"D, cm")+
 co(91,180,140,100,W("неподвижный зажим","pince fixe","fixed clip"))+co(571,180,600,100,W("подвижный зажим","pince mobile","moving clip"))+co(330,192,330,300,W("нить битума","fil de bitume","bitumen thread"))+
 R(470,32,180,40,"sk",3)+P("M480 62 l20 -20 h120 l20 20 z","sbit")+tx(560,90,W("форма-восьмёрка","moule en 8","figure-8 mould"),{c:"sv",a:"middle"})+note(["D = " + W("длина нити в момент разрыва, см","longueur au moment de la rupture, cm","length at break, cm")])}
S.fraass=function(){return num(48,34,1)+R(50,60,260,240,"sk",10)+R(62,72,236,216,"sin",6)+therm(276,90,170)+P("M100 200 q70 -40 140 0","sbitl")+R(94,190,10,30,"sk")+R(236,190,10,30,"sk")+arrowR(104,240,40,"")+P("M236 240 h-30","sa")+co(170,180,150,40,W("пластинка 41×20 мм с плёнкой 0,5 мм","lame 41×20 mm, film 0,5 mm","41×20 mm plate, 0.5 mm film"))+co(160,280,340,300,W("охлаждающая камера","enceinte réfrigérée","cooling chamber"))+
 num(420,34,2)+P("M440 260 V80 M440 260 H720","sl")+P("M450 110 L700 250","sacc3")+tx(452,92,"t, °C",{c:"sv"})+tx(590,150,"−1 °C/min",{c:"sv"})+C(640,216,6,"sacc")+co(640,216,690,190,W("трещина","fissure","crack"))+
 note(["Tхр = " + W("температура появления первой трещины","température de la 1re fissure","temperature of first crack")])}
S.rtfot=function(){var s="";for(var i=0;i<8;i++){var a=i*Math.PI/4;s+=R(200+64*Math.cos(a)-9,160+64*Math.sin(a)-9,18,18,"sbit",4)}
 return num(48,34,1)+R(80,40,240,250,"sk",8)+C(200,160,86,"sin")+C(200,160,82,"sk")+s+C(200,160,10,"sacc")+R(300,60,14,40,"sk")+co(264,160,350,120,W("стеклянные бутылки","flacons en verre","glass bottles"))+co(120,270,350,300,W("печь 163 °C, обдув воздухом","étuve 163 °C, jet d'air","oven 163 °C, air jet"))+tx(200,316,W("75 мин · 15 об/мин","75 min · 15 tr/min","75 min · 15 rpm"),{c:"sv",a:"middle"})+
 num(420,34,2)+bal(520,214,"m₂")+R(500,194,40,20,"sbit",3)+note(["Δm = (m₂ − m₁) / m₁ · 100 %","П₂ / П₁ · 100 %;  ΔTразм = T₂ − T₁"])}
S.flash=function(){return num(48,34,1)+R(110,170,120,40,"sk",3)+R(116,180,108,28,"sbit")+R(96,210,148,10,"sk")+burner(170,222)+therm(200,60,120)+L(60,150,250,150,"sl")+C(150,150,4,"sacc")+P("M150 146 q-4 -14 0 -24 q4 10 0 24","sflame")+
 co(170,190,300,250,W("тигель Кливленда","coupe Cleveland","Cleveland cup"))+co(150,140,300,110,W("зажигательная горелка","flamme d'essai","test flame"))+tx(170,296,"+5–6 °C/min",{c:"sv",a:"middle"})+
 num(420,34,2)+P("M440 260 V80 M440 260 H720","sl")+P("M450 250 L700 100","sacc3")+C(640,136,8,"sacc")+tx(650,128,"Tвсп",{c:"sdt"})+note(["Tвсп = " + W("температура вспышки + поправка на давление","point d'éclair + correction de pression","flash point + pressure correction")])}
S.elast=function(){return S.duct()+P("M330 120 l0 -26 M322 102 l8 -8 l8 8","sa")+tx(470,334,W("растянуть 20 см → разрезать → 1 ч → измерить","étirer 20 cm → couper → 1 h → mesurer","stretch 20 cm → cut → 1 h → measure"),{c:"sv",a:"middle"})}
S.adh=function(){return num(48,34,1)+beaker(90,90,180,180,140)+hotplate(80,280,200)+P("M140 210 l18 -10 l16 12 l-8 18 l-20 -2 z","sbitstone")+P("M190 190 l18 -8 l14 14 l-10 16 l-20 -4 z","sbitstone")+P("M200 240 l16 -8 l16 12 l-10 16 l-18 -2 z","sbitstone")+C(150,140,3,"sbit")+C(220,120,2.5,"sbit")+
 co(196,196,320,170,W("щебень в битуме","gravillon enrobé","coated stone"))+co(150,140,320,110,W("всплывший битум","bitume remonté","stripped bitumen"))+tx(180,80,W("кипящая вода, 30 мин","eau bouillante, 30 min","boiling water, 30 min"),{c:"sv",a:"middle"})+
 num(420,34,2)+[0,1,2].map(function(i){var x=480+i*90;return P("M"+x+" 200 l22 -12 l20 14 l-10 20 l-26 -2 z",i===0?"sbitstone":i===1?"shalf":"fagg")+tx(x+12,240,String(i+1),{c:"sdt",a:"middle"})}).join("")+
 note([W("1 — плёнка цела;  2 — частично сошла;  3 — сошла","1 — film intact ;  2 — partiel ;  3 — décollé","1 — film intact;  2 — partly stripped;  3 — stripped")])}
S.pi=function(){return P("M90 320 L90 50 M90 320 L420 320","sl")+P("M110 80 L400 300","sacc3")+C(170,141,6,"sacc")+C(340,268,6,"sacc")+tx(100,50,"lg П",{c:"sv"})+tx(420,340,"T, °C",{c:"sv",a:"end"})+tx(180,135,"25 °C → П25",{c:"sdt"})+tx(350,262,"Tразм → П = 800",{c:"sdt"})+
 R(480,70,240,150,"sin",6)+tx(600,100,W("ИП < −2 — хрупкий","IP < −2 — fragile","PI < −2 — brittle"),{c:"sv",a:"middle"})+tx(600,140,W("−2 … +2 — дорожный","−2 … +2 — routier","−2 … +2 — paving grade"),{c:"st",a:"middle"})+tx(600,180,W("ИП > +2 — окисленный","IP > +2 — oxydé","PI > +2 — blown"),{c:"sv",a:"middle"})+
 note(["ИП = 30 / (1 + 50·A) − 10","A = (lg 800 − lg П25) / (Tразм − 25)"])}
/* --- aggregates --- */
S.aggSample=function(){return num(48,34,1)+heap(130,260,180,46,"fagg")+shovel(200,240)+[80,120,160,190].map(function(x,i){return C(x,240-(i%2)*24,4,"sacc")}).join("")+co(120,216,150,80,W("10–15 точек отбора","10–15 points de prélèvement","10–15 sampling points"))+
 flow(236,272,220)+num(286,34,2)+R(290,150,110,80,"sk",3)+[0,1,2,3,4].map(function(i){return R(296+i*21,150,12,60,"fagg")}).join("")+R(290,230,50,20,"sk")+R(350,230,50,20,"sk")+co(345,160,400,110,W("желобчатый делитель","diviseur à riffles","riffle box"))+
 flow(410,446,220)+num(460,34,3)+quarter(520,260)+flow(600,630,220)+num(646,34,4)+oven(690,150,"105–110 °C",{fill:"fagg"})+note([W("масса пробы — не менее требуемой для всех испытаний","masse ≥ somme des essais prévus","mass ≥ sum needed for all tests")])}
S.sieveAgg=function(){return num(48,34,1)+stack(90,50,120,["40","20","10","5","2,5","1,25"],[1,1,1,1,1,0])+shaker(90,270,120)+co(210,70,280,40,W("крышка","couvercle","lid"))+co(210,232,280,250,W("поддон","fond","pan"))+tx(150,326,W("10–15 мин","10–15 min","10–15 min"),{c:"sv",a:"middle"})+
 flow(300,350,200)+num(366,34,2)+bal(470,214,"mᵢ")+tray(432,198,76)+co(470,196,560,140,W("остаток на сите","refus du tamis","residue on sieve"))+
 note(["aᵢ = mᵢ / m · 100 %;  Aᵢ = Σ aᵢ;  Пᵢ = 100 − Aᵢ"])}
S.pgrain=function(){return num(48,34,1)+tray(70,104,120,"fsand")+L(160,50,128,112,"sk4")+P("M130 140 v30","sa")+sieve(70,184,120,"0,071",1,"fsand")+tx(130,244,W("растирать 2–3 мин и сливать","triturer 2–3 min et verser","grind 2–3 min and pour"),{c:"sv",a:"middle"})+tx(130,262,W("до прозрачной воды","jusqu'à eau claire","until the water is clear"),{c:"sv",a:"middle"})+
 flow(250,285,200)+num(300,34,2)+oven(372,110,"110 ± 5 °C")+flow(445,480,200)+num(492,34,3)+stack(520,70,110,["1,25","0,315","0,071"],[1,1,1],"fsand")+bal(575,236,"mᵢ")+tray(537,220,76,"fsand")+
 note(["αᵢ = mᵢ / m · 100 %;  M₁,₂₅ = 100 − α₁,₂₅","M₀,₃₁₅ = M₁,₂₅ − α₀,₃₁₅;  M₀,₀₇₁ = M₀,₃₁₅ − α₀,₀₇₁"])}
S.wash=function(){return num(48,34,1)+tank(60,110,200,140,"",{noth:1})+heap(160,246,150,26,"fagg")+P("M220 60 q20 30 -10 120","sk4")+co(214,90,300,60,W("перемешивание","agitation","stirring"))+tx(160,280,W("замочить 2 ч → промывать до чистой воды","tremper 2 h → laver jusqu'à eau claire","soak 2 h → wash until clear"),{c:"sv",a:"middle"})+
 flow(290,330,200)+num(346,34,2)+sieve(350,170,120,"0,071 + 1,25",1)+P("M360 210 l10 30 M440 210 l-10 30","sw2")+flow(500,530,200)+num(546,34,3)+oven(640,120,"105–110 °C")+
 note(["Пот = (m − m₁) / m · 100 %"])}
S.flaky=function(){return num(48,34,1)+P("M70 140 l60 -12 l8 14 l-62 12 z","fagg")+dimH(70,138,170,"L")+P("M80 210 l70 -6 l3 10 l-72 6 z","fagg")+P("M180 110 l30 -16 l22 26 l-16 24 l-32 -6 z","fagg")+dimV(156,206,216,"t")+
 co(110,140,90,90,W("лещадное зерно","grain plat","flaky grain"))+co(206,120,260,80,W("кубовидное","cubique","cubical"))+tx(130,260,"t < L / 3",{c:"sform",a:"middle"})+
 num(320,34,2)+R(330,100,180,140,"sk",5)+[0,1,2,3,4,5].map(function(i){return R(346+i*26,116,10,108,"sin")}).join("")+co(400,170,560,120,W("щелевые сита / шаблон","tamis à fentes / gabarit","slotted sieves / gauge"))+
 bal(620,214,"m₁")+R(600,200,40,14,"fagg",2)+note(["Л = m₁ / m · 100 %"])}
S.crush=function(){return num(48,34,1)+R(70,110,130,150,"fhatch")+R(82,110,106,150,"sin")+R(82,180,106,80,"fagg")+R(76,150,118,30,"sacc",2)+R(122,90,26,60,"sk")+R(60,260,150,12,"sk",2)+arrowD(135,40,46,"200 kN")+
 co(194,170,240,130,W("плунжер","piston","plunger"))+co(188,230,240,250,W("щебень 3 кг","gravillons 3 kg","stone 3 kg"))+dimH(82,188,296,"⌀ 150")+tx(135,330,"1–2 kN/s",{c:"sv",a:"middle"})+
 flow(270,306,220)+num(322,34,2)+sieve(330,190,120,W("контр. сито","tamis de contrôle","control sieve"),1)+flow(510,540,220)+num(556,34,3)+bal(640,214,"m₁")+tray(602,198,76)+
 note(["Др = (m − m₁) / m · 100 %"])}
S.la=function(){var s="";for(var i=0;i<12;i++)s+=C(150+(i*23)%110,200+(i*11)%50,8,"sball");
 return num(48,34,1)+C(200,170,120,"sk")+C(200,170,112,"sin")+R(194,56,12,90,"sacc")+s+heap(200,282,140,22,"fagg")+R(170,290,60,30,"sk")+co(200,90,360,70,W("полка","étagère","shelf"))+co(240,220,360,230,W("стальные шары","boulets d'acier","steel balls"))+co(150,280,360,300,W("проба 5 кг","échantillon 5 kg","5 kg sample"))+tx(200,40,W("500 об · 30–33 об/мин","500 tours · 30–33 tr/min","500 rev · 30–33 rpm"),{c:"sv",a:"middle"})+
 flow(420,460,200)+num(476,34,2)+sieve(480,180,120,"1,6 mm",1)+bal(660,214,"m₁")+note(["LA = (m − m₁) / m · 100 %"])}
S.bulk=function(){return num(48,34,1)+P("M90 40 h120 l-46 70 h-28 z","sk")+heap(150,64,90,14,"fagg")+L(150,110,150,150,"sagg2")+R(80,160,140,130,"sk")+R(84,164,132,122,"fagg")+L(70,160,230,160,"sacc3")+dimV(250,160,290,"V")+
 dimV(60,110,160,"10 cm",1)+co(220,160,300,130,W("срезать линейкой","araser à la règle","strike off"))+co(150,52,300,60,W("воронка","entonnoir","funnel"))+
 num(330,34,2)+bal(450,250,"m₂")+R(410,190,80,60,"fagg")+note(["ρн = (m₂ − m₁) / V"])}
S.dens2=function(){return num(48,34,1)+tank(60,120,150,120,"48 h")+heap(135,236,110,28,"fagg")+flow(220,256,210)+num(272,34,2)+hbal(350,60,"m₂",false)+R(330,190,40,26,"fagg")+flow(450,486,210)+num(500,34,3)+bal(560,214,"m₁")+tray(522,198,76)+co(560,196,620,130,W("поверхностно-сухие","saturés surface sèche","saturated surface-dry"))+num(640,34,4)+oven(690,170,"105–110 °C")+
 note(["ρ = m · ρw / (m₁ − m₂)","Wп = (m₁ − m) / m · 100 %"])}
S.frost=function(){var s="";for(var i=0;i<6;i++)s+=P("M"+(90+i*26)+" 120 v26 M"+(80+i*26)+" 126 l20 14 M"+(80+i*26)+" 140 l20 -14","sice");
 return num(48,34,1)+R(60,80,200,190,"sk",8)+R(70,90,180,170,"sin",4)+s+heap(160,250,140,30,"fagg")+tx(160,296,"−18 ± 2 °C ⇄ +20 ± 5 °C",{c:"sv",a:"middle"})+co(200,240,120,320,W("проба в сетке/сосуде","échantillon en panier","sample in basket"))+
 num(330,34,2)+beaker(340,110,130,150,120)+heap(405,256,90,20,"fagg")+tx(405,296,"Na₂SO₄ ("+W("ускоренный","accéléré","accelerated")+")",{c:"sv",a:"middle"})+flow(500,540,210)+num(556,34,3)+bal(650,214,"m₁")+tray(612,198,76)+
 note(["Пм = (m − m₁) / m · 100 %"])}
/* --- sand / filler --- */
S.sandSieve=function(){return num(48,34,1)+stack(90,40,120,["5","2,5","1,25","0,63","0,315","0,16"],[1,1,1,1,1,1],"fsand")+shaker(90,224,120)+tx(150,300,W("1000 г, 10–15 мин","1000 g, 10–15 min","1000 g, 10–15 min"),{c:"sv",a:"middle"})+
 flow(300,350,180)+num(366,34,2)+bal(470,214,"mᵢ")+tray(432,198,76,"fsand")+
 note(["Мк = (A2,5 + A1,25 + A0,63 + A0,315 + A0,16) / 100","aᵢ = mᵢ / m · 100 %;  Aᵢ = Σ aᵢ"])}
S.se=function(){return num(48,34,1)+R(160,40,46,280,"sk",6)+R(165,210,36,106,"fsand")+R(165,120,36,90,"swatm")+P("M165 210 h36","sacc3")+[0,1,2,3,4,5,6].map(function(i){return L(206,60+i*40,214,60+i*40,"sd")}).join("")+dimV(240,210,316,"h₂")+dimV(272,120,316,"h₁")+
 L(183,20,183,210,"sl")+R(176,206,14,6,"sacc")+co(183,40,110,70,W("груз-поршень","piston lesté","weighted foot"))+co(170,160,110,140,W("флокулят","floculat","flocculate"))+co(170,260,110,270,W("песок","sable","sand"))+tx(183,346,W("20 мин покоя","20 min de repos","20 min rest"),{c:"sv",a:"middle"})+
 num(380,34,2)+note(["ES = h₂ / h₁ · 100"])}
S.powder=function(){return num(48,34,1)+mould(70,70,80,190,"fsand")+arrowD(110,20,40,"40 MPa")+co(110,180,150,320,W("порошок + битум","filler + bitume","filler + bitumen"))+flow(190,226,210)+num(242,34,2)+hbal(320,60,"m₂")+flow(420,456,210)+num(472,34,3)+desic(580,110)+
 note(["Vпор = (1 − ρm / ρ) · 100 %","Н = [(m₃ − m₄) − (m₁ − m₂)] / (m₁ − m₂) · 100 %"])}
S.bitcap=function(){return num(48,34,1)+P("M70 230 q90 -40 180 0 v20 h-180 z","sk")+P("M90 236 q70 -26 140 0","fsand")+R(220,60,50,30,"sbit",4)+L(240,90,200,180,"sl")+R(150,190,24,24,"fsand",8)+co(162,202,300,180,W("шарик — точка окончания","boulette — point final","ball — end point"))+co(245,74,300,60,W("бюретка с маслом/битумом","burette d'huile/bitume","burette of oil/bitumen"))+
 tx(160,290,W("ступка, перетирать пестиком","mortier, malaxer au pilon","mortar, work with pestle"),{c:"sv",a:"middle"})+num(380,34,2)+note(["Бе = Vм / m · 100  (g / 100 cm³)"])}
/* --- soils --- */
S.moist=function(){return num(48,34,1)+R(80,180,90,50,"sk",4)+R(80,172,90,8,"sk",2)+heap(125,226,70,18,"fsoil")+co(150,176,120,140,W("бюкс с крышкой","tare avec couvercle","weighing tin with lid"))+bal(125,250,"m₁")+
 flow(236,270,210)+num(286,34,2)+oven(360,110,"105 ± 2 °C",{fill:"fsoil",disp:"105"})+tx(360,262,W("глина 5 ч, песок 3 ч","argile 5 h, sable 3 h","clay 5 h, sand 3 h"),{c:"sv",a:"middle"})+flow(440,476,210)+num(492,34,3)+bal(580,250,"m₀")+R(550,232,60,18,"fsoil",3)+
 note(["W = (m₁ − m₀) / (m₀ − m) · 100 %"])}
S.atter=function(){return num(48,34,1)+R(70,200,120,60,"sk",3)+R(74,214,112,44,"fsoil")+P("M130 112 L110 214 L150 214 Z","fcone")+L(110,96,150,96,"sk4")+C(110,96,6,"sk")+C(150,96,6,"sk")+L(130,96,130,112,"sl")+L(124,154,136,154,"sd")+dimV(200,200,214,"10 mm")+
 co(140,140,240,110,W("конус 76 г, 30°","cône 76 g, 30°","76 g cone, 30°"))+tx(130,290,W("5 с — погружение 10 мм → WL","5 s — enfoncement 10 mm → WL","5 s — 10 mm penetration → WL"),{c:"sv",a:"middle"})+
 num(330,34,2)+R(350,220,220,16,"sk",3)+P("M380 214 h150","sk4")+P("M380 214 h150","fsoilline")+dimV(560,208,220,"3 mm")+co(450,214,470,170,W("жгут крошится при 3 мм → Wp","boudin se fissure à 3 mm → Wp","thread crumbles at 3 mm → Wp"))+
 note(["Ip = WL − Wp","IL = (W − Wp) / Ip"])}
S.ring=function(){return num(48,34,1)+R(50,180,280,100,"fsoil")+R(150,120,70,110,"fhatch")+R(158,120,54,110,"fsoil")+R(150,108,70,12,"sk",2)+arrowD(185,40,60,"")+co(150,170,90,120,W("режущее кольцо","anneau coupant","cutting ring"))+co(220,150,300,120,W("насадка","guide","driving cap"))+dimV(240,120,230,"h")+dimH(150,220,300,"d")+
 flow(350,390,210)+num(406,34,2)+bal(500,250,"m₁")+R(476,212,48,38,"fhatch")+R(482,212,36,38,"fsoil")+note(["ρ = (m₁ − m₀) / V","ρd = ρ / (1 + 0,01·W)"])}
S.proctor=function(){return num(48,34,1)+R(90,170,100,130,"fhatch")+R(98,176,84,124,"fsoil")+L(98,217,182,217,"sdash")+L(98,258,182,258,"sdash")+R(86,150,108,20,"sk",2)+R(76,300,128,10,"sk",2)+R(128,20,24,110,"sk")+R(116,96,48,36,"sacc",3)+dimV(220,36,130,"300 mm")+
 co(164,110,250,150,W("груз 2,5 кг","dame 2,5 kg","2.5 kg rammer"))+co(190,240,250,250,W("3 слоя × 40 ударов","3 couches × 40 coups","3 layers × 40 blows"))+co(190,160,250,190,W("насадка","rehausse","collar"))+
 num(330,34,2)+P("M360 320 L360 60 M360 320 L730 320","sl")+P("M380 280 C460 130 540 100 590 140 S690 240 715 260","sacc3")+[[400,250],[450,170],[510,122],[570,128],[630,180],[690,240]].map(function(p){return C(p[0],p[1],4.5,"sk")}).join("")+C(540,114,6,"sacc")+L(540,114,540,320,"sdash")+L(360,114,540,114,"sdash")+tx(368,106,"ρd max",{c:"sdt"})+tx(540,338,"Wopt",{c:"sdt",a:"middle"})+tx(728,338,"W, %",{c:"sv",a:"end"})+tx(368,72,"ρd",{c:"sv"})+
 note(["ρ = (m₂ − m₁) / V;  ρd = ρ / (1 + 0,01·W)"])}
S.kcomp=function(){return num(48,34,1)+R(50,190,380,90,"fsoil")+R(50,170,380,20,"fagg")+R(200,130,60,110,"fhatch")+R(208,130,44,110,"fsoil")+arrowD(230,60,60,"")+co(260,160,330,120,W("кольцо / керн","anneau / carotte","ring / core"))+tx(240,310,W("3 пробы на захватку","3 essais par planche","3 tests per section"),{c:"sv",a:"middle"})+
 num(470,34,2)+R(500,100,220,140,"sin",6)+tx(610,140,"Ky = ρd / ρd max",{c:"sform",a:"middle"})+tx(610,180,W("ρd — с объекта","ρd — en place","ρd — in situ"),{c:"sv",a:"middle"})+tx(610,206,W("ρd max — Проктор","ρd max — Proctor","ρd max — Proctor"),{c:"sv",a:"middle"})+note(["Ky = ρd / ρd max"])}
S.soilGrad=function(){return num(48,34,1)+stack(80,40,120,["10","5","2","1","0,5","0,25","0,1"],[1,1,1,1,1,1,1],"fsoil")+num(300,34,2)+beaker(330,70,80,240,210,"swatm")+L(370,40,370,190,"sneedle")+EL(370,210,12,26,"sk")+co(370,90,450,70,W("ареометр","densimètre","hydrometer"))+tx(370,346,W("частицы < 0,1 мм","particules < 0,1 mm","particles < 0.1 mm"),{c:"sv",a:"middle"})+
 num(500,34,3)+bal(600,214,"mᵢ")+note(["aᵢ = mᵢ / m · 100 %"])}
/* --- concrete --- */
S.slump=function(){return num(48,34,1)+P("M110 90 L80 290 H200 L170 90 Z","sk")+P("M114 120 L90 286 H190 L166 120 Z","fconc")+L(70,290,210,290,"sk4")+R(60,290,160,8,"fhatch")+L(80,120,60,120,"sk4")+L(200,120,220,120,"sk4")+L(230,50,170,160,"sk4")+dimV(240,90,290,"300 mm")+co(170,230,120,330,W("3 слоя × 25 штыкований","3 couches × 25 coups","3 layers × 25 rods"))+
 flow(290,330,220)+num(346,34,2)+P("M400 290 Q420 170 470 166 Q530 170 540 290 Z","fconc")+L(360,290,580,290,"sk4")+P("M620 60 L590 260 H710 L680 60 Z","sk")+arrowD(650,40,0,"")+L(400,90,700,90,"sdash")+dimV(470,90,166,W("ОК","Aff.","Slump"))+note([W("ОК — осадка конуса, см","Affaissement au cône, cm","Slump, cm")])}
S.cube=function(){return num(48,34,1)+R(60,150,90,90,"fhatch")+R(66,156,78,84,"fconc")+R(170,150,90,90,"fhatch")+R(176,156,78,84,"fconc")+R(50,240,220,8,"sk")+tx(160,280,W("28 сут, 20 ± 2 °C, ≥ 95 %","28 j, 20 ± 2 °C, ≥ 95 %","28 days, 20 ± 2 °C, ≥ 95 %"),{c:"sv",a:"middle"})+dimH(66,144,140,"100 / 150")+
 num(330,34,2)+press(540,100,"cube","F","0,6 MPa/s")+note(["R = α · F / A  (α: 100 mm — 0,95; 150 mm — 1,00)"])}
S.beam=function(){return num(48,34,1)+press(300,100,"beam","F","0,05 MPa/s")+tx(560,140,W("балка 100×100×400","poutre 100×100×400","beam 100×100×400"),{c:"sv",a:"middle"})+tx(560,170,"l = 3a",{c:"sv",a:"middle"})+note(["Rtb = δ · F · l / (a · b²)"])}
/* --- field --- */
S.plate=function(){return num(48,34,1)+R(40,240,680,70,"fsoil")+R(40,226,680,14,"fagg")+R(300,214,140,14,"fhatch")+R(300,214,140,14,"sframe")+R(352,140,36,74,"sk")+R(330,120,80,20,"sk",3)+R(320,40,100,80,"sk",4)+co(410,80,470,60,W("упор (автомобиль)","contre-poids (camion)","reaction (truck)"))+co(388,170,470,160,W("домкрат","vérin","jack"))+
 L(120,214,600,214,"sl")+R(588,190,22,24,"sk",2)+C(599,182,9,"sin")+L(599,182,605,176,"sacc2")+co(605,180,660,140,W("индикатор осадки","comparateur","dial gauge"))+R(120,206,8,30,"sk")+dimH(300,440,334,"D")+
 co(370,221,200,180,W("штамп","plaque","plate"))+note(["E = π · p · D · (1 − μ²) / (4 · l)"])}
S.benk=function(){return num(48,34,1)+R(40,260,680,40,"fasp")+R(40,300,680,20,"fagg")+L(120,256,540,210,"sk4")+R(500,200,90,30,"sk",3)+C(520,240,4,"sk")+C(610,230,32,"sk")+C(680,230,32,"sk")+C(610,230,10,"sin")+C(680,230,10,"sin")+L(120,256,120,268,"sacc3")+
 co(120,256,90,200,W("щуп между колёсами","pointe entre roues jumelées","probe between dual wheels"))+co(560,214,560,140,W("индикатор","comparateur","dial gauge"))+co(640,214,700,140,W("ось 10 т","essieu 10 t","10 t axle"))+note(["L = 2 · (l₀ − lк)"])}
S.ruler=function(){return num(48,34,1)+R(40,240,680,60,"fasp")+R(70,214,620,14,"sk",3)+[130,250,370,490,610].map(function(x,i){var h=[3,5,2,6,4][i];return R(x-6,228,12,h*2,"sacc")+tx(x,276,"h"+(i+1),{c:"sdt",a:"middle"})}).join("")+dimH(70,690,190,"3 m")+dimH(70,130,160,"0,5 m")+co(400,221,460,120,W("рейка 3 м","règle de 3 m","3 m straightedge"))+co(490,232,560,150,W("клин-промерник","cale graduée","measuring wedge"))+
 note([W("просвет — в 5 точках через 0,5 м","flèche en 5 points tous les 0,5 m","gap at 5 points 0.5 m apart")])}
S.core=function(){return num(48,34,1)+R(40,220,360,40,"fasp")+R(40,260,360,40,"fagg")+R(170,80,60,150,"sk")+R(178,200,44,60,"fhatch")+R(184,200,32,60,"fasp")+R(160,50,80,30,"sk",4)+co(240,120,300,90,W("коронка ⌀ 100","carotteuse ⌀ 100","core bit ⌀ 100"))+co(220,250,300,330,W("слой","couche","layer"))+
 flow(410,440,210)+num(450,34,2)+cyl(456,170,64,70)+dimV(536,170,240,"h")+flow(546,566,210)+num(580,34,3)+hbal(650,60,"m₂")+note(["Ky = ρm.керн / ρm.лаб"])}
S.thick=function(){return num(48,34,1)+R(80,80,110,80,"fasp")+R(80,160,110,70,"fasp2")+R(80,230,110,80,"fagg")+dimV(214,80,160,"h₁")+dimV(214,160,230,"h₂")+co(135,120,300,110,W("верхний слой","couche de roulement","surface course"))+co(135,195,300,200,W("нижний слой","couche de liaison","binder course"))+note(["Δh = h − hпр"])}

/* --- new methods: binders (solubility, conventional viscosity, flux, water), mastics, crushed stone, filler --- */
function wbottle(x,y,c){return R(x-14,y,28,24,"sk",2)+(c?R(x-12,y+12,24,10,c):"")+R(x-16,y-6,32,6,"sk",2)}
function dsc(x,y){return P("M"+(x-50)+" "+(y+20)+" h100 l-12 70 h-76 z","sk")+L(x-44,y+50,x+44,y+50,"sd")+P("M"+(x-56)+" "+(y+20)+" q56 -46 112 0 z","sk")+R(x-8,y-14,16,8,"sk",3)}
function ftube(x,y,h,op,c){var w=22,d="M"+(x-w/2)+" "+y+" v"+h+" a"+w/2+" "+w/2+" 0 0 0 "+w+" 0 v"+(-h);return(op!=null?'<path d="M'+(x-w/2)+" "+(y+h*0.45)+" v"+(h*0.55)+" a"+w/2+" "+w/2+" 0 0 0 "+w+" 0 v"+(-h*0.55)+' z" class="'+(c||"sbit")+'" opacity="'+op+'"/>':"")+P(d,"sl")}
function arrowU(x,y,len,lab){return L(x,y,x,y-len,"sa")+P("M"+(x-6)+" "+(y-len+10)+" L"+x+" "+(y-len)+" L"+(x+6)+" "+(y-len+10),"sa")+(lab?tx(x+9,y-len+12,lab,{c:"sv"}):"")}
function arrowL(x,y,len,lab){return L(x,y,x-len,y,"sa")+P("M"+(x-len+10)+" "+(y-6)+" L"+(x-len)+" "+y+" L"+(x-len+10)+" "+(y+6),"sa")+(lab?tx(x-len/2,y-7,lab,{c:"sv",a:"middle"}):"")}
S.bsolub=function(){return num(48,34,1)+flask(120,120,40,"sbitw")+co(120,196,170,90,W("раствор битума","solution de bitume","bitumen solution"))+tx(120,248,W("навеска + растворитель","prise + solvant","portion + solvent"),{c:"sv",a:"middle"})+
 flow(196,236,170)+num(256,34,2)+R(302,70,52,56,"sk",3)+R(305,74,46,30,"sbitw")+R(305,104,46,8,"fmesh")+R(321,126,14,24,"sk")+flask(328,158,0)+L(343,190,400,190,"shose")+tx(408,194,W("к насосу","vers pompe","to pump"),{c:"sv"})+
 co(352,108,410,80,W("стеклянный фильтр","filtre en verre fritté","sintered-glass filter"))+co(318,240,240,300,W("колба для фильтрования","fiole à vide","filter flask"))+
 flow(470,500,170)+num(516,34,3)+dsc(560,150)+wbottle(560,176,"sbit")+co(596,230,640,300,W("эксикатор","dessiccateur","desiccator"))+bal(680,240,"m₂")+wbottle(680,216,"sbit")+co(694,222,700,150,W("бюкс","pèse-filtre","weighing bottle"))+
 note(["X₁ = m₂ / m₁ · 100","X = (m₁ − m₂) / m₁ · 100"])}
S.bviscc=function(v){return num(48,34,1)+R(170,60,250,170,"sk",2)+R(174,72,242,154,"swat")+waves(174,76,242)+therm(400,42,170)+
 L(204,40,204,200,"sl")+P("M190 200 h28","sk4")+co(204,120,100,120,W("мешалка","agitateur","stirrer"))+
 R(270,84,64,146,"sk",3)+R(274,104,56,122,"sbit")+L(268,104,262,104,"sacc3")+R(296,230,12,22,"sk")+L(302,30,302,214,"sl")+C(302,222,8,"sacc")+
 co(302,60,470,60,W("стержень с шариком","tige à bille obturatrice","ball-valve rod"))+co(280,140,470,110,W("рабочий цилиндр","cylindre de travail","working cylinder"))+co(264,104,140,170,W("метка уровня","repère de niveau","level mark"))+
 co(308,244,470,240,v?W("отверстие ⌀ 4 / 10 мм","orifice ⌀ 4 / 10 mm","orifice ⌀ 4 / 10 mm"):W("сточное отверстие","orifice","orifice"))+co(386,200,470,170,W("водяная баня","bain-marie","water bath"))+
 L(302,252,302,316,"sbitl")+cylg(288,256,84,16,"sbit")+L(282,319,312,319,"sacc3")+L(282,277,312,277,"sacc3")+tx(276,323,"25",{c:"sdt",a:"end"})+tx(276,281,"75",{c:"sdt",a:"end"})+co(316,300,470,300,W("мерный цилиндр 100 см³","éprouvette 100 cm³","100 cm³ cylinder"))+
 num(620,34,2)+stopwatch(650,110,"t₁, t₂")+tx(660,150,W("25 → 75 см³","25 → 75 cm³","25 → 75 cm³"),{c:"sv",a:"middle"})+
 note([v?"t = (t₁ + t₂) / 2":"УВ = (t₁ + t₂) / 2",W("время истечения 50 см³, с","temps d'écoulement de 50 cm³, s","outflow time of 50 cm³, s")])}
S.bcvisc=function(){return S.bviscc(1)}
S.bsolv=function(){var cap=function(x){return R(x-26,152,52,14,"sk",2)+R(x-23,156,46,6,"sbit")};return num(48,34,1)+R(60,60,250,210,"sk",5)+R(72,72,178,186,"sin",2)+L(72,168,250,168,"sk4")+cap(110)+cap(190)+therm(150,78,92)+
 R(258,72,42,186,"sk",2)+R(262,80,34,16,"sdisp",1)+tx(279,92,"100",{c:"sdispt",a:"middle",s:9})+C(279,116,5,"sin")+R(66,270,14,6,"sk")+R(290,270,14,6,"sk")+
 co(110,159,150,210,W("слой 0,1 см","couche 0,1 cm","0.1 cm layer"))+co(150,120,180,44,W("термометр","thermomètre","thermometer"))+tx(185,298,"100 °C",{c:"sv",a:"middle"})+
 flow(330,370,200)+num(386,34,2)+dsc(450,150)+R(424,182,52,8,"sk",2)+R(427,184,46,4,"sbit")+tx(450,272,W("охлаждение","refroidissement","cooling"),{c:"sv",a:"middle"})+
 flow(520,556,200)+num(576,34,3)+bal(640,240,"m₁")+R(614,226,52,14,"sk",2)+R(617,230,46,6,"sbit")+
 note(["m = π · d² · h · ρ / 4","X = (m − m₁) / m · 100"])}
S.bwater=function(){return num(48,34,1)+R(260,36,30,90,"sk",4)+R(264,44,22,74,"swat")+L(275,40,275,126,"sl")+L(260,56,240,56,"shose")+L(290,104,310,104,"shose")+R(262,24,26,12,"fsand",3)+
 R(264,126,22,104,"sk",3)+R(266,198,18,30,"swat")+[0,1,2,3,4].map(function(i){return L(286,140+i*18,292,140+i*18,"sd")}).join("")+P("M200 176 L264 140","sk4")+
 R(190,160,20,52,"sk")+C(200,246,38,"sk")+P("M165 258 A38 38 0 0 0 235 258 Z","sbitw")+burner(200,314)+dimV(306,198,228,"V₀")+
 co(275,30,380,40,W("ватный тампон","tampon de coton","cotton plug"))+co(286,80,380,80,W("холодильник","réfrigérant","condenser"))+co(286,160,380,150,W("приёмник-ловушка","piège gradué","graduated trap"))+co(272,218,380,220,W("вода","eau","water"))+
 co(220,262,380,270,W("проба + растворитель","échantillon + solvant","sample + solvent"))+co(186,300,100,300,W("горелка","brûleur","burner"))+
 note(["X = V₀ / m · 100","X₁ = V₀ / V · 100"])}
/* mastics: СТ РК 2371 */
S.mlook=function(){var inc=[[230,226,4],[310,206,3],[420,232,5],[470,200,3],[360,222,3.5]];return num(48,34,1)+P("M100 280 L520 280 L600 190 L180 190 Z","sk")+P("M120 272 L512 272 L582 198 L190 198 Z","sbit")+
 inc.map(function(p){return C(p[0],p[1],p[2],"sin")+C(p[0],p[1],p[2]+7,"sdash")}).join("")+P("M100 280 v10 h420 l80 -90 v-10","sl")+
 P("M600 92 q40 -28 80 0 q-40 28 -80 0 z","sk")+C(640,92,9,"sacc")+L(620,104,430,220,"sdash")+
 co(420,232,470,330,W("посторонние включения","inclusions étrangères","foreign inclusions"))+co(200,240,120,150,W("слой мастики","couche de mastic","mastic layer"))+co(140,284,110,330,W("картон / стекло / сталь","carton / verre / acier","cardboard / glass / steel"))+
 tx(640,62,W("осмотр без лупы","examen à l'œil nu","naked-eye check"),{c:"sv",a:"middle"})+note([W("число включений n ≤ нормы на мастику","nombre d'inclusions n ≤ valeur de la norme","inclusion count n ≤ the mastic standard")])}
S.mwabs=function(){var sp=function(x,y){return R(x-30,y,60,12,"sbit",1)};return num(48,34,1)+bal(120,230,"m₁")+sp(120,218)+co(140,224,170,150,"50 × 50 mm")+
 flow(200,240,220)+num(260,34,2)+tank(270,110,200,170,"",{noth:1})+sp(370,262)+dimV(450,126,262,"≥ 50 mm")+co(380,268,300,330,W("образец на дне","éprouvette au fond","specimen on the bottom"))+
 flow(500,540,220)+num(556,34,3)+bal(640,230,"m₂")+sp(640,218)+co(660,224,660,150,W("промокнуть","essuyer","blot dry"))+
 note(["W = (m₂ − m₁) / m₁ · 100"])}
S.mheat=function(){return num(48,34,1)+R(150,50,320,280,"sk",5)+R(162,62,236,256,"sin",2)+R(408,62,52,256,"sk",2)+R(414,72,40,18,"sdisp",1)+tx(434,85,"T °C",{c:"sdispt",a:"middle",s:9})+C(434,112,6,"sin")+C(434,134,6,"sin")+
 L(162,96,398,96,"sk4")+R(270,92,24,22,"sk",2)+R(252,114,60,120,"sbit")+dimH(162,252,250,"≥ 50 mm")+dimV(340,234,318,"≥ 50 mm")+
 co(282,104,520,90,W("зажим","pince","clamp"))+co(300,170,520,170,W("образец 100 × 50 мм","éprouvette 100 × 50 mm","specimen 100 × 50 mm"))+co(410,250,520,250,W("термошкаф","étuve","oven"))+
 note([W("осмотр: нет вздутий и подтёков","contrôle : ni cloques ni coulures","check: no blisters or flow")])}
S.mflex=function(){return num(48,34,1)+P("M110 200 h300 a40 40 0 0 1 0 80 h-300 z","sk")+P("M150 194 h260 a46 46 0 0 1 0 92 h-90","sbitl")+L(410,240,438,212,"sd")+C(410,240,2.5,"scd")+tx(424,256,"R",{c:"sdt"})+
 P("M480 210 a70 70 0 0 1 -12 90","sa")+P("M462 290 l6 12 l8 -12","sa")+
 co(250,194,250,130,W("полоска мастики 120 × 20 мм","bande de mastic 120 × 20 mm","mastic strip 120 × 20 mm"))+co(200,260,170,330,W("брус с закруглением","barre à arrondi","rounded bar"))+
 num(560,34,2)+C(640,170,44,"sk")+C(640,170,30,"sin")+L(672,202,700,236,"sk4")+P("M622 162 l8 10 l10 -14","sa")+tx(640,250,W("трещин нет","pas de fissure","no cracks"),{c:"sv",a:"middle"})+
 note([W("изгиб за (2 ± 1) с, затем осмотр на трещины","pliage en (2 ± 1) s, puis recherche de fissures","bend in (2 ± 1) s, then check for cracks")])}
S.mtens=function(){var d="M195 80 h50 v40 l-18 20 v90 l18 20 v40 h-50 v-40 l18 -20 v-90 l-18 -20 z";return num(48,34,1)+R(110,40,12,290,"sk")+R(318,40,12,290,"sk")+R(100,30,240,14,"sk",2)+
 R(180,64,80,46,"fhatch")+R(180,64,80,46,"sframe")+R(180,260,80,46,"fhatch")+R(180,260,80,46,"sframe")+P(d,"sbit")+L(206,160,234,160,"sacc3")+L(206,210,234,210,"sacc3")+dimV(276,160,210,"l",0)+
 arrowU(220,62,22,"")+L(220,62,220,44,"sl")+arrowD(220,308,24,"")+
 co(184,88,80,120,W("зажим","mors","grip"))+co(208,160,80,200,W("метки","repères","marks"))+tx(380,176,W("при разрыве: Pр, l₁","à la rupture : Pр, l₁","at break: Pр, l₁"),{c:"sv"})+
 tx(380,90,W("тип 1: 115 / 25 / 6 мм","type 1 : 115 / 25 / 6 mm","type 1: 115 / 25 / 6 mm"),{c:"sdt"})+tx(380,112,W("тип 2: 70 / 16 / 3 мм","type 2 : 70 / 16 / 3 mm","type 2: 70 / 16 / 3 mm"),{c:"sdt"})+tx(380,140,W("метки: 50 / 35 мм","repères : 50 / 35 mm","marks: 50 / 35 mm"),{c:"sdt"})+
 note(["σ = Pр / (b · h₀);  σε = Pε / (b · h₀)","ε = (l₁ − l) / l · 100"])}
S.mbond=function(){return num(48,34,1)+R(140,316,240,12,"sk",2)+R(150,220,20,96,"fhatch")+R(150,220,20,96,"sframe")+R(350,220,20,96,"fhatch")+R(350,220,20,96,"sframe")+R(170,222,180,94,"fconc")+R(170,208,180,14,"sbit")+
 R(222,208,4,14,"sin")+R(294,208,4,14,"sin")+R(230,190,60,18,"sk",2)+L(260,190,260,130,"sk4")+arrowU(260,124,60,"P")+dimH(230,290,180,"⌀ 25")+dimV(400,222,316,"50 mm")+
 co(224,214,90,150,W("надрез","incision","cut"))+co(180,215,90,200,W("мастика","mastic","mastic"))+co(240,270,120,280,W("основание","support","base"))+co(370,322,430,345,W("зажимное устройство","dispositif de serrage","clamping device"))+
 num(470,34,2)+R(500,90,160,160,"sbit")+C(580,170,38,"sdash")+C(580,170,30,"sk")+co(612,190,660,280,W("штамп ⌀ 25","pastille ⌀ 25","dolly ⌀ 25"))+co(616,160,660,80,W("надрез","incision","cut"))+
 note(["Rсц = P / S","S = π · d² / 4"])}
S.mshear=function(){return num(48,34,1)+R(100,130,300,110,"sk")+R(325,150,300,110,"sk")+R(325,150,75,90,"sbit")+L(263,124,263,250,"sacc3")+L(462,140,462,266,"sacc3")+
 dimH(325,400,120,"30 mm")+dimH(263,325,284,"25")+dimH(400,462,284,"25")+arrowL(92,185,50,"F")+arrowR(633,205,60,"F")+
 co(360,200,500,320,W("мастика (нахлёст)","mastic (recouvrement)","mastic (overlap)"))+co(250,200,230,330,W("рулонный материал 120 × 50","matériau en rouleau 120 × 50","roll material 120 × 50"))+co(462,180,560,100,W("метки","repères","marks"))+
 note(["r = F / l"])}
S.mdens=function(){return num(48,34,1)+P("M80 150 v110 h120 v-110","sk4")+R(82,150,116,110,"sbit")+tx(140,290,W("горячая мастика вровень","mastic chaud à ras bord","hot mastic level full"),{c:"sv",a:"middle"})+
 flow(230,270,210)+num(290,34,2)+P("M320 140 v130 h160 v-130","sk4")+P("M322 140 Q400 196 478 140 V270 H322 Z","sbit")+R(300,128,200,10,"sk",2)+L(400,138,400,168,"sacc3")+dimV(400,138,168,"Δ",0)+dimH(322,478,300,"⌀ 75")+dimV(510,140,270,"H = 45")+
 co(460,133,560,100,W("линейка","règle","straightedge"))+co(350,220,250,330,W("после остывания","après refroidissement","after cooling"))+
 num(590,34,3)+bal(660,240,"m₂")+P("M630 196 v40 h60 v-40","sk")+R(632,204,56,32,"sbit")+
 note(["У = Δ / H · 100;  V = π · d² / 4 · H","ρ = (m₂ − m₁) / V"])}
S.mlayer=function(){var st=function(x,y){return R(x-100,y+64,200,40,"fconc")+R(x-60,y+56,120,8,"sk")+R(x-60,y+48,120,8,"sbit")+R(x-60,y+40,120,8,"sk")+R(x-60,y,120,40,"fconc")};
 return num(48,34,1)+st(200,190)+R(165,110,70,60,"sacc",3)+tx(200,145,"1 kg",{c:"sdispt",a:"middle"})+arrowD(200,170,18,"")+
 co(280,276,340,300,W("пластинка 50 × 30 × 15","plaquette 50 × 30 × 15","plate 50 × 30 × 15"))+co(250,234,340,190,W("мембрана 30 × 30","membrane 30 × 30","membrane 30 × 30"))+co(250,242,340,245,W("мастика","mastic","mastic"))+tx(200,320,W("крестом","en croix","crosswise"),{c:"sv",a:"middle"})+
 flow(462,494,250)+num(500,34,2)+st(610,150)+arrowU(610,140,60,"Pпр")+arrowD(610,262,40,"")+co(660,202,710,180,"S")+
 note(["Rпр = Pпр / S"])}
/* crushed stone / ЩГПС */
S.gclay=function(){var g="";for(var i=0;i<14;i++)g+=P("M"+(96+i*20)+" 232 l7 -6 l8 2 l2 6 l-9 2 z","fagg");return num(48,34,1)+R(80,232,300,12,"sk",2)+g+
 R(300,70,12,100,"sk",3)+EL(306,62,12,14,"sk")+C(306,190,4,"swat")+C(306,210,3,"swat")+co(312,110,400,100,W("пипетка с водой","pipette d'eau","water pipette"))+co(200,228,170,170,W("тонкий слой щебня","couche mince de gravillon","thin layer of chips"))+
 heap(470,244,70,12,"fsoil")+co(470,236,520,170,W("пластичные комочки глины","mottes d'argile plastiques","plastic clay lumps"))+
 flow(530,566,240)+num(580,34,2)+bal(660,250,"m₁")+heap(660,250,46,8,"fsoil")+
 note(["Пгл = m₁ / m · 100 %"])}
S.gsoft=function(){return num(48,34,1)+R(130,310,280,14,"sk",2)+R(160,90,20,220,"sk")+R(360,90,20,220,"sk")+R(150,76,240,18,"sk",2)+C(270,44,22,"sk")+C(270,44,16,"sin")+L(270,44,280,34,"sacc2")+L(270,66,270,76,"sl")+
 R(220,94,100,30,"sk",8)+P("M255 124 h30 l-15 30 z","sk")+P("M256 160 l20 -4 l12 14 l-4 30 l-20 4 l-12 -18 z","fagg")+P("M255 244 h30 l-15 -34 z","sk")+R(300,176,50,10,"fhatch")+R(300,176,50,10,"sframe")+
 R(230,244,80,12,"sk",3)+L(270,256,270,300,"sscrew")+
 co(292,44,440,44,W("манометр","manomètre","pressure gauge"))+co(318,108,440,92,W("гидравлическая капсула","capsule hydraulique","hydraulic capsule"))+co(276,140,440,136,W("верхний зуб","dent supérieure","upper tooth"))+
 co(348,181,440,180,W("упор с прорезью","butée à fente","slotted stop"))+co(280,228,440,224,W("нижний зуб","dent inférieure","lower tooth"))+co(306,250,440,268,W("диск с винтом","disque à vis","screw disc"))+co(262,185,90,200,W("зерно","grain","grain"))+
 note(["Хсл = m₁ / m · 100 %","K = d / Rсж"])}
S.gfilter=function(){var x0=110,x1=640,y0=300,y1=60,X=function(d){return x0+(Math.log(d)/Math.LN10+1)/1.7*(x1-x0)},Y=function(p){return y0-p/100*(y0-y1)};
 var pts=[[5,0],[2.5,8],[1.25,22],[0.63,45],[0.315,72],[0.16,92],[0.1,98]],d="",s="";pts.forEach(function(p,i){d+=(i?" L":"M")+X(p[0]).toFixed(1)+" "+Y(p[1]).toFixed(1);s+=C(X(p[0]).toFixed(1),Y(p[1]).toFixed(1),3.5,"sk")+L(X(p[0]).toFixed(1),y0,X(p[0]).toFixed(1),y0+5,"sl")+tx(X(p[0]).toFixed(1),y0+18,String(p[0]).replace(".",","),{c:"sdt",a:"middle"})});
 var at=function(v){for(var i=1;i<pts.length;i++)if(pts[i][1]>=v){var a=pts[i-1],b=pts[i],k=(v-a[1])/(b[1]-a[1]);return X(Math.exp(Math.log(a[0])+k*(Math.log(b[0])-Math.log(a[0]))))}};
 var xa=at(90).toFixed(1),xb=at(66.7).toFixed(1);
 return P("M"+x0+" "+y1+" V"+y0+" H"+x1,"sl")+[0,20,40,60,80,100].map(function(p){return L(x0-5,Y(p),x0,Y(p),"sl")+tx(x0-9,Y(p)+4,p,{c:"sdt",a:"end"})}).join("")+P(d,"sacc3")+s+
 L(x0,Y(90),xa,Y(90),"sdash")+L(xa,Y(90),xa,y0,"sdash")+L(x0,Y(66.7),xb,Y(66.7),"sdash")+L(xb,Y(66.7),xb,y0,"sdash")+C(xa,Y(90),5,"sacc")+C(xb,Y(66.7),5,"sacc")+
 tx(x0+6,Y(90)-6,"90 %",{c:"sdt"})+tx(x0+6,Y(66.7)-6,"X = 66,7 %",{c:"sdt"})+tx(+xa+6,y0-8,"Дэ.п",{c:"sdt"})+tx(+xb+6,y0-8,"Дэ.с",{c:"sdt"})+
 tx(x0-4,y1-12,W("полный остаток, %","refus cumulé, %","cumulative retained, %"),{c:"sv"})+tx(x1,y0+38,W("размер отверстий сит, мм (лог.)","ouverture des tamis, mm (log)","sieve opening, mm (log)"),{c:"sv",a:"end"})+
 note(["X = 100 · (Мп − 10) / Мп","Кс = Кп · (Дэ.с / Дэ.п)²"])}
/* filler */
S.phydro=function(){return num(48,34,1)+P("M90 300 L610 300 L670 240 L150 240 Z","sin")+L(250,300,310,240,"sk4")+L(410,300,470,240,"sk4")+dimH(250,410,322,"50 mm")+
 beaker(230,110,100,140,90)+R(231,154,98,8,"fsand")+dimV(350,110,160,"50 mm")+P("M260 84 H420 M270 78 l-10 6 l10 6 M410 78 l10 6 l-10 6","sa")+tx(340,72,W("туда-обратно 100 мм за 1 с","aller-retour 100 mm en 1 s","back and forth 100 mm in 1 s"),{c:"sv",a:"middle"})+
 co(300,158,470,150,W("слой порошка на воде","couche de filler sur l'eau","filler layer on water"))+co(290,220,470,200,W("вода","eau","water"))+co(560,270,600,330,W("лист с двумя линиями","feuille à deux lignes","sheet with two lines"))+
 note([W("10 циклов без «туманных» следов → гидрофобен","10 cycles sans traînées → hydrophobe","10 cycles, no hazy trails → hydrophobic")])}
S.pact=function(){var s=R(70,140,480,10,"sk",2)+R(70,250,480,14,"sk",2)+R(80,264,10,40,"sk")+R(530,264,10,40,"sk"),v=["0,25","0,5","0,75","1,0","1,25","1,5","1,75","2,0"];
 v.forEach(function(t,i){var x=110+i*57;s+=ftube(x,100,150,(0.12+i*0.11).toFixed(2))+tx(x,326,t,{c:"sdt",a:"middle"})});
 return num(48,34,1)+s+co(110,180,180,60,W("эталоны: светлый → тёмный","étalons : clair → foncé","standards: light → dark"))+tx(310,346,W("% активирующей смеси","% de mélange activant","% activating mix"),{c:"sv",a:"middle"})+
 num(600,34,2)+R(600,250,60,14,"sk",2)+ftube(630,100,150,"0.5")+tx(630,90,"?",{c:"st",a:"middle",s:16})+co(640,220,680,300,W("проба","échantillon","sample"))+
 note([W("цвет пробы сравнивают с эталонами","couleur comparée aux étalons","colour compared with standards"),"П = (m − m₁) / m · 100"])}
S.pwsol=function(){return num(48,34,1)+R(70,282,130,22,"fsand")+R(70,282,130,22,"sframe")+hotplate(70,304,130)+flask(135,186,34,"swat")+heap(135,281,60,6,"fsand")+
 R(123,56,24,124,"sk",4)+R(126,66,18,104,"swat")+L(135,56,135,180,"sl")+L(123,80,104,80,"shose")+L(147,150,166,150,"shose")+
 co(147,100,220,70,W("обратный холодильник","réfrigérant à reflux","reflux condenser"))+co(180,293,145,345,W("песчаная баня","bain de sable","sand bath"))+co(150,262,220,230,W("порошок + вода","filler + eau","filler + water"))+
 flow(260,300,200)+num(320,34,2)+P("M330 120 h80 l-34 50 v40 h-12 v-40 z","sk")+P("M336 124 L370 162 L404 124","sdash")+L(370,214,370,236,"sd")+beaker(340,236,60,70,30)+co(390,140,450,100,W("фильтр","filtre","filter"))+
 flow(470,510,200)+num(530,34,3)+bal(620,250,"m₂")+dish(620,240,80,"fsand")+co(632,246,640,170,W("сухой остаток","résidu sec","dry residue"))+
 note(["A = (m₁ − m₂) / m · 100"])}
S.pbulk=function(){var cy=function(x,sed,mix){var s=P("M"+(x-25)+" 76 v236 h50 v-236","sl")+R(x-35,312,70,8,"sk",2)+R(x-28,58,56,18,"sk",3)+R(x-24,90,48,222,"swat");for(var i=1;i<10;i++)s+=L(x+25,90+i*22,x+17,90+i*22,"sd");
  if(mix)for(i=0;i<26;i++)s+=C(x-18+(i*13)%38,100+(i*37)%200,1.8,"sk");if(sed)s+=R(x-24,260,48,52,"fsand");return s};
 return num(48,34,1)+cy(140,0,1)+co(150,150,220,120,W("керосин + порошок","kérosène + filler","kerosene + filler"))+tx(140,346,W("50 мл","50 ml","50 ml"),{c:"sv",a:"middle"})+
 num(290,34,2)+'<g transform="translate(380 200) rotate(135) scale(0.55) translate(-380 -190)">'+cy(380,0,1)+'</g>'+P("M300 150 A95 95 0 0 1 460 150","sa")+P("M448 142 l12 8 l-16 4","sa")+tx(380,80,W("перевернуть 5 раз","retourner 5 fois","invert 5 times"),{c:"sv",a:"middle"})+
 num(520,34,3)+cy(610,1,0)+L(580,260,640,260,"sacc3")+dimV(660,260,312,"V")+stopwatch(520,150,"≥ 6 h")+co(600,290,520,330,W("осадок","dépôt","sediment"))+
 note(["ρн = m / V"])}
S.pvoid=function(){return num(48,34,1)+R(200,300,240,16,"fhatch")+R(200,300,240,16,"sframe")+L(230,46,230,300,"sk4")+L(410,46,410,300,"sk4")+R(220,36,200,12,"sk",2)+
 R(270,236,12,64,"fhatch")+R(270,236,12,64,"sframe")+R(358,236,12,64,"fhatch")+R(358,236,12,64,"sframe")+R(282,276,76,24,"fsand")+L(282,274,358,274,"sacc3")+
 R(286,250,68,22,"sk")+R(312,196,16,54,"sk")+R(300,190,40,8,"sk",2)+L(320,48,320,190,"sl")+R(296,72,48,46,"sacc",3)+L(230,95,296,95,"sd")+L(344,95,410,95,"sd")+
 dimV(470,118,190,"102 mm")+L(344,118,470,118,"sdash")+L(340,190,470,190,"sdash")+dimV(390,276,300,"h")+
 co(296,96,170,96,W("падающий груз ⌀ 25","bloc tombant ⌀ 25","drop weight ⌀ 25"))+co(230,160,150,160,W("направляющие","tiges de guidage","guide rods"))+co(300,262,150,230,W("поршень","piston","plunger"))+
 co(296,274,192,270,W("фильтровальная бумага","papier filtre","filter paper"))+co(300,292,190,330,W("уплотнённый порошок","filler compacté","compacted filler"))+
 note(["m₂ = m₁ − m₀","V = (1 − 4·10³ · m₂ / (π · a² · ρ₁ · h)) · 100"])}

/* ---------------- styles ---------------- */
var CSS=".lib-top{display:grid;gap:12px}.lib-search{display:flex;gap:8px;flex-wrap:wrap}.lib-search input{flex:1 1 220px}"+
".lib-fams{display:flex;gap:6px;flex-wrap:wrap}.lib-fams button{font:500 13px var(--body);background:var(--sheet);color:var(--ink);border:1px solid var(--line);border-radius:999px;padding:6px 12px;cursor:pointer}"+
".lib-fams button[aria-pressed=true]{background:var(--ink);color:var(--sheet);border-color:var(--ink)}.lib-fams b{font-family:var(--mono);font-weight:500;opacity:.65;margin-left:5px}"+
".lib-grp{display:grid;gap:0}.lib-grp h2{margin:6px 0 8px}.lib-list{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}"+
".lib-list li{border-bottom:1px solid var(--line)}.lib-list a{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 14px;padding:10px 4px;color:var(--ink);text-decoration:none}"+
".lib-list a:hover .lt,.lib-list a:focus-visible .lt{color:var(--accent)}.lib-list .lt{font-weight:600}.lib-list .ln{font:12px var(--mono);color:var(--muted);text-align:right;align-self:center}.lib-list .lg{grid-column:1/-1;color:var(--muted);font-size:12.5px}"+
".lib-ww{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}.lib-ww p{margin:4px 0 0;max-width:72ch}.lib-ww h3{margin:0}.lib-doc{display:grid;gap:16px}.lib-back{background:none;border:0;color:var(--accent);font:600 14px var(--display);padding:0;cursor:pointer;justify-self:start}"+
".lib-head h2{font-size:clamp(20px,4.6vw,26px);line-height:1.15}.lib-norm{font:13px var(--mono);color:var(--muted);margin:6px 0 0}"+
".lsvg{width:100%;height:auto;display:block}.lib-fig{padding:8px;overflow:hidden}"+
".lsvg .sbg{fill:var(--sheet)}.lsvg .sframe{fill:none;stroke:var(--ink);stroke-width:1.2}.lsvg .sframe2{fill:none;stroke:var(--ink);stroke-width:.6;opacity:.5}"+
".lsvg .sk{fill:var(--sheet);stroke:var(--ink);stroke-width:1.4}.lsvg .sl{fill:none;stroke:var(--ink);stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}"+
".lsvg .sin{fill:var(--soft);stroke:var(--ink);stroke-width:.8}.lsvg .sa{fill:none;stroke:var(--accent);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}"+
".lsvg .sf{fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:4 4}.lsvg .sd{fill:none;stroke:var(--muted);stroke-width:.9}"+
".lsvg .swat{fill:var(--water);stroke:none}.lsvg .sw2{fill:none;stroke:var(--muted);stroke-width:.8}.lsvg .sacc{fill:var(--accent);stroke:var(--ink);stroke-width:1}.lsvg .sacc2{stroke:var(--accent);stroke-width:3}"+
".lsvg .sacc3{fill:none;stroke:var(--accent);stroke-width:2.2;stroke-linecap:round}.lsvg .sasp{fill:var(--asph);stroke:var(--ink);stroke-width:1.2}.lsvg .sasp2{fill:none;stroke:var(--ink);stroke-width:.8;opacity:.6}"+
".lsvg .sbit{fill:var(--bitu);stroke:var(--ink);stroke-width:1}.lsvg .sbitl{fill:none;stroke:var(--bitu);stroke-width:4}.lsvg .sagg{fill:#B9AE98;stroke:var(--ink);stroke-width:1}"+
".lsvg .sconc{fill:#BDBDB6;stroke:var(--ink);stroke-width:1.2}.lsvg .svoid{fill:var(--sheet);stroke:var(--accent);stroke-width:1.2}.lsvg .sball{fill:var(--muted);stroke:var(--ink);stroke-width:.8}"+
".lsvg .smesh{stroke:var(--ink);stroke-width:1.2;stroke-dasharray:2 2}.lsvg .sdisp{fill:var(--ink)}.lsvg .sdispt{fill:var(--sheet);font-family:var(--mono)}"+
".lsvg .st{fill:var(--ink);font:12px var(--body)}.lsvg .sv{fill:var(--muted);font:12px var(--body)}.lsvg .sdt{fill:var(--ink);font:11px var(--mono)}.lsvg .sform{fill:var(--ink);font:500 13px var(--mono)}"+
".lsvg .snc{fill:var(--accent);stroke:none}.lsvg .snt{fill:var(--accent-ink);font:700 12px var(--body)}.lsvg .sstamp{fill:var(--ink);font-family:var(--mono)}.lsvg .sstamp2{fill:var(--ink);font:700 11px var(--display)}"+
".lsvg .fasp{fill:url(#pAsp);stroke:var(--ink);stroke-width:1.2}.lsvg .fasp2{fill:url(#pAsp);stroke:var(--ink);stroke-width:1.2;opacity:.75}.lsvg .fagg{fill:url(#pAgg);stroke:var(--ink);stroke-width:1.1}.lsvg .fsand{fill:url(#pSand);stroke:var(--ink);stroke-width:1.1}.lsvg .fsoil{fill:url(#pSoil);stroke:var(--ink);stroke-width:1.1}.lsvg .fconc{fill:url(#pConc);stroke:var(--ink);stroke-width:1.2}"+
".lsvg .fhatch{fill:url(#pHatch);stroke:none}.lsvg .fmesh{fill:url(#pMesh);stroke:var(--ink);stroke-width:1}.lsvg .pmesh{stroke:var(--ink);stroke-width:.6}.lsvg .phatch{stroke:var(--ink);stroke-width:.8}"+
".lsvg .pasp0{fill:var(--asph)}.lsvg .pasp1{fill:var(--bitu);opacity:.55}.lsvg .pasp2{fill:var(--sheet);opacity:.5}.lsvg .pagg0{fill:#CDBFA3}.lsvg .pagg1{fill:#A8977A;stroke:#7E7058;stroke-width:.5}.lsvg .pagg2{fill:#7E7058}"+
".lsvg .psoil0{fill:#B59873}.lsvg .psoil1{stroke:#7D6243;stroke-width:1}.lsvg .psoil2{fill:#7D6243}.lsvg .pconc0{fill:#C4C4BD}.lsvg .pconc1{fill:#8C8C85}"+
".lsvg .scd{fill:var(--ink)}.lsvg .scl{fill:none;stroke:var(--ink);stroke-width:.7}.lsvg .sco{fill:var(--ink);font:12px var(--body)}.lsvg .sf2{fill:none;stroke:var(--muted);stroke-width:1.4}.lsvg .sdash{fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:5 4}"+
".lsvg .sheat{fill:none;stroke:var(--bad,#B8322A);stroke-width:1.6}.lsvg .shose{fill:none;stroke:var(--ink);stroke-width:3;stroke-linecap:round;opacity:.7}.lsvg .sk3{stroke:var(--ink);stroke-width:3;stroke-linecap:round}.lsvg .sk4{fill:none;stroke:var(--ink);stroke-width:2.6;stroke-linecap:round}"+
".lsvg .sscrew{stroke:var(--ink);stroke-width:7;stroke-dasharray:2 2}.lsvg .sneedle{stroke:var(--ink);stroke-width:1.6}.lsvg .sflame{fill:#E8A23A;stroke:#B8322A;stroke-width:1}.lsvg .sbitw{fill:#C8B27A;opacity:.6}.lsvg .sbitstone{fill:var(--bitu);stroke:var(--ink);stroke-width:1}"+
".lsvg .shalf{fill:url(#pAgg);stroke:var(--bitu);stroke-width:4;stroke-dasharray:10 8}.lsvg .sice{fill:none;stroke:#5A8FB8;stroke-width:1.6}.lsvg .swatm{fill:var(--water);stroke:none;opacity:.8}.lsvg .fcone{fill:var(--sheet);stroke:var(--accent);stroke-width:2}.lsvg .fsoilline{fill:none;stroke:#B59873;stroke-width:2}.lsvg .sagg2{stroke:#A8977A;stroke-width:6;stroke-dasharray:3 4}"+
".lib-fig{overflow-x:auto}.lib-fig .lsvg{min-width:640px}"+
".lib-sec{display:grid;gap:8px}.lib-sec ol,.lib-sec ul{margin:0;padding-left:22px;display:grid;gap:7px}.lib-sec li{max-width:76ch}.lib-sec li::marker{font-family:var(--mono);color:var(--accent);font-weight:600}"+
".lib-chip{display:inline-block;font:500 12px var(--mono);background:var(--soft);border:1px solid var(--line);border-radius:5px;padding:0 6px;margin-left:4px;white-space:nowrap}"+
".lib-f{font:500 14px/1.5 var(--mono);background:var(--soft);border-left:3px solid var(--accent);padding:8px 12px;border-radius:0 6px 6px 0;overflow-x:auto;white-space:pre-wrap}"+
".lib-leg{display:grid;grid-template-columns:auto minmax(0,1fr);gap:3px 12px;font-size:13px;margin:0}.lib-leg dt{font-family:var(--mono);font-weight:600}.lib-leg dd{margin:0;color:var(--muted)}"+
".lib-calc{list-style:none;padding:0;margin:0;display:grid;gap:6px}.lib-calc li{font:13.5px/1.55 var(--mono);padding-left:0}.lib-calc li span{display:block;font:12.5px var(--body);color:var(--muted)}"+
".lib-concl{border:1px solid var(--ok);border-radius:8px;padding:10px 12px;background:color-mix(in srgb,var(--ok) 8%,var(--sheet))}.lib-note{color:var(--muted);font-size:12.5px;margin:0}"+
".lib-tools{display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:space-between}"+
"@media print{nav.tabs,header.top,.lib-back,.lib-tools button,#userbar,.lang{display:none!important}.card{border:0;padding:0}.lib-doc{gap:10px}.lsvg{max-height:none}}";

/* ---------------- data loading ---------------- */
var DATA={},WAIT={};
function src(){var s=document.querySelector('script[src*="lib-engine.js"]');var v=s&&(s.src.split("?")[1]||"");return v?"?"+v:""}
var DENIED=false;
function load(lang,cb){var dl=(lang==="fr"||lang==="en")?lang:"ru";if(DATA[dl])return cb(DATA[dl]);
 if(WAIT[dl]){WAIT[dl].push(cb);return}WAIT[dl]=[cb];
 if(window.DorLibSource){window.DorLibSource(dl).then(function(d){DENIED=!!(d&&d.denied);if(d&&!d.denied)DATA[dl]=d;var w=WAIT[dl];WAIT[dl]=null;w.forEach(function(f){f(DATA[dl]||null)})},function(){var w=WAIT[dl];WAIT[dl]=null;w.forEach(function(f){f(null)})});return}
 var s=document.createElement("script");s.src="lib-"+dl+".js"+src();
 s.onload=function(){DATA[dl]=(window.DORLAB_LIB||{})[dl];var w=WAIT[dl];WAIT[dl]=null;w.forEach(function(f){f(DATA[dl])})};
 s.onerror=function(){var w=WAIT[dl];WAIT[dl]=null;w.forEach(function(f){f(null)})};document.head.appendChild(s)}

/* ---------------- render ---------------- */
var ST={fam:"all",q:"",open:null};
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
/* inline markup: `x` → chip; **b** → bold */
/* force/pression : МПа, кН -> aussi en кгс/см², кгс, тс (demande de l'utilisateur) */
var FEU={ru:["кгс/см²","кгс","тс"],fr:["kgf/cm²","kgf","tf"],en:["kgf/cm²","kgf","tf"]};
function fN(v,d,lang){var s=v.toFixed(d);return lang==="en"?s:s.replace(".",",")}
function eqf(s,lang){lang=lang||LANG;var U=FEU[lang]||FEU.ru;s=String(s==null?"":s);
 return s.replace(/(\d+(?:[.,]\d+)?)(\s*[–\-]\s*(\d+(?:[.,]\d+)?))?(\s*)(МПа|MPa|кН|kN|Н|N)(?![A-Za-zА-Яа-яЁё/·²³0-9])/g,function(m,a,rg,b,sp,u,off,str){
  if(/=\s*$/.test(str.slice(Math.max(0,off-3),off))||/^\s*\(≈/.test(str.slice(off+m.length,off+m.length+4)))return m;
  var nw=(u==="Н"||u==="N"),kn=(u==="кН"||u==="kN"),xs=[parseFloat(a.replace(",","."))];if(b)xs.push(parseFloat(b.replace(",",".")));
  var o=xs.map(function(n){return nw?fN(n/9.80665,n/9.80665>=100?0:1,lang):kn?fN(n*101.972,0,lang):fN(n*10.1972,n*10.1972>=10?0:1,lang)}).join("–");
  var r=" (≈ "+o+" "+((kn||nw)?U[1]:U[0]);
  if(kn&&xs[xs.length-1]>=9.81)r+=" = "+xs.map(function(n){return fN(n/9.80665,2,lang)}).join("–")+" "+U[2];
  return m+r+")"})}
function md(s){return esc(s).replace(/`([^`]+)`/g,'<span class="lib-chip">$1</span>').replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")}
function table(t){if(!t)return"";return'<div class="tbl"><table><thead><tr>'+t.h.map(function(c,i){return'<th'+(i?' class="n"':'')+'>'+esc(c)+'</th>'}).join("")+'</tr></thead><tbody>'+
 t.r.map(function(r){return'<tr'+(r.b?' style="font-weight:600"':'')+'>'+(r.c||r).map(function(c,i){return'<td'+(i?' class="n"':'')+'>'+esc(c)+'</td>'}).join("")+'</tr>'}).join("")+'</tbody></table></div>'}
/* kgf/tf seulement quand on utilise la presse ou qu'on pose une charge sur l'éprouvette */
var PRESSRE=/пресс|нагруз|груз|давлен|усили|штамп|вибр|press|load|weight|pression|poids|charge|force/i;
function mdf(s,lang){s=String(s==null?"":s);return md(PRESSRE.test(s)?eqf(s,lang):s)}
function list(items,tag,f){var M=f?mdf:md;return'<'+tag+'>'+items.map(function(x){return'<li>'+M(x)+'</li>'}).join("")+'</'+tag+'>'}
function sec(h,body){return body?'<div class="card lib-sec"><h3>'+esc(h)+'</h3>'+body+'</div>':""}
/* variantes par matériau (voir guide.js) */
var MATL={ru:{hot:"Горячие смеси (СТ РК 1225)",cold:"Холодные смеси (СТ РК 1225)",pma:"ПМА (СТ РК 1223)",sma:"ЩМПА (СТ РК 2373)",black:"Чёрный щебень и смеси (СТ РК 1215, 1216)",bitum:"Битум","bitum:bnd":"БНД (СТ РК 1373)","bitum:bmp":"БМП (СТ РК 2534)","bitum:mast":"Мастика (СТ РК 2367)",emul:"Эмульсии (СТ РК 1274)",crushed:"Щебень, гравий (СТ РК 1213)",sand:"Песок (СТ РК 1217)",powder:"Минеральный порошок (СТ РК 1276)",shgps:"ЩГПС (СТ РК 1549)"},
fr:{hot:"Enrobés à chaud (СТ РК 1225)",cold:"Enrobés à froid (СТ РК 1225)",pma:"Polymère-asphalte ПМА (СТ РК 1223)",sma:"ЩМПА (СТ РК 2373)",black:"Concassé noir et mélanges noirs (СТ РК 1215, 1216)",bitum:"Bitume","bitum:bnd":"БНД (СТ РК 1373)","bitum:bmp":"БМП (СТ РК 2534)","bitum:mast":"Mastic (СТ РК 2367)",emul:"Émulsions (СТ РК 1274)",crushed:"Concassé, gravier (СТ РК 1213)",sand:"Sable (СТ РК 1217)",powder:"Filler minéral (СТ РК 1276)",shgps:"ЩГПС (СТ РК 1549)"},
en:{hot:"Hot mixes (ST RK 1225)",cold:"Cold mixes (ST RK 1225)",pma:"Polymer asphalt PMA (ST RK 1223)",sma:"Polymer SMA (ST RK 2373)",black:"Black crushed stone and mixes (ST RK 1215, 1216)",bitum:"Bitumen","bitum:bnd":"BND (ST RK 1373)","bitum:bmp":"BMP (ST RK 2534)","bitum:mast":"Mastic (ST RK 2367)",emul:"Emulsions (ST RK 1274)",crushed:"Crushed stone, gravel (ST RK 1213)",sand:"Sand (ST RK 1217)",powder:"Mineral filler (ST RK 1276)",shgps:"ST RK 1549 mixes"}};
var MVT={ru:["Варианты по материалам","Для этого материала порядок и значения по его СТ РК отличаются от общей карточки выше. Выберите свой материал:"],fr:["Variantes par matériau","Pour ce matériau, la procédure et les valeurs de son СТ РК diffèrent de la fiche générale ci-dessus. Choisissez votre matériau :"],en:["Variants by material","For this material the procedure and values of its ST RK differ from the general card above. Pick your material:"]};
function withV(t,vk){if(!t||!t.mv)return t;var r=null;(vk||[]).forEach(function(k){var o=t.mv[k];if(!o)return;if(!r){r={};for(var q in t)if(q!=="mv")r[q]=t[q]}for(q in o)r[q]=o[q]});return r||t}
function mvDoc(x,U){if(!x.mv)return"";var L=MATL[LANG]||MATL.ru,T=MVT[LANG]||MVT.ru;
 var ks=Object.keys(x.mv);if(!ks.length)return"";
 return'<div class="card lib-sec"><h2>'+esc(T[0])+'</h2><p class="hint">'+esc(T[1])+'</p>'+ks.map(function(k){var o=x.mv[k];
  return'<details class="lib-mv"><summary><b>'+esc(L[k]||k)+'</b>'+(o.norm?' <span class="ln">'+esc(o.norm)+'</span>':'')+'</summary>'+
   (o.when?'<p>'+md(o.when)+'</p>':'')+(o.goal?'<p>'+md(o.goal)+'</p>':'')+
   (o.eq?'<h3>'+esc(U.eq)+'</h3>'+list(o.eq,"ul",1):'')+(o.prep?'<h3>'+esc(U.prep)+'</h3>'+list(o.prep,"ol",1):'')+(o.steps?'<h3>'+esc(U.steps)+'</h3>'+list(o.steps,"ol",1):'')+
   (o.f?o.f.map(function(f){return'<div class="lib-f">'+esc(f)+'</div>'}).join(""):'')+
   (o.req?'<h3>'+esc(U.req)+'</h3>'+list(o.req,"ul"):'')+(o.notes?'<h3>'+esc(U.notes)+'</h3>'+list(o.notes,"ul"):'')+'</details>'}).join("")+'</div>'}
function testDoc(d,x,U,idx){LG=LANG;var fn=S[x.sch];var fig=fn?sheet(fn(),x.norm.split(" / ")[0].slice(0,34),U.fig+" "+(idx+1),x.t):"";
 var ex=x.ex||{};
 return'<div class="lib-doc"><button class="lib-back" id="lib_back">← '+esc(U.back)+'</button>'+
 '<div class="card lib-head"><h2>'+esc(x.t)+'</h2><p class="lib-norm">'+esc(x.norm)+'</p>'+'</div>'+
 (x.goal||x.when?'<div class="lib-ww">'+(x.goal?'<div class="card"><h3>'+esc(U.why)+'</h3><p>'+md(x.goal)+'</p></div>':'')+(x.when?'<div class="card"><h3>'+esc(U.when)+'</h3><p>'+md(x.when)+'</p><p class="lib-note">'+esc(U.whenNote)+'</p></div>':'')+'</div>':'')+
 (fig?'<div class="card lib-fig">'+fig+(x.figNote?'<p class="lib-note">'+md(x.figNote)+'</p>':'')+'</div>':'')+
 sec(U.eq,x.eq&&list(x.eq,"ul",1))+sec(U.prep,x.prep&&list(x.prep,"ol",1))+sec(U.steps,x.steps&&list(x.steps,"ol",1))+
 sec(U.calc,(x.f?x.f.map(function(f){return'<div class="lib-f">'+esc(f)+'</div>'}).join(""):"")+(x.leg?'<h3 style="margin-top:6px">'+esc(U.legend)+'</h3><dl class="lib-leg">'+x.leg.map(function(l){return'<dt>'+esc(l[0])+'</dt><dd>'+md(l[1])+'</dd>'}).join("")+'</dl>':""))+
 (ex.inp||ex.calc||ex.res?'<div class="card lib-sec"><h2>'+esc(U.ex)+'</h2>'+(ex.intro?'<p style="margin:0;max-width:72ch">'+md(ex.intro)+'</p>':'')+
   (ex.inp?'<h3>'+esc(U.exIn)+'</h3>'+table(ex.inp):'')+
   (ex.calc?'<h3>'+esc(U.exCalc)+'</h3><ol class="lib-calc">'+ex.calc.map(function(c){return'<li>'+(c[0]?'<span>'+md(c[0])+'</span>':'')+esc(c[1])+'</li>'}).join("")+'</ol>':'')+
   (ex.res?'<h3>'+esc(U.exRes)+'</h3>'+table(ex.res):'')+
   (ex.concl?'<div class="lib-concl"><b>'+esc(U.concl)+'.</b> '+md(ex.concl)+'</div>':'')+'</div>':'')+
 sec(U.req,x.req&&list(x.req,"ul"))+sec(U.notes,x.notes&&list(x.notes,"ul"))+mvDoc(x,U)+
 '<div class="lib-tools"><p class="lib-note">'+esc(U.check)+'</p><button class="b" id="lib_print">'+esc(U.print)+'</button></div></div>'}
function norm(s){return String(s).toLowerCase().replace(/ё/g,"е").replace(/[\s\-–.,()\/]+/g," ")}
function listDoc(d,U){var q=norm(ST.q).trim(),fams=d.fams,tests=d.tests.filter(function(x){return(ST.fam==="all"||x.fam===ST.fam)&&(!q||norm(x.t+" "+x.norm+" "+(x.goal||"")+" "+(x.kw||"")).indexOf(q)>=0)});
 var counts={};d.tests.forEach(function(x){counts[x.fam]=(counts[x.fam]||0)+1});
 var h='<div class="card lib-top"><h2>'+esc(U.h)+'</h2><p class="hint">'+esc(U.hint)+(U.fallback?" "+esc(U.fallback):"")+'</p><div class="lib-search"><input id="lib_q" type="search" placeholder="'+esc(U.search)+'" value="'+esc(ST.q)+'" aria-label="'+esc(U.search)+'"></div>'+
  '<div class="lib-fams" role="group">'+'<button data-f="all" aria-pressed="'+(ST.fam==="all")+'">'+esc(U.all)+'<b>'+d.tests.length+'</b></button>'+
  fams.map(function(f){return'<button data-f="'+f[0]+'" aria-pressed="'+(ST.fam===f[0])+'">'+esc(f[1])+'<b>'+(counts[f[0]]||0)+'</b></button>'}).join("")+'</div></div>';
 if(!tests.length)return h+'<div class="card"><p class="hint">'+esc(U.none)+'</p></div>';
 fams.forEach(function(f){var ts=tests.filter(function(x){return x.fam===f[0]});if(!ts.length)return;
  h+='<div class="card lib-grp"><h2>'+esc(f[1])+'</h2><ul class="lib-list">'+ts.map(function(x){return'<li><a href="#m/'+x.id+'" data-id="'+x.id+'"><span class="lt">'+esc(x.t)+'</span><span class="ln">'+esc(x.norm.split(" / ")[0])+'</span>'+(x.goal?'<span class="lg">'+esc(x.short||"")+'</span>':'')+'</a></li>'}).join("")+'</ul></div>'});
 return h}
var ROOT=null,LANG="ru";
function draw(){if(!ROOT)return;var U=ui(LANG);load(LANG,function(d){if(!ROOT)return;if(!d){ROOT.innerHTML='<div class="card"><p class="err">'+esc(failMsg(U))+'</p></div>';return}
 var idx=-1;if(ST.open)d.tests.forEach(function(x,i){if(x.id===ST.open)idx=i});
 if(idx>=0){ROOT.innerHTML=testDoc(d,d.tests[idx],U,idx);ROOT.querySelector("#lib_back").onclick=function(){ST.open=null;if(location.hash)history.replaceState(null,"",location.pathname+location.search);draw();ROOT.scrollIntoView()};
  ROOT.querySelector("#lib_print").onclick=function(){window.print()};return}
 ROOT.innerHTML=listDoc(d,U);var qi=ROOT.querySelector("#lib_q");
 qi.oninput=function(){ST.q=qi.value;var pos=qi.selectionStart;draw();var n=ROOT.querySelector("#lib_q");if(n){n.focus();try{n.setSelectionRange(pos,pos)}catch(e){}}};
 ROOT.querySelectorAll(".lib-fams button").forEach(function(b){b.onclick=function(){ST.fam=b.dataset.f;draw()}});
 ROOT.querySelectorAll(".lib-list a").forEach(function(a){a.onclick=function(e){e.preventDefault();ST.open=a.dataset.id;history.replaceState(null,"","#m/"+a.dataset.id);draw();window.scrollTo(0,ROOT.getBoundingClientRect().top+window.scrollY-60)}})})}
function render(el,lang){if(!document.getElementById("lib_css")){var st=document.createElement("style");st.id="lib_css";st.textContent=CSS;document.head.appendChild(st)}
 ROOT=el;LANG=lang||"ru";var m=/^#m\/([\w-]+)/.exec(location.hash);if(m)ST.open=m[1];
 el.innerHTML='<div class="card"><p class="hint">'+esc(ui(LANG).loading)+'</p></div>';draw()}

/* ---------------- popup from calculation tabs ---------------- */
var HOW={ru:["Как это получается?","Закрыть"],fr:["Comment on l'obtient ?","Fermer"],en:["How is this obtained?","Close"],kk:["Бұл қалай алынады?","Жабу"],zh:["这是怎么得到的？","关闭"]};
var CELLS={abr_rhoM:"a_dens",abr_Vres:"a_por",abr_Vmin:"a_por",abr_W:"a_wsat",abr_R50:"a_comp",abr_R20:"a_comp",abr_R0:"a_comp",abr_Kw:"a_wres",bitr_pen:"b_pen",bitr_kish:"b_rb",bitr_duct:"b_duct"};
var CARDS=[["abw00","a_dens"],["abp00","a_comp"],["ab_rho","a_true"],["bitpen0","b_pen"],["bitkish0","b_rb"],["bitduct0","b_duct"],["grr0","a_grad"],["bc_m0","a_bind"],["dr_m","a_drain"]];
var POPCSS=".lib-how{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;margin-left:6px;border-radius:50%;border:1px solid var(--accent);background:none;color:var(--accent);font:700 13px var(--display);cursor:pointer;vertical-align:middle;padding:0;flex:none}.lib-how:hover,.lib-how:focus-visible{background:var(--accent);color:var(--accent-ink,#111)}"+
".lib-pop{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.55);display:flex;justify-content:center;align-items:flex-start;overflow-y:auto;padding:24px 12px}"+
".lib-pop-in{background:var(--bg);color:var(--ink);width:min(920px,100%);border-radius:14px;padding:16px;box-shadow:0 10px 40px rgba(0,0,0,.4);position:relative}"+
".lib-pop-x{position:sticky;top:0;display:block;margin:0 0 10px auto;z-index:2;background:var(--accent);color:var(--accent-ink,#111);border:0;border-radius:8px;padding:8px 14px;font:600 14px var(--display);cursor:pointer}"+
".lib-pop .lib-back,.lib-pop .lib-tools{display:none}";
function css(){if(!document.getElementById("lib_css")){var st=document.createElement("style");st.id="lib_css";st.textContent=CSS;document.head.appendChild(st)}
 if(!document.getElementById("lib_css2")){var s2=document.createElement("style");s2.id="lib_css2";s2.textContent=POPCSS;document.head.appendChild(s2)}}
function uniq(html,suf){suf=suf||"_pp";var ids={};html.replace(/\sid="([^"]+)"/g,function(_,i){ids[i]=1});
 return html.replace(/(\sid="|url\(#|href="#)([^")]+)/g,function(m,a,i){return ids[i]?a+i+suf:m})}
function popup(id,lang,vk){css();lang=lang||LANG;var U=ui(lang),H=HOW[lang]||HOW.ru,last=document.activeElement;
 var ov=document.createElement("div");ov.className="lib-pop";ov.setAttribute("role","dialog");ov.setAttribute("aria-modal","true");
 ov.innerHTML='<div class="lib-pop-in"><button class="lib-pop-x">✕ '+esc(H[1])+'</button><div class="lib-pop-body"><p class="hint">'+esc(U.loading)+'</p></div></div>';
 document.body.appendChild(ov);var prev=document.body.style.overflow;document.body.style.overflow="hidden";
 function close(){document.removeEventListener("keydown",key);ov.remove();document.body.style.overflow=prev;if(last&&last.focus)last.focus()}
 function key(e){if(e.key==="Escape")close()}
 document.addEventListener("keydown",key);ov.onclick=function(e){if(e.target===ov)close()};var x=ov.querySelector(".lib-pop-x");x.onclick=close;x.focus();
 load(lang,function(d){var b=ov.querySelector(".lib-pop-body");if(!b)return;if(!d){b.innerHTML='<p class="err">'+esc(failMsg(U))+'</p>';return}
  var idx=-1;d.tests.forEach(function(t,i){if(t.id===id)idx=i});if(idx<0){close();return}
  var keep=LANG;LANG=lang;b.innerHTML=uniq(testDoc(d,withV(d.tests[idx],vk),U,idx));LANG=keep})}
function btn(id,lang){var H=HOW[lang]||HOW.ru;return'<button type="button" class="lib-how" data-how="'+id+'" title="'+esc(H[0])+'" aria-label="'+esc(H[0])+'">?</button>'}
function decorate(root,lang){if(!root)return;css();lang=lang||"ru";
 Object.keys(CELLS).forEach(function(cid){var c=root.querySelector("#"+cid);if(!c)return;var td=c.parentElement&&c.parentElement.firstElementChild;if(td&&!td.querySelector(".lib-how"))td.insertAdjacentHTML("beforeend",btn(CELLS[cid],lang))});
 CARDS.forEach(function(p){var i=root.querySelector("#"+p[0]);if(!i)return;var card=i.closest(".card");var h=card&&card.querySelector("h2,h3");if(h&&!h.querySelector(".lib-how"))h.insertAdjacentHTML("beforeend",btn(p[1],lang))});
 if(!root._how){root._how=1;root.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest(".lib-how");if(b){e.preventDefault();popup(b.dataset.how,root._lang||"ru")}})}
 root._lang=lang}
/* ---------------- step figures: one drawing per action ---------------- */
var SCN={
 wg:["Взвешивание","Pesée","Weighing"],wgh:["Гидростатическое взвешивание","Pesée hydrostatique","Hydrostatic weighing"],dry:["Сушка","Séchage","Drying"],
 bath:["Выдерживание в воде","Bain thermostaté","Water bath"],heat:["Нагрев","Chauffage","Heating"],mix:["Перемешивание","Mélange","Mixing"],
 comp:["Укладка и уплотнение","Mise en place et compactage","Placing and compaction"],press:["Нагружение","Chargement","Loading"],sv:["Просеивание","Tamisage","Sieving"],
 wash:["Промывка","Lavage","Washing"],smp:["Отбор и сокращение пробы","Prélèvement et réduction","Sampling and reduction"],cool:["Охлаждение","Refroidissement","Cooling"],
 ext:["Извлечение, снятие","Démoulage, retrait","Removal"],meas:["Измерение","Mesure","Measuring"],rec:["Запись результатов","Relevé des valeurs","Recording"],
 calc:["Расчёт","Calcul","Calculation"],pour:["Заливка, добавление","Versement, ajout","Pouring, adding"],obs:["Осмотр, оценка","Examen, appréciation","Inspection"],
 plc:["Установка, подготовка","Mise en place du montage","Setting up"],vac:["Вакуум","Mise sous vide","Vacuum"],frz:["Заморозка, оттаивание","Gel, dégel","Freezing, thawing"],
 rep:["Повтор","Répétition","Repeat"],wt:["Выдержка по времени","Temps d'attente","Waiting time"],gen:["Операция","Opération","Operation"]};
var SM={"a_sample":{"p":["calc","calc"],"s":["smp","smp","mix","wg"]},"a_form":{"p":["smp","calc","wg"],"s":["comp","press","press","press","obs","bath"]},"a_dens":{"p":["smp","calc","wg","press","press","smp"],"s":["wg","bath","wg","ext","rep"]},"a_wsat":{"p":["gen"],"s":["pour","vac","wt","ext","wg"]},"a_swell":{"p":["rep"],"s":["vac","wg","obs"]},"a_true":{"p":["smp","cool"],"s":["wg","comp","pour","vac","plc","pour","wash","rep"]},"a_por":{"p":["calc","calc"],"s":["calc","calc","calc"]},"a_comp":{"p":["smp","calc","wg","press","press","meas"],"s":["bath","press","ext","press","press","rep"]},"a_wres":{"p":["smp","calc","wg","press","press","vac"],"s":["press","bath","bath","calc"]},"a_split":{"p":["smp","calc","wg","press","press","meas"],"s":["bath","comp","press","obs"]},"a_shear":{"p":["comp","bath","meas"],"s":["press","rec","press","calc","calc"]},"a_bind":{"p":["smp","dry","wg"],"s":["plc","heat","dry","wg","heat","rep"]},"a_grad":{"p":["smp","wash"],"s":["sv","sv","wg","calc","calc"]},"a_marsh":{"p":["heat","comp","cool"],"s":["bath","press","rec","calc"]},"a_rut":{"p":["comp","bath"],"s":["plc","plc","rec","calc"]},"a_drain":{"p":["heat","wg"],"s":["plc","bath","ext","plc","rep"]},"a_bend":{"p":["press","bath","meas"],"s":["press","comp","plc","press","rec"]},"a_wlong":{"p":["comp","smp"],"s":["calc","bath","plc","ext"]},"a_wacc":{"p":["comp"],"s":["bath","vac","plc","cool","wash"]},"a_tsr":{"p":["cool","calc","comp","smp"],"s":["bath","wg","calc","frz","ext","bath","meas","obs"]},"a_wacc60":{"p":["smp","bath"],"s":["comp","heat","cool","press","gen"]},"a_frost":{"p":["comp","bath"],"s":["plc","frz","frz","rep","gen","calc"]},"a_adhmix":{"p":["gen","plc"],"s":["bath","bath","bath","wash","plc","obs"]},"a_cake":{"p":["comp","bath"],"s":["plc","ext","rep","obs","rec"]},"a_homog":{"p":["rec","press"],"s":["calc","calc","calc"]},"a_mixtemp":{"p":["heat"],"s":["smp","comp","smp","rec"]},"a_pavtemp":{"p":["wash","calc","smp","wt"],"s":["pour","ext","rep","rec"]},"b_sample":{"p":["smp","heat","wash"],"s":["pour","pour","cool","bath"]},"b_pen":{"p":["smp","heat","wash","pour"],"s":["plc","plc","ext","calc","rep","bath"]},"b_rb":{"p":["smp","heat","wash","plc"],"s":["plc","plc","heat","rec","obs"]},"b_duct":{"p":["smp","heat","wash","plc","bath"],"s":["ext","plc","obs","rec"]},"b_fraass":{"p":["smp","heat","pour"],"s":["plc","cool","rec","rep"]},"b_rtfot":{"p":["smp","heat","wash","pour"],"s":["heat","mix","cool","pour"]},"b_flash":{"p":["smp","heat","pour"],"s":["heat","wt","rec","rec"]},"b_pi":{"p":["calc"],"s":["calc","calc","calc"]},"b_elast":{"p":["smp","heat","wash","bath"],"s":["press","wt","wt"]},"b_adh":{"p":["dry","bath"],"s":["heat","bath","ext","obs"]},"b_visc":{"p":["smp","heat"],"s":["wt","wt","meas","rep"]},"e_mix":{"p":["wash"],"s":["mix","mix","obs","obs"]},"e_break":{"p":["wash"],"s":["wg","pour","wt","wg"]},"e_bind":{"p":["wg"],"s":["heat","obs","cool","rep"]},"e_sieve":{"p":["wash","sv"],"s":["wash","wash","dry","rep"]},"e_strat":{"p":["mix"],"s":["wt","calc"]},"e_adh":{"p":["wash"],"s":["wg","bath","pour","pour"]},"e_transp":{"p":["mix"],"s":["mix","ext","obs"]},"e_ph":{"p":["calc","mix"],"s":["wash","plc","rep"]},"g_sample":{"p":["wg"],"s":["smp","mix","smp","dry","gen"]},"g_sieve":{"p":["smp","dry","wg"],"s":["sv","sv","wg","obs","calc"]},"g_wash":{"p":["smp"],"s":["pour","pour","pour","dry"]},"g_flaky":{"p":["smp","dry","wg"],"s":["obs","meas","wg"]},"g_crush":{"p":["smp","smp","dry"],"s":["comp","press","press","wg","rep"]},"g_la":{"p":["smp","dry"],"s":["plc","mix","wash","dry"]},"g_bulk":{"p":["smp","dry","wg"],"s":["meas","ext","wg","rep"]},"g_dens":{"p":["smp","wash"],"s":["bath","wg","ext","dry"]},"g_frost":{"p":["smp","wash","bath"],"s":["bath","frz","dry","bath"]},"g_mixgrad":{"p":["smp","wash"],"s":["sv","wg","calc"]},"s_sieve":{"p":["smp","dry","sv","sv"],"s":["sv","sv","wg","calc"]},"s_wash":{"p":["smp","dry","wg"],"s":["pour","mix","rep","dry"]},"s_se":{"p":["calc"],"s":["pour","mix","wt","bath"]},"s_swell":{"p":["dry"],"s":["comp","bath","mix","wt"]},"p_grain":{"p":["smp"],"s":["wash","sv","calc"]},"p_por":{"p":["dry"],"s":["press","press","calc"]},"p_swell":{"p":["mix"],"s":["wg","bath","calc"]},"p_bitcap":{"p":["dry"],"s":["pour","obs","rec"]},"so_moist":{"p":["smp","wg"],"s":["plc","dry","cool"]},"so_atter":{"p":["smp","sv"],"s":["bath","obs","plc","rep"]},"so_ring":{"p":["meas","gen"],"s":["press","ext","wg","calc"]},"so_proctor":{"p":["smp","dry","smp"],"s":["comp","ext","smp","rep","calc"]},"so_kcomp":{"p":["calc","gen"],"s":["calc","calc","obs"]},"so_grad":{"p":["smp","dry"],"s":["sv","wg","gen","calc"]},"c_slump":{"p":["smp","gen"],"s":["comp","ext","plc","rep"]},"c_cube":{"p":["smp","gen","meas"],"s":["press","press","calc"]},"c_beam":{"p":["gen","gen"],"s":["press","press","calc"]},"f_core":{"p":["smp","wash","calc"],"s":["meas","calc","calc"]},"f_plate":{"p":["plc","plc"],"s":["gen","press","rec","rec"]},"f_benk":{"p":["wt"],"s":["plc","ext","ext","calc"]},"f_ruler":{"p":["wt"],"s":["plc","meas","gen"]}};
function subjOf(t){var f=t.fam;return f==="agg"?"fagg":f==="sand"||f==="powd"?"fsand":f==="soil"?"fsoil":f==="conc"?"fconc":"fasp"}
function pressKind(t){var s=t.sch;return s==="split"?"split":s==="marshall"?"marsh":s==="cube"?"cube":s==="beam"||s==="bend"?"beam":"cyl"}
function thing(t,x,y){var f=subjOf(t),fam=t.fam;
 if(fam==="bit")return R(x-24,y-20,48,20,"sk",3)+R(x-22,y-12,44,12,"fasp");
 if(fam==="agg"||fam==="sand"||fam==="powd"||fam==="soil")return heap(x,y,64,15,f);
 return spec(x-18,y-36,36,36,f)}
function arrowU(x,y,len,lab){return L(x,y,x,y-len,"sa")+P("M"+(x-6)+" "+(y-len+10)+" L"+x+" "+(y-len)+" L"+(x+6)+" "+(y-len+10),"sa")+(lab?tx(x+9,y-len/2,lab,{c:"sv"}):"")}
function arc(cx,cy,r){return P("M"+(cx-r)+" "+cy+" A"+r+" "+r+" 0 1 1 "+(cx+r*0.7)+" "+(cy+r*0.7)+" M"+(cx+r*0.7)+" "+(cy+r*0.7)+" l-2 -11 m2 11 l-11 0","sa")}
function SC(n,t){var f=subjOf(t),fl=t.fam==="bit"||t.fam==="asph"?"fasp":"swat",s="";
 switch(n){
 case"wg":return bal(380,170,"0,00 g")+thing(t,380,170)+arrowD(300,80,60)+co(344,196,260,236,W("весы","balance","balance"));
 case"wgh":return hbal(380,64,"0,00 g",t.fam==="asph"||t.fam==="agg")+co(300,126,200,110,W("корзина в воде","panier dans l'eau","basket in water"));
 case"dry":return oven(400,64,W("105–110 °C","105–110 °C","105–110 °C"),{sample:true,fill:f})+thing(t,200,208)+arrowR(250,178,100)+co(330,114,160,80,W("сушильный шкаф","étuve","oven"));
 case"bath":return tank(250,100,260,130,"",{heat:1})+R(330,150,70,44,"fmesh")+thing(t,365,194)+stopwatch(590,140,"")+co(300,140,150,110,W("водяная баня","bain-marie","water bath"));
 case"heat":return hotplate(300,206,160)+beaker(350,128,60,78,40,fl)+therm(430,116,92)+P("M330 196 q-6 -14 0 -26 M380 196 q-6 -14 0 -26 M430 196 q-6 -14 0 -26","sheat")+co(380,206,520,150,W("плитка","plaque chauffante","hot plate"));
 case"mix":return beaker(330,100,100,120,64,fl)+L(420,60,380,200,"sk4")+arc(380,150,60)+co(340,200,200,160,W("ёмкость","récipient","vessel"));
 case"comp":return mould(320,90,140,140,f)+L(390,40,390,96,"sl")+R(366,96,48,12,"sk",2)+arrowD(470,50,44,"×N")+co(326,200,200,200,W("форма","moule","mould"));
 case"press":return press(380,40,pressKind(t),"P","",1);
 case"sv":return stack(340,66,100,["","",""],[0,0,0],f)+shaker(340,168,100)+co(440,150,560,130,W("сита","tamis","sieves"))+co(440,184,560,214,W("встряхиватель","tamiseuse","shaker"));
 case"wash":return R(372,64,16,34,"sk")+L(380,98,380,106,"sl")+P("M380 112 v70 M368 120 v62 M392 120 v62","swatm")+sieve(320,184,120,"",true,f)+tank(250,216,260,40,"",{noth:1})+co(440,196,560,170,W("сито","tamis","sieve"));
 case"smp":return quarter(380,210)+shovel(220,214)+heap(560,214,110,28,f);
 case"cool":return R(250,214,240,8,"fhatch")+thing(t,370,214)+P("M300 150 q20 -14 40 0 t40 0 M300 120 q20 -14 40 0 t40 0 M420 150 q20 -14 40 0 t40 0","sa")+therm(540,100,110);
 case"ext":return mould(330,110,120,130,f)+arrowU(390,100,50)+thing(t,390,62)+co(336,220,210,220,W("форма","moule","mould"));
 case"meas":return spec(350,100,70,110,f)+dimV(450,100,210,"h")+dimH(350,420,236,"d")+R(300,96,10,120,"sk")+R(300,96,40,8,"sk")+R(300,208,40,8,"sk");
 case"rec":return R(260,76,240,160,"sk",6)+L(260,108,500,108,"sl")+L(340,76,340,236,"sl")+L(420,76,420,236,"sl")+L(260,144,500,144,"sd")+L(260,180,500,180,"sd")+tx(380,98,"m, g",{c:"sdt",a:"middle"})+tx(300,130,"1",{c:"sdt",a:"middle"})+tx(300,166,"2",{c:"sdt",a:"middle"})+tx(300,202,"3",{c:"sdt",a:"middle"})+P("M540 90 l-70 100 l-6 18 l18 -8 l72 -100 z","sk");
 case"calc":return R(320,66,120,170,"sk",10)+R(332,78,96,34,"sdisp",3)+tx(420,102,"= ?",{c:"sdispt",a:"end",s:14})+(function(){var q="";for(var i=0;i<3;i++)for(var j=0;j<4;j++)q+=C(346+i*34,134+j*26,8,j===3&&i===2?"sacc":"sin");return q})();
 case"pour":return'<g transform="rotate(-38 330 120)">'+beaker(290,90,76,90,50,fl)+'</g>'+P("M300 150 q26 24 60 62","swatm")+beaker(380,150,90,100,50,fl)+P("M345 170 v30","swatm");
 case"obs":return C(370,140,58,"sk")+C(370,140,50,"sin")+thing(t,370,170)+L(412,182,470,236,"sk4");
 case"plc":return R(430,100,170,130,"sk",8)+R(444,114,142,102,"sin",4)+thing(t,270,222)+arrowR(310,190,100)+co(520,100,600,70,W("прибор","appareil","apparatus"));
 case"vac":return desic(360,64,{spec:f==="fasp"});
 case"frz":return freezer(310,62,"−18 °C")+thing(t,400,138);
 case"rep":return arc(380,150,64)+thing(t,380,168)+tx(380,244,"×2–3",{c:"sv",a:"middle"});
 case"wt":return'<g transform="translate(380 150) scale(3.4)">'+stopwatch(0,0,"")+'</g>';
 default:return R(250,214,260,8,"fhatch")+thing(t,380,214)+arrowD(380,76,60)+tx(380,252,"…",{c:"sv",a:"middle"})}}
function chips(txt){txt=String(txt).replace(/[`*]/g,"");var u="°C|°С|%|мм\\/мин|mm\\/min|см\\/мин|cm\\/min|МПа\\/с|MPa\\/s|об\\/мин|мин|min|ч|h|сут\\w*|jours?|days?|ударов|coups|blows|циклов|cycles|оборотов|tours|кг|kg|г|g|мм|mm|см|cm|мл|ml|см³|cm³|кПа|kPa|МПа|MPa|Па|Pa|с|s";
 var re=new RegExp("(?:[−-]\\s?)?\\d[\\d.,]*(?:\\s?[–±−-]\\s?\\d[\\d.,]*)?\\s?(?:"+u+")(?![A-Za-zА-Яа-яЁё²³])","g"),o=[],m;
 while((m=re.exec(txt))){var v=m[0].trim();if(/^\d+\s?[сs]$/.test(v)){var nx=txt.slice(re.lastIndex,re.lastIndex+3);if(/^\s[a-zа-я]/.test(nx)&&!/^\s(and|et|и|затем|puis)/.test(nx))continue}
  if(o.indexOf(v)<0)o.push(v)}return o.slice(0,4)}
function stepSheet(inner,title,n,total,cp,norm){var s='<svg viewBox="0 0 760 300" role="img" aria-label="'+E(title)+'" class="lsvg">'+defs()+'<rect x="0" y="0" width="760" height="300" class="sbg"/>'+R(6,6,748,288,"sframe")+R(14,14,732,272,"sframe2")+
 C(48,46,22,"snc")+tx(48,55,String(n),{c:"snt",a:"middle",s:24})+tx(82,54,title,{c:"sv",s:25})+tx(736,34,n+" / "+total,{c:"sdt",a:"end",s:16})+inner;
 var x=40;cp.forEach(function(c){var w=c.length*11+26;s+=R(x,246,w,32,"sdisp",16)+tx(x+w/2,268,c,{c:"sdispt",a:"middle",s:19});x+=w+10});
 s+=tx(742,284,"DorLabKZ · "+norm,{c:"sstamp",a:"end",s:11})+'</svg>';return LG==="en"?s.replace(/(\d),(\d)/g,"$1.$2"):s}
/* kind: "prep" | "run" | "meas" | "res"; i = index inside the group; txt = step text in the language shown */
function stepFig(t,kind,i,total,n,txt,lang){var keep=LANG;LANG=lang||"ru";LG=LANG;var li=LANG==="fr"?1:LANG==="en"?2:0,m=SM[t.id]||{},c=kind==="meas"?"rec":kind==="res"?"calc":((kind==="prep"?m.p:m.s)||[])[i]||"gen";
 var h=stepSheet(SC(c,t),SCN[c][li],n,total,kind==="meas"||kind==="res"?[]:chips(txt),t.norm.split(" / ")[0].slice(0,30));LANG=keep;return uniq(h,"_s")}

function figOf(x,idx,lang){var keep=LANG;LANG=lang||"ru";LG=LANG;var U=ui(LANG),fn=S[x.sch];var h=fn?sheet(fn(),x.norm.split(" / ")[0].slice(0,34),U.fig+" "+(idx+1),x.t):"";LANG=keep;return uniq(h,"_g")}
function failMsg(U){return DENIED?U.denied:U.fail}
window.DorLib={eqf:eqf,mdf:mdf,stepFig:stepFig,failMsg:function(lang){return failMsg(ui(lang))},reset:function(){DATA={};DENIED=false},data:function(lang,cb){css();load(lang,cb)},fig:figOf,md:md,ui:ui,popup:popup,decorate:decorate,render:render,tab:function(lang){return ui(lang).tab},wantsOpen:function(){return/^#m\//.test(location.hash)},_S:S,_sheet:sheet};
})();
