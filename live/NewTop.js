sfHover = function() {
	var sfEls = document.getElementById("web_nav").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className = (this.className ? this.className + " " : "") + "sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className = this.className.replace(/\s*?\bsfhover\b/, "");
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);
var homePage = "http://live3.win007.com/";
var enUrl = "http://www.nowgoal.com";
var name = "足球比分";
var adUrl='|<a href="http://www.apk007.com/" target="_blank">手机娱乐市场</a>';
try {
    if (t == 2) {
        homePage = "http://lq2.win007.com/nba.htm";
        enUrl = "http://nowgoal.com/nba.htm";
        name = "篮球比分";
		adUrl="";
    }
}
catch (e)
{ }
//控制菜单8：30--18：00不显示菜单，如不需要的此时内隐藏，注释掉以下代码即可
var showMenu=true;
//var da = new Date();
//if ((da.getHours() == 8 && da.getMinutes() >= 30) || da.getHours() > 8)
// {
    //if (da.getHours() < 18) 
   // {
     //  showMenu=false;
    //}
//}
/*
document.write('<div id="web_top">');
document.write('  <div id="web_bet"></div>');
document.write('  <ul id="web_nav">');
document.write('    <li><span><a href="http://www.win007.com/">首页</a></span>');
//document.write('        <UL style="WIDTH: 160px" class="nav2">');       
//document.write('    <LI><A href="http://www.city007.net/serviceorder.aspx" target="_blank">擂台VIP</A></LI>');
//document.write('    <LI><A href="http://www.win007.com/member.htm" target="_blank">指数VIP</A></LI>');
//document.write('    <LI><A href="http://sms.city007.net/" target="_blank">短信VIP</A></LI>');
//document.write('	<LI><A href="http://wap.win007.com/wap.htm" target="_blank">手机上网</A></LI>');
//document.write('    <LI><A href="http://bf.win007.com/free.aspx" target="_blank">比分调用 </A></LI>');
//document.write('    <LI><A href="http://bf.win007.com/oddsfree.aspx" target="_blank">赔率调用</A></LI>');
//document.write('    <LI><A href="http://ads.win007.com/Market/Index.aspx" target="_blank">营销合作</A></LI>');
//document.write('    <LI><A href="http://ads.win007.com/Market/MarketAdvertisingList.aspx" target="_blank">广告合作</A></LI>');
//document.write('    </UL>');
document.write('    </li>');
document.write('    <li class="d_l"></li>');
document.write('    <li><span><a href="http://live3.win007.com/" target="_blank" ><font color=yellow>即时比分</font></a></span>');
document.write('     <UL style="WIDTH: 160px">');
document.write('    <LI><A href="http://live3.win007.com/" target="_blank">足球</A></LI>');
document.write('    <LI><A href="http://lq2.win007.com/nba.htm" target="_blank">篮球</A></LI>');
document.write('    <LI><A href="http://bf.win007.com/tennis.htm" target="_blank">网球</A></LI>');
document.write('    <LI><A href="http://f1.win007.com/f1_bf.aspx" target="_blank">赛车</A></LI>');
document.write('    <LI><A href="http://sports.win007.com/vollyball.aspx" target="_blank">排球</A></LI> ');
document.write('    <LI><A href="http://sports.win007.com/baseball.aspx" target="_blank">棒球</A></LI>');
document.write('    <LI><A href="http://sports.win007.com/pingpong.aspx" target="_blank">乒乓球</A></LI>');
document.write('    <LI><A href="http://sports.win007.com/shuttlecock.aspx" target="_blank">羽毛球</A></LI>');
document.write('    <LI><A href="http://sports.win007.com/snooker.htm" target="_blank">斯诺克</A></LI>');
document.write('    <LI><A href="http://sports.win007.com/football.aspx" target="_blank">美式足球</A></LI>');
//document.write('    <LI><A href="http://golf.win007.com/golf_bf.aspx" target="_blank">高尔夫</A></LI>');
document.write('    <LI><A href="http://sports.win007.com/hockey.aspx" target="_blank">冰球</A></LI>');
//document.write('    <LI><A href="http://bf.win007.com/TextLive.htm" target="_blank">文字直播</A></LI>');
//document.write('    <LI><A href="http://news.win007.com/Topic/bf/kuize.htm" target="_blank">竞赛规则</A></LI>');
document.write('    </UL>');
document.write('    </li>');
document.write('    <li class="d_l"></li>');
document.write('    <li><span><a href="http://odds1.zqsos.com/" target="_blank">指数</a></span>');
document.write('    <UL style="WIDTH: 160px">');
document.write('    <LI><A href="http://odds1.zqsos.com/" target="_blank">足球指数</A></LI>');
document.write('    <LI><A href="http://nba.win007.com/odds/index.aspx" target="_blank">篮球指数</A></LI>');
document.write('    <LI><A href="http://odds1.zqsos.com/betfa/index.aspx" target="_blank">必发指数</A></LI>');
document.write('    <LI><A href="http://am.win007.com/" target="_blank">澳彩原版</A></LI>');
document.write('    <LI><A href="http://op.win007.com/" target="_blank">足球百家</A></LI>');
document.write('    <LI><A href="http://nba.win007.com/1x2/" target="_blank">篮球百家</A></LI>');
document.write('    <LI><A href="http://zq.win007.com/cn/LletGoal/36.html" target="_blank">让球盘路</A></LI>');
document.write('    <LI><A href="http://61.143.225.173:88/champion/index.aspx" target="_blank">冠军指数</A></LI>');
document.write('    </UL>');
document.write('    </li>');
document.write('    <li class="d_l"></li>');
document.write('    <li><span><a href="http://zq.win007.com/" target="_blank">资料库</a></span>');
document.write('    <UL style="WIDTH: 160px">');           
document.write('    <LI><A href="http://zq.win007.com/info/index.htm" target="_blank">足球资料库</A></LI>');
document.write('    <LI><A href="http://nba.win007.com/" target="_blank">篮球资料库</A></LI>');
//document.write('    <LI><A href="http://golf.win007.com/sclass/schedule2009_3.html" target="_blank">高尔夫</A></LI>');
document.write('    <LI><A href="http://f1.win007.com/Result.aspx" target="_blank">F1赛车</A></LI>');
document.write('    <LI><A href="http://tennis1.win007.com/index.htm" target="_blank">网球</A></LI>');
document.write('    <LI><A href="http://sports.win007.com/SnookerDB.aspx" target="_blank">斯诺克</A></LI>');
document.write('    <LI><A href="http://sports.win007.com/BB_Default.aspx?SclassID=1" target="_blank">棒球</A></LI>');
document.write('    <LI><A href="http://sports.win007.com/Default.aspx?SclassID=187" target="_blank">冰球</A></LI>');
document.write('    <LI><A href="http://sports.win007.com/FB_Default.aspx?SclassID=1" target="_blank">美式足球</A></LI>');
document.write('    <LI><A href="http://zq.win007.com/league_match/league_vs/2011-2012/36.htm" target="_blank">英超</A></LI>');
document.write('    <LI><A href="http://zq.win007.com/league_match/league_vs/2011-2012/34.htm" target="_blank">意甲</A></LI>');
document.write('    <LI><A href="http://zq.win007.com/league_match/league_vs/2011-2012/8.htm" target="_blank">德甲</A></LI>');
document.write('    <LI><A href="http://zq.win007.com/league_match/league_vs/2011-2012/31.htm" target="_blank">西甲</A></LI>');
document.write('    <LI><A href="http://zq.win007.com/league_match/league_vs/2011-2012/11.htm" target="_blank">法甲</A></LI>');
document.write('    <LI><A href="http://zq.win007.com/cup_match/2011-2012/cupmatch_vs/cupmatch_103.htm" target="_blank">欧冠杯</A></LI>');
document.write('    <LI><A href="http://nba.win007.com/League/index_cn.aspx?SclassID=1" target="_blank">NBA</A></LI>');
document.write('    <LI><A href="http://zq.win007.com/cn/LletGoal/36.html" target="_blank">盘路</A></LI>');
document.write('    <LI><A href="http://zq.win007.com/cn/zh/yingchao.html" target="_blank">转会记录</A></LI>');
document.write('    <LI><A href="http://zq.win007.com/cn/paiming.html" target="_blank">世界排名</A></LI>');
document.write('    <LI><A href="http://zq.win007.com/zhibo.html" target="_blank">电视直播表</A></LI>');
document.write('    </UL>');
document.write('    </li>');
document.write('    <li class="d_l"></li>');
document.write('    <li><span><a href="http://news.win007.com/football.html" target="_blank">前瞻</a></span>');
document.write('    <UL style="WIDTH: 160px">');
document.write('    <LI><A href="http://news.win007.com/football.html" target="_blank">足球前瞻</A></LI>');
document.write('    <LI><A href="http://news.win007.com/basketball.html" target="_blank">篮球前瞻</A></LI>');
document.write('    </UL>');
document.write('    </li>');
if(showMenu)
{
document.write('    <li class="d_l"></li>');
document.write('    <li><span><a href="http://cp.win007.com/" target="_blank">彩票</a></span>');
document.write('    </li>');
//document.write('    <li class="d_l"></li>'); 
//document.write('    <li><span><a href="http://www.310tv.com" target="_blank">直播</a></span>');
//document.write('    </li>');
document.write('    <li class="d_l"></li>');
document.write('   <li><span><a class="ddl" href="http://guess1.win007.com/" target="_blank">足球亚盘王<i>&nbsp;</i></a></span><ul style="WIDTH: 90px"><li><a style="width:90px;" href="http://guess1.win007.com/running/" target="_blank">足球滚盘王</a></li><li><a style="width:90px;" href="http://guess1.win007.com/jingcai/" target="_blank">足球竞彩王</a></li><li><a style="width:90px;" href="http://guess1.win007.com/bodan/" target="_blank">足球波胆王</a></li><li><a style="width:90px;" href="http://guess1.win007.com/basket/" target="_blank">篮球亚盘王</a></li></ul>');
document.write('    </li>');
document.write('    <li class="d_l"></li>'); 
document.write('    <li><span><a href="http://ba1.win007.com/" target="_blank">球吧</a></span><ul style="WIDTH: 160px"><li><a href="http://ba1.win007.com/" target="_blank">球吧</a></li><li><a href="http://v.win007.com/" target="_blank">V竞彩</a></li></ul>');
document.write('    </li>');
document.write('    <li class="d_l"></li>');
document.write('    <li><span><a href="http://www.igame007.com/" target="_blank">游戏</a></span><ul style="WIDTH: 160px"><li><a href="http://www.igame007.com/manager/" target="_blank">体育经理</a></li><li><a href="http://www.igame007.com/dezhoupuke/" target="_blank">德州扑克</a></li></ul><div style="position:absolute;left:560px;top:-7px;"><img src="http://www.win007.com/Images/jc/cj_new.gif" width="16" height="17" /></div>');
document.write('    </li>');
}
else
{
document.write('    <li class="d_l"></li>');
document.write('   <li><span><a class="ddl" href="http://guess1.win007.com/" target="_blank">足球亚盘王<i>&nbsp;</i></a></span><ul style="WIDTH: 90px"><li><a style="width:90px;" href="http://guess1.win007.com/running/" target="_blank">足球滚盘王</a></li><li><a style="width:90px;" href="http://guess1.win007.com/jingcai/" target="_blank">足球竞彩王</a></li><li><a style="width:90px;" href="http://guess1.win007.com/basket/" target="_blank">篮球亚盘王</a></li></ul>');
document.write('    </li>');
document.write('    <li class="d_l"></li>'); 
document.write('    <li><span><a href="http://ba1.win007.com/" target="_blank">球吧</a></span><ul style="WIDTH: 160px"><li><a href="http://ba1.win007.com/" target="_blank">球吧</a></li><li><a href="http://v.win007.com/" target="_blank">V竞彩</a></li></ul>');
document.write('    </li>');
}
document.write('    <li class="d_l"></li>');
document.write('    <li><span><a href="http://forum.win007.com/" target="_blank">社区</a></span>');
document.write('    </li>');
document.write('    </ul>');
document.write('  </div>');
document.write('  <div style="clear:both"></div>');
document.write('</div>');

//版头
document.writeln("  <div id='ad'>");
//if(window.location.href.toLowerCase().indexOf("nba")>0 || window.location.href.toLowerCase().indexOf("basket")>0) {
//	document.writeln("");
//	document.writeln("");
//        document.writeln("<a href='http://www.838555.com/' target='_blank'><img src='http://img.win007.com/ad/838555.gif' border='0'></a>    <a href='http://www.365tylc.com/' target='_blank'><img src='http://img2.win007.com/image/365tylc.gif' border='0'></a>");

//}
if(window.location.href.toLowerCase().indexOf("sport")>0 ||window.location.href.toLowerCase().indexOf("tennis")>0 ||window.location.href.toLowerCase().indexOf("golf")>0 ||window.location.href.toLowerCase().indexOf("f1")>0) {
}
else{
}
document.writeln("    <div style='clear:both'></div>");
document.writeln("  </div>");
document.writeln("</div>");
*/

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}
if (!window.createPopup) {
    var __createPopup = function() {
        var SetElementStyles = function(element, styleDict) {
            var style = element.style;
            for (var styleName in styleDict) style[styleName] = styleDict[styleName];
        }
        var eDiv = document.createElement('div');
        SetElementStyles(eDiv, { 'position': 'absolute', 'top': 0 + 'px', 'left': 0 + 'px', 'width': 0 + 'px', 'height': 0 + 'px', 'zIndex': 1000, 'display': 'none', 'overflow': 'hidden' });
        eDiv.body = eDiv;
        var opened = false;
        var setOpened = function(b) {
            opened = b;
        }
        var getOpened = function() {
            return opened;
        }
        var getCoordinates = function(oElement) {
            var coordinates = { x: 0, y: 0 };
            while (oElement) {
                coordinates.x += oElement.offsetLeft;
                coordinates.y += oElement.offsetTop;
                oElement = oElement.offsetParent;
            }
            return coordinates;
        }
        return { htmlTxt: '',
            document: eDiv,
            isOpen: getOpened(),
            isShow: false,
            hide: function() {
                SetElementStyles(eDiv, { 'top': 0 + 'px', 'left': 0 + 'px', 'width': 0 + 'px', 'height': 0 + 'px', 'display': 'none' });
                eDiv.innerHTML = '';
                this.isShow = false;
            },
            show: function(iY, iX, iWidth, iHeight, oElement) {
                if (!getOpened()) {
                    document.body.appendChild(eDiv); setOpened(true);
                };
                this.htmlTxt = eDiv.innerHTML;
                if (this.isShow) { this.hide(); };
                eDiv.innerHTML = this.htmlTxt;
                var coordinates = getCoordinates(oElement);
                eDiv.style.top = (iX + coordinates.x) + 'px';
                eDiv.style.left = (iY + coordinates.y) + 'px';
                eDiv.style.width = iWidth + 'px';
                eDiv.style.height = iHeight + 'px';
                eDiv.style.display = 'block';
                this.isShow = true;
            }
        }
    }
    window.createPopup = function() {
        return __createPopup();
    }
}
function getCookie22(name)
{
	var cname = name + "=";
	var dc = document.cookie;
	if (dc.length > 0) 
	{
		begin = dc.indexOf(cname);
		if (begin != -1) 
		{
			begin += cname.length;
			end = dc.indexOf(";", begin);
			if (end == -1) end = dc.length;
			return dc.substring(begin, end);
		}
	}
	return null;
}
function getCookie(name) {
    var cname = name;
    var dc = document.cookie;
    if (dc.length > 0) {
        var arrCook = dc.split(';');
        for (var i = 0; i < arrCook.length; i++) {
            arrCook[i] = arrCook[i].replace(/^\s+|\s+$/g, "");
            var arrOne = arrCook[i].split('=');
            if (arrOne.length > 1) {
                if (arrOne[0] == cname)
                    return arrOne[1];
            }
        }
    }
    return null;
}
function writeCookie(name, value) 
{ 
	var expire = ""; 
	var hours = 365;
	expire = new Date((new Date()).getTime() + hours * 3600000); 
	expire = ";path=/;expires=" + expire.toGMTString(); 
	document.cookie = name + "=" + value + expire; //escape(
}

