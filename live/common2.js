var scoreClienty = 0; //积分榜的y坐标
var scoreSIndex = 0; //当前指向的赛程在数组A中的位置
var hsLetGoal = new Hashtable(); //让球盘口哈希表 key:盘口,value:位置列表("0,3,5....")
var hsBigSmallGoal = new Hashtable(); //大小盘口哈希表
var hsLetGoalNum = new Hashtable();
var hsBigSmallGoalNum = new Hashtable();
var oldLetBig = 0; //判断让球 大小是否有切换
var loadSbDetailTime = new Date();
var loadSbCornerTime = new Date();
var sbOddsChangeHttp = zXmlHttp.createRequest();
var sbCornerChangeHttp = zXmlHttp.createRequest();
var old = "", oldHalf = "",oldCorner="";
function ShowBf() {
    /*
    if (Config.language == 0 || Config.language == 2)
        lang = 0;
    else
        lang = 1;
    loaded = 0;
    hiddenID = getCookie("Bet007live_hiddenID");
    if (hiddenID == null) hiddenID = "_";
    concernId = getCookie("Bet007live_concernId");
    if (concernId == null)
        concernId = "_";
    else
        SortData();
//    macName = new Array(matchcount);
//    getAllMacName();
    //getOddsData();
    MakeTable();
    window.clearTimeout(runtimeTimer);
    runtimeTimer = window.setTimeout("setMatchTime()", 30000);

    if (Config.style != 0) SetBgColor(Config.style);
    document.getElementById("loading").style.display = "none";
    */
}

