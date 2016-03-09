//Jeff
var notifyAD = "";

//定义Config
var Config = new Object();
Config.language = 2;
Config.rank = 0;
Config.explain = 1;
Config.redcard = 1;
Config.showYellowCard = 1;
Config.detail = 1;
Config.vs = 1;
Config.sound = 0;
Config.guestSound = 0;
Config.winLocation = 0;
Config.style = 0;
Config.oddsSound = 0;
Config.showSbOddsDetail = 1;
//Config.orderBy = 1; //1:按时间排;2:搂联赛排
Config.oldOrNew = 2; //1:旧版;2:新版;
//Config.showLeagueScore = 0;
Config.haveLetGoal = 1;
Config.haveTotal = 1;
Config.haveEurope = 0;

Config.getCookie = function(type) {
    var Cookie = getCookie("Cookie");
    if (Cookie == null) Cookie = "";
    var Cookie = Cookie.split("^");
    if (Cookie.length != 17) writeCookie("Cookie", null);
    else {
        this.language = parseInt(Cookie[0]);
        this.rank = parseInt(Cookie[1]);
        this.explain = parseInt(Cookie[2]);
        this.redcard = parseInt(Cookie[3]);
        this.showYellowCard = parseInt(Cookie[4]);
        this.detail = parseInt(Cookie[5]);
        this.vs = parseInt(Cookie[6]);
        this.sound = parseInt(Cookie[7]);
        this.winLocation = parseInt(Cookie[8]);
        this.style = parseInt(Cookie[9]);
        this.oddsSound = parseInt(Cookie[10]);
        this.guestSound = parseInt(Cookie[11]);
        this.showSbOddsDetail = parseInt(Cookie[12]);
        //this.orderBy = parseInt(Cookie[13]);
        this.oldOrNew = parseInt(Cookie[13]);
        this.haveLetGoal = parseInt(Cookie[14]);
        this.haveTotal = parseInt(Cookie[15]);
        this.haveEurope = parseInt(Cookie[16]);
        //this.showLeagueScore = parseInt(Cookie[15]);
    }
}
Config.setStates = function(type) {
    try {
        document.getElementById("Language" + Config.language).className = "selected";
        if (this.rank == 1) document.getElementById("rank").checked = true;
        if (this.explain == 0) document.getElementById("explain").checked = false;
        if (this.redcard == 0) document.getElementById("redcard").checked = false;
        if (this.showYellowCard == 0) document.getElementById("showYellowCard").checked = false;
        if (this.detail == 0) document.getElementById("detail").checked = false;
        if (this.vs == 0) document.getElementById("vs").checked = false;
        if (this.sound == -1) document.getElementById("soundCheck").checked = false;
        if (this.sound > 0) document.getElementById("sound").value = this.sound;
        if (this.winLocation == -1) document.getElementById("windowCheck").checked = false;
        if (this.winLocation > 0) document.getElementById("winLocation").value = this.winLocation;
        if (this.style > 0) document.getElementById("style").value = this.style;
        if (type != "oldindex") {
            if (this.oddsSound == 1) document.getElementById("oddsSound").checked = true;
            document.getElementById("checkLet").checked = (Config.haveLetGoal == 1);
            document.getElementById("checkEu").checked = (Config.haveEurope == 1);
            document.getElementById("checkTotal").checked = (Config.haveTotal == 1);
        }
        if (type == "index" && this.showSbOddsDetail == 0) document.getElementById("showSbOddsDetail").checked = false;
        //if (type == "index" && this.showLeagueScore == 0) document.getElementById("showLeagueScore").checked = false;
        //        if (type == "index") {
        //            if (this.orderBy == 1)
        //                document.getElementById("orderbyChange").value = (this.language == 1 ? "按聯賽選擇" : "按联赛选择");
        //            else
        //                document.getElementById("orderbyChange").value = (this.language == 1 ? "按時間選擇" : "按时间选择");
        //        }
    }
    catch (e) { }
}
Config.writeCookie = function() {
    var value = this.language + "^" + this.rank + "^" + this.explain + "^" + this.redcard + "^" + this.showYellowCard + "^" + this.detail + "^" + this.vs + "^" + this.sound + "^" + this.winLocation + "^" + this.style + "^" + this.oddsSound + "^" + this.guestSound + "^" + this.showSbOddsDetail + "^" + this.oldOrNew + "^" + this.haveLetGoal + "^" + this.haveTotal + "^" + this.haveEurope;
    writeCookie("Cookie", value);
}
var ieNum = 0;
try {
    if (document.all && typeof (document.documentMode) != "undefined")
        ieNum = document.documentMode;
}
catch (e) {
    ieNum = 0;
}
function Hashtable() {
    this._hash = new Object();
    this.add = function(key, value) {
        if (typeof (key) != "undefined") {
            this._hash[key] = typeof (value) == "undefined" ? null : value;
            return true;
        }
        else
            return false;
    }
    this.remove = function(key) { delete this._hash[key]; }
    this.keys = function() {
        var keys = new Array();
        for (var key in this._hash) {
            keys.push(key);
        }
        return keys;
    }
    this.count = function() { var i = 0; for (var k in this._hash) { i++; } return i; }
    this.items = function(key) { return this._hash[key]; }
    this.contains = function(key) {
        return typeof (this._hash[key]) != "undefined";
    }
    this.clear = function() { for (var k in this._hash) { delete this._hash[k]; } }
}
function setOldOrNew(l) {
//    if (Config.oldOrNew == l) return;
    Config.oldOrNew = l;
    Config.writeCookie();
    changeOldOrNew(l);
}
function changeOldOrNew(l) {
    var name = location.href.substring(location.href.lastIndexOf("/") + 1);
    //if (name.indexOf('.') != -1 && name.indexOf("all") == -1) return;
    if (name.indexOf("old") != -1 && l == 1) return;
    if ((name.indexOf('.') == -1 || name.indexOf("old") == -1) && name.indexOf("2in1") == -1 && l == 2) return;
    if (l == 1)//旧版
    {
        if (Config.language == 1)
            name = "oldIndexall_big.aspx";
        else
            name = "oldIndexall.aspx";

    }
    else//新版
    {
        if (Config.language == 1)
            name = "indexall_big.aspx";
        else
            name = "indexall.aspx";
    }
    location.href = name;
}
var lang = 0; //方便取数据
var resultName = "先开球,第一个角球,第一张黄牌,射门次数,射正次数,犯规次数,角球,角球(加时),任意球次数,越位次数,乌龙球数,黄牌,黄牌数(加时),红牌,控球时间,头球,救球,守门员出击,丟球,成功抢断,阻截,长传,短传,助攻,成功传中,第一个换人,最后换人,第一个越位,最后越位,换人数,最后角球,最后黄牌,换人数(加时), 越位次数(加时),射门不中,中柱,头球成功次数,射门被挡,铲球,过人次数,界外球,传球次数,传球成功次数".split(',');
var resultName_big = "先開球,第壹個角球,第壹張黃牌,射門次數,射正次數,犯規次數,角球,角球(加時),任意球次數,越位次數,烏龍球數,黃牌,黃牌(加時),紅牌,控球時間,頭球,救球,守門員出擊,丟球,成功搶斷,阻截,長傳,短傳,助攻,成功傳中,第壹個換人,最後換人,第壹個越位,最後越位,換人數,最後角球,最後黃牌,換人數(加時), 越位次數(加時),射門不中,中柱,頭球成功次數,射門被擋,鏟球,過人次數,界外球,傳球次數,傳球成功次數".split(',');
var flash_sound = Array(5);
flash_sound[0] = "bf_img/sound.swf";
flash_sound[1] = "bf_img/notice.swf";
flash_sound[2] = "bf_img/base.swf";
flash_sound[3] = "bf_img/deep.swf";
flash_sound[4] = "bf_img/oddssound.swf";

