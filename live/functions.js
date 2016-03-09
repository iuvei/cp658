//=====================================================================================================================================
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
//=====================================================================================================================================
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



function showgoallist(ID) {
    var theUrl;
    try {
        if (Config.language == 0)
            theUrl = "http://live1.win007.com/detail/" + ID + "cn.htm";
        else
            theUrl = "http://live1.win007.com/detail/" + ID + ".htm";
    }
    catch (e) {
        if (location.href.split('_').length == 2)
            theUrl = "http://live1.win007.com/detail/" + ID + "cn.htm";
        else
            theUrl = "http://live1.win007.com/detail/" + ID + ".htm";
    }
    window.open(theUrl, "", "");
}

function analysis(ID) {
    var theURL;
    try {
        if (Config.language == 0)
            theURL = "http://zq.win007.com/analysis/" + ID + "cn.htm";
        else if (Config.language == 1)
            theURL = "http://zq.win007.com/analysis/" + ID + ".htm";
        else
            theURL = "http://zq.win007.com/analysis/" + ID + "sb.htm";
    }
    catch (e) {
        if (location.href.split('_').length == 2)
            theURL = "http://zq.win007.com/analysis/" + ID + "cn.htm";
        else
            theURL = "http://zq.win007.com/analysis/" + ID + ".htm";
    }
    window.open(theURL);
}

function AsianOdds(ID)
{
    var theURL="http://vip.win007.com/AsianOdds_n.aspx?id="  +ID;
    window.open(theURL);
}

function TotalOdds(ID)
{
    var theURL="http://vip.win007.com/OverDown_n.aspx?id="  +ID;
    window.open(theURL);
}

function EuropeOdds(ID)
{
    var theURL="http://op.win007.com/oddslist/" + ID + ".htm";
    window.open(theURL);
}

function advices(ID)
{
    var theURL = "http://news.win007.com/qingbao/football_" + ID+".html";
    window.open(theURL);
}

function TeamPanlu_10(ID)
{
    var	theURL="http://bf.win007.com/panlu/" + ID + ".htm";
    window.open(theURL,"","width=640,height=700,top=10,left=100,resizable=yes,scrollbars=yes");
}

function showdetail(obj, event,cId) {
    if (Config.detail == 0) return;  // || A[n][13]=="0"
    var n = obj.attributes["aLoc"].value;
    var homeTeam = getTeamName(n, 1, cId, 1);
    var guestTeam = getTeamName(n, 2, cId, 1);
    try {
        if (Math.floor((new Date() - loadDetailFileTime) / 600) > 60) LoadDetailFile();
        var R = new Array();
        var temp = "";
        var hasChange = false;
        for (var i = 0; i < rq.length; i++) {
            R = rq[i].split('^');
            if (R[0] != A[n][0]) continue;
            if (!hasChange && R[2] == '11') hasChange = true;
            var showDetailName = R[2] == '11' && R[6] != '' ? R[6].replace('↑', '<img src="/images/up.gif" align="absmiddle">').replace('↓', '<img src="/images/down.gif" align="absmiddle">') : R[6] != '' ? R[6] : R[4];
            if (R[1] == "1")
                temp += "<tr bgcolor=white align=center><td width=6% height=18><img src='bf_img/" + R[2] + ".gif'></td><td width=38%>" + showDetailName + "</td><td width=12% bgcolor=#EFF4EA>" + R[3] + "'</td><td width=38%></td><td width=6%></td></tr>";
            else
                temp += "<tr bgcolor=white align=center><td width=6% height=18></td><td width=38%></td><td width=12% bgcolor=#EFF4EA>" + R[3] + "'</td><td width=38%>" + showDetailName + "</td><td width=6%><img src='bf_img/" + R[2] + ".gif'></td></tr>";
        }
        var html = "<table width=" + (hasChange ? "560" : "350") + " bgcolor=#E1E1E1 cellpadding=0 cellspacing=1 border=0>";
        html += "<tr><td height=20 colspan=5 bgcolor=#666699 align=center><font color=white><b>初盘参考：" + Goal2GoalCn(A[n][29]) + "</b></font></td></tr>";
        html += "<tr bgcolor=#D5F2B7 align=center><td height=20 colspan=2 width=44%><font color=#006600><b>" + (A[n][22] != "" ? "[" : "") + A[n][22] + (A[n][22] != "" ? "]" : "") + homeTeam + "</b></font></td><td width=12% bgcolor=#CCE8B5>时间</td><td colspan=2 width=44%><font color=#006600><b>" + (A[n][23] != "" ? "[" : "") + A[n][23] + (A[n][23] != "" ? "]" : "") + guestTeam + "</b></font></td></tr>";
        html += temp;
        html += "</table>";
        var technicCount = ""; //技术统计
        for (var i = 0; i < tc.length; i++) {
            R = tc[i].split('^');
            if (R[0] == A[n][0]) {
                technicCount = R[1];
                break;
            }
        }
        var bgcolor1 = "#FFFFFF";
        var bgcolor2 = "#F0F0FF";
        var regex = new RegExp("\\*" ,"g");
        var arrTc = technicCount.replace(regex, "<img src=bf_img/55.gif width=11 height=11>").split(';');
        if (technicCount != '') {
            html += "<table width=" + (hasChange ? "560" : "350") + " bgcolor=#E1E1E1 cellpadding=0 cellspacing=1 border=0>";
            html += "<tr bgcolor=#D5F2B7 align=center><td height=20 colspan=3 width=44%><font color=#006600><b>技术统计</b></font></td></tr>";
        }
        for (var j = 0; j < arrTc.length; j++) {
            if (arrTc[j] == '' || parseInt(arrTc[j].split(',')[0]) > 43) continue;
            html += "<tr class=font12 height=16 bgcolor=" + bgcolor1 + " align=center>";
            html += "<td width='25%'>" + arrTc[j].split(',')[1] + "</td>";
            html += "<td bgcolor=" + bgcolor2 + ">" + resultName[parseInt(arrTc[j].split(',')[0])] + "</td>";
            html += "<td width='25%'>" + arrTc[j].split(',')[2] + "</td></tr>";
        }
        if (j > 0)
            html += "</table>";
        var obj = document.getElementById('winScore');
        if (location.href.indexOf("old") != -1) {
            var num = hasChange ? 275 : 175;
            obj.style.left = (document.body.clientWidth / 2 - num) + "px";
        }
        else {
            var num = hasChange ? 315 : 235;
            obj.style.left = (document.body.clientWidth / 2 - num) + "px"; //-175
        }
        var scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        obj.style.top = (scrollTop + event.clientY + 15) + "px";
        obj.innerHTML = html;
        obj.style.display = "";
    } catch (e) { }
}

function hiddendetail() {
    document.getElementById("winScore").style.display = "none";
    document.getElementById("winScore").innerHTML = "";

}


