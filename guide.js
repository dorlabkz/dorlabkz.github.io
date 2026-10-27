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
  prev:"← Назад",next:"Сделано →",finish:"Закончить",fullFig:"Общая схема",stepFig:"Схема шага",showFig:"Показать схему",zoom:"Нажмите, чтобы увеличить",hideFig:"Скрыть схему",method:"Открыть методику",
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
  mats:{hot:"Горячий асфальтобетон (СТ РК 1225)",cold:"Холодный асфальтобетон (Бх, Вх, Гх, Дх)",black:"Щебень чёрный и чёрные смеси (СТ РК 1215, 1216)",emul:"Эмульсия битумная (СТ РК 1274)",shgps:"ЩГПС — щебёночно-гравийно-песчаная смесь (СТ РК 1549)",pma:"Полимерасфальтобетон (СТ РК 1223)",sma:"ЩМПА — щебёночно-мастичный полимерасфальтобетон (СТ РК 2373)",bitum:"Битум дорожный (БНД, ПБВ)",crushed:"Щебень / гравий",sand:"Песок",powder:"Минеральный порошок",soil:"Грунт земляного полотна",conc:"Цементобетон"}},
 fr:{tab:"Accompagnement",h:"Accompagnement",hint:"Te guide dans l'essai étape par étape avec des mots simples, rappelle le matériel, chronomètre et fait tous les calculs. Tout est gardé en brouillon sur cet appareil.",
  start1:"Choisir un essai",start1d:"Je sais quel essai je dois faire",start2:"J'ai un matériau",start2d:"Donne tous les essais du СТ РК pour ce matériau",start3:"Créer une recette",start3d:"Pourcentages des matériaux et du bitume, poids pour la centrale",
  drafts:"En cours",noDrafts:"Aucun essai en cours.",resume:"Reprendre",del:"Supprimer",delQ:"Vraiment supprimer ?",back:"Retour",home:"Accompagnement",
  pickTest:"Quel essai fait-on ?",search:"Chercher un essai…",pickMat:"Quel matériau as-tu ?",purpose:"Pour quoi teste-t-on ?",
  pDesign:"Formulation (recette)",pLot:"Contrôle d'un lot à la centrale",pSite:"Contrôle sur chantier",
  prog:"Programme d'essais",progHint:"Ce qu'il faut faire pour que le matériau respecte le СТ РК. Clique sur un essai pour commencer.",must:"obligatoire",period:"périodique",
  doneOf:"faits",startT:"Commencer",contT:"Continuer",doneT:"Fait ✓",
  step:"Étape",of:"sur",eqH:"Prépare le matériel",eqHint:"Coche ce que tu as déjà devant toi.",prepH:"Préparation",runH:"Exécution",measH:"Vérifie toutes les valeurs",measHint:"Tous les chiffres saisis au fur et à mesure. Tu peux corriger.",
  resH:"Résultat avec tes chiffres",noCalc:"Le calcul automatique de cet essai n'est pas encore fait — calcule avec la formule ci-dessous ; un exemple est dans la méthode.",
  prev:"← Retour",next:"C'est fait →",finish:"Terminer",fullFig:"Schéma général",stepFig:"Schéma de l'étape",showFig:"Voir le schéma",zoom:"Touche pour agrandir",hideFig:"Cacher le schéma",method:"Ouvrir la méthode",
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
  mats:{hot:"Enrobé à chaud (СТ РК 1225)",cold:"Enrobé à froid (Бх, Вх, Гх, Дх)",black:"Gravillon noir et mélanges noirs (СТ РК 1215, 1216)",emul:"Émulsion de bitume (СТ РК 1274)",shgps:"Grave-sable ЩГПС (СТ РК 1549)",pma:"Enrobé aux polymères (СТ РК 1223)",sma:"SMA polymère — ЩМПА (СТ РК 2373)",bitum:"Bitume routier (БНД, ПБВ)",crushed:"Gravillons / gravier",sand:"Sable",powder:"Filler (poudre minérale)",soil:"Sol de plateforme",conc:"Béton de ciment"}},
 en:{tab:"Guided mode",h:"Guided mode",hint:"Walks you through a test step by step in plain words, reminds you of the equipment, times the waits and does all the maths. Everything is kept as a draft on this device.",
  start1:"Pick a test",start1d:"I know which test to do",start2:"I have a material",start2d:"Lists every СТ РК test for this material",start3:"Create a recipe",start3d:"Material and bitumen shares, weights for the plant",
  drafts:"In progress",noDrafts:"No tests in progress.",resume:"Resume",del:"Delete",delQ:"Delete for sure?",back:"Back",home:"Guided mode",
  pickTest:"Which test?",search:"Find a test…",pickMat:"Which material do you have?",purpose:"What is the test for?",
  pDesign:"Mix design (recipe)",pLot:"Lot control at the plant",pSite:"Site control",
  prog:"Test programme",progHint:"What to do so the material meets СТ РК. Tap a test to start.",must:"required",period:"periodic",
  doneOf:"done",startT:"Start",contT:"Continue",doneT:"Done ✓",
  step:"Step",of:"of",eqH:"Get the equipment ready",eqHint:"Tick what is already in front of you.",prepH:"Preparation",runH:"Procedure",measH:"Check all readings",measHint:"Every number you entered along the way. You can correct them.",
  resH:"Result with your numbers",noCalc:"Automatic calculation for this test is not built yet — use the formula below; a worked example is in the method.",
  prev:"← Back",next:"Done →",finish:"Finish",fullFig:"Whole-test diagram",stepFig:"Step diagram",showFig:"Show diagram",zoom:"Tap to enlarge",hideFig:"Hide diagram",method:"Open the method",
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
  mats:{hot:"Hot-mix asphalt (ST RK 1225)",cold:"Cold-mix asphalt (Бх, Вх, Гх, Дх)",black:"Coated chippings and coated mixes (ST RK 1215, 1216)",emul:"Bitumen emulsion (ST RK 1274)",shgps:"Crushed stone–gravel–sand mix ЩГПС (ST RK 1549)",pma:"Polymer asphalt (ST RK 1223)",sma:"Polymer SMA — ЩМПА (ST RK 2373)",bitum:"Road bitumen (БНД, ПБВ)",crushed:"Crushed stone / gravel",sand:"Sand",powder:"Mineral filler",soil:"Subgrade soil",conc:"Cement concrete"}},
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
var MAT=["hot","cold","pma","sma","black","bitum","emul","crushed","sand","powder","shgps","soil","conc"];
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
var PERIODIC={a_shear:1,a_split:1,a_swell:1,a_rut:1,a_wlong:1,a_adhmix:1,a_homog:1,a_marsh:1,a_frost:1,b_fraass:1,b_rtfot:1,b_flash:1,g_crush:1,g_la:1,g_dens:1,g_frost:1,p_por:1,p_swell:1,p_bitcap:1};

