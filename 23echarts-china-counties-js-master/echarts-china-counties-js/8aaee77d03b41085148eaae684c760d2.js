(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('寒亭区', {"type":"FeatureCollection","features":[{"type":"Feature","id":"370703","properties":{"name":"寒亭区","cp":[119.211157,36.755623],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@EGC@A@CE@AA@K@AD@BC@CAAEE@GAGA@CA@C@A@ADA@@@@AC@A@@EC@ABI@EA@AA@A@@DA@@DABA@C@AD@@E@@@IABGA@C@@AAA@A@@CFE@A@CDCFAA@@@A@@@AMAA@A@C@CD@FE@ABADCAC@@@ECC@GD@@G@AFMAA@ACO@@@CAC@@@@ACBABC@G@@FA@A@@@@DAFA@EBEBCA@@@EAB@@IBA@G@@@@BC@AB@DC@E@@@@EM@G@@D@@A@A@@@@DCB@B@@BBFD@DCB@@@BC@@GK@@@AD@L@BAL@JE@A@A@AJIDBDDHA@GBBHB@FB@BBB@D@DEB@FCBM@@DA@@DC@BFC@@FODAKG@CACA@HCAACe@CAG@IA@CE@@DQ@@CKAA@@DCA@DG@ADG@A@@E@IU@DE@ED@D@@EFBCM@EAAA@A@C@EBK@EAAA@@A@@@A@A@@AG@@@A@G@E@C@@B@DA@G@@HAFEFA@EFA@C@AB@BAH@PEB@CE@GD@B@BM@A@CB@BG@@AA@@DC@@BAA@@A@@@@B@@@@B@@@BB@BDB@@@D@D@DE@@FJB@B@BF@BCBAAA@@@ABBBABBDBBB@AAIH@@EF@@G@@H@@C@ABB@FD@D@BA@CAG@ADA@B@B@@@B@@BB@@@B@DBB@B@@BB@@BB@B@@@B@@BB@@@B@B@@@B@@@BBB@B@D@@@B@@@B@@BB@B@@@B@DBF@B@B@@@B@B@@BB@@@B@B@B@@@B@@BB@@@B@@@B@@@B@@@B@B@@@BB@@B@@@B@B@B@@BBA@@B@FGDAB@BA@@DAB@BAN@BBDHDD@JB@BD@@B@B@@AB@@@B@B@@@BA@C@AB@J@BABC@AHG@BHC@CBAB@@@BFJ@B@B@BBFJDBFC@@L@BBDBBDBLDFBBD@D@BCBCDDFH@B@@BB@FFFJFHHB@D@FDBBDCBFF@BB@DBBBBBD@D@J@D@@B@B@F@@F@B@DGB@BB@@B@AJ@DH@BDPABBCD@@EB@B@@BB@@JCB@@@MFB@F@@BBB@@@@CBAB@DA@@B@FB@@DBFAB@@EI@@A@@@@@BD@@MAA@@FN@BBB@D@FFG@@BC@ACC@@DC@ECAAA@@A@A@@AEI@@BCBBD@DBB@@@B@@AB@@BB@B@B@@@BHA@DB@BBDCD@@@B@@AH@@@D@@BBDBHD@AFF@@@B@@B@BB@BHB@@BBH@@@BAFBBB@BFF@CGLCHCB@FDDBFJABIBCGCB@BGB@BD@@BCB@DA@@F@DBF@@JADLC@JJDBFDFDBDLDDDBFAFQEG@CDI@GAUA_B[BSNGCICUIaASAIIACEMI@AFCBGAOEEBMBA@ETELOFSDE@CH@L@F@B@F@nSDC@G@mAAP@DAd@V@L@b@@DBb\\NBBPONBf@P@fDTXVPHJ@@CDAB@B@B@@@BB@DBD@DBBDDTDZHKDCNKXELBFHDNDNPHTAhKLRBL@ZBJFDf@DAFANOBCACAAC@QNCBKBGAGC@E@UAGIQK[CGBEJCF@DHDDH@jSHAV@HDDFFNH^BBDDDBB@DADCDG@A@CAEM[CGAGCqJGLAFBBJCX@PDJLDT@VEXUPERAZHRBPELIDMCMI[AKBMHGDCBGBWBEBACA]QI@AKAAGECCAE@ECCE@CA@C@C@EACIMGCCACACAACCIBI@EDCBEDCDEDA@ABC@A@AAI@E@K@A@@@A@AAG@K@A@AAI@ACMAG@CAE@E@A@E@A@@@@@A@A@@AA@A@A@A@A@@@A@A@EAE@A@E@A@KAABC@A@A@C@C@A@A@A@@@A@@AA@@@AAAACAA@@@@@A@@AAAA@A@@AA@AA@@A@AA@@A@@@A@A@A@AAC@@@C@A@A@@@CAA@EAA@A@AAA@A@A@@@AAA@@@A@@@A@@@A@@@A@@@A@@@A@@@A@@@CAC@A@C@@@AAA@ACE@@AAC@A@C@C@@@CGF@@AAKAIFEB@@B@@AB@@@@BBBA@@BA@@@AAA@@BG@ADBB@@AAACACBA@AFA@A@AEHAAGACC@AD@@@B@@A@AA@EFEFADAF@B@BE@AHC@I@ABAGECEA@E@AACEAE@CBABA@@@@B@@A@C@A@@@A@A@@@A@@@AB@@A@AB@@AB@@ABA@@BA@@FAF@@A@C@IB@J@@@B@NAHBBEBAB@BB@@DIBAB@HBPAB@ACF@BD@@A@@B@@@@BB@@B@HBJHHABAD@D@BB@L@D@DD@@DBBF@@DR@BAR@@E@@DEAGBG@CACC@@A@CF@B@@AF@@ADD@ADOD@BGC@A@@CAA@@MEAAA@@C@@B@BGBAHAFDD@@@B@BAAEB@FA@EJ@BA@AD@BC@A@AD@DEHCB@H@F@D@NF@B@F@BDND@H@@@BFFHFDB@F@F@@@@HBFBDPJBBD@DAFAHABBB@@C@ABADCFCB@DAB@DAFCDEBABCBC@@@@@@B@@@@A@@@A@A@@BABA@C@AAC@A@@@@BA@@@@@A@A@A@A@@BA@AACAGAEAA@A@C@A@@@A@C@CBC@@@AB@@@@A@A@I@A@A@C@@AC@@@@A@A@O@GBBB@@KB@@@F@@@@I@@@GB@@E@EB@DCAG@@C@CA@AA@@@@QBAAA@G@EB@DEA@@@@@DG@AA@@CBBDB@@BGBABG@CD@F@@A@@ECCE@"],"encodeOffsets":[[122217,37620]]}}],"UTF8Encoding":true});}));