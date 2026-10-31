// 使用分級成語與四字詞語資料，並標記首尾拼音以支援同音接龍。
const idioms = [
  // 第一級：以常見、易理解的成語為主。
  { text: "一心一意", level: 1, start: "yi", end: "yi", meaning: "形容專心一致。" },
  { text: "一舉兩得", level: 1, start: "yi", end: "de", meaning: "做一件事，同時得到兩方面的好處。" },
  { text: "得心應手", level: 1, start: "de", end: "shou", meaning: "形容做事順利、運用自如。" },
  { text: "手舞足蹈", level: 1, start: "shou", end: "dao", meaning: "形容非常高興的樣子。" },
  { text: "道聽途說", level: 1, start: "dao", end: "shuo", meaning: "從路上聽來的話，沒有根據。" },
  { text: "說一不二", level: 1, start: "shuo", end: "er", meaning: "說話算數，說到做到。" },
  { text: "二話不說", level: 1, start: "er", end: "shuo", meaning: "不說任何推託的話，立刻採取行動。" },
  { text: "同心協力", level: 1, start: "tong", end: "li", meaning: "大家齊心合作，一起努力。" },
  { text: "力不從心", level: 1, start: "li", end: "xin", meaning: "心裡想做，力量或能力卻辦不到。" },
  { text: "心想事成", level: 1, start: "xin", end: "cheng", meaning: "希望的事情都能順利實現。" },
  { text: "成千上萬", level: 1, start: "cheng", end: "wan", meaning: "形容數量非常多。" },
  { text: "萬事如意", level: 1, start: "wan", end: "yi", meaning: "祝福一切事情都順心如願。" },
  { text: "如魚得水", level: 1, start: "ru", end: "shui", meaning: "比喻得到合適的環境或幫助。" },
  { text: "水到渠成", level: 1, start: "shui", end: "cheng", meaning: "條件成熟，事情自然成功。" },
  { text: "成竹在胸", level: 1, start: "cheng", end: "xiong", meaning: "比喻做事之前已經有完整的想法。" },
  { text: "胸有成竹", level: 1, start: "xiong", end: "zhu", meaning: "比喻做事很有把握。" },
  { text: "竹報平安", level: 1, start: "zhu", end: "an", meaning: "借報平安的家書或消息。" },
  { text: "安居樂業", level: 1, start: "an", end: "ye", meaning: "安定生活，愉快工作。" },
  { text: "業精於勤", level: 1, start: "ye", end: "qin", meaning: "學業或技藝因勤奮而精進。" },
  { text: "勤能補拙", level: 1, start: "qin", end: "zhuo", meaning: "勤奮可以彌補天分或能力的不足。" },
  { text: "卓有成效", level: 1, start: "zhuo", end: "xiao", meaning: "成果或效果十分顯著。" },
  { text: "笑逐顏開", level: 1, start: "xiao", end: "kai", meaning: "形容滿臉笑容、非常開心。" },
  { text: "開門見山", level: 1, start: "kai", end: "shan", meaning: "說話或寫文章直接切入主題。" },
  { text: "山清水秀", level: 1, start: "shan", end: "xiu", meaning: "形容風景優美。" },
  { text: "秀外慧中", level: 1, start: "xiu", end: "zhong", meaning: "外表秀麗，內心聰慧。" },
  { text: "中流砥柱", level: 1, start: "zhong", end: "zhu", meaning: "比喻在艱難環境中能擔當重任的人。" },
  { text: "助人為樂", level: 1, start: "zhu", end: "le", meaning: "以幫助別人為快樂。" },
  { text: "樂在其中", level: 1, start: "le", end: "zhong", meaning: "從所做的事情中得到樂趣。" },
  // 第二級：加入較多變化與需要理解語境的成語。
  { text: "事半功倍", level: 2, start: "shi", end: "bei", meaning: "花費較少力氣，收到較大成效。" },
  { text: "背水一戰", level: 2, start: "bei", end: "zhan", meaning: "比喻抱著必勝決心，作最後努力。" },
  { text: "戰無不勝", level: 2, start: "zhan", end: "sheng", meaning: "形容力量強大，沒有打不贏的仗。" },
  { text: "勝券在握", level: 2, start: "sheng", end: "wo", meaning: "形容很有把握取得勝利。" },
  { text: "臥薪嘗膽", level: 2, start: "wo", end: "dan", meaning: "刻苦自勵，立志雪恥或完成目標。" },
  { text: "膽大心細", level: 2, start: "dan", end: "xi", meaning: "做事勇敢而且思慮周密。" },
  { text: "細水長流", level: 2, start: "xi", end: "liu", meaning: "比喻節省使用，才能長久不缺。" },
  { text: "流連忘返", level: 2, start: "liu", end: "fan", meaning: "留戀美好景物或事物，不想離去。" },
  { text: "返璞歸真", level: 2, start: "fan", end: "zhen", meaning: "回復自然純真的本性。" },
  { text: "真才實學", level: 2, start: "zhen", end: "xue", meaning: "真正的才能和扎實的學問。" },
  { text: "學以致用", level: 2, start: "xue", end: "yong", meaning: "把學到的知識實際運用。" },
  { text: "用心良苦", level: 2, start: "yong", end: "ku", meaning: "費盡心思，通常帶有善意。" },
  { text: "苦盡甘來", level: 2, start: "ku", end: "lai", meaning: "艱苦的日子過去，美好的日子到來。" },
  { text: "來日方長", level: 2, start: "lai", end: "chang", meaning: "未來還有很多時間可以努力或相處。" },
  { text: "長年累月", level: 2, start: "chang", end: "yue", meaning: "經過很長的時間。" },
  { text: "月明星稀", level: 2, start: "yue", end: "xi", meaning: "月亮明亮時，星星顯得稀少。" },
  { text: "稀世之寶", level: 2, start: "xi", end: "bao", meaning: "世上少有的珍貴寶物。" },
  { text: "寶刀未老", level: 2, start: "bao", end: "lao", meaning: "年紀雖大，能力或精神仍不減當年。" },
  { text: "老當益壯", level: 2, start: "lao", end: "zhuang", meaning: "年紀雖大，志氣和體力仍然旺盛。" },
  { text: "壯志凌雲", level: 2, start: "zhuang", end: "yun", meaning: "遠大的志向高入雲霄。" },
  { text: "雲淡風輕", level: 2, start: "yun", end: "qing", meaning: "形容天氣晴朗，也比喻閒適恬淡。" },
  { text: "輕而易舉", level: 2, start: "qing", end: "ju", meaning: "事情容易完成，不費什麼力氣。" },
  { text: "舉一反三", level: 2, start: "ju", end: "san", meaning: "從一件事推知其他相似的事情。" },
  { text: "三思而行", level: 2, start: "san", end: "xing", meaning: "經過反覆考慮後再採取行動。" },
  { text: "行之有效", level: 2, start: "xing", end: "xiao", meaning: "實行起來確實有效果。" },
  { text: "開源節流", level: 2, start: "kai", end: "liu", meaning: "增加收入來源並節省支出。" },
  { text: "有始有終", level: 2, start: "you", end: "zhong", meaning: "做事能堅持到底，不半途而廢。" },
  // 第三級：使用較抽象的描述與較少見的成語。
  { text: "笑裡藏刀", level: 3, start: "xiao", end: "dao", meaning: "外表和善，內心卻暗藏害人心思。" },
  { text: "刀光劍影", level: 3, start: "dao", end: "ying", meaning: "形容激烈的搏鬥或充滿危險的氣氛。" },
  { text: "迎刃而解", level: 3, start: "ying", end: "jie", meaning: "主要問題解決後，其他問題也容易處理。" },
  { text: "借題發揮", level: 3, start: "jie", end: "hui", meaning: "藉著某件事表達其他想法或批評。" },
  { text: "揮灑自如", level: 3, start: "hui", end: "ru", meaning: "寫作、作畫或做事流暢而熟練。" },
  { text: "如釋重負", level: 3, start: "ru", end: "fu", meaning: "像放下重擔一樣，感到輕鬆。" },
  { text: "負荊請罪", level: 3, start: "fu", end: "zui", meaning: "主動承認錯誤，向對方賠罪。" },
  { text: "罪有應得", level: 3, start: "zui", end: "de", meaning: "所受的懲罰與所犯的罪行相稱。" },
  { text: "得天獨厚", level: 3, start: "de", end: "hou", meaning: "具備特別優越的條件。" },
  { text: "厚積薄發", level: 3, start: "hou", end: "fa", meaning: "長期累積實力，然後充分展現。" },
  { text: "發人深省", level: 3, start: "fa", end: "xing", meaning: "啟發人深入思考並有所醒悟。" },
  { text: "興高采烈", level: 3, start: "xing", end: "lie", meaning: "情緒高昂，十分愉快。" },
  { text: "烈日當空", level: 3, start: "lie", end: "kong", meaning: "形容太陽猛烈地照在天空中。" },
  { text: "空前絕後", level: 3, start: "kong", end: "hou", meaning: "以前沒有過，將來也難以再有。" },
  { text: "後起之秀", level: 3, start: "hou", end: "xiu", meaning: "後來出現的優秀人物。" },
  { text: "胸懷大志", level: 3, start: "xiong", end: "zhi", meaning: "心中懷有遠大的志向。" },
  { text: "志同道合", level: 3, start: "zhi", end: "he", meaning: "志向相同，意見和興趣也一致。" },
  { text: "和衷共濟", level: 3, start: "he", end: "ji", meaning: "大家同心協力，共同克服困難。" },
  { text: "集思廣益", level: 3, start: "ji", end: "yi", meaning: "集合眾人的想法，讓成果更完善。" },
  { text: "一鳴驚人", level: 3, start: "yi", end: "ren", meaning: "平時不突出，一表現就有驚人成績。" },
  { text: "人定勝天", level: 3, start: "ren", end: "tian", meaning: "人的努力可以克服自然或環境的困難。" },
  { text: "天馬行空", level: 3, start: "tian", end: "kong", meaning: "思想奔放不受拘束，也形容文筆豪放。" },
  // 第四級：加入典故與較精確的語意辨析。
  { text: "流芳百世", level: 4, start: "liu", end: "shi", meaning: "美好的名聲流傳後世。" },
  { text: "世外桃源", level: 4, start: "shi", end: "yuan", meaning: "與世隔絕、安樂美好的地方。" },
  { text: "源遠流長", level: 4, start: "yuan", end: "chang", meaning: "歷史悠久，根源深遠。" },
  { text: "長驅直入", level: 4, start: "chang", end: "ru", meaning: "迅速前進，沒有阻礙。" },
  { text: "入木三分", level: 4, start: "ru", end: "fen", meaning: "形容書法筆力強，也比喻見解深刻。" },
  { text: "分庭抗禮", level: 4, start: "fen", end: "li", meaning: "雙方地位相等，互相以平等態度相待。" },
  { text: "禮尚往來", level: 4, start: "li", end: "lai", meaning: "接受對方的禮物或好意，也要回應。" },
  { text: "來勢洶洶", level: 4, start: "lai", end: "xiong", meaning: "形容人或事物到來時聲勢很大。" },
  { text: "胸無城府", level: 4, start: "xiong", end: "fu", meaning: "待人坦率真誠，沒有心機。" },
  { text: "腹背受敵", level: 4, start: "fu", end: "di", meaning: "前後都受到敵人攻擊。" },
  { text: "滴水穿石", level: 4, start: "di", end: "shi", meaning: "持續努力，終能完成艱難的事情。" },
  { text: "石破天驚", level: 4, start: "shi", end: "jing", meaning: "文章或事情新奇驚人，令人震撼。" },
  { text: "驚天動地", level: 4, start: "jing", end: "di", meaning: "形容聲勢或影響力非常巨大。" },
  { text: "地大物博", level: 4, start: "di", end: "bo", meaning: "土地廣大，物產豐富。" },
  { text: "博古通今", level: 4, start: "bo", end: "jin", meaning: "學識淵博，通曉古今。" },
  { text: "今非昔比", level: 4, start: "jin", end: "bi", meaning: "現在的情況已不同於過去。" },
  { text: "比比皆是", level: 4, start: "bi", end: "shi", meaning: "到處都是，數量很多。" },
  { text: "是非分明", level: 4, start: "shi", end: "ming", meaning: "清楚分辨正確與錯誤。" },
  { text: "明察秋毫", level: 4, start: "ming", end: "hao", meaning: "觀察非常敏銳，連細微之處都看得清楚。" },
  { text: "毫不猶豫", level: 4, start: "hao", end: "yu", meaning: "非常果斷，完全不遲疑。" },
  // 第五級：以典故、抽象概念和較高難度詞彙收尾。
  { text: "玉石俱焚", level: 5, start: "yu", end: "fen", meaning: "好人和壞人一起遭受毀滅。" },
  { text: "焚膏繼晷", level: 5, start: "fen", end: "gui", meaning: "夜以繼日地勤奮讀書或工作。" },
  { text: "鬼斧神工", level: 5, start: "gui", end: "gong", meaning: "形容技藝或自然景物精巧得不像人工所成。" },
  { text: "功成名就", level: 5, start: "gong", end: "jiu", meaning: "建立功業，取得名聲。" },
  { text: "就地取材", level: 5, start: "jiu", end: "cai", meaning: "在當地取用所需的材料。" },
  { text: "才高八斗", level: 5, start: "cai", end: "dou", meaning: "形容文才極高。" },
  { text: "斗轉星移", level: 5, start: "dou", end: "yi", meaning: "時序改變，歲月流逝。" },
  { text: "遺臭萬年", level: 5, start: "yi", end: "nian", meaning: "壞名聲永遠流傳，遭人唾罵。" },
  { text: "年富力強", level: 5, start: "nian", end: "qiang", meaning: "年紀不大，精力旺盛。" },
  { text: "強詞奪理", level: 5, start: "qiang", end: "li", meaning: "沒有道理卻硬要爭辯。" },
  { text: "理直氣壯", level: 5, start: "li", end: "zhuang", meaning: "理由正當充分，說話便有氣勢。" },
  { text: "壯志未酬", level: 5, start: "zhuang", end: "chou", meaning: "遠大的志願尚未實現。" },
  { text: "躊躇滿志", level: 5, start: "chou", end: "zhi", meaning: "對自己的成就或前途非常得意、有信心。" },
  { text: "紙上談兵", level: 5, start: "zhi", end: "bing", meaning: "只談理論，不能解決實際問題。" },
  { text: "兵不厭詐", level: 5, start: "bing", end: "zha", meaning: "用兵時不排斥使用巧妙策略。" },
  { text: "紮根立足", level: 5, start: "zha", end: "zu", meaning: "建立穩固的基礎並站穩腳步。" },
  { text: "足智多謀", level: 5, start: "zu", end: "mou", meaning: "聰明而且善於策畫。" },
  { text: "謀事在人", level: 5, start: "mou", end: "ren", meaning: "事情的安排取決於人的努力。" },
  { text: "人定勝天", level: 5, start: "ren", end: "tian", meaning: "人的努力可以克服自然或環境的困難。" },
  // 常用四字詞語：加入生活、學習與自然主題，玩家和老師都能使用。
  { text: "早睡早起", level: 1, start: "zao", end: "qi", meaning: "養成規律的作息習慣。" },
  { text: "快樂學習", level: 1, start: "kuai", end: "xi", meaning: "保持愉快的心情學習新知識。" },
  { text: "家庭作業", level: 1, start: "jia", end: "ye", meaning: "學生在家完成的學習練習。" },
  { text: "校園生活", level: 1, start: "xiao", end: "huo", meaning: "在學校中學習、交友與生活的日常。" },
  { text: "生日快樂", level: 1, start: "sheng", end: "le", meaning: "祝福生日的人平安愉快。" },
  { text: "天氣晴朗", level: 1, start: "tian", end: "lang", meaning: "天空少雲，陽光明亮。" },
  { text: "讀書寫字", level: 1, start: "du", end: "zi", meaning: "閱讀書本並練習書寫。" },
  { text: "一日三餐", level: 1, start: "yi", end: "can", meaning: "每天固定的早、午、晚三餐。" },
  { text: "四季變化", level: 1, start: "si", end: "hua", meaning: "春夏秋冬隨時間產生的變化。" },
  { text: "小鳥飛翔", level: 1, start: "xiao", end: "xiang", meaning: "小鳥張開翅膀在空中飛行。" },
  { text: "綠色植物", level: 1, start: "lv", end: "wu", meaning: "含有葉綠素、能進行光合作用的植物。" },
  { text: "生活安全", level: 1, start: "sheng", end: "quan", meaning: "日常生活中保護自己與他人的安全。" },
  { text: "交通安全", level: 1, start: "jiao", end: "quan", meaning: "遵守規則以保障行人與用路人的安全。" },
  { text: "慢慢長大", level: 1, start: "man", end: "da", meaning: "隨著時間逐漸成長。" },
  { text: "運動健身", level: 2, start: "yun", end: "shen", meaning: "透過運動增進體能與健康。" },
  { text: "友善待人", level: 2, start: "you", end: "ren", meaning: "以親切、尊重的態度對待別人。" },
  { text: "海洋生物", level: 2, start: "hai", end: "wu", meaning: "生活在海洋中的各種生物。" },
  { text: "自然科學", level: 2, start: "zi", end: "xue", meaning: "研究自然現象與規律的學科。" },
  { text: "環境保護", level: 2, start: "huan", end: "hu", meaning: "維護自然環境並減少污染。" },
  { text: "社區服務", level: 2, start: "she", end: "wu", meaning: "為社區居民提供協助或公共服務。" },
  { text: "文化藝術", level: 2, start: "wen", end: "shu", meaning: "以創作與表演呈現生活和思想。" },
  { text: "食物營養", level: 2, start: "shi", end: "yang", meaning: "食物提供身體所需的各種養分。" },
  { text: "動物世界", level: 2, start: "dong", end: "jie", meaning: "各種動物及其生活環境的總稱。" },
  { text: "健康生活", level: 2, start: "jian", end: "huo", meaning: "維持身心健康的日常生活方式。" },
  { text: "人工智慧", level: 3, start: "ren", end: "hui", meaning: "讓電腦執行需要智慧判斷的技術。" },
  { text: "資訊科技", level: 3, start: "zi", end: "ji", meaning: "用電腦與通訊工具處理資訊的技術。" },
  { text: "能源轉型", level: 3, start: "neng", end: "xing", meaning: "能源供應逐步轉向更永續的方式。" },
  { text: "社會議題", level: 3, start: "she", end: "ti", meaning: "與社會生活及公共利益相關的問題。" },
  { text: "生態系統", level: 3, start: "sheng", end: "tong", meaning: "生物與其環境互相作用形成的整體。" },
  { text: "文化資產", level: 3, start: "wen", end: "chan", meaning: "具有歷史或文化價值的有形與無形資源。" },
  { text: "語言學習", level: 3, start: "yu", end: "xi", meaning: "理解並運用一種語言的學習過程。" },
  { text: "數位生活", level: 3, start: "shu", end: "huo", meaning: "運用數位科技進行日常活動的生活方式。" },
  { text: "資料分析", level: 3, start: "zi", end: "xi", meaning: "整理與解讀資料以找出有用資訊。" },
  { text: "創意思考", level: 3, start: "chuang", end: "kao", meaning: "運用想像力提出新點子或解決方法。" },
  { text: "全球暖化", level: 4, start: "quan", end: "hua", meaning: "地球平均氣溫長期上升的現象。" },
  { text: "經濟發展", level: 4, start: "jing", end: "zhan", meaning: "一個地區的生產、收入與產業逐步成長。" },
  { text: "歷史脈絡", level: 4, start: "li", end: "luo", meaning: "事件在歷史背景中的前因後果與關聯。" },
  { text: "哲學思辨", level: 4, start: "zhe", end: "bian", meaning: "透過理性推論探討根本問題。" },
  { text: "科技創新", level: 4, start: "ke", end: "xin", meaning: "以新技術或新方法改善既有事物。" },
  { text: "網路安全", level: 4, start: "wang", end: "quan", meaning: "保護網路系統、資料與使用者免受威脅。" },
  { text: "永續發展", level: 5, start: "yong", end: "zhan", meaning: "兼顧環境、社會與經濟的長期發展。" },
  { text: "氣候變遷", level: 5, start: "qi", end: "qian", meaning: "長期氣候型態發生顯著改變。" },
  { text: "社會責任", level: 5, start: "she", end: "ren", meaning: "個人或組織對社會應承擔的義務。" },
  { text: "資訊安全", level: 5, start: "zi", end: "quan", meaning: "保護資訊的機密性、正確性與可用性。" },
  // 常見成語補充：納入入門玩家常想到的成語。
  { text: "一帆風順", level: 1, start: "yi", end: "shun", meaning: "事情進行順利，沒有阻礙。" },
  { text: "一馬當先", level: 1, start: "yi", end: "xian", meaning: "形容領先或帶頭前進。" },
  { text: "一見鍾情", level: 1, start: "yi", end: "qing", meaning: "初次見面就產生愛慕之情。" },
  { text: "一清二楚", level: 1, start: "yi", end: "chu", meaning: "非常清楚明白。" },
  { text: "一無所有", level: 1, start: "yi", end: "you", meaning: "什麼也沒有。" },
  { text: "一望無際", level: 1, start: "yi", end: "ji", meaning: "視線所及非常遼闊，看不到邊界。" },
  { text: "一鼓作氣", level: 1, start: "yi", end: "qi", meaning: "趁著士氣高昂時一次完成。" },
  { text: "一目了然", level: 1, start: "yi", end: "ran", meaning: "看一眼就能明白。" },
  { text: "一日千里", level: 1, start: "yi", end: "li", meaning: "進步或發展非常迅速。" },
  { text: "一石二鳥", level: 2, start: "yi", end: "niao", meaning: "做一件事同時達成兩個目的。" },
  { text: "義不容辭", level: 2, start: "yi", end: "ci", meaning: "道義上不容許推辭，應該勇於承擔。" },
  { text: "一箭雙雕", level: 2, start: "yi", end: "diao", meaning: "做一件事同時達到兩個目標。" },
  { text: "鳥語花香", level: 1, start: "niao", end: "xiang", meaning: "形容春天景色優美、生機盎然。" },
  { text: "相得益彰", level: 2, start: "xiang", end: "zhang", meaning: "兩者互相配合，使優點更加突出。" },
  { text: "張燈結彩", level: 2, start: "zhang", end: "cai", meaning: "掛上燈籠、繫上彩綢，形容節慶熱鬧。" },
  { text: "辭舊迎新", level: 1, start: "ci", end: "xin", meaning: "告別舊的一年，迎接新的一年。" },
  { text: "雕蟲小技", level: 2, start: "diao", end: "ji", meaning: "比喻微不足道的小技能，常作謙詞。" },
  { text: "愛不釋手", level: 1, start: "ai", end: "shou", meaning: "喜愛到捨不得放下。" },
  { text: "安然無恙", level: 1, start: "an", end: "yang", meaning: "平安無事，沒有受到損害。" },
  { text: "百花齊放", level: 1, start: "bai", end: "fang", meaning: "各種花朵一同盛開，也比喻不同事物蓬勃發展。" },
  { text: "百發百中", level: 1, start: "bai", end: "zhong", meaning: "每次射擊都命中目標，也比喻做事有把握。" },
  { text: "百聞不如一見", level: 1, start: "bai", end: "jian", meaning: "聽別人說很多次，不如親自看一次。" },
  { text: "半途而廢", level: 1, start: "ban", end: "fei", meaning: "事情做到一半就停止。" },
  { text: "杯弓蛇影", level: 1, start: "bei", end: "ying", meaning: "因疑神疑鬼而自己嚇自己。" },
  { text: "別出心裁", level: 1, start: "bie", end: "cai", meaning: "想法或設計與眾不同。" },
  { text: "不恥下問", level: 1, start: "bu", end: "wen", meaning: "不因對象地位較低或知識較少而羞於請教。" },
  { text: "不約而同", level: 1, start: "bu", end: "tong", meaning: "沒有事先約定，想法或行動卻相同。" },
  { text: "不知所措", level: 1, start: "bu", end: "cuo", meaning: "不知道該怎麼辦才好。" },
  { text: "不折不扣", level: 1, start: "bu", end: "kou", meaning: "完全符合，沒有折減。" },
  { text: "草木皆兵", level: 1, start: "cao", end: "bing", meaning: "形容人在驚慌時疑神疑鬼。" },
  { text: "車水馬龍", level: 1, start: "che", end: "long", meaning: "形容車馬往來繁忙熱鬧。" },
  { text: "出類拔萃", level: 1, start: "chu", end: "cui", meaning: "才能或表現超出一般人。" },
  { text: "春風化雨", level: 1, start: "chun", end: "yu", meaning: "良好的教育或影響如春風細雨般深入人心。" },
  { text: "從容不迫", level: 1, start: "cong", end: "po", meaning: "態度沉著，不慌不忙。" },
  { text: "大公無私", level: 1, start: "da", end: "si", meaning: "處事公正，不偏袒自己或親友。" },
  { text: "大驚小怪", level: 1, start: "da", end: "guai", meaning: "對平常的事情表現得過分驚訝。" },
  { text: "大開眼界", level: 1, start: "da", end: "jie", meaning: "見識到新鮮或特別的事物。" },
  { text: "大同小異", level: 1, start: "da", end: "yi", meaning: "大致相同，只有少部分不同。" },
  { text: "東張西望", level: 1, start: "dong", end: "wang", meaning: "四處張望。" },
  { text: "對牛彈琴", level: 1, start: "dui", end: "qin", meaning: "對不懂道理的人講深奧的道理。" },
  { text: "耳目一新", level: 1, start: "er", end: "xin", meaning: "所見所聞都讓人感到新鮮。" },
  { text: "發揚光大", level: 1, start: "fa", end: "da", meaning: "使優良的傳統或事物更加發展。" },
  { text: "翻山越嶺", level: 1, start: "fan", end: "ling", meaning: "越過許多山嶺，形容旅途辛苦。" },
  { text: "風和日麗", level: 1, start: "feng", end: "li", meaning: "微風和煦、陽光明亮，形容天氣晴朗。" },
  { text: "風平浪靜", level: 1, start: "feng", end: "jing", meaning: "沒有風浪，也比喻平靜安穩。" },
  { text: "風雨同舟", level: 1, start: "feng", end: "zhou", meaning: "共同面對困難，互相扶持。" },
  { text: "各有千秋", level: 1, start: "ge", end: "qiu", meaning: "各有各的長處和特色。" },
  { text: "海闊天空", level: 1, start: "hai", end: "kong", meaning: "天地遼闊，也比喻心胸開闊或無拘無束。" },
  { text: "含辛茹苦", level: 1, start: "han", end: "ku", meaning: "忍受辛苦，承受艱難。" },
  { text: "和顏悅色", level: 1, start: "he", end: "se", meaning: "態度和善、面容愉快。" },
  { text: "虎頭蛇尾", level: 1, start: "hu", end: "wei", meaning: "開始時聲勢很大，後來卻草草收場。" },
  { text: "畫龍點睛", level: 1, start: "hua", end: "jing", meaning: "在關鍵處加上一筆，使內容更加生動有力。" },
  { text: "化險為夷", level: 1, start: "hua", end: "yi", meaning: "把危險轉化為平安。" },
  { text: "歡天喜地", level: 1, start: "huan", end: "di", meaning: "非常歡喜快樂。" },
  { text: "回味無窮", level: 1, start: "hui", end: "qiong", meaning: "事後仍然覺得有趣或值得細細體會。" },
  { text: "家喻戶曉", level: 1, start: "jia", end: "xiao", meaning: "每家每戶都知道，形容廣為人知。" },
  { text: "見多識廣", level: 1, start: "jian", end: "guang", meaning: "經歷多、知識廣。" },
  { text: "見義勇為", level: 1, start: "jian", end: "wei", meaning: "看見合乎正義的事，就勇敢地去做。" },
  { text: "交頭接耳", level: 1, start: "jiao", end: "er", meaning: "靠近彼此低聲交談。" },
  { text: "腳踏實地", level: 1, start: "jiao", end: "di", meaning: "做事認真踏實，不浮誇。" },
  { text: "井然有序", level: 1, start: "jing", end: "xu", meaning: "整齊而有條理。" },
  { text: "舉世聞名", level: 1, start: "ju", end: "ming", meaning: "全世界都知道，形容非常有名。" },
  { text: "舉足輕重", level: 1, start: "ju", end: "zhong", meaning: "所處地位重要，一舉一動都會影響大局。" },
  { text: "口是心非", level: 1, start: "kou", end: "fei", meaning: "嘴上說的和心裡想的不一致。" },
  { text: "苦口婆心", level: 1, start: "ku", end: "xin", meaning: "懇切耐心地再三勸告。" },
  { text: "快馬加鞭", level: 1, start: "kuai", end: "bian", meaning: "加快速度，努力向前。" },
  { text: "理所當然", level: 1, start: "li", end: "ran", meaning: "按道理應該如此。" },
  { text: "兩全其美", level: 1, start: "liang", end: "mei", meaning: "做事兼顧兩方面，使雙方都好。" },
  { text: "名副其實", level: 1, start: "ming", end: "shi", meaning: "名稱或名聲與實際情況相符合。" },
  { text: "目不轉睛", level: 1, start: "mu", end: "jing", meaning: "專注地看著，眼睛一動也不動。" },
  { text: "迫不及待", level: 1, start: "po", end: "dai", meaning: "急切得不能再等待。" },
  { text: "千方百計", level: 1, start: "qian", end: "ji", meaning: "想盡各種方法。" },
  { text: "千鈞一髮", level: 1, start: "qian", end: "fa", meaning: "情況非常危急。" },
  { text: "前所未有", level: 1, start: "qian", end: "you", meaning: "以前從未發生或出現過。" },
  { text: "人山人海", level: 1, start: "ren", end: "hai", meaning: "聚集的人非常多。" },
  { text: "日新月異", level: 1, start: "ri", end: "yi", meaning: "每天每月都有新的變化，進步很快。" },
  { text: "如火如荼", level: 1, start: "ru", end: "tu", meaning: "氣勢熱烈、活動蓬勃。" },
  { text: "三心二意", level: 1, start: "san", end: "yi", meaning: "心思不專一，猶豫不定。" },
  { text: "深思熟慮", level: 1, start: "shen", end: "lv", meaning: "仔細深入地考慮。" },
  { text: "十全十美", level: 1, start: "shi", end: "mei", meaning: "各方面都非常完美。" },
  { text: "水落石出", level: 1, start: "shui", end: "chu", meaning: "水退去後石頭顯露，比喻真相大白。" },
  { text: "順水推舟", level: 1, start: "shun", end: "zhou", meaning: "順著情勢做事，也比喻順勢行動。" },
  { text: "四海為家", level: 1, start: "si", end: "jia", meaning: "把各地都當作自己的家。" },
  { text: "談笑風生", level: 1, start: "tan", end: "sheng", meaning: "談話時有說有笑，氣氛活躍。" },
  { text: "天長地久", level: 1, start: "tian", end: "jiu", meaning: "形容時間長久，也常用來形容感情深厚。" },
  { text: "天翻地覆", level: 1, start: "tian", end: "fu", meaning: "變化極大，也形容鬧得非常厲害。" },
  { text: "萬紫千紅", level: 1, start: "wan", end: "hong", meaning: "百花盛開、色彩繽紛的景象。" },
  { text: "無微不至", level: 1, start: "wu", end: "zhi", meaning: "照顧得非常周到細心。" },
  { text: "喜出望外", level: 1, start: "xi", end: "wai", meaning: "遇到意想不到的好事而特別高興。" },
  { text: "心花怒放", level: 1, start: "xin", end: "fang", meaning: "心情非常愉快、興奮。" },
  { text: "循序漸進", level: 1, start: "xun", end: "jin", meaning: "按照一定步驟逐漸深入或提高。" },
  { text: "雪中送炭", level: 1, start: "xue", end: "tan", meaning: "在別人急需時給予幫助。" },
  { text: "揚眉吐氣", level: 1, start: "yang", end: "qi", meaning: "擺脫受挫的處境後感到舒暢得意。" },
  { text: "飲水思源", level: 1, start: "yin", end: "yuan", meaning: "不忘本，懂得感謝事情的來源。" },
  { text: "引人入勝", level: 1, start: "yin", end: "sheng", meaning: "吸引人深入其中，常形容風景或作品有趣。" },
  { text: "有條不紊", level: 1, start: "you", end: "wen", meaning: "做事或說話有條理、不混亂。" },
  { text: "再接再厲", level: 1, start: "zai", end: "li", meaning: "繼續努力，不斷進步。" },
  { text: "爭先恐後", level: 1, start: "zheng", end: "hou", meaning: "搶著向前，唯恐落後。" },
  { text: "自告奮勇", level: 1, start: "zi", end: "yong", meaning: "主動請求承擔任務。" },
  { text: "自相矛盾", level: 1, start: "zi", end: "dun", meaning: "自己的說法或行為互相抵觸。" },
];