function ShowFlash(id, n, type) {
    try {
        var ieVersion = "-1";
        var ua = navigator.userAgent.toLowerCase();
        if (window.ActiveXObject)
            ieVersion = ua.match(/msie ([\d.]+)/)[1];
        if (type == 1) {
            if (Config.sound >= 0 && parseInt(A[n][13]) >= -1) {
                if (document.getElementById("tr1_" + id).style.display != "none") {
                    if (parseFloat(ieVersion) > 0 && parseFloat(ieVersion) < 6)
                        document.getElementById("flashsound").innerHTML = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' width='1' height='1'><param name='movie' value='" + flash_sound[Config.sound] + "'><param name='quality' value='high'><param name='wmode' value='transparent'><embed src='" + flash_sound[Config.sound] + "' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='1' height='1'></embed></object>";
                    else
                        document.getElementById("flashsound").innerHTML = "<embed src='" + flash_sound[Config.sound] + "' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='1' height='1'></embed>";
                }
            }
        }
        else {
            if (Config.guestSound >= 0 && parseInt(A[n][13]) >= -1) {
                if (document.getElementById("tr1_" + id).style.display != "none") {
                    if (parseFloat(ieVersion) > 0 && parseFloat(ieVersion) < 6)
                        document.getElementById("flashsound").innerHTML = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' width='1' height='1'><param name='movie' value='" + flash_sound[Config.guestSound] + "'><param name='quality' value='high'><param name='wmode' value='transparent'><embed src='" + flash_sound[Config.guestSound] + "' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='1' height='1'></embed></object>";
                    else
                        document.getElementById("flashsound").innerHTML = "<embed src='" + flash_sound[Config.guestSound] + "' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='1' height='1'></embed>";
                }
            }
        }
    } catch (e) { };
    window.setTimeout("timecolors(" + id + ")", 120000);
}
function ShowOddsSound() {
    var ieVersion = "-1";
    var ua = navigator.userAgent.toLowerCase();
    if (window.ActiveXObject)
        ieVersion = ua.match(/msie ([\d.]+)/)[1];
    if (parseFloat(ieVersion) > 0 && parseFloat(ieVersion) < 6)
        document.getElementById("flashsound").innerHTML = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' width='1' height='1'><param name='movie' value='" + flash_sound[Config.oddsSound] + "'><param name='quality' value='high'><param name='wmode' value='transparent'><embed src='" + flash_sound[Config.oddsSound] + "' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='1' height='1'></embed></object>";
    else
        document.getElementById("flashsound").innerHTML = "<embed src='" + flash_sound[Config.oddsSound] + "' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='1' height='1'></embed>";
}
var lastUpdateTime, oldUpdateTime = "";
var lastUpdateFileTime = 0;
var hiddenID = "_";
var concernId = "_";
var bg1 = "#FFFDF3";
var bg2 = "#F0F0F0";
var pk = Array(60);
var macName = new Array()
var loadDetailFileTime = new Date();
var loaded = 0, LoadTime = 0, notifyTimer, matchType = -1, runtimeTimer;
var oXmlHttp = zXmlHttp.createRequest();
var oddsHttp = zXmlHttp.createRequest();
var oldOddsXML = '', getoddsxmlTimer;
var sData = new Object();
var sCornerData = new Object();
var oldXML = "", oldCornerXml = "";
var showCont = 0;
var showCornerCont = 0;
//var T = new Object();//别名表对象

function SortData() {
    temp = new Array();
    var j = 1;
    temp[0] = ",";
    var tempCount = matchcount;
    for (var i = 1; i <= tempCount; i++) {
        if (concernId.indexOf("_" + A[i][0] + "_") != -1) {
            temp[j] = A[i];
            A.splice(i, 1);
            tempCount--;
            i--;
            j++;
        }
    }
    if (temp.length > 1) {
        document.getElementById("concernCount").innerHTML = temp.length - 1;
        A.splice(0, 1);
        A = temp.concat(A);
    }
}
function getAllMacName() {
    for (var i = 1; i <= matchcount; i++) {
        macName[i] = new Array()
        macName[i][0] = "";
        macName[i][1] = "";
        macName[i][2] = "";
        macName[i][3] = "";
    }
    if (Config.language == 2) {
        try {
            for (i = 0; i < T.length; i++) {
                if (T[i][0] == 3) {
                    for (var j = 1; j <= matchcount; j++) {
                        if (A[j][6] == T[i][1]) {
                            macName[j][2] = T[i][2];
                            break;
                        }
                        if (A[j][6] == T[i][1] + "<font color=#880000>(中)</font>") {
                            macName[j][2] = T[i][2] + "<font color=#880000>(中)</font>";
                            break;
                        }
                        else if (A[j][9] == T[i][1]) {
                            macName[j][3] = T[i][2];
                            break;
                        }
                    }
                }
            }
        }
        catch (e) { }
    }
    for (i = 1; i <= matchcount; i++) {
        if (macName[i][0] == "")
            macName[i][0] = A[i][6].split("<")[0];
        if (macName[i][1] == "")
            macName[i][1] = A[i][9].split("<")[0];
        if (macName[i][2] == "")
            macName[i][2] = A[i][5];
        if (macName[i][3] == "")
            macName[i][3] = A[i][8];
    }
}
function getTeamName(i, t, cId, t2) {//t2 1:新版,旧版;2:2合1
    if (cId == 1 || cId == 3) {
        var key1 = A[i][37] + "_" + cId, key2 = A[i][38] + "_" + cId;
        if (Config.language < 2) {
            if (t2 == 1 || Config.language==1) {
                if (t == 1)
                    return A[i][5 + Config.language]; //主队
                else
                    return A[i][8 + Config.language]; //客队
            }
            else {
                if (t == 1) {
                    if (A[i][5 + lang].indexOf("(中)") != -1)
                        return typeof (T[key1]) != "undefined" ? T[key1][0] + "<font color=#880000>(中)</font>" : A[i][5 + lang];
                    else
                        return typeof (T[key1]) != "undefined" ? T[key1][0] : A[i][5 + lang];
                }
                else
                    return typeof (T[key2]) != "undefined" ? T[key2][0] : A[i][8 + lang];
            }
        }
        else if (Config.language == 2) {
            if (t == 1) {
                if (A[i][5 + lang].indexOf("(中)") != -1)
                    return typeof (T[key1]) != "undefined" ? T[key1][0] + "<font color=#880000>(中)</font>" : A[i][5 + lang];
                else
                    return typeof (T[key1]) != "undefined" ? T[key1][0] : A[i][5 + lang];
            }
            else
                return typeof (T[key2]) != "undefined" ? T[key2][0] : A[i][8 + lang];
        }
    }
    else {
        if (t == 1)
            return A[i][5 + lang]; //主队
        else
            return A[i][8 + lang]; //客队
    }
}
function timecolors(matchid) {
    try {
        var tr = document.getElementById("tr1_" + matchid);
        tr.cells[4].style.backgroundColor = "";
        tr.cells[6].style.backgroundColor = "";
    }
    catch (e) { }
}

function clearNotify(str) {
    var result;
    try {
        var re = new RegExp(str.replace("(", "\(").replace(")", "\)").replace("[", "\[").replace("]", "])"), "ig");
        var notify = document.getElementById("notify").innerHTML;
        var result = notify.replace(re, "");
        if (notify == result) result = "";
        if (result == "") result = notifyAD;
    }
    catch (e) { result = notifyAD; }
    document.getElementById("notify").innerHTML = result;
}

function CheckSound() {
    if (document.getElementById("soundCheck").checked) {
        Config.sound = parseInt(document.getElementById("sound").value)
        Config.guestSound = parseInt(document.getElementById("guestSound").value)
    }
    else {
        Config.sound = -1;
        Config.guestSound = -1;
    }
    Config.writeCookie();
}
function CheckWindow() {
    if (document.getElementById("windowCheck").checked) Config.winLocation = parseInt(document.getElementById("winLocation").value)
    else Config.winLocation = -1;
    Config.writeCookie();
}

