<?php
require_once("functions.php");

$request = array_change_key_case($_REQUEST, CASE_LOWER);
$sport = strtolower($request["sport"]);
if (isset($request["isforce"])) {
    $isforce = $request["isforce"];
}else{
    $isforce = 0;
}
$sportfilename = getSportFileName($sport);
$sportzipfilename = getSportZipFileName($sport);
$lastsportfilename = getLastSportFileName($sport);
$lastsportzipfilename = getLastSportZipFileName($sport);
$data = "";

session_start();

//強制回傳更新資料
if ($isforce == 1) {
    //如果壓縮檔存在，解壓縮
    if (file_exists($sportzipfilename)){
        if (extractZipFile($sport)) {
            $data = getFilteredData($sport);
        }
    }
    $_SESSION["ZipLastUpdateTime"] = filemtime($sportzipfilename);
    $_SESSION["LastUpdateTime"] = filemtime($sportfilename);
    //$data = '$_SESSION["LastUpdateTime"]='.$_SESSION["LastUpdateTime"].', filemtime='.filemtime($sportzipfilename)."<br>".$data;
}
//依據資料判斷是否更改回傳資料
else {
    //Zip檔案有更新
    if (filemtime($sportzipfilename) != $_SESSION["ZipLastUpdateTime"]) {
        extractZipFile($sport);
        //解壓縮後的檔案存在
        if (file_exists($sportfilename) && filemtime($sportfilename) != $_SESSION["LastUpdateTime"]) {
            $data = getFilteredData($sport);
            $_SESSION["ZipLastUpdateTime"] = filemtime($sportzipfilename);
            $_SESSION["LastUpdateTime"] = filemtime($sportfilename);
            //$data = '$_SESSION["LastUpdateTime"]=' . $_SESSION["LastUpdateTime"] . ', filemtime=' . filemtime($sportzipfilename) . "<br>" . $data;
        }
        //解壓縮後的檔案不存在
        else {
            if (extractZipFile($sport)){
                $data = getFilteredData($sport);
                $_SESSION["ZipLastUpdateTime"] = filemtime($sportzipfilename);
                $_SESSION["LastUpdateTime"] = filemtime($sportfilename);
                //$data = '$_SESSION["LastUpdateTime"]=' . $_SESSION["LastUpdateTime"] . ', filemtime=' . filemtime($sportzipfilename) . "<br>" . $data;
            }
        }
    }
}

echo $data;