// 保存遊戲畫面、玩家輸入與晉級狀態。
let answerInput;
let teacherIdiom;
// 記錄玩家是否已從封面開始遊戲。
let gameStarted = false;
// 記錄妮老師慶祝表情的結束時間。
let teacherCelebrationUntil = 0;
let currentHintUsed = false;
let hintText = "";
// 記錄玩家是否已完成全部五個階級。
let gameCompleted = false;
let teacherLine = "準備好了嗎？老師先出題，換你接下去！";
let feedbackText = "";
let feedbackKind = "neutral";
let currentLevel = 1;
let cleanStreak = 0;
let totalCorrect = 0;
let roundHistory = [];
let buttonRects = {};
// 保存封面開始按鈕的點擊範圍。
let coverButtonRect = null;
// 保存通關頁再玩一次按鈕的點擊範圍。
let replayButtonRect = null;
let canvasScale = 1;
// 快取拼音結果，避免每次重繪畫面都重新轉換。
const pinyinCache = new Map();
// 為五個階級準備彼此不同的整體配色。
const levelThemes = [
  { background: "#f4f2e9", grid: "#e8e5d9", decorOne: "#e1eee5", decorTwo: "#f1dfd2", ink: "#263b35", muted: "#718078", badge: "#263b35", badgeText: "#f7f4e9", panel: "#fffdf7", shadow: "#d9ddd3", border: "#dfe3d8", teacherPanel: "#edf3e8", outfit: "#c96f68", card: "#f7f1df", cardAccent: "#9b654f", highlight: "#c56b4f", track: "#e7e9df", progress: "#4d8b72", button: "#365f51", buttonText: "#ffffff", hintButton: "#e9eee5", hintText: "#38594b" },
  { background: "#edf4f7", grid: "#dce8ed", decorOne: "#d7e9e9", decorTwo: "#f4e3bf", ink: "#253b4b", muted: "#617c89", badge: "#28677a", badgeText: "#f5fbfb", panel: "#fcfeff", shadow: "#d2e0e5", border: "#d3e2e8", teacherPanel: "#e2eff1", outfit: "#4e8d9b", card: "#e7f1f5", cardAccent: "#426f81", highlight: "#4e8d9b", track: "#dbe6e8", progress: "#327d88", button: "#28677a", buttonText: "#ffffff", hintButton: "#dfedf0", hintText: "#315e68" },
  { background: "#f7eff2", grid: "#ecdfe5", decorOne: "#f1dce5", decorTwo: "#e0ece7", ink: "#452d3c", muted: "#856779", badge: "#9a5574", badgeText: "#fff8f9", panel: "#fffafd", shadow: "#e4d7df", border: "#e9d8e1", teacherPanel: "#f3e4eb", outfit: "#b85e79", card: "#f7e9ef", cardAccent: "#9a5574", highlight: "#c06b82", track: "#eadde3", progress: "#a64e68", button: "#9a5574", buttonText: "#ffffff", hintButton: "#f4e3e9", hintText: "#724258" },
  { background: "#f5f2e5", grid: "#e8e4d0", decorOne: "#e7edcf", decorTwo: "#f1dfbf", ink: "#3d3a26", muted: "#807a52", badge: "#697543", badgeText: "#fffdf2", panel: "#fffef9", shadow: "#dedcc7", border: "#e4e0c8", teacherPanel: "#eeeedb", outfit: "#8d9551", card: "#f3f0d9", cardAccent: "#777242", highlight: "#b27b3f", track: "#e9e4ca", progress: "#788344", button: "#687343", buttonText: "#ffffff", hintButton: "#eeedda", hintText: "#555d34" },
  { background: "#efedf4", grid: "#dedbe8", decorOne: "#e4dfef", decorTwo: "#f2dfd0", ink: "#322e48", muted: "#716b86", badge: "#514a76", badgeText: "#f9f7ff", panel: "#fffefe", shadow: "#d8d5e2", border: "#e0ddea", teacherPanel: "#ebe8f3", outfit: "#655c94", card: "#f0edf7", cardAccent: "#665d8a", highlight: "#d07b52", track: "#e3dfec", progress: "#665d8a", button: "#514a76", buttonText: "#ffffff", hintButton: "#e9e6f1", hintText: "#514a76" },
];