function CheckCountry(obj) {
    if (obj.checked)
        obj.parentElement.style.backgroundColor = "#ffeeee";
    else
        obj.parentElement.style.backgroundColor = "white";
    SelectCountryOK();
}
function SelectCountryAll(value) {
    var i, inputs;
    inputs = document.getElementById("countryList").getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type != "checkbox") continue;
        if (value)
            inputs[i].checked = value;
        else
            inputs[i].checked = !inputs[i].checked;
        if (inputs[i].checked) {
            inputs[i].parentElement.style.backgroundColor = "#ffeeee";
        }
        else {
            inputs[i].parentElement.style.backgroundColor = "white";
        }
    }
    SelectCountryOK();
}

function SelectCountryOK() {
    var i, j, inputs;
    var hh = 0;
    inputs = document.getElementById("countryList").getElementsByTagName("input");
    hiddenID = "_";
    for (var i = 0; i < inputs.length; i++) {
        try {
            if (inputs[i].checked) {
                var k = parseInt(inputs[i].value);
                for (var j = 1; j <= matchcount; j++) {
                    if (A[j][0] > 0 && A[j][40] == C[k][0]) {
                        document.getElementById("tr1_" + A[j][0]).style.display = "";
                        if (Config.explain == 1 && A[j][42] + A[j][30] != "") document.getElementById("tr2_" + A[j][0]).style.display = "";
                        hiddenID += A[j][0] + "_";
                    }
                }
            }
            else {
                var k = parseInt(inputs[i].value);
                for (var j = 1; j <= matchcount; j++) {
                    if (A[j][0] > 0 && A[j][40] == C[k][0]) {
                        document.getElementById("tr1_" + A[j][0]).style.display = "none";
                        if (Config.explain == 1 && A[j][42] + A[j][30] != "") document.getElementById("tr2_" + A[j][0]).style.display = "none";
                        hh = hh + 1;
                    }
                }
            }
        } catch (e) { }
    }
    if (hh == 0) hiddenID = "_";
    writeCookie("Bet007live_hiddenID", hiddenID);
    document.getElementById("hiddencount").innerHTML = hh;
    changeLeagueState();
    if (location.href.toLowerCase().indexOf("index2in1") == -1 && location.href.toLowerCase().indexOf("oldIndexall") == -1)
        changeGoalState();
}

function CloseLeague(i) {
    document.getElementById("myleague_" + i).checked = false;
    SelectOK(1);
}

function HiddenLeague(i) {
    var obj = document.getElementById("collapse" + i);
    var b = true;
    if (obj.innerHTML.indexOf("cllse") != -1) {
        b = false;
        obj.innerHTML = "<img src='http://live3.win007.com/image/expand2.gif'>";
    }
    else {
        b = true;
        obj.innerHTML = "<img src='http://live3.win007.com/image/cllse.gif'>";
    }
    document.getElementById("myleague_" + i).checked = b;
    SelectOK(2);
}
function ShowAllMatch() {
    SelectAll(true);
    SelectOK(1);
    if (location.href.toLowerCase().indexOf("index2in1") == -1 && location.href.toLowerCase().indexOf("oldIndexall") == -1)
        checkAllGoal();
    checkAllCountry();
}
function checkAllGoal() {
    var obj = document.getElementById("goalTable");
    var inputs = obj.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type != "checkbox") continue;
        inputs[i].checked = true; //全选
    }
}
function checkAllCountry() {
    var inputs = document.getElementById("countryList").getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].checked = true;
        inputs[i].parentElement.style.backgroundColor = "#ffeeee";
    }
}
function makeCountry() {
    var countryhtml = new Array();
    countryhtml.push("<ul>");
    var countryName = "";
    for (var i = 0; i < C.length; i++) {
        if (C[i][2] == 0) continue;
        if (Config.language ==0)
            countryName = C[i][1];
        else
            countryName = C[i][3];
        if (C[i][4] > 0)
            countryhtml.push("<li style='background-color:#fff0f0'><input onclick='CheckCountry(this)' checked type=checkbox id='mycountry_" + i + "' value=" + i + "><label style='cursor:pointer' for='mycountry_" + i + "'>");
        else
            countryhtml.push("<li style='background-color:#ffffff'><input onclick='CheckCountry(this)' type=checkbox id='mycountry_" + i + "' value=" + i + "><label style='cursor:pointer' for='mycountry_" + i + "'>");
        countryhtml.push(countryName + "</label></li>");
    }
    countryhtml.push("</ul>");
    document.getElementById("countryList").innerHTML = countryhtml.join("");
}
function makeLeague() {
    var leaguehtml = new Array();
    leaguehtml.push("<ul>");
    var sclassName = "";
    for (var i = 1; i <= sclasscount; i++) {
        if (B[i][6] == 0) continue;
        if (Config.language < 2)
            sclassName = B[i][Config.language];
        else
            sclassName = B[i][0];
        if (B[i][7] > 0)
            leaguehtml.push("<li style='background-color:#fff0f0'><input onclick='CheckLeague(this)' checked type=checkbox id='myleague_" + i + "' value=" + i + "><label style='cursor:pointer' for='myleague_" + i + "'>");
        else
            leaguehtml.push("<li style='background-color:#ffffff'><input onclick='CheckLeague(this)' type=checkbox id='myleague_" + i + "' value=" + i + "><label style='cursor:pointer' for='myleague_" + i + "'>");

        if (B[i][5] == "1")
            leaguehtml.push("<font color=red>" + sclassName + "[" + B[i][6] + "]</font></label></li>");
        else
            leaguehtml.push(sclassName + "[" + B[i][6] + "]</label></li>");
    }
    leaguehtml.push("</ul>");
    document.getElementById("myleague").innerHTML = leaguehtml.join("");
}
function CheckLeague(obj) {
    if (obj.checked)
        obj.parentElement.style.backgroundColor = "#ffeeee";
    else
        obj.parentElement.style.backgroundColor="white";
}
function SelectAll(value) {
    var i, inputs;
    inputs = document.getElementById("myleague").getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type != "checkbox") continue;
        inputs[i].checked = value;
        if (inputs[i].checked) {
            inputs[i].parentElement.style.backgroundColor = "#ffeeee";
        }
        else {
            inputs[i].parentElement.style.backgroundColor = "white";
        }
    }
}
function setOrderby() {
    Config.orderBy = (Config.orderBy == 1 ? 2 : 1);
    if (Config.orderBy == 1)
        document.getElementById("orderbyChange").value = (Config.language == 1 ? "按聯賽選擇" : "按联赛选择");
    else
        document.getElementById("orderbyChange").value = (Config.language == 1 ? "按時間選擇" : "按时间选择");
    Config.writeCookie();
    document.getElementById("hiddencount").innerHTML = 0;
    LoadLiveFile();
}
function SelectImportant() {
    for (var i = 1; i <= sclasscount; i++) {
        if (B[i][6] == 0) continue;
        if (B[i][5] == "1") {
            document.getElementById("myleague_" + i).checked = true;
            document.getElementById("myleague_" + i).parentElement.style.backgroundColor = "#ffeeee";
        }
        else {
            document.getElementById("myleague_" + i).checked = false;
            document.getElementById("myleague_" + i).parentElement.style.backgroundColor = "#ffffff";
        }
    }
    SelectOK(1);
}

