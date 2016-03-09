<?php
require_once("functions.php");

$request = array_change_key_case($_REQUEST, CASE_LOWER);
$sport = strtolower($request["sport"]);
if (isset($request["isforce"])) {
    $isforce = $request["isforce"];
}else{
    $isforce = 0;
}
$sportfilename_ad = getSportFileName_AD($sport);
$sportzipfilename_ad = getSportZipFileName_AD($sport);
$lastsportfilename_ad = getLastSportFileName_AD($sport);
$lastsportzipfilename_ad = getLastSportZipFileName_AD($sport);
$data = "";
$ad_url = "http://az517.td22.net";
session_start();

//強制回傳更新資料
if ($isforce == 1) {
    //如果壓縮檔存在，解壓縮
    if (file_exists($sportzipfilename_ad)){
        if (extractZipFile_AD($sport)) {
            $data = getFilteredData_AD($sport, '', $ad_url);
        }
    }
    $_SESSION["ZipLastUpdateTime_AD"] = filemtime($sportzipfilename_ad);
    $_SESSION["LastUpdateTime_AD"] = filemtime($sportfilename_ad);
    //$data = '$_SESSION["LastUpdateTime"]='.$_SESSION["LastUpdateTime"].', filemtime='.filemtime($sportzipfilename)."<br>".$data;
}
//依據資料判斷是否更改回傳資料
else {
    //Zip檔案有更新
    if (filemtime($sportzipfilename_ad) != $_SESSION["ZipLastUpdateTime_AD"]) {
        extractZipFile_AD($sport);
        //解壓縮後的檔案存在
        if (file_exists($sportfilename_ad) && filemtime($sportfilename_ad) != $_SESSION["LastUpdateTime_AD"]) {
            $data = getFilteredData_AD($sport, '', $ad_url);
            $_SESSION["ZipLastUpdateTime_AD"] = filemtime($sportzipfilename_ad);
            $_SESSION["LastUpdateTime_AD"] = filemtime($sportfilename_ad);
            //$data = '$_SESSION["LastUpdateTime"]=' . $_SESSION["LastUpdateTime"] . ', filemtime=' . filemtime($sportzipfilename) . "<br>" . $data;
        }
        //解壓縮後的檔案不存在
        else {
            if (extractZipFile_AD($sport)){
                $data = getFilteredData_AD($sport, '', $ad_url);
                $_SESSION["ZipLastUpdateTime_AD"] = filemtime($sportzipfilename_ad);
                $_SESSION["LastUpdateTime_AD"] = filemtime($sportfilename_ad);
                //$data = '$_SESSION["LastUpdateTime"]=' . $_SESSION["LastUpdateTime"] . ', filemtime=' . filemtime($sportzipfilename) . "<br>" . $data;
            }
        }
    }
}

echo $data;
