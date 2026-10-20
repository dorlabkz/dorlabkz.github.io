/* DorLabKZ — наставник: аide sur les champs, programme d'essais, guidage pas à pas, minuteur, recette */
(function(){
"use strict";
function $(id){return document.getElementById(id)}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function num(v){if(v==null)return NaN;v=String(v).replace(/\s/g,"").replace(",",".").replace("−","-");return v===""?NaN:+v}
var LANG="ru";
function fmt(x,d){if(!isFinite(x))return"—";var s=x.toFixed(d);if(s.charAt(0)==="-")s="−"+s.slice(1);return LANG==="en"?s:s.replace(".",",")}
function dot(v){return String(v==null?"":v).replace(",",".").trim()}

/* ---------------- texts ---------------- */
var G={
 ru:{tab:"Наставник",h:"Наставник",hint:"Проведёт по испытанию шаг за шагом простыми словами, напомнит оборудование, засечёт время и сам всё посчитает. Всё сохраняется как черновик на этом устройстве.",
  start1:"Выбрать испытание",start1d:"Знаю, какое испытание нужно сделать",start2:"У меня материал",start2d:"Подскажет все испытания по СТ РК для этого материала",start3:"Создать рецепт",start3d:"Подбор долей материалов и битума, массы для завода",
  drafts:"Незаконченные",noDrafts:"Пока нет незаконченных испытаний.",resume:"Продолжить",del:"Удалить",delQ:"Точно удалить?",back:"Назад",home:"Наставник",
  pickTest:"Какое испытание делаем?",search:"Найти испытание…",pickMat:"Какой у вас материал?",purpose:"Для чего испытываем?",
  pDesign:"Подбор состава (рецепт)",pLot:"Контроль партии на заводе",pSite:"Контроль на объекте",
  prog:"Программа испытаний",progHint:"Что нужно сделать, чтобы материал соответствовал СТ РК. Нажмите на испытание, чтобы начать.",must:"обязательно",period:"периодически",
  doneOf:"готово",startT:"Начать",contT:"Продолжить",doneT:"Готово ✓",
  step:"Шаг",of:"из",eqH:"Подготовьте оборудование",eqHint:"Отметьте всё, что уже стоит перед вами.",prepH:"Подготовка",runH:"Выполнение",measH:"Проверьте все записи",measHint:"Здесь все числа, которые вы ввели по ходу. Можно исправить.",
  resH:"Результат по вашим числам",noCalc:"Автоматический расчёт для этого испытания пока не сделан — посчитайте по формуле ниже; пример расчёта есть в методике.",
  prev:"← Назад",next:"Сделано →",finish:"Закончить",showFig:"Показать схему",zoom:"Нажмите, чтобы увеличить",hideFig:"Скрыть схему",method:"Открыть методику",
  enter:"Запишите:",sample:"Образец",ex:"пример",timer:"Таймер",tStart:"Запустить",tStop:"Стоп",tLeft:"Осталось",tDone:"Время вышло!",tOk:"Понятно",
  tKeep:"Экран не погаснет, пока идёт таймер. Держите телефон рядом.",tNoWake:"Не блокируйте телефон: на заблокированном телефоне сайт не может звонить.",
  transfer:"Перенести в расчёт",transferD:"Числа попадут во вкладку расчёта — оттуда можно сохранить в журнал.",transferred:"Перенесено ✓",journal:"В журнал",journalD:"Черновик попадёт в журнал только если вы сами отправите его из вкладки расчёта.",
  next2:"Следующее испытание",allDone:"Все испытания программы выполнены.",keepDraft:"Черновик сохранён на этом устройстве.",
  helpOff:"Больше не показывать",helpOn:"Подсказки к полям: вкл.",helpOffS:"Подсказки к полям: выкл.",
  why:"Зачем",when:"Когда",param:"Исходные данные",
  rec:"Рецепт смеси",recHint:"Выберите тип смеси и проверьте зерновой состав ваших материалов (берётся из вкладки «Подбор состава»). Сайт подберёт доли так, чтобы кривая была ближе к середине границ.",
  mixT:"Тип смеси",auto:"Подобрать доли автоматически",bit:"Битум",bitMode:"Как считать битум",bitOver:"сверх 100 % минеральной части",bitMix:"% от массы смеси",bitNote:"Ориентир по типу смеси. Окончательно уточняется по испытаниям образцов (плотность, пористость, прочность).",
  plant:"Завод",plantT:"Тип завода",batchP:"Циклический (замесы)",contP:"Непрерывный",batch:"Масса замеса, кг",rate:"Производительность, т/ч",order:"Заказ, т",
  recRes:"Рецепт",mat:"Материал",share:"Доля, %",perBatch:"на замес, кг",perHour:"т/ч",perOrder:"на заказ, т",total:"Итого",curve:"Кривая подобрана: все сита в границах",curveBad:"Сит вне границ:",
  apply:"Записать доли во вкладку «Подбор состава»",applied:"Записано ✓",fracName:"Материал",
  mats:{hot:"Горячий асфальтобетон (типы А, Б, В, Г, Д)",sma:"ЩМА (щебёночно-мастичный)",bitum:"Битум дорожный (БНД, ПБВ)",crushed:"Щебень / гравий",sand:"Песок",powder:"Минеральный порошок",soil:"Грунт земляного полотна",conc:"Цементобетон"}},
 fr:{tab:"Accompagnement",h:"Accompagnement",hint:"Te guide dans l'essai étape par étape avec des mots simples, rappelle le matériel, chronomètre et fait tous les calculs. Tout est gardé en brouillon sur cet appareil.",
  start1:"Choisir un essai",start1d:"Je sais quel essai je dois faire",start2:"J'ai un matériau",start2d:"Donne tous les essais du СТ РК pour ce matériau",start3:"Créer une recette",start3d:"Pourcentages des matériaux et du bitume, poids pour la centrale",
  drafts:"En cours",noDrafts:"Aucun essai en cours.",resume:"Reprendre",del:"Supprimer",delQ:"Vraiment supprimer ?",back:"Retour",home:"Accompagnement",
  pickTest:"Quel essai fait-on ?",search:"Chercher un essai…",pickMat:"Quel matériau as-tu ?",purpose:"Pour quoi teste-t-on ?",
  pDesign:"Formulation (recette)",pLot:"Contrôle d'un lot à la centrale",pSite:"Contrôle sur chantier",
  prog:"Programme d'essais",progHint:"Ce qu'il faut faire pour que le matériau respecte le СТ РК. Clique sur un essai pour commencer.",must:"obligatoire",period:"périodique",
  doneOf:"faits",startT:"Commencer",contT:"Continuer",doneT:"Fait ✓",
  step:"Étape",of:"sur",eqH:"Prépare le matériel",eqHint:"Coche ce que tu as déjà devant toi.",prepH:"Préparation",runH:"Exécution",measH:"Vérifie toutes les valeurs",measHint:"Tous les chiffres saisis au fur et à mesure. Tu peux corriger.",
  resH:"Résultat avec tes chiffres",noCalc:"Le calcul automatique de cet essai n'est pas encore fait — calcule avec la formule ci-dessous ; un exemple est dans la méthode.",
  prev:"← Retour",next:"C'est fait →",finish:"Terminer",showFig:"Voir le schéma",zoom:"Touche pour agrandir",hideFig:"Cacher le schéma",method:"Ouvrir la méthode",
  enter:"Note :",sample:"Éprouvette",ex:"exemple",timer:"Minuteur",tStart:"Lancer",tStop:"Arrêter",tLeft:"Reste",tDone:"C'est l'heure !",tOk:"OK",
  tKeep:"L'écran reste allumé tant que le minuteur tourne. Garde le téléphone à côté.",tNoWake:"Ne verrouille pas le téléphone : verrouillé, le site ne peut pas sonner.",
  transfer:"Envoyer dans le calcul",transferD:"Les chiffres vont dans l'onglet de calcul — de là, tu peux enregistrer au journal.",transferred:"Envoyé ✓",journal:"Au journal",journalD:"Le brouillon ne va au journal que si tu l'envoies toi-même depuis l'onglet de calcul.",
  next2:"Essai suivant",allDone:"Tous les essais du programme sont faits.",keepDraft:"Brouillon gardé sur cet appareil.",
  helpOff:"Ne plus afficher",helpOn:"Aide sur les cases : activée",helpOffS:"Aide sur les cases : désactivée",
  why:"Pourquoi",when:"Quand",param:"Données de départ",
  rec:"Recette de l'enrobé",recHint:"Choisis le type de mélange et vérifie la granulométrie de tes matériaux (reprise de l'onglet « Formulation »). Le site calcule les pourcentages pour que la courbe soit au plus près du milieu du fuseau.",
  mixT:"Type de mélange",auto:"Calculer les pourcentages",bit:"Bitume",bitMode:"Comment compter le bitume",bitOver:"en plus de 100 % de minéraux",bitMix:"% de la masse de l'enrobé",bitNote:"Valeur de départ selon le type. À confirmer par les essais sur éprouvettes (densité, vides, résistance).",
  plant:"Centrale",plantT:"Type de centrale",batchP:"Discontinue (gâchées)",contP:"Continue",batch:"Gâchée, kg",rate:"Débit, t/h",order:"Commande, t",
  recRes:"Recette",mat:"Matériau",share:"Part, %",perBatch:"par gâchée, kg",perHour:"t/h",perOrder:"commande, t",total:"Total",curve:"Courbe dans le fuseau sur tous les tamis",curveBad:"Tamis hors fuseau :",
  apply:"Écrire les parts dans l'onglet « Formulation »",applied:"Écrit ✓",fracName:"Matériau",
  mats:{hot:"Enrobé à chaud (types А, Б, В, Г, Д)",sma:"SMA (ЩМА)",bitum:"Bitume routier (БНД, ПБВ)",crushed:"Gravillons / gravier",sand:"Sable",powder:"Filler (poudre minérale)",soil:"Sol de plateforme",conc:"Béton de ciment"}},
 en:{tab:"Guided mode",h:"Guided mode",hint:"Walks you through a test step by step in plain words, reminds you of the equipment, times the waits and does all the maths. Everything is kept as a draft on this device.",
  start1:"Pick a test",start1d:"I know which test to do",start2:"I have a material",start2d:"Lists every СТ РК test for this material",start3:"Create a recipe",start3d:"Material and bitumen shares, weights for the plant",
  drafts:"In progress",noDrafts:"No tests in progress.",resume:"Resume",del:"Delete",delQ:"Delete for sure?",back:"Back",home:"Guided mode",
  pickTest:"Which test?",search:"Find a test…",pickMat:"Which material do you have?",purpose:"What is the test for?",
  pDesign:"Mix design (recipe)",pLot:"Lot control at the plant",pSite:"Site control",
  prog:"Test programme",progHint:"What to do so the material meets СТ РК. Tap a test to start.",must:"required",period:"periodic",
  doneOf:"done",startT:"Start",contT:"Continue",doneT:"Done ✓",
  step:"Step",of:"of",eqH:"Get the equipment ready",eqHint:"Tick what is already in front of you.",prepH:"Preparation",runH:"Procedure",measH:"Check all readings",measHint:"Every number you entered along the way. You can correct them.",
  resH:"Result with your numbers",noCalc:"Automatic calculation for this test is not built yet — use the formula below; a worked example is in the method.",
  prev:"← Back",next:"Done →",finish:"Finish",showFig:"Show diagram",zoom:"Tap to enlarge",hideFig:"Hide diagram",method:"Open the method",
  enter:"Record:",sample:"Specimen",ex:"example",timer:"Timer",tStart:"Start",tStop:"Stop",tLeft:"Left",tDone:"Time is up!",tOk:"OK",
  tKeep:"The screen stays on while the timer runs. Keep the phone nearby.",tNoWake:"Don't lock the phone: a locked phone can't ring from a website.",
  transfer:"Send to calculation",transferD:"The numbers go to the calculation tab — save to the log from there.",transferred:"Sent ✓",journal:"To the log",journalD:"The draft only goes to the log if you send it yourself from the calculation tab.",
  next2:"Next test",allDone:"Every test in the programme is done.",keepDraft:"Draft kept on this device.",
  helpOff:"Don't show again",helpOn:"Field help: on",helpOffS:"Field help: off",
  why:"Why",when:"When",param:"Input data",
  rec:"Mix recipe",recHint:"Pick the mix type and check your materials' gradings (taken from the Mix design tab). The site finds the shares that put the curve closest to the middle of the envelope.",
  mixT:"Mix type",auto:"Find the shares",bit:"Bitumen",bitMode:"How bitumen is counted",bitOver:"over 100 % mineral",bitMix:"% of mix mass",bitNote:"Starting value by mix type. Confirm with specimen tests (density, voids, strength).",
  plant:"Plant",plantT:"Plant type",batchP:"Batch plant",contP:"Continuous plant",batch:"Batch size, kg",rate:"Output, t/h",order:"Order, t",
  recRes:"Recipe",mat:"Material",share:"Share, %",perBatch:"per batch, kg",perHour:"t/h",perOrder:"order, t",total:"Total",curve:"Curve inside the envelope on every sieve",curveBad:"Sieves outside:",
  apply:"Write the shares to the Mix design tab",applied:"Written ✓",fracName:"Material",
  mats:{hot:"Hot-mix asphalt (types А, Б, В, Г, Д)",sma:"SMA (ЩМА)",bitum:"Road bitumen (БНД, ПБВ)",crushed:"Crushed stone / gravel",sand:"Sand",powder:"Mineral filler",soil:"Subgrade soil",conc:"Cement concrete"}},
 kk:{tab:"Тәлімгер",h:"Тәлімгер",hint:"Сынақты қадам бойынша жүргізеді. Мәтіндер әзірге орыс тілінде."},
 zh:{tab:"向导",h:"向导",hint:"逐步指导完成试验。正文暂为俄文。"}
};
function L(){var b=G[LANG]||G.ru,r={};for(var k in G.ru)r[k]=G.ru[k];for(k in b)r[k]=b[k];return r}

/* ---------------- field help ---------------- */
function H3(ru,fr,en,test){return{ru:ru,fr:fr,en:en,t:test}}
var HELP={
 ab_type:H3("Тип смеси по рецепту (А, Б, В…, ЩМА). От него зависят требования в таблице результатов.","Type de mélange de la recette (А, Б, В…, SMA). Il fixe les exigences du tableau de résultats.","Mix type from the recipe (А, Б, В…, SMA). It sets the requirements in the results table."),
 ab_rw:H3("Плотность воды при температуре взвешивания. При 20 °C ставьте 1,000. Измерьте термометром температуру воды.","Masse volumique de l'eau à la température de pesée. À 20 °C mets 1,000. Mesure la température de l'eau au thermomètre.","Water density at the weighing temperature. At 20 °C enter 1.000. Check the water temperature with a thermometer."),
 ab_rho:H3("Истинная плотность смеси (без пор). Берётся из испытания «Истинная плотность» или расчётом по составу.","Masse volumique réelle du mélange (sans vides). Vient de l'essai « Masse volumique réelle » ou du calcul par la composition.","True density of the mix (no voids). From the true density test or calculated from the recipe.","a_true"),
 ab_rhom:H3("Истинная плотность минеральной части (щебень + песок + порошок). Нужна для пористости минеральной части.","Masse volumique réelle de la partie minérale. Sert pour les vides du squelette minéral.","True density of the mineral part. Used for voids in the mineral aggregate.","a_true"),
 ab_q:H3("Сколько битума добавлено сверх 100 % минеральной части — по рецепту или по выжиганию.","Bitume ajouté en plus de 100 % de minéraux — selon la recette ou l'essai de teneur en liant.","Bitumen added over 100 % mineral — from the recipe or the binder content test.","a_bind"),
 ab_d:H3("Диаметр образца: измерьте штангенциркулем в двух местах и возьмите среднее (обычно 71,4 мм; 50,5 или 101 мм для мелких/крупных смесей).","Diamètre de l'éprouvette : mesure au pied à coulisse à deux endroits, prends la moyenne (souvent 71,4 mm ; 50,5 ou 101 mm).","Specimen diameter: measure with calipers in two places and average (usually 71.4 mm; 50.5 or 101 mm).","a_form"),
 abw0:H3("m — масса сухого образца, взвешенного на воздухе. Это первое взвешивание.","m — masse de l'éprouvette sèche pesée à l'air. C'est la première pesée.","m — dry specimen weighed in air. This is the first weighing.","a_dens"),
 abw1:H3("m₁ — масса после 30 минут в воде: достаньте, промокните влажной тканью и сразу взвесьте на воздухе.","m₁ — masse après 30 min dans l'eau : sortir, essuyer au chiffon humide et peser aussitôt à l'air.","m₁ — after 30 min in water: take out, blot with a damp cloth and weigh in air at once.","a_dens"),
 abw2:H3("m₂ — масса образца в воде, в корзинке гидростатических весов (корзинка не касается стенок).","m₂ — masse de l'éprouvette dans l'eau, dans le panier de la balance hydrostatique.","m₂ — specimen weighed in water, in the hydrostatic balance basket.","a_dens"),
 abw3:H3("m₃ — масса после водонасыщения под вакуумом, промокнуть и взвесить на воздухе.","m₃ — masse après saturation sous vide, essuyer et peser à l'air.","m₃ — after vacuum saturation, blot and weigh in air.","a_wsat"),
 abp0:H3("Разрушающая нагрузка при 50 °C — образец выдержан в воде при 50 °C, затем сразу под пресс.","Charge de rupture à 50 °C — éprouvette conditionnée dans l'eau à 50 °C puis aussitôt sous presse.","Failure load at 50 °C — specimen conditioned in water at 50 °C, then straight into the press.","a_comp"),
 abp1:H3("Разрушающая нагрузка при 20 °C (сухие образцы после термостатирования).","Charge de rupture à 20 °C (éprouvettes sèches conditionnées).","Failure load at 20 °C (dry, conditioned specimens).","a_comp"),
 abp2:H3("Разрушающая нагрузка при 0 °C (образцы выдержаны в воде со льдом).","Charge de rupture à 0 °C (éprouvettes dans l'eau glacée).","Failure load at 0 °C (specimens in ice water).","a_comp"),
 abp3:H3("Нагрузка при 20 °C для образцов после водонасыщения — нужна для коэффициента водостойкости.","Charge à 20 °C des éprouvettes saturées — sert au coefficient de résistance à l'eau.","Load at 20 °C for saturated specimens — gives the water resistance coefficient.","a_wres"),
 bit_grade:H3("Марка битума из паспорта поставщика. По ней берутся требования.","Grade du bitume (certificat du fournisseur). Il fixe les exigences.","Bitumen grade from the supplier certificate. It sets the requirements."),
 bitpen:H3("Глубина погружения иглы при 25 °C, в десятых долях мм. Три замера в разных точках одного образца.","Enfoncement de l'aiguille à 25 °C, en 1/10 mm. Trois mesures à des endroits différents.","Needle penetration at 25 °C, in 0.1 mm. Three readings at different points.","b_pen"),
 bitkish:H3("Температура, при которой шарик коснулся нижней пластины — отдельно для каждого кольца.","Température à laquelle la bille touche la plaque du bas — pour chaque anneau.","Temperature when the ball touches the bottom plate — for each ring.","b_rb"),
 bitduct:H3("Длина нити битума в момент разрыва, см — для каждого из трёх образцов.","Longueur du fil de bitume à la rupture, cm — pour chacune des trois éprouvettes.","Thread length at break, cm — for each of the three specimens.","b_duct"),
 gr_total:H3("Масса всей пробы минеральной части, которую просеиваете (после выжигания или экстрагирования).","Masse totale de la prise d'essai minérale tamisée (après extraction du liant).","Total mass of the mineral sample you sieve (after binder removal).","a_grad"),
 grr:H3("Частный остаток — сколько осталось на этом сите. Взвесьте содержимое каждого сита отдельно.","Refus partiel — ce qui reste sur ce tamis. Pèse le contenu de chaque tamis séparément.","Partial residue — what stays on this sieve. Weigh each sieve's content separately.","a_grad"),
 grmin:H3("Нижняя граница прохода по норме для вашего типа смеси. Уже заполнено — сверьте со своей редакцией СТ РК.","Limite basse du passant pour ton type de mélange. Déjà rempli — vérifie dans ton СТ РК.","Lower passing limit for your mix type. Pre-filled — check against your СТ РК.","a_grad"),
 grmax:H3("Верхняя граница прохода по норме.","Limite haute du passant.","Upper passing limit.","a_grad"),
 bc_m0:H3("Масса пробы смеси до выжигания (или экстрагирования), г.","Masse de l'enrobé avant calcination (ou extraction), g.","Mix sample mass before burning (or extraction), g.","a_bind"),
 bc_m1:H3("Масса минеральной части после выжигания и охлаждения, г.","Masse minérale après calcination et refroidissement, g.","Mineral mass after burning and cooling, g.","a_bind"),
 bc_target:H3("Содержание битума по рецепту — с чем сравниваем.","Teneur en bitume de la recette — la valeur de référence.","Bitumen content in the recipe — the reference value."),
 bc_tol:H3("Допустимое отклонение от рецепта, например 0,3 %.","Écart admis par rapport à la recette, ex. 0,3 %.","Allowed deviation from the recipe, e.g. 0.3 %."),
 dr_m:H3("Масса пробы ЩМА, положенной в корзинку, г.","Masse de SMA mise dans le panier, g.","SMA mass placed in the basket, g.","a_drain"),
 dr_m1:H3("Масса пустого стакана (поддона) до испытания, г.","Masse du récipient vide avant l'essai, g.","Empty container mass before the test, g.","a_drain"),
 dr_m2:H3("Масса стакана со стёкшим битумом после испытания, г.","Masse du récipient avec le liant égoutté, g.","Container mass with drained binder, g.","a_drain"),
 dr_max:H3("Предельное стекание по норме (обычно не более 0,20 %).","Égouttage maximal admis (souvent 0,20 %).","Maximum allowed drainage (often 0.20 %)."),
 mxn:H3("Название материала (фракция): например 5-10 мм, 0-5 мм, МП.","Nom du matériau (fraction) : ex. 5-10 mm, 0-5 mm, filler.","Material (fraction) name: e.g. 5-10 mm, 0-5 mm, filler."),
 mxp:H3("Доля этого материала в смеси, %. Сумма всех долей = 100. Можно подобрать автоматически в «Наставнике → Создать рецепт».","Part de ce matériau, %. Total = 100. Calcul automatique dans « Accompagnement → Créer une recette ».","Share of this material, %. Total = 100. Automatic in Guided mode → Create a recipe."),
 mxv:H3("Полный проход этого материала через сито, % — из рассева материала (зерновой состав щебня или песка).","Passant de ce matériau à ce tamis, % — selon l'analyse granulométrique du matériau.","This material's passing at this sieve, % — from its sieve analysis.","g_sieve"),
 mxmin:H3("Нижняя граница прохода смеси по норме.","Limite basse du fuseau.","Lower envelope limit."),
 mxmax:H3("Верхняя граница прохода смеси по норме.","Limite haute du fuseau.","Upper envelope limit.")
};
function helpKey(id){if(!id)return null;if(HELP[id])return id;var m;
 if((m=/^abw\d(\d)$/.exec(id)))return"abw"+m[1];if((m=/^abp\d(\d)$/.exec(id)))return"abp"+m[1];
 if((m=/^bit(pen|kish|duct)\d$/.exec(id)))return"bit"+m[1];if((m=/^(grr|grmin|grmax)\d+$/.exec(id)))return m[1];
 if((m=/^(mxn|mxp|mxmin|mxmax)\d+$/.exec(id)))return m[1];if(/^mxv\d+_\d+$/.test(id))return"mxv";return null}
var HELPON=true;try{HELPON=localStorage.getItem("dorlab-help")!=="off"}catch(e){}
var bub=null,bubT=null;
function hideBub(){if(bub){bub.remove();bub=null}}
function showBub(inp,key){hideBub();var h=HELP[key],l=L(),txt=h[LANG]||h.ru;
 var lab=inp.closest("label");var title=lab?(lab.childNodes[0]&&lab.childNodes[0].textContent||"").trim():"";
 if(!title){var td=inp.closest("td"),tr=inp.closest("tr"),tb=inp.closest("table");if(td&&tb){var i=Array.prototype.indexOf.call(tr.children,td),th=tb.querySelectorAll("thead th")[i];title=th?th.textContent:""}}
 bub=document.createElement("div");bub.className="g-bub";bub.setAttribute("role","note");
 bub.innerHTML=(title?'<b>'+esc(title)+'</b>':'')+'<p>'+esc(txt)+'</p><div class="g-bub-b">'+(h.t&&window.DorLib?'<button type="button" class="b sm" data-gm="'+h.t+'">'+esc(l.method)+'</button>':'')+'<button type="button" class="link" data-goff="1">'+esc(l.helpOff)+'</button></div>';
 document.body.appendChild(bub);var r=inp.getBoundingClientRect(),w=Math.min(320,window.innerWidth-24);bub.style.width=w+"px";
 var x=Math.max(12,Math.min(r.left+window.scrollX,window.scrollX+window.innerWidth-w-12));bub.style.left=x+"px";bub.style.top=(r.bottom+window.scrollY+6)+"px";
 bub.addEventListener("mousedown",function(e){e.preventDefault()});
 bub.onclick=function(e){var b=e.target.closest("button");if(!b)return;if(b.dataset.gm){hideBub();DorLib.popup(b.dataset.gm,LANG)}else if(b.dataset.goff){HELPON=false;try{localStorage.setItem("dorlab-help","off")}catch(_){}hideBub()}}}
function attach(root,lang){if(!root)return;LANG=lang||"ru";css();
 if(root._gh)return;root._gh=1;
 root.addEventListener("focusin",function(e){var t=e.target;if(!HELPON||!t||!t.id)return;var k=helpKey(t.id);if(!k)return;clearTimeout(bubT);showBub(t,k)});
 root.addEventListener("focusout",function(){clearTimeout(bubT);bubT=setTimeout(hideBub,150)});
 window.addEventListener("scroll",function(){if(bub&&document.activeElement){var k=helpKey(document.activeElement.id);if(!k)hideBub()}},{passive:true})}

/* ---------------- material programmes ---------------- */
var MAT=["hot","sma","bitum","crushed","sand","powder","soil","conc"];
var PROG={
 hot:{design:["b_pen","b_rb","b_duct","b_adh","g_sieve","g_crush","s_sieve","p_grain","a_form","a_dens","a_true","a_por","a_wsat","a_comp","a_wres","a_shear","a_split"],
      lot:["a_sample","a_form","a_dens","a_true","a_por","a_wsat","a_comp","a_wres","a_bind","a_grad"],
      site:["a_sample","f_core","a_dens","a_wsat","f_ruler"]},
 sma:{design:["b_pen","b_rb","b_duct","b_adh","g_sieve","g_crush","g_flaky","s_sieve","p_grain","a_form","a_dens","a_true","a_por","a_wsat","a_comp","a_wres","a_drain","a_shear","a_rut"],
      lot:["a_sample","a_form","a_dens","a_true","a_por","a_wsat","a_comp","a_wres","a_bind","a_grad","a_drain"],
      site:["a_sample","f_core","a_dens","a_wsat","f_ruler"]},
 bitum:["b_sample","b_pen","b_rb","b_duct","b_pi","b_fraass","b_rtfot","b_flash","b_adh","b_elast"],
 crushed:["g_sample","g_sieve","g_wash","g_flaky","g_bulk","g_crush","g_la","g_dens","g_frost"],
 sand:["s_sieve","s_wash","s_se","g_bulk"],
 powder:["p_grain","p_por","p_swell","p_bitcap"],
 soil:["so_grad","so_atter","so_proctor","so_moist","so_ring","so_kcomp","f_plate"],
 conc:["c_slump","c_cube","c_beam"]};
var PERIODIC={a_shear:1,a_split:1,a_swell:1,a_rut:1,b_fraass:1,b_rtfot:1,b_flash:1,g_crush:1,g_la:1,g_dens:1,g_frost:1,p_por:1,p_swell:1,p_bitcap:1};

/* ---------------- calculations with the user's numbers ---------------- */
/* g(r,c) = number in row r, column c of the readings table (same shape as the method's example table) */
function avg(a){a=a.filter(isFinite);return a.length?a.reduce(function(s,x){return s+x},0)/a.length:NaN}
function col(g,c){var a=[];for(var r=0;r<g.R;r++)a.push(g(r,c));return a}
function rowv(g,r){var a=[];for(var c=1;c<g.C;c++)a.push(g(r,c));return a}
var CALC={
 a_dens:function(g,p){var rw=num(p.rw)||1,o=[],v=[];for(var r=0;r<g.R;r++){var x=g(r,1)*rw/(g(r,3)-g(r,2));v.push(x);o.push(["№"+(r+1),"ρm = "+fmt(x,3)+" g/cm³"])}
  var s=Math.max.apply(null,v.filter(isFinite))-Math.min.apply(null,v.filter(isFinite));o.push(["Ø","ρm = "+fmt(avg(v),2)+" g/cm³",1]);if(isFinite(s))o.push(["Δ",fmt(s,3)+(s<=0.02?" ≤ 0,02 ✓":" > 0,02 ✕")]);return o},
 a_wsat:function(g){var o=[],v=[];for(var r=0;r<g.R;r++){var x=(g(r,4)-g(r,1))/(g(r,2)-g(r,3))*100;v.push(x);o.push(["№"+(r+1),"W = "+fmt(x,2)+" %"])}o.push(["Ø","W = "+fmt(avg(v),1)+" %",1]);return o},
 a_swell:function(g){var o=[],v=[];for(var r=0;r<g.R;r++){var v0=g(r,1)-g(r,2),x=((g(r,3)-g(r,4))-v0)/v0*100;v.push(x);o.push(["№"+(r+1),"Н = "+fmt(x,2)+" %"])}o.push(["Ø","Н = "+fmt(avg(v),1)+" %",1]);return o},
 a_comp:function(g,p){var d=num(p.d)/10,F=Math.PI*d*d/4,o=[["F","π·"+fmt(d,2)+"²/4 = "+fmt(F,2)+" cm²"]];for(var r=0;r<g.R;r++){var R=rowv(g,r).map(function(P){return P*1000/F/100});o.push([String(g.lab(r)),R.map(function(x){return fmt(x,2)}).join(" · ")+" → R = "+fmt(avg(R),1)+" MPa",1])}return o},
 a_wres:function(g,p){var d=num(p.d)/10,F=Math.PI*d*d/4,R=[];for(var r=0;r<g.R;r++)R.push(avg(rowv(g,r).map(function(P){return P*1000/F/100})));
  return[["R20",fmt(R[0],2)+" MPa"],["Rw",fmt(R[1],2)+" MPa"],["R15",fmt(R[2],2)+" MPa"],["Kw","Rw / R20 = "+fmt(R[1]/R[0],2),1],["Kw.дл","R15 / R20 = "+fmt(R[2]/R[0],2),1]]},
 a_split:function(g){var o=[],v=[];for(var r=0;r<g.R;r++){var x=g(r,1)*1000/(g(r,2)*g(r,3))/100;v.push(x);o.push(["№"+(r+1),"Rp = "+fmt(x,2)+" MPa"])}o.push(["Ø","Rp = "+fmt(avg(v),1)+" MPa",1]);return o},
 a_bind:function(g){var o=[],a=[],b=[];for(var r=0;r<g.R;r++){var q=(g(r,1)-g(r,2))/g(r,2)*100,m=(g(r,1)-g(r,2))/g(r,1)*100;a.push(q);b.push(m);o.push(["№"+(r+1),"Б = "+fmt(q,2)+" % · Бсм = "+fmt(m,2)+" %"])}
  o.push(["Ø","Б = "+fmt(avg(a),2)+" % · Бсм = "+fmt(avg(b),2)+" %",1]);return o},
 a_marsh:function(g){var S=[],F=[];for(var r=0;r<g.R;r++){S.push(g(r,2)*g(r,3));F.push(g(r,4))}var s=avg(S),f=avg(F);return[["S'",S.map(function(x){return fmt(x,2)}).join(" · ")],["S","= "+fmt(s,1)+" kN",1],["F","= "+fmt(f,1)+" mm",1],["MQ","= "+fmt(s/f,2)+" kN/mm",1]]},
 a_drain:function(g){var x=(g(2,1)-g(0,1))/g(1,1)*100;return[["Д","("+fmt(g(2,1),2)+" − "+fmt(g(0,1),2)+") / "+fmt(g(1,1),1)+" · 100 = "+fmt(x,2)+" %",1]]},
 b_pen:function(g){var o=[];for(var r=0;r<g.R;r++){var v=rowv(g,r).filter(isFinite);if(!v.length)continue;o.push([String(g.lab(r)),"П = "+fmt(avg(v),0)+" · Δ = "+fmt(Math.max.apply(null,v)-Math.min.apply(null,v),0),1])}return o},
 b_rb:function(g){var v=col(g,1).filter(isFinite);return[["T","= "+fmt(avg(v),1)+" °C",1],["Δ",fmt(Math.max.apply(null,v)-Math.min.apply(null,v),1)+" °C"+(Math.max.apply(null,v)-Math.min.apply(null,v)<=1?" ≤ 1 ✓":" > 1 ✕")]]},
 b_duct:function(g){var o=[];for(var r=0;r<g.R;r++){var v=rowv(g,r).filter(isFinite);if(v.length)o.push([String(g.lab(r)),"D = "+fmt(avg(v),1)+" cm",1])}return o},
 b_elast:function(g){var v=col(g,1).map(function(x){return(20-x)/20*100});return[["Э",v.map(function(x){return fmt(x,0)}).join(" · ")+" → "+fmt(avg(v),0)+" %",1]]},
 b_adh:function(g){return[["S",fmt(g(0,1)/g(0,0)*100,0)+" %",1]]},
 g_wash:function(g){return[["Пот",fmt((g(0,1)-g(1,1))/g(0,1)*100,2)+" %",1]]},
 s_wash:function(g){return[["Пот",fmt((g(0,1)-g(1,1))/g(0,1)*100,2)+" %",1]]},
 g_flaky:function(g){return[["Л",fmt(g(1,1)/g(0,1)*100,1)+" %",1]]},
 g_la:function(g){return[["LA",fmt((g(0,1)-g(1,1))/g(0,1)*100,1)+" %",1]]},
 g_crush:function(g){var v=[];for(var r=0;r<g.R;r++)v.push((g(r,1)-g(r,2))/g(r,1)*100);return[["Др",v.map(function(x){return fmt(x,1)}).join(" · ")+" → "+fmt(avg(v),1)+" %",1]]},
 g_bulk:function(g){var v=[];for(var r=0;r<g.R;r++)v.push((g(r,2)-g(r,1))/g(r,3)*1000);return[["ρн",v.map(function(x){return fmt(x,0)}).join(" · ")+" → "+fmt(avg(v),0)+" kg/m³",1]]},
 s_se:function(g){var v=[];for(var r=0;r<g.R;r++)v.push(g(r,2)/g(r,1)*100);return[["SE",v.map(function(x){return fmt(x,1)}).join(" · ")+" → "+fmt(avg(v),0),1]]},
 so_moist:function(g){var v=[];for(var r=0;r<g.R;r++)v.push((g(r,2)-g(r,3))/(g(r,3)-g(r,1))*100);return[["W",v.map(function(x){return fmt(x,2)}).join(" · ")+" → "+fmt(avg(v),1)+" %",1]]},
 so_kcomp:function(g){var o=[];for(var r=0;r<g.R;r++){var k=g(r,1)/g(r,2);o.push(["№"+(r+1),"Ky = "+fmt(k,2)+(k>=0.95?" ✓":" ✕ (< 0,95)")])}return o},
 c_cube:function(g,p){var a=num(p.alpha)||1,v=[];for(var r=0;r<g.R;r++)v.push(a*g(r,1)*1000/(g(r,2)*g(r,2)));return[["R",v.map(function(x){return fmt(x,1)}).join(" · ")+" → "+fmt(avg(v),1)+" MPa",1]]},
 c_slump:function(g){return[["ОК",fmt(Math.round(avg(col(g,1))),0)+" cm",1]]},
 f_core:function(g,p){var rl=num(p.rlab),hp=num(p.hpr),o=[];for(var r=0;r<g.R;r++){var k=g(r,1)/rl;o.push(["№"+(r+1),"Ky = "+fmt(k,2)+" · Δh = "+fmt(g(r,2)-hp,0)+" mm"])}return o}
};
var PARAMS={a_dens:[["rw","ρw, g/cm³","1.00"]],a_comp:[["d","d, mm","71.4"]],a_wres:[["d","d, mm","71.4"]],c_cube:[["alpha","α","0.95"]],f_core:[["rlab","ρm.lab, g/cm³","2.36"],["hpr","h proj., mm","50"]]};
/* send to calculation tabs */
var XFER={
 a_dens:["ab",function(S,g,p){for(var r=0;r<Math.min(3,g.R);r++){S.ab.w[r][0]=g.s(r,1);S.ab.w[r][2]=g.s(r,2);S.ab.w[r][1]=g.s(r,3)}if(p.rw)S.ab.rw=dot(p.rw);S.ab.mu="g"}],
 a_wsat:["ab",function(S,g){for(var r=0;r<Math.min(3,g.R);r++){S.ab.w[r]=[g.s(r,1),g.s(r,2),g.s(r,3),g.s(r,4)]}S.ab.mu="g"}],
 a_comp:["ab",function(S,g,p){for(var s=0;s<3;s++)for(var r=0;r<Math.min(3,g.R);r++)S.ab.p[s][r]=g.s(r,s+1);if(p.d)S.ab.d=dot(p.d);S.ab.lu="kN"}],
 a_wres:["ab",function(S,g,p){for(var s=0;s<3;s++){S.ab.p[s][1]=g.s(0,s+1);S.ab.p[s][3]=g.s(1,s+1)}if(p.d)S.ab.d=dot(p.d);S.ab.lu="kN"}],
 a_bind:["gr",function(S,g){S.bc.m0=g.s(0,1);S.bc.m1=g.s(0,2)}],
 a_drain:["gr",function(S,g){S.dr.m1=g.s(0,1);S.dr.m=g.s(1,1);S.dr.m2=g.s(2,1)}],
 b_pen:["bit",function(S,g){S.bit.pen=[g.s(0,1),g.s(0,2),g.s(0,3)]}],
 b_rb:["bit",function(S,g){S.bit.kish=[g.s(0,1),g.s(1,1)]}],
 b_duct:["bit",function(S,g){S.bit.duct=[g.s(0,1),g.s(0,2),g.s(0,3)]}]
};

/* ---------------- storage ---------------- */
var SK="dorlab-guide-v1",ST;
try{ST=JSON.parse(localStorage.getItem(SK))}catch(e){ST=null}
if(!ST||!ST.list)ST={list:[],view:{v:"home"}};
function store(){try{localStorage.setItem(SK,JSON.stringify(ST))}catch(e){}}
function sess(id){return ST.list.filter(function(s){return s.id===id})[0]}
function newSess(kind,o){var s={id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),kind:kind,at:Date.now()};for(var k in o)s[k]=o[k];s.st={};ST.list.unshift(s);store();return s}
function tstate(s,tid){if(!s.st[tid])s.st[tid]={step:0,chk:{},v:{},p:{},done:false};return s.st[tid]}

/* ---------------- timer with wake lock + alarm ---------------- */
var TM=null,tick=null,wake=null,ac=null,ring=null;
try{TM=JSON.parse(localStorage.getItem("dorlab-timer"))}catch(e){}
function tsave(){try{if(TM)localStorage.setItem("dorlab-timer",JSON.stringify(TM));else localStorage.removeItem("dorlab-timer")}catch(e){}}
function getWake(){try{if(navigator.wakeLock&&!wake)navigator.wakeLock.request("screen").then(function(w){wake=w;w.addEventListener("release",function(){wake=null})}).catch(function(){})}catch(e){}}
function dropWake(){try{if(wake)wake.release()}catch(e){}wake=null}
function audio(){try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();if(ac.state==="suspended")ac.resume()}catch(e){}}
function beep(){if(!ac)return;try{var t=ac.currentTime;[0,0.25,0.5].forEach(function(d){var o=ac.createOscillator(),gn=ac.createGain();o.type="square";o.frequency.value=d===0.5?1320:880;gn.gain.setValueAtTime(0.0001,t+d);gn.gain.exponentialRampToValueAtTime(0.5,t+d+0.02);gn.gain.exponentialRampToValueAtTime(0.0001,t+d+0.2);o.connect(gn);gn.connect(ac.destination);o.start(t+d);o.stop(t+d+0.22)})}catch(e){}}
function startTimer(sec,label){audio();TM={end:Date.now()+sec*1000,sec:sec,label:label};tsave();getWake();loop();bar()}
function stopTimer(){TM=null;tsave();dropWake();clearInterval(tick);tick=null;if(ring){clearInterval(ring);ring=null}try{navigator.vibrate&&navigator.vibrate(0)}catch(e){}bar()}
function loop(){clearInterval(tick);tick=setInterval(function(){if(!TM){clearInterval(tick);return}var left=TM.end-Date.now();if(left<=0&&!TM.rang){TM.rang=1;tsave();alarm()}bar()},500)}
function alarm(){beep();try{navigator.vibrate&&navigator.vibrate([600,250,600,250,900])}catch(e){}if(ring)clearInterval(ring);ring=setInterval(function(){beep();try{navigator.vibrate&&navigator.vibrate([600,250,600])}catch(e){}},2200);
 try{if(window.Notification&&Notification.permission==="granted"&&navigator.serviceWorker&&navigator.serviceWorker.ready)navigator.serviceWorker.ready.then(function(r){r.showNotification("DorLabKZ — "+L().tDone,{body:TM&&TM.label||"",tag:"dorlab-timer",renotify:true,requireInteraction:true})}).catch(function(){})}catch(e){}bar()}