// 取得目前階級對應的主題色。
function getCurrentTheme() {
  return levelThemes[currentLevel - 1];
}

// 建立滿版畫布與可輸入中文的網頁輸入框。
function setup() {
  // 依照瀏覽器視窗大小建立畫布。
  createCanvas(windowWidth, windowHeight);
  // 設定畫布的繪圖模式與像素密度。
  pixelDensity(1);
  // 建立原生輸入欄，讓中文輸入法能正常組字。
  answerInput = createInput("");
  // 設定輸入欄的提示文字與無障礙標籤。
  answerInput.attribute("placeholder", "輸入任意四字成語或詞語");
  answerInput.attribute("aria-label", "輸入四字成語或詞語");
  // 設定輸入欄的外觀與位置層級。
  answerInput.style("position", "absolute");
  answerInput.style("box-sizing", "border-box");
  answerInput.style("border", "0");
  answerInput.style("outline", "0");
  answerInput.style("background", "transparent");
  answerInput.style("color", "#24302d");
  answerInput.style("font-family", "'Noto Sans TC', 'Microsoft JhengHei', sans-serif");
  answerInput.style("font-size", "20px");
  answerInput.style("z-index", "2");
  // 遊戲開始前先隱藏作答輸入欄。
  answerInput.style("display", "none");
  // 輸入完成後按 Enter 即可送出答案。
  answerInput.elt.addEventListener("keydown", function (event) {
    // 避免輸入法組字時誤送答案。
    if (event.key === "Enter" && !event.isComposing) {
      // 阻止表單預設行為並提交答案。
      event.preventDefault();
      submitAnswer();
    }
  });
  // 設定畫布的無障礙描述。
  describe("全螢幕四字詞語接龍遊戲，點擊開始遊戲後作答。");
}