/* ---------------- calculations with the user's numbers ---------------- */
/* g(r,c) = number in row r, column c of the readings table (same shape as the method's example table) */
function avg(a){a=a.filter(isFinite);return a.length?a.reduce(function(s,x){return s+x},0)/a.length:NaN}
var SWK=[0.10,0.12,0.15,0.20,0.25,0.30,0.35,0.40,0.45,0.50,0.55,0.60,0.65,0.70,0.75,0.80,0.85,0.90,0.95,1.00,1.05,1.10,1.15,1.20,1.25,1.30,1.35,1.40,1.45,1.50],SWG=[1.13,1.36,1.70,2.26,2.83,3.39,3.96,4.53,5.09,5.66,6.23,6.80,7.36,7.93,8.50,9.06,9.63,10.20,10.76,11.33,11.90,12.46,13.03,13.85,14.17,14.74,15.35,15.87,16.43,17.0];
function swellTab(k){if(!isFinite(k))return NaN;if(k<=SWK[0])return SWG[0]*k/SWK[0];for(var i=1;i<SWK.length;i++)if(k<=SWK[i])return SWG[i-1]+(SWG[i]-SWG[i-1])*(k-SWK[i-1])/(SWK[i]-SWK[i-1]);return SWG[SWG.length-1]}
function rowAvg(g,r){var v=[1,2,3].map(function(c){return g(r,c)}).filter(isFinite);return v.length?avg(v):g(r,4)}
function kRatio(g,lab,key){var a=rowAvg(g,0),b=rowAvg(g,1),k=b/a,o=[[String(g.lab(0)).split(",")[0],"= "+fmt(a,2)+" MPa"],[String(g.lab(1)).split(",")[0],"= "+fmt(b,2)+" MPa"],[lab,fmt(b,2)+" / "+fmt(a,2)+" = "+fmt(k,2),1]];if(key){o.v={};o.v[key]=k}return o}
function col(g,c){var a=[];for(var r=0;r<g.R;r++)a.push(g(r,c));return a}
function rowv(g,r){var a=[];for(var c=1;c<g.C;c++)a.push(g(r,c));return a}
var CALC={
 a_dens:function(g,p){var rw=num(p.rw)||1,o=[],v=[];for(var r=0;r<g.R;r++){var x=g(r,1)*rw/(g(r,3)-g(r,2));v.push(x);o.push(["№"+(r+1),"ρm = "+fmt(x,3)+" g/cm³"])}
  var s=Math.max.apply(null,v.filter(isFinite))-Math.min.apply(null,v.filter(isFinite));o.push(["Ø","ρm = "+fmt(avg(v),2)+" g/cm³",1]);if(isFinite(s))o.push(["Δ",fmt(s,3)+(s<=0.02?" ≤ 0,02 ✓":" > 0,02 ✕")]);return o},
 a_wsat:function(g){var o=[],v=[];for(var r=0;r<g.R;r++){var x=(g(r,4)-g(r,1))/(g(r,2)-g(r,3))*100;v.push(x);o.push(["№"+(r+1),"W = "+fmt(x,2)+" %"])}o.push(["Ø","W = "+fmt(avg(v),1)+" %",1]);o.v={W:avg(v)};return o},
 a_swell:function(g){var o=[],v=[];for(var r=0;r<g.R;r++){var v0=g(r,1)-g(r,2),x=((g(r,3)-g(r,4))-v0)/v0*100;v.push(x);o.push(["№"+(r+1),"Н = "+fmt(x,2)+" %"])}o.push(["Ø","Н = "+fmt(avg(v),1)+" %",1]);return o},
 a_comp:function(g,p){var d=num(p.d)/10,F=Math.PI*d*d/4,o=[["F","π·"+fmt(d,2)+"²/4 = "+fmt(F,2)+" cm²"]];for(var r=0;r<g.R;r++){var R=rowv(g,r).map(function(P){return P*1000/F/100});o.push([String(g.lab(r)),R.map(function(x){return fmt(x,2)}).join(" · ")+" → R = "+fmt(avg(R),1)+" MPa",1]);var tl=parseInt(String(g.lab(r)),10);if(tl===50||tl===20||tl===0){o.v=o.v||{};o.v["R"+tl]=avg(R)}}return o},
 a_wres:function(g,p){var d=num(p.d)/10,F=Math.PI*d*d/4,R=[];for(var r=0;r<g.R;r++)R.push(avg(rowv(g,r).map(function(P){return P*1000/F/100})));
  var o=[["R20",fmt(R[0],2)+" MPa"],["Rw",fmt(R[1],2)+" MPa"],["R15",fmt(R[2],2)+" MPa"],["Kw","Rw / R20 = "+fmt(R[1]/R[0],2),1],["Kw.дл","R15 / R20 = "+fmt(R[2]/R[0],2),1]];o.v={Kw:R[1]/R[0],Kwl:R[2]/R[0],R20:R[0],Rw:R[1],Rl:R[2]};return o},
 a_split:function(g){var o=[],v=[];for(var r=0;r<g.R;r++){var x=g(r,1)*1000/(g(r,2)*g(r,3))/100;v.push(x);o.push(["№"+(r+1),"Rp = "+fmt(x,2)+" MPa"])}o.push(["Ø","Rp = "+fmt(avg(v),1)+" MPa",1]);o.v={Rp:avg(v)};return o},
 a_bind:function(g){var o=[],a=[],b=[];for(var r=0;r<g.R;r++){var q=(g(r,1)-g(r,2))/g(r,2)*100,m=(g(r,1)-g(r,2))/g(r,1)*100;a.push(q);b.push(m);o.push(["№"+(r+1),"Б = "+fmt(q,2)+" % · Бсм = "+fmt(m,2)+" %"])}
  o.push(["Ø","Б = "+fmt(avg(a),2)+" % · Бсм = "+fmt(avg(b),2)+" %",1]);return o},
 a_marsh:function(g){var o=(function(g){var S=[],F=[];for(var r=0;r<g.R;r++){S.push(g(r,2)*g(r,3));F.push(g(r,4))}var s=avg(S),f=avg(F);return[["S'",S.map(function(x){return fmt(x,2)}).join(" · ")],["S","= "+fmt(s,1)+" kN",1],["F","= "+fmt(f,1)+" mm",1],["MQ","= "+fmt(s/f,2)+" kN/mm",1]]})(g),S=[],F=[];for(var r=0;r<g.R;r++){S.push(g(r,2)*g(r,3));F.push(g(r,4))}o.v={MS:avg(S),MF:avg(F),MQ:avg(S)/avg(F)};return o},
 a_drain:function(g){if(g.C<4){var y=(g(2,1)-g(0,1))/g(1,1)*100,o1=[["Д","("+fmt(g(2,1),2)+" − "+fmt(g(0,1),2)+") / "+fmt(g(1,1),1)+" · 100 = "+fmt(y,2)+" %",1]];o1.v={B:y};return o1}
  var o=[],v=[];for(var r=0;r<g.R;r++){var x=(g(r,3)-g(r,1))/(g(r,2)-g(r,1))*100;if(!isFinite(x))continue;v.push(x);o.push(["№"+(r+1),"B = ("+fmt(g(r,3),2)+" − "+fmt(g(r,1),2)+") / ("+fmt(g(r,2),2)+" − "+fmt(g(r,1),2)+") · 100 = "+fmt(x,2)+" %"])}
  var sp=v.length>1?Math.max.apply(null,v)-Math.min.apply(null,v):NaN;o.push(["Ø","B = "+fmt(avg(v),2)+" %",1]);if(isFinite(sp))o.push(["Δ",fmt(sp,2)+" %"+(sp<=0.05?" ≤ 0,05 ✓":" > 0,05 ✕")]);o.v={B:avg(v)};return o},
 b_pen:function(g){var o=[];o.v={};for(var r=0;r<g.R;r++){var v=rowv(g,r).filter(isFinite);if(!v.length)continue;var a=avg(v),tl=parseInt(String(g.lab(r)),10);o.push([String(g.lab(r)),"П = "+fmt(a,0)+" · Δ = "+fmt(Math.max.apply(null,v)-Math.min.apply(null,v),0),1]);if(tl===25||tl===0)o.v["P"+tl]=a}return o},
 b_rb:function(g){var v=col(g,1).filter(isFinite),sp=Math.max.apply(null,v)-Math.min.apply(null,v),o=[["T","= "+fmt(avg(v),1)+" °C",1],["Δ",fmt(sp,1)+" °C"+(sp<=1?" ≤ 1 ✓":" > 1 ✕")]];o.v={KiSh:avg(v)};return o},
 b_duct:function(g){var o=[];o.v={};for(var r=0;r<g.R;r++){var v=rowv(g,r).filter(isFinite);if(!v.length)continue;var tl=parseInt(String(g.lab(r)),10);o.push([String(g.lab(r)),"D = "+fmt(avg(v),1)+" cm",1]);if(tl===25||tl===0)o.v["D"+tl]=avg(v)}return o},
 b_elast:function(g){var v=col(g,1).filter(isFinite).map(function(x){return(20-x)/20*100}),o=[["Э",v.map(function(x){return fmt(x,0)}).join(" · ")+" → "+fmt(avg(v),0)+" %",1]];o.v={Elast:avg(v)};return o},
 b_adh:function(g){var v=col(g,1).filter(isFinite);if(g.C===2&&!/балл|point/i.test(String(g.lab(0)))&&v.length===1&&g.R===1&&isFinite(g(0,0))&&g(0,0)>5)return[["S",fmt(g(0,1)/g(0,0)*100,0)+" %",1]];
  var c={},best=null;v.forEach(function(x){c[x]=(c[x]||0)+1});Object.keys(c).forEach(function(k){if(best==null||c[k]>c[best]||c[k]===c[best]&&+k>+best)best=k});var same=Object.keys(c).length===1,r=best==null?NaN:+best;
  var o=[["n",String(v.length)],[same?"=":"≠",Object.keys(c).sort().map(function(k){return k+"×"+c[k]}).join(" · ")],["→",fmt(r,0)+(same?"":" (12 · ?)"),1]];o.v={adh:r};return o},
 b_fraass:function(g){var v=col(g,1).filter(isFinite),o=[["Tхр",v.map(function(x){return fmt(x,0)}).join(" · ")+" → "+fmt(avg(v),1)+" °C",1]];o.v={Fr:avg(v)};return o},
 b_flash:function(g){var t=g(0,1),p=g(1,1),T=isFinite(p)?t+0.25*(101.3-p):t,o=[["Tвсп",fmt(t,0)+" + 0,25 · (101,3 − "+fmt(p,1)+") = "+fmt(T,0)+" °C",1]];o.v={flash:T};return o},
 b_rtfot:function(g){var dm=(g(0,2)-g(0,1))/g(0,1)*100,pr=g(1,2)/g(1,1)*100,dt=g(2,2)-g(2,1),o=[["Δm",fmt(dm,2)+" %",1],["Пост",fmt(pr,0)+" %",1],["ΔTразм",fmt(dt,1)+" °C",1]];o.v={dm:Math.abs(dm),Pres:pr,dKiSh:dt};return o},
 b_pi:function(g){var P=g(0,1),T=g(1,1),A=(Math.log10(800)-Math.log10(P))/(T-25),I=30/(1+50*A)-10,o=[["A",fmt(A,5)],["ИП","30 / (1 + 50 · "+fmt(A,5)+") − 10 = "+fmt(I,2),1]];o.v={PI:I};return o},
 b_visc:function(g){var v=[];for(var r=0;r<g.R;r++){var x=g(r,1)*g(r,2);if(isFinite(x))v.push(x)}var a=avg(v),sp=v.length>1?Math.abs(v[0]-v[1])/a*100:NaN,o=[["η",v.map(function(x){return fmt(x,1)}).join(" · ")+" → "+fmt(a,1)+" Pa·s",1]];if(isFinite(sp))o.push(["Δ",fmt(sp,1)+" %"+(sp<=6?" ≤ 6 ✓":" > 6 ✕")]);o.v={visc:a};return o},
 e_break:function(g){var v=[];for(var r=0;r<g.R;r++){var x=(g(r,3)-g(r,2))/(g(r,2)-g(r,1))*100;if(isFinite(x))v.push(x)}var a=avg(v),o=[["Ир",v.map(function(x){return fmt(x,0)}).join(" · ")+" → "+fmt(a,0),1]];o.v={idx:a};return o},
 e_bind:function(g){var v=[];for(var r=0;r<g.R;r++){var x=(g(r,3)-g(r,1))/(g(r,2)-g(r,1))*100;if(isFinite(x))v.push(x)}var a=avg(v),sp=v.length>1?Math.max.apply(null,v)-Math.min.apply(null,v):NaN,o=[["Мб",v.map(function(x){return fmt(x,1)}).join(" · ")+" → "+fmt(a,1)+" %",1]];if(isFinite(sp))o.push(["Δ",fmt(sp,1)+(sp<=0.5?" ≤ 0,5 ✓":" > 0,5 ✕")]);o.v={Bind:a};return o},
 e_sieve:function(g){var A=[],B=[];for(var r=0;r<g.R;r++){var x=(g(r,2)-g(r,1))/g(r,3)*100;if(!isFinite(x))continue;(/7/.test(String(g.lab(r)))?B:A).push(x)}var o=[];o.v={};if(A.length){o.push(["H",A.map(function(x){return fmt(x,2)}).join(" · ")+" → "+fmt(avg(A),2)+" %",1]);o.v.H=avg(A)}if(B.length){o.push(["H₇",B.map(function(x){return fmt(x,2)}).join(" · ")+" → "+fmt(avg(B),2)+" %",1]);o.v.H7=avg(B)}return o},
 e_strat:function(g,p){var V=num(p.V)||100,S=0;for(var r=0;r<g.R;r++){var x=g(r,1);if(isFinite(x))S+=x}var a=S/(7*V)*100,o=[["РА",fmt(S,1)+" / (7 · "+fmt(V,0)+") · 100 = "+fmt(a,1)+" %",1]];o.v={PA:a};return o},
 e_adh:function(g){var x=g(0,1),o=[["S",fmt(x,0)+" %",1]];o.v={adhE:x};return o},
 e_ph:function(g){var v=col(g,1).filter(isFinite),o=[["pH",v.map(function(x){return fmt(x,1)}).join(" · ")+" → "+fmt(avg(v),1),1]];o.v={pH:avg(v)};return o},
 s_swell:function(g,p){var K=[];for(var r=0;r<g.R;r++){var x=(g(r,2)-g(r,1))/g(r,1);if(isFinite(x))K.push(x)}var k=avg(K),G=swellTab(k),A=num(p.A),P=A*G/100,o=[["K",K.map(function(x){return fmt(x,2)}).join(" · ")+" → "+fmt(k,2)],["Г","= "+fmt(G,2)+" %"],["Пгл",fmt(A,1)+" · "+fmt(G,2)+" / 100 = "+fmt(P,2)+" %",1]];o.v={clay:P};return o},
 g_mixgrad:function(g,p){var m=num(p.m),S=0,o=[];o.v={};for(var r=0;r<g.R;r++){var x=g(r,1);if(!isFinite(x))continue;S+=x;var A=S/m*100,lab=String(g.lab(r)).replace(".",",");o.push([lab,"a = "+fmt(x/m*100,1)+" % · A = "+fmt(A,1)+" %"]);o.v["A"+lab]=A}return o},
 p_grain:function(g,p){var m=num(p.m),S=0,o=[];o.v={};for(var r=0;r<g.R;r++){var x=g(r,1);if(!isFinite(x))continue;S+=x;var P=(m-S)/m*100,lab=String(g.lab(r)).replace(".",",");o.push([lab,"П = "+fmt(P,1)+" %",1]);var k={"1,25":"p125","0,315":"p0315","0,071":"p0071"}[lab];if(k)o.v[k]=P}return o},
 p_por:function(g){var m=g(0,1),d=g(1,1),h=g(2,1),rho=g(3,1),V=Math.PI*d*d/4*h,rm=m/V,P=(1-rm/rho)*100,o=[["V","= "+fmt(V,2)+" cm³"],["ρm","= "+fmt(rm,3)+" g/cm³"],["Vпор","= "+fmt(P,1)+" %",1]];o.v={por:P};return o},
 p_swell:function(g){var v=[];for(var r=0;r<g.R;r++){var x=((g(r,3)-g(r,4))-(g(r,1)-g(r,2)))/(g(r,1)-g(r,2))*100;if(isFinite(x))v.push(x)}var o=[["Н",v.map(function(x){return fmt(x,2)}).join(" · ")+" → "+fmt(avg(v),1)+" %",1]];o.v={sw:avg(v)};return o},
 p_bitcap:function(g){var V=g(0,1),M=g(1,1),B=M/V*100,o=[["Бе",fmt(M,2)+" / "+fmt(V,1)+" · 100 = "+fmt(B,0),1]];o.v={bc:B};return o},
 g_wash:function(g){return[["Пот",fmt((g(0,1)-g(1,1))/g(0,1)*100,2)+" %",1]]},
 s_wash:function(g){return[["Пот",fmt((g(0,1)-g(1,1))/g(0,1)*100,2)+" %",1]]},
 g_flaky:function(g){var x=g(1,1)/g(0,1)*100,o=[["Л",fmt(x,1)+" %",1]];o.v={flaky:x};return o},
 g_la:function(g){return[["LA",fmt((g(0,1)-g(1,1))/g(0,1)*100,1)+" %",1]]},
 g_crush:function(g){var v=[];for(var r=0;r<g.R;r++)v.push((g(r,1)-g(r,2))/g(r,1)*100);return[["Др",v.map(function(x){return fmt(x,1)}).join(" · ")+" → "+fmt(avg(v),1)+" %",1]]},
 g_bulk:function(g){var v=[];for(var r=0;r<g.R;r++)v.push((g(r,2)-g(r,1))/g(r,3)*1000);return[["ρн",v.map(function(x){return fmt(x,0)}).join(" · ")+" → "+fmt(avg(v),0)+" kg/m³",1]]},
 s_se:function(g){var v=[];for(var r=0;r<g.R;r++)v.push(g(r,2)/g(r,1)*100);return[["SE",v.map(function(x){return fmt(x,1)}).join(" · ")+" → "+fmt(avg(v),0),1]]},
 so_moist:function(g){var v=[];for(var r=0;r<g.R;r++)v.push((g(r,2)-g(r,3))/(g(r,3)-g(r,1))*100);return[["W",v.map(function(x){return fmt(x,2)}).join(" · ")+" → "+fmt(avg(v),1)+" %",1]]},
 so_kcomp:function(g){var o=[];for(var r=0;r<g.R;r++){var k=g(r,1)/g(r,2);o.push(["№"+(r+1),"Ky = "+fmt(k,2)+(k>=0.95?" ✓":" ✕ (< 0,95)")])}return o},
 c_cube:function(g,p){var a=num(p.alpha)||1,v=[];for(var r=0;r<g.R;r++)v.push(a*g(r,1)*1000/(g(r,2)*g(r,2)));return[["R",v.map(function(x){return fmt(x,1)}).join(" · ")+" → "+fmt(avg(v),1)+" MPa",1]]},
 c_slump:function(g){return[["ОК",fmt(Math.round(avg(col(g,1))),0)+" cm",1]]},
 f_core:function(g,p){var rl=num(p.rlab),hp=num(p.hpr),o=[],K=[];for(var r=0;r<g.R;r++){var k=g(r,1)/rl;if(isFinite(k))K.push(k);o.push(["№"+(r+1),"Ky = "+fmt(k,2)+" · Δh = "+fmt(g(r,2)-hp,0)+" mm"])}if(K.length){o.push(["min","Ky = "+fmt(Math.min.apply(null,K),2),1]);o.v={Ky:Math.min.apply(null,K)}}return o},
 a_por:function(g){var rm=g(0,1),rt=g(1,1),rmin=g(2,1),q=g(3,1),V=(1-rm/rt)*100,mm=rm*100/(100+q),VM=(1-mm/rmin)*100;var o=[["Vост","(1 − "+fmt(rm,3)+" / "+fmt(rt,3)+") · 100 = "+fmt(V,1)+" %",1],["ρmᵐⁱⁿ",fmt(rm,3)+" · 100 / (100 + "+fmt(q,1)+") = "+fmt(mm,3)+" g/cm³"],["Vмин","(1 − "+fmt(mm,3)+" / "+fmt(rmin,3)+") · 100 = "+fmt(VM,1)+" %",1]];o.v={Vres:V,VMA:VM};return o},
 a_shear:function(g,p){var d=num(p.d)/10,F=Math.PI*d*d/4,Ac=[],Am=[],Pc=[],n=g.R/2;for(var r=0;r<g.R;r++){var A=g(r,1)*g(r,2)/2;if(!isFinite(A))continue;if(r<n){Ac.push(A);Pc.push(g(r,1))}else Am.push(A)}
  var ac=avg(Ac),am=avg(Am),tg=3*(am-ac)/(3*am-2*ac),Rc=avg(Pc)*1000/F/100,C=(3-2*tg)*Rc/6;
  var o=[["Ac",Ac.map(function(x){return fmt(x,2)}).join(" · ")+" → "+fmt(ac,2)+" J"],["Am",Am.map(function(x){return fmt(x,2)}).join(" · ")+" → "+fmt(am,2)+" J"],["tg φ","3·("+fmt(am,2)+" − "+fmt(ac,2)+") / (3·"+fmt(am,2)+" − 2·"+fmt(ac,2)+") = "+fmt(tg,2),1],["Rс","P / F = "+fmt(Rc,2)+" MPa"],["Cл","(1/6)·(3 − 2·"+fmt(tg,3)+")·"+fmt(Rc,2)+" = "+fmt(C,2)+" MPa",1]];o.v={tg:tg,C:C};return o},
 a_wlong:function(g){return kRatio(g,"Kвд","Kwl")},a_wacc:function(g){return kRatio(g,"Kву",null)},a_wacc60:function(g){return kRatio(g,"Kву'","Kwl")},
 a_frost:function(g){var a=rowAvg(g,0),b=rowAvg(g,1),x=(a-b)/a*100;return[["Rв","= "+fmt(a,2)+" MPa"],["Rм","= "+fmt(b,2)+" MPa"],["ΔR","("+fmt(a,2)+" − "+fmt(b,2)+") / "+fmt(a,2)+" · 100 = "+fmt(x,1)+" %",1]]},
 a_cake:function(g){var v=rowv(g,0).filter(isFinite),sp=Math.max.apply(null,v)-Math.min.apply(null,v),o=[["N",v.map(function(x){return fmt(x,0)}).join(" · ")+" → "+fmt(avg(v),0),1],["Δ",fmt(sp,0)+(sp<=4?" ≤ 4 ✓":" > 4 ✕")]];o.v={N:avg(v)};return o},
 a_homog:function(g){var v=col(g,1).filter(isFinite),n=v.length,m=avg(v),q=0;v.forEach(function(x){q+=(x-m)*(x-m)});var sd=Math.sqrt(q/(n-1)),cv=sd/m;
  var o=[["n",String(n)+(n<20?" (< 20!)":"")],["X̄","= "+fmt(m,3)],["Sn","= "+fmt(sd,3)],["Cv","Sn / X̄ = "+fmt(cv,2),1]];o.v={Cv:cv};return o},
 a_mixtemp:function(g){var v=[];for(var r=0;r<g.R;r++)v=v.concat(rowv(g,r).filter(isFinite));var o=[["T","= "+fmt(avg(v),0)+" °C",1],["min / max",fmt(Math.min.apply(null,v),0)+" / "+fmt(Math.max.apply(null,v),0)+" °C"]];o.v={T:avg(v)};return o},
 a_pavtemp:function(g){var v=rowv(g,0).filter(isFinite);return[["T",v.map(function(x){return fmt(x,1)}).join(" · ")+" → "+fmt(avg(v),1)+" °C",1]]},
 a_tsr:function(g,p){var d=num(p.d),G={};for(var r=0;r<g.R;r++){var S=2000*g(r,3)/(Math.PI*g(r,2)*d);if(!isFinite(S))continue;var k=String(g(r,1));(G[k]=G[k]||[]).push(S)}
  var s1=avg(G["1"]||[]),s2=avg(G["2"]||[]);return[["S₁","= "+fmt(s1,1)+" kPa"],["S₂","= "+fmt(s2,1)+" kPa"],["TSR","S₂ / S₁ = "+fmt(s2/s1,2),1]]},
 a_bend:function(g,p){var b=num(p.b),h=num(p.h),l=num(p.l),o=[],R=[],e=[],E=[];for(var r=0;r<g.R;r++){var P=g(r,1),f=g(r,2);if(!isFinite(P))continue;R.push(3*P*l/(2*b*h*h)/100);e.push(6*f*h/(l*l));E.push(P*l*l*l/100/(4*f*b*h*h*h))}
  return[["Rизг",R.map(function(x){return fmt(x,2)}).join(" · ")+" → "+fmt(avg(R),2)+" MPa",1],["εпр",fmt(avg(e),4),1],["E",fmt(avg(E),0)+" MPa",1]]}
};
var PARAMS={a_dens:[["rw","ρw, g/cm³","1.00"]],a_comp:[["d","d, mm","71.4"]],a_wres:[["d","d, mm","71.4"]],a_shear:[["d","d, mm","71.4"]],e_strat:[["V","V, ml","100"]],s_swell:[["A","A (< 0,16 mm), %","8.0"]],g_mixgrad:[["m","m, g","10000"]],p_grain:[["m","m, g","50"]],a_tsr:[["d","d, mm","150"]],a_bend:[["b","b, cm","4"],["h","h, cm","4"],["l","l, cm","12"]],c_cube:[["alpha","α","0.95"]],f_core:[["rlab","ρm.lab, g/cm³","2.36"],["hpr","h proj., mm","50"]]};
/* send to calculation tabs */
var XFER={
 a_dens:["ab",function(S,g,p){for(var r=0;r<Math.min(3,g.R);r++){S.ab.w[r][0]=g.s(r,1);S.ab.w[r][2]=g.s(r,2);S.ab.w[r][1]=g.s(r,3)}if(p.rw)S.ab.rw=dot(p.rw);S.ab.mu="g"}],
 a_wsat:["ab",function(S,g){for(var r=0;r<Math.min(3,g.R);r++){S.ab.w[r]=[g.s(r,1),g.s(r,2),g.s(r,3),g.s(r,4)]}S.ab.mu="g"}],
 a_comp:["ab",function(S,g,p){for(var s=0;s<3;s++)for(var r=0;r<Math.min(3,g.R);r++)S.ab.p[s][r]=g.s(r,s+1);if(p.d)S.ab.d=dot(p.d);S.ab.lu="kN"}],
 a_wres:["ab",function(S,g,p){for(var s=0;s<3;s++){S.ab.p[s][1]=g.s(0,s+1);S.ab.p[s][3]=g.s(1,s+1)}if(p.d)S.ab.d=dot(p.d);S.ab.lu="kN"}],
 a_bind:["gr",function(S,g){S.bc.m0=g.s(0,1);S.bc.m1=g.s(0,2)}],
 a_drain:["gr",function(S,g){if(g.C<4){S.dr.m1=g.s(0,1);S.dr.m=g.s(1,1);S.dr.m2=g.s(2,1);return}var a=num(g.s(0,1)),b=num(g.s(0,2));S.dr.m1=g.s(0,1);S.dr.m=isFinite(a)&&isFinite(b)?String(Math.round((b-a)*100)/100):"";S.dr.m2=g.s(0,3)}],
 b_pen:["bit",function(S,g){S.bit.pen=[g.s(0,1),g.s(0,2),g.s(0,3)]}],
 b_rb:["bit",function(S,g){S.bit.kish=[g.s(0,1),g.s(1,1)]}],
 b_duct:["bit",function(S,g){S.bit.duct=[g.s(0,1),g.s(0,2),g.s(0,3)]}]
};