function mmss(ms){var s=Math.max(0,Math.round(ms/1000)),h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return(h?h+":"+(m<10?"0":""):"")+m+":"+(x<10?"0":"")+x}
function bar(){var b=$("g_timer"),l=L();if(!TM){if(b)b.remove();document.body.classList.remove("g-tm");return}
 if(!b){b=document.createElement("div");b.id="g_timer";b.className="g-timer";b.setAttribute("role","timer");
  b.innerHTML='<div><b></b><span></span><small></small></div><button type="button" class="b"></button>';document.body.appendChild(b);
  b.querySelector("button").onclick=stopTimer}
 var left=TM.end-Date.now(),done=left<=0;b.classList.toggle("ring",done);
 var q=function(sel,t){var e=b.querySelector(sel);if(e.textContent!==t)e.textContent=t};
 q("b",done?l.tDone:l.tLeft+" "+mmss(left));q("span",TM.label||"");q("small",wake?l.tKeep:l.tNoWake);q("button",done?l.tOk:l.tStop);
 document.body.classList.add("g-tm");document.body.style.setProperty("--g-tmh",(b.offsetHeight+24)+"px")}
document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible"&&TM){getWake();if(TM.end<=Date.now()&&!TM.rang){TM.rang=1;tsave();alarm()}else if(TM.rang&&!ring)alarm();loop();bar()}});
/* durations in a step text: "30 мин", "1 ч", "2 h", "5 с" */
function durations(txt){var out=[],re=/(\d+(?:[.,]\d+)?)\s*(ч|h|мин|min|с|s)(?![\wа-яё])/gi,m;
 while((m=re.exec(txt))){var v=num(m[1]),u=m[2].toLowerCase(),sec=u==="ч"||u==="h"?v*3600:u==="мин"||u==="min"?v*60:v;
  if((u==="с"||u==="s")&&(v>120||v<1))continue;if(sec>0&&sec<=86400&&out.every(function(o){return o[0]!==sec}))out.push([sec,m[0]])}
 return out}