// 每一幀重新繪製背景、老師、題目與操作控制。
function draw() {
  // 尚未開始時只顯示封面，不進入作答畫面。
  if (!gameStarted) {
    answerInput.style("display", "none");
    drawCover();
    return;
  }
  // 全部通關後切換至獨立的完成頁面。
  if (gameCompleted) {
    answerInput.style("display", "none");
    drawCompletionScreen();
    return;
  }
  // 遊戲開始後顯示原生中文輸入欄。
  answerInput.style("display", "block");
  // 繪製整體背景與裝飾線條。
  drawBackground();
  // 繪製標題列與階級資訊。
  drawHeader();
  // 繪製老師互動區與遊戲內容區。
  drawGameLayout();
  // 將原生輸入欄對齊畫布中的輸入框。
  positionAnswerInput();
}

// 繪製封面標題、妮老師和開始遊戲按鈕。
function drawCover() {
  // 依照第一階的主題色繪製封面背景。
  currentLevel = 1;
  const theme = getCurrentTheme();
  drawBackground();
  // 依照螢幕寬度選擇封面排版方式。
  const compact = width < 760;
  // 設定標題的對齊與主題顏色。
  noStroke();
  fill(theme.ink);
  textAlign(compact ? CENTER : LEFT, CENTER);
  textStyle(BOLD);
  textSize(compact ? 34 : 50);
  text("成語接龍", compact ? width / 2 : width * 0.12, compact ? height * 0.18 : height * 0.32);
  // 顯示封面副標題與簡短玩法提示。
  fill(theme.muted);
  textStyle(NORMAL);
  textSize(compact ? 15 : 18);
  text("和妮老師一起接出下一個四字詞", compact ? width / 2 : width * 0.12, compact ? height * 0.25 : height * 0.4);
  // 顯示開始前的連續答題規則。
  textSize(13);
  text("不用完全相同的字，同音就能接龍", compact ? width / 2 : width * 0.12, compact ? height * 0.30 : height * 0.46);
  // 在桌機右側或手機中央呈現妮老師。
  if (compact) {
    drawTeacher(width * 0.08, height * 0.36, width * 0.84, 138, true);
  } else {
    drawTeacher(width * 0.61, height * 0.12, min(340, width * 0.32), height * 0.73, false);
  }
  // 計算固定尺寸的開始按鈕位置。
  const buttonWidth = 210;
  const buttonHeight = 58;
  const buttonX = compact ? (width - buttonWidth) / 2 : width * 0.12;
  const buttonY = compact ? height - 94 : height * 0.62;
  coverButtonRect = { x: buttonX, y: buttonY, w: buttonWidth, h: buttonHeight };
  // 繪製主題色按鈕與標籤。
  noStroke();
  fill(theme.button);
  roundedRect(buttonX, buttonY, buttonWidth, buttonHeight, 16);
  fill(theme.buttonText);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(18);
  text("開始遊戲", buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
}

// 開始遊戲並抽出第一題。
function startGame() {
  // 切換到遊戲狀態並抽出第一道題目。
  gameStarted = true;
  chooseOpeningPrompt();
  // 顯示並聚焦輸入欄，方便玩家立即作答。
  answerInput.style("display", "block");
  answerInput.elt.focus();
}

// 繪製五階通關頁與再玩一次按鈕。
function drawCompletionScreen() {
  // 通關頁固定使用第五階的主題色。
  currentLevel = 5;
  const theme = getCurrentTheme();
  drawBackground();
  // 以緩慢飄動的彩紙點綴完成畫面。
  noStroke();
  const confettiColors = [theme.highlight, theme.progress, theme.badge, "#e6a95c", "#82a9a0"];
  for (let index = 0; index < 32; index += 1) {
    const confettiX = (index * 97 + frameCount * (index % 3 + 1)) % width;
    const confettiY = (index * 61 + frameCount * 0.35) % height;
    fill(confettiColors[index % confettiColors.length]);
    push();
    translate(confettiX, confettiY);
    rotate((index % 2 ? 1 : -1) * 0.35);
    rect(0, 0, 8, 13, 2);
    pop();
  }
  // 顯示完成標題和簡短鼓勵文字。
  fill(theme.ink);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(width < 520 ? 34 : 48);
  text("恭喜完成！", width / 2, height * 0.17);
  fill(theme.muted);
  textStyle(NORMAL);
  textSize(width < 520 ? 15 : 18);
  text("你已通過全部五個階級", width / 2, height * 0.24);
  // 在手機上縮短角色卡高度，避免擠壓底部按鈕。
  if (width < 760) {
    drawTeacher(width * 0.08, height * 0.31, width * 0.84, 126, true);
  } else {
    drawTeacher(width * 0.35, height * 0.3, width * 0.3, height * 0.38, false);
  }
  // 顯示本次答對總題數。
  fill(theme.ink);
  textStyle(BOLD);
  textSize(16);
  text(`本次答對 ${totalCorrect} 題`, width / 2, height * 0.76);
  // 計算固定尺寸的再玩一次按鈕位置。
  const buttonWidth = 210;
  const buttonHeight = 58;
  const buttonX = (width - buttonWidth) / 2;
  const buttonY = min(height - 88, height * 0.82);
  replayButtonRect = { x: buttonX, y: buttonY, w: buttonWidth, h: buttonHeight };
  // 繪製主題色按鈕和文字。
  fill(theme.button);
  roundedRect(buttonX, buttonY, buttonWidth, buttonHeight, 16);
  fill(theme.buttonText);
  textStyle(BOLD);
  textSize(18);
  text("再玩一次", buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
}

// 重設所有遊戲數值並回到第一階第一題。
function restartGame() {
  // 清除通關、連勝、總分和提示狀態。
  gameCompleted = false;
  currentLevel = 1;
  cleanStreak = 0;
  totalCorrect = 0;
  roundHistory = [];
  currentHintUsed = false;
  hintText = "";
  teacherLine = "準備好了嗎？老師先出題，換你接下去！";
  feedbackText = "";
  feedbackKind = "neutral";
  teacherCelebrationUntil = 0;
  // 重新啟用輸入並抽取新的一輪第一題。
  answerInput.elt.removeAttribute("disabled");
  answerInput.attribute("placeholder", "輸入任意四字成語或詞語");
  answerInput.value("");
  gameStarted = true;
  chooseOpeningPrompt();
  answerInput.style("display", "block");
  answerInput.elt.focus();
}

// 建立低彩度紙感背景與角落裝飾。
function drawBackground() {
  // 依照目前階級套用背景與格線顏色。
  const theme = getCurrentTheme();
  background(theme.background);
  // 以細線排列出淡淡的紙張格紋。
  stroke(theme.grid);
  strokeWeight(1);
  // 依視窗寬度繪製背景直線。
  for (let x = 20; x < width; x += 38) {
    line(x, 0, x, height);
  }
  // 依視窗高度繪製背景橫線。
  for (let y = 18; y < height; y += 38) {
    line(0, y, width, y);
  }
  // 用柔和的色塊平衡畫面重心。
  noStroke();
  fill(theme.decorOne);
  ellipse(width - 18, height - 12, min(width * 0.34, 400));
  fill(theme.decorTwo);
  ellipse(8, 8, min(width * 0.2, 220));
}

// 繪製標題、階級標籤和目前連勝進度。
function drawHeader() {
  // 讀取目前階級的主題色。
  const theme = getCurrentTheme();
  // 設定標題的字體與對齊方式。
  textFont("'Noto Sans TC', 'Microsoft JhengHei', sans-serif");
  textAlign(LEFT, CENTER);
  noStroke();
  // 顯示遊戲名稱。
  fill(theme.ink);
  textStyle(BOLD);
  textSize(width < 520 ? 22 : 27);
  text("四字接龍・闖關課", 28, 34);
  // 顯示簡短的玩法提示。
  fill(theme.muted);
  textStyle(NORMAL);
  textSize(12);
  text("聽老師出題，用同音字接出下一個四字詞語", 30, 60);
  // 顯示目前階級與本級連勝需求。
  const badgeWidth = width < 520 ? 112 : 154;
  const badgeX = width - badgeWidth - 24;
  fill(theme.badge);
  roundedRect(badgeX, 20, badgeWidth, 42, 14);
  fill(theme.badgeText);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(width < 520 ? 12 : 14);
  text(`第 ${currentLevel} 級　${cleanStreak}/${currentLevel * 5}`, badgeX + badgeWidth / 2, 41);
}

// 依照螢幕寬度安排老師和遊戲區，支援桌機與手機版面。
function drawGameLayout() {
  // 取得目前階級的面板底色。
  const theme = getCurrentTheme();
  // 使用視窗寬度判斷是否切換成直向版面。
  const mobileLayout = width < 760;
  // 計算主要面板的邊界。
  const outerX = mobileLayout ? 16 : 24;
  const outerY = 82;
  const outerW = width - outerX * 2;
  const outerH = height - outerY - 18;
  // 繪製主要遊戲面板。
  drawPanel(outerX, outerY, outerW, outerH, theme.panel);
  // 手機採用上方老師、下方題目的直向排列。
  if (mobileLayout) {
    // 繪製精簡版老師互動區。
    drawTeacher(outerX + 16, outerY + 14, outerW - 32, 102, true);
    // 繪製接龍題目與操作按鈕。
    drawPlayArea(outerX + 16, outerY + 128, outerW - 32, outerH - 144, true);
    return;
  }
  // 桌機左側保留較寬的老師互動區。
  const teacherW = min(258, outerW * 0.29);
  // 繪製老師角色與對話。
  drawTeacher(outerX + 14, outerY + 14, teacherW, outerH - 28, false);
  // 繪製主要接龍題目區。
  drawPlayArea(outerX + teacherW + 28, outerY + 14, outerW - teacherW - 42, outerH - 28, false);
}

// 繪製帶有細邊框與輕微陰影的面板。
function drawPanel(panelX, panelY, panelW, panelH, panelColor) {
  // 取得目前階級的面板邊框與陰影色。
  const theme = getCurrentTheme();
  // 先繪製偏移的柔和陰影。
  noStroke();
  fill(theme.shadow);
  roundedRect(panelX, panelY + 5, panelW, panelH, 22);
  // 再繪製面板本體與邊線。
  fill(panelColor);
  stroke(theme.border);
  strokeWeight(1);
  roundedRect(panelX, panelY, panelW, panelH, 22);
  noStroke();
}

// 繪製老師角色、對話內容與鼓勵文字。
function drawTeacher(panelX, panelY, panelW, panelH, compact) {
  // 取得目前階級的老師區與服裝顏色。
  const theme = getCurrentTheme();
  // 在晉級或通關後短暫切換成慶祝表情。
  const celebrating = millis() < teacherCelebrationUntil;
  // 繪製老師角色區的淡綠底色。
  noStroke();
  fill(theme.teacherPanel);
  roundedRect(panelX, panelY, panelW, panelH, 18);
  // 根據版面計算老師插圖的尺寸與位置。
  const avatarSize = compact ? 76 : min(132, panelW * 0.62);
  const avatarX = compact ? panelX + 12 : panelX + panelW / 2;
  const avatarY = compact ? panelY + panelH / 2 : panelY + 24 + avatarSize / 2;
  // 畫出老師的衣服與肩膀。
  noStroke();
  fill(theme.outfit);
  ellipse(avatarX, avatarY + avatarSize * 0.38, avatarSize * 0.92, avatarSize * 0.62);
  // 畫出短版直立兔耳與淡粉色耳朵內側。
  fill("#e9d8c8");
  push();
  translate(avatarX - avatarSize * 0.18, avatarY - avatarSize * 0.31);
  rotate(-0.1);
  ellipse(0, 0, avatarSize * 0.23, avatarSize * 0.5);
  fill("#efb8b2");
  ellipse(0, 0, avatarSize * 0.11, avatarSize * 0.35);
  pop();
  fill("#e9d8c8");
  push();
  translate(avatarX + avatarSize * 0.18, avatarY - avatarSize * 0.31);
  rotate(0.1);
  ellipse(0, 0, avatarSize * 0.23, avatarSize * 0.5);
  fill("#efb8b2");
  ellipse(0, 0, avatarSize * 0.11, avatarSize * 0.35);
  pop();
  // 畫出圓潤的杏白兔臉與奶油色口鼻。
  fill("#f4e8d9");
  ellipse(avatarX, avatarY, avatarSize * 0.68, avatarSize * 0.65);
  fill("#fff7ec");
  ellipse(avatarX, avatarY + avatarSize * 0.15, avatarSize * 0.38, avatarSize * 0.25);
  ellipse(avatarX - avatarSize * 0.1, avatarY + avatarSize * 0.1, avatarSize * 0.19, avatarSize * 0.16);
  ellipse(avatarX + avatarSize * 0.1, avatarY + avatarSize * 0.1, avatarSize * 0.19, avatarSize * 0.16);
  // 畫出腮紅、亮眼睛和兔子的粉色小鼻子。
  fill("#efb8b2");
  ellipse(avatarX - avatarSize * 0.21, avatarY + avatarSize * 0.13, avatarSize * 0.1, avatarSize * 0.06);
  ellipse(avatarX + avatarSize * 0.21, avatarY + avatarSize * 0.13, avatarSize * 0.1, avatarSize * 0.06);
  if (celebrating) {
    // 慶祝時用彎彎的笑眼取代平常的睜眼表情。
    noFill();
    stroke("#5a493f");
    strokeWeight(max(1.5, avatarSize * 0.025));
    arc(avatarX - avatarSize * 0.13, avatarY - avatarSize * 0.015, avatarSize * 0.12, avatarSize * 0.09, PI, TWO_PI);
    arc(avatarX + avatarSize * 0.13, avatarY - avatarSize * 0.015, avatarSize * 0.12, avatarSize * 0.09, PI, TWO_PI);
    noStroke();
  } else {
    // 平常維持圓亮的眼睛和小小高光。
    fill("#5a493f");
    ellipse(avatarX - avatarSize * 0.13, avatarY - avatarSize * 0.02, avatarSize * 0.055, avatarSize * 0.075);
    ellipse(avatarX + avatarSize * 0.13, avatarY - avatarSize * 0.02, avatarSize * 0.055, avatarSize * 0.075);
    fill("#fffaf0");
    ellipse(avatarX - avatarSize * 0.145, avatarY - avatarSize * 0.04, avatarSize * 0.02);
    ellipse(avatarX + avatarSize * 0.115, avatarY - avatarSize * 0.04, avatarSize * 0.02);
  }
  fill("#d78388");
  ellipse(avatarX, avatarY + avatarSize * 0.105, avatarSize * 0.085, avatarSize * 0.06);
  // 畫出微笑、兩顆小門牙和代表女老師的花朵髮夾。
  noFill();
  stroke("#a96e70");
  strokeWeight(max(1, avatarSize * 0.018));
  arc(avatarX, avatarY + avatarSize * 0.15, avatarSize * (celebrating ? 0.22 : 0.15), avatarSize * (celebrating ? 0.16 : 0.09), 0, PI);
  noStroke();
  fill("#fffaf0");
  rect(avatarX - avatarSize * 0.035, avatarY + avatarSize * 0.17, avatarSize * 0.032, avatarSize * 0.05, 2);
  rect(avatarX + avatarSize * 0.003, avatarY + avatarSize * 0.17, avatarSize * 0.032, avatarSize * 0.05, 2);
  fill("#e99583");
  ellipse(avatarX + avatarSize * 0.26, avatarY - avatarSize * 0.28, avatarSize * 0.09);
  ellipse(avatarX + avatarSize * 0.34, avatarY - avatarSize * 0.2, avatarSize * 0.09);
  ellipse(avatarX + avatarSize * 0.26, avatarY - avatarSize * 0.12, avatarSize * 0.09);
  ellipse(avatarX + avatarSize * 0.18, avatarY - avatarSize * 0.2, avatarSize * 0.09);
  fill("#f5c46e");
  ellipse(avatarX + avatarSize * 0.26, avatarY - avatarSize * 0.2, avatarSize * 0.045);
  // 畫出隨階級換色的小領巾，保留老師的穿搭辨識度。
  fill(theme.outfit);
  triangle(avatarX - avatarSize * 0.22, avatarY + avatarSize * 0.34, avatarX + avatarSize * 0.22, avatarY + avatarSize * 0.34, avatarX, avatarY + avatarSize * 0.53);
  // 手機版將老師對話排在頭像右側。
  if (compact) {
    const textX = panelX + 100;
    const textW = panelW - 112;
    fill(theme.ink);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(16);
    text("妮老師", textX, panelY + 14);
    fill(theme.muted);
    textStyle(NORMAL);
    textSize(12);
    text(wrapText(teacherLine, textW, 12, 3), textX, panelY + 40, textW, 56);
    return;
  }
  // 桌機版在頭像下方顯示老師名稱和對話。
  fill(theme.ink);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(18);
  text("妮老師", panelX + panelW / 2, avatarY + avatarSize * 0.62);
  fill(theme.muted);
  textStyle(NORMAL);
  textSize(13);
  textAlign(LEFT, TOP);
  text(wrapText(teacherLine, panelW - 34, 13, 5), panelX + 17, avatarY + avatarSize * 0.82, panelW - 34, panelH - avatarSize - 70);
  // 繪製老師的小印章，讓角色區更有課堂感。
  fill(theme.highlight);
  roundedRect(panelX + panelW - 43, panelY + panelH - 44, 28, 28, 7);
  fill("#fff9ed");
  textAlign(CENTER, CENTER);
  textSize(13);
  text("師", panelX + panelW - 29, panelY + panelH - 30);
}

// 繪製題目卡、接龍狀態、輸入框和按鈕。
function drawPlayArea(areaX, areaY, areaW, areaH, compact) {
  // 取得目前階級的題目、進度與操作控制配色。
  const theme = getCurrentTheme();
  // 設定題目區必要的版面高度。
  const shortLayout = areaH < 470;
  const promptH = shortLayout ? 112 : 142;
  // 顯示題目區的段落標籤。
  noStroke();
  fill(theme.muted);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(12);
  text("老師出的四字詞語", areaX + 2, areaY + 8);
  // 繪製題目底色與音韻提示。
  fill(theme.card);
  roundedRect(areaX, areaY + 22, areaW, promptH, 16);
  fill(theme.cardAccent);
  textStyle(NORMAL);
  textSize(12);
  text("請接最後一字的同音詞語", areaX + 16, areaY + 45);
  // 顯示老師的成語題目。
  fill(theme.ink);
  textStyle(BOLD);
  textSize(compact ? 27 : 32);
  text(teacherIdiom ? teacherIdiom.text : "準備中", areaX + 16, areaY + 82);
  // 以不同底色強調需要接龍的最後一字。
  const finalX = areaX + areaW - 58;
  fill(theme.highlight);
  ellipse(finalX + 18, areaY + 83, 39, 39);
  fill("#fffaf0");
  textAlign(CENTER, CENTER);
  textSize(21);
  text(teacherIdiom ? teacherIdiom.text.slice(-1) : "？", finalX + 18, areaY + 82);
  // 顯示目前階級所需的連續答題數與進度條。
  const statusY = areaY + promptH + 50;
  fill(theme.muted);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(12);
  text(`本級晉級進度　${cleanStreak} / ${currentLevel * 5} 題`, areaX + 2, statusY);
  // 繪製進度底條與目前完成比例。
  fill(theme.track);
  roundedRect(areaX, statusY + 14, areaW, 8, 4);
  fill(theme.progress);
  roundedRect(areaX, statusY + 14, areaW * constrain(cleanStreak / (currentLevel * 5), 0, 1), 8, 4);
  // 顯示最近一題的回饋與成語解釋。
  const messageY = statusY + 46;
  fill(feedbackKind === "good" ? "#39745e" : feedbackKind === "bad" ? "#b95844" : "#64746b");
  textStyle(BOLD);
  textSize(13);
  text(wrapText(feedbackText || "同音字可以接龍，聲調不同也沒關係。", areaW, 13, 2), areaX + 1, messageY, areaW, 38);
  // 有提示時顯示可用成語，並標示本題用了提示。
  if (hintText) {
    fill(theme.cardAccent);
    textStyle(NORMAL);
    textSize(12);
    text(wrapText(hintText, areaW, 12, 2), areaX + 1, messageY + 34, areaW, 34);
  }
  // 將輸入區固定在題目區下方，避免文字內容推擠按鈕。
  const controlY = areaY + areaH - 68;
  const buttonGap = 9;
  const submitW = compact ? 82 : 94;
  const hintW = compact ? 76 : 88;
  const inputW = areaW - submitW - hintW - buttonGap * 2;
  // 繪製輸入框底色，文字提示由原生輸入欄顯示。
  fill("#ffffff");
  stroke("#d5ddd3");
  strokeWeight(1);
  roundedRect(areaX, controlY, inputW, 48, 12);
  noStroke();
  // 設定原生輸入欄的實際位置與大小。
  buttonRects.input = { x: areaX, y: controlY, w: inputW, h: 48 };
  // 繪製提示按鈕與送出按鈕。
  buttonRects.hint = { x: areaX + inputW + buttonGap, y: controlY, w: hintW, h: 48 };
  buttonRects.submit = { x: areaX + inputW + buttonGap + hintW + buttonGap, y: controlY, w: submitW, h: 48 };
  drawButton(buttonRects.hint, "提示", theme.hintButton, theme.hintText);
  drawButton(buttonRects.submit, gameCompleted ? "完成" : "送出", theme.button, theme.buttonText);
  // 顯示已答題數與提示規則。
  fill(theme.muted);
  textAlign(LEFT, CENTER);
  textStyle(NORMAL);
  textSize(11);
  text(`已答對 ${totalCorrect} 題${currentHintUsed ? "　・　本題提示已使用" : "　・　提示不計入連勝"}`, areaX + 2, areaY + areaH - 9);
}

// 繪製圓角按鈕與置中的中文標籤。
function drawButton(rect, label, buttonColor, labelColor) {
  // 使用互動色彩呈現按鈕。
  noStroke();
  fill(buttonColor);
  roundedRect(rect.x, rect.y, rect.w, rect.h, 12);
  // 顯示按鈕文字。
  fill(labelColor);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(13);
  text(label, rect.x + rect.w / 2, rect.y + rect.h / 2);
}

// 將 DOM 輸入欄對齊畫布座標，並配合視窗縮放。
function positionAnswerInput() {
  // 畫布預設貼齊視窗左上角，因此以同一組座標定位輸入欄。
  if (!answerInput || !buttonRects.input) {
    return;
  }
  // 讀取本次繪圖計算出的輸入框範圍。
  const inputRect = buttonRects.input;
  // 設定輸入欄的位置與可輸入區域。
  answerInput.position(inputRect.x + 10, inputRect.y + 2);
  answerInput.size(max(40, inputRect.w - 20), inputRect.h - 4);
  // 依照手機或桌機調整字體大小。
  answerInput.style("font-size", width < 520 ? "16px" : "19px");
}

// 處理畫布點擊，並在提示、送出之間分流。
function mousePressed() {
  // 封面狀態只處理開始按鈕，避免誤觸遊戲操作。
  if (!gameStarted) {
    if (isInside(mouseX, mouseY, coverButtonRect)) {
      startGame();
    }
    return false;
  }
  // 通關頁只處理再玩一次按鈕。
  if (gameCompleted) {
    if (isInside(mouseX, mouseY, replayButtonRect)) {
      restartGame();
    }
    return false;
  }
  // 點擊提示按鈕時顯示可接續的成語範例。
  if (isInside(mouseX, mouseY, buttonRects.hint)) {
    showHint();
    return false;
  }
  // 點擊送出按鈕時檢查玩家答案。
  if (isInside(mouseX, mouseY, buttonRects.submit)) {
    submitAnswer();
    return false;
  }
}

// 確認座標是否落在指定按鈕範圍內。
function isInside(pointX, pointY, rect) {
  // 不存在的按鈕範圍不會被視為點擊。
  if (!rect) {
    return false;
  }
  // 檢查點擊位置是否位於矩形的四個邊界內。
  return pointX >= rect.x && pointX <= rect.x + rect.w && pointY >= rect.y && pointY <= rect.y + rect.h;
}

// 顯示符合本題音韻的成語範例，並記錄本題使用了提示。
function showHint() {
  // 篩選目前階級可以使用且能繼續接龍的成語。
  const requiredSound = getPhraseEndSound(teacherIdiom);
  const suggestions = getPlayableIdioms().filter((item) => getPhraseStartSound(item) === requiredSound && item.text !== teacherIdiom.text);
  // 只顯示兩個提示範例，保留玩家自行思考的空間。
  const examples = suggestions.slice(0, 2).map((item) => item.text);
  // 若目前階級沒有範例，改從完整成語庫挑選同音成語。
  if (examples.length === 0) {
    idioms.filter((item) => getPhraseStartSound(item) === requiredSound).slice(0, 2).forEach((item) => examples.push(item.text));
  }
  // 設定提示文字與老師的回應。
  hintText = examples.length ? `提示：${examples.join("、")}` : "提示：想想看，哪個四字詞語的第一個字和題目最後一字同音？";
  teacherLine = "提示只給你一點方向，答案還是要由你接出來喔！";
  currentHintUsed = true;
  // 立即重繪畫面以顯示提示內容。
  redraw();
}

// 檢查成語是否正確，更新連勝並讓老師接續出題。
function submitAnswer() {
  // 全部通關後停止接受新的作答。
  if (gameCompleted) {
    return;
  }
  // 讀取並清理玩家輸入的空白與標點。
  const rawAnswer = answerInput.value().trim();
  const normalizedAnswer = rawAnswer.replace(/[，。！？、\s]/g, "");
  // 空白答案不消耗回合，只提醒玩家輸入成語。
  if (!normalizedAnswer) {
    setFeedback("先輸入一個四字成語或詞語，再按送出喔。", "bad");
    return;
  }
  // 先查已收錄詞語，並取得任意四字答案的首尾讀音。
  const savedEntry = idioms.find((item) => item.text === normalizedAnswer);
  const phraseSyllables = getPhraseSyllables(normalizedAnswer);
  const answerCharacters = Array.from(normalizedAnswer);
  let candidate = null;
  // 已收錄詞語沿用解釋，讀音則優先採用拼音引擎判定。
  if (savedEntry) {
    candidate = {
      ...savedEntry,
      start: phraseSyllables ? phraseSyllables[0] : savedEntry.start,
      end: phraseSyllables ? phraseSyllables[phraseSyllables.length - 1] : savedEntry.end,
    };
  } else if (answerCharacters.length === 4 && phraseSyllables && phraseSyllables.length === 4) {
    // 未收錄的四字詞也能作答，不再要求逐條寫入題庫。
    candidate = {
      text: normalizedAnswer,
      start: phraseSyllables[0],
      end: phraseSyllables[phraseSyllables.length - 1],
      meaning: "這個四字詞已依讀音接龍。",
    };
  }
  // 拼音引擎無法辨讀時保留本題和連勝，讓玩家可以重試。
  if (!candidate) {
    setFeedback("請輸入四個中文字；若拼音服務尚未載入，請稍後再試。", "bad");
    teacherLine = "現在不必查題庫，四字詞會依照首尾讀音直接判定。";
    answerInput.elt.focus();
    answerInput.elt.select();
    return;
  }
  // 檢查答案首字讀音是否與老師成語的尾字相同。
  if (candidate.start !== getPhraseEndSound(teacherIdiom)) {
    cleanStreak = 0;
    setFeedback(`「${candidate.text}」的開頭讀音不相同，這題再想想看。`, "bad");
    teacherLine = "接龍看讀音，不一定要用完全相同的字。";
    clearCurrentTurn();
    return;
  }
  // 記錄正確答案，並更新答題總數與最近成語紀錄。
  totalCorrect += 1;
  roundHistory.unshift(candidate.text);
  roundHistory = roundHistory.slice(0, 4);
  // 有使用提示時連勝歸零，否則增加本階級的連勝數。
  if (currentHintUsed) {
    cleanStreak = 0;
  } else {
    cleanStreak += 1;
  }
  // 顯示成語解釋和老師回應。
  setFeedback(`答對了！${candidate.meaning}`, "good");
  teacherLine = `接得好！「${candidate.text}」最後一字的同音是下一題線索。`;
  // 達到本階級門檻時晉級或完成全部挑戰。
  if (cleanStreak >= currentLevel * 5) {
    if (currentLevel < 5) {
      currentLevel += 1;
      cleanStreak = 0;
      teacherLine = `恭喜晉級第 ${currentLevel} 級！接下來的成語會更有挑戰。`;
      setFeedback(`漂亮！已晉級第 ${currentLevel} 級，準備迎接更難的成語。`, "good");
      // 觸發妮老師短暫的慶祝表情。
      teacherCelebrationUntil = millis() + 2600;
      // 只在晉級時播放提示音。
      playPromotionSound();
    } else {
      // 標記五個階級已全部完成。
      gameCompleted = true;
      teacherLine = "太厲害了！你完成五個階級的成語挑戰。";
      setFeedback("全階級通關！你已成為成語接龍高手。", "good");
      // 全部通關時也讓妮老師開心慶祝。
      teacherCelebrationUntil = millis() + 2600;
    }
  }
  // 依照玩家答案尾字，挑選老師的下一個成語。
  chooseNextPrompt(candidate.end);
  // 清空本回合的輸入與提示狀態。
  clearCurrentTurn();
  // 完成全部階級後停用輸入欄，避免多餘作答。
  if (gameCompleted) {
    answerInput.attribute("disabled", "");
    answerInput.attribute("placeholder", "挑戰完成");
  }
}

// 清除當前回合輸入內容與提示旗標。
function clearCurrentTurn() {
  // 清空輸入欄，並讓玩家可以立刻輸入下一題。
  answerInput.value("");
  answerInput.elt.focus();
  // 重設本回合提示狀態與提示文字。
  currentHintUsed = false;
  hintText = "";
}

// 播放輕快的煙火聲作為晉級提示。
function playPromotionSound() {
  // 音效 API 不可用時略過播放，不影響遊戲流程。
  if (typeof userStartAudio !== "function" || typeof getAudioContext !== "function") {
    return;
  }
  // 在玩家送出答案的互動中解鎖瀏覽器音訊。
  userStartAudio().then(() => {
    // 取得 p5.sound 共用的音訊環境。
    const audioContext = getAudioContext();
    const startTime = audioContext.currentTime;
    // 製作火箭升空時由低到高的柔和音調。
    const whistle = audioContext.createOscillator();
    const whistleVolume = audioContext.createGain();
    whistle.type = "sine";
    whistle.frequency.setValueAtTime(420, startTime);
    whistle.frequency.exponentialRampToValueAtTime(1250, startTime + 0.24);
    whistleVolume.gain.setValueAtTime(0.0001, startTime);
    whistleVolume.gain.exponentialRampToValueAtTime(0.045, startTime + 0.05);
    whistleVolume.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.27);
    whistle.connect(whistleVolume);
    whistleVolume.connect(audioContext.destination);
    whistle.start(startTime);
    whistle.stop(startTime + 0.28);
    // 製作煙火綻放後逐漸升高的清脆亮音。
    const notes = [
      { frequency: 880, offset: 0.24 },
      { frequency: 1174.66, offset: 0.32 },
      { frequency: 1567.98, offset: 0.4 },
    ];
    // 依序播放短音，並以淡入淡出保留童趣、不刺耳的音量。
    notes.forEach((note) => {
      const oscillator = audioContext.createOscillator();
      const volume = audioContext.createGain();
      const noteStart = startTime + note.offset;
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(note.frequency, noteStart);
      volume.gain.setValueAtTime(0.0001, noteStart);
      volume.gain.exponentialRampToValueAtTime(0.055, noteStart + 0.015);
      volume.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.17);
      oscillator.connect(volume);
      volume.connect(audioContext.destination);
      oscillator.start(noteStart);
      oscillator.stop(noteStart + 0.18);
    });
    // 加上一小段經高通濾波的細碎聲，模擬煙火火花。
    const noiseLength = Math.floor(audioContext.sampleRate * 0.16);
    const noiseBuffer = audioContext.createBuffer(1, noiseLength, audioContext.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let index = 0; index < noiseData.length; index += 1) {
      noiseData[index] = Math.random() * 2 - 1;
    }
    const crackle = audioContext.createBufferSource();
    const highPass = audioContext.createBiquadFilter();
    const crackleVolume = audioContext.createGain();
    crackle.buffer = noiseBuffer;
    highPass.type = "highpass";
    highPass.frequency.setValueAtTime(1800, startTime + 0.25);
    crackleVolume.gain.setValueAtTime(0.0001, startTime + 0.25);
    crackleVolume.gain.exponentialRampToValueAtTime(0.025, startTime + 0.29);
    crackleVolume.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.4);
    crackle.connect(highPass);
    highPass.connect(crackleVolume);
    crackleVolume.connect(audioContext.destination);
    crackle.start(startTime + 0.25);
    crackle.stop(startTime + 0.41);
  }).catch(() => {
    // 瀏覽器無法播放音訊時，仍照常完成晉級。
  });
}

