/* DorLabKZ — mise en page du procès-verbal : entreprise, logo, cachet, signataires, champs libres, impression */
(function(){
"use strict";
function $(id){return document.getElementById(id)}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var TX={
 ru:{tpl:"Вид протокола",tplS:"Простой",tplO:"Официальный (как протокол ИЛ, шрифт Times)",logo2:"Логотип справа вверху (организация)",labTitle:"Заголовок над реквизитами",accr:"Аттестат аккредитации (жирным)",ndH:"НД на методы испытаний (столбец 3)",fillF:"Заполнить поля как в образце протокола",h:"Оформление протокола",hint:"Шапка организации, печать, подписи и свои поля. Сохраняется на этом устройстве и подставляется во все протоколы.",
  org:"Организация",name:"Название организации",details:"Реквизиты (адрес, БИН, телефон, аттестат лаборатории…)",logo:"Логотип",stamp:"Печать (лучше PNG с прозрачным фоном)",pick:"Выбрать файл",del:"Убрать",size:"Размер печати, мм",
  signH:"Подписи",testerPost:"Должность исполнителя",headPost:"Должность руководителя",headName:"ФИО руководителя",stampOn:"Ставить печать на протокол",
  fieldsH:"Свои поля протокола",fieldsHint:"Например: Заказчик, Договор №, Дата отбора. Названия запоминаются, значения — для каждого протокола свои.",fLabel:"Название поля",fValue:"Значение",add:"＋ Добавить поле",
  footer:"Нижний колонтитул (текст внизу протокола)",print:"Печать",pdf:"PDF",big:"Файл слишком большой (макс. 3 МБ).",testerD:"Инженер-лаборант",headD:"Заведующий лабораторией",stampAlt:"Печать"},
 fr:{tpl:"Modèle de PV",tplS:"Simple",tplO:"Officiel (comme un protocole de labo, police Times)",logo2:"Logo en haut à droite (organisme)",labTitle:"Titre au-dessus des coordonnées",accr:"Attestation d'accréditation (en gras)",ndH:"Normes des méthodes d'essai (colonne 3)",fillF:"Remplir les champs comme dans le modèle",h:"Mise en page du PV",hint:"En-tête de l'entreprise, cachet, signatures et champs à toi. Gardé sur cet appareil et mis dans tous les procès-verbaux.",
  org:"Entreprise",name:"Nom de l'entreprise",details:"Coordonnées (adresse, BIN, téléphone, accréditation du labo…)",logo:"Logo",stamp:"Cachet (de préférence PNG à fond transparent)",pick:"Choisir un fichier",del:"Retirer",size:"Taille du cachet, mm",
  signH:"Signatures",testerPost:"Fonction du laborantin",headPost:"Fonction du responsable",headName:"Nom du responsable",stampOn:"Mettre le cachet sur le PV",
  fieldsH:"Champs personnalisés du PV",fieldsHint:"Par exemple : Client, Contrat n°, Date de prélèvement. Les noms sont mémorisés, les valeurs sont propres à chaque PV.",fLabel:"Nom du champ",fValue:"Valeur",add:"＋ Ajouter un champ",
  footer:"Pied de page (texte en bas du PV)",print:"Imprimer",pdf:"PDF",big:"Fichier trop lourd (max. 3 Mo).",testerD:"Ingénieur laborantin",headD:"Responsable du laboratoire",stampAlt:"Cachet"},
 en:{tpl:"Report template",tplS:"Simple",tplO:"Official (lab protocol style, Times font)",logo2:"Top-right logo (organisation)",labTitle:"Title above the details",accr:"Accreditation certificate (bold)",ndH:"Test method standards (column 3)",fillF:"Fill the fields like the sample protocol",h:"Report layout",hint:"Company header, stamp, signatures and your own fields. Kept on this device and used in every report.",
  org:"Company",name:"Company name",details:"Details (address, BIN, phone, lab accreditation…)",logo:"Logo",stamp:"Stamp (preferably PNG with transparent background)",pick:"Choose file",del:"Remove",size:"Stamp size, mm",
  signH:"Signatures",testerPost:"Technician's position",headPost:"Head's position",headName:"Head's name",stampOn:"Put the stamp on the report",
  fieldsH:"Custom report fields",fieldsHint:"E.g. Client, Contract No., Sampling date. Names are remembered; values are per report.",fLabel:"Field name",fValue:"Value",add:"＋ Add field",
  footer:"Footer (text at the bottom of the report)",print:"Print",pdf:"PDF",big:"File too large (max 3 MB).",testerD:"Lab engineer",headD:"Head of laboratory",stampAlt:"Stamp"},
 kk:{tpl:"Хаттама түрі",tplS:"Қарапайым",tplO:"Ресми (Times қаріпі)",logo2:"Оң жақ жоғарғы логотип",labTitle:"Деректемелер үстіндегі тақырып",accr:"Аккредиттеу аттестаты",ndH:"Сынау әдістерінің НҚ",fillF:"Өрістерді үлгідей толтыру",h:"Хаттаманы рәсімдеу",hint:"Ұйым тақырыбы, мөр, қолтаңбалар және өз өрістеріңіз.",org:"Ұйым",name:"Ұйым атауы",details:"Деректемелер (мекенжай, БСН, телефон…)",logo:"Логотип",stamp:"Мөр (PNG)",pick:"Файл таңдау",del:"Алып тастау",size:"Мөр өлшемі, мм",
  signH:"Қолтаңбалар",testerPost:"Орындаушы лауазымы",headPost:"Басшы лауазымы",headName:"Басшының аты-жөні",stampOn:"Хаттамаға мөр басу",fieldsH:"Өз өрістері",fieldsHint:"Мысалы: Тапсырыс беруші, Шарт №.",fLabel:"Өріс атауы",fValue:"Мәні",add:"＋ Өріс қосу",
  footer:"Төменгі колонтитул",print:"Басып шығару",pdf:"PDF",big:"Файл тым үлкен (макс. 3 МБ).",testerD:"Инженер-зертханашы",headD:"Зертхана меңгерушісі",stampAlt:"Мөр"},
 zh:{tpl:"报告模板",tplS:"简单",tplO:"正式（实验室报告格式，Times 字体）",logo2:"右上角标志",labTitle:"信息上方标题",accr:"资质证书（加粗）",ndH:"试验方法标准（第3列）",fillF:"按样本填写字段",h:"报告版式",hint:"单位抬头、公章、签字及自定义字段。",org:"单位",name:"单位名称",details:"单位信息（地址、BIN、电话、资质…）",logo:"标志",stamp:"公章（建议透明背景 PNG）",pick:"选择文件",del:"移除",size:"公章尺寸，毫米",
  signH:"签字",testerPost:"试验员职务",headPost:"负责人职务",headName:"负责人姓名",stampOn:"在报告上加盖公章",fieldsH:"自定义字段",fieldsHint:"例如：委托单位、合同号。",fLabel:"字段名",fValue:"值",add:"＋ 添加字段",
  footer:"页脚文字",print:"打印",pdf:"PDF",big:"文件过大（最大 3 MB）。",testerD:"试验工程师",headD:"实验室负责人",stampAlt:"公章"}
};
function X(){var a=window.DorApp,l=a&&a.S&&a.S.lang||"ru",b=TX[l]||TX.ru,r={};for(var k in TX.ru)r[k]=TX.ru[k];for(k in b)r[k]=b[k];return r}
var BK="dorlab-brand-v1",B;
try{B=JSON.parse(localStorage.getItem(BK))}catch(e){B=null}
if(!B)B={tpl:"official",logo2:"",labTitle:"ИСПЫТАТЕЛЬНАЯ ЛАБОРАТОРИЯ",accr:"",nd:{},name:"",details:"",logo:"",stamp:"",stampMm:"38",stampOn:true,testerPost:"",headPost:"",headName:"",fields:[],footer:""};
if(B.tpl==null)B.tpl="official";if(B.labTitle==null)B.labTitle="ИСПЫТАТЕЛЬНАЯ ЛАБОРАТОРИЯ";if(!B.nd)B.nd={};if(B.logo2==null)B.logo2="";if(B.accr==null)B.accr="";
function bsave(){try{localStorage.setItem(BK,JSON.stringify(B))}catch(e){var m=$("br_msg");if(m)m.textContent=String(e&&e.name==="QuotaExceededError"?X().big:e)}}
function P(){var S=window.DorApp&&DorApp.S;if(!S)return{};S.p.xv=S.p.xv||{};return S.p.xv}
function refresh(){if(window.DorApp&&DorApp.proto)DorApp.proto();DorApp.save()}

/* ---- pieces placed into the report ---- */
function header(){if(!B.name&&!B.details&&!B.logo)return"";
 return'<div class="brh">'+(B.logo?'<img class="brlogo" src="'+B.logo+'" alt="">':'')+'<div class="brt">'+(B.name?'<b>'+esc(B.name)+'</b>':'')+(B.details?'<span>'+esc(B.details).replace(/\n/g,"<br>")+'</span>':'')+'</div></div>'}
function kv(){var xv=P();return B.fields.filter(function(f){return f&&xv[f]}).map(function(f){return'<span>'+esc(f)+'</span><span>'+esc(xv[f])+'</span>'}).join("")}
function sign(testerName,headTxt){var x=X(),mm=Math.max(15,Math.min(60,+String(B.stampMm).replace(",",".")||38));
 return'<div class="sign brsign"><div><span class="brpost">'+esc(B.testerPost||x.testerD)+'</span>'+esc(testerName)+'</div>'+
  '<div class="brhead"><span class="brpost">'+esc(B.headPost||x.headD)+'</span>'+(headTxt||esc(B.headName)||"________________")+
  (B.stamp&&B.stampOn?'<img class="brstamp" src="'+B.stamp+'" alt="'+esc(x.stampAlt)+'" style="width:'+mm+'mm;height:'+mm+'mm">':'')+'</div></div>'}
function footer(){return B.footer?'<div class="brfoot">'+esc(B.footer).replace(/\n/g,"<br>")+'</div>':""}

/* ---- official protocol (lab protocol layout, Russian, Times) ---- */
var OF_FIELDS=["Наименование и адрес заказчика","Наименование пробы","Место проведения испытания","Акт отбора проб","Регистрационный номер образцов","Дата поступления проб на испытание","Обозначение НД на метод отбора образцов","Изготовитель (страна, фирма)","Количество в пробе","Обозначение НД на продукцию","Дата начала испытания","Дата окончания испытания","Вид испытаний","Условия: температура","Условия: влажность","Температура приготовления образцов"];
var ND_DEF={ab:"СТ РК 1218",bit_pen:"ГОСТ 11501",bit_kish:"ГОСТ 11506",bit_duct:"ГОСТ 11505",gr:"СТ РК 1218",bc:"СТ РК 1218",dr:"СТ РК 2373",mx:"СТ РК 1225"};
function ndOf(k){return B.nd[k]!=null&&B.nd[k]!==""?B.nd[k]:(ND_DEF[k]||ND_DEF[String(k).split("_")[0]]||"")}
var MON=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
function ruDate(iso){var m=/^(\d{4})-(\d{2})-(\d{2})/.exec(iso||"");return m?"«"+m[3]+"» "+MON[+m[2]-1]+" "+m[1]+" г.":"«___» __________ 20__ г."}
function rc(v){return String(v==null?"":v).replace(/(\d)\.(\d)/g,"$1,$2")}
function isOff(){return B.tpl==="official"}
function has(v){return v!==""&&v!=null&&isFinite(+String(v).replace(",","."))}
function sieveCols(sv,pass,mn,mx){var n=[],a=[],b=[];sv.forEach(function(s,i){if(s==="pan")return;n.push(rc(s));var lo=mn[i],hi=mx[i];
  a.push(has(lo)&&has(hi)?rc(lo)+"-"+rc(hi):has(lo)?"не менее "+rc(lo):has(hi)?"не более "+rc(hi):"—");
  b.push(isFinite(pass[i])?rc((Math.round(pass[i]*10)/10).toFixed(1)):"—")});return[n,a,b]}
function officialHtml(){var A=window.DorApp,S=A.S,rows=A.rows("ru"),last=A.last,p=S.p,xv=P();
 var h='<div class="off">';
 h+='<table class="ofh"><tr><td class="ofl">'+(B.logo?'<img src="'+B.logo+'" alt="">':'')+'</td><td class="ofr">'+(B.logo2?'<img src="'+B.logo2+'" alt=""><br>':'')+
  (B.labTitle?'<b>'+esc(B.labTitle)+'</b><br>':'')+(B.name?esc(B.name)+'<br>':'')+(B.details?esc(B.details).replace(/\n/g,"<br>")+'<br>':'')+(B.accr?'<b>'+esc(B.accr).replace(/\n/g,"<br>")+'</b>':'')+'</td></tr></table>';
 h+='<p class="oft"><b>ПРОТОКОЛ ИСПЫТАНИЙ №'+esc(p.no||"")+'</b><br>от '+ruDate(p.date)+'</p>';
 var fl=(B.fields.length?B.fields:OF_FIELDS).filter(function(f){return f});
 h+='<table class="ofkv">'+fl.map(function(f){return'<tr><td>'+esc(f)+':</td><td>'+esc(xv[f]||"")+'</td></tr>'}).join("")+'</table><p class="ofres">Результаты испытаний</p>';
 h+='<table class="oftab"><thead><tr><th>№<br>п/п</th><th>Наименование показателей,<br>единица измерения</th><th>НД на методы испытаний</th><th>Норма по НД</th><th>Фактические результаты</th></tr><tr class="ofn"><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr></thead><tbody>';
 rows.forEach(function(r,i){var k=r[5],name=r[1],norm=rc(r[3]),val=rc(r[2]),q=null;
  if(k==="gr"&&last.gr&&last.gr.rows){var g=last.gr.rows;q=sieveCols(g.map(function(z){return z.s}),g.map(function(z){return z.pass}),S.gr.min,S.gr.max);name="Зерновой состав минеральной части смеси, %, размер зёрен, мм, мельче"}
  else if(k==="mx"&&last.mx&&last.mx.blend){q=sieveCols(S.mx.sieves,last.mx.blend,S.mx.min,S.mx.max);name="Зерновой состав по рецепту ("+esc(S.mx.title)+"), %, размер зёрен, мм, мельче"}
  if(q){var n=q[0].length;h+='<tr class="svh"><td class="c" rowspan="'+(n+1)+'">'+(i+1)+'.</td><td>'+name+'</td><td class="c" rowspan="'+(n+1)+'">'+esc(ndOf(k))+'</td><td></td><td></td></tr>'+
   q[0].map(function(z,j){return'<tr class="sv'+(j===n-1?' svl':'')+'"><td>'+z+'</td><td class="c">'+q[1][j]+'</td><td class="c">'+q[2][j]+'</td></tr>'}).join("");return}
  h+='<tr><td class="c">'+(i+1)+'.</td><td>'+name+'</td><td class="c">'+esc(ndOf(k))+'</td><td class="c">'+norm+'</td><td class="c">'+val+'</td></tr>'});
 h+='</tbody></table>';
 if(p.concl)h+='<p><b>Заключение:</b> '+esc(p.concl)+'</p>';
 if(p.notes)h+='<p>'+esc(p.notes).replace(/\n/g,"<br>")+'</p>';
 var mm=Math.max(15,Math.min(60,+String(B.stampMm).replace(",",".")||38));
 h+='<div class="ofsig"><p>Исполнители:</p><div class="ofs"><span>'+esc(B.testerPost||"инженер")+'</span><span>'+esc(p.who||"")+'</span></div>'+
  '<div class="ofs ofhd"><span>'+esc(B.headPost||"заведующий ИЛ")+'</span><span>'+esc(B.headName||"")+'</span>'+(B.stamp&&B.stampOn?'<img class="brstamp" src="'+B.stamp+'" alt="" style="width:'+mm+'mm;height:'+mm+'mm">':'')+'</div></div>';
 h+='<p class="offt">'+esc(B.footer||"Протокол распространяется только на образцы, подвергнутые испытаниям. Частичная перепечатка протокола без разрешения испытательной лаборатории запрещена.").replace(/\n/g,"<br>")+'</p></div>';
 return h}
function headText(i,n){var p=window.DorApp.S.p;return i===1?"Всего листов "+n+"     Лист 1 из "+n:"Продолжение протокола испытаний № "+(p.no||"")+" от "+ruDate(p.date)+"     лист "+i+" из "+n}
function txtImg(t){var c=document.createElement("canvas"),g=c.getContext("2d"),f='34px "Times New Roman",Times,serif';g.font=f;var w=Math.ceil(g.measureText(t).width)+4;c.width=w;c.height=44;g.font=f;g.fillStyle="#000";g.textBaseline="middle";g.fillText(t,2,22);return{u:c.toDataURL("image/png"),w:w,h:44}}
function pages(pdf){var n=pdf.internal.getNumberOfPages(),W=pdf.internal.pageSize.getWidth();for(var i=1;i<=n;i++){pdf.setPage(i);var im=txtImg(headText(i,n)),hmm=4.2,wmm=im.w/im.h*hmm;pdf.addImage(im.u,"PNG",W-15-wmm,9,wmm,hmm)}}
function printCss(){var p=window.DorApp.S.p,cont=("Продолжение протокола испытаний № "+(p.no||"")+" от "+ruDate(p.date)+"     лист ").replace(/["\\]/g,"");
 return'@page{size:A4;margin:20mm 15mm 18mm 20mm;@top-right{content:"'+cont+'" counter(page) " из " counter(pages);font:10pt "Times New Roman",serif}}@page:first{@top-right{content:"Всего листов " counter(pages) "     Лист 1 из " counter(pages)}}'}

/* ---- editor ---- */
function imgRow(key,label){var x=X();return'<div class="brimg"><span>'+esc(label)+'</span>'+(B[key]?'<img src="'+B[key]+'" alt="">':'')+
 '<label class="b sm">'+esc(x.pick)+'<input type="file" accept="image/*" data-img="'+key+'" hidden></label>'+(B[key]?'<button type="button" class="b sm" data-imgdel="'+key+'">'+esc(x.del)+'</button>':'')+'</div>'}
function ndKeys(){try{return window.DorApp.rows("ru",true).map(function(r){return[r[5],r[1]]})}catch(e){return[]}}
function editor(){var x=X(),xv=P();
 return'<details class="card brcard"'+(B.open?" open":"")+' id="br_det"><summary><h2 style="display:inline">'+esc(x.h)+'</h2></summary><p class="hint">'+esc(x.hint)+'</p>'+
  '<div class="fields"><label class="f wide">'+esc(x.tpl)+'<select id="br_tpl"><option value="official"'+(isOff()?" selected":"")+'>'+esc(x.tplO)+'</option><option value="simple"'+(isOff()?"":" selected")+'>'+esc(x.tplS)+'</option></select></label></div>'+
  '<h3>'+esc(x.org)+'</h3><div class="fields">'+(isOff()?'<label class="f wide">'+esc(x.labTitle)+'<input id="br_lt" value="'+esc(B.labTitle)+'"></label>':'')+'<label class="f wide">'+esc(x.name)+'<input id="br_name" value="'+esc(B.name)+'"></label>'+
  '<label class="f wide">'+esc(x.details)+'<textarea id="br_details" rows="3">'+esc(B.details)+'</textarea></label></div>'+
  (isOff()?'<div class="fields"><label class="f wide">'+esc(x.accr)+'<textarea id="br_accr" rows="2">'+esc(B.accr)+'</textarea></label></div>':'')+
  imgRow("logo",x.logo)+(isOff()?imgRow("logo2",x.logo2):'')+imgRow("stamp",x.stamp)+
  '<div class="fields"><label class="f">'+esc(x.size)+'<input id="br_mm" class="num" inputmode="decimal" value="'+esc(B.stampMm)+'"></label>'+
  '<label class="f brchk"><input type="checkbox" id="br_on"'+(B.stampOn?" checked":"")+'> '+esc(x.stampOn)+'</label></div>'+
  '<h3>'+esc(x.signH)+'</h3><div class="fields"><label class="f">'+esc(x.testerPost)+'<input id="br_tp" value="'+esc(B.testerPost)+'" placeholder="'+esc(x.testerD)+'"></label>'+
  '<label class="f">'+esc(x.headPost)+'<input id="br_hp" value="'+esc(B.headPost)+'" placeholder="'+esc(x.headD)+'"></label>'+
  '<label class="f">'+esc(x.headName)+'<input id="br_hn" value="'+esc(B.headName)+'"></label></div>'+
  '<h3>'+esc(x.fieldsH)+'</h3><p class="hint">'+esc(x.fieldsHint)+'</p><div class="brfields">'+B.fields.map(function(f,i){return'<div class="brf"><input data-fl="'+i+'" value="'+esc(f)+'" placeholder="'+esc(x.fLabel)+'" aria-label="'+esc(x.fLabel)+'"><input data-fv="'+i+'" value="'+esc(xv[f]||"")+'" placeholder="'+esc(x.fValue)+'" aria-label="'+esc(x.fValue)+'"><button type="button" class="b sm" data-fdel="'+i+'" aria-label="'+esc(x.del)+'">×</button></div>'}).join("")+'</div>'+
  '<div class="btns"><button type="button" class="b sm" id="br_add">'+esc(x.add)+'</button>'+(isOff()?'<button type="button" class="b sm" id="br_fill">'+esc(x.fillF)+'</button>':'')+'</div>'+
  (isOff()?'<h3>'+esc(x.ndH)+'</h3><div class="brnd">'+ndKeys().map(function(r){return'<label class="f">'+esc(r[1])+'<input data-nd="'+r[0]+'" value="'+esc(ndOf(r[0]))+'"></label>'}).join("")+'</div>':'')+
  '<div class="fields"><label class="f wide">'+esc(x.footer)+'<textarea id="br_foot" rows="2">'+esc(B.footer)+'</textarea></label></div>'+
  '<div class="btns"><button type="button" class="b primary" id="br_print">🖨 '+esc(x.print)+'</button>'+(window.html2pdf?'<button type="button" class="b" id="br_pdf">'+esc(x.pdf)+'</button>':'')+'</div><p class="hint" id="br_msg"></p></details>'}
function shrink(file,png,cb){if(file.size>3*1024*1024){cb(null,X().big);return}var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var M=700,w=im.width,h=im.height,k=Math.min(1,M/Math.max(w,h)),c=document.createElement("canvas");c.width=Math.round(w*k);c.height=Math.round(h*k);
  var g=c.getContext("2d");if(!png){g.fillStyle="#fff";g.fillRect(0,0,c.width,c.height)}g.drawImage(im,0,0,c.width,c.height);cb(png?c.toDataURL("image/png"):c.toDataURL("image/jpeg",0.9))};im.onerror=function(){cb(null,"?")};im.src=r.result};r.readAsDataURL(file)}
function rerender(){if(window.DorApp)DorApp.render()}
function wire(){var d=$("br_det");if(!d)return;
 d.ontoggle=function(){B.open=d.open;bsave()};
 [["br_lt","labTitle"],["br_accr","accr"],["br_name","name"],["br_details","details"],["br_mm","stampMm"],["br_tp","testerPost"],["br_hp","headPost"],["br_hn","headName"],["br_foot","footer"]].forEach(function(p){var e=$(p[0]);if(e)e.oninput=function(){B[p[1]]=e.value;bsave();refresh()}});
 var tp=$("br_tpl");if(tp)tp.onchange=function(){B.tpl=tp.value;if(isOff()&&!B.fields.length)B.fields=OF_FIELDS.slice();bsave();rerender()};
 var fl=$("br_fill");if(fl)fl.onclick=function(){OF_FIELDS.forEach(function(f){if(B.fields.indexOf(f)<0)B.fields.push(f)});bsave();rerender()};
 d.querySelectorAll("[data-nd]").forEach(function(e){e.oninput=function(){B.nd[e.dataset.nd]=e.value;bsave();refresh()}});
 var on=$("br_on");if(on)on.onchange=function(){B.stampOn=on.checked;bsave();refresh()};
 d.querySelectorAll("[data-img]").forEach(function(i){i.onchange=function(){var f=i.files&&i.files[0];if(!f)return;var k=i.dataset.img;shrink(f,true,function(u,err){if(!u){$("br_msg").textContent=err;return}B[k]=u;bsave();rerender()})}});
 d.querySelectorAll("[data-imgdel]").forEach(function(b){b.onclick=function(){B[b.dataset.imgdel]="";bsave();rerender()}});
 d.querySelectorAll("[data-fl]").forEach(function(e){e.onchange=function(){var i=+e.dataset.fl,old=B.fields[i],xv=P();B.fields[i]=e.value.trim();if(old&&xv[old]!=null&&!xv[B.fields[i]]){xv[B.fields[i]]=xv[old];delete xv[old]}bsave();refresh()}});
 d.querySelectorAll("[data-fv]").forEach(function(e){e.oninput=function(){var f=B.fields[+e.dataset.fv];if(!f)return;P()[f]=e.value;refresh()}});
 d.querySelectorAll("[data-fdel]").forEach(function(b){b.onclick=function(){B.fields.splice(+b.dataset.fdel,1);bsave();rerender()}});
 var a=$("br_add");if(a)a.onclick=function(){B.fields.push("");bsave();rerender();setTimeout(function(){var l=document.querySelectorAll("[data-fl]");if(l.length)l[l.length-1].focus()},0)};
 var pr=$("br_print");if(pr)pr.onclick=printNow;
 var pd=$("br_pdf");if(pd)pd.onclick=function(){var q=$("p_pdf");if(q)q.click()}}
function printNow(){if(window.DorApp&&DorApp.proto)DorApp.proto();var src=$("proto");if(!src)return;
 var css=[].map.call(document.querySelectorAll("style"),function(s){return s.textContent}).join("\n");
 var fr=document.createElement("iframe");fr.style.cssText="position:fixed;right:0;bottom:0;width:0;height:0;border:0";document.body.appendChild(fr);
 var w=fr.contentWindow,dd=w.document;dd.open();
 dd.write('<!doctype html><html><head><meta charset="utf-8"><title>'+esc(document.title)+'</title><style>'+css+'\n'+(isOff()?printCss():'@page{size:A4;margin:12mm}')+'html,body{background:#fff!important;margin:0}.pdfsheet{width:auto}</style></head><body><div class="pdfsheet">'+src.innerHTML+'</div></body></html>');dd.close();
 var go=function(){try{w.focus();w.print()}catch(e){}setTimeout(function(){fr.remove()},60000)};
 var imgs=dd.images,left=imgs.length;if(!left)setTimeout(go,150);else[].forEach.call(imgs,function(im){if(im.complete){if(--left===0)setTimeout(go,150)}else im.onload=im.onerror=function(){if(--left===0)setTimeout(go,150)}})}
var CSS=".brcard summary{cursor:pointer;list-style:revert}.brcard h3{margin:14px 0 6px}"+
".brimg{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:10px 0}.brimg>span{min-width:180px;font-size:14px;color:var(--muted)}.brimg img{max-height:56px;max-width:140px;background:#fff;border:1px solid var(--line);border-radius:6px;padding:2px}.brimg label.b{cursor:pointer}"+
".brchk{flex-direction:row!important;align-items:center;gap:8px}.brchk input{width:20px;height:20px;accent-color:var(--accent)}"+
".brfields{display:grid;gap:8px}.brf{display:grid;grid-template-columns:1fr 1.4fr auto;gap:8px}@media (max-width:520px){.brf{grid-template-columns:1fr auto}.brf input[data-fv]{grid-column:1}}"+
".brh{display:flex;gap:14px;align-items:center;border-bottom:1px solid var(--line);padding-bottom:8px}.brlogo{max-height:18mm;max-width:45mm;object-fit:contain}.brt{display:grid;gap:2px;font-size:11.5px;color:var(--muted)}.brt b{font-size:14px;color:var(--ink)}"+
".brsign>div{position:relative;display:grid;gap:2px;min-height:22mm}.brpost{font-size:11px;color:var(--muted)}.brhead .brstamp{position:absolute;right:4mm;top:-6mm;object-fit:contain;opacity:.92;mix-blend-mode:multiply;pointer-events:none}"+
".off{font-family:\"Times New Roman\",Times,serif;font-size:12pt;line-height:1.25;color:#000;background:#fff;padding:4mm;display:block}.off>*{margin:0 0 3mm}.off *{color:#000}.off table{width:100%;border-collapse:collapse}.off p{margin:0}.ofh td{vertical-align:top;padding:0}.ofl{width:38%;border-bottom:1px solid #000}.ofl img{max-width:60mm;max-height:30mm;object-fit:contain}.ofr{text-align:center;font-size:11.5pt}.ofr img{max-width:80mm;max-height:14mm;object-fit:contain}.oft{text-align:center;margin-top:2mm}.ofkv td{padding:0 2mm 0 0;vertical-align:top;font-size:11.5pt}.ofkv td:first-child{width:45%}.oftab th,.oftab td{border:1px solid #000;padding:1mm 1.5mm;vertical-align:top;font-size:11pt;font-weight:400}.oftab th{text-align:center}.oftab .ofn td{text-align:center;padding:0 1mm}.oftab td.c{text-align:center}.oftab tr{page-break-inside:avoid;break-inside:avoid}.ofsig{margin-top:6mm;page-break-inside:avoid;break-inside:avoid}.ofsig p{margin:0 0 2mm}.ofs{display:flex;justify-content:space-between;margin:0 0 6mm;position:relative}.ofhd .brstamp{position:absolute;left:42%;top:-14mm;object-fit:contain;opacity:.92;mix-blend-mode:multiply}.offt{text-align:center;font-weight:700;font-size:9pt;margin-top:8mm}.brnd{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px}.ofkv td,.ofkv tr{border:0!important;background:none!important}.oftab tr.svh td:not([rowspan]){border-bottom:0}.oftab tr.sv td{border-top:0;border-bottom:0;padding-top:0;padding-bottom:0}.oftab tr.svl td{border-bottom:1px solid #000;padding-bottom:1mm}.oftab tr.svh,.oftab tr.sv{break-inside:auto}"+
".brfoot{border-top:1px solid var(--line);padding-top:6px;font-size:11px;color:var(--muted);text-align:center}";
(function(){var s=document.createElement("style");s.id="brand_css";s.textContent=CSS;document.head.appendChild(s)})();
window.DorBrand={official:isOff,officialHtml:officialHtml,pages:pages,header:header,kv:kv,sign:sign,footer:footer,editor:editor,wire:wire,print:printNow};
})();