/* ---------------- views ---------------- */
var ROOT=null,DATA=null,FIGON={};
function testById(id){return DATA&&DATA.tests.filter(function(t){return t.id===id})[0]}
function idxOf(id){var i=-1;DATA.tests.forEach(function(t,k){if(t.id===id)i=k});return i}
function go(v){ST.view=v;store();draw();try{ROOT.scrollIntoView({block:"start"})}catch(e){}}
function draw(){if(!ROOT)return;var l=L();if(!window.DorLib){ROOT.innerHTML='<div class="card"><p class="hint">…</p></div>';return}
 DorLib.data(LANG,function(d){DATA=d;if(!d){ROOT.innerHTML='<div class="card"><p class="err">'+esc(DorLib.failMsg?DorLib.failMsg(LANG):DorLib.ui(LANG).fail)+'</p></div>';return}
  var v=ST.view||{v:"home"},h;
  if(v.v==="pick")h=vPick();else if(v.v==="mat")h=vMat();else if(v.v==="prog"&&sess(v.s))h=vProg(sess(v.s));else if(v.v==="run"&&sess(v.s))h=vRun(sess(v.s),v.t);else if(v.v==="rec")h=vRec();else{ST.view={v:"home"};h=vHome()}
  ROOT.innerHTML='<div class="g-wrap">'+h+'</div>';wire()})}