/* ---------------- exact material: selection, programmes, limits ---------------- */
var ASPHM={hot:1,cold:1,pma:1,sma:1};
var T2={
 ru:{selH:"Уточните материал",selHint:"Выберите как в рецепте или проекте — по этому подбираются испытания и нормы для проверки.",limH:"Нормы для вашего материала",limHint:"Результаты ваших испытаний будут сравниваться с этими значениями.",
  chkH:"Проверка по норме",ok:"соответствует",bad:"не соответствует",min:"не менее",max:"не более",noSpecs:"Таблицы норм ещё не загружены в базу — проверка появится после обновления методик.",change:"Изменить материал",
  f:{kind:"Вид",type:"Тип",mark:"Марка",size:"Крупность",zone:"Дорожно-климатическая зона",bit:"Битум",bin:"Вяжущее"},
  kind:{hd:"высокоплотный",dense:"плотный",por:"пористый",hpc:"высокопористый щебёночный",hps:"высокопористый песчаный"},
  size:{coarse:"крупнозернистый",fine:"мелкозернистый",sand:"песчаный"},zone:{"3":"III","45":"IV, V"},
  bit:{"35-50":"БНД, П25 35–50","51-70":"БНД, П25 51–70","71-100":"БНД, П25 71–100","101-130":"БНД, П25 101–130","131-200":"БНД, П25 131–200","mg131-200":"СГ/МГ, вязкость 131–200 с","70-130":"жидкий, вязкость 70–130 с","c131-200":"жидкий, вязкость 131–200 с"},
  bmp:{"35-50":"БМП, П25 35–50","51-70":"БМП, П25 51–70","71-100":"БМП, П25 71–100","101-130":"БМП, П25 101–130"},
  type:"тип",mark:"марка",zoneW:"зона",smaW:"ЩМПА",after:"После прогрева, R20 не менее (МПа): сухие {0}; водонасыщенные {1}; после длительного водонасыщения {2}.",
  k:{R50:"Прочность R50, МПа",R20:"Прочность R20, МПа",R0:"Прочность R0, МПа",Rw:"R20 водонасыщенных, МПа",Rl:"R20 после длит. водонасыщения, МПа",Kw:"Водостойкость",Kwl:"Водостойкость при длит. водонасыщении",tg:"tg φ",C:"Сцепление при сдвиге Cл, МПа",Rp:"Трещиностойкость Rр (0 °C), МПа",W:"Водонасыщение, %",Vres:"Остаточная пористость, %",VMA:"Пористость минеральной части, %",MS:"Устойчивость по Маршаллу, кН",MF:"Текучесть, мм",MQ:"Условная жёсткость, кН/мм",B:"Стекание вяжущего, %",Cv:"Коэффициент вариации Cv",T:"Температура смеси, °C",Ky:"Коэффициент уплотнения Ky",N:"Слеживаемость, ударов",rut:"Глубина колеи, мм",adh:"Сцепление битума со щебнем, балл",flaky:"Лещадность щебня, %"},
  kSite:{W:"Водонасыщение кернов, %",Vres:"Остаточная пористость кернов, %",T:"Температура в начале уплотнения, °C"}},
 fr:{selH:"Précise le matériau",selHint:"Choisis comme dans la recette ou le projet — cela fixe les essais et les normes de contrôle.",limH:"Normes pour ton matériau",limHint:"Les résultats de tes essais seront comparés à ces valeurs.",
  chkH:"Contrôle par rapport à la norme",ok:"conforme",bad:"non conforme",min:"au moins",max:"au plus",noSpecs:"Les tableaux de normes ne sont pas encore dans la base — le contrôle apparaîtra après la mise à jour des méthodes.",change:"Changer de matériau",
  f:{kind:"Catégorie",type:"Type",mark:"Grade (марка)",size:"Granularité",zone:"Zone climatique routière",bit:"Bitume",bin:"Liant"},
  kind:{hd:"très dense",dense:"dense",por:"poreux",hpc:"très poreux à gravillons",hps:"très poreux sableux"},
  size:{coarse:"gros grains",fine:"grains fins",sand:"sableux"},zone:{"3":"III","45":"IV, V"},
  bit:{"35-50":"БНД, pén. 35–50","51-70":"БНД, pén. 51–70","71-100":"БНД, pén. 71–100","101-130":"БНД, pén. 101–130","131-200":"БНД, pén. 131–200","mg131-200":"СГ/МГ, viscosité 131–200 s","70-130":"fluide, viscosité 70–130 s","c131-200":"fluide, viscosité 131–200 s"},
  bmp:{"35-50":"БМП, pén. 35–50","51-70":"БМП, pén. 51–70","71-100":"БМП, pén. 71–100","101-130":"БМП, pén. 101–130"},
  type:"type",mark:"grade",zoneW:"zone",smaW:"SMA polymère",after:"Après réchauffage, R20 au moins (MPa) : secs {0} ; saturés {1} ; après saturation longue {2}.",
  k:{R50:"Résistance R50, MPa",R20:"Résistance R20, MPa",R0:"Résistance R0, MPa",Rw:"R20 saturés, MPa",Rl:"R20 après saturation longue, MPa",Kw:"Tenue à l'eau",Kwl:"Tenue à l'eau (saturation longue)",tg:"tg φ",C:"Cohésion au cisaillement C, MPa",Rp:"Fendage Rр (0 °C), MPa",W:"Absorption d'eau, %",Vres:"Porosité résiduelle, %",VMA:"Vides du squelette minéral, %",MS:"Stabilité Marshall, kN",MF:"Fluage, mm",MQ:"Rigidité conventionnelle, kN/mm",B:"Égouttage du liant, %",Cv:"Coefficient de variation Cv",T:"Température du mélange, °C",Ky:"Coefficient de compactage Ky",N:"Mottage, coups",rut:"Profondeur d'ornière, mm",adh:"Adhésivité bitume–gravillon, points",flaky:"Gravillons plats, %"},
  kSite:{W:"Absorption d'eau des carottes, %",Vres:"Porosité résiduelle des carottes, %",T:"Température au début du compactage, °C"}},
 en:{selH:"Specify the material",selHint:"Choose as in the recipe or design — this sets the tests and the limits to check against.",limH:"Limits for your material",limHint:"Your test results will be compared with these values.",
  chkH:"Check against the standard",ok:"complies",bad:"does not comply",min:"at least",max:"at most",noSpecs:"The limit tables are not in the database yet — the check will appear after the methods update.",change:"Change material",
  f:{kind:"Kind",type:"Type",mark:"Grade (марка)",size:"Grain size",zone:"Road-climatic zone",bit:"Bitumen",bin:"Binder"},
  kind:{hd:"high-density",dense:"dense",por:"porous",hpc:"highly porous, crushed-stone",hps:"highly porous, sand"},
  size:{coarse:"coarse-grained",fine:"fine-grained",sand:"sand"},zone:{"3":"III","45":"IV, V"},
  bit:{"35-50":"БНД, pen 35–50","51-70":"БНД, pen 51–70","71-100":"БНД, pen 71–100","101-130":"БНД, pen 101–130","131-200":"БНД, pen 131–200","mg131-200":"СГ/МГ, viscosity 131–200 s","70-130":"liquid, viscosity 70–130 s","c131-200":"liquid, viscosity 131–200 s"},
  bmp:{"35-50":"БМП, pen 35–50","51-70":"БМП, pen 51–70","71-100":"БМП, pen 71–100","101-130":"БМП, pen 101–130"},
  type:"type",mark:"grade",zoneW:"zone",smaW:"Polymer SMA",after:"After reheating, R20 at least (MPa): dry {0}; saturated {1}; after long saturation {2}.",
  k:{R50:"Strength R50, MPa",R20:"Strength R20, MPa",R0:"Strength R0, MPa",Rw:"R20 saturated, MPa",Rl:"R20 after long saturation, MPa",Kw:"Water resistance",Kwl:"Water resistance (long saturation)",tg:"tan φ",C:"Shear cohesion C, MPa",Rp:"Splitting Rр (0 °C), MPa",W:"Water absorption, %",Vres:"Residual voids, %",VMA:"Voids in mineral aggregate, %",MS:"Marshall stability, kN",MF:"Flow, mm",MQ:"Marshall quotient, kN/mm",B:"Binder drainage, %",Cv:"Coefficient of variation Cv",T:"Mix temperature, °C",Ky:"Compaction coefficient Ky",N:"Caking, blows",rut:"Rut depth, mm",adh:"Bitumen–stone adhesion, points",flaky:"Flaky particles, %"},
  kSite:{W:"Water absorption of cores, %",Vres:"Residual voids of cores, %",T:"Temperature at start of compaction, °C"}}
};
function L2(){return T2[LANG]||T2.ru}
var MARKS={hd:["I"],A:["I","II"],"Б":["I","II","III"],"В":["II","III"],"Г":["I","II","III"],"Д":["II","III"],por:["I","II"],hpc:["I"],hps:["II"],
 "Бх":["I","II"],"Вх":["I","II"],"Гх":["I","II"],"Дх":["II"]};