//显示进球窗口
var startani_C,startani_A,startani_B,pop_TC;
var oPopup;
try{ oPopup=window.createPopup();}
catch(e){}

function ShowCHWindow(str,matchnum)
{
imagewidth=481;
imageheight=28+34*matchnum ;
var st;

st="<table width=480 border=0 cellpadding=1 cellspacing=0 bgcolor=#E0B22B>";
st=st + "  <tr><td><table width=478 border=0 cellpadding=0 cellspacing=0>";
st=st + "      <tr><td colspan=6><img src=http://live3.win007.com/image/bf_open.gif width=478></td></tr>";
st=st + str;
// st=st + "<tr bgcolor=#FFFFFF height=20 align=center><td colspan=6><font color=red>广告：</font><font color=blue>编辑88</font></td></tr>";
st=st + "    </table></td>";
st=st + "  </tr>";
st=st + "</table>";  
st=st + "<style type='text/css'>";
st=st + "td {font-family: 'Tahoma', '宋体';font-size: 13px;}";
st=st + ".line td { border-bottom:solid 1px #FFD8CA; line-height:32px;}";
st=st + "</style>";

x=280;
y=1;
var winLoc=0;
try {winLoc=document.getElementById("winLocation").selectedIndex;}
catch(e){}
switch(winLoc)
{			
    case 0:
        x=(screen.width-imagewidth)/2;
        y=1;
        break;
    case 1:
        x=(screen.width-imagewidth)/2;
        y=screen.height-imageheight-30;
        break;
    case 2:
        x=2;
        y=(screen.height-imageheight)/2;
        break;
    case 3:
        x=screen.width-imagewidth-2;
        y=(screen.height-imageheight)/2;
        break;
    case 4:
        x=1;
        y=1;
        break;
    case 5:
        x=screen.width-imagewidth-2;
        y=1;
        break;
    case 6:
        x=1;
        y=screen.height-imageheight-30;
        break;
    case 7:
        x=screen.width-imagewidth-2;
        y=screen.height-imageheight-30;
        break;
}

oPopupBody = oPopup.document.body;
oPopupBody.innerHTML = st;
oPopupBody.style.cursor="pointer";
oPopupBody.title = "点击关闭";
oPopupBody.onclick=dismisspopup;
oPopupBody.oncontextmenu=dismisspopup;
pop_TC=40;
pop();
}