function crumbs(){var l=L();return'<button class="lib-back" data-go="home">← '+esc(l.home)+'</button>'}
function vHome(){var l=L();
 var cards=[["pick","⚗",l.start1,l.start1d],["mat","▤",l.start2,l.start2d],["rec","⚖",l.start3,l.start3d]];
 var h='<div class="card"><h2>'+esc(l.h)+'</h2><p class="hint" style="max-width:68ch">'+esc(l.hint)+'</p><div class="g-start">'+cards.map(function(c){return'<button class="g-big" data-go="'+c[0]+'"><span class="g-ic" aria-hidden="true">'+c[1]+'</span><b>'+esc(c[2])+'</b><span>'+esc(c[3])+'</span></button>'}).join("")+'</div>'+
  '<p style="margin:12px 0 0"><button class="link" id="g_help">'+esc(HELPON?l.helpOn:l.helpOffS)+'</button></p></div>';
 h+='<div class="card"><h3>'+esc(l.drafts)+'</h3>'+(ST.list.length?'<ul class="g-drafts">'+ST.list.map(function(s){
   var title=s.kind==="prog"?l.mats[s.mat]+(s.purpose?" · "+l["p"+s.purpose.charAt(0).toUpperCase()+s.purpose.slice(1)]:""):(testById(s.test)||{}).t||s.test;
   var ids=s.kind==="prog"?s.tests:[s.test],dn=ids.filter(function(t){return s.st[t]&&s.st[t].done}).length;
   return'<li><div><b>'+esc(title)+'</b><span class="hint">'+new Date(s.at).toLocaleString()+' · '+dn+'/'+ids.length+' '+esc(l.doneOf)+'</span></div><span class="g-row"><button class="b sm" data-res="'+s.id+'">'+esc(l.resume)+'</button><button class="b sm ghost" data-dels="'+s.id+'">'+esc(l.del)+'</button></span></li>'}).join("")+'</ul>':'<p class="hint">'+esc(l.noDrafts)+'</p>')+'</div>';
 return h}
