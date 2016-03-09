<html>
<head>
    <meta charset="UTF-8"><link href="style.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="jquery.timer.js"></script>
    <script type="text/javascript" src="functions.js"></script>
    <script type="text/javascript">

        function updateLiveData() {
            var dfd = $.Deferred();

            function fetch(index) {
                $.get('getLiveUpdate.php?sport=soccer', function(data) {
                    if (data != "") {
                        $("#livedata").html(data);
                        console.log("Something changed");
                    }else{
                        console.log("Nothing changed");
                    }
                });
            }
            dfd.then(null, fetch(0));
            return dfd;
        }
        //var intervalID = window.setInterval(updateLiveData, 1000);

    </script>
</head>

<body>

</body>

</html>