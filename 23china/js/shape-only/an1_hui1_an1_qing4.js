(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        factory(exports, require('echarts'));
    } else {
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    if (!echarts.registerMap) {
        log('ECharts Map is not loaded');
        return;
    }
    echarts.registerMap('安庆轮廓', {
        "type": "FeatureCollection", "features": [{
            "type": "Feature", "properties": { "name": "安庆" }, "geometry": {
                "type": "Polygon",
                "coordinates": ["@@D@FABBB@LFDBD@BA@AECAA@AFCD@PFD@BBB@@AB@BABABA@AAACC@A@ABAF@B@B@B@BBJ@BBDBB@@A@AF@H@D@B@FDB@B@B@BAB@BAD@@ABCI@KAMESKAA@AAAGGAGACAI@G@G@EBEDKBEDILI@GBKFIJINIDCBCJGDEFEDEBABGDIBG@C@C@OAIAKEICIAEAC@KCK@E@AAAAMCIAKEEEICGEGEEGGGECCCCECIGGAAAMAMBOFGBKDGDEDIDIFKHEDGDEDWFC@E@MBK@C@M@O@K@C@I@OAC@C@A@E@A@I@A@C@E@A@C@A@C@A@A@A@I@A@A@C@C@A@A@C@OEOCMKGEGEKIECQSAACCSO]O]ECAEAEC[UKNCFKBICGEAI@M@CBECGCG@CBODMBEDKFK@CJWDI@CBCBGBCH]BEB@FMDGBCDEBCHSBEBCBKBAAMASACAC@CACGOGEMGAAECKEMIAASQ]cEYCM@AEW@GACCEACACKSMWGIMQQUKOECEE]YEEAAWUGGIIAAGCKGKGOKYEC@MAKBKDKFMHC@WNCBWHODIBSAI@G@eEGASCMGOMS[AAGMGQK_C_BS@CEcC[AKIe@AAKEIGSIGKGMEE@KAWAcBQ@O@MAKA[QKEKIICWKMGCAqU]KcMSIMEUOSOMMGGIGIEOKKEOISGOCCAGBG@ADCBGLCBADEHMVMPSNIDGDUBU@Q@I@KAOC`AF@LANBJ@F@N@FBFBF@F@FAD@FAH@BEHAD@DABCDGL_dCFGJINKNGJCDEFA@CBCHCF@H@FDFDDDDDJ@B@B@FAJ@TADAD@D@F@HFHFJBBHFBFBD@J@FABCJGJCFABCFAJ@FBBDJFJ@F@HCH@HBF@DDFBDBFBH@FALAJALGFCBABGDCFCFCDCFGPAHAFABETAD@L@HBDBDFHFJDP@FCDCFADABCFCBA@EHGDCDI@CBA@GDE@ADCD@FCLCDGDOJABA@EBI@C@GDEFEJCF@DAD@JADALAJ@HAFAB@BEDEDEBIDA@CBA@IFEBIBC@EBIAEBC@SEEAGCGFIDGDIDCHBDFFHFHF@BDD@N@DCDAB@BGHEFKHGJ@BEP@BKPEL@D@BFHFDLJDFDDH@JBDBJLDJFLFDHDF@DAHABAHDDDDHQDOBEBEACBAB@DAD@HAFADCBE@EBCBCDEDEBE@CDAF@HBB@BBDHDBD@FADAFAD@JBDDHBHB@BFDJDD@DDFDDJHFFDDABC@E@C@EBEFCBAD@DCJADCHGDOFCB@FAHCJ@HMRADFLBFCDADCBCBKHG@E@EBADCHCJGDIBG@C@GBEBEBCCAC@EAEC@EDEHINENBD@BLL@FAJ@HAB@DCBADGFEBCBEF@F@FAFEDEDE@KHEDI@@JEJEFCBEDCD@FBBDDDB@DAHARBFBDBDDDDFHTNnDHFDJDJ@LBH@FADAFGFCDCF@D@FDHDFDF@D@HAB@NBBHAFBDDDLDHDJFBFDD@DCDA@GAIDABAD@FDDLNBHEHADBF@JEDIHGFCDADCH@FBFBFFFJLFDDBDD@B@DBDBHFDHBHDDDHHFFLDPFNBDDFBDBF@D@BAD@J@HDDBB@FT@DBDDBFAHDNJBBDDPHJDFDDD@JDDDDHDHBH@FBFDDDDFFDFBFDHFFBJBHBFBFAF@HCDDDFBDDBH@H@HAH@N@PA@DAHAH@FCFAHCDAJANAFCD@D@JAFAHBD@FA@A@I@KB@JBNBJ@HFH@HAJBDNTFHJNHDPFNFHDHFBBBB@D@BAFBBD@DBBBDBBBB@DADCDADAFAFABABADBB@FBFDLDFBJBPDRFF@LCHCFCFEFEDGBGAEAC@CBCFKJGJCNAF@J@BBF@B@JBHDJDHFFFTLRFFBBBJDBBBDDDBD@D@FBBBDBB@BABB@J@@D@B@BD@B@BBDBAB@B@BD@BABBBBFBBB@B@BB@D@D@BBABABBBD@B@B@BBABHB@BFDDHBB@BBBAF@B@BBD@BBBDBHFHDJBB@D@D@DABBFBB@DBBBBBDBBBBBBBBBBB@D@D@B@D@BBDHBBBB@DBBBDDFFB@DAHAJENGB@J@H@JED@BABBB@D@BBF@J@D@D@B@DA@ADA@ADA@ABABAHEFGDCDEBEBE@KBCFCDADAF@D@DAFAD@F@DBB@B@BFDFDBDDFBDBH@F@FBJDHHDFBDBBB@B@DE@CDABCB@B@F@B@@BB@BDDHDHDDDFFHDBB@DB@BDDBBBDBBFDHDB@BB@BBD@B@BBBDBBBB@B@B@DAFAD@@AB@BABC@ABA@AAA@AAAACAA@A@AAGBC@C@CBCBAB@BEBC@A@AAC@A@C@C@G@ADE@A@C@ACCAC@A@A@ADABABADEBA@C@AACACCEAAEGKKAA@CACACAECCCCCIAE@CACBA@A@A@CAACCACAC@CBC@A@C@C@A@C@AACACAEAA@ABC@ABA@AAAAG@C@CDAF@J@F@DBDDBDDDDBD@DDBBDDBB@BDLBFBDBDHFBBBBF@F@LAD@HCBCB@B@BBBDBHDBBDDBFBB@BDBB@BBBB@DBBBB@BB@HBBBDBBB@F@D@DAB@DEDABAF@DABALGJEDABABA@ABC@ABAD@B@FBFBDBHHBBB@BAD@B@F@F@DADADABADGBADCFALCLCH@B@B@FDHNHLDBBBJBH@JFDADA@ADAF@J@DBLJBB@BB@B@B@F@DBDBHBB@DAD@D@DADADCBAB@B@DBHDFHBFBBHDB@BBBHBBB@BBF@DBD@FHFHDFFFFDDBBAD@HBFBBBB@@FAJ@D@BBDBFBFDDHBJBDBHFH@JCLANBPFRLLHJHFDFDFDBHBF@DB@FBLAP@D@DBBBBLAFBLBH@BBDHFFFDHDHBJBBBHDH@BBFDHFLFJFJDFBBDFDHNJJFLHJRFFF@D@D@FAHEHCRKH@DADADCHQDGFCDCD@D@B@F@LBD@F@DADAFM@C@ABGPW@ADENSHIFC@A@EBE@ABA@AFEDG@E@AHMBAFI@CDEFCBE@EAAACAAAA@A@E@ABCBA@A@ACAACCA@EBE@CBADC@CBEBM@ACEAA@AAGAM@ANIHCPIDAF@HBD@DBF@D@FACGEMCGCACAAAAA@Q@I@AECCCACAIDIBIBC@ECEGGIAE@E@OHEDCBGBQAIEACBKB[AEECGGIIAGAG@KDYBKBIDSHaDKHiJsD]BED]Ag@cEeAIHGHGJCHADEDCBCBKBEDCTOHEHCBCDEDCHABADAD@DAD@BC@C@C@AB@BAFABABA@AB@DA", "@@FDHHBFBDDBJFB@ABCDCDCFCJABGFEAGAEACACBEDGDEBE@E@IECAIECE@C@C@CFCBADCDCDEBCHCJCLAJAF@F@B@F@"],
                "encodeOffsets": [[119985, 31440], [119768, 31364]]
            }
        }], "UTF8Encoding": true
    });
}));