function vPick(){var l=L(),q=(ST.view.q||"").toLowerCase();
 var h=crumbs()+'<div class="card"><h2>'+esc(l.pickTest)+'</h2><input id="g_q" type="search" placeholder="'+esc(l.search)+'" value="'+esc(ST.view.q||"")+'" aria-label="'+esc(l.search)+'" style="width:100%;margin-top:6px"></div>';
 DATA.fams.forEach(function(f){var ts=DATA.tests.filter(function(t){return t.fam===f[0]&&(!q||(t.t+" "+t.norm+" "+(t.kw||"")).toLowerCase().indexOf(q)>=0)});if(!ts.length)return;
  h+='<div class="card"><h3>'+esc(f[1])+'</h3><ul class="lib-list">'+ts.map(function(t){return'<li><a href="#" data-pt="'+t.id+'"><span class="lt">'+esc(t.t)+'</span><span class="ln">'+esc(t.norm.split(" / ")[0])+'</span><span class="lg">'+esc(t.short||"")+'</span></a></li>'}).join("")+'</ul></div>'});
 return h}
function vMat(){var l=L(),m=ST.view.m;
 var h=crumbs()+'<div class="card"><h2>'+esc(l.pickMat)+'</h2><div class="g-chips">'+MAT.map(function(k){return'<button class="g-chip" data-mat="'+k+'" aria-pressed="'+(m===k)+'">'+esc(l.mats[k])+'</button>'}).join("")+'</div></div>';
 if(m&&!Array.isArray(PROG[m]))h+='<div class="card"><h3>'+esc(l.purpose)+'</h3><div class="g-chips">'+["design","lot","site"].map(function(p){return'<button class="g-chip" data-purp="'+p+'">'+esc(l["p"+p.charAt(0).toUpperCase()+p.slice(1)])+'</button>'}).join("")+'</div></div>';
 return h}
function vProg(s){var l=L(),dn=s.tests.filter(function(t){return s.st[t]&&s.st[t].done}).length,pc=Math.round(dn/s.tests.length*100);
 var h=crumbs()+'<div class="card"><h2>'+esc(l.prog)+'</h2><p><b>'+esc(l.mats[s.mat])+'</b>'+(s.purpose?' · '+esc(l["p"+s.purpose.charAt(0).toUpperCase()+s.purpose.slice(1)]):'')+'</p><p class="hint">'+esc(l.progHint)+'</p>'+
  '<div class="g-prog" role="progressbar" aria-valuenow="'+pc+'" aria-valuemin="0" aria-valuemax="100"><i style="width:'+pc+'%"></i></div><p class="hint">'+dn+' / '+s.tests.length+' '+esc(l.doneOf)+'</p></div>';
 h+='<ol class="g-plist">'+s.tests.map(function(id,i){var t=testById(id);if(!t)return"";var st=s.st[id],state=st&&st.done?"done":st&&(st.step||Object.keys(st.v).length)?"go":"";
  return'<li class="card '+state+'"><div class="g-pn">'+(i+1)+'</div><div class="g-pb"><b>'+esc(t.t)+'</b> <span class="g-tag '+(PERIODIC[id]?"per":"must")+'">'+esc(PERIODIC[id]?l.period:l.must)+'</span>'+
   '<p><span class="g-k">'+esc(l.why)+':</span> '+DorLib.md(t.goal||"")+'</p><p><span class="g-k">'+esc(l.when)+':</span> '+DorLib.md(t.when||"")+'</p><p class="ln hint">'+esc(t.norm)+'</p></div>'+
   '<button class="b'+(state==="done"?' ghost':'')+'" data-run="'+id+'">'+esc(state==="done"?l.doneT:state==="go"?l.contT:l.startT)+'</button></li>'}).join("")+'</ol>';
 return h}