function SelectOK(t) {
    var i, j, inputs;
    var hh = 0;
    inputs = document.getElementById("myleague").getElementsByTagName("input");
    hiddenID = "_";
    for (var i = 0; i < inputs.length; i++) {
        try {
            if (inputs[i].checked) {
                var k = parseInt(inputs[i].value);
                for (var j = 1; j <= matchcount; j++) {
                    if (A[j][0] > 0 && A[j][2] == B[k][0]) {
                        document.getElementById("tr1_" + A[j][0]).style.display = "";
                        if (Config.explain == 1 && A[j][42] + A[j][30] != "") document.getElementById("tr2_" + A[j][0]).style.display = "";
                        hiddenID += A[j][0] + "_";
                    }
                }
            }
            else {
                var k = parseInt(inputs[i].value);
                for (var j = 1; j <= matchcount; j++) {
                    if (A[j][0] > 0 && A[j][2] == B[k][0]) {
                        document.getElementById("tr1_" + A[j][0]).style.display = "none";
                        if (Config.explain == 1 && A[j][42] + A[j][30] != "") document.getElementById("tr2_" + A[j][0]).style.display = "none";
                        hh = hh + 1;
                    }
                }
            }
        } catch (e) { }
    }
    if (hh == 0) hiddenID = "_";
    writeCookie("Bet007live_hiddenID", hiddenID);
    document.getElementById("hiddencount").innerHTML = hh;
    changeCountryState();
    if (location.href.toLowerCase().indexOf("index2in1") == -1 && location.href.toLowerCase().indexOf("oldIndexall") == -1)
        changeGoalState();
}
//'按比赛状态显示
function ShowMatchByMatchState(n) {
    var i, j;
    var hh = 0;
    // var hIds = "";
    var trs = document.getElementById("table_live").getElementsByTagName("tr");
    for (var i = 1; i < trs.length; i++) {
        if (trs[i].getAttribute("index") != null) {
            trs[i].style.display = "none";
            trs[i + 1].style.display = "none";
        }
    }

    for (var i = 1; i <= matchcount; i++) {
        if (A[i][0] > 0 && ((n == 1 && parseInt(A[i][13]) > 0) || (n == 2 && A[i][13] == "-1") || (n == 3 && A[i][13] == "0") || (n == 4 && A[i][28] == "True"))) {
            document.getElementById("tr1_" + A[i][0]).style.display = "";
            if (Config.explain == 1 && A[i][42] + A[i][30] != "") document.getElementById("tr2_" + A[i][0]).style.display = "";
            hh = hh + 1;
            //hIds += "_" + A[i][0] + "_";
        }
    }
    document.getElementById("hiddencount").innerHTML = matchcount - hh;
}

function CheckExplain(){
    if(document.getElementById("explain").checked)  Config.explain=1;
    else  Config.explain=0;
    Config.writeCookie();
    ShowExplain();
}
function ShowExplain(){
    var value="none";
    if(Config.explain==1)  value="";
    for(var i=1;i<=matchcount;i++)
        if (A[i][0] > 0 && A[i][42] + A[i][30] != "") document.getElementById("tr2_" + A[i][0]).style.display = value;
}


function ChangeBgColor(n){
    SetBgColor(n);
    Config.style=n;
    Config.writeCookie();
}
function SetBgColor(n){
    bg2=["F0F0F0","E0E9F6","F2F2F2","F0F7FF","EDFBFF","F8F9FC","EEEEEE"][parseInt(n)];
    var bg;
    bg1 = "#FFFFFF";
    if(bg2=="F0F0F0") bg1 = "FFFDF3";
    var trs=document.getElementById("table_live").getElementsByTagName("tr");
    for(var i=1; i<trs.length;i++){
        if(trs[i].getAttribute("index")!=null){
            if(bg==bg2) bg=bg1; else bg = bg2;
            trs[i].style.backgroundColor =bg;
        }
    }
    //document.body.style.backgroundImage="url(http://live3.win007.com/image/bg" +bg2+".gif)";
    document.body.style.backgroundImage="http://live3.win007.com/image/bg" +bg2+".gif";
}


function CheckTeamRank(){
    if(document.getElementById("rank").checked)   Config.rank=1;
    else  Config.rank=0;
    Config.writeCookie();
    ShowTeamOrder();
}
function ShowTeamOrder(){
    if(Config.rank==1){
        for(var i=1;i<=matchcount;i++){
            if(A[i][0]==0) continue;
            if(A[i][22]!="") document.getElementById("horder_" + A[i][0]).innerHTML="<font color=#444444><sup>["+ A[i][22] +"]</sup></font>";
            if(A[i][23]!="") document.getElementById("gorder_" + A[i][0]).innerHTML="<font color=#444444><sup>["+ A[i][23] +"]</sup></font>";
        }
    }
    else{
        for(var i=1;i<=matchcount;i++){
            if(A[i][0]==0) continue;
            document.getElementById("horder_" +  A[i][0]).innerHTML="";
            document.getElementById("gorder_" +  A[i][0]).innerHTML="";
        }
    }
}
function CheckFunction(obj){
    if(document.getElementById(obj).checked)   eval("Config."+obj+"=1");
    else   eval("Config."+obj+"=0");
    Config.writeCookie();
    if (obj == "showYellowCard") {
        MakeTable();
        if (location.href.toLowerCase().indexOf("2in1") != -1)
            showodds();
    }
}

function HiddenSelected(value) {
    var hh = parseInt(document.getElementById("hiddencount").innerHTML);
    var obj;
    for (var j = 1; j <= sclasscount; j++) B[j][7] = 0;
    for (var i = 1; i <= matchcount; i++) {
        obj = document.getElementById("tr1_" + A[i][0]);

        if (A[i][0] > 0 && obj.style.display == "") {
            if (document.getElementById("chk_" + A[i][0]).checked == value) {
                obj.style.display = "none";
                if (A[i][42] + A[i][30] != "") document.getElementById("tr2_" + A[i][0]).style.display = "none";
                hh = hh + 1;
                hiddenID = hiddenID.replace("_" + A[i][0] + "_", "_");
            }
            else {
                if (hiddenID.indexOf("_" + A[i][0] + "_") == -1) hiddenID += A[i][0] + "_";
            }
        }
    }
    document.getElementById("hiddencount").innerHTML = hh;
    changeLeagueState();
    changeCountryState();
    if (location.href.toLowerCase().indexOf("index2in1") == -1 && location.href.toLowerCase().indexOf("oldIndexall") == -1)
        changeGoalState();
    writeCookie("Bet007live_hiddenID", hiddenID);
}
function changeLeagueState() {
    for (var j = 1; j <= sclasscount; j++) B[j][7] = 0;
    for (var i = 1; i <= matchcount; i++) {
        if (hiddenID != "_" && hiddenID.indexOf("_" + A[i][0] + "_") == -1) continue;
        for (j = 1; j <= sclasscount; j++) {
            if (A[i][2] == B[j][0]) {
                B[j][7]++;
                break;
            }
        }
    }
    for (var j = 1; j <= sclasscount; j++) {
        if (B[j][6] == 0) continue;
        if (B[j][7] > 0) {
            document.getElementById("myleague_" + j).checked = true;
            document.getElementById("myleague_" + j).parentElement.style.backgroundColor = "#ffeeee";
        }
        else {
            document.getElementById("myleague_" + j).checked = false;
            document.getElementById("myleague_" + j).parentElement.style.backgroundColor = "#ffffff";
        }
    }
}
function changeCountryState() {
    for (var j = 0; j < C.length; j++) C[j][4] = 0;
    for (var i = 1; i <= matchcount; i++) {
        if (hiddenID != "_" && hiddenID.indexOf("_" + A[i][0] + "_") == -1) continue;
        for (j = 0; j < C.length; j++) {
            if (A[i][40] == C[j][0]) {
                C[j][4]++;
                break;
            }
        }
    }
    for (var j = 0; j < C.length; j++) {
        if (C[j][2] == 0) continue;
        if (C[j][4] > 0) {
            document.getElementById("mycountry_" + j).checked = true;
            document.getElementById("mycountry_" + j).parentElement.style.backgroundColor = "#ffeeee";
        }
        else {
            document.getElementById("mycountry_" + j).checked = false;
            document.getElementById("mycountry_" + j).parentElement.style.backgroundColor = "#ffffff";
        }
    }
}
function movepanlu(event) {
    var scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    document.getElementById('winScore').style.top = Math.max(0, scrollTop + event.clientY - document.getElementById('winScore').offsetHeight - 15) + "px";
}