var SIZES={hd:["fine"],A:["coarse","fine"],"Б":["coarse","fine"],"В":["fine"],"Г":["sand"],"Д":["sand"],por:["coarse","fine"],hpc:["coarse"],hps:["sand"]};
var BINS=["БНД 70/100","БНД 100/130","БНД 130/200","БМП 35/50","БМП 50/70","БМП 70/100","БМП 100/130"];
var SMAK=["8 (10)","11 (15)","16 (20)","22 (30)"];
function selDef(m){return m==="hot"?{kind:"dense",type:"Б",mark:"I",size:"fine",zone:"3",bit:"71-100"}:m==="cold"?{type:"Бх",mark:"I",bit:"70-130"}:m==="pma"?{type:"Б",size:"fine",bin:"БМП 70/100"}:{kind:"16 (20)",bit:"71-100"}}
function hotKey(x){return x.kind==="dense"?x.type:x.kind}
function selFix(m,x){if(SEL1[m])return sel2Fix(m,x);var d=selDef(m);x=x||{};for(var k in d)if(x[k]==null)x[k]=d[k];
 if(m==="hot"){var t=hotKey(x),mk=MARKS[t],sz=SIZES[t];if(mk.indexOf(x.mark)<0)x.mark=mk[0];if(sz.indexOf(x.size)<0)x.size=sz[0]}
 if(m==="cold"){if(MARKS[x.type].indexOf(x.mark)<0)x.mark=MARKS[x.type][0]}
 return x}
/* fields shown for each material: [field, options] */
function selFields(m,x){if(SEL1[m])return sel2Fields(m,x);var t=L2();
 if(m==="hot"){var k=hotKey(x),f=[["kind",["hd","dense","por","hpc","hps"].map(function(v){return[v,t.kind[v]]})]];
  if(x.kind==="dense")f.push(["type",["A","Б","В","Г","Д"].map(function(v){return[v,v==="A"?"А":v]})]);
  f.push(["mark",MARKS[k].map(function(v){return[v,v]})]);f.push(["size",SIZES[k].map(function(v){return[v,t.size[v]]})]);
  f.push(["zone",[["3",t.zone["3"]],["45",t.zone["45"]]]]);f.push(["bit",["35-50","51-70","71-100","101-130","131-200","mg131-200"].map(function(v){return[v,t.bit[v]]})]);return f}
 if(m==="cold")return[["type",["Бх","Вх","Гх","Дх"].map(function(v){return[v,v]})],["mark",MARKS[x.type].map(function(v){return[v,v]})],["bit",[["70-130",t.bit["70-130"]],["131-200",t.bit["c131-200"]]]]];
 if(m==="pma")return[["type",[["A","А"],["Б","Б"]]],["size",[["coarse",t.size.coarse],["fine",t.size.fine]]],["bin",BINS.map(function(v){return[v,v]})]];
 return[["kind",SMAK.map(function(v){return[v,t.smaW+"-"+v]})],["bit",["35-50","51-70","71-100","101-130"].map(function(v){return[v,t.bmp[v]]})]]}
function selDesc(m,x){if(x&&SEL1[m])return sel2Desc(m,x);if(!x||!ASPHM[m])return"";var t=L2(),a=[];
 if(m==="hot"){a.push(t.kind[x.kind]+(x.kind==="dense"?", "+t.type+" "+(x.type==="A"?"А":x.type):""));a.push(t.mark+" "+x.mark);a.push(t.size[x.size]);a.push(t.zoneW+" "+t.zone[x.zone]);a.push(t.bit[x.bit])}
 else if(m==="cold"){a.push(t.type+" "+x.type);a.push(t.mark+" "+x.mark);a.push(t.bit[x.bit==="131-200"?"c131-200":x.bit])}
 else if(m==="pma"){a.push(t.type+" "+(x.type==="A"?"А":x.type));a.push(t.size[x.size]);a.push(x.bin)}
 else{a.push(t.smaW+"-"+x.kind);a.push(t.bmp[x.bit])}
 return a.join(" · ")}