/* steps of a test */
function steps(t){var l=L(),a=[];a.push({k:"eq"});(t.prep||[]).forEach(function(x){a.push({k:"prep",x:x})});(t.steps||[]).forEach(function(x){a.push({k:"run",x:x})});
 if(t.ex&&t.ex.inp)a.push({k:"meas"});a.push({k:"res"});return a}
function inpTable(t){var e=t.ex&&t.ex.inp;if(!e)return null;var rows=e.r.map(function(r){return r.c||r});
 var kv=e.h.length===2&&rows.every(function(r){return!isFinite(num(r[0]))});
 return{h:e.h,rows:rows,kv:kv}}
function keyOf(h){return String(h).split(",")[0].trim()}
function grid(st,T){var g=function(r,c){return T.kv?num(st.v[r+"_1"]):c===0&&!isFinite(num(st.v[r+"_0"]))?num(T.rows[r][0]):num(st.v[r+"_"+c])};
 g.R=T.rows.length;g.C=T.h.length;g.lab=function(r){return T.rows[r][0]};g.s=function(r,c){return dot(st.v[r+"_"+c])};return g}
function cell(st,T,r,c){var ph=T.rows[r][c];return'<input class="num" inputmode="decimal" data-v="'+r+'_'+c+'" value="'+esc(st.v[r+"_"+c]||"")+'" placeholder="'+esc(ph)+'" aria-label="'+esc(T.h[c]+" "+T.rows[r][0])+'">'}
function fullTable(st,T){var editable=function(c){return T.kv?c===1:c>0};
 return'<div class="tbl"><table><thead><tr>'+T.h.map(function(c,i){return'<th'+(i?' class="n"':'')+'>'+esc(c)+'</th>'}).join("")+'</tr></thead><tbody>'+
  T.rows.map(function(r,ri){return'<tr>'+r.map(function(v,ci){return editable(ci)?'<td>'+cell(st,T,ri,ci)+'</td>':'<td>'+esc(v)+'</td>'}).join("")+'</tr>'}).join("")+'</tbody></table></div><p class="hint">'+esc(L().ex)+': '+esc(T.rows.map(function(r){return r.slice(1).join(" / ")}).join(" · "))+'</p>'}
