<?php

require_once("connection.php");
require_once("functions.php");

//取得request的值
$request = array_change_key_case($_REQUEST, CASE_LOWER);

//取得比賽項目
$sport = strtolower($request["sport"]);

//取得上次更新日期
session_start();
$changetime = $_SESSION["ChangeTime"];
//$changetime = '2016/03/01 18:03:03';
//$changetime = '2016/03/02 14:47:23';
$ad_url = "http://az517.td22.net";

//確認是否有符合時間的記錄
$sql = "SELECT DISTINCT ChangeTime FROM LiveTableData WHERE ChangeTime = ?";
$stmt = $link->prepare($sql);
$stmt->bind_param('s', $changetime);
$stmt->execute();
$stmt->bind_result($myChangeTime);
$stmt->fetch();
$stmt->close();

//沒有符合時間的記錄，傳回全部資料
if (!$myChangeTime){
    /**
     * sp_GetLatestFullData
     * parameters:
     *      IN param1 => Sport(String)
     * returns:
     *      The latest full data include advertisements and javascript code
     */
    $sql = "CALL sp_GetLatestFullData('" . $sport . "')";
    $res = $link->query($sql);
    $data = $res->fetch_assoc();
    $data["Data"] = getFilteredData_AD($sport, $data["Data"], $ad_url);
    $data["Data"] = urlencode($data["Data"]);
    $link->close();
    $jsondata["ResultType"] = "FullData";
    $jsondata["Data"] = $data["Data"];
    echo urldecode(json_encode($jsondata));
}
//有符合時間的記錄，傳回差異資料
else {
    /**
     * sp_GetLiveTableDiff
     * parameters:
     *      IN param1 => Sport(String)
     *      IN param2 => ChangeTime(DateTime)
     *      OUT param3 => @LastChangeTime(DateTime)
     * returns:
     *      The data need to update
     */
    $sql = "CALL sp_GetLiveTableDiff('" . $sport . "', '" . $changetime . "', @LastChangeTime); SELECT @LastChangeTime AS LastChangeTime;";
    if (mysqli_multi_query($link, $sql)) {
        //將異動的資料存到陣列
        $data = array();
        $result = mysqli_store_result($link);
        while ($row = mysqli_fetch_assoc($result)){
            //$row["trData"] = urlencode($row["trData"]);
            array_push($data, $row);
        }
        mysqli_free_result($result);

        //需要兩次next_result()才能取得下個資料集，可能是mysqli的bug
        mysqli_next_result($link);
        mysqli_next_result($link);
        $result = mysqli_store_result($link);
        $row = mysqli_fetch_assoc($result);
        $_SESSION["ChangeTime"] = $row["LastChangeTime"];
        mysqli_free_result($result);
    }
    mysqli_close($link);
    //$jsondata["ResultType"] = "DiffData";
    //$jsondata["Data"] = $data;
    //echo urldecode(json_encode($jsondata));
    echo json_encode($data);
}

?>