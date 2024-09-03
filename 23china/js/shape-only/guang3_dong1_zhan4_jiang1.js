(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('湛江轮廓', {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"湛江"},"geometry":{"type":"MultiPolygon","coordinates":[["@@C@ACAAAICICSGWGYGSCCEGKIGAE@GFEFIDC@ECGGKOCKGEMI]IWBGAEAG@[KA@OOAGAEG@EGQMGGIIOQKKCK@MDMCIKIOCGJMVGNCHBZCDE@CAEGIS@CCQBGBIHWEK]YQQAMA[@AAOEY@C@SBKBO@OBCLYDEDE\\ePORAR@L@PGDAXQFCREFATLLDNBR@d@H@L@hKHALCPG^SJELEHEHYHUFSBKD[@G@g@QCUMcMiTMTIJAT@`BPHRHPBJOPcP]DMBEHaBcDOF_BEVwXwDEJMbqDGDIBQA[ImACEIMI_SCAGIOSKMOQEKIU_m_qa[UKWCQ@ODODIAOGw{SIWEcC[@GEAKECE@GLGHOFODG@gCS@Q@GAOQKIUQMEaKmCSBG@SBIBEDKPSV_bABCBGBeAA@CiCWAIACCeoeWWGQAOFEDABGD@BEH@DAJ@LHrDVBHBN@dCbYnSPk^KNIPARBNDHDLLDLBPHDBBDDHFJHN@HF`C^ELCHGHWHWHQDQDMFIFEFGHGFAFM\\GZ@DAP@FBLBb@PEPIVEPGJKTKHSFM@kIEBCFCRANMvCVCvAfERCNAFYKXKRMXGRO^EJ[xGZGZC`BtFz@VFfFpHrF`BPDTE`ATEh@RHPHNTV`bZZPPtpB@VTFJFHBT@vA`AVA`AN@PAN@TGLBLFHJJLHB@NBN@B@lCb@X@tHNFRVNVFJFHFNFPRhELCHKDYB@]DS@WHOH[H@H@D@B@F@DBD@DDH@L@H@D@FABGLCBEFEFCFCL@DABBH@JBD@B@D@DEFMRGNCDCDAD@BBF@D@BABAD@H@BBBB@@BBBABADABA@ABB@BB@BBB@BAB@BADA@AFA@A@@BA@@BA@@BBB@BBB@B@BAB@BEBABBDBDBB@BB@@B@B@BA@CD@BAD@DD@B@@BAB@B@B@BBB@BB@BBB@DB@BB@BB@BAF@B@BB@BBBD@BBBBB@BBB@B@BAB@BBBB@BDB@BDBB@BBD@BBBBD@B@B@BBF@BA@A@BB@B@B@BFD@DB@BBB@D@BAFCBC@CBABC@C@EBCDEDI@C@EA@ACBA@A@CDAH@BABABBBABC@A@CBABDBA@ADCB@BBJ@@D@B@B@BA@@B@B@BBB@B@BBDBDBBBBD@BA@A@CDAD@AAFALBDB@ADCBB@BB@F@DCBADBB@BB@BBAB@B@BD@D@D@BB@B@@AFDD@B@BD@BAB@BB@B@B@B@B@BA@A@AB@HAD@BBB@BBBDDFBB@BBB@BB@B@@ABAB@AAACD@BAB@BBB@B@@AAABABABABBBBB@BB@BB@BAB@B@BAD@B@D@B@BBBBBBB@@BBB@B@BBBB@BB@BB@@AB@@BBBBA@BBBABBB@BA@@BB@@BB@B@B@@BBB@BA@A@A@@B@DA@A@@AA@ABA@@AA@@B@BB@BD@BD@B@B@B@@B@B@BA@@BB@BB@B@BABA@ABE@@BA@A@@A@AABA@@B@B@DBD@D@B@BB@@BB@BB@BBBBBB@BB@B@BB@BB@B@BB@B@B@B@BAF@B@B@BB@B@B@BAB@B@B@B@B@DAB@BBB@B@BAB@BBB@BA@A@@B@D@BB@@BB@B@BB@BB@@BBBBBB@BAB@B@B@B@B@B@@BB@B@@BB@B@@BB@@BA@A@@BBB@BA@ABA@A@A@@BA@@B@B@B@BB@ADA@@B@B@BA@A@AB@BB@@BB@B@BBBB@B@B@B@BB@@DB@@BA@A@@A@AA@ABAB@B@BB@B@@BB@B@BBDD@B@BA@@B@BAB@B@B@FBB@BA@@B@B@BB@@B@F@BA@ABAD@BBBB@@BA@A@ABB@@B@B@BABB@BD@BB@@BB@@B@BA@@BBBB@@BB@@BA@A@A@@BABA@@B@B@BBBDBBBBBB@@BAB@BBBB@@BB@@B@BB@B@BB@B@BA@@D@D@BBDBB@BBB@B@BBB@BB@B@@BDBA@ABABA@A@A@A@A@A@@B@B@BB@@BB@B@BBD@B@@BB@@BD@BBBB@BB@@BB@BBB@@BB@BBB@BBB@B@BB@B@BB@@BFDDBB@B@B@B@B@BBBB@BB@@B@B@BB@B@B@B@B@@BB@@B@B@BBBA@@B@BA@@BB@B@B@DBB@B@B@@AB@@AB@@BB@BBB@BBB@BAB@B@B@B@@AB@@A@A@A@ABAB@D@B@DB@AB@@AB@BBB@BAA@@A@AB@BBB@BA@A@AB@B@@BB@B@B@BAB@@BB@@BB@B@B@B@BAB@BAB@B@B@B@@ABABABAB@B@@A@AB@BA@AB@BA@AB@@ABAB@@AD@B@B@@B@B@BBAB@B@@B@BB@@AB@B@B@B@@BB@B@B@BAB@@BB@@A@ABAB@@BAB@BB@@BB@B@@BB@B@B@B@BA@B@BB@@BB@BAB@@B@B@B@B@BB@B@B@B@B@@BBB@BA@@B@B@BB@DB@B@B@BB@@BBB@BBB@B@BB@B@B@@B@BB@B@@A@A@AB@BA@A@A@AA@@AAAB@@ADAB@BA@AA@@AA@BA@AB@B@B@B@D@B@@B@BAB@B@B@B@BB@AB@BA@@BB@@DBB@BB@B@@BB@@B@BB@B@B@B@@B@B@B@BD@B@@B@BA@@BBB@BB@BBB@@B@BAD@BB@B@B@BBB@B@B@B@B@@AB@@AB@B@B@BAAAAA@AAC@AD@@AB@B@B@BA@AB@@A@C@AB@BA@C@A@AFA@B@B@B@BBB@B@B@BBBBBB@BBB@@BBBBB@BBBB@B@@AB@@BB@B@B@DAB@@ABAB@BBB@@AB@B@@BB@BB@BB@B@@AB@@ABBB@B@@BB@BA@B@B@BB@D@B@B@B@BBBABA@C@AB@@AB@BBB@@BBBB@B@B@B@D@BBBB@BB@B@@AB@B@@AA@A@@AB@B@BBB@@A@A@A@AB@@BB@B@DABA@BB@B@B@@AB@@AAA@AA@@A@A@A@AB@B@B@BA@AB@B@@BBA@AB@B@@AB@B@@AB@B@@BB@@AB@@BB@B@B@@ABB@A@AB@@AB@B@@AB@B@B@B@B@@BB@B@B@B@B@B@B@@BB@@AB@B@@BB@BBB@B@B@B@B@B@@AB@@BBAD@@B@BD@@BBBADB@DDBBB@BBBBBBB@@BB@@BB@DB@ABAB@B@BA@AFBBAB@BBB@@DBBBD@BA@@B@BBBB@B@@B@BA@ABBBBB@DBDB@BB@B@BA@@B@D@BB@@B@BFCFCDA@CDALCLCDCHKBADCBA@AB@BAD@BB@ABAB@BAB@FABABAB@B@DBD@H@BBDBB@BADCBAB@B@BB@BB@@BB@D@B@BAB@BBBBB@B@BCDBB@B@B@B@B@B@BDBAB@B@DDB@BA@AB@D@BAB@@AB@BC@ABCB@@AA@AA@A@A@ABAB@B@B@@AA@A@A@@A@ADB@AA@@A@ABBB@B@@CA@BA@ABA@A@A@AB@@BB@@BB@@A@CAABA@A@AA@@AAAAA@AAAA@@AABA@CCAAAAAA@BABGAA@C@@AAA@A@AA@@BA@BCA@A@@B@BBBBB@BBB@B@B@B@BA@A@A@@AA@A@@AA@A@@B@B@BA@@B@BB@ABA@@BAB@BABABA@@AA@@ACAA@@BBHABA@C@AGC@ABA@@AA@ACA@BA@A@ABCBCACAC@AAAB@B@@AAAA@@ABA@A@AA@ABA@AA@A@AA@A@@A@A@A@AABA@@AAAAADAA@A@@AAGA@@A@AB@@AA@@A@A@A@A@AA@@A@C@A@A@EBA@A@AAC@A@A@A@CBAB@@AB@BABA@A@AB@BB@D@BBHBBDB@AA@@AAE@C@ADAD@B@D@F@DA@ABABAB@DBB@B@BDB@B@B@ADADBDBBB@F@B@B@BA@CAGACD@FAB@ADB@BABAB@BADA@AA@A@@A@AB@DBAA@A@A@AB@@AAA@AA@ABA@A@AA@AAAA@A@AAA@AB@BA@AAAAA@@ABAB@ACA@@AB@@AA@@AACA@A@DA@ACAB@@AA@A@A@@AB@B@FA@AA@AB@AA@AB@ABAD@BA@ABCBAA@@A@AB@B@@AA@@AA@C@AAAAAB@AA@A@AC@ABC@A@AAC@A@AB@BAAA@E@A@CBEBA@CAA@CAA@ABA@ABA@A@AACA@C@C@@AA@@AAA@CA@AB@B@B@BA@AA@A@ACABA@ABACBA@CBAABA@AA@@A@AB@BA@AB@B@B@@AB@@AB@AAA@@AA@@AAC@AB@@ABA@BBB@BBBBB@A@AA@@A@ABAB@BBB@@AB@BABAB@@ABABABCBA@A@C@AAAB@BAC@AA@ADB@AB@BBB@@AB@BBBB@C@ABAB@@AA@@AD@B@BA@A@AB@DAB@B@@B@B@B@BDB@BBBB@D@B@BA@ABCAA@A@ABAB@B@B@AAA@AA@AAAA@A@A@A@ABA@AAA@CCA@@A@CBCBACABADCB@B@B@B@@AB@BBBAAAAAA@A@A@AA@A@A@A@AB@B@D@B@@BBBBBB@@AB@BAB@DABA@ABA@BBBB@B@BAB@B@@BBBBBB@@E@CAAC@A@AAA@@C@AB@AC@AA@A@CBAB@BA@@A@ABC@A@AB@BBB@BAD@BAAABAA@@AAA@AB@B@B@@AAAAAA@@ADCBAAC@A@CBAAAAABA@BBBBB@BBBBABA@BBAB@AA@A@CAA@A@A@A@A@A@AB@B@@A@AA@AAA@AAC@@ABA@AB@B@@A@CBA@A@AC@AABABA@ABAB@BABBBAB@BAA@BAB@B@@BBB@B@B@BBB@BAB@B@BB@@BA@C@@B@BB@BB@AB@B@@BB@D@B@BBB@@ABA@AB@B@B@B@B@@ABABAB@@BB@BC@A@C@ABCB@F@@A@C@AA@A@A@@AB@@A@AABA@AB@A@AABA@A@A@@AA@A@@B@BAAAAA@A@A@BA@C@AA@BAA@A@@BA@A@BA@ADAB@DCB@@AA@ABCABA@AA@@A@ABAC@@BABABA@A@A@@AA@A@AAB@B@BABBBBBADAAAABA@@A@A@A@ABABAB@@A@AA@@AA@BAB@BB@BBAB@@BB@@A@AB@B@BABAB@B@@BBDD@@A@AB@B@B@BBB@@ABA@BB@BAA@BABAB@@B@BB@BBB@@AAA@A@A@ADB@BA@@BB@BAB@BB@BBABBB@BAB@B@@AD@@AAA@A@CB@@B@BB@@A@AB@@B@BADB@@ABA@A@AAA@AB@BBB@BB@BB@@ABB@B@DBBBBBAB@@BBBB@@AB@BA@AA@@AB@@AA@AAA@@AB@@AB@DBB@@A@AB@@ADB@A@AA@A@@AB@@A@AB@@AAA@A@A@A@A@AA@AAA@@A@AA@@A@AA@@C@ABBDBBA@AAAAA@AA@@AB@B@@ABABABAAC@AB@BAB@D@B@@BB@B@@ABA@B@B@BB@B@B@FBB@BABABC@AAAB@B@B@B@BABA@A@A@AB@B@@AA@@AD@@C@A@ABAB@ABBB@ABAB@@AA@C@AAAA@A@A@AA@A@@A@AA@@AAC@A@AB@B@AA@A@A@ABAB@@BBCBCA@C@A@CBABA@A@@AA@@BAB@AAA@BA@@BA@C@AB@BA@@AA@@ABABAA@@AAB@A@ABABABA@AB@BABAD@@BBBBAAA@AB@B@@B@BB@BAB@BBBABB@BB@BABBB@BBBA@BB@@BBD@B@BAA@AA@@BBB@BA@@BC@@BABA@ABABAB@B@B@BBAD@@BABB@BAF@B@B@B@B@B@@CB@BAAAAB@ABACAD@@A@AAA@AB@B@@BB@BA@AB@D@BAB@B@@BB@BB@BDAB@AAB@B@B@@A@ABAB@@ADADAB@BBDB@DBD@BAB@DCFDBBD@BEDAB@BBDB@BB@BBB@BBBB@B@@BB@B@@BDF@BBBBAB@D@@B@D@D@BBBBBDBBA@AB@BB@B@BBBBAB@B@B@B@B@D@B@B@@C@ABCB@B@@A@AAG@AAA@A@CBAB@D@@AB@DAB@@BCBBBBADBBBBBBABAB@BBB@BBB@@DBBB@DBBBB@@AB@@A@AA@@AB@BBB@@A@C@ABABAB@DBB@@AB@@A@AB@BAB@@ABAB@@ABCBCBA@AA@A@AA@A@AB@B@BABABAB@B@@BBBDABBB@B@BB@AB@BAB@@AB@@BBBD@DB@AB@D@BAB@BBD@@B@B@B@B@B@B@B@B@B@BAB@B@BBBA@A@BF@BBBBA@ABBBABB@BD@AAB@@ABDB@AADAB@BD@B@BB@BB@A@KAC@A@ABAAA@AB@B@@BB@BBD@BA@CB@@A@AB@BBD@ABA@@BADABB@@BB@@BA@@B@BB@B@@A@ABBBAB@B@DAB@FCBAE@A@AABA@AB@DBB@B@BABBB@BA@AB@@B@B@DBBDAB@BDABABBBABABABAB@BA@AAA@@B@B@BB@BB@BAB@BABAB@BA@A@@BA@@A@AA@A@@DA@A@A@@B@BBBAB@D@DBBBBH@B@DADAHEDADAF@B@B@B@DBFDDDFDDDDB@BHDFBHAFCDCDBB@B@@BA@@BAB@BB@@B@BABDBFBB@DBABA@@BBB@BA@AAABAD@B@B@BC@C@AB@DD@BBB@@BA@@BA@AAA@A@@J@BBBDD@B@B@FCDADBB@D@BBF@B@BB@BBF@DB@D@BDBB@@D@BAB@B@BB@B@DBBBB@BBB@B@B@B@B@@B@BA@@B@BB@@B@D@B@BABA@ABAB@B@DA@@B@BBBABA@@BA@A@@BA@A@AB@B@B@BA@ABBBB@@D@BB@BBABBBA@A@A@@BB@B@@BABA@BBFDHDBDBB@BBDFB@BB@@AB@B@@AB@B@@B@B@BB@BAB@@BB@BDBB@BBB@B@D@D@BB@B@B@B@DAD@@BB@B@B@@ABABA@AB@BCDABA@ABADAB@B@B@ABB@B@@AB@BAB@@AAAAAB@B@@AB@B@@BB@@A@ABAB@@BBBFABB@A@AAA@AB@BBB@BD@BB@@AAA@ACA@C@A@A@A@A@C@ACA@A@AAC@AAC@A@A@AB@BA@AAABAA@@A@AB@BB@AAAB@CEAAACA@BA@A@AAAB@B@@A@AAAB@BA@C@AA@@AB@@AC@@A@A@A@AB@B@@BDB@BB@@AD@B@B@BBDADBH@DBBA@ABCB@B@@ABC@A@A@AAA@A@C@A@ABAB@DABA@AB@BABCBACACABGAAGCA@AA@AB@BB@G@ABABBDA@AAA@ADBBAB@@DB@B@B@@ABC@AB@D@BABAB@BABADCBAFCBADA@CBA@BBB@BA@ABDBB@BA@AAAAA@AFEB@BA@ACACEBAB@@A@ABABABABAB@B@@AAAC@A@@A@AFA@A@AA@AA@AA@A@CAAAB@B@@CA@A@ABA@EAAAEEB@DAD@DA@E@ABCB@B@BDAB@BA@@BADA@BBB@BBBDBBBBBBBABAAA@ABA@AB@BAB@B@@D@BA@A@@B@BBAB@@BDD@BBBDDBDBBB@@AB@D@@AAAAABABA@C@AB@BBDABBB@@ABA@A@AA@@AAA@AB@B@@A@A@A@AA@CC@A@ABA@AB@B@B@@AA@@A@A@A@AAAA@@AAAAA@AA@AAA@@AB@B@@AB@B@@A@AB@B@BBB@B@@AB@BABDDBB@BABCDADABABADCB@BBB@@EAC@AA@@E@ACA@B@BB@@B@BABA@@AA@@A@C@AACAAAAA@AAA@@AA@A@ABA@CA@AB@@A@AD@B@B@BADEF@DADCAAA@@A@ABC@AB@FBBA@A@CB@DABD@B@BB@B@BDBD@BBAB@@B@DBA@BB@@BA@@B@BBB@A@AB@@BB@B@B@BBADBB@A@ABABBDBBBDAB@BAD@B@@BABAB@BBDB@@BDBDA@AB@@AB@@AB@B@FEB@B@BBB@B@B@DBD@D@B@@DBBBBBBBBBBB@AC@AA@A@@A@ABAB@@ABAAAAA@ABABCD@@BBB@BBD@BABB@@B@BB@B@@A@A@CAA@A@A@EBAB@B@BA@A@A@A@ABA@AAC@ABE@AB@D@B@BADIHQueGCcSkMgCQ@DFaDE@WCaOIGMKGEIEEEECWYaeU_OUKQOSky]YQMGEKCoAYAwCOCEAUEMAI@KDKFIFGDEDIBG@A@IAGGMIO@SIEI@IEGEAGCM@G@IDOLA@","@@ABBBA@ABA@@AA@@BEDA@A@@A@AD@B@BAB@@AD@@A@AB@BB","@@A@A@@B@BABA@AAA@@BAB@B@BADAAABA@@A@ABAB@BABABABA@CD@AAA@@AB@B@BBBA@AA@CAB@BAD@B@@BDBDBADA@CAA@@BA@BB","@@A@@ABAAAAAA@BG@ABA@DDBB@D@BD@B@B@BBDA@C@@AEB","@@B@@ABB@BB@ABA@@AA@@A","@@AAB@@ABC@C@ACA@CC@@KAA@AC@@AB@B@BBD@B@ABDBB@B@B@H@DBB@B@BAB@DAB@B@B@BBBDBB@B@B@BA@A@E@CB@BA@ABA@A@@FABA@@BA@A@ABA@@AA@@BA@A@@BA@A@","@@@BAB@BA@@AA@AC@AB@@AB@B@@BBB","@@B@BB@BA@A@@AAAB@"],["@@JDFDH@N@J@FABA@CAICEEGAAEBCBA@GAK@EBEDAFAFBBDD"],["@@MCMCEBIDKFIFMDGDEHEH@FCFOBM@CBABAF@HAFAFHDP@DDF@JAJBPN@B@D@HDFHBD@F@DAD@FAHFJJHHHBFAHEFE\\YFEZHPDVJf@P@FC@EFCPBFBHBTTJDNBJ@DBDABC@EAEEW_[KUKUk»CEEEEA{IIBEBEFGPCHDFFJ@FAFCDCAGCC@EDOfAJEFKD"],["@@HF\\JHBF@HADCFIDGAEACCCE@sHC@CBAD@BDD"],["@@S@[BWFOJGNEXALAF@DAPHLLJJHPPNTT\\JHPBPA\\K\\GPEJGDK@KAMEOIIGKM_KYGKKIUCEA"],["@@F@jFL@LAfONGJIDG@GAIQoUCKCYA[DoAQCKGGKEOAKBKFILGXANALELMRABMTIPKHKDS@cGIBQHKBM@_IO@WBQBO@EAIC]QKEWMMEKCQEmKcCYAQEeQMCKDEJANBNFVHXLPbPXTZ\\TPRFJJL`DHVfXbTDZCLSP@TB\\HdTPDPBN@PELEHIPiFGHCL@VDJDD@P@T@PPJFFD"],["@@BDHHNPLNDFFJJbBFDLBBB@D@DGDM@KAICEEGKIGKQYIIGAEBCD"],["@@EJ@HCD@FDBDDF@B@@BADAD@DHLHFNBF@POFIH[@IAEECEAC@CBAFAFADABCAAA@EACEAI@IBCB"],["@@@BD@CA"],["@@ABB@@A"],["@@@BB@AA"],["@@CAAB@B@B@B@B@BBBBBB@B@AA@AAC@A@ABA"],["@@@DB@@AAA"],["@@AA@BB@"],["@@@BA@@B@BDBB@B@B@DBBBDB@B@BBBD@B@D@FBB@@BABHFBABAD@D@D@D@F@BA@A@AB@BABA@A@ABA@AB@B@B@@ABA@B@B@BD@@AB@@B@BD@B@AABAB@@AB@B@@BB@@A@AB@B@@AB@B@@AB@@DBABA@BB@@AB@B@@ABA@AA@@AECCAA@A@A@AAA@@DABABAA@BA@@AA@@A@AA@@AA@AA@B@BAB@A@C@AA@@B@B@BABA@ABAABA@AA@A@A@A@@ABAB@BAAABAAABAA@AAB@@ACADAB@@AA@@AA@@B@BA@ADABA@@A@A@A@AB@@A@AB@D@BAA@A@A@@AA@@A@AA@A@@BA@@BA@@AA@@BAAC@@AA@@BA@AA@A@AA@A@@AB@BCB@@BB@BCAABABBBB@BABA@@BB@@BB@@AB@@BB@B@B@BAB@@AB@@A@AAABAA@A@@BA@A@A@@AC@A@@AA@A@@ACA@AA@BAAA@BAFA@A@A@@B@DA@AA@B@DBD@BABA@A@A@@BCB@B@BB@BB@DBBA@A@@AAB@BCD@B@BABA@@BABA@A@ABABA@AAD@@AA@A@@AA@A@@BCBABA@@BA@@BBBB@@BB@BBBDB@@B"],["@@B@@AA@@B"],["@@B@AA@B"],["@@DA@AABAB"],["@@B@@AC@@BB@"],["@@BABB@A@ACB@B"],["@@@BB@BAA@A@"],["@@ABB@@A"],["@@B@@AAB"],["@@@BBAAA@B"],["@@@BB@@AA@"],["@@B@B@@AC@@B"],["@@B@B@AAAB"],["@@B@BAA@AB"],["@@ABB@@A"],["@@ABB@@A"],["@@B@B@CA@B"],["@@B@@AAB"],["@@@AAA@BBB"],["@@B@@AA@@B"],["@@BA@AAB@B"],["@@BA@AAB@B"],["@@BA@AAB@B"],["@@BACBB@"],["@@BA@AA@A@@A@A@A@AA@A@BC@ABA@A@ACAAB@A@AA@A@A@A@A@A@@DADAB@D@D@D@B@B@B@D@BB@B@@B@BABADB@BABB@BA@@BBBBAB@B@B@BAB@B@@A@AB@@AB@@AA@@AB@B@@AAE"],["@@BCA@@B@B"],["@@@A@AABBB"],["@@HD@B@BB@BBBBB@@ABAFAD@@AAAAAF@@A@CAAE@C@A@CDA@A@@AA@ABABAB"],["@@BAA@@B"],["@@A@@BB@@A"],["@@AB@BB@@A@A"],["@@BD@BBB@BAB@BB@B@@B@B@BAB@BBBB@@B@BB@@BB@@BABB@BCBADABDB@AA@AB@B@@BBAAAA@ACBCD@BA@A@A@ABA@CEAA@@AA@@B@BA@CA@AA@A@C@@AA@A@AB@AAB"],["@@BBB@@AA@A@"],["@@A@@BBA"],["@@ABB@@A"],["@@DB@AA@A@"],["@@ABB@B@B@@AC@"],["@@@BB@@AA@"],["@@@BB@AA"],["@@B@@@A@"],["@@A@@BBA"]],"encodeOffsets":[[[113077,21703],[113046,22162],[113048,22153],[113137,21972],[113170,21993],[113370,22035],[113368,22034],[113374,22035]],[[113071,21668]],[[113155,21651]],[[113045,21611]],[[113253,21358]],[[113147,21582]],[[113210,20816]],[[113056,21175]],[[113458,22152]],[[113462,22152]],[[113458,22124]],[[113623,21959]],[[113202,22018]],[[113323,22006]],[[113028,22467]],[[113079,22462]],[[113080,22461]],[[113077,22462]],[[113076,22459]],[[113069,22460]],[[113069,22455]],[[113070,22456]],[[113067,22447]],[[113063,22450]],[[113065,22442]],[[113062,22441]],[[113055,22442]],[[113052,22441]],[[113055,22439]],[[113059,22440]],[[113060,22433]],[[113062,22433]],[[113060,22432]],[[113056,22433]],[[113056,22432]],[[113055,22431]],[[113053,22430]],[[113047,22432]],[[113040,22296]],[[113044,22403]],[[113021,22381]],[[112999,22334]],[[113006,22234]],[[113006,22222]],[[113008,22224]],[[113047,22194]],[[113079,22094]],[[113080,22076]],[[113081,22076]],[[113129,22065]],[[113135,22064]],[[113136,22054]],[[113136,22032]],[[113159,22008]],[[113161,22007]]]}}],"UTF8Encoding":true});}));