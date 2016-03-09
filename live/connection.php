<?php
/**
 * Created by PhpStorm.
 * User: Jeff
 * Date: 2016/3/3
 * Time: 上午 10:18
 */
define("DB_SERVER", "localhost");
define("DB_USERNAME", "jeff");
define("DB_PASSWORD", "no0818");
define("DB_DBNAME", "test");

$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DBNAME);

//Check connection
if (mysqli_connect_errno()) {
    die("Failed to connect to MySQL: " . mysqli_connect_error());
}else{
    $link->set_charset('utf8');
}