function progFor(m,p,x){var dense=m!=="hot"||x.kind==="hd"||x.kind==="dense",B=["b_pen","b_rb","b_duct","b_adh"],BP=["b_pen","b_rb","b_duct","b_elast","b_adh"],AG=["g_sieve","g_crush","g_flaky","s_sieve","p_grain"],
 SITE=["a_sample","a_mixtemp","f_core","a_dens","a_wsat","a_por","f_thick","f_ruler"],CORE=["a_form","a_dens","a_true","a_por","a_wsat","a_comp"];
 if(m==="hot"){if(p==="design")return B.concat(AG,CORE,["a_wres","a_wlong","a_adhmix"],dense?["a_shear","a_split"]:[],dense&&x.mark==="I"&&x.size!=="coarse"?["a_marsh"]:[]);
  if(p==="lot")return["a_sample","a_mixtemp"].concat(CORE,["a_wres","a_bind","a_grad","a_wlong","a_adhmix","a_homog"],dense?["a_shear","a_split"]:[]);return SITE}
 if(m==="cold"){if(p==="design")return["g_sieve","s_sieve","p_grain"].concat(CORE,["a_wres","a_cake"]);
  if(p==="lot")return["a_sample","a_mixtemp","a_form","a_dens","a_wsat","a_comp","a_bind","a_grad","a_cake","a_homog"];return["a_sample","f_core","a_dens","a_wsat","f_thick","f_ruler"]}
 if(m==="pma"){if(p==="design")return BP.concat(AG,CORE,["a_shear","a_split","a_wlong","a_adhmix","a_marsh","a_rut"]);
  if(p==="lot")return["a_sample","a_mixtemp"].concat(CORE,["a_bind","a_grad","a_shear","a_split","a_wlong","a_adhmix","a_homog"]);return SITE}
 if(p==="design")return BP.concat(AG,CORE,["a_shear","a_split","a_wlong","a_drain","a_rut"]);
 if(p==="lot")return["a_sample","a_mixtemp"].concat(CORE,["a_bind","a_grad","a_drain","a_shear","a_split","a_wlong","a_homog"]);return SITE}
/* limits for a programme session: {key:{min,max}} (+ _note) */
function LIM(s){if(s&&s.sel&&SEL1[s.mat])return DATA&&DATA.specs?LIM2(s):null;var SP=DATA&&DATA.specs;if(!SP||!s||!s.sel||!ASPHM[s.mat])return null;var x=s.sel,m=s.mat,site=s.purpose==="site",o={},z=x.zone==="45"?1:0;
 function set(k,a,b){if(a==null&&b==null)return;o[k]={min:a==null?null:a,max:b==null?null:b}}
 function pick(t,k){return t&&t[k]}
 if(m==="hot"){var H=SP.hot,t=hotKey(x),mk=x.mark,hd=x.kind==="hd",dense=hd||x.kind==="dense";
  if(dense){var r=pick(H.R50[t],mk);if(r)set("R50",r[z]);set("R20",H.R20[mk]);r=H.R0[mk];if(r)set("R0",null,r[z]);
   r=pick(hd?H.Kw.hd:H.Kw.dense,mk);if(r)set("Kw",r[z]);r=pick(hd?H.Kwl.hd:H.Kwl.dense,mk);if(r)set("Kwl",r[z]);
   r=pick(H.tg[t],mk);if(r)set("tg",r[z]);r=pick(H.C[t],mk);if(r)set("C",r[z]);r=H.Rp0[mk];if(r)set("Rp",r[z][0],r[z][1]);
   if(mk==="I"&&x.size!=="coarse"){set("MS",H.marsh.S[0],H.marsh.S[1]);set("MF",H.marsh.F[0],H.marsh.F[1]);set("MQ",H.marsh.MQ)}}
  else{var Q=H.porous;if(x.size!=="coarse"){set("R50",Q.R50[mk]);set("Kw",Q.Kw[mk])}set("Kwl",Q.Kwl[mk])}
  var w=H.W[t];if(w){if(site)set("W",null,w[2]!=null?w[2]:w[1]);else set("W",w[0],w[1])}
  var v=H.Vres[hd?"hd":x.kind==="dense"?"dense":x.kind==="por"?"por":"hp"];if(v){if(site)set("Vres",null,v[2]);else set("Vres",v[0],v[1])}
  if(!site){var vm=H.VMA[t];if(vm)set("VMA",vm[0],vm[1]);set("Cv",null,H.Cv[mk]);set("adh",H.adhB)}
  set("Ky",H.Ky[t]);var tt=H.T[x.bit];if(tt){tt=site?tt[1]:tt[0];set("T",tt[0],tt[1])}}
 else if(m==="cold"){var C=SP.cold,a=pick(C.R20[x.mark],x.type);if(a){set("R20",a[0]);set("Rw",a[1]);set("Rl",a[2]);o._note=L2().after.replace("{0}",fmt(a[3],1)).replace("{1}",fmt(a[4],1)).replace("{2}",fmt(a[5],1))}
  if(site)set("W",null,C.W[2]);else{set("W",C.W[0],C.W[1]);set("Vres",C.Vres[0],C.Vres[1]);set("VMA",null,C.VMA[x.type]);set("N",null,C.cake);set("Cv",null,C.CvW)}
  set("Ky",C.Ky);if(site)set("T",C.Tlay);else{var ct=C.T[x.bit];if(ct)set("T",ct[0],ct[1])}}
 else if(m==="pma"){var P=SP.pma,ty=x.type;set("R50",P.R50[ty]);set("Rp",P.Rp0[0],P.Rp0[1]);set("tg",P.tg[ty]);set("C",P.C[ty]);set("Kwl",P.Kwl);set("rut",null,P.rut);
  set("MS",P.marsh.S[0],P.marsh.S[1]);set("MF",P.marsh.F[0],P.marsh.F[1]);set("MQ",P.marsh.MQ);var pw=P.W[ty];if(site)set("W",null,pw[2]);else{set("W",pw[0],pw[1]);set("Vres",P.Vres[0],P.Vres[1]);set("VMA",null,P.VMA);set("flaky",null,P.flaky[ty]);set("adh",P.adhB);var pt=P.T[x.bin];if(pt)set("T",pt[0],pt[1])}}
 else{var M=SP.sma;if(site){set("W",null,M.W[2]);set("Vres",null,M.Vres[2]);var st=M.T[x.bit];if(st)set("T",st[1])}
  else{set("VMA",M.VMA[0],M.VMA[1]);set("Vres",M.Vres[0],M.Vres[1]);set("W",M.W[0],M.W[1]);set("R20",M.R20);set("R50",M.R50);set("tg",M.tg);set("C",M.C);set("Rp",M.Rp0[0],M.Rp0[1]);set("Kwl",M.Kwl);set("rut",null,M.rut);set("B",null,M.drain);set("Cv",null,M.Cv);set("flaky",null,M.flaky);set("adh",M.adhB);var mt=M.T[x.bit];if(mt)set("T",mt[0][0],mt[0][1])}}
 return o}
var KTEST={P25:["b_pen"],P0:["b_pen"],KiSh:["b_rb"],D25:["b_duct"],D0:["b_duct"],visc:["b_visc"],Fr:["b_fraass"],flash:["b_flash"],PI:["b_pi"],dm:["b_rtfot"],Pres:["b_rtfot"],dKiSh:["b_rtfot"],Elast:["b_elast"],Bind:["e_bind"],H:["e_sieve"],H7:["e_sieve"],PA:["e_strat"],adhE:["e_adh"],pH:["e_ph"],idx:["e_break"],clay:["s_swell"],p125:["p_grain"],p0315:["p_grain"],p0071:["p_grain"],por:["p_por"],sw:["p_swell"],bc:["p_bitcap"],R50:["a_comp"],R20:["a_comp","a_wres"],R0:["a_comp"],Rw:["a_wres"],Rl:["a_wres"],Kw:["a_wres"],Kwl:["a_wres","a_wlong","a_wacc60"],tg:["a_shear"],C:["a_shear"],Rp:["a_split"],W:["a_wsat"],Vres:["a_por"],VMA:["a_por"],MS:["a_marsh"],MF:["a_marsh"],MQ:["a_marsh"],B:["a_drain"],Cv:["a_homog"],T:["a_mixtemp"],Ky:["f_core"],N:["a_cake"],rut:["a_rut"],adh:["b_adh"],flaky:["g_flaky"]};
var KDISP={T:0,N:0,adh:0,P25:0,P0:0,KiSh:1,D25:0,D0:1,visc:0,Fr:0,flash:0,PI:2,dm:2,Pres:0,dKiSh:1,Elast:0,Bind:1,H:2,H7:2,PA:1,adhE:0,pH:1,idx:0,clay:2,p125:1,p0315:1,p0071:1,por:1,sw:2,bc:0};
var KDEC={P25:0,P0:0,KiSh:0,D25:0,D0:1,visc:0,Fr:0,flash:0,PI:1,dm:1,Pres:0,dKiSh:0,Elast:0,Bind:1,H:2,H7:2,PA:1,adhE:0,pH:1,idx:0,clay:1,p125:0,p0315:0,p0071:0,por:0,sw:1,bc:0,R50:1,R20:1,R0:0,Rw:1,Rl:1,Kw:2,Kwl:2,tg:2,C:2,Rp:1,W:1,Vres:1,VMA:0,MS:0,MF:0,MQ:2,B:2,Cv:2,T:0,Ky:2,N:0,rut:1,adh:0,flaky:0};
function dec(n,k){var s=String(n),i=s.indexOf("."),d=i<0?0:s.length-i-1;return Math.max(d,KDEC[k]||0)}
function limTxt(q,k){if(q.min!=null&&q.max!=null)return fmt(q.min,dec(q.min,k))+" – "+fmt(q.max,dec(q.max,k));return q.min!=null?"≥ "+fmt(q.min,dec(q.min,k)):"≤ "+fmt(q.max,dec(q.max,k))}
function keyLab(k,site){var t=L2(),t3=L3();if(/^A\d/.test(k))return t3.k.A.replace("{0}",k.slice(1));return site&&t.kSite[k]||t.k[k]||t3.k[k]||k}
function limCard(s){var t=L2(),o=LIM(s);if(!o)return'<div class="card"><h3>'+esc(t.limH)+'</h3><p class="hint">'+esc(t.noSpecs)+'</p></div>';
 var ks=Object.keys(o).filter(function(k){return k.charAt(0)!=="_"&&(KTEST[k]||(/^A\d/.test(k)?["g_mixgrad"]:[])).some(function(id){return s.tests.indexOf(id)>=0})}),site=s.purpose==="site";if(!ks.length)return"";
 return'<div class="card"><h3>'+esc(t.limH)+'</h3><p class="hint">'+esc(t.limHint)+'</p><ul class="g-res g-lim">'+ks.map(function(k){return'<li><span>'+esc(keyLab(k,site))+'</span><span>'+esc(limTxt(o[k],k))+'</span></li>'}).join("")+'</ul>'+
  (o._note?'<p class="hint">'+esc(o._note)+'</p>':'')+'<p class="hint ln">'+esc(o._norm||(DATA.specs[s.mat]&&typeof DATA.specs[s.mat].norm==="string"?DATA.specs[s.mat].norm:""))+'</p></div>'}