function getOddsData() {
    /*
    //oddsHttp.open("get", "vbsxml/goalin.xml?" + Date.parse(new Date()), false);
    oddsHttp.open("get", "vbsxml/goalBf3.xml?r=007" + Date.parse(new Date()), false);
    oddsHttp.send(null);
    var root = oddsHttp.responseXML.documentElement.childNodes[0];
    var D = new Array();
    var odds, old = new Array();
    var needSound = false;
    for (var i = 0; i < root.childNodes.length; i++) {
        if (document.all && parseInt(ieNum) < 10)
            odds = root.childNodes[i].text; //id,oddsid,goal,home,away,zoudi,isStopLive
        else
            odds = root.childNodes[i].textContent;
        D = odds.split(",");
        if (D[1] != "")
            hsLetGoalList.add(D[0], D[2] + "," + D[3] + "," + D[4] + "," + D[5] + "," + D[6])
    }
    window.clearTimeout(getoddsxmlTimer);
    getoddsxmlTimer = window.setTimeout("getoddsxml()", 4000);
    window.setTimeout("getsbxml()", 4000);
    window.setTimeout("getSbCornerXml()", 4000);
    */
}
function setGoalShow(t, obj) {
    if (t == 1)
        Config.haveLetGoal = (obj.checked ? 1 : 0);
    else if (t == 2)
        Config.haveTotal = (obj.checked ? 1 : 0);
    else
        Config.haveEurope = (obj.checked ? 1 : 0);
    Config.writeCookie();
    getOddsData();
    showodds();
}
function showodds() {
    try {
        var oldTO;
        var j = 0;
        var root = oddsHttp.responseXML.documentElement.childNodes[0];
        var D = new Array();
        var odds, old = new Array();
        var needSound = false;
        for (var i = 0; i < root.childNodes.length; i++) {
            if (document.all && parseInt(ieNum) < 10)
                odds = root.childNodes[i].text; //id,oddsid,goal,home,away,zoudi,isStopLive
            else
                odds = root.childNodes[i].textContent;
            D = odds.split(",");
            tr = document.getElementById("tr1_" + D[0]);
            if (tr == null) continue;
            var matchindex = tr.attributes["index"].value;
            old = tr.attributes["odds"].value.split(",");
            if (old.length == 17 && old != odds) {
                for (var j = 3; j < 13; j++) {
                    if (old[j] != "" && D[j] != "") {
                        if (D[j] > old[j]) D[j] = "<span class=up>" + D[j] + "</span>";
                        else if (D[j] < old[j]) D[j] = "<span class=down>" + D[j] + "</span>";
                    }
                    if (j == 4) j++;
                    if (j == 8) j = j + 2;
                }

                window.setTimeout("restoreOddsColor(" + D[0] + ")", 30000);
                if (Config.oddsSound == 1) {
                    if (tr.style.display != "none")
                        needSound = true;
                }
            }
            if (old.length == 17 && old != odds && old[2] != "") {
                if (D[2] > old[2]) D[2] = "<span class=up>" + Goal2GoalCn(D[2]).replace("受", "<font color='red'>*</font>") + "</span>";
                else if (D[2] < old[2]) D[2] = "<span class=down>" + Goal2GoalCn(D[2]).replace("受", "<font color='red'>*</font>") + "</span>";
                else D[2] = Goal2GoalCn(D[2]).replace("受", "<font color='red'>*</font>");
            }
            else D[2] = Goal2GoalCn(D[2]).replace("受", "<font color='red'>*</font>");
            if (old.length == 17 && old != odds && old[10] != "") {
                if (D[10] > old[10]) D[10] = "<span class=up>" + Goal2GoalCn2(D[10]) + "</span>";
                else if (D[10] < old[10]) D[10] = "<span class=down>" + Goal2GoalCn2(D[10]) + "</span>";
                else D[10] = Goal2GoalCn2(D[10]);
            }
            else D[10] = Goal2GoalCn2(D[10]);
            var tmp = "";
            if (Config.haveLetGoal == 1)
                tmp = "<div class=odds" + (D[13] == "2" ? 4 : 1) + ">" + (D[14] == "0" ? D[3] : "&nbsp;") + "</div>";
            if (Config.haveTotal == 1)
                tmp += "<div class=odds" + (D[13] == "2" ? 4 : 2) + ">" + (D[16] == "0" ? D[11] : "&nbsp;") + "</div>";
            if (Config.haveEurope == 1)
                tmp += "<div class=odds" + (D[13] == "2" ? 4 : 3) + ">" + (D[15] == "0" ? D[6] : "&nbsp;") + "</div>";
            tr.cells[8].innerHTML = tmp;
            tmp = "";
            if (Config.haveLetGoal == 1)
                tmp = "<div class=odds" + (D[13] == "2" ? 4 : 1) + ">" + (D[14] == "0" ? D[2] : "封") + "</div>";
            if (Config.haveTotal == 1)
                tmp += "<div class=odds" + (D[13] == "2" ? 4 : 2) + ">" + (D[16] == "0" ? D[10] : "封") + "</div>";
            if (Config.haveEurope == 1)
                tmp += "<div class=odds" + (D[13] == "2" ? 4 : 3) + ">" + (D[15] == "0" ? D[7] : "封") + "</div>";
            tr.cells[9].innerHTML = tmp;

            tmp = "";
            if (Config.haveLetGoal == 1)
                tmp = "<div class=odds" + (D[13] == "2" ? 4 : 1) + ">" + (D[14] == "0" ? D[4] : "&nbsp;") + "</div>";
            if (Config.haveTotal == 1)
                tmp += "<div class=odds" + (D[13] == "2" ? 4 : 2) + ">" + (D[16] == "0" ? D[12] : "&nbsp;") + "</div>";
            if (Config.haveEurope == 1)
                tmp += "<div class=odds" + (D[13] == "2" ? 4 : 3) + ">" + (D[15] == "0" ? D[8] : "&nbsp;") + "</div>";
            tr.cells[10].innerHTML = tmp;
            tmp = "";
            if (D[13] == "1") tmp = "<img src='http://live3.win007.com/image/zd.gif' height=10 width=10 title='" + (Config.language == 0 ? "有走地赛事" : "有走地賽事") + "'>";
            if (D[13] == "2") tmp = "<img src='http://live3.win007.com/image/zd2.gif' height=10 width=10 title='正在走地'>";
            tr.cells[11].innerHTML = tmp;
            tr.attributes["odds"].value = odds;
        }
        if (needSound) ShowOddsSound();
    } catch (e) { }
}
function makeGoalTable(t) {
    document.getElementById("selectGoals_div").style.display = "";
    if (t != oldLetBig)
        ShowAllMatch();
    var arrKey = (t == 0 ? hsLetGoal.keys() : hsBigSmallGoal.keys());
    var numObj = (t == 0 ? hsLetGoalNum : hsBigSmallGoalNum); //用来判断此盘口是否选中
    arrKey.sort();
    var str = '<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0">';
    var sC = (Config.language == 1 ? "沒開盤" : "没开盘");
    for (var i = 0; i < arrKey.length; i++) {
        var strGoal = (t == 0 ? Goal2GoalCn(arrKey[i]).replace("受", "<font color='red'>*</font>") : Goal2GoalCn2(arrKey[i]));
        var count = (t == 0 ? hsLetGoal.items(arrKey[i]).split(',').length : hsBigSmallGoal.items(arrKey[i]).split(',').length);
        str += '<tr>';
        str += '<td width="7%"><input type="checkbox" name="checkbox"' + (numObj.contains(arrKey[i]) ? 'checked="checked"' : '') + ' id="checkbox" value="' + arrKey[i] + '" onclick="hiddenGoalData(' + i + ',0)" /></td>';
        str += '<td width="27%">' + (arrKey[i] == sC ? sC : strGoal) + '<span class="smallf">[' + count + ']</span></td>';
        str += '<td width="18%">' + (arrKey[i] != sC ? '<a href="http://vip.win007.com/history/SearchSameGoal' + (Config.language == 1 ? "_big" : "") + '.aspx?g=' + arrKey[i] + '&n=5&t=' + (t == 0 ? 1 : 4) + '&l=' + (Config.language == 1 ? "1" : "0") + '" class="kl" target="_blank">' + (Config.language == 1 ? "同初盤" : "同初盘") + '</a>' : '') + '</td>';
        str += '<td width="18%">' + (arrKey[i] != sC ? '<a href="http://vip.win007.com/history/SearchSameGoal' + (Config.language == 1 ? "_big" : "") + '.aspx?g=' + arrKey[i] + '&n=5&t=' + (t == 0 ? 2 : 5) + '&l=' + (Config.language == 1 ? "1" : "0") + '" class="kl" target="_blank">' + (Config.language == 1 ? "同終盤" : "同终盘") + '</a>' : '') + '</td>';
        str += '<td width="30%">' + (arrKey[i] != sC ? '<a href="http://vip.win007.com/history/SearchSameGoal' + (Config.language == 1 ? "_big" : "") + '.aspx?g=' + arrKey[i] + '&n=5&t=' + (t == 0 ? 3 : 6) + '&l=' + (Config.language == 1 ? "1" : "0") + '" class="kl" target="_blank">' + (Config.language == 1 ? "初盤終盤相同" : "初盘终盘相同") + '</a>' : '') + '</td>';
        str += '</tr>';
    }
    str += '</table>';
    oldLetBig = t;
    document.getElementById("goalTable").innerHTML = str;
}
function hiddenGoalData(i, t1) {
    var t = 0;
    var hh = parseInt(document.getElementById("hiddencount").innerHTML);
    if (t1 == 2)
        hh = 0;
    if (document.getElementById("radioGoalType1").checked)
        t = 1;
    var arrKey = (t == 0 ? hsLetGoal.keys() : hsBigSmallGoal.keys());
    arrKey.sort();
    var key = "";
    if (i >= 0)
        key = arrKey[i];
    hiddenID = "_";
    var obj = document.getElementById("goalTable");
    var inputs = obj.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type != "checkbox") continue;
        if (t1 == 1) inputs[i].checked = true; //全选
        else if (t1 == 2) inputs[i].checked = !inputs[i].checked; //反选
        var value = inputs[i].value;
        if (key != '' && key != value) continue;
        var arrLoc = (t == 0 ? hsLetGoal.items(value).split(',') : hsBigSmallGoal.items(value).split(','));
        if (inputs[i].checked) {
            for (var j = 0; j < arrLoc.length; j++) {
                var k = arrLoc[j];
                document.getElementById("tr1_" + A[k][0]).style.display = "";
                if (A[k][42] + A[k][30] != "") document.getElementById("tr2_" + A[k][0]).style.display = "";
                hh--;
                hiddenID += A[k][0] + "_";
            }
        }
        else {
            for (var j = 0; j < arrLoc.length; j++) {
                var k = arrLoc[j];
                document.getElementById("tr1_" + A[k][0]).style.display = "none";
                if (A[k][42] + A[k][30] != "") document.getElementById("tr2_" + A[k][0]).style.display = "none";
                hh++;
            }
        }
    }
    if (t1 == 1)
        hh = 0;
    document.getElementById("hiddencount").innerHTML = hh;
    changeLeagueState();
    changeCountryState();
}
function changeGoalState() {
    var t = 0;
    if (document.getElementById("radioGoalType1").checked)
        t = 1;
    var arrKey = (t == 0 ? hsLetGoal.keys() : hsBigSmallGoal.keys());
    var obj = (t == 0 ? hsLetGoal : hsBigSmallGoal);
    var objNum =new Hashtable();
    for (var i = 0; i < arrKey.length; i++) {
        var arrLoc = obj.items(arrKey[i]).split(',');
        var num = 0;
        for (var j = 0; j < arrLoc.length; j++) {
            var k = arrLoc[j];
            if (hiddenID == "_" || hiddenID.indexOf("_" + A[k][0] + "_") != -1) num++;
        }
        if (num > 0)
            objNum.add(arrKey[i], num);
    }
    var obj = document.getElementById("goalTable");
    var inputs = obj.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type != "checkbox") continue;
        var value = inputs[i].value;
        if (objNum.contains(value))
            inputs[i].checked = true;
        else
            inputs[i].checked = false;
    }
    if (t == 0)
        hsLetGoalNum = objNum;
    else
        hsBigSmallGoalNum = objNum;
}
function LoadSbDetailFile() {
    var detail = document.getElementById("span_sbDetail");
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.charset = "utf-8";
    //s.src = "vbsxml/sbOddsData.js?r=007" + Date.parse(new Date());
    s.src = "";
    detail.removeChild(detail.firstChild);
    detail.appendChild(s, "script");
    loadSbDetailTime = new Date();
}
function LoadScoreFile(obj, event) {
    if (Config.showLeagueScore == 1) {
        scoreClienty = event.clientY;
        scoreSIndex = obj.attributes["aLoc"].value;
        var detail = document.getElementById("span_score");
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.charset = "utf-8";
        s.src = "http://info.win007.com/aspx/AjaxLeague.aspx?SclassID=" + A[scoreSIndex][45] + "&r=" + Date.parse(new Date());
        detail.removeChild(detail.firstChild);
        detail.appendChild(s, "script");
    }
}
function getsbxml() {
    try {
        var obj = document.getElementById("ifShow"); //判断是否有显示SB详情赔率浮动窗口
        if (obj.value == "0") {
            window.setTimeout("getsbxml()", 5000);
            return;
        }
        sbOddsChangeHttp.open("get", "vbsxml/ch_sbOdds.xml?r=007" + Date.parse(new Date()), true);
        sbOddsChangeHttp.onreadystatechange = sboddsrefresh;
        sbOddsChangeHttp.send(null);
    } catch (e) { }
    window.setTimeout("getsbxml()", 5000);
}
function sboddsrefresh() {
    if (sbOddsChangeHttp.readyState != 4 || (sbOddsChangeHttp.status != 200 && sbOddsChangeHttp.status != 0)) return;
    if (oldXML == sbOddsChangeHttp.responseText) return
    oldXML = sbOddsChangeHttp.responseText;
    var arr, matchState = 0;
    var goal, home, away;
    //亚赔
    if (sbOddsChangeHttp.responseText == null || sbOddsChangeHttp.responseText == "") return;
    var obj = document.getElementById("ifShow"); //判断是否有显示SB详情赔率浮动窗口
    if (obj.value == "0") return;
    obj = document.getElementById("ffOddsDetail"); //全场赔率表格
    if (old == "")
        old = obj.attributes["odds"].value.split(","); //matchid,state,goal,home,away,standard,homewin,guestwin,totalscore,home,away
    var tr1 = obj.rows[1];
    matchState = parseInt(old[1]);
    var root = sbOddsChangeHttp.responseXML.documentElement.childNodes[0]; //让球
    for (i = 0; i < root.childNodes.length; i++) {
        arr = root.childNodes[i].childNodes[0].nodeValue.split(","); //matchid,goal,home,away,state
        if (parseInt(old[0]) == parseInt(arr[0])) {
            if (matchState == 0 && parseInt(arr[4]) > 0) return;
            if (old[2] == arr[1] && old[3] == arr[2] && old[4] == arr[3]) break;
            goal = arr[1];
            home = arr[2];
            away = arr[3];
            for (var j = 2; j <= 3; j++) {
                if (old[j + 1] != "")
                    arr[j] = getChangeStrDiv(arr[j], old[j + 1]);
            }
            tr1.cells[1].innerHTML = arr[2];
            tr1.cells[2].innerHTML = Goal2GoalCn(arr[1]);
            tr1.cells[3].innerHTML = arr[3];
            old[2] = goal;
            old[3] = home;
            old[4] = away;
            old[0] = arr[0];
            break;
        }
    }
    root = sbOddsChangeHttp.responseXML.documentElement.childNodes[1]; //欧赔
    var tr2 = obj.rows[2];
    for (i = 0; i < root.childNodes.length; i++) {
        arr = root.childNodes[i].childNodes[0].nodeValue.split(","); //matchid,homewin,standard,guestwin
        if (parseInt(old[0]) == parseInt(arr[0])) {// && matchState == 0
            if (old[6] == arr[1] && old[5] == arr[2] && old[7] == arr[3]) break;
            goal = arr[2];
            home = arr[1];
            away = arr[3];
            if (old[6] != "")
                arr[1] = getChangeStrDiv(arr[1], old[6]);
            if (old[7] != "")
                arr[3] = getChangeStrDiv(arr[3], old[7]);
            tr2.cells[1].innerHTML = arr[1];
            tr2.cells[2].innerHTML = arr[2];
            tr2.cells[3].innerHTML = arr[3];
            old[5] = goal;
            old[6] = home;
            old[7] = away;
            old[0] = arr[0];
            break;
        }
    }
    root = sbOddsChangeHttp.responseXML.documentElement.childNodes[2]; //大小
    var tr3 = obj.rows[3];
    for (i = 0; i < root.childNodes.length; i++) {
        arr = root.childNodes[i].childNodes[0].nodeValue.split(","); //matchid,totalscore,home,away
        if (parseInt(old[0]) == parseInt(arr[0])) {
            if (old[8] == arr[1] && old[9] == arr[2] && old[10] == arr[3]) break;
            goal = arr[1];
            home = arr[2];
            away = arr[3];
            if (old[9] != "")
                arr[2] = getChangeStrDiv(arr[2], old[9]);
            if (old[10] != "")
                arr[3] = getChangeStrDiv(arr[3], old[10]);
            tr3.cells[1].innerHTML = arr[2];
            tr3.cells[2].innerHTML = Goal2GoalCn2(arr[1]);
            tr3.cells[3].innerHTML = arr[3];
            old[8] = goal;
            old[9] = home;
            old[10] = away;
            old[0] = arr[0];
            break;
        }
    }
    var obj2 = document.getElementById("fhOddsDetail"); //半场赔率表格
    oldHalf = obj2.attributes["odds"].value.split(","); //matchid,goal,home,away,totalscore,home,away,homewin,standoff,guestwin
    var tr4 = obj2.rows[1];
    root = sbOddsChangeHttp.responseXML.documentElement.childNodes[3]; //半场让球
    for (i = 0; i < root.childNodes.length; i++) {
        arr = root.childNodes[i].childNodes[0].nodeValue.split(","); //matchid,goal,home,away
        if (parseInt(old[0]) == parseInt(arr[0])) {
            if (oldHalf[1] == arr[1] && oldHalf[2] == arr[2] && oldHalf[3] == arr[3]) break;
            home = arr[2];
            goal = arr[1];
            away = arr[3];
            if (oldHalf[2] != "")
                arr[2] = getChangeStrDiv(arr[2], oldHalf[2]);
            if (oldHalf[3] != "")
                arr[3] = getChangeStrDiv(arr[3], oldHalf[3]);
            tr4.cells[1].innerHTML = arr[2];
            tr4.cells[2].innerHTML = Goal2GoalCn(arr[1]);
            tr4.cells[3].innerHTML = arr[3];
            oldHalf[2] = home;
            oldHalf[1] = goal;
            oldHalf[3] = away;
            old[0] = arr[0];
            break;
        }
    }
    root = sbOddsChangeHttp.responseXML.documentElement.childNodes[4]; //半场大小
    var tr5 = obj2.rows[3];
    for (i = 0; i < root.childNodes.length; i++) {
        arr = root.childNodes[i].childNodes[0].nodeValue.split(","); //matchid,totalscore,home,away
        if (parseInt(old[0]) == parseInt(arr[0])) {
            if (oldHalf[4] == arr[1] && oldHalf[5] == arr[2] && oldHalf[6] == arr[3]) break;
            home = arr[2];
            goal = arr[1];
            away = arr[3];
            if (oldHalf[5] != "")
                arr[2] = getChangeStrDiv(arr[2], oldHalf[5]);
            if (oldHalf[6] != "")
                arr[3] = getChangeStrDiv(arr[3], oldHalf[6]);
            tr5.cells[1].innerHTML = arr[2];
            tr5.cells[2].innerHTML = Goal2GoalCn2(arr[1]);
            tr5.cells[3].innerHTML = arr[3];
            oldHalf[5] = home;
            oldHalf[4] = goal;
            oldHalf[6] = away;
            old[0] = arr[0];
            break;
        }
    }
    root = sbOddsChangeHttp.responseXML.documentElement.childNodes[5]; //半场欧赔
    var tr6 = obj2.rows[2];
    for (i = 0; i < root.childNodes.length; i++) {
        arr = root.childNodes[i].childNodes[0].nodeValue.split(","); //matchid,totalscore,home,away
        if (parseInt(old[0]) == parseInt(arr[0])) {
            if (oldHalf[7] == arr[1] && oldHalf[8] == arr[2] && oldHalf[9] == arr[3]) break;
            home = arr[2];
            goal = arr[1];
            away = arr[3];
            if (oldHalf[7] != "")
                arr[2] = getChangeStrDiv(arr[2], oldHalf[7]);
            if (oldHalf[8] != "")
                arr[3] = getChangeStrDiv(arr[3], oldHalf[8]);
            tr6.cells[1].innerHTML = arr[1];
            tr6.cells[2].innerHTML = arr[2];
            tr6.cells[3].innerHTML = arr[3];
            oldHalf[8] = home;
            oldHalf[7] = goal;
            oldHalf[9] = away;
            old[0] = arr[0];
            break;
        }
    }
}
function getoddsxml() {
    //    oddsHttp.open("get", "vbsxml/ch_goalin.xml?" + Date.parse(new Date()), true);
    oddsHttp.open("get", "vbsxml/ch_goalBf3.xml?r=007" + Date.parse(new Date()), true);
    oddsHttp.onreadystatechange = oddsrefresh;
    oddsHttp.send(null);
    getoddsxmlTimer = window.setTimeout("getoddsxml()", 10000);
}
function oddsrefresh() {
    if (oddsHttp.readyState != 4 || (oddsHttp.status != 200 && oddsHttp.status != 0)) return;
    if (oldOddsXML == oddsHttp.responseText)
        return;
    oldOddsXML = oddsHttp.responseText;
    showodds();
}
function restoreOddsColor(matchid) {
    var tr = document.getElementById("tr1_" + matchid);
    if (tr == null) return;
    tr.cells[8].innerHTML = tr.cells[8].innerHTML.toLowerCase().replace(/<span class=up>/g, "").replace(/<span class=down>/g, "").replace(/<\/span>/g, "");
    tr.cells[9].innerHTML = tr.cells[9].innerHTML.toLowerCase().replace(/<span class=up>/g, "").replace(/<span class=down>/g, "").replace(/<\/span>/g, "");
    tr.cells[10].innerHTML = tr.cells[10].innerHTML.toLowerCase().replace(/<span class=up>/g, "").replace(/<span class=down>/g, "").replace(/<\/span>/g, "");
}
function restoreSbOddsColor() {
    var obj = document.getElementById("ifShow"); //判断是否有显示SB详情赔率浮动窗口
    if (obj.value == "0") return;
    obj = document.getElementById("ffOddsDetail");
    for (var i = 1; i < obj.rows.length - 1; i++) {
        tr.cells[1].innerHTML = tr.cells[1].innerHTML.toLowerCase().replace(/<span class=up>/g, "").replace(/<span class=down>/g, "").replace(/<\/span>/g, "");
        tr.cells[2].innerHTML = tr.cells[2].innerHTML.toLowerCase().replace(/<span class=up>/g, "").replace(/<span class=down>/g, "").replace(/<\/span>/g, "");
        tr.cells[3].innerHTML = tr.cells[3].innerHTML.toLowerCase().replace(/<span class=up>/g, "").replace(/<span class=down>/g, "").replace(/<\/span>/g, "");
    }
    obj = document.getElementById("fhOddsDetail");
    for (var i = 1; i < obj.rows.length - 1; i++) {
        tr.cells[1].innerHTML = tr.cells[1].innerHTML.toLowerCase().replace(/<span class=up>/g, "").replace(/<span class=down>/g, "").replace(/<\/span>/g, "");
        tr.cells[2].innerHTML = tr.cells[2].innerHTML.toLowerCase().replace(/<span class=up>/g, "").replace(/<span class=down>/g, "").replace(/<\/span>/g, "");
        tr.cells[3].innerHTML = tr.cells[3].innerHTML.toLowerCase().replace(/<span class=up>/g, "").replace(/<span class=down>/g, "").replace(/<\/span>/g, "");
    }
}
function hiddenSbDetail() {
    document.getElementById("ifShow").value = 0;
    old = "";
    oldHalf = "";
    showCont = 0;
    MM_showHideLayers('sbOddsDetail', '', 'hidden');
}
function showSbDetail() {
    document.getElementById("ifShow").value = 1;
    MM_showHideLayers('sbOddsDetail', '', 'show');
}
function LoadSbCornerFile() {
    var detail = document.getElementById("span_sbCorner");
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.charset = "utf-8";
    s.src = "http://bf.win007.com/vbsxml/sbCorner.js?r=007" + Date.parse(new Date());
    detail.removeChild(detail.firstChild);
    detail.appendChild(s, "script");
    loadSbCornerTime = new Date();
}
function hiddenSbCorner() {
    document.getElementById("ifShowCorner").value = 0;
    oldCorner = "";
    showCornerCont = 0;
    MM_showHideLayers('sbOddsCorner', '', 'hidden');
}
function showSbCornerDiv() {
    document.getElementById("ifShowCorner").value = 1;
    MM_showHideLayers('sbOddsCorner', '', 'show');
}
function showSBCorner(obj, event) {
    if (showCornerCont > 0) return;
    var i = obj.attributes["aLoc"].value;
    var scheduleId = A[i][0];
    var homeTeamID = A[i][37];
    var guestTeamID = A[i][38];
    var homeTeam = getTeamName(i,1,3,1);
    var guestTeam = getTeamName(i, 2, 3, 1);
    var sclassName = A[i][2];
    var hOrder = A[i][22];
    var gOrder = A[i][23];
    var matchState = parseInt(A[i][13]);
    var html = new Array();
    if (Math.floor((new Date() - loadSbDetailTime) / 600) > 50) LoadSbCornerFile();
    if (typeof (sCornerData[scheduleId]) == "undefined")
        return;
    var strGoals = "";
    var arrOdds = sCornerData[scheduleId].split('^');
    var arrCornerLetGoal = arrOdds[0].split(',');
    var arrCornerTotal = arrOdds[1].split(',');
    var arrCornerCount = arrOdds[2].split(',');
    var arrDetail = null;
    if (typeof (arrOdds[3]) != "undefined")
        arrDetail = arrOdds[3].split(';');
    strGoals = scheduleId + "," + homeTeamID + "," + guestTeamID + "," + matchState + ",";
    for (var j = 3; j < 6; j++) {
        strGoals += (typeof (arrCornerLetGoal[j]) == "undefined" ? '' : arrCornerLetGoal[j]) + ","
    }
    for (var j = 3; j < 6; j++) {
        strGoals += (typeof (arrCornerTotal[j]) == "undefined" ? '' : arrCornerTotal[j]) + ","
    }
    for (var j = 0; j < 4; j++) {
        strGoals += (typeof (arrCornerCount[j]) == "undefined" ? '' : arrCornerCount[j]) + ","
    }
    if (arrDetail != null && arrDetail[0]!="") {
        var arr = arrDetail[arrDetail.length - 1].split(',');
        strGoals += arr[0] + ',' + arr[1];
    }
    else
        strGoals += ',';
    var beginHeight = 60;
    var isShow = (typeof (arrCornerLetGoal[0]) != "undefined" && arrCornerLetGoal[0] != "") || (typeof (arrCornerTotal[0]) != "undefined" && arrCornerTotal[0] != "");
    html.push('<div class="jqTitle">角球数据</div>');
    html.push('<div class="jqSubTitle' + (isShow ? "" : " bottomLine") + '"><span>' + homeTeam + '</span><span style="width:199px; border-left:solid 1px #cccccc;">' + guestTeam + '</span></div>');

    var goalIsShow = ( isShow? "" : "none");
    beginHeight += (isShow ? 66 : 0);

    html.push('<div class="info" id="div_cornerOdds" style="display:' + goalIsShow + '" odds="' + strGoals + '">');
    html.push('<div class="jqSubTitle2"><span>让分</span><span style="width:199px; border-left:solid 1px #cccccc;">大小</span></div>');
    html.push('<table width="100%" border="0" cellpadding="0" cellspacing="1"  id="tab_CornerOdds" style="background-color:#cccccc;">');
    html.push('<tr><td width="58" bgcolor="#FFFFFF">' + (typeof (arrCornerLetGoal[0]) == "undefined" ? "&nbsp;" : changeData(arrCornerLetGoal[0])) + '</td>');
    html.push('<td width="58" bgcolor="#FFFFFF">' + (typeof (arrCornerLetGoal[0]) == "undefined" ? "&nbsp;" : arrCornerLetGoal[1]) + '</td>');
    html.push('<td width="58" bgcolor="#FFFFFF">' + (typeof (arrCornerLetGoal[0]) == "undefined" ? "&nbsp;" : changeData(arrCornerLetGoal[2])) + '</td>');
    html.push('<td bgcolor="#EFF5EE" width="58">初盘</td>');
    html.push('<td width="58" bgcolor="#FFFFFF">' + (typeof (arrCornerTotal[0]) == "undefined" ? "&nbsp;" : changeData(arrCornerTotal[0])) + '</td>');
    html.push('<td width="58" bgcolor="#FFFFFF">' + (typeof (arrCornerTotal[0]) == "undefined" ? "&nbsp;" : arrCornerTotal[1]) + '</td>');
    html.push('<td width="58" bgcolor="#FFFFFF">' + (typeof (arrCornerTotal[0]) == "undefined" ? "&nbsp;" : changeData(arrCornerTotal[2])) + '</td>');
    html.push('</tr> ');
    html.push('<tr><td bgcolor="#FEF7ED">' + (typeof (arrCornerLetGoal[3]) == "undefined" ? "&nbsp;" : getStrDiv(arrCornerLetGoal[3], arrCornerLetGoal[1])) + '</td><td bgcolor="#FEF7ED">' + (typeof (arrCornerLetGoal[4]) == "undefined" ? "&nbsp;" : arrCornerLetGoal[4]) + '</td>');
    html.push('<td bgcolor="#FEF7ED">' + (typeof (arrCornerLetGoal[5]) == "undefined" ? "&nbsp;" : getStrDiv(arrCornerLetGoal[5], arrCornerLetGoal[2])) + '</td>');
    html.push('<td bgcolor="#EFF5EE">即时</td><td bgcolor="#FEF7ED">' + (typeof (arrCornerTotal[3]) == "undefined" ? "&nbsp;" : getStrDiv(arrCornerTotal[3], arrCornerTotal[0])) + '</td><td bgcolor="#FEF7ED">' + (typeof (arrCornerTotal[4]) == "undefined" ? "&nbsp;" : arrCornerTotal[4]) + '</td>');
    html.push('<td bgcolor="#FEF7ED">' + (typeof (arrCornerTotal[5]) == "undefined" ? "&nbsp;" : getStrDiv(arrCornerTotal[5], arrCornerTotal[2])) + '</td>');
    html.push('</tr>');
    html.push('</table></div>');
    isShow = (A[i][50] == 1 && matchState != 0);
    var cornerIsShow = (isShow ? "" : "none");
    beginHeight += (isShow ? 44 : 0);
    html.push('<div class="info" id="div_cornerDetail" style="display:' + cornerIsShow + '">');
    html.push("<div class='jqTitle2'>角球事件</div>");
    html.push('<table id="tab_CornerDetail" width="100%" border="0" cellpadding="0" cellspacing="1"  style="margin-top:-1px;background-color:#cccccc;">');
    html.push('<tr>');
    html.push('<td width="169" bgcolor="#FFFFFF">' + (typeof (arrCornerCount[0]) == "undefined" ? "&nbsp;" : arrCornerCount[0]) + '</td>');
    html.push('<td  width="56" bgcolor="#EFF5EE">全场</td>');
    html.push('<td bgcolor="#FFFFFF">' + (typeof (arrCornerCount[1]) == "undefined" ? "&nbsp;" : arrCornerCount[1]) + '</td>');
    html.push('</tr>');
    html.push('<tr>');
    html.push('<td bgcolor="#FFFFFF">' + (typeof (arrCornerCount[2]) == "undefined" ? "&nbsp;" : arrCornerCount[2]) + '</td>');
    html.push('<td bgcolor="#EFF5EE">半场</td>');
    html.push('<td bgcolor="#FFFFFF">' + (typeof (arrCornerCount[3]) == "undefined" ? "&nbsp;" : arrCornerCount[3]) + '</td>');
    html.push('</tr>');
    if (arrDetail != null && arrDetail[0] != "") {
        for (var j = 0; j < arrDetail.length; j++) {
            var arr = arrDetail[j].split(',');
            html.push('<tr>');
            html.push('<td bgcolor="#FFFFFF" style="line-height: 18px">' + (homeTeamID == arr[0] ? '<img src="bf_img/rq.jpg" width="16" height="18">' : '&nbsp;') + '</td>');
            html.push('<td bgcolor="#EFF5EE" style="line-height: 18px">' + arr[1] + '\'</td>');
            html.push('<td bgcolor="#FFFFFF" style="line-height: 18px">' + (guestTeamID == arr[0] ? '<img src="bf_img/bq.jpg" width="16" height="18">' : '&nbsp;') + '</td>');
            html.push('</tr>');
        }
    }
    html.push("</table></div>");
    var obj = document.getElementById('sbOddsCorner');
    var pos = getElementPos("sound");
    var contentHeight = (goalIsShow == "none" && cornerIsShow == "none" ? 0 : beginHeight + (arrDetail != null && arrDetail[0] != "" ? arrDetail.length * 18 : 0));
    obj.style.left = (document.body.clientWidth / 2 - 300) + "px";
    var scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    if (scrollTop == 0) {
        if (event.clientY - pos.y < contentHeight)
            obj.style.top = (scrollTop + event.clientY) + "px";
        else
            obj.style.top = (event.clientY - contentHeight) + "px";
    }
    else {
        if (event.clientY < obj.clientHeight)
            obj.style.top = (scrollTop + event.clientY) + "px";
        else
            obj.style.top = (scrollTop + event.clientY - contentHeight) + "px";
    }
    if (goalIsShow == "none" && cornerIsShow == "none") {
        html = [];
        html.push("<table style='border:solid 1px #666; background-color:#FFFFFF;width:180px;line-height:28px;text-align:center;font-size:14px;'><tr><td><b>无角球数据</b></td></tr></table>");
        obj.style.left = (document.body.clientWidth / 2 - 80) + "px"
    }
    obj.innerHTML = html.join("");
    document.getElementById("ifShowCorner").value = 1;
    MM_showHideLayers('sbOddsCorner', '', 'show');
    showCornerCont++;
}
function getSbCornerXml() {
    try {
        var obj = document.getElementById("ifShowCorner"); //判断是否有显示SB详情赔率浮动窗口
        if (obj.value == "0") {
            window.setTimeout("getSbCornerXml()", 5000);
            return;
        }
        sbCornerChangeHttp.open("get", "vbsxml/ch_sbCorner.xml?r=007" + Date.parse(new Date()), true);
        sbCornerChangeHttp.onreadystatechange = sbCornerRefresh;
        sbCornerChangeHttp.send(null);
    } catch (e) { }
    window.setTimeout("getSbCornerXml()", 5000);
}
function sbCornerRefresh() {
    if (sbCornerChangeHttp.readyState != 4 || (sbCornerChangeHttp.status != 200 && sbCornerChangeHttp.status != 0)) return;
    if (oldCornerXml == sbCornerChangeHttp.responseText) return
    oldCornerXml = sbCornerChangeHttp.responseText;
    var arr;
    var goal, home, away, homeCorner, guestCorner, homeHalfCorner, guestHalfCorner;
    //亚赔
    if (sbCornerChangeHttp.responseText == null || sbCornerChangeHttp.responseText == "") return;
    var obj = document.getElementById("ifShowCorner"); //判断是否有显示SB详情赔率浮动窗口
    if (obj.value == "0") return;
    var objDiv = document.getElementById("div_cornerOdds");
    var objDiv2 = document.getElementById("div_cornerDetail");
    var obj3 = document.getElementById("tab_CornerOdds");
    obj = document.getElementById("tab_CornerDetail").tBodies[0];
    if (oldCorner == "")
        oldCorner = objDiv.attributes["odds"].value.split(","); //matchid,hometeamID,guestTeamID,state,home,letgoal,guest,upodds,totalscore,downodds,homecorner,guestcorner,homeHalf,guestHalf,teamID,minutes
    var tr1 = obj3.rows[1];
    var root = sbCornerChangeHttp.responseXML.documentElement.childNodes[0]; //让球
    for (i = 0; i < root.childNodes.length; i++) {
        if (root.childNodes[i].childNodes.length == 0) continue;
        arr = root.childNodes[i].childNodes[0].nodeValue.split("^"); //matchid,home,goal,away
        if (parseInt(oldCorner[0]) == parseInt(arr[0])) {
            if (oldCorner[4] == arr[1] && oldCorner[5] == arr[2] && oldCorner[6] == arr[3]) break;
            home = arr[1];
            goal = arr[2];
            away = arr[3];
            if (oldCorner[4] != "")
                arr[j] = getChangeStrDiv(arr[1], oldCorner[4]);
            if (oldCorner[6] != "")
                arr[j] = getChangeStrDiv(arr[3], oldCorner[6]);
            tr1.cells[0].innerHTML = arr[1];
            tr1.cells[1].innerHTML = arr[2];
            tr1.cells[2].innerHTML = arr[3];
            if (oldCorner[5] == "")
            {
                var tr0 = obj3.rows[0];
                tr0.cells[0].innerHTML = arr[1];
                tr0.cells[1].innerHTML = arr[2];
                tr0.cells[2].innerHTML = arr[3];
            }
            oldCorner[5] = goal;
            oldCorner[4] = home;
            oldCorner[6] = away;
            oldCorner[0] = arr[0];
            break;
        }
    }
    root = sbCornerChangeHttp.responseXML.documentElement.childNodes[1]; //大小
    for (i = 0; i < root.childNodes.length; i++) {
        if (root.childNodes[i].childNodes.length == 0) continue;
        arr = root.childNodes[i].childNodes[0].nodeValue.split("^"); //matchid,upodds,totalscore,downodds
        if (parseInt(oldCorner[0]) == parseInt(arr[0])) {
            if (oldCorner[7] == arr[1] && oldCorner[8] == arr[2] && oldCorner[9] == arr[3]) break;
            goal = arr[2];
            home = arr[1];
            away = arr[3];
            if (oldCorner[7] != "")
                arr[1] = getChangeStrDiv(arr[1], oldCorner[7]);
            if (oldCorner[9] != "")
                arr[3] = getChangeStrDiv(arr[3], oldCorner[9]);
            tr1.cells[4].innerHTML = arr[1];
            tr1.cells[5].innerHTML = arr[2];
            tr1.cells[6].innerHTML = arr[3];
            oldCorner[7] = goal;
            oldCorner[8] = home;
            oldCorner[9] = away;
            oldCorner[0] = arr[0];
            break;
        }
    }
    root = sbCornerChangeHttp.responseXML.documentElement.childNodes[2]; //角球
    var tr2 = obj.rows[0];
    var tr3 = obj.rows[1];
    for (i = 0; i < root.childNodes.length; i++) {
        if (root.childNodes[i].childNodes.length == 0) continue;
        arr = root.childNodes[i].childNodes[0].nodeValue.split("^"); //matchid,homeCorner,guestCorner,homeHalf,guestHalf
        if (parseInt(oldCorner[0]) == parseInt(arr[0])) {
            if (oldCorner[10] == arr[1] && oldCorner[11] == arr[2] && oldCorner[12] == arr[3] && oldCorner[13] == arr[4]) break;
            homeCorner = arr[1];
            guestCorner = arr[2];
            homeHalfCorner = arr[3];
            guestHalfCorner = arr[4];
            if (oldCorner[10] != "")
                arr[1] = getChangeStrDiv(arr[1], oldCorner[10]);
            if (oldCorner[11] != "")
                arr[2] = getChangeStrDiv(arr[2], oldCorner[11]);
            if (oldCorner[12] != "")
                arr[3] = getChangeStrDiv(arr[3], oldCorner[12]);
            if (oldCorner[13] != "")
                arr[4] = getChangeStrDiv(arr[4], oldCorner[13]);
            tr2.cells[0].innerHTML = arr[1];
            tr2.cells[2].innerHTML = arr[2];
            tr3.cells[0].innerHTML = arr[3];
            tr3.cells[2].innerHTML = arr[4];
            oldCorner[10] = homeCorner;
            oldCorner[11] = guestCorner;
            oldCorner[12] = homeHalfCorner;
            oldCorner[13] = guestHalfCorner;
            oldCorner[0] = arr[0];
            break;
        }
    }
    root = sbCornerChangeHttp.responseXML.documentElement.childNodes[3]; //角球变化记录
    for (i = 0; i < root.childNodes.length; i++) {
        if (root.childNodes[i].childNodes.length == 0) continue;
        arr = root.childNodes[i].childNodes[0].nodeValue.split("^"); //matchid,teamID,HappenMinutes
        if (parseInt(oldCorner[0]) == parseInt(arr[0])) {
            if (oldCorner[14] != arr[1] || oldCorner[15] != arr[2]) {
                oldCorner[14] = arr[1];
                oldCorner[15] = arr[2];
                oldCorner[0] = arr[0];
                var fra = document.createDocumentFragment();
                var newTr0 = document.createElement("tr");
                //newTr0.setAttribute("bgcolor", "#FFFFFF");
                var attrNameList = "bgcolor,style";
                var attrValList = "FFFFFF,line-height: 18px";
                newTr0.appendChild(createTd(attrNameList, attrValList, (oldCorner[1] == arr[1] ? '<img src="bf_img/rq.jpg" width="16" height="18">' : '&nbsp;')));
                attrNameList = "bgcolor,style";
                attrValList = "EFF5EE,line-height: 18px";
                newTr0.appendChild(createTd(attrNameList, attrValList, arr[2] + "\'"));
                attrNameList = "bgcolor,style";
                var attrValList = "FFFFFF,line-height: 18px";
                newTr0.appendChild(createTd(attrNameList, attrValList, (oldCorner[2] == arr[1] ? '<img src="bf_img/bq.jpg" width="16" height="18">' : '&nbsp;')));
                fra.appendChild(newTr0);
                obj.appendChild(fra);
                break;
            }
        }
    }
    objDiv.setAttribute("odds", oldCorner.join(","));
}
function createTd(attrNameList, attrValList, txt) {
    var arrName = attrNameList.split(',');
    var arrVal = attrValList.split(',');
    var attributeList = "";
    try {
        for (var i = 0; i < arrName.length; i++) {
            attributeList += " " + arrName[i] + "='" + arrVal[i] + "'";
        }
        var td = document.createElement("<td" + attributeList + "></td>");
        td.innerHTML = txt;
        return td;
    } catch (e) {
        var td = document.createElement("td");
        for (var i = 0; i < arrName.length; i++) {
            td.setAttribute(arrName[i], arrVal[i]);
        }
        td.innerHTML = txt;
        return td;
    }
}
var classx3 = "";
function MakeTable() {
    var state, j = 0, hh = 0;
    var strState = "";
    var checkTrData = true;
    var realData = matchdate;
    var H_redcard, G_redcard, H_yellow, G_yellow, H_order, G_order;
    var oldHiddenID = true;
    var ArrayHiddenID = hiddenID.split("_");
    var isCreateTr = false;
    var html = new Array();
    var leagueBegian = false;
    var sss = "", tempArr;
    hsLetGoal = new Hashtable(); //让球盘口哈希表 key:盘口,value:位置列表("0,3,5....")
    hsBigSmallGoal = new Hashtable(); //大小盘口哈希表
    hsLetGoalNum = new Hashtable();
    hsBigSmallGoalNum = new Hashtable();
    html.push("<table id='table_live' width='100%' bgcolor=#DDDDDD align=center cellspacing=0 border=0 cellpadding=0 class='mytable'>"); //1
    if (hiddenID != "_") {
        for (var i = 1; i <= matchcount; i++) {
            if (ArrayHiddenID[1] == A[i][0]) {
                oldHiddenID = false;
                break;
            }
        }
    }
    if (oldHiddenID) hiddenID = "_";

    for (var i = 1; i <= matchcount; i++) {
        try {
            if (concernId.indexOf(A[i][0]) == -1 && !isCreateTr) {
                if (Config.language == 1)
                    html.push("<tr id='tr_0' style='background-color:#6BADDF;color:white' align=center><td  bgcolor='#ff9933' height=20 width='2%'>選</td><td width='9%' id='tr_data'>" + matchdate + "</td><td  width='5%'>時間</td><td width='5%'>狀態</td><td  width='18%'>比賽球隊</td><td width='6%'>比分</td><td   width='18%'>比賽球隊</td><td width='7%'>角/半</td><td colspan='3'>SB指數</td><td width='1%'>走</td><td width='12%'>數據</td><td></td></tr>");
                else
                    html.push("<tr id='tr_0' style='background-color:#6BADDF;color:white' align=center><td  bgcolor='#ff9933' height=20 width='2%'>选</td><td width='9%' id='tr_data'>" + matchdate + "</td><td  width='5%'>时间</td><td width='5%'>状态</td><td  width='18%'>比赛球队</td><td width='6%'>比分</td><td   width='18%'>比赛球队</td><td width='7%'>角/半</td><td colspan='3'>SB指数</td><td width='1%'>走</td><td width='12%'>数据</td><td></td></tr>");

                isCreateTr = true;
            }
            if (matchType >= 0) {
                A[i][25] = parseInt(A[i][25]);
                if (!(matchType == 0 && A[i][25] > 0 || matchType == 1 && (A[i][25] == 1 || A[i][25] === 3) || matchType == 2 && (A[i][25] == 2 || A[i][25] === 3))) {
                    A[i][0] = 0;
                    continue;
                }
            }
            for (j = 1; j <= sclasscount; j++) {
                if (A[i][2] == B[j][0]) {
                    B[j][6]++;
                    if (hiddenID == "_" || hiddenID.indexOf("_" + A[i][0] + "_") != -1) B[j][7]++;
                    break;
                }
            }
            for (j = 0; j < C.length; j++) {
                if (A[i][40] == C[j][0]) {
                    C[j][2]++;
                    if (hiddenID == "_" || hiddenID.indexOf("_" + A[i][0] + "_") != -1) C[j][4]++;
                    break;
                }
            }
            var match_corner = "";
            state = parseInt(A[i][13]);
            switch (state) {
                case 0:
                    if (A[i][27] == "1") match_score = (Config.language == 1 ? "陣容" : "阵容"); else match_score = "-";
                    match_half = "-";
                    match_corner = "-";
                    break;
                case 1:
                    match_score = A[i][14] + "-" + A[i][15];
                    match_half = "-";
                    match_corner = A[i][48] + "-" + A[i][49];
                    break;
                case -11:
                case -14:
                    match_score = "";
                    match_half = "";
                    match_corner = "";
                    break;
                default:
                    match_score = A[i][14] + "-" + A[i][15];
                    match_half = A[i][16] + "-" + A[i][17];
                    match_corner = A[i][48] + "-" + A[i][49];
                    break;
            }
            //if(A[i][29]!="") pk[Math.abs(A[i][29])*4]++;
            if (A[i][18] != "0") H_redcard = "<img src='http://live3.win007.com/bf_img/redcard" + A[i][18] + ".gif'>"; else H_redcard = "";
            if (A[i][19] != "0") G_redcard = "<img src='http://live3.win007.com/bf_img/redcard" + A[i][19] + ".gif'>"; else G_redcard = "";
            if (A[i][20] != "0" && Config.showYellowCard == 1) H_yellow = "<img src='http://live3.win007.com/bf_img/yellow" + A[i][20] + ".gif'>"; else H_yellow = "";
            if (A[i][21] != "0" && Config.showYellowCard == 1) G_yellow = "<img src='http://live3.win007.com/bf_img/yellow" + A[i][21] + ".gif'>"; else G_yellow = "";
            H_order = ""; G_order = "";
            if (Config.rank == 1) {
                if (A[i][22] != "") H_order = "<font color=#444444><sup>[" + A[i][22] + "]</sup></font>";
                if (A[i][23] != "") G_order = "<font color=#444444><sup>[" + A[i][23] + "]</sup></font>";
            }
            if (i % 2 == 0) bg = bg1; else bg = bg2;

            classx = "none";
            if (hiddenID != "_") {
                for (var j = 1; j < ArrayHiddenID.length - 1; j++) {
                    if (ArrayHiddenID[j] == A[i][0]) {
                        classx = "";
                        break;
                    }
                }
            }
            else
                classx = "";
            if (classx == "none") hh++;
            // var ifShowScore = 0;
            //if (Config.orderBy == 1)
            //ifShowScore = parseInt(A[i][44]);
            html.push("<tr align=center id='tr1_" + A[i][0] + "' bgcolor='" + bg + "' index='" + i + "' style='height:18px;display:" + classx + "' odds=''>");
            html.push("<td><input type=checkbox class='inp' id='chk_" + A[i][0] + "'></td>");
            if (A[i][31] != "")
                html.push("<td bgcolor=" + A[i][1] + " style='color:white;'><a href='http://info.win007.com" + A[i][31] + "' target=_blank><font color=white>" + A[i][2 + lang] + "</font></a></td>");
            else
                html.push("<td bgcolor=" + A[i][1] + " style='color:white;'>" + A[i][2 + lang] + "</td>");
            var timeStr = AmountTimeDiff(A[i][11], A[i][36], A[i][43], 1);
            var dataStr = timeStr.split(" ");
            html.push("<td align=center id='mt_" + A[i][0] + "'>" + dataStr[1] + "</td>");
            if (checkTrData) {
                realData = dataStr[0];
                checkTrData = false;
            }
            if (A[i][13] == "-1")
                classx2 = "td_scoreR";
            else
                classx2 = "td_score";
            if (A[i][13] == "1") {  //上半场
                var t = A[i][12].split(",");
                var t2 = new Date(t[0], t[1], t[2], t[3], t[4], t[5]);
                goTime = Math.floor((new Date() - t2 - difftime) / 60000);
                if (goTime > 45) goTime = "45+";
                if (goTime < 1) goTime = "1";
                strState = goTime + "<img src='http://live3.win007.com/bf_img/in.gif' border=0>";
            }
            else if (A[i][13] == "3") {  //下半场
                var t = A[i][12].split(",");
                var t2 = new Date(t[0], t[1], t[2], t[3], t[4], t[5]);
                goTime = Math.floor((new Date() - t2 - difftime) / 60000) + 46;
                if (goTime > 90) goTime = "90+";
                if (goTime < 46) goTime = "46";
                strState = goTime + "<img src='http://live3.win007.com/bf_img/in.gif' border=0>";
            }
            else
                strState = state_ch[state + 14].split(",")[lang];
            html.push("<td align=center id='time_" + A[i][0] + "' class='td_status'>" + strState + "</td>");
            html.push("<td align=right><span id=horder_" + A[i][0] + ">" + H_order + "</span><a id='yellow1_" + A[i][0] + "'>" + H_yellow + "</a><a id='redcard1_" + A[i][0] + "'>" + H_redcard + "</a><a id='team1_" + A[i][0] + "' href='javascript:' onclick='TeamPanlu_10(" + A[i][0] + ")'>" + getTeamName(i, 1, 3, 1) + "</a></td>");
            html.push("<td aLoc='" + i + "' onclick='showgoallist(" + A[i][0] + ")' class='" + classx2 + "' onmouseover='showdetail(this,event,3)' onmouseout='hiddendetail()'>" + match_score + "</td>");
            html.push("<td align=left><a id='team2_" + A[i][0] + "' href='javascript:' onclick='TeamPanlu_10(" + A[i][0] + ")'>" + getTeamName(i, 2, 3, 1) + "</a><a id='redcard2_" + A[i][0] + "'>" + G_redcard + "</a><a id='yellow2_" + A[i][0] + "'>" + G_yellow + "</a><span id=gorder_" + A[i][0] + ">" + G_order + "</span></td>");

            if (state == "0" || state == "1" || state == "-11" || state == "-12" || state == "-13" || state == "-14")
                classx2 = "td_half";
            else
                classx2 = "td_halfR";
            if (state == "0"||state=="-1")
                classx3 = "td_half";
            else
                classx3 = "td_halfB";
            html.push("<td style='cursor:pointer;'><span class=" + classx3 + " aLoc='" + i + "' style='display:" + (A[i][50] == "1" ? "" : "none") + "'>" + match_corner + "</span><br/><span class=" + classx2 + " aLoc='" + i + "' onmouseover='showpaulu(this,event,3)' onmousemove='movepanlu(event)'  onmouseout='hiddendetail()'>" + match_half + "</span>" + "</td>");// onmouseover='showSBCorner(this,event)' onmouseout='hiddenSbCorner()'
            if (hsLetGoalList.contains(A[i][0])) {
                tempArr = hsLetGoalList.items(A[i][0]).split(',');
                html.push("<td class=oddss width='4%'></td>"); //<div class=odds" + (tempArr[3] == "2" ? 4 : 2) + ">" + (tempArr[4] == "0" ? tempArr[1] : "") + "</div>
                html.push("<td width='9%'  id='pk_" + A[i][0] + "' class=oddss goal='" + hsLetGoalList.items(A[i][0]) + "' onclick=\"AsianOdds(" + A[i][0] + ")\" style='cursor:pointer;' aLoc='" + i + "' onmouseover='showOddsDetail(this,event)' onmouseout=hiddenSbDetail()></td>"); //<div class=odds" + (tempArr[3] == "2" ? 4 : 2) + ">" + (tempArr[4] == "0" ? Goal2GoalCn(tempArr[0]).replace("受", "<font color='red'>*</font>") : "封") + "</div>
                html.push("<td  class=oddss width='4%'></td>"); //<div class=odds" + (tempArr[3] == "2" ? 4 : 2) + ">" + (tempArr[4] == "0" ? tempArr[2] : "") + "</div>
            }
            else {
                html.push("<td class=oddss width='4%'></td>");
                html.push("<td width='9%' id='pk_" + A[i][0] + "' class=oddss goal='' onclick=\"AsianOdds(" + A[i][0] + ")\" style='cursor:pointer;' aLoc='" + i + "' onmouseover='showOddsDetail(this,event)' onmouseout=hiddenSbDetail()></td>");
                html.push("<td  class=oddss width='4%'></td>");
            }
            if (A[i][28] == "True")
                html.push("<td><img src='http://live3.win007.com/image/zd.gif' style='height:10px;width:10px'></td>");
            else
                html.push("<td><img style='height:0px;width:10px'></td>");
            html.push("<td><a href=javascript: onclick=analysis(" + A[i][0] + ") title='" + (Config.language == 1 ? "數據" : "数据") + "分析'>析</a> <a style='cursor:pointer;' href=javascript: onclick=\"AsianOdds(" + A[i][0] + ");\" title='11家指" + (Config.language == 1 ? "數" : "数") + "'>亚</a> <a style='cursor:pointer;' href=javascript: onclick=\"TotalOdds(" + A[i][0] + ");\" title='11家指" + (Config.language == 1 ? "數" : "数") + "'>大</a> <a href='javascript:EuropeOdds(" + A[i][0] + ")'>" + (Config.language == 1 ? "歐" : "欧") + "</a>");
            //if (A[i][41] == "1")
            //   html.push(" <a href='http://bf.win007.com/TextLive/" + A[i][0] + ".htm' title='文字直播," + (Config.language == 1 ? "現場數據" : "现场数据") + "' target=_blank>直</a>");
            if (A[i][47] == "1")
                html.push("<a href='javascript:advices(" + A[i][0] + ")'><img src='http://live3.win007.com/image/fx2.gif'  title='情" + (Config.language == 1 ? "報" : "报") + "分析' style='margin-left:4px;height:12px;width:8px'></a>");
            else
                html.push("<img style='margin-left:4px;height:0px;width:8px'>");
            html.push("</td>");

            //            if (A[i][26] != "")
            //                html.push("<a href='http://nba.win007.com/tv.aspx?Kind=1' target=_blank><img src='http://live3.win007.com/image/tv.gif' title='" + A[i][26] + "' style='margin-left:4px;height:10px;width:10px'></a></td>");
            //            else
            //                html.push("<img  style='margin-left:4px;height:0px;width:10px''></td>");
            if (concernId.indexOf(A[i][0]) == -1)
                html.push("<td><a href='javascript:addConcern(" + i + ",13);' title=\"添加置" + (Config.language == 1 ? "頂" : "顶") + "\"><img src='http://live3.win007.com/image/expand.gif'></a></td></tr>");
            else
                html.push("<td><a href='javascript:deleteConcern(" + i + ",13);' title=\"取消置" + (Config.language == 1 ? "頂" : "顶") + "\"><img src='http://live3.win007.com/image/collapse.gif'/></a></td></tr>");
            var strExplain = showExplain(A[i][42], getTeamName(i, 1, 3, 1), getTeamName(i, 2, 3, 1));
            if (strExplain + A[i][30] == "" || classx == "none" || Config.explain == 0) classx = "none"; else classx = "";
            html.push("<tr id='tr2_" + A[i][0] + "' style='display:" + classx + "' bgcolor='#FFFFE8'><td colspan=13 align=center height=18 style='color:green;padding-right:108px;' id='other_" + A[i][0] + "'>" + strExplain + (strExplain != "" && A[i][30] != "" ? "<br>" + A[i][30] : A[i][30] != "" ? A[i][30] : "") + "</td><td class='noborder' valign='top' type='text-align:center;'>");
            if (A[i][26] != "")
                html.push("<a href='http://nba.win007.com/tv.aspx?Kind=1' target=_blank><img src='http://live3.win007.com/image/tv.gif' title='" + A[i][26] + "'></a>");
            else
                html.push("&nbsp;");
            html.push(" </td></tr>");

            if ((i + 1) / 2 < adinfo1.length && (i + 1) % 2 == 0 && i < 10)
                html.push("<tr id=tr_ad" + (i + 1) / 2 + "><td colspan=14 bgcolor=#FFFFE8 align=center height=18>" + (Config.language == 1 ? "廣" : "广") + "告：<a href='" + adinfo1[(i + 1) / 2] + "' target=_blank style='color:blue'><b>" + adinfo2[(i + 1) / 2] + "</b></a></td></tr>");
            else if (matchcount >= 44) {
                if (adinfo1.length >= 7 && i == 12)
                    html.push("<tr id=tr_ad6><td colspan=14 bgcolor=#FFFFE8 align=center height=18>" + (Config.language == 1 ? "廣" : "广") + "告：<a href='" + adinfo1[6] + "' target=_blank style='color:blue'><b>" + adinfo2[6] + "</b></a></td></tr>");
                if (adinfo1.length > 7 && i == 15)
                    html.push("<tr id=tr_ad7><td colspan=14 bgcolor=#FFFFE8 align=center height=18>" + (Config.language == 1 ? "廣" : "广") + "告：<a href='" + adinfo1[7] + "' target=_blank style='color:blue'><b>" + adinfo2[7] + "</b></a></td></tr>");
                if (adinfo1.length > 8 && i == 30)
                    html.push("<tr id=tr_ad8><td colspan=14 bgcolor=#FFFFE8 align=center height=18>" + (Config.language == 1 ? "廣" : "广") + "告：<a href='" + adinfo1[8] + "' target=_blank style='color:blue'><b>" + adinfo2[8] + "</b></a></td></tr>");
                if (adinfo1.length > 9 && i == 34)
                    html.push("<tr id=tr_ad9><td colspan=14 bgcolor=#FFFFE8 align=center height=18>" + (Config.language == 1 ? "廣" : "广") + "告：<a href='" + adinfo1[9] + "' target=_blank style='color:blue'><b>" + adinfo2[9] + "</b></a></td></tr>");
                if (adinfo1.length > 10 && i == 35)
                    html.push("<tr id=tr_ad10><td colspan=14 bgcolor=#FFFFE8 align=center height=18>" + (Config.language == 1 ? "廣" : "广") + "告：<a href='" + adinfo1[10] + "' target=_blank style='color:blue'><b>" + adinfo2[10] + "</b></a></td></tr>");

                //if(i==40)
                //	html.push("<tr id=tr_ad9><td colspan=14 bgcolor=#FFFFE8 align=center height=18>广告：<a href='http://www.310win.com/buy/jingcai.aspx?typeID=101&oddstype=2' target=_blank style='color:red;background-color:yellow;'><b>投注→看直播→中奖提款，乐事也！</b></a></td></tr>");

                if (i == matchcount - 8 && adinfo1.length > 11)
                    html.push("<tr id=tr_ad11><td colspan=14 bgcolor=#FFFFE8 align=center height=18>" + (Config.language == 1 ? "廣" : "广") + "告：<a href='" + adinfo1[11] + "' target=_blank style='color:blue'><b>" + adinfo2[11] + "</b></a></td></tr>");
                // if (i == 17)
                //html.push("<tr id=tr_oad1><td colspan=14 bgcolor=#FFFFE8 align=center height=18> &nbsp; &nbsp; <a style='padding-right:" + (Config.orderBy == 2 ? 208 : 138) + "px;' href=http://tvhk.city007.net/ target=_blank>[<font color=blue>高清直播</font>]</a> &nbsp; &nbsp; </b></font></a></td></tr>");
            }
            else {
                if ((i + 1) / 2 < adinfo1.length && (i + 1) % 2 == 0)
                    html.push("<tr id=tr_ad" + (i + 1) / 2 + "><td colspan=14 bgcolor=#FFFFE8 align=center height=18>" + (Config.language == 1 ? "廣" : "广") + "告：<a href='" + adinfo1[(i + 1) / 2] + "' target=_blank style='color:blue'><b>" + adinfo2[(i + 1) / 2] + "</b></a></td></tr>");
            }
            if (i == matchcount - 6 && fixAd.length > 0)
                html.push("<tr><td colspan=14 bgcolor=#FFFFE8 align=center height=18>" + (Config.language == 1 ? "廣" : "广") + "告：" + fixAd[0] + "</td></tr>");
            //盘口选择/查询数据加载
            var strGoal = (Config.language == 1 ? "沒開盤" : "没开盘");
            if (A[i][29] != '')
                strGoal = A[i][29];
            if (hsLetGoal.contains(strGoal)) {
                var iList = hsLetGoal.items(strGoal);
                iList += "," + i;
                hsLetGoal.add(strGoal, iList);
                if (hiddenID == "_" || hiddenID.indexOf("_" + A[i][0] + "_") != -1) {
                    if (hsLetGoalNum.contains(strGoal)) {
                        var num = parseInt(hsBigSmallGoalNum.items(strGoal));
                        hsLetGoalNum.add(strGoal, num++);
                    }
                    else
                        hsLetGoalNum.add(strGoal, 1);
                }
            }
            else {
                hsLetGoal.add(strGoal, i.toString());
                if (hiddenID == "_" || hiddenID.indexOf("_" + A[i][0] + "_") != -1)
                    hsLetGoalNum.add(strGoal, 1);
            }
            strGoal = (Config.language == 1 ? "沒開盤" : "没开盘");
            if (A[i][46] != '')
                strGoal = A[i][46];
            if (hsBigSmallGoal.contains(strGoal)) {
                var iList = hsBigSmallGoal.items(strGoal);
                iList += "," + i;
                hsBigSmallGoal.add(strGoal, iList);
                if (hiddenID == "_" || hiddenID.indexOf("_" + A[i][0] + "_") != -1) {
                    if (hsBigSmallGoal.contains(strGoal)) {
                        var num = parseInt(hsBigSmallGoal.items(strGoal));
                        hsBigSmallGoalNum.add(strGoal, num++);
                    }
                    else
                        hsBigSmallGoalNum.ad(strGoal, 1);
                }
            }
            else {
                hsBigSmallGoal.add(strGoal, i.toString());
                if (hiddenID == "_" || hiddenID.indexOf("_" + A[i][0] + "_") != -1)
                    hsBigSmallGoalNum.ad(strGoal, 1);
            }
        } catch (e) { }
    }
    html.push("</table>");
    document.getElementById("live").innerHTML = html.join("");
    document.getElementById("tr_data").innerHTML = realData;
    if (hh > 0) document.getElementById("hiddencount").innerHTML = hh;
    getOddsData();
    showodds();
    //联赛/杯赛名列表
    makeLeague();
    //国家列表
    //    var country = new Array();
    //    for (var i = 0; i < C.length; i++) {
    //        if (C[i][2] > 0) country.push("<li><a href='javascript:CheckCountry(" + C[i][0] + ")' id='country_" + C[i][0] + "'>" + C[i][1] + "</a></li>");
    //    }
    //    document.getElementById("countryList").innerHTML = country.join("");
    makeCountry();
    //盘口选择/查询
    makeGoalTable(0); //让球
}
function createLeagueTr(leagueIndex, display) {
    var retStr = "";
    retStr += "<tr class='Leaguestitle' id='tr_" + leagueIndex + "' style='display:" + display + ";'><td colspan='15'><span class='l1'>";
    if (B[leagueIndex][8] != "")
        retStr += "<a href='http://info.win007.com/cn/" + B[leagueIndex][8] + "' target=_blank>";
    else
        retStr += "<a href='javascript:'>";
    if (Config.language < 2)
        retStr += B[leagueIndex][Config.language] + "</a> </span><span class='l2'>";
    else
        retStr += B[leagueIndex][0] + "</a> </span><span class='l2'>";
    retStr += "<a href='javascript:HiddenLeague(" + leagueIndex + ")' id='collapse" + leagueIndex + "'><img src='http://live3.win007.com/image/cllse.gif'></a><a href='javascript:CloseLeague(" + leagueIndex + ") '><img src='http://live3.win007.com/image/closes.gif'></a></span></td></tr>";
    return retStr;
}