function stepInputs(st,T,txt){if(!T)return"";var chips=[],re=/`([^`]+)`/g,m;while((m=re.exec(txt)))chips.push(m[1]);if(!chips.length)return"";var l=L(),h="";
 chips.forEach(function(ch){
  if(T.kv){T.rows.forEach(function(r,ri){if(String(r[0]).trim()===ch)h+='<label class="f">'+esc(ch)+cell(st,T,ri,1)+'</label>'})}
  else{var c=-1;T.h.forEach(function(x,i){if(i&&keyOf(x)===ch)c=i});if(c<0)return;h+='<div class="g-in"><b>'+esc(T.h[c])+'</b><div class="fields">'+T.rows.map(function(r,ri){return'<label class="f">'+esc(isFinite(num(r[0]))?l.sample+" "+r[0]:r[0])+cell(st,T,ri,c)+'</label>'}).join("")+'</div></div>'}});
 return h?'<div class="g-rec"><p class="g-k">'+esc(l.enter)+'</p>'+h+'</div>':""}
function vRun(s,tid){var l=L(),t=testById(tid);if(!t){ST.view={v:"home"};return vHome()}var st=tstate(s,tid),A=steps(t),n=A.length;if(st.step>=n)st.step=n-1;var cur=A[st.step],T=inpTable(t),idx=idxOf(tid);
 var h=(s.kind==="prog"?'<button class="lib-back" data-go2="'+s.id+'">← '+esc(l.prog)+'</button>':crumbs())+
  '<div class="card g-head"><h2>'+esc(t.t)+'</h2><p class="lib-norm">'+esc(t.norm)+'</p><div class="g-prog"><i style="width:'+Math.round((st.step+1)/n*100)+'%"></i></div><p class="hint">'+esc(l.step)+' '+(st.step+1)+' '+esc(l.of)+' '+n+'</p>'+
  '<div class="g-row"><button class="b sm ghost" id="g_fig">'+esc(FIGON[tid]!==false?l.hideFig:l.showFig)+'</button><button class="b sm ghost" data-gm="'+tid+'">'+esc(l.method)+'</button></div></div>'+
  (FIGON[tid]!==false?'<div class="card lib-fig g-fig" id="g_figbox" role="button" tabindex="0" title="'+esc(l.zoom)+'">'+DorLib.fig(t,idx,LANG)+'<p class="hint g-zh">⤢ '+esc(l.zoom)+'</p></div>':'');
 var body="";
 if(cur.k==="eq"){body='<h3>'+esc(l.eqH)+'</h3><p class="hint">'+esc(l.eqHint)+'</p><ul class="g-chk">'+(t.eq||[]).map(function(e,i){return'<li><label><input type="checkbox" data-chk="'+i+'"'+(st.chk[i]?" checked":"")+'> <span>'+DorLib.md(e)+'</span></label></li>'}).join("")+'</ul>'+
   '<div class="g-ww"><p><span class="g-k">'+esc(l.why)+':</span> '+DorLib.md(t.goal||"")+'</p><p><span class="g-k">'+esc(l.when)+':</span> '+DorLib.md(t.when||"")+'</p></div>'+
   (PARAMS[tid]?'<h3>'+esc(l.param)+'</h3><div class="fields">'+PARAMS[tid].map(function(p){return'<label class="f">'+esc(p[0]==="d"?p[1]:p[1])+'<input class="num" inputmode="decimal" data-p="'+p[0]+'" value="'+esc(st.p[p[0]]!=null?st.p[p[0]]:p[2].replace(".",LANG==="en"?".":","))+'"></label>'}).join("")+'</div>':'')}
 else if(cur.k==="prep"||cur.k==="run"){var ti=durations(cur.x);
  body='<p class="g-k">'+esc(cur.k==="prep"?l.prepH:l.runH)+'</p><p class="g-step">'+DorLib.md(cur.x)+'</p>'+
   (ti.length?'<div class="g-row">'+ti.map(function(d){return'<button class="b g-tbtn" data-tm="'+d[0]+'">⏱ '+esc(l.timer)+' '+esc(d[1])+'</button>'}).join("")+'</div>':'')+stepInputs(st,T,cur.x)}
 else if(cur.k==="meas"){body='<h3>'+esc(l.measH)+'</h3><p class="hint">'+esc(l.measHint)+'</p>'+fullTable(st,T)}
 else{var f=CALC[tid],out=null;if(f&&T){try{out=f(grid(st,T),paramsOf(st,tid))}catch(e){out=null}}
  body='<h3>'+esc(l.resH)+'</h3>'+(out?'<ul class="g-res">'+out.map(function(o){return'<li'+(o[2]?' class="b"':'')+'><span>'+esc(o[0])+'</span><span>'+esc(o[1])+'</span></li>'}).join("")+'</ul>':'<p class="hint">'+esc(l.noCalc)+'</p>')+
   (t.f?'<div class="g-f">'+t.f.map(function(x){return'<div class="lib-f">'+esc(x)+'</div>'}).join("")+'</div>':'')+
   (t.req?'<ul class="g-req">'+t.req.map(function(x){return'<li>'+DorLib.md(x)+'</li>'}).join("")+'</ul>':'')+
   (XFER[tid]&&T?'<div class="g-xf"><button class="b" id="g_xfer">'+esc(st.xf?l.transferred:l.transfer)+'</button><p class="hint">'+esc(l.transferD)+'</p></div>':'<p class="hint">'+esc(l.journalD)+'</p>')+
   '<p class="hint">'+esc(l.keepDraft)+'</p>'}
 var last=st.step===n-1,nxt=null;if(last&&s.kind==="prog"){var k=s.tests.indexOf(tid);for(var i=1;i<=s.tests.length;i++){var c=s.tests[(k+i)%s.tests.length];if(!(s.st[c]&&s.st[c].done)&&c!==tid){nxt=c;break}}}
 h+='<div class="card g-body">'+body+'</div><div class="g-nav">'+(st.step>0?'<button class="b ghost" id="g_prev">'+esc(l.prev)+'</button>':'<span></span>')+
  (last?(nxt?'<button class="b" id="g_fin" data-next="'+nxt+'">'+esc(l.next2)+' →</button>':'<button class="b" id="g_fin">'+esc(l.finish)+'</button>'):'<button class="b" id="g_next">'+esc(l.next)+'</button>')+'</div>';
 return h}
function paramsOf(st,tid){var p={};(PARAMS[tid]||[]).forEach(function(x){p[x[0]]=st.p[x[0]]!=null?st.p[x[0]]:x[2]});return p}

/* ---------------- recipe ---------------- */
var BIT_DEF={"КЗтипА":5.0,"КЗтипБ":5.5,"МЗтипА":5.0,"МЗтипБ":5.5,"МЗтипВ":6.5,"МЗтипГ":7.0,"МЗтипД":8.0,"МЗтипБх":5.5,"МЗтипВх":6.5,"МЗтипГхДх":7.5,"КЗпористый":4.0,"КЗвысокопористый":3.0,"Высокопористый песчаный":3.5,"ЩМА10":6.5,"ЩМА15":6.2,"ЩМА20":6.0,"ПМА5":8.0,"ПМА10":7.0,"ПМА15":6.5};
function recState(){var A=window.DorApp,S=A&&A.S;if(!ST.rec){var mx=S&&S.mx;ST.rec={mx:mx?JSON.parse(JSON.stringify(mx)):null,bit:"",mode:"over",plant:"batch",batch:"2000",rate:"160",order:"500"}}
 if(!ST.rec.mx&&S)ST.rec.mx=JSON.parse(JSON.stringify(S.mx));return ST.rec}
function blendOf(mx,pct){return mx.sieves.map(function(_,j){return mx.fr.reduce(function(a,fr,i){var v=num(fr.pass[j]);return a+(isFinite(v)?pct[i]*v/100:0)},0)})}
function cost(mx,pct){var b=blendOf(mx,pct),c=0;mx.sieves.forEach(function(_,j){var lo=num(mx.min[j]),hi=num(mx.max[j]);if(!isFinite(lo)&&!isFinite(hi))return;if(!isFinite(lo))lo=0;if(!isFinite(hi))hi=100;var mid=(lo+hi)/2,w=Math.max(2,(hi-lo)/2),e=(b[j]-mid)/w;c+=e*e;if(b[j]<lo)c+=50*(lo-b[j])*(lo-b[j]);if(b[j]>hi)c+=50*(b[j]-hi)*(b[j]-hi)});return c}
function optimise(mx){var n=mx.fr.length,p=mx.fr.map(function(f){var v=num(f.pct);return isFinite(v)&&v>=0?v:0}),s=p.reduce(function(a,b){return a+b},0);
 if(s<=0)p=p.map(function(){return 100/n});else p=p.map(function(v){return v*100/s});
 var best=cost(mx,p);[10,5,2,1,0.5].forEach(function(d){var imp=true,guard=0;while(imp&&guard++<400){imp=false;for(var i=0;i<n;i++)for(var j=0;j<n;j++){if(i===j||p[i]<d)continue;p[i]-=d;p[j]+=d;var c=cost(mx,p);if(c<best-1e-9){best=c;imp=true}else{p[i]+=d;p[j]-=d}}}});
 return p.map(function(v){return Math.round(v*2)/2})}
function vRec(){var l=L(),R=recState(),mx=R.mx;if(!mx)return crumbs()+'<div class="card"><p class="hint">—</p></div>';
 var M=(window.DorApp&&DorApp.MIXES)||[];if(R.bit==="")R.bit=String(BIT_DEF[mx.id]!=null?BIT_DEF[mx.id]:5.5).replace(".",LANG==="en"?".":",");
 var pct=mx.fr.map(function(f){return num(f.pct)||0}),b=blendOf(mx,pct),bad=[];mx.sieves.forEach(function(s,j){var lo=num(mx.min[j]),hi=num(mx.max[j]);if((isFinite(lo)&&b[j]<lo-0.05)||(isFinite(hi)&&b[j]>hi+0.05))bad.push(s)});
 var sum=pct.reduce(function(a,c){return a+c},0),q=num(R.bit),bm=R.mode==="over"?q/(100+q)*100:q,minShare=(100-bm)/100;
 var batch=num(R.batch),rate=num(R.rate),order=num(R.order),plant=R.plant;
 var rows=mx.fr.map(function(f,i){var sh=pct[i]/Math.max(sum,1e-9)*minShare;return[f.name,pct[i],sh]});rows.push([l.bit,null,bm/100]);
 var h=crumbs()+'<div class="card"><h2>'+esc(l.rec)+'</h2><p class="hint" style="max-width:68ch">'+esc(l.recHint)+'</p><div class="fields">'+
  '<label class="f">'+esc(l.mixT)+'<select id="r_mix">'+M.map(function(m){return'<option value="'+esc(m.id)+'"'+(m.id===mx.id?" selected":"")+'>'+esc(m.title)+' — '+esc(m.norm)+'</option>'}).join("")+'</select></label></div></div>';
 h+='<div class="card"><div class="tbl mxt"><table><thead><tr><th>'+esc(l.fracName)+'</th><th class="n">'+esc(l.share)+'</th>'+mx.sieves.map(function(s){return'<th class="n">'+s+'</th>'}).join("")+'</tr></thead><tbody>'+
  mx.fr.map(function(f,i){return'<tr><td>'+esc(f.name)+'</td><td><input class="num" inputmode="decimal" data-rp="'+i+'" value="'+esc(f.pct)+'"></td>'+f.pass.map(function(v,j){return'<td><input class="num" inputmode="decimal" data-rv="'+i+'_'+j+'" value="'+esc(v)+'"></td>'}).join("")+'</tr>'}).join("")+
  '<tr><td><b>Σ</b></td><td class="n res">'+fmt(sum,1)+'</td>'+b.map(function(x,j){var lo=num(mx.min[j]),hi=num(mx.max[j]),ok=!((isFinite(lo)&&x<lo-0.05)||(isFinite(hi)&&x>hi+0.05));return'<td class="n res" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+fmt(x,1)+'</td>'}).join("")+'</tr>'+
  '<tr><td class="hint">min–max</td><td></td>'+mx.sieves.map(function(_,j){return'<td class="n hint">'+esc(mx.min[j])+'–'+esc(mx.max[j])+'</td>'}).join("")+'</tr></tbody></table></div>'+
  '<div class="g-row" style="margin-top:10px"><button class="b" id="r_auto">'+esc(l.auto)+'</button><span class="pill '+(bad.length||Math.abs(sum-100)>0.05?"bad":"ok")+'">'+(bad.length?esc(l.curveBad)+" "+bad.join(", "):esc(l.curve))+'</span></div></div>';
 h+='<div class="card"><h3>'+esc(l.bit)+'</h3><div class="fields"><label class="f">'+esc(l.bit)+', %<input id="r_bit" class="num" inputmode="decimal" value="'+esc(R.bit)+'"></label>'+
  '<label class="f">'+esc(l.bitMode)+'<select id="r_mode"><option value="over"'+(R.mode==="over"?" selected":"")+'>'+esc(l.bitOver)+'</option><option value="mix"'+(R.mode==="mix"?" selected":"")+'>'+esc(l.bitMix)+'</option></select></label></div><p class="hint">'+esc(l.bitNote)+'</p></div>';
 h+='<div class="card"><h3>'+esc(l.plant)+'</h3><div class="fields"><label class="f">'+esc(l.plantT)+'<select id="r_plant"><option value="batch"'+(plant==="batch"?" selected":"")+'>'+esc(l.batchP)+'</option><option value="cont"'+(plant==="cont"?" selected":"")+'>'+esc(l.contP)+'</option></select></label>'+
  (plant==="batch"?'<label class="f">'+esc(l.batch)+'<input id="r_batch" class="num" inputmode="decimal" value="'+esc(R.batch)+'"></label>':'<label class="f">'+esc(l.rate)+'<input id="r_rate" class="num" inputmode="decimal" value="'+esc(R.rate)+'"></label>')+
  '<label class="f">'+esc(l.order)+'<input id="r_order" class="num" inputmode="decimal" value="'+esc(R.order)+'"></label></div></div>';
 var c2=plant==="batch"?l.perBatch:l.perHour,base=plant==="batch"?batch:rate,d2=plant==="batch"?0:2;
 h+='<div class="card"><h2>'+esc(l.recRes)+' · '+esc(mx.title)+'</h2><div class="tbl"><table><thead><tr><th>'+esc(l.mat)+'</th><th class="n">'+esc(l.share)+' ('+esc(l.bitMix)+')</th><th class="n">'+esc(c2)+'</th><th class="n">'+esc(l.perOrder)+'</th></tr></thead><tbody>'+
  rows.map(function(r){return'<tr><td>'+esc(r[0])+'</td><td class="n">'+fmt(r[2]*100,2)+'</td><td class="n res">'+fmt(r[2]*base,d2)+'</td><td class="n">'+fmt(r[2]*order,1)+'</td></tr>'}).join("")+
  '<tr style="font-weight:600"><td>'+esc(l.total)+'</td><td class="n">'+fmt(100,2)+'</td><td class="n">'+fmt(base,d2)+'</td><td class="n">'+fmt(order,1)+'</td></tr></tbody></table></div>'+
  '<div class="g-row" style="margin-top:10px"><button class="b" id="r_apply">'+esc(R.applied?l.applied:l.apply)+'</button></div></div>';
 return h}

/* ---------------- wiring ---------------- */
function wire(){var l=L(),v=ST.view;
 ROOT.querySelectorAll("[data-go]").forEach(function(b){b.onclick=function(){go({v:b.dataset.go})}});
 ROOT.querySelectorAll("[data-go2]").forEach(function(b){b.onclick=function(){go({v:"prog",s:b.dataset.go2})}});
 ROOT.querySelectorAll("[data-gm]").forEach(function(b){b.onclick=function(){DorLib.popup(b.dataset.gm,LANG)}});
 var hp=$("g_help");if(hp)hp.onclick=function(){HELPON=!HELPON;try{localStorage.setItem("dorlab-help",HELPON?"on":"off")}catch(e){}draw()};
 ROOT.querySelectorAll("[data-res]").forEach(function(b){b.onclick=function(){var s=sess(b.dataset.res);if(!s)return;go(s.kind==="prog"?{v:"prog",s:s.id}:{v:"run",s:s.id,t:s.test})}});
 ROOT.querySelectorAll("[data-dels]").forEach(function(b){b.onclick=function(){if(b.dataset.armed){ST.list=ST.list.filter(function(s){return s.id!==b.dataset.dels});store();draw();return}b.dataset.armed=1;b.textContent=l.delQ}});
 var q=$("g_q");if(q)q.oninput=function(){ST.view.q=q.value;var pos=q.selectionStart;draw();var n=$("g_q");if(n){n.focus();try{n.setSelectionRange(pos,pos)}catch(e){}}};
 ROOT.querySelectorAll("[data-pt]").forEach(function(a){a.onclick=function(e){e.preventDefault();var s=newSess("test",{test:a.dataset.pt});go({v:"run",s:s.id,t:a.dataset.pt})}});
 ROOT.querySelectorAll("[data-mat]").forEach(function(b){b.onclick=function(){var m=b.dataset.mat;if(Array.isArray(PROG[m])){var s=newSess("prog",{mat:m,tests:PROG[m].slice()});go({v:"prog",s:s.id})}else go({v:"mat",m:m})}});
 ROOT.querySelectorAll("[data-purp]").forEach(function(b){b.onclick=function(){var m=v.m,p=b.dataset.purp,s=newSess("prog",{mat:m,purpose:p,tests:PROG[m][p].slice()});go({v:"prog",s:s.id})}});
 ROOT.querySelectorAll("[data-run]").forEach(function(b){b.onclick=function(){go({v:"run",s:v.s,t:b.dataset.run})}});
 if(v.v==="run"){var s=sess(v.s),st=tstate(s,v.t),A=steps(testById(v.t));
  function touch(){s.at=Date.now();store()}
  ROOT.querySelectorAll("[data-chk]").forEach(function(c){c.onchange=function(){st.chk[c.dataset.chk]=c.checked;touch()}});
  ROOT.querySelectorAll("[data-v]").forEach(function(i){i.oninput=function(){st.v[i.dataset.v]=i.value;st.xf=false;touch()}});
  ROOT.querySelectorAll("[data-p]").forEach(function(i){i.oninput=function(){st.p[i.dataset.p]=i.value;st.xf=false;touch()}});
  ROOT.querySelectorAll("[data-tm]").forEach(function(b){b.onclick=function(){var t=testById(v.t);startTimer(+b.dataset.tm,t.t+" · "+l.step+" "+(st.step+1))}});
  var f=$("g_fig");if(f)f.onclick=function(){FIGON[v.t]=FIGON[v.t]===false;draw()};
  var fb=$("g_figbox");if(fb){var zo=function(){var o=document.createElement("div");o.className="g-zoom";o.innerHTML='<button class="b sm" aria-label="×">✕</button><div class="g-zi">'+fb.querySelector("svg").outerHTML+'</div>';o.onclick=function(e){if(e.target===o||e.target.tagName==="BUTTON")o.remove()};document.body.appendChild(o)};fb.onclick=zo;fb.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();zo()}}}
  var pv=$("g_prev");if(pv)pv.onclick=function(){st.step=Math.max(0,st.step-1);touch();draw();ROOT.scrollIntoView()};
  var nx=$("g_next");if(nx)nx.onclick=function(){st.step=Math.min(A.length-1,st.step+1);touch();draw();ROOT.scrollIntoView()};
  var fi=$("g_fin");if(fi)fi.onclick=function(){st.done=true;touch();if(fi.dataset.next)go({v:"run",s:s.id,t:fi.dataset.next});else go(s.kind==="prog"?{v:"prog",s:s.id}:{v:"home"})};
  var xf=$("g_xfer");if(xf)xf.onclick=function(){var A2=window.DorApp,x=XFER[v.t],T=inpTable(testById(v.t));if(!A2||!x||!T)return;x[1](A2.S,grid(st,T),paramsOf(st,v.t));st.xf=true;touch();A2.save();A2.go(x[0])}}
 if(v.v==="rec"){var R=recState(),A3=window.DorApp;
  function rr(){store();draw()}
  var mxs=$("r_mix");if(mxs)mxs.onchange=function(){if(A3&&A3.preset){R.mx=A3.preset(mxs.value);R.bit="";R.applied=false;rr()}};
  ROOT.querySelectorAll("[data-rp]").forEach(function(i){i.onchange=function(){R.mx.fr[+i.dataset.rp].pct=dot(i.value);R.applied=false;rr()}});
  ROOT.querySelectorAll("[data-rv]").forEach(function(i){i.onchange=function(){var a=i.dataset.rv.split("_");R.mx.fr[+a[0]].pass[+a[1]]=dot(i.value);R.applied=false;rr()}});
  var au=$("r_auto");if(au)au.onclick=function(){var p=optimise(R.mx);R.mx.fr.forEach(function(f,i){f.pct=String(p[i])});R.applied=false;rr()};
  [["r_bit","bit"],["r_batch","batch"],["r_rate","rate"],["r_order","order"]].forEach(function(x){var e=$(x[0]);if(e)e.onchange=function(){R[x[1]]=e.value;rr()}});
  [["r_mode","mode"],["r_plant","plant"]].forEach(function(x){var e=$(x[0]);if(e)e.onchange=function(){R[x[1]]=e.value;rr()}});
  var ap=$("r_apply");if(ap)ap.onclick=function(){if(!A3)return;A3.S.mx=JSON.parse(JSON.stringify(R.mx));R.applied=true;store();A3.save();A3.go("mx")}}}

/* ---------------- css ---------------- */
var CSS=".g-fig{cursor:zoom-in}.g-fig .lsvg{min-width:0!important;width:100%}.g-fig{overflow:hidden!important}.g-zh{margin:6px 0 0;text-align:center}.g-zoom{position:fixed;inset:0;z-index:999;background:rgba(0,0,0,.82);display:flex;flex-direction:column;align-items:flex-end;justify-content:center;padding:10px;gap:8px}.g-zi{flex:0 1 auto;max-height:90%;width:100%;overflow:auto;background:#fff;border-radius:8px;-webkit-overflow-scrolling:touch}.g-zi .lsvg{min-width:900px;width:100%;height:auto}"+
".g-wrap{display:grid;gap:16px}.g-start{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:12px}"+
".g-big{display:grid;gap:4px;text-align:left;padding:16px;border-radius:12px;border:1px solid var(--line);background:var(--sheet,transparent);color:var(--ink);cursor:pointer;font:inherit}.g-big b{font:600 17px var(--display)}.g-big span{color:var(--muted);font-size:14px}.g-big:hover,.g-big:focus-visible{border-color:var(--accent)}"+
".g-ic{font-size:22px;color:var(--accent)!important}.g-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.b.ghost{background:none;border:1px solid var(--line);color:var(--ink)}"+
".g-drafts{list-style:none;margin:8px 0 0;padding:0;display:grid;gap:8px}.g-drafts li{display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap;padding:10px 0;border-top:1px solid var(--line)}.g-drafts li div{display:grid}"+
".g-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}.g-chip{padding:10px 14px;border-radius:10px;border:1px solid var(--line);background:none;color:var(--ink);font:inherit;cursor:pointer;text-align:left}.g-chip[aria-pressed=true],.g-chip:hover{border-color:var(--accent);color:var(--accent)}"+
".g-prog{height:8px;border-radius:4px;background:var(--line);overflow:hidden;margin-top:10px}.g-prog i{display:block;height:100%;background:var(--accent)}"+
".g-plist{list-style:none;margin:0;padding:0;display:grid;gap:12px}.g-plist li{display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:start}.g-plist li.done{opacity:.75}.g-plist li.done .g-pn{background:var(--ok);color:#fff;border-color:var(--ok)}"+
".g-pn{width:32px;height:32px;border-radius:50%;border:1px solid var(--accent);color:var(--accent);display:flex;align-items:center;justify-content:center;font:600 14px var(--display)}.g-pb p{margin:4px 0 0;max-width:70ch}"+
".g-tag{font-size:12px;padding:2px 8px;border-radius:10px;border:1px solid var(--line);white-space:nowrap}.g-tag.must{border-color:var(--accent);color:var(--accent)}"+
".g-k{color:var(--muted);font-size:13px;font-weight:600}.g-step{font-size:19px;line-height:1.5;margin:6px 0 12px;max-width:62ch}"+
".g-chk{list-style:none;margin:8px 0;padding:0;display:grid;gap:10px}.g-chk label{display:flex;gap:10px;align-items:flex-start;cursor:pointer;font-size:16px}.g-chk input{width:22px;height:22px;flex:none;margin-top:1px;accent-color:var(--accent)}"+
".g-ww{margin-top:12px;padding-top:10px;border-top:1px solid var(--line)}.g-ww p{margin:4px 0;max-width:70ch}"+
".g-rec{margin-top:10px;padding:12px;border:1px dashed var(--accent);border-radius:10px}.g-rec .g-in{margin-top:6px}.g-tbtn{margin:4px 0}"+
".g-res{list-style:none;margin:8px 0;padding:0;display:grid;gap:6px}.g-res li{display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid var(--line);font-family:var(--mono);font-size:14px;flex-wrap:wrap}.g-res li.b{font-weight:700;color:var(--accent)}"+
".g-f{margin:10px 0}.g-req{margin:8px 0;padding-left:18px;color:var(--muted)}.g-xf{margin-top:12px}"+
"body.g-tm{padding-bottom:var(--g-tmh,110px)}body.g-tm .g-nav{bottom:var(--g-tmh,110px)}.g-nav{position:sticky;bottom:0;display:flex;justify-content:space-between;gap:10px;padding:10px 0;background:var(--bg);z-index:5}.g-nav .b{min-height:46px;padding:0 18px;font-size:16px}"+
".g-timer{position:fixed;left:12px;right:12px;bottom:12px;z-index:900;display:flex;gap:12px;align-items:center;justify-content:space-between;padding:12px 14px;border-radius:12px;background:var(--ink);color:var(--bg);box-shadow:0 8px 30px rgba(0,0,0,.35);max-width:560px;margin:0 auto}"+
".g-timer div{display:grid}.g-timer b{font:700 22px var(--mono)}.g-timer span{font-size:13px;opacity:.85}.g-timer small{font-size:12px;opacity:.7}.g-timer.ring{background:var(--bad);color:#fff;animation:gpulse 1s steps(2) infinite}"+
"@keyframes gpulse{50%{background:#7a1010}}@media (prefers-reduced-motion:reduce){.g-timer.ring{animation:none}}"+
".g-bub{position:absolute;z-index:950;background:var(--ink);color:var(--bg);padding:10px 12px;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.35);font-size:14px}.g-bub p{margin:4px 0 8px}.g-bub b{font-size:13px}.g-bub .g-bub-b{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.g-bub .link{color:inherit;opacity:.75;background:none;border:0;text-decoration:underline;cursor:pointer;font:inherit;font-size:12px}";
function css(){if(!document.getElementById("guide_css")){var s=document.createElement("style");s.id="guide_css";s.textContent=CSS;document.head.appendChild(s)}}

function render(el,lang){css();LANG=lang||"ru";ROOT=el;draw()}
if(TM){getWake();loop();setTimeout(bar,0)}
window.DorGuide={_start:startTimer,render:render,attach:attach,tab:function(lang){return(G[lang]||G.ru).tab},_calc:CALC,_grid:grid,_inp:inpTable,_opt:optimise,_dur:durations};
})();