function checks(s,out){var t=L2();if(!out||!out.v||!s||!s.sel)return"";var o=LIM(s);if(!o)return hasSel(s.mat)?'<p class="hint">'+esc(t.noSpecs)+'</p>':"";var site=s.purpose==="site",rows=[];
 Object.keys(out.v).forEach(function(k){var q=o[k],v=out.v[k];if(!q||!isFinite(v))return;var d=Math.max(q.min!=null?dec(q.min,k):0,q.max!=null?dec(q.max,k):0),r=Math.round(v*Math.pow(10,d))/Math.pow(10,d);
  var ok=(q.min==null||r>=q.min-1e-9)&&(q.max==null||r<=q.max+1e-9);rows.push('<li class="'+(ok?"ok":"bad")+'"><span>'+esc(keyLab(k,site))+'</span><span>'+esc(fmt(v,KDISP[k]!=null?KDISP[k]:/^A\d/.test(k)?1:Math.max(d,1)))+'</span><span>'+esc(limTxt(q,k))+'</span><b>'+(ok?"✓ "+esc(t.ok):"✕ "+esc(t.bad))+'</b></li>')});
 return rows.length?'<h3>'+esc(t.chkH)+'</h3><ul class="g-chk2">'+rows.join("")+'</ul>':""}

/* ---------------- stage 2: binders, emulsions, aggregates ---------------- */
var SEL1={bitum:1,emul:1,crushed:1,sand:1,powder:1,shgps:1,black:1};
function hasSel(m){return!!(ASPHM[m]||SEL1[m])}
var T3={
 ru:{start:"Начать программу испытаний",f:{bk:"Вид вяжущего",grade:"Марка",ek:"Вид эмульсии",et:"Тип и назначение",use:"Для чего применяется",rock:"Порода",clim:"Самый холодный месяц",pm:"Марка порошка",mix:"Номер смеси",blk:"Материал"},
  bk:{bnd:"БНД — битум нефтяной дорожный (СТ РК 1373)",bmp:"БМП — битум модифицированный полимером (СТ РК 2534)",mastic:"Мастика битумная (СТ РК 2367)"},ek:{an:"анионная (ЭБА, ЭБПА)",cat:"катионная (ЭБК, ЭБПК)"},
  rock:{ig:"изверженная / метаморфическая",sed:"осадочная",slag:"шлак",grav:"щебень из гравия"},clim:{lt30:"ниже −30 °C",m30m20:"от −30 до −20 °C",gt20:"выше −20 °C"},
  blk:{sh:"Щебень чёрный горячий",sc:"Щебень чёрный холодный",mhc:"Смесь чёрная горячая крупнозернистая",mhf:"Смесь чёрная горячая мелкозернистая",mc:"Смесь чёрная холодная"},
  noteCr:"Марка по дробимости не ниже {0}; потеря при истирании не более {1} %; морозостойкость не ниже {2}. Перевод дробимости Др в марку — по СТ РК 1284 / ГОСТ 8267.",noteSand:"Марка по прочности песка из отсевов дробления не ниже {0}.",
  noteBmp:"Эластичность после старения — не менее 50 %; падение КиШ после старения — не более 5 °C; стабильность к расслаиванию — не более 2 °C.",noteEm:"Смешиваемость: тип 1 — не смешивается; тип 2 — только с пористой смесью; тип 3 — с пористой и плотной. Остаточный битум — по марке исходного вяжущего (П25 отличается не более чем на 15 %).",
  noteSh:"Глина в комках — не более 20 % (основания) / 10 % (покрытия) от пылевидных и глинистых частиц; щебень из осадочных пород — марка по дробимости не ниже 300.",noteBc:"После прогрева: R20 не менее 1,2 МПа; Kw не менее 0,65; Kw длит. не менее 0,50.",noteStone:"Битума {0} %; все зёрна покрыты сплошной плёнкой; сцепление щебня с битумом — не ниже «удовлетворительно».",
  k:{P25:"Пенетрация при 25 °C, 0,1 мм",P0:"Пенетрация при 0 °C, 0,1 мм",KiSh:"Температура размягчения КиШ, °C",D25:"Растяжимость при 25 °C, см",D0:"Растяжимость при 0 °C, см",visc:"Динамическая вязкость 60 °C, Па·с",Fr:"Температура хрупкости, °C",flash:"Температура вспышки, °C",PI:"Индекс пенетрации",dm:"Изменение массы после прогрева, %",Pres:"Остаточная пенетрация, %",dKiSh:"Изменение КиШ после прогрева, °C",Elast:"Эластичность при 25 °C, %",
   Bind:"Вяжущее с эмульгатором, %",H:"Остаток на сите 0,63, %",H7:"Остаток на сите 0,63 через 7 сут, %",PA:"Расслоение за 7 сут, %",adhE:"Адгезия, % поверхности",pH:"pH",idx:"Индекс распада",clay:"Глинистые частицы (набухание), %",
   p125:"Мельче 1,25 мм, %",p0315:"Мельче 0,315 мм, %",p0071:"Мельче 0,071 мм, %",por:"Пористость порошка, %",sw:"Набухание с битумом, %",bc:"Битумоёмкость, г",A:"Полный остаток на сите {0} мм, %"}},
 fr:{start:"Lancer le programme d'essais",f:{bk:"Type de liant",grade:"Classe",ek:"Type d'émulsion",et:"Type et usage",use:"Utilisation",rock:"Roche",clim:"Mois le plus froid",pm:"Classe de filler",mix:"Numéro du mélange",blk:"Matériau"},
  bk:{bnd:"БНД — bitume routier (СТ РК 1373)",bmp:"БМП — bitume modifié polymère (СТ РК 2534)",mastic:"Mastic bitumineux (СТ РК 2367)"},ek:{an:"anionique (ЭБА, ЭБПА)",cat:"cationique (ЭБК, ЭБПК)"},
  rock:{ig:"éruptive / métamorphique",sed:"sédimentaire",slag:"laitier",grav:"concassé de gravier"},clim:{lt30:"sous −30 °C",m30m20:"de −30 à −20 °C",gt20:"au-dessus de −20 °C"},
  blk:{sh:"Gravillon noir à chaud",sc:"Gravillon noir à froid",mhc:"Mélange noir à chaud, gros grains",mhf:"Mélange noir à chaud, grains fins",mc:"Mélange noir à froid"},
  noteCr:"Grade de concassage au moins {0} ; perte d'usure au plus {1} % ; gel au moins {2}. Conversion de Др en grade — СТ РК 1284 / ГОСТ 8267.",noteSand:"Grade de résistance du sable de concassage au moins {0}.",
  noteBmp:"Élasticité après vieillissement — au moins 50 % ; baisse TBA après vieillissement — au plus 5 °C ; stabilité au stockage — au plus 2 °C.",noteEm:"Miscibilité : type 1 — ne se mélange pas ; type 2 — seulement au poreux ; type 3 — poreux et dense. Liant résiduel — selon la classe d'origine (pénétrabilité à ±15 %).",
  noteSh:"Argile en mottes — au plus 20 % (fondations) / 10 % (roulement) des fines ; gravillons sédimentaires — grade de concassage au moins 300.",noteBc:"Après réchauffage : R20 au moins 1,2 MPa ; Kw au moins 0,65 ; Kw long au moins 0,50.",noteStone:"Bitume {0} % ; tous les grains enrobés ; adhésivité au moins « satisfaisante ».",
  k:{P25:"Pénétrabilité à 25 °C, 0,1 mm",P0:"Pénétrabilité à 0 °C, 0,1 mm",KiSh:"Point de ramollissement TBA, °C",D25:"Ductilité à 25 °C, cm",D0:"Ductilité à 0 °C, cm",visc:"Viscosité dynamique 60 °C, Pa·s",Fr:"Point de fragilité Fraass, °C",flash:"Point d'éclair, °C",PI:"Indice de pénétrabilité",dm:"Variation de masse après chauffage, %",Pres:"Pénétrabilité résiduelle, %",dKiSh:"Variation TBA après chauffage, °C",Elast:"Retour élastique à 25 °C, %",
   Bind:"Liant avec émulsifiant, %",H:"Refus au tamis 0,63, %",H7:"Refus 0,63 après 7 j, %",PA:"Décantation 7 j, %",adhE:"Adhésivité, % de surface",pH:"pH",idx:"Indice de rupture",clay:"Argile (gonflement), %",
   p125:"Passant 1,25 mm, %",p0315:"Passant 0,315 mm, %",p0071:"Passant 0,071 mm, %",por:"Porosité du filler, %",sw:"Gonflement avec bitume, %",bc:"Capacité bitume, g",A:"Refus cumulé au tamis {0} mm, %"}},
 en:{start:"Start the test programme",f:{bk:"Binder type",grade:"Grade",ek:"Emulsion kind",et:"Type and use",use:"Used for",rock:"Rock",clim:"Coldest month",pm:"Filler grade",mix:"Mix number",blk:"Material"},
  bk:{bnd:"БНД — paving bitumen (ST RK 1373)",bmp:"БМП — polymer-modified bitumen (ST RK 2534)",mastic:"Bitumen mastic (ST RK 2367)"},ek:{an:"anionic (ЭБА, ЭБПА)",cat:"cationic (ЭБК, ЭБПК)"},
  rock:{ig:"igneous / metamorphic",sed:"sedimentary",slag:"slag",grav:"crushed gravel"},clim:{lt30:"below −30 °C",m30m20:"−30 to −20 °C",gt20:"above −20 °C"},
  blk:{sh:"Hot coated chippings",sc:"Cold coated chippings",mhc:"Hot coated mix, coarse",mhf:"Hot coated mix, fine",mc:"Cold coated mix"},
  noteCr:"Crushing grade at least {0}; abrasion loss at most {1} %; frost grade at least {2}. Converting Др to a grade — ST RK 1284 / GOST 8267.",noteSand:"Strength grade of crushed sand at least {0}.",
  noteBmp:"Elastic recovery after ageing — at least 50 %; softening point drop after ageing — at most 5 °C; storage stability — at most 2 °C.",noteEm:"Mixing: type 1 — does not mix; type 2 — open grading only; type 3 — open and dense. Residual binder — per the base grade (penetration within 15 %).",
  noteSh:"Clay lumps — at most 20 % (bases) / 10 % (surfacing) of the fines; sedimentary stone — crushing grade at least 300.",noteBc:"After reheating: R20 at least 1.2 MPa; Kw at least 0.65; long Kw at least 0.50.",noteStone:"Bitumen {0} %; all grains fully coated; stone–bitumen adhesion at least “satisfactory”.",
  k:{P25:"Penetration at 25 °C, 0.1 mm",P0:"Penetration at 0 °C, 0.1 mm",KiSh:"Softening point R&B, °C",D25:"Ductility at 25 °C, cm",D0:"Ductility at 0 °C, cm",visc:"Dynamic viscosity 60 °C, Pa·s",Fr:"Fraass breaking point, °C",flash:"Flash point, °C",PI:"Penetration index",dm:"Mass change after heating, %",Pres:"Retained penetration, %",dKiSh:"Softening point change after heating, °C",Elast:"Elastic recovery at 25 °C, %",
   Bind:"Binder with emulsifier, %",H:"Residue on 0.63 sieve, %",H7:"Residue on 0.63 after 7 d, %",PA:"Settlement over 7 d, %",adhE:"Adhesion, % of surface",pH:"pH",idx:"Breaking index",clay:"Clay (swelling), %",
   p125:"Finer than 1.25 mm, %",p0315:"Finer than 0.315 mm, %",p0071:"Finer than 0.071 mm, %",por:"Filler porosity, %",sw:"Swelling with bitumen, %",bc:"Bitumen capacity, g",A:"Cumulative residue on {0} mm sieve, %"}}
};
function L3(){return T3[LANG]||T3.ru}
var BND=["130/200","100/130","70/100","50/70","35/50","20/35"],BMPG=["35/50","50/70","70/100 I","70/100 II","100/130 I","100/130 II","130/150"],MAST=["МБГР","МБГПг","МБГЭ","МБГПх","МБПх","МБПг","МБППх","МБППг"];
var EMA=["ЭБА-1","ЭБПА-1","ЭБА-2","ЭБПА-2","ЭБА-3","ЭБПА-3"],EMC=["ЭБК-1 · подгрунтовка","ЭБК-1 · ямочный ремонт","ЭБПК-1 · ямочный ремонт","ЭБК-1 · ШПО","ЭБПК-1 · ШПО","ЭБК-2 · пропитка щебня","ЭБК-2 · подгрунтовка","ЭБК-2 · ямочный ремонт","ЭБПК-2 · ямочный ремонт","ЭБК-2 · ШПО","ЭБПК-2 · ШПО","ЭБК-3 · ЛЭМС","ЭБПК-3 · ЛЭМС","ЭБК-3 · ресайклинг","ЭБПК-3 · ресайклинг"];
var CRU=["I · А, высокоплотный","I · Б","I · Бх","I · Вх","I · пористый, высокопористый","II · А","II · Б","II · В","II · Бх","II · Вх","II · пористый, высокопористый","III · Б","III · В","ПМА · А","ПМА · Б","ЩМПА","Чёрный щебень · ШПО","Чёрный щебень · покрытие","Чёрный щебень · основание"];
var SNU=["I · А, Б, Бх, Вх, высокоплотный","I · Г, Гх","I · пористый, высокопористый","II · А, Б, Бх, В, Вх","II · Г, Д, Дх","II · пористый, высокопористый","III · Б, В","III · Г, Д","ЩМПА"];
var SHM=["С1","С2","С3","С4","С5","С6","С7","С8","С9","С10","С11","С12","С13"],SHSV=["120","80","40","20","10","5","2,5","0,63","0,16","0,05"];
function sel2Def(m){return m==="bitum"?{bk:"bnd",grade:"70/100"}:m==="emul"?{ek:"cat",et:"ЭБК-1 · ямочный ремонт"}:m==="crushed"?{use:"I · Б",rock:"ig",clim:"m30m20"}:m==="sand"?{use:"I · А, Б, Бх, Вх, высокоплотный"}:m==="powder"?{pm:"МП-1"}:m==="shgps"?{mix:"С6"}:{blk:"mhf"}}
function sel2Fix(m,x){var d=sel2Def(m);x=x||{};for(var k in d)if(x[k]==null)x[k]=d[k];
 if(m==="bitum"){var g=x.bk==="bnd"?BND:x.bk==="bmp"?BMPG:MAST;if(g.indexOf(x.grade)<0)x.grade=g[x.bk==="bnd"?2:x.bk==="bmp"?2:0]}
 if(m==="emul"){var e=x.ek==="an"?EMA:EMC;if(e.indexOf(x.et)<0)x.et=e[0]}return x}