var hsLetGoalList = new Hashtable(); //让球盘列表//积分榜-------------------------------------------------------
//总积分榜 0颜色（没有则为-1）,1排名，2球队ID，3红牌数，4总场次，5胜，6平，7负，8得，9失，10净，11胜率，12平率，13负率，14均得，15均失，16积分，17扣分，18扣分说明
function showTotalScore() {
    ;
    var mainDiv = document.getElementById("winScore");
    var hId = parseInt(A[scoreSIndex][37]);
    var gId = parseInt(A[scoreSIndex][38]);
    var strVS = A[scoreSIndex][5 + lang] + "<span style='padding-left:35px;padding-right:35px;'>VS</span>" + A[scoreSIndex][8 + lang];
    var arrData = new Array();
    arrData.push("<table id='div_Table1' width='680px' border='0' cellpadding='0' cellspacing='1' style='font-size:small'  bgcolor='#C6C6C6' class='tdlink'><tr bgcolor='#D1E2F5' align='center' style='font-weight:bold;font-size:12px;'><td colspan='2' bgcolor='" + A[scoreSIndex][1] + "' style='color:#ffffff;'>" + A[scoreSIndex][2 + lang] + "</td><td colspan='14' height='20px'  ><b>" + strVS + "</b></td></tr>");
    if (lang == 1)
        arrData.push("<tr bgcolor='#D1E2F5' align='center' style='font-weight:bold;font-size:12px;'><td width='30px'>排名</td><td  height='20px'  >球隊名稱</td><td width='25px' >賽</td><td width='25px' >勝</td><td width='25px'>平</td><td width='25px'>負</td><td width='25px'>得</td><td width='25px' >失</td><td width='25px' >凈</td><td width='50px'>勝%</td><td width='50px'>平%</td><td width='50px'>負%</td><td width='38px'>均得</td><td width='38px'>均失</td><td width='28px' >積分</td><td width='88px' >近六場</td></tr>");
    else
        arrData.push("<tr bgcolor='#D1E2F5' align='center' style='font-weight:bold;font-size:12px;'><td width='30px'>排名</td><td  height='20px'  >球队名称</td><td width='25px' >赛</td><td width='25px' >胜</td><td width='25px'>平</td><td width='25px'>负</td><td width='25px'>得</td><td width='25px' >失</td><td width='25px' >净</td><td width='50px'>胜%</td><td width='50px'>平%</td><td width='50px'>负%</td><td width='38px'>均得</td><td width='38px'>均失</td><td width='28px' >积分</td><td width='88px' >近六场</td></tr>");

    for (var i = 0; i < totalScore.length; i++) {
        var oneRecord = totalScore[i];
        var bgColor = "";
        if (oneRecord[2] == hId)
            bgColor = "#95cfff";
        else if (oneRecord[2] == gId)
            bgColor = "#c793ff";
        else if (bgColor == '')
            bgColor = "#ffffff";
        arrData.push("<tr align='center' height='20px'><td bgcolor='" + bgColor + "'>" + oneRecord[1] + "</td><td bgcolor='" + bgColor + "' align='left'><a href='http://info.win007.com/team/" + oneRecord[2] + ".htm' target='_blank'>" + showScoreTeam(oneRecord[3], oneRecord[2]) + "</a></td><td bgcolor='#ffffff'>" + oneRecord[4] + "</td><td bgcolor='#ffffff'>" + oneRecord[5] + "</td><td bgcolor='#ffffff'>" + oneRecord[6] + "</td><td bgcolor='#ffffff'>" + oneRecord[7] + "</td><td bgcolor='#ffffff'>" + oneRecord[8] + "</td><td bgcolor='#ffffff'>" + oneRecord[9] + "</td><td bgcolor='#ffffff'>" + oneRecord[10] + "</td><td bgcolor='#F5DBD1'>" + oneRecord[11] + "%</td><td bgcolor='#F7EDD5'>" + oneRecord[12] + "%</td><td bgcolor='#E7F7D7'>" + oneRecord[13] + "%</td><td bgcolor='#E7F7D7'>" + oneRecord[14] + "</td><td bgcolor='#DBEEEE'>" + oneRecord[15] + "</td><td bgcolor='#FDFCCC'>" + (oneRecord[16] - oneRecord[17]) + "</td><td bgcolor='#ffffff'>" + nearSix(oneRecord[19]) + nearSix(oneRecord[20]) + nearSix(oneRecord[21]) + nearSix(oneRecord[22]) + nearSix(oneRecord[23]) + nearSix(oneRecord[24]) + "</td></tr>");
        //扣分说明
        if (oneRecord[18] != "")
            arrData.push("<tr bgcolor='#F0F0F0'><td colspan='16'>" + (lang == 1 ? "註" : "注") + ":" + oneRecord[18] + "</td></tr>");
    }
    arrData.push("</table>");
    mainDiv.innerHTML = arrData.join('');
    mainDiv.style.left = (document.body.clientWidth / 2 - 285) + "px";
    var scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    mainDiv.style.top = Math.max(0, scrollTop) + "px";
    mainDiv.style.display = "";
}

