<html>
<head>

</head>

<body>
<?php
    session_start();
    echo filemtime("soccer_last.htm");
    echo "<br>";
    echo "Last modified: ".date("Y-m-d H:i:s.",filemtime("soccer_last.htm"));
    echo "<br>";
    echo filemtime("soccer.htm");
    echo "<br>";
    echo "Last modified: ".date("Y-m-d H:i:s.",filemtime("soccer.htm"));
    $_SESSION["LastUpdateTime"] = filemtime("soccer.htm");
    echo "<br>";
    echo $_SESSION["LastUpdateTime"];
?>
</body>
</html>