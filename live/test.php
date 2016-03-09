<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>


<body>
<?php

$link = mysqli_connect('localhost', 'jeff', 'no0818', 'test');
$link->set_charset('utf8');

$sql = "SELECT * FROM LiveTableData LIMIT 10; SELECT '2016-03-02 12:05:01' AS LastChangeTime";
echo $query;
if (mysqli_multi_query($link, $sql)) {
    echo "aaaaaaaaaaaaaaaaaaaaaaaaaaa";

    //將異動的資料存到陣列
    $data = array();
    $result = mysqli_store_result($link);
    while ($row = mysqli_fetch_assoc($result)){
        $row["trData"] = urlencode($row["trData"]);
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
}else{
    echo "bbbbbbbbbbbbb";
}
mysqli_close($link);
$jsondata["ResultType"] = "DiffData";
$jsondata["Data"] = $data;
echo urldecode(json_encode($jsondata));

?>
</body>


</html>