function hiddendetail() {
    document.getElementById("winScore").style.display = "none";
    document.getElementById("winScore").innerHTML = "";

}
function MoveToBottom(m){
    try{
        document.getElementById("tr1_" +  m).parentElement.insertAdjacentElement("BeforeEnd",document.getElementById("tr1_" +  m));
        document.getElementById("tr2_" +  m).parentElement.insertAdjacentElement("BeforeEnd",document.getElementById("tr2_" +  m));
        for(var i=1;i<adinfo1.length;i++)
        {
            if(i<=5)
                document.getElementById("table_live").rows(i*5-1).insertAdjacentElement("BeforeBegin",  document.getElementById("tr_ad" + i));
            if(i==6)
                document.getElementById("table_live").rows(37).insertAdjacentElement("BeforeBegin",  document.getElementById("tr_ad" + i));
            if(i==7)
                document.getElementById("table_live").rows(42).insertAdjacentElement("BeforeBegin",  document.getElementById("tr_ad" + i));
            if(i==8)
                document.getElementById("table_live").rows(69).insertAdjacentElement("BeforeBegin",  document.getElementById("tr_ad" + i));
            if(i==9)
                document.getElementById("table_live").rows(78).insertAdjacentElement("BeforeBegin", document.getElementById("tr_ad" + i));
            if (i == 10)
                document.getElementById("table_live").rows(81).insertAdjacentElement("BeforeBegin", document.getElementById("tr_ad" + i));

            //document.getElementById("table_live").rows(90).insertAdjacentElement("BeforeBegin",  document.getElementById("tr_ad9"));
        }
//if ((location.pathname.indexOf(".aspx") == -1 || location.pathname.indexOf("indexall") != -1 || location.pathname.indexOf("indexAll") != -1))
        //document.getElementById("table_live").rows(31).insertAdjacentElement("BeforeBegin", document.getElementById("tr_oad1"));
    }catch(e){}
}

function MovePlace(newPos, oldPos) {
    try {
        if (newPos == 0) {
            document.getElementById("tr_" + newPos).insertAdjacentElement("BeforeBegin", document.getElementById("tr1_" + oldPos));
            document.getElementById("tr_" + newPos).insertAdjacentElement("BeforeBegin", document.getElementById("tr2_" + oldPos));
        }
        else {
            document.getElementById("tr1_" + newPos).insertAdjacentElement("BeforeBegin", document.getElementById("tr1_" + oldPos));
            document.getElementById("tr1_" + newPos).insertAdjacentElement("BeforeBegin", document.getElementById("tr2_" + oldPos));
        }
    }
    catch (e) {
    }
}


function SetLevel(m) {
    matchType = m;
    LoadLiveFile();
    document.getElementById("liZC").style.color = "blue";
}
function LoadLiveFile() {
    var allDate = document.getElementById("allDate");
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.charset = "gb2312";
    s.src = "http://bf.win007.com/vbsxml/bfdata.js?r=007" + Date.parse(new Date());
    allDate.removeChild(allDate.firstChild);
    allDate.appendChild(s, "script");
    window.setTimeout("LoadLiveFile()", 1800 * 1000);
}
function LoadDetailFile() {
    var detail = document.getElementById("span_detail");
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.charset = "gb2312";
    s.src = "http://bf.win007.com/vbsxml/detail.js?r=007" + Date.parse(new Date());
    detail.removeChild(detail.firstChild);
    detail.appendChild(s, "script");
    loadDetailFileTime = new Date();
}
function LoadPanluFile() {
    var detail = document.getElementById("span_panlu");
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.charset = "gb2312";
    s.src = "http://bf.win007.com/vbsxml/panlu.js?r=007" + Date.parse(new Date());
    detail.removeChild(detail.firstChild);
    detail.appendChild(s, "script");
}
function writeCookie(name, value) {
    delCookie(name);
    var expire = "";
    var hours = 365;
    expire = new Date((new Date()).getTime() + hours * 3600000);
    expire = ";path=/;expires=" + expire.toGMTString() + ";domain=" + getDoMain();
    document.cookie = name + "=" + value + expire; //escape(
}
function getCookie2(name)//取cookies函数
{
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;

}
function delCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1000 * 3600);
    var cval = getCookie2(name);
    if (cval != null && cval != "null")
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function getDoMain() {
    var arrDoms = location.href.split("/")[2].split(".");
    var isNum = /^\d+$/;
    if (isNum.test(arrDoms[1]))
        return arrDoms[0] + "." + arrDoms[1] + "." + arrDoms[2] + "." + arrDoms[3].split(":")[0];
    else
        return arrDoms[1] + "." + arrDoms[2];
}
function changeData(odds) {
    if (typeof (odds) == "undefined" || odds == "")
        return "";
    var tmp = odds;
    var arrd = odds.toString().split(".");
    if (arrd.length > 1) {
        if (arrd[1].length == 1)
            tmp = tmp + "0";
    }
    else
        tmp = tmp + ".00";
    return tmp;
}
function getStrDiv(odds1, odds2) {
    if (typeof (odds1) == "undefined" || odds1 + "" == "")
        return "";
    var retVal;
    var tmp = changeData(odds1);
    if (parseFloat(odds1) > parseFloat(odds2))
        retVal = '<div class="up_red">' + tmp + '</div>';
    else if (parseFloat(odds1) < parseFloat(odds2))
        retVal = '<div class="down_green">' + tmp + '</div>';
    else
        retVal = tmp;
    return retVal;
}
function getStrDiv2(goal1, goal2, t) {
    if (typeof (goal1) == "undefined" || goal1 + "" == "")
        return "";
    var tmp = "", retVal;
    if (t == 1) tmp = Goal2GoalCn(goal1);
    else if (t == 2) tmp = Goal2GoalCn2(goal1);
    else tmp = goal1;
    if (parseFloat(goal1) != parseFloat(goal2))
        retVal = '<div class="change_yellow">' + tmp + '</div>';
    else
        retVal = tmp;
    return retVal;
}
function getChangeStrDiv(odds1, odds2) {
    var retVal;
    if (typeof (odds1) == "undefined" || odds1 == "")
        return "";
    if (parseFloat(odds1) > parseFloat(odds2))
    // retVal = '<div class="up_red"><span class=up>' + odds1 + '</span></div>';
        retVal = '<div class="up_red">' + odds1 + '</div>';
    else if (parseFloat(odds1) < parseFloat(odds2))
        retVal = '<div class="down_green"><span class=down>' + odds1 + '</span></div>';
    else
        retVal = odds1;
    return retVal;
}

function gettime()
{
    try
    {
        LoadTime=(LoadTime+1)  % 60;
        if(LoadTime==0)
            getxml("2");
        else
        {
            oXmlHttp.open("get","vbsxml/time.txt?r=007" + Date.parse(new Date()),true);
            oXmlHttp.onreadystatechange = function()
            {
                if (oXmlHttp.readyState == 4 && oXmlHttp.status == 200) {
                    lastUpdateTime=new Date();
                    if(oXmlHttp.responseText!="" && oXmlHttp.responseText!=lastUpdateFileTime)
                    {
                        lastUpdateFileTime=oXmlHttp.responseText;
                        getxml("");//""
                    }
                }
            };
            oXmlHttp.send(null);
        }
    }
    catch(e){}
    window.setTimeout("gettime()",2000);
    //window.setTimeout("gettime()",3000);
}

