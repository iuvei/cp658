<?php

require_once("connection.php");
require_once("functions.php");

//取得request的值
$request = array_change_key_case($_REQUEST, CASE_LOWER);

//取得比賽項目
$sport = strtolower($request["sport"]);

//取得上次更新日期
session_start();
//$changetime = $_SESSION["ChangeTime"];
$changetime = '2016/03/01 18:03:03';

$ad_url = "http://az517.td22.net";


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
$_SESSION["ChangeTime"] = $data["ChangeTime"];
$link->close();

echo $data["Data"];

?>