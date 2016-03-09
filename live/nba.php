<HTML xmlns="http://www.w3.org/1999/html">

<HEAD>
    <meta charset="UTF-8"><link href="style.css" rel="stylesheet" type="text/css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script type="text/javascript" src="functions.js"></script>
    <script type="text/javascript">
        function updateLiveData(){
            var data;
            $.ajaxSetup({async:false});
            data = $.ajax({
                type: "GET",
                url: 'getLiveUpdate.php?sport=nba',
                async: false
            }).responseText;

            if (data != "") {
                $("#livedata").html(data);
            }else{
                console.log("Nothing changed");
            }
        }

        var intervalID = window.setInterval(updateLiveData, 2000);

    </script>
</HEAD>

<BODY>

<div id="livedata">
    <?php

    require_once("functions.php");

    $url = 'http://'. $_SERVER['SERVER_NAME'] . dirname($_SERVER['REQUEST_URI']).'/getLiveUpdate.php';
    $opts = 'sport=nba&isforce=1';

    $ch = curl_init( $url );
    curl_setopt( $ch, CURLOPT_POST, 1);
    curl_setopt( $ch, CURLOPT_POSTFIELDS, $opts);
    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt( $ch, CURLOPT_HEADER, 0);
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);

    $response = curl_exec( $ch );
    echo $response;

    ?>
</div>
</BODY>
</HTML>