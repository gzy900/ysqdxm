(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('菏泽轮廓', {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"菏泽"},"geometry":{"type":"Polygon","coordinates":["@@DAHBBBNBD@H@TCJ@D@FBFBVNB@FDJHDBFFDBHFHHBB@DADAF@BDBDBFFB@@BFDJ@FFNLVNFBJDD@PFFBB@PFFBPFPDDBBD@FBDAFAD@BCHCLAJCJ@BFPBFJC@DDF]H@BAH@BNAFFF@BH@NNEB@@EF@BR@DZC@P@BN@BDBD@BBDBDBB@BJJFFNJDFFV@BDP@BDD@BFBDFHFFDDFB@DDHDHJDHB@BDLNBFBDDJHPBFJLHJHJJLJJDFXRHDTLN@LADBBH@BDDD@F@LAJ@DAB@LCDBDBFLBBB@B@JCB@FAPGHABADBBBBFBHD@TBH@L@H@JABBD@@BD@B@@BLBH@PBJDDBLDBBLBFBF@D@JBRBTB@P@B@BD@@F@BF@@N@B@DAHCB@LP@B@@PBFBLRCD@DHBHC@@BBFBDPAFNBH@BDABJ@BL@V@D@@BAJX@BJFHFHDFPCB@PA@AB@NAHAF@D@D@@ED@BAL@@DF@DNVED@N@@NJ@XBD@@GFDBPB@BD@FH@@HF@@IASHBBP@A@C@A@A@A@E@A@A@A@G@AAE@A@CBGAI@CBG@EBG@A@ABCDEBG@ADEHCH@B@D@HANADARCNCB@BAJAPEREDAB@PGTEHCVIJEJENGNEHENE@ADAPIDCJIBAB@@DH@JBASC@DEB@BAPGJEB@FCVINIIIB@P@JKBA@AFCDEB@BAJGCCGC@EBERADDBDLGFCBADABADAB@@A@A@A@A@A@CBA@A@A@A@ABA@EBGBC@ABABCBCFIBADE@ACCAAAACAACA@AAECAAACAA@AAAAAAAAC@C@A@A@A@A@A@EBCBCBCBCDCBCFE@A@E@AJAACDGAAE@CBADA@AAE@AA@AACAA@AB@@CC@CA@CBCBE@ABE@CBCBC@ABEBABE@CBE@EBC@E@A@A@CBC@C@C@C@A@A@EBC@E@A@AAC@AF@@CBCE@AAC@@CAE@E@A@CBA@EDEFBB@BCBGC@BQD@F@@ELAFAD@D@BAD@DF@DH@B@B@@AJ@BCE@@EAC@EBACOFA@ACAEIHABDFAFLHCJCB@BD@HBDCB@B@H@BABB@BDBBLH@D@HF@DKCGF@BAB@D@DE@OE@AAJ@D@@D@HBHDBH@@ECCAACA@IA@C@BAF@CADEAA@CDAFCCMB@NABBD@BA@C@E@C@C@C@E@CACACAG@CAA@C@CBEBE@C@ABCBABADEBEBA@EBA@CBC@C@ABE@C@CAA@A@AAGACACCEEECAAACACAEAGAGCCECE@E@EBGDG@CBC@C@GBE@CBC@C@ABABCFEFCF@FCDEBCBCBC@ABC@CBE@CBCBGBE@CBA@CACHBTBLBFBNFFBFBDBDBHBHCDGBABCFGJOBGBCDE@IBIAAAMCIAAAECIACCGAGGOCEEBA@C@G@E@CBA@CDEBCDCDCFCFCBGD@E@A@E@CACCCGAC@E@CBGDA@A@CABEBCBCBCDCBABC@CBGB@BA@CAAACACECACAA@AACAC@C@CACAACEEEEAAECCACCE@ACCAAACEECC@AACAC@AAAACCECCE@G@EBA@CBCBA@E@C@C@A@IAAACCAGAECCACAA@AAACGAEB@DAL@HAB@B@CCACAAACAAAAACAAACACDGACACEECCBC@EABC@A@ECC@C@C@ADCAEAEACCCE@A@CAE@E@C@C@E@CBE@CDGFEBA@AHEBCBCFEBABEDCDCDCDCBCFADCB@DABABADA@AB@FC@CCIH@@A@AD@BAL@FBBABCDCACCEECEECA@ACAAA@ACCAACEAEB@DCF@DAD@FAH@B@D@DAD@D@D@HAJADADCB@@A@ABC@ABE@EDE@E@AFAD@DAB@BCDAFCB@D@FAD@F@F@DA@AFCAIFA@KT@@JD@@FH@FADAD@FAFADCB@B@FE@GL@BCDADE@IJ@H@FA@C@GL@HAH@H@DAD@B@F@D@D@F@B@B@D@B@B@F@FG@ILAD@F@H@F@F@HAH@@HD@B@D@D@B@DBHA@EN@D@B@DAHCF@DADA@IBELDB@@A@A@A@A@E@CBC@C@G@E@E@ECE@EAC@C@C@A@E@C@EAG@E@A@C@C@E@C@CAC@E@C@A@A@E@I@G@A@C@C@CAECAECE@E@A@M@E@GAECE@CACCACAE@CBEAEAC@CAEACACDCFAHAD@DAHCB@BAF@HCFCDCBG@EACACACCCACECAACCEG@C@C@CBC@E@CAE@ACGCAACACECEECE@EDCBCFEHCECAACACCEAEAGEEAC@EAC@CAE@GAC@E@EACACACC@C@G@CAE@CACACCCCAE@G@ABCDGDCBABE@E@G@CBE@A@CAEAACAA@C@E@C@E@E@AACACCCC@I@CAC@CAEACAA@CECAACCEAEAGAEAECECCACGBEDABEDABCDENEFCDCDKDIBIBEACCAAKGECCACAA@OEECECIEGCEAAAG@A@G@A@EDEFKDCFILADCDADCJ@DGP_`ABSBIBG@EAQGOGA@MGYCI@[RORCBUXSAKAKW@A@EAYGCGCWAQ@KACAsMEAA@W@C@WAG@M@C@cCAAA@A@E@WAMAKSCBKDUHQF@BC@AD@BABCBGBIBCBA@A@C@A@GBEBABA@CBA@EBGBGBAAA@EBA@A@C@A@IBE@A@E@C@K@E@C@A@IDEDABAFCDE@E@CBIA@AAA@E@I@I@A@Q@I@AA@@AA@@ACA@ACA@AACC@AAA@@AAA@A@AA@AAABA@A@ABC@E@A@A@E@A@A@C@@BEBCBA@A@ABADA@ABIBA@CBABA@CBA@ADCB@AA@A@ABA@CBC@ABAAABCBA@A@A@CBA@A@A@A@A@CACAEAC@CBAAA@G@C@ABA@A@E@A@A@AAA@C@AAA@A@A@A@A@A@A@A@C@A@CBA@E@CBA@E@C@AAGCA@AAC@A@E@A@AB@B@BE@A@CBG@A@CBA@CBEBA@IDABA@EFEB@BCBCHCDGHCDABGHABEFINCDCF@HAD@DCHEHEFGBGBE@EACB@B@NAJAFAFQRAFAB@BCFAD@BAF@D@F@D@FBB@FBDBD@F@F@D@BAFAFABABAFEFCDADCF@BBD@DB@@FBBBDBFFFBDBDBD@BBD@DAFAFABAD@B@DCFADAF@DAB@DAF@D@F@DA@@HCFCD@DAD@DABCFGBE@A@E@ED@FFDCFEDCDBHCDGBGDEDGBG@G@ECGAGBCDCDOBEBCBCBIJCDGDEBOD@BCBG@EDGDEFEBEBA@CBA@GAGAECECMEG@GBEBGBGAE@A@ECEECCECEBG@@BEBEDADAB@DAB@LAH@B@D@L@F@HBFBBLNDDBH@BBD@FBFCDKDC@EBGBA@E@G@A@AAC@K@CK@CIBEBE@BJUBA@@DEBE@BFDPB@B@BDD@BBJEHPJTFAB@@ADFDAB@BBBDBFAF@FAFCFG@GAEAECCECEEBA@EBCDA@GBEBEDEDGDGAEAECCAE@GBBREDAFCD@BIJCBC@QBED@FDFBF@BAD@HIJQ@A@C@C@AAA@CCE@CAG@E@E@E@A@E@E@M@C@E@CAECC@CAECECKGEEA@CAGAA@CAGACECECCAACAC@C@EBA@CDEDEFCFAFCD@BG@G@G@U@A@E@C@CBG@GBG@G@GAG@G@C@CACAAAECA@IGAAACCECECCGC@BEBCFEDCFAFAFAFCDABGBE@GBGBEBEFCBED@DAB@BA@DPDABF@BA@BFAB@HK@@BA@@DO@BC@AB@@AGB@AD@@CBAACA@@BC@ACEMGBA@AEHACEB@B@J@BAB@@CA@A@EB@AA@GBABB@@BABCBAAA@C@KDC@WHGBA@ABABDBHBFDJDHD@BJDDFBBB@DDBDBD@B@B@D@BABADABA@G@M@A@E@CBEBKDCBCBADABAB@BBBBBBDDHBFBDBBFJDFHFRDB@RFNBRJNHLLBD@H@N@BELEFCFEHIHCDIJGFABQLABIF@DAD@BBHDFDFBDHJBBJJLHDBHDBBB@LFB@PDNBXDNBV@N@B@DBBBBB@B@H@JARAL@H@J@LAN@BBHFDNDXFF@BB@DBBBB@BBD@BBB@DBDBB@BBBBDBBFHBBBBBBDB@DB@BB@BB@FHBB@BBB@BBBBBB@DD@BDB@BBBBBBBDDBBBBB@DD@BBBDB@BB@BBBBB@BBBBB@D@B@D@B@B@B@BDBZBJBF@NBJ@F@BBH@DBF@DFLFBNDN@\\A`@H@DBBDDFDFJLFH@JAJCHAFDDD@BBBDBDBAD@DC@CDEHEHCH@J@@X@DDBB@BCAW@E@CJ@BPFB@THBBBJBB@NBTDLBF@JBB@H@D@P@LAD@LG"],"encodeOffsets":[[117961,36272]]}}],"UTF8Encoding":true});}));