// 更新回答回饋的文字與顏色類型。
function setFeedback(message, kind) {
  // 保存要顯示在題目區的回答訊息。
  feedbackText = message;
  feedbackKind = kind;
}

// 選擇第一題，確保題目尾字在目前階級有可接續的答案。
function chooseOpeningPrompt() {
  // 只從目前階級已解鎖的難度範圍挑選老師題目。
  const unlocked = getPlayableIdioms(currentLevel);
  const currentTier = unlocked.filter((item) => item.level === currentLevel);
  const choices = currentTier.length > 0 ? currentTier : unlocked;
  // 優先以一個熟悉的成語開場，沒有時再隨機抽題。
  teacherIdiom = choices.find((item) => item.text === "一心一意") || random(choices);
}

// 依照玩家答案尾字選出老師的下一題。
function chooseNextPrompt(nextSound) {
  // 先找所有以玩家答案尾音開頭的老師題目。
  const matching = idioms.filter((item) => getPhraseStartSound(item) === nextSound);
  // 優先使用目前階級的成語，維持原本的難度進程。
  let choices = matching.filter((item) => item.level === currentLevel && item.text !== teacherIdiom.text);
  // 本級沒有同音題目時，先使用已解鎖的成語接續。
  if (choices.length === 0) {
    choices = matching.filter((item) => item.level < currentLevel && item.text !== teacherIdiom.text);
  }
  // 已解鎖題目沒有同音選項時，使用資料庫中的其他難度接續，不重抽開場題。
  if (choices.length === 0) {
    choices = matching.filter((item) => item.text !== teacherIdiom.text);
  }
  // 只有唯一選項就是上一題時，才允許老師重複該成語。
  if (choices.length === 0) {
    choices = matching;
  }
  // 抽出老師的新題目，只有整個詞庫都無接法時才重新開題。
  if (choices.length > 0) {
    teacherIdiom = random(choices);
  } else {
    chooseOpeningPrompt();
    teacherLine = "老師換一個接法，我們繼續挑戰！";
  }
}