//近6轮显示
function nearSix(num) {
    if (num == 0)
        return "<font color='red'>W</font>";
    else if (num == 1)
        return "<font color='blue'>D</font>";
    else if (num == 2)
        return "L";
    else
        return "-"
}
function InitSub(arrSubLeague,subSclassID) {
    for (var i = 0; i < arrSubLeague.length; i++) {
        if (arrSubLeague[i][0] == subSclassID) currSubLeague = subLeague;
    }
}
//积分榜显示颜色
function getScoreColor(colorNum) {
    if (colorNum == -1)
        return "";
    var color = scoreColor[colorNum];
    return color.split("|")[0];
}
//积分榜显示球队
function showScoreTeam(redCardNum, teamID) {
    var html = teamHelper["T_" + teamID][1 +lang];
    if (redCardNum != 0)
        html += "&nbsp;<span style=\"padding-bottom:0px; padding-top:0px; padding-left:2px; padding-right:2px; background-color:#F00;color:#fff;\">" + redCardNum + "</span>";
    return html;
}
function InitTeam() {
    for (var i = 0; i < arrTeam.length; i++) {
        teamHelper["T_" + arrTeam[i][0]] = arrTeam[i];
    }
}
function showLeageuScore() {
    try {
        InitTeam();
        showTotalScore();
    }
    catch (e)
    { }
}
function showSubLeageuScore() {
    try {
        InitTeam();
        showTotalScore();
    }
    catch (e)
    { }
}
