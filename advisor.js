/* ДорЛаб — агент контроля согласованности результатов (советы)
   Проверяет данные и результаты испытаний и даёт советы: ошибка / проверить / совет. */
(function(){
"use strict";
var MSG={
ru:{title:"Советы по согласованности",none:"Несогласованностей не найдено.",lv:{err:"Ошибка",warn:"Проверить",tip:"Совет"},spec:"образец",
 ab_m1_lt_m:"Образец {i}: m₁ ({a}) меньше m ({b}). После выдержки в воде масса не уменьшается — проверьте порядок записи.",
 ab_m2_ge_m:"Образец {i}: масса в воде m₂ ({a}) не меньше сухой массы m ({b}) — так не бывает. Проверьте столбцы.",
 ab_m3_lt_m:"Образец {i}: m₃ ({a}) меньше m ({b}) — водонасыщенный образец не может быть легче сухого.",
 ab_dens_spread:"Средняя плотность параллельных образцов расходится на {a} г/см³ (> 0,02). Перевзвесьте или изготовьте ещё один образец.",
 ab_rhoM_gt_rho:"Средняя плотность ρm ({a}) больше истинной плотности смеси ρ ({b}): пористость отрицательная. Проверьте ρ или взвешивания.",
 ab_rho_ge_rhom:"Плотность смеси ρ ({a}) не меньше плотности минеральной части ρм ({b}). Битум легче камня — плотность смеси должна быть ниже.",
 ab_W_gt_V:"Водонасыщение {a} % больше остаточной пористости {b} %: вода заполняет только поры. Проверьте m₃ или ρ.",
 ab_R_order:"Прочность должна падать с ростом температуры (R0 > R20 > R50), а здесь {a}. Возможно, перепутаны столбцы.",
 ab_Kw_gt:"Kв = {a} > 1,05: водонасыщенные образцы прочнее сухих — необычно. Проверьте, не перепутаны ли столбцы.",
 ab_Kw_low:"Kв = {a} — низкая водостойкость. Совет: адгезионная добавка, больше минерального порошка или другой битум.",
 ab_R_unit:"R20 = {a} МПа маловероятно. Проверьте единицу нагрузки (кН / кгс / тс) и диаметр образца.",
 ab_R_spread:"При {t}: образец {i} отклоняется на {a} % от среднего (> 15 %). Проверьте образец или повторите испытание.",
 ab_d:"Диаметр {a} мм нестандартный (обычно 50,5 / 71,4 / 101,0 мм). Проверьте ввод.",
 ab_q_vs_bc:"Битум в расчёте плотности ({a} %) отличается от результата выжигания/экстракции ({b} %) больше чем на 0,5 %.",
 ab_V_high:"Остаточная пористость {a} % выше нормы: уплотните сильнее или увеличьте долю битума/мин. порошка.",
 ab_V_low:"Остаточная пористость {a} % ниже нормы: риск колееобразования — уменьшите битум.",
 ab_type_mx:"Вид смеси «{a}», а в подборе состава выбран «{b}». Проверьте, что это одна и та же смесь.",
 bit_grade:"Пенетрация {a} соответствует марке БНД {b}, а не выбранной БНД {c}.",
 bit_pi:"Индекс пенетрации PI = {a} вне −2…+2: пара «пенетрация — КиШ» несогласована. Проверьте термометр, скорость нагрева или иглу.",
 bit_duct:"Растяжимость {a} см мала для пенетрации {b}: возможно, битум состарен или загрязнён.",
 bit_rep:"Сходимость не выполнена: {a}. По ГОСТ испытание нужно повторить.",
 gr_loss:"Потери при рассеве {a} % (допускается около 1 %). Перевзвесьте остатки или навеску.",
 gr_minmax:"Сито {a} мм: минимум больше максимума — проверьте пределы.",
 bc_m1:"Масса после выжигания m₁ не меньше массы до m₀ — проверьте ввод.",
 bc_range:"Содержание битума {a} % необычно (обычно 3–9 %). Проверьте взвешивания.",
 dr_high:"Стекание {a} % больше {b} %: добавьте стабилизирующую добавку (волокно) или снизьте температуру.",
 dr_neg:"Стекание отрицательное — m₂ меньше m₁. Проверьте взвешивания.",
 mx_sum:"Сумма долей {a} % — должна быть 100 %.",
 mx_mono:"Фракция «{f}»: проход на сите {b} мм больше, чем на {a} мм — так не бывает. Проверьте ввод.",
 mx_fine_low:"Мелкая часть ниже нормы (сита {a} мм): увеличьте долю песка 0-5 или минерального порошка.",
 mx_fine_high:"Мелкая часть выше нормы (сита {a} мм): уменьшите долю минерального порошка или песка.",
 mx_coarse_low:"Крупная часть: проход ниже нормы (сита {a} мм) — смесь слишком крупная, уменьшите долю щебня.",
 mx_coarse_high:"Крупная часть: проход выше нормы (сита {a} мм) — смесь слишком мелкая, увеличьте долю щебня.",
 pr_missing:"В протоколе не заполнено: {a}.",f_no:"№ протокола",f_date:"дата",f_obj:"объект"},
fr:{title:"Conseils de cohérence",none:"Aucune incohérence détectée.",lv:{err:"Erreur",warn:"À vérifier",tip:"Conseil"},spec:"éprouvette",
 ab_m1_lt_m:"Éprouvette {i} : m₁ ({a}) est inférieure à m ({b}). Après immersion la masse ne diminue pas — vérifie l'ordre des saisies.",
 ab_m2_ge_m:"Éprouvette {i} : la masse dans l'eau m₂ ({a}) n'est pas inférieure à la masse sèche m ({b}) — impossible. Vérifie les colonnes.",
 ab_m3_lt_m:"Éprouvette {i} : m₃ ({a}) est inférieure à m ({b}) — une éprouvette saturée ne peut pas être plus légère que sèche.",
 ab_dens_spread:"Les masses volumiques des éprouvettes parallèles diffèrent de {a} g/cm³ (> 0,02). Repèse ou confectionne une éprouvette de plus.",
 ab_rhoM_gt_rho:"ρm ({a}) est supérieure à la masse volumique réelle ρ ({b}) : porosité négative. Vérifie ρ ou les pesées.",
 ab_rho_ge_rhom:"ρ du mélange ({a}) n'est pas inférieure à ρм de la partie minérale ({b}). Le bitume est plus léger que la pierre : ρ doit être plus faible.",
 ab_W_gt_V:"L'absorption d'eau {a} % dépasse la porosité résiduelle {b} % : l'eau ne remplit que les vides. Vérifie m₃ ou ρ.",
 ab_R_order:"La résistance doit baisser quand la température monte (R0 > R20 > R50), ici {a}. Colonnes probablement inversées.",
 ab_Kw_gt:"Kв = {a} > 1,05 : les éprouvettes saturées sont plus résistantes que les sèches — inhabituel. Vérifie les colonnes.",
 ab_Kw_low:"Kв = {a} — faible tenue à l'eau. Conseil : dope d'adhésivité, plus de filler ou autre bitume.",
 ab_R_unit:"R20 = {a} MPa peu probable. Vérifie l'unité de charge (kN / kgf / tf) et le diamètre.",
 ab_R_spread:"À {t} : l'éprouvette {i} s'écarte de {a} % de la moyenne (> 15 %). Vérifie l'éprouvette ou refais l'essai.",
 ab_d:"Diamètre {a} mm non standard (habituellement 50,5 / 71,4 / 101,0 mm). Vérifie la saisie.",
 ab_q_vs_bc:"Le bitume utilisé pour la densité ({a} %) diffère de plus de 0,5 % du résultat de calcination/extraction ({b} %).",
 ab_V_high:"Porosité résiduelle {a} % au-dessus de la norme : compacte davantage ou augmente bitume/filler.",
 ab_V_low:"Porosité résiduelle {a} % sous la norme : risque d'orniérage — diminue le bitume.",
 ab_type_mx:"Type d'enrobé « {a} » mais formulation « {b} ». Vérifie qu'il s'agit bien du même mélange.",
 bit_grade:"La pénétration {a} correspond au grade БНД {b}, pas au БНД {c} choisi.",
 bit_pi:"Indice de pénétration PI = {a} hors −2…+2 : le couple pénétration / point de ramollissement est incohérent. Vérifie thermomètre, vitesse de chauffe ou aiguille.",
 bit_duct:"Ductilité {a} cm faible pour une pénétration {b} : bitume peut-être vieilli ou pollué.",
 bit_rep:"Répétabilité non respectée : {a}. Selon le ГОСТ, l'essai doit être refait.",
 gr_loss:"Perte au tamisage {a} % (environ 1 % admis). Repèse les refus ou l'échantillon.",
 gr_minmax:"Tamis {a} mm : le minimum dépasse le maximum — vérifie les limites.",
 bc_m1:"La masse après calcination m₁ n'est pas inférieure à m₀ — vérifie la saisie.",
 bc_range:"Teneur en bitume {a} % inhabituelle (en général 3 à 9 %). Vérifie les pesées.",
 dr_high:"Égouttage {a} % supérieur à {b} % : ajoute des fibres stabilisantes ou baisse la température.",
 dr_neg:"Égouttage négatif — m₂ est inférieure à m₁. Vérifie les pesées.",
 mx_sum:"Somme des parts {a} % — elle doit faire 100 %.",
 mx_mono:"Fraction « {f} » : le passant au tamis {b} mm est plus grand qu'au tamis {a} mm — impossible. Vérifie la saisie.",
 mx_fine_low:"Partie fine sous le fuseau (tamis {a} mm) : augmente la part de sable 0-5 ou de filler.",
 mx_fine_high:"Partie fine au-dessus du fuseau (tamis {a} mm) : diminue le filler ou le sable.",
 mx_coarse_low:"Partie grosse : passant sous le fuseau (tamis {a} mm) — mélange trop gros, diminue les gravillons.",
 mx_coarse_high:"Partie grosse : passant au-dessus du fuseau (tamis {a} mm) — mélange trop fin, augmente les gravillons.",
 pr_missing:"Non rempli dans le PV : {a}.",f_no:"n° du PV",f_date:"date",f_obj:"chantier"},
en:{title:"Consistency advice",none:"No inconsistencies found.",lv:{err:"Error",warn:"Check",tip:"Advice"},spec:"specimen",
 ab_m1_lt_m:"Specimen {i}: m₁ ({a}) is lower than m ({b}). Mass does not drop after soaking — check the entry order.",
 ab_m2_ge_m:"Specimen {i}: mass in water m₂ ({a}) is not lower than dry mass m ({b}) — impossible. Check the columns.",
 ab_m3_lt_m:"Specimen {i}: m₃ ({a}) is lower than m ({b}) — a saturated specimen cannot weigh less than a dry one.",
 ab_dens_spread:"Bulk densities of parallel specimens differ by {a} g/cm³ (> 0.02). Re-weigh or make another specimen.",
 ab_rhoM_gt_rho:"ρm ({a}) is greater than the maximum density ρ ({b}): negative porosity. Check ρ or the weighings.",
 ab_rho_ge_rhom:"Mix density ρ ({a}) is not lower than mineral density ρм ({b}). Bitumen is lighter than stone, so ρ must be lower.",
 ab_W_gt_V:"Water saturation {a} % exceeds residual porosity {b} %: water only fills voids. Check m₃ or ρ.",
 ab_R_order:"Strength must fall as temperature rises (R0 > R20 > R50); here {a}. Columns are probably swapped.",
 ab_Kw_gt:"Kв = {a} > 1.05: saturated specimens are stronger than dry ones — unusual. Check the columns.",
 ab_Kw_low:"Kв = {a} — poor water resistance. Advice: adhesion agent, more filler or another bitumen.",
 ab_R_unit:"R20 = {a} MPa is unlikely. Check the load unit (kN / kgf / tf) and the diameter.",
 ab_R_spread:"At {t}: specimen {i} deviates {a} % from the mean (> 15 %). Check the specimen or repeat.",
 ab_d:"Diameter {a} mm is non-standard (usually 50.5 / 71.4 / 101.0 mm). Check the entry.",
 ab_q_vs_bc:"Bitumen used in the density calculation ({a} %) differs by more than 0.5 % from the ignition/extraction result ({b} %).",
 ab_V_high:"Residual porosity {a} % above the limit: compact more or add bitumen/filler.",
 ab_V_low:"Residual porosity {a} % below the limit: rutting risk — reduce bitumen.",
 ab_type_mx:"Mix type is “{a}” but the blend design is “{b}”. Check they are the same mix.",
 bit_grade:"Penetration {a} matches grade БНД {b}, not the selected БНД {c}.",
 bit_pi:"Penetration index PI = {a} is outside −2…+2: penetration and softening point do not agree. Check the thermometer, heating rate or needle.",
 bit_duct:"Ductility {a} cm is low for penetration {b}: the bitumen may be aged or contaminated.",
 bit_rep:"Repeatability not met: {a}. Per ГОСТ the test must be repeated.",
 gr_loss:"Sieving loss {a} % (about 1 % allowed). Re-weigh the retained masses or the sample.",
 gr_minmax:"Sieve {a} mm: minimum exceeds maximum — check the limits.",
 bc_m1:"Mass after ignition m₁ is not lower than m₀ — check the entry.",
 bc_range:"Binder content {a} % is unusual (normally 3–9 %). Check the weighings.",
 dr_high:"Drainage {a} % exceeds {b} %: add stabilising fibre or lower the temperature.",
 dr_neg:"Negative drainage — m₂ is lower than m₁. Check the weighings.",
 mx_sum:"Sum of shares is {a} % — it must be 100 %.",
 mx_mono:"Fraction “{f}”: passing on the {b} mm sieve is higher than on {a} mm — impossible. Check the entry.",
 mx_fine_low:"Fines below the envelope (sieves {a} mm): increase the 0-5 sand or filler share.",
 mx_fine_high:"Fines above the envelope (sieves {a} mm): reduce filler or sand.",
 mx_coarse_low:"Coarse part: passing below the envelope (sieves {a} mm) — mix too coarse, reduce coarse aggregate.",
 mx_coarse_high:"Coarse part: passing above the envelope (sieves {a} mm) — mix too fine, increase coarse aggregate.",
 pr_missing:"Missing in the report: {a}.",f_no:"report No.",f_date:"date",f_obj:"project"},
kk:{title:"Үйлесімділік бойынша кеңестер",none:"Сәйкессіздік табылмады.",lv:{err:"Қате",warn:"Тексеру",tip:"Кеңес"},spec:"үлгі",
 ab_m1_lt_m:"{i}-үлгі: m₁ ({a}) m-нен ({b}) кем. Суда ұстағаннан кейін масса азаймайды — жазу ретін тексеріңіз.",
 ab_m2_ge_m:"{i}-үлгі: судағы масса m₂ ({a}) құрғақ массадан m ({b}) кем емес — бұлай болмайды. Бағандарды тексеріңіз.",
 ab_m3_lt_m:"{i}-үлгі: m₃ ({a}) m-нен ({b}) кем — сумен қанықтырылған үлгі құрғақтан жеңіл бола алмайды.",
 ab_dens_spread:"Параллель үлгілердің орташа тығыздығы {a} г/см³-ге айырмашылықта (> 0,02). Қайта өлшеңіз немесе тағы бір үлгі жасаңыз.",
 ab_rhoM_gt_rho:"ρm ({a}) қоспаның шынайы тығыздығынан ρ ({b}) үлкен: кеуектілік теріс. ρ немесе өлшеулерді тексеріңіз.",
 ab_rho_ge_rhom:"Қоспаның тығыздығы ρ ({a}) минералды бөліктің ρм ({b}) тығыздығынан кем емес. Битум тастан жеңіл — ρ төмен болуы тиіс.",
 ab_W_gt_V:"Сумен қанығу {a} % қалдық кеуектіліктен {b} % көп: су тек кеуектерді толтырады. m₃ немесе ρ тексеріңіз.",
 ab_R_order:"Беріктік температура өскен сайын төмендеуі тиіс (R0 > R20 > R50), мұнда {a}. Бағандар ауысып кеткен болуы мүмкін.",
 ab_Kw_gt:"Kв = {a} > 1,05: сумен қанықтырылған үлгілер құрғақтан берік — әдеттен тыс. Бағандарды тексеріңіз.",
 ab_Kw_low:"Kв = {a} — суға төзімділік төмен. Кеңес: адгезиялық қоспа, көбірек минералды ұнтақ немесе басқа битум.",
 ab_R_unit:"R20 = {a} МПа екіталай. Жүктеме бірлігін (кН / кгк / тк) және диаметрді тексеріңіз.",
 ab_R_spread:"{t} кезінде: {i}-үлгі орташадан {a} %-ға ауытқиды (> 15 %). Үлгіні тексеріңіз немесе қайталаңыз.",
 ab_d:"Диаметр {a} мм стандартты емес (әдетте 50,5 / 71,4 / 101,0 мм). Енгізуді тексеріңіз.",
 ab_q_vs_bc:"Тығыздық есебіндегі битум ({a} %) күйдіру/экстракция нәтижесінен ({b} %) 0,5 %-дан артық ерекшеленеді.",
 ab_V_high:"Қалдық кеуектілік {a} % нормадан жоғары: көбірек тығыздаңыз немесе битум/минералды ұнтақ үлесін арттырыңыз.",
 ab_V_low:"Қалдық кеуектілік {a} % нормадан төмен: жолтабан пайда болу қаупі — битумды азайтыңыз.",
 ab_type_mx:"Қоспа түрі «{a}», ал құрамды іріктеуде «{b}» таңдалған. Бұл бір қоспа екенін тексеріңіз.",
 bit_grade:"Пенетрация {a} таңдалған БНД {c} емес, БНД {b} маркасына сәйкес келеді.",
 bit_pi:"Пенетрация индексі PI = {a}, −2…+2 шегінен тыс: «пенетрация — жұмсару температурасы» жұбы үйлеспейді. Термометрді, қыздыру жылдамдығын немесе инені тексеріңіз.",
 bit_duct:"Созылғыштық {a} см пенетрация {b} үшін аз: битум ескірген немесе ластанған болуы мүмкін.",
 bit_rep:"Жинақтылық орындалмады: {a}. ГОСТ бойынша сынақты қайталау қажет.",
 gr_loss:"Електеу шығыны {a} % (шамамен 1 % рұқсат). Қалдықтарды немесе сынаманы қайта өлшеңіз.",
 gr_minmax:"Елек {a} мм: минимум максимумнан үлкен — шектерді тексеріңіз.",
 bc_m1:"Күйдіруден кейінгі масса m₁ m₀-ден кем емес — енгізуді тексеріңіз.",
 bc_range:"Битум мөлшері {a} % әдеттен тыс (әдетте 3–9 %). Өлшеулерді тексеріңіз.",
 dr_high:"Ағуы {a} % {b} %-дан көп: тұрақтандырғыш қоспа (талшық) қосыңыз немесе температураны төмендетіңіз.",
 dr_neg:"Ағуы теріс — m₂ m₁-ден кем. Өлшеулерді тексеріңіз.",
 mx_sum:"Үлестер сомасы {a} % — 100 % болуы тиіс.",
 mx_mono:"«{f}» фракциясы: {b} мм електегі өтуі {a} мм електегіден көп — бұлай болмайды. Енгізуді тексеріңіз.",
 mx_fine_low:"Ұсақ бөлік нормадан төмен ({a} мм електер): 0-5 құм немесе минералды ұнтақ үлесін арттырыңыз.",
 mx_fine_high:"Ұсақ бөлік нормадан жоғары ({a} мм електер): минералды ұнтақ немесе құм үлесін азайтыңыз.",
 mx_coarse_low:"Ірі бөлік: өтуі нормадан төмен ({a} мм електер) — қоспа тым ірі, қиыршықтас үлесін азайтыңыз.",
 mx_coarse_high:"Ірі бөлік: өтуі нормадан жоғары ({a} мм електер) — қоспа тым ұсақ, қиыршықтас үлесін арттырыңыз.",
 pr_missing:"Хаттамада толтырылмаған: {a}.",f_no:"хаттама №",f_date:"күні",f_obj:"нысан"},
zh:{title:"一致性检查建议",none:"未发现不一致。",lv:{err:"错误",warn:"需核查",tip:"建议"},spec:"试件",
 ab_m1_lt_m:"试件 {i}：m₁（{a}）小于 m（{b}）。浸水后质量不会减少 —— 请检查填写顺序。",
 ab_m2_ge_m:"试件 {i}：水中质量 m₂（{a}）不小于干质量 m（{b}）—— 不可能。请检查各列。",
 ab_m3_lt_m:"试件 {i}：m₃（{a}）小于 m（{b}）—— 饱水试件不可能比干试件轻。",
 ab_dens_spread:"平行试件的平均密度相差 {a} g/cm³（> 0.02）。请重新称量或再成型一个试件。",
 ab_rhoM_gt_rho:"ρm（{a}）大于混合料真密度 ρ（{b}）：空隙率为负。请检查 ρ 或称量数据。",
 ab_rho_ge_rhom:"混合料密度 ρ（{a}）不小于矿料密度 ρм（{b}）。沥青比石料轻，ρ 应更小。",
 ab_W_gt_V:"饱水率 {a} % 大于残余空隙率 {b} %：水只能填充空隙。请检查 m₃ 或 ρ。",
 ab_R_order:"强度应随温度升高而降低（R0 > R20 > R50），此处为 {a}。可能填错了列。",
 ab_Kw_gt:"Kв = {a} > 1.05：饱水试件比干试件强度高 —— 不常见。请检查各列。",
 ab_Kw_low:"Kв = {a} —— 水稳定性差。建议：加抗剥落剂、增加矿粉或更换沥青。",
 ab_R_unit:"R20 = {a} MPa 不太可能。请检查荷载单位（kN / kgf / tf）和试件直径。",
 ab_R_spread:"{t} 时：试件 {i} 偏离平均值 {a} %（> 15 %）。请检查试件或重新试验。",
 ab_d:"直径 {a} mm 非标准（通常为 50.5 / 71.4 / 101.0 mm）。请检查输入。",
 ab_q_vs_bc:"密度计算所用沥青用量（{a} %）与燃烧/抽提结果（{b} %）相差超过 0.5 %。",
 ab_V_high:"残余空隙率 {a} % 高于规范：加强压实或增加沥青/矿粉。",
 ab_V_low:"残余空隙率 {a} % 低于规范：有车辙风险 —— 减少沥青用量。",
 ab_type_mx:"混合料类型为“{a}”，但级配设计选择的是“{b}”。请确认为同一种混合料。",
 bit_grade:"针入度 {a} 对应 БНД {b} 标号，而非所选的 БНД {c}。",
 bit_pi:"针入度指数 PI = {a}，超出 −2…+2：针入度与软化点不一致。请检查温度计、升温速度或标准针。",
 bit_duct:"针入度 {b} 时延度 {a} cm 偏低：沥青可能已老化或受污染。",
 bit_rep:"重复性不满足：{a}。按 ГОСТ 应重新试验。",
 gr_loss:"筛分损失 {a} %（允许约 1 %）。请重新称量筛余或试样。",
 gr_minmax:"筛孔 {a} mm：最小值大于最大值 —— 请检查界限。",
 bc_m1:"燃烧后质量 m₁ 不小于 m₀ —— 请检查输入。",
 bc_range:"沥青含量 {a} % 不常见（一般 3–9 %）。请检查称量。",
 dr_high:"析漏损失 {a} % 大于 {b} %：加入稳定剂（纤维）或降低温度。",
 dr_neg:"析漏为负值 —— m₂ 小于 m₁。请检查称量。",
 mx_sum:"比例合计 {a} % —— 应为 100 %。",
 mx_mono:"档位“{f}”：{b} mm 筛的通过率大于 {a} mm 筛 —— 不可能。请检查输入。",
 mx_fine_low:"细料低于级配范围（筛孔 {a} mm）：增加 0-5 砂或矿粉比例。",
 mx_fine_high:"细料高于级配范围（筛孔 {a} mm）：减少矿粉或砂的比例。",
 mx_coarse_low:"粗料部分通过率低于范围（筛孔 {a} mm）—— 级配偏粗，减少碎石比例。",
 mx_coarse_high:"粗料部分通过率高于范围（筛孔 {a} mm）—— 级配偏细，增加碎石比例。",
 pr_missing:"报告未填写：{a}。",f_no:"报告编号",f_date:"日期",f_obj:"工程"}
};
var GR={"40/60":[40,60],"60/90":[61,90],"90/130":[91,130],"130/200":[131,200]};
function num(v){if(v==null)return NaN;v=String(v).replace(",",".").trim();return v===""?NaN:Number(v)}
function r(x,d){return isFinite(x)?(+x).toFixed(d):"—"}
function lim(a){return a===null||a===undefined||a===""?NaN:num(a)}

function analyse(S,last){
  var out=[];function add(sec,lv,k,p){out.push({sec:sec,lv:lv,k:k,p:p||{}})}
  /* ---- asphalt ---- */
  var a=S.ab,ab=last.ab||{},dens=[];
  (a.w||[]).forEach(function(w,i){var m=num(w[0]),m1=num(w[1]),m2=num(w[2]),m3=num(w[3]),n=i+1;
    if(isFinite(m)&&isFinite(m1)&&m1<m)add("ab","warn","ab_m1_lt_m",{i:n,a:w[1],b:w[0]});
    if(isFinite(m)&&isFinite(m2)&&m2>=m)add("ab","err","ab_m2_ge_m",{i:n,a:w[2],b:w[0]});
    if(isFinite(m)&&isFinite(m3)&&m3<m)add("ab","err","ab_m3_lt_m",{i:n,a:w[3],b:w[0]});
    var v=m1-m2;if(v>0&&isFinite(m))dens.push(m*num(a.rw)/v)});
  if(dens.length>1){var sp=Math.max.apply(null,dens)-Math.min.apply(null,dens);if(sp>0.02)add("ab","warn","ab_dens_spread",{a:r(sp,3)})}
  var rho=num(a.rho),rhom=num(a.rhom);
  if(isFinite(ab.rhoM)&&isFinite(rho)&&ab.rhoM>rho)add("ab","err","ab_rhoM_gt_rho",{a:r(ab.rhoM,3),b:r(rho,3)});
  if(isFinite(rho)&&isFinite(rhom)&&rho>=rhom)add("ab","warn","ab_rho_ge_rhom",{a:r(rho,3),b:r(rhom,3)});
  if(isFinite(ab.W)&&isFinite(ab.Vres)&&ab.Vres>=0&&ab.W>ab.Vres+0.5)add("ab","warn","ab_W_gt_V",{a:r(ab.W,1),b:r(ab.Vres,1)});
  if(isFinite(ab.R0)&&isFinite(ab.R20)&&isFinite(ab.R50)&&!(ab.R0>ab.R20&&ab.R20>ab.R50))
    add("ab","err","ab_R_order",{a:"R0 "+r(ab.R0,2)+" · R20 "+r(ab.R20,2)+" · R50 "+r(ab.R50,2)});
  else if(isFinite(ab.R20)&&isFinite(ab.R50)&&ab.R50>=ab.R20)add("ab","err","ab_R_order",{a:"R20 "+r(ab.R20,2)+" · R50 "+r(ab.R50,2)});
  if(isFinite(ab.Kw)){if(ab.Kw>1.05)add("ab","warn","ab_Kw_gt",{a:r(ab.Kw,2)});
    var kmin=lim(a.req&&a.req[a.type]&&a.req[a.type].Kw&&a.req[a.type].Kw[0]);if(isFinite(kmin)&&ab.Kw<kmin)add("ab","tip","ab_Kw_low",{a:r(ab.Kw,2)})}
  if(isFinite(ab.R20)&&(ab.R20>15||ab.R20<0.3))add("ab","warn","ab_R_unit",{a:r(ab.R20,2)});
  var T=["50 °C","20 °C","0 °C","20 °C (sat)"],d=num(a.d);
  [0,1,2,3].forEach(function(j){var vals=(a.p||[]).map(function(p){return num(p[j])}),ok=vals.filter(isFinite);if(ok.length<2)return;
    var mean=ok.reduce(function(s,x){return s+x},0)/ok.length;
    vals.forEach(function(v,i){if(isFinite(v)&&mean>0&&Math.abs(v-mean)/mean>0.15)add("ab","warn","ab_R_spread",{t:T[j],i:i+1,a:r(Math.abs(v-mean)/mean*100,0)})})});
  if(isFinite(d)&&[50.5,71.4,101,101.6].every(function(x){return Math.abs(d-x)>0.6}))add("ab","tip","ab_d",{a:a.d});
  var bc=last.bc||{};if(isFinite(bc.q)&&isFinite(num(a.q))&&Math.abs(bc.q-num(a.q))>0.5)add("ab","warn","ab_q_vs_bc",{a:a.q,b:r(bc.q,2)});
  var vr=a.req&&a.req[a.type]&&a.req[a.type].Vres;
  if(vr&&isFinite(ab.Vres)&&ab.Vres>=0){if(isFinite(lim(vr[1]))&&ab.Vres>lim(vr[1]))add("ab","tip","ab_V_high",{a:r(ab.Vres,1)});
    else if(isFinite(lim(vr[0]))&&ab.Vres<lim(vr[0]))add("ab","tip","ab_V_low",{a:r(ab.Vres,1)})}
  if(S.mx&&S.mx.id){var isSMA=a.type==="SMA",mxSMA=/ЩМА/.test(S.mx.title||"");if(isSMA!==mxSMA)add("ab","tip","ab_type_mx",{a:a.type==="SMA"?"ЩМА":a.type,b:S.mx.title})}
  /* ---- bitumen ---- */
  var b=S.bit,bt=last.bit||{};
  if(bt.pen&&isFinite(bt.pen.v)){var g2=null;for(var g in GR)if(bt.pen.v>=GR[g][0]&&bt.pen.v<=GR[g][1])g2=g;
    if(g2&&g2!==b.grade)add("bit","warn","bit_grade",{a:bt.pen.v,b:g2,c:b.grade});
    if(bt.kish&&isFinite(bt.kish.v)&&bt.kish.v>25&&bt.pen.v>0){var A=(Math.log10(800)-Math.log10(bt.pen.v))/(bt.kish.v-25),PI=(20-500*A)/(1+50*A);
      if(PI<-2||PI>2)add("bit","warn","bit_pi",{a:r(PI,1)})}
    if(bt.duct&&isFinite(bt.duct.v)&&bt.pen.v>=60&&bt.duct.v<40)add("bit","warn","bit_duct",{a:bt.duct.v,b:bt.pen.v})}
  var rep=[];["pen","kish","duct"].forEach(function(k){if(bt[k]&&bt[k].ok===false)rep.push(bt[k].txt)});
  if(rep.length)add("bit","err","bit_rep",{a:rep.join("; ")});
  /* ---- grading, binder, drainage ---- */
  var gr=last.gr||{};if(isFinite(gr.loss)&&(gr.loss>1||gr.loss<-0.5))add("gr","err","gr_loss",{a:r(gr.loss,2)});
  var SV=[40,20,15,10,5,2.5,1.25,0.63,0.315,0.16,0.071];
  (S.gr.min||[]).forEach(function(mn,i){var lo=lim(mn),hi=lim(S.gr.max[i]);if(isFinite(lo)&&isFinite(hi)&&lo>hi)add("gr","err","gr_minmax",{a:SV[i]})});
  if(isFinite(num(S.bc.m0))&&isFinite(num(S.bc.m1))&&num(S.bc.m1)>=num(S.bc.m0))add("gr","err","bc_m1");
  else if(isFinite(bc.q)&&(bc.q<3||bc.q>9))add("gr","warn","bc_range",{a:r(bc.q,2)});
  var dr=last.dr||{};if(isFinite(dr.v)){if(dr.v<0)add("gr","err","dr_neg");else if(isFinite(num(S.dr.max))&&dr.v>num(S.dr.max)&&a.type==="SMA")add("gr","tip","dr_high",{a:r(dr.v,2),b:S.dr.max})}
  /* ---- mix design ---- */
  var x=S.mx,mx=last.mx;
  if(x&&mx){if(!mx.ok)add("mx","err","mx_sum",{a:r(mx.sum,1)});
    x.fr.forEach(function(fr){for(var j=1;j<x.sieves.length;j++){var big=num(fr.pass[j-1]),sm=num(fr.pass[j]);
      if(isFinite(big)&&isFinite(sm)&&sm>big+0.05){add("mx","err","mx_mono",{f:fr.name||"?",a:x.sieves[j-1],b:x.sieves[j]});break}}});
    var fl=[],fh=[],cl=[],ch=[];
    x.sieves.forEach(function(s,j){var v=Math.round(mx.blend[j]*10)/10,lo=lim(x.min[j]),hi=lim(x.max[j]),fine=s<=1.25;
      if(isFinite(lo)&&v<lo)(fine?fl:cl).push(s);if(isFinite(hi)&&v>hi)(fine?fh:ch).push(s)});
    if(fl.length)add("mx","tip","mx_fine_low",{a:fl.join(", ")});if(fh.length)add("mx","tip","mx_fine_high",{a:fh.join(", ")});
    if(cl.length)add("mx","tip","mx_coarse_low",{a:cl.join(", ")});if(ch.length)add("mx","tip","mx_coarse_high",{a:ch.join(", ")})}
  return out}

function fmt(s,p){return String(s).replace(/\{(\w)\}/g,function(_,k){return p[k]!==undefined?String(p[k]):""})}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var CSS=".adv{border-left:4px solid var(--accent)}.adv h2{display:flex;gap:8px;align-items:center}.adv ul{list-style:none;margin:0;padding:0;display:grid;gap:8px}"+
 ".adv li{display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;font-size:13.5px}.adv .lv{font:600 11px var(--mono);text-transform:uppercase;letter-spacing:.05em;padding:2px 7px;border-radius:4px;white-space:nowrap}"+
 ".adv .lv.err{background:color-mix(in srgb,var(--bad) 16%,transparent);color:var(--bad)}.adv .lv.warn{background:color-mix(in srgb,var(--accent) 18%,transparent);color:var(--accent)}"+
 ".adv .lv.tip{background:color-mix(in srgb,var(--ok) 14%,transparent);color:var(--ok)}.adv .okline{color:var(--ok);font-size:13px;margin:0}.adv .cnt{font:600 12px var(--mono);color:var(--muted)}";
function ensureCss(){if(document.getElementById("adv-css"))return;var st=document.createElement("style");st.id="adv-css";st.textContent=CSS;document.head.appendChild(st)}

window.renderAdvice=function(S,last,lang){
  ensureCss();var L=MSG[lang]||MSG.ru,items=analyse(S,last);
  var miss=[];if(!S.p.no)miss.push(L.f_no);if(!S.p.date)miss.push(L.f_date);if(!S.p.obj)miss.push(L.f_obj);
  if(miss.length)items.push({sec:"pr",lv:"tip",k:"pr_missing",p:{a:miss.join(", ")}});
  var order={err:0,warn:1,tip:2};items.sort(function(x,y){return order[x.lv]-order[y.lv]});
  ["ab","bit","gr","mx","pr"].forEach(function(sec){
    var panel=document.querySelector('[data-panel="'+sec+'"]');if(!panel)return;
    var box=panel.querySelector(".adv");
    if(!box){box=document.createElement("div");box.className="card adv";var first=panel.firstElementChild;
      if(first&&first.tagName==="DETAILS")panel.insertBefore(box,first.nextSibling);else if(sec==="pr"&&first)panel.insertBefore(box,first.nextSibling);else panel.insertBefore(box,first)}
    var list=sec==="pr"?items:items.filter(function(it){return it.sec===sec});
    var nErr=list.filter(function(i){return i.lv==="err"}).length;
    box.style.borderLeftColor=nErr?"var(--bad)":list.length?"var(--accent)":"var(--ok)";
    box.innerHTML='<h2>'+esc(L.title)+(list.length?' <span class="cnt">· '+list.length+'</span>':'')+'</h2>'+
      (list.length?'<ul>'+list.map(function(it){return'<li><span class="lv '+it.lv+'">'+esc(L.lv[it.lv])+'</span><span>'+esc(fmt(L[it.k]||it.k,it.p))+'</span></li>'}).join("")+'</ul>':'<p class="okline">✓ '+esc(L.none)+'</p>')});
  return items};
window.DorAdvisorAnalyse=analyse;
})();
