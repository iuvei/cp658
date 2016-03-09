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

        function updateLiveData_DB() {
            var dfd = $.Deferred();
            var next_tr,prev_tr;

            function fetch(index) {
                $.getJSON('getLiveUpdate_DB.php?sport=soccer', function(data) {
                    if (data.length > 0) {
                        console.log("Something changed");
                        $.each(data, function (index, value){
                            console.log(value.trID + ', ChangeType=' + value.ChangeType + ", index=" + $("#"+value.trID).attr("index"));

                            switch(value.ChangeType.toUpperCase()){
                                case 'M':
                                    $("#" + value.trID).replaceWith(value.trData);
                                    break;
                                case 'A':
                                    break;
                                case 'D':
                                    $("#" + value.trID).remove();
                                    //刪除時，如果上、下列是廣告的話，一併刪除
                                    if (!value.trID.trim() && value.trID.length >0) {
                                        prev_tr = $("#" + value.trID).prev();
                                        next_tr = $("#" + value.trID).next();
                                        if ($(next_tr).attr('id').substr(0, 5) === 'tr_ad') {
                                            $(next_tr).remove();
                                        }
                                        if ($(prev_tr).attr('id').substr(0, 5) === 'tr_ad') {
                                            $(prev_tr).remove();
                                        }
                                    }
                                    break;
                            }
                        })
                    }else{
                        console.log("Nothing changed");
                    }
                });
            }
            dfd.then(null, fetch(0));
            return dfd;
        }
        var intervalID = window.setInterval(updateLiveData_DB, 1000);

        function test(){
            var next_tr;
            //console.log($("#tr2_1216422").next().attr('id'));
            next_tr = $("#tr2_1160959").next();
            console.log($(next_tr).attr('id'));
            if ($(next_tr).attr('id').substr(0,5) === 'tr_ad'){
                $(next_tr).remove();
            }
        }
    </script>
</HEAD>

<BODY>
<!--<button onclick="test();">aaaaaa</button>-->
<div id="livesoccer_ad">
    <?php

    require_once("functions.php");

    $url = 'http://'. $_SERVER['SERVER_NAME'] . dirname($_SERVER['REQUEST_URI']).'/getLiveFullData_DB.php';
    $opts = 'sport=soccer';
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