// 取得指定難度範圍內可作為老師題目的成語。
function getPlayableIdioms(maxLevel = 5) {
  // 老師題目依照階級解鎖，玩家答案則可來自完整成語庫。
  const teacherPool = idioms.filter((item) => item.level <= maxLevel);
  // 確認題目尾音至少能由玩家成語庫中的一則成語接續。
  return teacherPool.filter((item) => idioms.some((nextItem) => getPhraseStartSound(nextItem) === getPhraseEndSound(item)));
}

// 取得四字詞的無聲調拼音，並快取結果供後續接龍使用。
function getPhraseSyllables(phrase) {
  // 拼音查詢結果若已存在，就直接回傳快取。
  if (pinyinCache.has(phrase)) {
    return pinyinCache.get(phrase);
  }
  // 使用 pinyin-pro 將每個中文字轉成不含聲調的拼音。
  if (typeof pinyinPro !== "undefined" && typeof pinyinPro.pinyin === "function") {
    const syllables = pinyinPro.pinyin(phrase, { toneType: "none", type: "array" });
    if (Array.isArray(syllables) && syllables.length === Array.from(phrase).length) {
      const normalized = syllables.map((syllable) => syllable.replace(/ü/g, "v").toLowerCase());
      pinyinCache.set(phrase, normalized);
      return normalized;
    }
  }
  // 拼音服務無法使用時，回傳空值並由已收錄詞語的拼音欄位作為備援。
  pinyinCache.set(phrase, null);
  return null;
}