function getxml(ii) {
    oXmlHttp.open("get", "vbsxml/change" + ii + ".xml?r=007" + Date.parse(new Date()), true);
    oXmlHttp.onreadystatechange = refresh;
    oXmlHttp.send(null);
}
function refresh() {
    try {
        if (oXmlHttp.readyState != 4 || (oXmlHttp.status != 200 && oXmlHttp.status != 0)) return;
        var root = oXmlHttp.responseXML.documentElement;
        if (root.attributes[0].value != "0") {
            window.setTimeout("LoadLiveFile()", Math.floor(20000 * Math.random()));
            return;
        }

        var D = new Array();
        var matchindex, score1change, score2change, scorechange;
        var goTime, hometeam, guestteam, sclassname, score1, score2, tr;
        var matchNum = 0;
        var winStr = "";
        var notify = "";
        var obj = document.getElementById("ifShow"); //判断是否有显示SB详情赔率浮动窗口
        for (var i = 0; i < root.childNodes.length; i++) {
            if (document.all && parseInt(ieNum) < 10)
                D = root.childNodes[i].text.split("^"); //0:ID,1:state,2:score1,3:score2,4:half1,5:half2,6:card1,7:card2,8:time1,9:time2,10:explain,11:lineup
            else
                D = root.childNodes[i].textContent.split("^");

            tr = document.getElementById("tr1_" + D[0]);
            if (tr == null) continue;

            matchindex = tr.attributes["index"].value;
            score1change = false;
            if (A[matchindex][14] != D[2]) {
                A[matchindex][14] = D[2];
                score1change = true;
                tr.cells[4].style.backgroundColor = "#bbbb22";
            }
            score2change = false;
            if (A[matchindex][15] != D[3]) {
                A[matchindex][15] = D[3];
                score2change = true;
                tr.cells[6].style.backgroundColor = "#bbbb22";
            }
            scorechange = score1change || score2change;

            if (A[matchindex][48] != D[16]) {
                A[matchindex][48] = D[16];
            }
            if (A[matchindex][49] != D[17]) {
                A[matchindex][49] = D[17];
            }
            A[matchindex][50] = D[18];
            //附加说明改时变了'
            if (A[matchindex][30] != D[10] || A[matchindex][42] != D[15]) {
                A[matchindex][30] = D[10];
                A[matchindex][42] = D[15];
                var ex = showExplain(D[15], getTeamName(matchindex, 1, 3, 1), getTeamName(matchindex, 2, 3, 1)) + D[10];
                document.getElementById("other_" + D[0]).innerHTML = ex;
                if (D[10] + D[15] == "")
                    document.getElementById("tr2_" + D[0]).style.display = "none";
                else
                    document.getElementById("tr2_" + D[0]).style.display = "";
            }

            if (Config.redcard == 1 && (D[6] != A[matchindex][18] || D[7] != A[matchindex][19]) && tr.style.display != "none" && D[1] != "-1") {//完场后红牌不弹窗
                hometeam = getTeamName(matchindex, 1, 3, 1).replace("<font color=#880000>(中)</font>", " 中").substring(0, 7);
                guestteam = getTeamName(matchindex, 2, 3, 1).substring(0, 7);
                sclassname = A[matchindex][2 + lang];
                if (D[6] != A[matchindex][18]) {
                    hometeam = "<font color=red>" + hometeam + "</font>";
                }
                if (D[7] != A[matchindex][19]) {
                    guestteam = "<font color=red>" + guestteam + "</font>";
                }
                winStr += "<tr bgcolor=#ffffff height=34 align=center class=line><td><font color=red>红牌</font></td><td> " + tr.cells[3].innerHTML + "</td><td><b>" + hometeam + "</b> " + (D[6] == "0" ? "" : "<img src=http://live3.win007.com/bf_img/redcard" + D[6] + ".gif border='0'>") + "</td><td  colspan=2> vs</td><td><b>" + guestteam + "</b> " + (D[7] == "0" ? "" : "<img src=http://live3.win007.com/bf_img/redcard" + D[7] + ".gif border='0'>") + "</td></tr>";
                matchNum = matchNum + 1;
            } //redcardChange

            //红牌变化了
            if (D[6] != A[matchindex][18]) {
                A[matchindex][18] = D[6];
                if (D[6] == "0")
                    document.getElementById("redcard1_" + D[0]).innerHTML = "";
                else
                    document.getElementById("redcard1_" + D[0]).innerHTML = "<img src=http://live3.win007.com/bf_img/redcard" + D[6] + ".gif border='0'> ";
                if (Config.redcard) {
                    tr.cells[4].style.backgroundColor = "#ff8888";
                    window.setTimeout("timecolors(" + D[0] + "," + matchindex + ")", 12000);
                }
            }
            if (D[7] != A[matchindex][19]) {
                A[matchindex][19] = D[7];
                if (D[7] == "0")
                    document.getElementById("redcard2_" + D[0]).innerHTML = "";
                else
                    document.getElementById("redcard2_" + D[0]).innerHTML = "<img src=http://live3.win007.com/bf_img/redcard" + D[7] + ".gif border='0'> ";
                if (Config.redcard) {
                    tr.cells[6].style.backgroundColor = "#ff8888";
                    window.setTimeout("timecolors(" + D[0] + "," + matchindex + ")", 12000);
                }
            }

            //黄牌变化了
            if (D[12] != A[matchindex][20] && Config.showYellowCard == 1) {
                A[matchindex][20] = D[12];
                if (D[12] == "0")
                    document.getElementById("yellow1_" + D[0]).innerHTML = "";
                else
                    document.getElementById("yellow1_" + D[0]).innerHTML = "<img src=http://live3.win007.com/bf_img/yellow" + D[12] + ".gif border='0'> ";
            }
            if (D[13] != A[matchindex][21] && Config.showYellowCard == 1) {
                A[matchindex][21] = D[13];
                if (D[13] == "0")
                    document.getElementById("yellow2_" + D[0]).innerHTML = "";
                else
                    document.getElementById("yellow2_" + D[0]).innerHTML = "<img src=http://live3.win007.com/bf_img/yellow" + D[13] + ".gif border='0'> ";
            }

            //开赛
            if (A[matchindex][11] != D[8]) {
                var oldPos = matchindex;
                var TTime = new Date();
                var timeStr = AmountTimeDiff(D[8], A[matchindex][36], A[matchindex][43], 1);
                var dataStr = timeStr.split(" ");
                tr.cells[2].innerHTML = dataStr[1];
                var nt = D[8].split(":");
                var nd = D[14].split("-");
                var nt2 = new Date(TTime.getYear(), nd[0], nd[1], nt[0], nt[1], 0);
                if (concernId.indexOf("_" + A[matchindex][0] + "_") == -1) {
                    for (var i = 1; i <= matchcount; i++) {
                        if (concernId.indexOf("_" + A[i][0] + "_") == -1) {
                            var ot = A[i][11].split(":");
                            var od = A[i][36].split("-");
                            var ot2 = new Date(TTime.getYear(), od[0], od[1], ot[0], ot[1], 0);
                            if (D[1] != -1) {
                                if (ot2 > nt2) {
                                    MovePlace(A[i][0], D[0]);
                                    break;
                                }
                            }
                        }
                    }
                }
                else {
                    for (var i = 1; i <= matchcount; i++) {
                        if (concernId.indexOf("_" + A[i][0] + "_") != -1) {
                            var ot = A[i][11].split(":");
                            var od = A[i][36].split("-");
                            var ot2 = new Date(TTime.getYear(), od[0], od[1], ot[0], ot[1], 0);
                            if (D[1] != -1) {
                                if (ot2 > nt2) {
                                    MovePlace(A[i][0], D[0]);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            A[matchindex][11] = D[8];
            A[matchindex][12] = D[9];

            //半场比分
            A[matchindex][16] = D[4];
            A[matchindex][17] = D[5];

            //状态
            if (A[matchindex][13] != D[1]) {
                if (A[matchindex][13] == "-11" || A[matchindex][13] == "-14" || A[matchindex][13] == "-13") {
                    if (D[1] == "1") {
                        var oldPos = matchindex;
                        var TTime = new Date();
                        var nt = D[8].split(":");
                        var nd = D[14].split("-");
                        var nt2 = new Date(TTime.getYear(), nd[0], nd[1], nt[0], nt[1], 0);
                        if (concernId.indexOf("_" + A[matchindex][0] + "_") == -1) {
                            for (var i = 1; i <= matchcount; i++) {
                                if (concernId.indexOf("_" + A[i][0] + "_") == -1) {
                                    var ot = A[i][11].split(":");
                                    var od = A[i][36].split("-");
                                    var ot2 = new Date(TTime.getYear(), od[0], od[1], ot[0], ot[1], 0);
                                    if (D[1] != -1) {
                                        if (ot2 > nt2) {
                                            MovePlace(A[i][0], D[0]);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            for (var i = 1; i <= matchcount; i++) {
                                if (concernId.indexOf("_" + A[i][0] + "_") != -1) {
                                    var ot = A[i][11].split(":");
                                    var od = A[i][36].split("-");
                                    var ot2 = new Date(TTime.getYear(), od[0], od[1], ot[0], ot[1], 0);
                                    if (D[1] != -1) {
                                        if (ot2 > nt2) {
                                            MovePlace(A[i][0], D[0]);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                A[matchindex][13] = D[1];
                switch (A[matchindex][13]) {
                    case "0":
                        tr.cells[3].innerHTML = "";
                        break;
                    case "1":
                        var t = A[matchindex][12].split(",");
                        var t2 = new Date(t[0], t[1], t[2], t[3], t[4], t[5]);
                        goTime = Math.floor((new Date() - t2 - difftime) / 60000);
                        if (goTime > 45) goTime = "45+"
                        if (goTime < 1) goTime = "1";
                        tr.cells[3].innerHTML = goTime + "<img src='http://live3.win007.com/bf_img/in.gif'>";
                        break;
                    case "2":
                    case "4":
                        tr.cells[3].innerHTML = state_ch[parseInt(D[1]) + 14].split(",")[lang];
                        break;
                    case "3":
                        var t = A[matchindex][12].split(",");
                        var t2 = new Date(t[0], t[1], t[2], t[3], t[4], t[5]);
                        goTime = Math.floor((new Date() - t2 - difftime) / 60000) + 46;
                        if (goTime > 90) goTime = "90+";
                        if (goTime < 46) goTime = "46";
                        tr.cells[3].innerHTML = goTime + "<img src='http://live3.win007.com/bf_img/in.gif'>";
                        break;
                    case "-1":
                        tr.cells[3].innerHTML = state_ch[parseInt(D[1]) + 14].split(",")[lang];
                        tr.cells[5].style.color = "red";
                        window.setTimeout("MoveToBottom(" + D[0] + ")", 25000);
                        break;
                    default:
                        tr.cells[3].innerHTML = state_ch[parseInt(D[1]) + 14].split(",")[lang];
                        MoveToBottom(D[0]);
                        break;
                }
            }

            var spans = tr.cells[7].getElementsByTagName("span")
            if (spans.length > 1)
                spans[0].style.display = (A[matchindex][50] == "1" ? "" : "none");
            //score
            switch (A[matchindex][13]) {
                case "0":
                    if (D[11] == "1")
                        tr.cells[5].innerHTML = "阵容";
                    else
                        tr.cells[5].innerHTML = "-";
                    break;
                case "1":
                    tr.cells[5].innerHTML = A[matchindex][14] + "-" + A[matchindex][15];
                    if (spans.length > 1) {
                        spans[0].innerHTML = A[matchindex][48] + "-" + A[matchindex][49];
                        spans[0].style.color = "blue";
                    }
                    break;
                case "-11":
                case "-14":
                    tr.cells[5].innerHTML = "-";
                    if (spans.length > 1) {
                        spans[0].innerHTML = "-";//角球
                        spans[1].innerHTML = "-";//半场比分
                    }
                    else
                        tr.cells[7].innerHTML = "-";
                    break;
                default:  //2 3 -1 -12 -13
                    tr.cells[5].innerHTML = A[matchindex][14] + "-" + A[matchindex][15];
                    if (spans.length > 1) {
                        spans[0].innerHTML = A[matchindex][48] + "-" + A[matchindex][49];
                        spans[1].innerHTML = A[matchindex][16] + "-" + A[matchindex][17];
                        if (A[matchindex][13] == -1)
                            spans[0].style.color = "black";
                        spans[1].style.color = "red";
                    }
                    else {
                        tr.cells[7].innerHTML = A[matchindex][16] + "-" + A[matchindex][17];
                        tr.cells[7].style.color = "red";
                    }
                    break;
            }
            if (obj != null && obj.value == "1") {
                var objScore = document.getElementById("ffScoreDetail");
                var sid = objScore.attributes["sid"].value;
                if (parseInt(sid) == parseInt(A[matchindex][0])) {
                    if (parseInt(A[matchindex][13]) == -1)
                        objScore.innerHTML = "<b><font style='color:red;'>" + A[matchindex][14] + " - " + A[matchindex][15] + "</font></b>";
                    else
                        objScore.innerHTML = "<b><font style='color:blue;'>" + A[matchindex][14] + " - " + A[matchindex][15] + "</font></b>";
                }
            }
            if (scorechange) {
                //ShowFlash(D[0],matchindex);
                if (tr.style.display != "none") {
                    hometeam = getTeamName(matchindex, 1, 3, 1).replace("<font color=#880000>(中)</font>", " 中").substring(0, 7);
                    guestteam = getTeamName(matchindex, 2, 3, 1).substring(0, 7);
                    sclassname = A[matchindex][2 + lang];
                    if (score1change) {
                        hometeam = "<font color=red>" + hometeam + "</font>";
                        score1 = "<font color=red>" + D[2] + "</font>";
                        score2 = "<font color=blue>" + D[3] + "</font>";
                        ShowFlash(D[0], matchindex, 1);
                    }
                    if (score2change) {
                        guestteam = "<font color=red>" + guestteam + "</font>";
                        score1 = "<font color=blue>" + D[2] + "</font>";
                        score2 = "<font color=red>" + D[3] + "</font>";
                        ShowFlash(D[0], matchindex, 2);
                    }
                    notify += sclassname + ":" + hometeam + " <font color=blue>" + score1 + "-" + score2 + "</font> " + guestteam + " &nbsp; ";

                    if (Config.winLocation > -1 && parseInt(D[1]) >= -1) {
                        if (matchNum % 2 == 0)
                            winStr += "<tr bgcolor=#ffffff height=34 align=center class=line><td><font color=#1705B1>" + sclassname + "</font></td><td> " + tr.cells[3].innerHTML + "</td><td><b>" + hometeam + "</b></td><td width=11% style='font-size: 18px;font-family:Verdana;font-weight:bold;'>" + score1 + "-" + score2 + "</td><td>" + Goal2GoalCn(A[matchindex][29]) + "</td><td><b>" + guestteam + "</b></td></tr>";
                        else
                            winStr += "<tr bgcolor=#FDF1E7 height=34 align=center class=line><td><font color=#1705B1>" + sclassname + "</font></td><td> " + tr.cells[3].innerHTML + "</td><td><b>" + hometeam + "</b></td><td width=11% style='font-size: 18px;font-family:Verdana;font-weight:bold;'>" + score1 + "-" + score2 + "</td><td>" + Goal2GoalCn(A[matchindex][29]) + "</td><td><b>" + guestteam + "</b></td></tr>";
                        matchNum = matchNum + 1
                    }
                }
            } //scorechange
        }
        if (matchNum > 0) ShowCHWindow(winStr, matchNum);
        var objNotify = document.getElementById("notify");
        if (notify != "") {
            if (delHtmlTag(objNotify.innerHTML) == delHtmlTag(notifyAD))
                objNotify.innerHTML = notify;
            else
                objNotify.innerHTML += notify;
            notifyTimer = window.setTimeout("clearNotify('" + notify + "')", 20000);
        }
        else if (objNotify.innerHTML == "")
            objNotify.innerHTML = notifyAD;

    } catch (e) { }
}
function delHtmlTag(str) {
    return str.replace(/<[^>]+>/g, ""); //去掉所有的html标记
}
function getElementPos(elementId) {
    var ua = navigator.userAgent.toLowerCase();
    var isOpera = (ua.indexOf('opera') != -1);
    var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
    var el = document.getElementById(elementId);
    if (el.parentNode === null || el.style.display == 'none') {
        return false;
    }
    var parent = null;
    var pos = [];
    var box;
    if (el.getBoundingClientRect)    //IE
    {
        box = el.getBoundingClientRect();
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        return { x: box.left + scrollLeft, y: box.top + scrollTop };
    } else if (document.getBoxObjectFor)    // gecko
    {
        box = document.getBoxObjectFor(el);
        var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
        var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
        pos = [box.x - borderLeft, box.y - borderTop];
    } else    // safari & opera
    {
        pos = [el.offsetLeft, el.offsetTop];
        parent = el.offsetParent;
        if (parent != el) {
            while (parent) {
                pos[0] += parent.offsetLeft;
                pos[1] += parent.offsetTop;
                parent = parent.offsetParent;
            }
        }
        if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {
            pos[0] -= document.body.offsetLeft;
            pos[1] -= document.body.offsetTop;
        }
    }
    if (el.parentNode) {
        parent = el.parentNode;
    } else {
        parent = null;
    }
    while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled ancestors
        pos[0] -= parent.scrollLeft;
        pos[1] -= parent.scrollTop;
        if (parent.parentNode) {
            parent = parent.parentNode;
        } else {
            parent = null;
        }
    }
    return { x: pos[0], y: pos[1] };
}
function GetBrowserVersion() {
    var ua = navigator.userAgent.toLowerCase();
    var num="";
    window.ActiveXObject ? num = ua.match(/msie ([\d.]+)/)[1] : '';
    return num;
}
//时区--------------------------------------------------------------
function SelectTimeZone(Page)
{
    document.getElementById("TimeZoneList").innerHTML = '<iframe src="' + Page + '" frameborder="0" width="660" height="455" scrolling="no"></iframe>';
    with(document.getElementById("TimeZoneList_div").style)
    {
        left = (window.screen.width-parseInt(width))/2+"px";
        top = (window.screen.height-parseInt(height))/2+"px";
        display = "";
    }
}

function GetCurrentTimeZone()
{
    var now = new Date();
    var tz = 0 - now.getTimezoneOffset() / 60;//本地时区小时数
    var mtz = Math.floor(tz);
    var stz = (tz - mtz) * 60;
    var tzstr = "";
    if (tz >= 0)
        tzstr = "+";
    else
        tzstr = "-";
    if (mtz == 0)
        tzstr += "0";
    if ((tz > 0 && mtz < 10) || (tz < 0 && mtz > -10))
        tzstr += "0";
    tzstr += Math.abs(mtz).toString() + Math.abs(stz).toString();
    if (stz == 0)
        tzstr += "0";
    return tzstr;
}

function CloseTimeZoneList()
{
    document.getElementById("TimeZoneList_div").style.display = 'none';
}

var difference_Hour = 0;
var difference_Minute = 0;
var timezone_TZ = "";

function GetTimeZone(lg, DefaultTZ)	//获取时区设置
{
    if (typeof(DefaultTZ) == "undefined")
        DefaultTZ = GetCurrentTimeZone();	//默认时区

    var STZ_Hour = 8;
    var DST = false;
    var rlt = "";
    if (document.cookie.indexOf("bet007TZbegin") != -1 && document.cookie.indexOf("bet007TZend") != -1)
        timezone_TZ = document.cookie.substring(document.cookie.indexOf("bet007TZbegin") + 14, document.cookie.indexOf("bet007TZend")).toUpperCase();
    if (document.cookie.indexOf("bet007DSTbegin") != -1 && document.cookie.indexOf("bet007DSTend") != -1)
        DST = (document.cookie.substring(document.cookie.indexOf("bet007DSTbegin") + 15, document.cookie.indexOf("bet007DSTend")) == "1") ? true : false;

    if (timezone_TZ == "")
        timezone_TZ = DefaultTZ;

    if (timezone_TZ != "AUTO")
    {
        rlt = 'GMT' + timezone_TZ;
        var TZ_Hour = parseFloat(timezone_TZ.substring(0, 3));
        var TZ_Minute = parseFloat(timezone_TZ.substring(3, 5));
        difference_Minute = TZ_Minute;
        if (TZ_Hour < 0)
        {
            difference_Hour = 0 - (STZ_Hour - TZ_Hour);
            difference_Minute = 0 - difference_Minute;
        }
        else
        {
            difference_Hour = TZ_Hour - STZ_Hour;
        }
    }
    else if (timezone_TZ == "AUTO")
    {
        DST = false;          //自动状况去掉夏令时cookie
        if (lg == 0)
            rlt = "自動";
        else if (lg == 1)
            rlt = "自动";
        else if (lg == 2)
            rlt = "Auto";
        else if (lg == 3)
            rlt = "Tự động";
        else if (lg == 4)
            rlt = "อัตโนมัติ";
        else if (lg == 5)
            rlt = "자동";
        var LTimeZone = new Date().getTimezoneOffset() / 60;
        STZ_Hour = 0 - STZ_Hour;
        if (LTimeZone < 0)
        {
            difference_Hour = STZ_Hour - LTimeZone;
        }
        else
        {
            difference_Hour = 0 - (LTimeZone - STZ_Hour);
            difference_Minute = 0 - difference_Minute;
        }
    }
    if (DST)	//Daylight Saving Time夏令时
    {
        difference_Hour += 1;
        if (lg == 0)
            rlt += "(夏令時)";
        else if (lg == 1)
            rlt += "(夏令时)";
        else if (lg == 2)
            rlt += "(DST)";
        else if (lg == 3)
            rlt += "(Giờ mùa)";
        else if (lg == 4)
            rlt += "(DST)";
        else if (lg == 5)
            rlt += "(서머타임)";
    }
    return rlt;
}

function TimeZone_formatNumber(s)
{
    if (s < 10)
        return "0" + s;
    return s;
}

function AmountTimeDiff(dateStr, dateStr2, yearStr, rtvFormat) {
    var date_sl = dateStr.split(":");
    var date_sl2 = dateStr2.split("-");
    var d1 = new Date(parseFloat(yearStr), parseFloat(date_sl2[0]) - 1, parseFloat(date_sl2[1]), parseFloat(date_sl[0]) + difference_Hour, parseFloat(date_sl[1]) + difference_Minute, 0, 0);
    var year = d1.getFullYear();
    var month = TimeZone_formatNumber(d1.getMonth() + 1);
    var day = TimeZone_formatNumber(d1.getDate());
    var hour = TimeZone_formatNumber(d1.getHours());
    var minute = TimeZone_formatNumber(d1.getMinutes());
    var second = TimeZone_formatNumber(d1.getSeconds());
    switch (rtvFormat) {
        case 0:
            return year + "," + month + "," + day + "," + hour + "," + minute + "," + second;
        case 1:
            return month + "月" + day + "日 " + hour + ":" + minute;
        case 2:
            return month + "-" + day + "-" + year + " " + hour + ":" + minute + ":" + second;
    }
}

function setGoalShow(t, obj) {
    if (t == 1)
        Config.haveLetGoal = (obj.checked ? 1 : 0);
    else if (t == 2)
        Config.haveTotal = (obj.checked ? 1 : 0);
    else
        Config.haveEurope = (obj.checked ? 1 : 0);
    Config.writeCookie();
    MakeTable();
    showodds();
}