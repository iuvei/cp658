<HTML xmlns="http://www.w3.org/1999/html">

<HEAD>
    <meta charset="UTF-8"><link href="style.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="jquery.timer.js"></script>
    <script type="text/javascript" src="functions.js"></script>

    <script type="text/javascript">
        /*
         function updateLiveData(){
         var data;
         $.ajaxSetup({async:true});
         data = $.ajax({
         type: "GET",
         url: 'getLiveUpdate.php?sport=soccer',
         async: false
         }).responseText;

         if (data != "") {
         $("#livedata").html(data);
         console.log("Something changed");
         }else{
         console.log("Nothing changed");
         }
         }
         var intervalID = window.setInterval(updateLiveData, 2000);
         */

        function updateLiveData_AD() {
            var dfd = $.Deferred();

            function fetch(index) {
                $.get('getLiveUpdate_AD.php?sport=soccer', function(data) {
                    if (data != "") {
                        $("#livesoccer_ad").html(data);
                        console.log("Something changed");
                    }else{
                        console.log("Nothing changed");
                    }
                });
            }
            dfd.then(null, fetch(0));
            return dfd;
        }
        var intervalID = window.setInterval(updateLiveData_AD, 1000);

    </script>
</HEAD>

<BODY>

<div id="livesoccer_ad">
    <?php

    require_once("functions.php");

    $url = 'http://'. $_SERVER['SERVER_NAME'] . dirname($_SERVER['REQUEST_URI']).'/getLiveUpdate_AD.php';
    $opts = 'sport=soccer&isforce=1';
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