// 取得詞語第一字讀音，優先使用拼音引擎並保留詞庫備援。
function getPhraseStartSound(item) {
  // 讀取完整詞語的拼音陣列。
  const syllables = getPhraseSyllables(item.text);
  // 有完整拼音時回傳第一個音節，否則回退到原有資料。
  return syllables ? syllables[0] : item.start;
}

// 取得詞語最後一字讀音，優先使用拼音引擎並保留詞庫備援。
function getPhraseEndSound(item) {
  // 讀取完整詞語的拼音陣列。
  const syllables = getPhraseSyllables(item.text);
  // 有完整拼音時回傳最後音節，否則回退到原有資料。
  return syllables ? syllables[syllables.length - 1] : item.end;
}

// 將較長的中文回應依字數換行，避免文字溢出面板。
function wrapText(message, maxWidth, fontSize, maxLines) {
  // 設定量測文字寬度時使用的字級。
  textSize(fontSize);
  // 逐字累積文字，超過可用寬度時換行。
  let lines = [""];
  for (const character of message) {
    // 檢查加入下一個字後是否超過行寬。
    const lineIndex = lines.length - 1;
    if (textWidth(lines[lineIndex] + character) > maxWidth && lines[lineIndex].length > 0) {
      // 達到行數上限時以省略號收尾。
      if (lines.length >= maxLines) {
        lines[lineIndex] += "…";
        break;
      }
      // 建立新行並放入目前字元。
      lines.push(character);
    } else {
      // 未超過行寬時，將字元附加到目前行。
      lines[lineIndex] += character;
    }
  }
  // 回傳可直接繪製的多行文字。
  return lines.join("\n");
}

// 繪製指定位置與大小的圓角矩形。
function roundedRect(rectX, rectY, rectW, rectH, radius) {
  // 使用 p5 的圓角矩形，統一介面卡片與按鈕的視覺。
  rect(rectX, rectY, rectW, rectH, radius);
}

// 視窗尺寸改變時同步調整全螢幕畫布。
function windowResized() {
  // 依照最新視窗尺寸重設畫布大小。
  resizeCanvas(windowWidth, windowHeight);
}