function o2(a){return a.map(function(v){return[v,v]})}
function sel2Fields(m,x){var t=L3();
 if(m==="bitum")return[["bk",["bnd","bmp","mastic"].map(function(v){return[v,t.bk[v]]})],["grade",o2(x.bk==="bnd"?BND:x.bk==="bmp"?BMPG:MAST)]];
 if(m==="emul")return[["ek",["an","cat"].map(function(v){return[v,t.ek[v]]})],["et",o2(x.ek==="an"?EMA:EMC)]];
 if(m==="crushed")return[["use",o2(CRU)],["rock",["ig","sed","slag","grav"].map(function(v){return[v,t.rock[v]]})],["clim",["lt30","m30m20","gt20"].map(function(v){return[v,t.clim[v]]})]];
 if(m==="sand")return[["use",o2(SNU)]];if(m==="powder")return[["pm",o2(["МП-1","МП-2","МП-3"])]];if(m==="shgps")return[["mix",o2(SHM)]];
 return[["blk",["sh","sc","mhc","mhf","mc"].map(function(v){return[v,t.blk[v]]})]]}
function sel2Desc(m,x){var t=L3();if(m==="bitum")return(x.bk==="bnd"?"БНД ":x.bk==="bmp"?"БМП ":"")+x.grade;if(m==="emul")return x.et;
 if(m==="crushed")return x.use+" · "+t.rock[x.rock]+" · "+t.clim[x.clim];if(m==="sand")return x.use;if(m==="powder")return x.pm;if(m==="shgps")return x.mix;return t.blk[x.blk]}
function prog2(m,x){if(m==="bitum")return x.bk==="bnd"?["b_sample","b_pen","b_rb","b_duct","b_visc","b_fraass","b_flash","b_pi","b_rtfot","b_adh"]:x.bk==="bmp"?["b_sample","b_pen","b_rb","b_duct","b_elast","b_fraass","b_flash","b_rtfot","b_adh"]:["b_sample","b_pen","b_rb","b_fraass","b_elast","b_adh"];
 if(m==="emul")return["b_sample","e_mix"].concat(x.ek==="cat"?["e_break"]:[],["e_bind","e_sieve","e_strat","e_adh","e_transp","e_ph","b_pen","b_rb"]);
 if(m==="crushed")return["g_sample","g_sieve","g_wash","g_flaky","g_crush","g_la","g_frost","g_bulk","g_dens","b_adh"];
 if(m==="sand")return["s_sieve","s_wash","s_swell","s_se","g_bulk"];if(m==="powder")return["p_grain","p_por","p_swell","p_bitcap"];
 if(m==="shgps")return["g_sample","g_mixgrad","g_wash","g_crush","g_frost","g_flaky","so_atter","g_bulk"];
 if(x.blk==="sh"||x.blk==="sc")return["a_sample","a_mixtemp","a_bind","g_flaky","g_wash","b_adh"];
 return["a_sample","a_mixtemp","a_form","a_dens","a_wsat","a_comp","a_wres","a_adhmix","a_bind","a_grad"].concat(x.blk==="mc"?["a_cake"]:["a_wlong"])}
function LIM2(s){var SP=DATA&&DATA.specs,x=s.sel,m=s.mat,o={},t=L3();if(!SP||!SP[m]&&m!=="black")return null;
 function set(k,a,b){if(a==null&&b==null)return;o[k]={min:a==null?null:a,max:b==null?null:b}}
 if(m==="bitum"){var B=SP.bitum;o._norm=B.norm[x.bk];
  if(x.bk==="bnd"){var b=B.bnd,g=x.grade;set("P25",b.P25[g][0],b.P25[g][1]);set("P0",b.P0[g]);set("KiSh",b.KiSh[g]);set("D25",b.D25[g]);set("D0",b.D0[g]);set("visc",b.visc[g]);set("Fr",null,b.Fr[g]);set("flash",b.flash[g]);set("PI",b.PI[0],b.PI[1]);set("dm",null,b.dm[g]);set("Pres",b.Pres[g]);set("dKiSh",null,b.dKiSh[g])}
  else if(x.bk==="bmp"){var p=B.bmp,i=p.grades.indexOf(x.grade);set("P25",p.P25[i][0],p.P25[i][1]);set("KiSh",p.KiSh[i]);set("D25",p.D25[i]);set("Elast",p.E);set("Fr",null,p.Fr[i]);set("flash",p.flash[i]);set("dm",null,p.dm[i]);set("dKiSh",-p.dKiShDown,p.dKiShUp[i]);o._note=t.noteBmp}
  else{var q=B.mastic,j=q.grades.indexOf(x.grade);set("P25",q.P25[j]);set("P0",q.P0[j]);set("KiSh",q.KiSh[j]);set("Elast",q.E[j]);set("Fr",null,q.Fr[j])}
  set("adh",B.adhB)}
 else if(m==="emul"){var E=SP.emul,r=(x.ek==="an"?E.an:E.cat)[x.et];o._norm=E.norm;if(r){set("Bind",r[0][0],r[0][1]);set("H",null,r[2]);set("H7",null,r[3]);set("adhE",r[4])}set("PA",null,E.strat);var ph=E.pH[x.ek];set("pH",ph[0],ph[1]);
  if(x.ek==="cat"){var n=(/-(\d)/.exec(x.et)||[])[1],ix=E.idx[n];if(ix)set("idx",ix[0],ix[1])}o._note=t.noteEm}
 else if(m==="crushed"){var C=SP.crushed,u=C.use[x.use];o._norm=C.norm;if(u){set("flaky",null,u.fl);var ri={ig:0,sed:1,slag:2,grav:3}[x.rock],cr=u.cr[ri],ab=u.ab?{ig:u.ab[0],sed:u.ab[1],grav:u.ab[2],slag:null}[x.rock]:null;
  o._note=t.noteCr.replace("{0}",cr!=null?cr:"—").replace("{1}",ab!=null?ab:"—").replace("{2}",C.frost[x.clim])}}
 else if(m==="sand"){var S=SP.sand,v=S.use[x.use];o._norm=S.norm;if(v){set("clay",null,v[1]);o._note=t.noteSand.replace("{0}",v[0])}}
 else if(m==="powder"){var P=SP.powder[x.pm];o._norm=SP.powder.norm;set("p125",P.p125);set("p0315",P.p0315);set("p0071",P.p0071);set("por",P.por[0],P.por[1]);set("sw",null,P.sw);set("bc",null,P.bc)}
 else if(m==="shgps"){var G=SP.shgps,rr=G.mix[x.mix];o._norm=G.norm;(rr||[]).forEach(function(q,i){if(q)set("A"+SHSV[i],q[0],q[1])});o._note=t.noteSh}
 else{var K=SP.black;if(!K)return null;if(x.blk==="sh"||x.blk==="sc"){var st=K.stone[x.blk==="sh"?"hot":"cold"];o._norm=K.norm.stone;set("T",st.T[0],st.T[1]);set("flaky",null,K.flaky);set("adh",3);o._note=t.noteStone.replace("{0}",fmt(st.bit[0],1)+"–"+fmt(st.bit[1],0))}
  else if(x.blk==="mc"){var cm=K.coldmix;o._norm=K.norm.mix;set("W",cm.W[0],cm.W[1]);set("R20",cm.R20);set("Kw",cm.Kw);set("Kwl",cm.Kwl);set("N",null,cm.cake);set("T",cm.T[0],cm.T[1]);o._note=t.noteBc}
  else{var hm=K.hotmix,w=hm.W[x.blk==="mhc"?"coarse":"fine"];o._norm=K.norm.mix;set("R50",hm.R50);set("R20",hm.R20);set("R0",null,hm.R0);set("Kw",hm.Kw);set("Kwl",hm.Kwl);set("W",w[0],w[1]);set("T",hm.T[0],hm.T[1])}}
 return o}

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
var ROOT=null,DATA=null,FIGON={},FIGFULL={};
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
   var title=s.kind==="prog"?l.mats[s.mat]+(s.sel?" — "+selDesc(s.mat,s.sel):"")+(s.purpose?" · "+l["p"+s.purpose.charAt(0).toUpperCase()+s.purpose.slice(1)]:""):(testById(s.test)||{}).t||s.test;
   var ids=s.kind==="prog"?s.tests:[s.test],dn=ids.filter(function(t){return s.st[t]&&s.st[t].done}).length;
   return'<li><div><b>'+esc(title)+'</b><span class="hint">'+new Date(s.at).toLocaleString()+' · '+dn+'/'+ids.length+' '+esc(l.doneOf)+'</span></div><span class="g-row"><button class="b sm" data-res="'+s.id+'">'+esc(l.resume)+'</button><button class="b sm ghost" data-dels="'+s.id+'">'+esc(l.del)+'</button></span></li>'}).join("")+'</ul>':'<p class="hint">'+esc(l.noDrafts)+'</p>')+'</div>';
 return h}
