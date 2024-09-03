(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('随州轮廓', {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"随州"},"geometry":{"type":"MultiPolygon","coordinates":[["@@ACA@CAEBCAC@A@@AB@BC@A@A@AA@ABA@CB@BA@A@@A@AA@@A@AAAC@AAAA@ABABAAA@AA@A@A@@AA@ABAB@BA@@BA@@AEAAAA@A@@C@ABAAAAC@ACAA@CBADA@A@AACACBA@AA@AAA@E@ACAAA@A@AA@A@AB@BA@@B@DABA@AAA@ABC@AACAAAA@A@C@ABA@AB@D@B@BEBC@CBCDAB@BAB@BA@@BA@ABA@CBC@ABGHABABAB@BA@EDEBABIJADGJABA@GAA@G@C@@AA@@ABA@AACAAAAA@ABA@A@A@GCCAAAE@EBCBCBE@ACEE@AC@G@QFA@A@GAA@KCGEECIEI@MBEBIJABIFEFGDC@IAA@IAMCGCEE@EAEDODODIDM@MDQCMGIECCB@DCDC@E@CA@CAE@CAGAGCEAAAAGEKCCAAIACC@EB@F@DAJ@DA@@DMDOFA@EDGDEDMJKBEBI@KEEAILGLKPEDGLCDGHMNKHMDEBEDOFCBIDGDA@CAAAAEEAEBCFCFADEBEBADBD@DAFDBBADEBCD@LHBD@DEBC@E@@DCDABGDADECACAAACKGCACAC@CBEBADCAEACAC@CF@FAFCDGHCDKDIBMBI@OCIAGEECKCKFEDIHGFA@IBE@E@GCEGECMGIAMCC@ECIDKDKNOTINGLGHA@EDMBG@G@CAEAMAOAKBIBEJCL@H@JBLBJ@JAPAFGTGNELGLGLIJMHGBA@QBM@EBEHCJELCJKNKJQDIBOBQBKA@BOBILGHCBGFGBKAECECEDGBEFIBGHCJAHALDHBF@BBH@FALALADADAJBHBJ@F@F@B@JBJDLHFJFFDFFDHBF@LAHAD@FCL@JDDDDJ@HATCHEPGHAFDDB@DDHFFHFJBJ@J@H@LBJDBDBDFHJTHNHNJPFLHFHDNBNCHCHGDCLBFDHJHJBLHFLHHHFFDFHJNJFAH@F@FADCHIDADAHADAF@FDHDHJDFFHAHCHCHGFCJCJCLEJ@JAHDFDFDDFBF@DBH@DAHDHBDFDDDFDJDF@HBH@JBJ@JBFDDFCDABBBH@DDH@BDDFAJ@DCJBF@FDBH@BAHCHIDMFEDMBMBK@KD@D@L@PAH@H@B@JB^@LA@@D@B@F@HAB@B@VJNPLHFJH@BRTHJTTPTJDFH@B@B@FAVOLIHMLGN@TBZDVBBFN@BHPBPAR@R@VCRIVGXFLHFRBP@H@HBXHRPBDNRJLFRAF@JWTKFKHCHCDCTAL@BFDLHZFtIB@D@FHFFDHH@bDJBB@D@DCB@DBB@FF@D@D@FFVBF@DAD@D@F@BRPDBFDJ@J@H@HDZNLDF@B@FCFCDCHAD@DABCBIHOFEFCTMB@PKBCJCB@PGFCFGLEHGJABCBAAC@EBEBEDEFCFAJAL@HAFAFCHCFCDE@C@AECYOAC@C@CDCBAF@LAHABAHILKHKHCFAFAH@F@B@NFHBB@LCJCDCJGBE@CBC@ADCD@J@FAD@LCFIDCF@D@BBFBfZVNHBDBBBDFDDDBDADADBFBFBHHBBB@JFNJRHB@B@HDLHDBBD@BB@@BB@BBDDB@F@D@B@BAB@BABABAB@B@BBB@BBB@F@B@AGAIAG@EBG@EBEDAFBJDFDAF@HAFAFCHA@A@A@ABAB@BA@@FB@@BFBBBFDBBBD@B@DB@DBB@D@BAB@BAB@B@D@D@BBBBBBD@D@BBCB@BADAD@B@B@B@FDAB@FBBABCBA@AB@@ABBDBB@D@H@D@B@BAB@B@B@@B@B@B@BABABCBC@EBC@A@ABAB@BABBB@B@BB@@BD@DBB@B@B@DADADADABCBADAFAB@D@FBDBBBBB@B@B@D@F@F@B@D@F@B@BFDHFFBDBDDBDBD@DDDBD@F@B@BDDBBBBBBBBBFBB@BB@B@B@D@B@BABA@ADAB@B@BBDBBBBBA@@BA@ABABABAB@B@BDBBBB@@ABAB@DA@AD@BADBB@DBBBD@B@F@BAB@DCDABAB@@BDBDDFBB@B@B@B@@AB@@C@AB@@A@ABC@ABAB@B@B@B@B@B@BBBB@BBB@BBBB@B@@BBARGB@FAD@BABCBE@K@CBCDCBAB@D@D@B@BCBAD@B@BA@ABC@CACCEAEA@EAC@@AAEBCJKFEDAB@FBBDDNB@BBF@DAD@BABEBG@CAACAGCIECAISAK@EBILKLEBCBCBC@EDAFCBC@CACGAMEGCCAEAC@AACCEICE@CBGJI@ABCBM@CCAGAEAA@CAACBMBKBADADCDCBCF]BGNKDABEFCDABBHDFBDBBABC@G@CBADCBIBC@GACKGACGIOWACDSBM@IAE@AIMSUGCGCA@C@ADAJADCBMDGBA@AAFUDQ@C@ABC@ABIAQ@CRID@BAH@BABCBEBCFEFENKDCDADCRCNEDCHEDGDGACCEGEAACGEGAAA@A@A@E@A@AAEKGIEEAC@ACM@GBCBADAB@DADEFEB@BADBFBBBDADCLEDAD@D@F@F@JCHCFCDAD@D@BA@C@AACCCCCEICGAK@MAE@CBCDADAD@DADEFAJCF@DAD@DA@ABADK@E@A@GACAEBCBC@ACKCK@C@GBAFCFE@A@CAG@E@EBCFEDAFAHEHGB@DABAB@B@B@BBDDDBB@B@@AB@FCBCB@DBDBPHH@FBD@DDFJDHDHHNBDDBFFDFLDNBHBFABA@C@ACG@A@CJEHERIHEDCBC@G@IAECEEECEEI@EBEBCFEBCBE@GAC@EAIBGDEFCFCJADCB@@C@C@CBCFG@C@C@C@EFKHGHCFAF@FBDFNJTNLHDBP@F@HAHAD@BBBBBBFBH@F@HAH@FDBDBLDDD@HBB@TALCB@@BB@@B@BB@@BBBB@@BB@BB@BB@@B@FFDHJFFDBJFD@FAAGGOAAAAAAACAE@AAA@CBAB@DAF@BCBABABCBCDC@AAAGCCCGECECCCACECA@EBEBADEFCBAFCFG@CIEGGCE@ACCAAAECG@G@GFIDCBCBABAHIJIHCHAFABADCBM@IAAAGCG@ACGGIAEAACEAGAEAACE@GAG@G@IBG@CBEAGACCGAEGGCEACCGAGGOCGCK@AAE@EDIDEFAD@BAHBHAD@DABEAECIGACACAACACAEAAAAAAGCEAEAECAGBCBEACEEGCAAECEAECCEACAGDI@AFCDCDCDC@C@IAEAGCGCICECEAAAAA@EEI@IFABEDEBEHC@CAABCAGCAECKAACCGGECMEKAKDEDBHADABI@CBC@A@CCAABA@C@A@ECC@A@ABC@AB@@ABC@I@AAA@A@A@AH@BC@CAEA@A@ABC@A@AAA@A@ABC@CDCAECCCMEA@AAAABA@A@AEAA@@B@B@BABCAACE@A@CAA@GAAB@B@BABA@A@CHBB@HBDFBBBHBB@F@D@DAHBDD@D@D@D@D@DGBMBEBKBEBCDEH@BCJAFEFCBKDEAGAECAECGAGEI@CACGBEAGDEBCFABCJ@D@BABBNCDABABCFCFGJEBEBICGCAAGEEEIACCIAK@KDGDKEGAI@GDIDADGHGFKFI@IFE@IBC@A@KDGFIBGBIBC@A@GECAGCIEGEACKIECEGEICICC@ACEECGCG@A@EACCCGCEAAAAAA@AGCECAAGECEA@C@E@CACA@C@A@EAAC@GAA@C@E@ABCBA@AHABA@ABABKD@B@B@J@BAFAD@BGHABA@ODCB@BA@@B@D"],["@@@HABEN@B@B@BB@DBBAHCDCDCDCB@@ABA@C@E@ACAA@G@A@@A@AB@BABABA@AA@@AA@A@A@A@A@@BAB@B@BA@@B@B@D@B"]],"encodeOffsets":[[[116322,32178]],[[116489,33052]]]}}],"UTF8Encoding":true});}));