function pop(){
  try{
	oPopup.show(x,y,imagewidth, imageheight);
	startani_A=setTimeout("pop()",300);  //显示15秒
	if(pop_TC<0){dismisspopup();};
	pop_TC=pop_TC-1;
  }catch(e){}
}
function dismisspopup()
{	clearTimeout(startani_A);
	oPopup.hide();
}

function showgoallist(ID) {
    var theUrl;
    try {
        if (Config.language == 0)
            theUrl = "http://live3.win007.com/detail/" + ID + "cn.htm";
        else
            theUrl = "http://live3.win007.com/detail/" + ID + ".htm";
    }
    catch (e) {
        if (location.href.split('_').length == 2)
            theUrl = "http://live3.win007.com/detail/" + ID + "cn.htm";
        else
            theUrl = "http://live3.win007.com/detail/" + ID + ".htm";
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

function TeamPanlu_10(ID)
{
    var	theURL="http://bf.win007.com/panlu/" + ID + ".htm";
	window.open(theURL,"","width=640,height=700,top=10,left=100,resizable=yes,scrollbars=yes");
}
function advices(ID)
{
    var theURL = "http://news.win007.com/qingbao/football_" + ID+".html";
	window.open(theURL);
}



var zXml = {
    useActiveX: (typeof ActiveXObject != "undefined"),
    useXmlHttp: (typeof XMLHttpRequest != "undefined")
};

zXml.ARR_XMLHTTP_VERS = ["MSXML2.XmlHttp.6.0","MSXML2.XmlHttp.3.0"];

function zXmlHttp() {}

zXmlHttp.createRequest = function ()
{
    /*if (zXml.useXmlHttp)  return new XMLHttpRequest();

    if(zXml.useActiveX)  //IE < 7.0 = use ActiveX
    {  
        if (!zXml.XMLHTTP_VER) {
            for (var i=0; i < zXml.ARR_XMLHTTP_VERS.length; i++) {
                try {
                    new ActiveXObject(zXml.ARR_XMLHTTP_VERS[i]);
                    zXml.XMLHTTP_VER = zXml.ARR_XMLHTTP_VERS[i];
                    break;
                } catch (oError) {}
            }
        }        
        if (zXml.XMLHTTP_VER) return new ActiveXObject(zXml.XMLHTTP_VER);
    } 
    alert("对不起，您的电脑不支持 XML 插件，请安装好或升级浏览器。");*/
};