function vPick(){var l=L(),q=(ST.view.q||"").toLowerCase();
 var h=crumbs()+'<div class="card"><h2>'+esc(l.pickTest)+'</h2><input id="g_q" type="search" placeholder="'+esc(l.search)+'" value="'+esc(ST.view.q||"")+'" aria-label="'+esc(l.search)+'" style="width:100%;margin-top:6px"></div>';
 DATA.fams.forEach(function(f){var ts=DATA.tests.filter(function(t){return t.fam===f[0]&&(!q||(t.t+" "+t.norm+" "+(t.kw||"")).toLowerCase().indexOf(q)>=0)});if(!ts.length)return;
  h+='<div class="card"><h3>'+esc(f[1])+'</h3><ul class="lib-list">'+ts.map(function(t){return'<li><a href="#" data-pt="'+t.id+'"><span class="lt">'+esc(t.t)+'</span><span class="ln">'+esc(t.norm.split(" / ")[0])+'</span><span class="lg">'+esc(t.short||"")+'</span></a></li>'}).join("")+'</ul></div>'});
 return h}
function vMat(){var l=L(),t2=L2(),m=ST.view.m;
 var h=crumbs()+'<div class="card"><h2>'+esc(l.pickMat)+'</h2><div class="g-chips">'+MAT.map(function(k){return'<button class="g-chip" data-mat="'+k+'" aria-pressed="'+(m===k)+'">'+esc(l.mats[k])+'</button>'}).join("")+'</div></div>';
 if(m&&hasSel(m)){var x=ST.view.sel=selFix(m,ST.view.sel);
  h+='<div class="card"><h3>'+esc(t2.selH)+'</h3><p class="hint">'+esc(t2.selHint)+'</p><div class="fields">'+selFields(m,x).map(function(f){return'<label class="f">'+esc(t2.f[f[0]]||L3().f[f[0]])+'<select data-sel="'+f[0]+'">'+f[1].map(function(o){return'<option value="'+esc(o[0])+'"'+(x[f[0]]===o[0]?" selected":"")+'>'+esc(o[1])+'</option>'}).join("")+'</select></label>'}).join("")+'</div><p class="g-desc"><b>'+esc(selDesc(m,x))+'</b></p></div>'}
 if(m&&SEL1[m])h+='<div class="card"><button class="b" data-purp="all">'+esc(L3().start)+' →</button></div>';
 else if(m&&(ASPHM[m]||PROG[m]&&!Array.isArray(PROG[m])))h+='<div class="card"><h3>'+esc(l.purpose)+'</h3><div class="g-chips">'+["design","lot","site"].map(function(p){return'<button class="g-chip" data-purp="'+p+'">'+esc(l["p"+p.charAt(0).toUpperCase()+p.slice(1)])+'</button>'}).join("")+'</div></div>';
 return h}
function vProg(s){var l=L(),dn=s.tests.filter(function(t){return s.st[t]&&s.st[t].done}).length,pc=Math.round(dn/s.tests.length*100);
 var h=crumbs()+'<div class="card"><h2>'+esc(l.prog)+'</h2><p><b>'+esc(l.mats[s.mat])+'</b>'+(s.purpose?' · '+esc(l["p"+s.purpose.charAt(0).toUpperCase()+s.purpose.slice(1)]):'')+'</p>'+(s.sel?'<p class="g-desc">'+esc(selDesc(s.mat,s.sel))+' <button class="link" data-chg="'+s.id+'">'+esc(L2().change)+'</button></p>':'')+'<p class="hint">'+esc(l.progHint)+'</p>'+
  '<div class="g-prog" role="progressbar" aria-valuenow="'+pc+'" aria-valuemin="0" aria-valuemax="100"><i style="width:'+pc+'%"></i></div><p class="hint">'+dn+' / '+s.tests.length+' '+esc(l.doneOf)+'</p></div>';
 h+='<ol class="g-plist">'+s.tests.map(function(id,i){var t=testById(id);if(!t)return"";var st=s.st[id],state=st&&st.done?"done":st&&(st.step||Object.keys(st.v).length)?"go":"";
  return'<li class="card '+state+'"><div class="g-pn">'+(i+1)+'</div><div class="g-pb"><b>'+esc(t.t)+'</b> <span class="g-tag '+(PERIODIC[id]?"per":"must")+'">'+esc(PERIODIC[id]?l.period:l.must)+'</span>'+
   '<p><span class="g-k">'+esc(l.why)+':</span> '+DorLib.md(t.goal||"")+'</p><p><span class="g-k">'+esc(l.when)+':</span> '+DorLib.md(t.when||"")+'</p><p class="ln hint">'+esc(t.norm)+'</p></div>'+
   '<button class="b'+(state==="done"?' ghost':'')+'" data-run="'+id+'">'+esc(state==="done"?l.doneT:state==="go"?l.contT:l.startT)+'</button></li>'}).join("")+'</ol>';
 if(s.sel&&hasSel(s.mat))h+=limCard(s);
 return h}
/* one drawing per action */
function figStep(t,cur,pos,A,idx){if(cur.k==="eq"||FIGFULL[t.id]||!DorLib.stepFig)return DorLib.fig(t,idx,LANG);
 var np=(t.prep||[]).length,i=cur.k==="prep"?pos-1:cur.k==="run"?pos-1-np:0;
 return DorLib.stepFig(t,cur.k,i,A.length,pos+1,cur.x||"",LANG)}
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
  '<div class="g-row"><button class="b sm ghost" id="g_fig">'+esc(FIGON[tid]!==false?l.hideFig:l.showFig)+'</button>'+(cur.k!=="eq"&&FIGON[tid]!==false?'<button class="b sm ghost" id="g_full">'+esc(FIGFULL[tid]?l.stepFig:l.fullFig)+'</button>':'')+'<button class="b sm ghost" data-gm="'+tid+'">'+esc(l.method)+'</button></div></div>'+
  (FIGON[tid]!==false?'<div class="card lib-fig g-fig" id="g_figbox" role="button" tabindex="0" title="'+esc(l.zoom)+'">'+figStep(t,cur,st.step,A,idx)+'<p class="hint g-zh">⤢ '+esc(l.zoom)+'</p></div>':'');
 var body="";
 if(cur.k==="eq"){body='<h3>'+esc(l.eqH)+'</h3><p class="hint">'+esc(l.eqHint)+'</p><ul class="g-chk">'+(t.eq||[]).map(function(e,i){return'<li><label><input type="checkbox" data-chk="'+i+'"'+(st.chk[i]?" checked":"")+'> <span>'+DorLib.md(e)+'</span></label></li>'}).join("")+'</ul>'+
   '<div class="g-ww"><p><span class="g-k">'+esc(l.why)+':</span> '+DorLib.md(t.goal||"")+'</p><p><span class="g-k">'+esc(l.when)+':</span> '+DorLib.md(t.when||"")+'</p></div>'+
   (PARAMS[tid]?'<h3>'+esc(l.param)+'</h3><div class="fields">'+PARAMS[tid].map(function(p){return'<label class="f">'+esc(p[0]==="d"?p[1]:p[1])+'<input class="num" inputmode="decimal" data-p="'+p[0]+'" value="'+esc(st.p[p[0]]!=null?st.p[p[0]]:p[2].replace(".",LANG==="en"?".":","))+'"></label>'}).join("")+'</div>':'')}
 else if(cur.k==="prep"||cur.k==="run"){var ti=durations(cur.x);
  body='<p class="g-k">'+esc(cur.k==="prep"?l.prepH:l.runH)+'</p><p class="g-step">'+DorLib.md(cur.x)+'</p>'+
   (ti.length?'<div class="g-row">'+ti.map(function(d){return'<button class="b g-tbtn" data-tm="'+d[0]+'">⏱ '+esc(l.timer)+' '+esc(d[1])+'</button>'}).join("")+'</div>':'')+stepInputs(st,T,cur.x)}
 else if(cur.k==="meas"){body='<h3>'+esc(l.measH)+'</h3><p class="hint">'+esc(l.measHint)+'</p>'+fullTable(st,T)}
 else{var f=CALC[tid],out=null;if(f&&T){try{out=f(grid(st,T),paramsOf(st,tid))}catch(e){out=null}}
  body='<h3>'+esc(l.resH)+'</h3>'+(out?'<ul class="g-res">'+out.map(function(o){return'<li'+(o[2]?' class="b"':'')+'><span>'+esc(o[0])+'</span><span>'+esc(o[1])+'</span></li>'}).join("")+'</ul>':'<p class="hint">'+esc(l.noCalc)+'</p>')+(s.kind==="prog"?checks(s,out):"")+
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
 ROOT.querySelectorAll("[data-mat]").forEach(function(b){b.onclick=function(){var m=b.dataset.mat;if(!hasSel(m)&&Array.isArray(PROG[m])){var s=newSess("prog",{mat:m,tests:PROG[m].slice()});go({v:"prog",s:s.id})}else go({v:"mat",m:m,sel:hasSel(m)?selFix(m,v.m===m?v.sel:null):null})}});
 ROOT.querySelectorAll("[data-sel]").forEach(function(e){e.onchange=function(){v.sel[e.dataset.sel]=e.value;v.sel=selFix(v.m,v.sel);store();draw()}});
 ROOT.querySelectorAll("[data-purp]").forEach(function(b){b.onclick=function(){var m=v.m,p=b.dataset.purp,o={mat:m};if(p!=="all")o.purpose=p;if(SEL1[m]){o.sel=JSON.parse(JSON.stringify(selFix(m,v.sel)));o.tests=prog2(m,o.sel).filter(function(id){return!!testById(id)})}else if(ASPHM[m]){o.sel=JSON.parse(JSON.stringify(selFix(m,v.sel)));o.tests=progFor(m,p,o.sel).filter(function(id){return!!testById(id)})}else o.tests=PROG[m][p].slice();var s=newSess("prog",o);go({v:"prog",s:s.id})}});
 ROOT.querySelectorAll("[data-chg]").forEach(function(b){b.onclick=function(){var s=sess(b.dataset.chg);if(s)go({v:"mat",m:s.mat,sel:JSON.parse(JSON.stringify(s.sel))})}});
 ROOT.querySelectorAll("[data-run]").forEach(function(b){b.onclick=function(){go({v:"run",s:v.s,t:b.dataset.run})}});
 if(v.v==="run"){var s=sess(v.s),st=tstate(s,v.t),A=steps(testById(v.t));
  function touch(){s.at=Date.now();store()}
  ROOT.querySelectorAll("[data-chk]").forEach(function(c){c.onchange=function(){st.chk[c.dataset.chk]=c.checked;touch()}});
  ROOT.querySelectorAll("[data-v]").forEach(function(i){i.oninput=function(){st.v[i.dataset.v]=i.value;st.xf=false;touch()}});
  ROOT.querySelectorAll("[data-p]").forEach(function(i){i.oninput=function(){st.p[i.dataset.p]=i.value;st.xf=false;touch()}});
  ROOT.querySelectorAll("[data-tm]").forEach(function(b){b.onclick=function(){var t=testById(v.t);startTimer(+b.dataset.tm,t.t+" · "+l.step+" "+(st.step+1))}});
  var f=$("g_fig");if(f)f.onclick=function(){FIGON[v.t]=FIGON[v.t]===false;draw()};var gf=$("g_full");if(gf)gf.onclick=function(){FIGFULL[v.t]=!FIGFULL[v.t];draw()};
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
".g-desc{margin:8px 0 0}.g-lim li span:last-child{font-weight:600}.g-chk2{list-style:none;margin:8px 0;padding:0;display:grid;gap:6px}.g-chk2 li{display:grid;grid-template-columns:1fr auto auto auto;gap:4px 12px;align-items:center;padding:8px 10px;border-radius:8px;border:1px solid var(--line);font-size:14px}.g-chk2 li span:nth-child(2){font-family:var(--mono);font-weight:700}.g-chk2 li span:nth-child(3){color:var(--muted);font-family:var(--mono)}.g-chk2 li.ok{border-color:var(--ok)}.g-chk2 li.ok b{color:var(--ok)}.g-chk2 li.bad{border-color:var(--bad)}.g-chk2 li.bad b{color:var(--bad)}@media (max-width:560px){.g-chk2 li{grid-template-columns:1fr auto}}"+
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
