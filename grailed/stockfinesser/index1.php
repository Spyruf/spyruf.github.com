<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="Fudong Fan">

    <title>Final Project</title>

    <script type="text/javascript">   
      function cursor() {
        document.getElementById("ticker").focus();
        document.getElementById("ticker ").select();
      }
    </script>
    <!-- Bootstrap core CSS -->
    <link href="../../css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body onload="cursor()">

    <div class="container text-center">
     
      <h1>Quotes, Charts, &amp; Headlines, Oh Mai!</h1> <br>
        <div class="row">
          <form action="" method="get" class="form-inline">
            <div class="form-group">
              <!--<label for="ticker">Quote Lookup</label>-->
              <input type="text" required class="form-control" id="ticker" name="ticker" placeholder="Enter a ticker">
            </div>
            <div class="form-group">
              <label for="timespan">Time Span</label>
              <select id="timespan" name="timespan" class="form-control">
                <option>1 Day</option>
                <option>5 Days</option>
                <option>3 Months</option>
                <option>6 Months</option>
                <option>1 Year</option>
                <option>2 Years</option>
                <option>5 Years</option>
                <option>Maximum</option>
              </select>
            </div>
            <div class="form-group">
              <label for="chartType">Chart Type</label>
              <select id="chartType" name="chartType" class="form-control">
                <option>Line</option>
                <option>Bar</option>
                <option>Candle</option>
              </select>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" name="log"> Logarithmic Scale
              </label>
            </div>
            <button type="submit" class="btn btn-primary">Go</button>
          </form>
        </div><br>
        <div class="row">
          <div class="col-md-6">
            <h2>Summary</h2>
            <?php
              $ticker = strtoupper($_GET["ticker"]);
              $timespan = $_GET["timespan"];

              $csvURL = "http://finance.yahoo.com/d/quotes.csv?s=";

              if($ticker != ""){
                $csvURL = $csvURL . $ticker . "&f=nabpomw";
                $csv = str_getcsv(file_get_contents($csvURL));
                echo "<h3>" . $csv[0] . " (".$ticker . ")". "</h3>";
                echo "<strong>Prev Close: " . $csv[3] . "</strong><br>";
                echo "<strong>Open: " . $csv[4] . "</strong><br>";
                echo "<strong>Day's Range: " . $csv[5] . "</strong><br>";
                echo "<strong>52wk Range: " . $csv[6] . "</strong><br>";                
                echo "<strong>Bid: " . $csv[2] . "</strong><br>";     
                echo "<strong>Ask: " . $csv[1] . "</strong><br><br>";
                 
              }

              if ($timespan == "1 Day") {
                $timespan = "1d";
              }
              if ($timespan == "5 Days") {
                $timespan = "5d";
              }
              if ($timespan == "3 Months") {
                $timespan = "3m";
              }
              if ($timespan == "6 Months") {
                $timespan = "6m";
              }
              if ($timespan == "1 Year") {
                $timespan = "1y";
              }
              if ($timespan == "2 Years") {
                $timespan = "2y";
              }
              if ($timespan == "5 Years") {
                $timespan = "5y";
              }
              if ($timespan == "Maximum") {
                $timespan = "my";
              }
              $chartType = $_GET["chartType"];
              if($chartType=="Line"){
                $chartType = "l";
              }
              if($chartType=="Bar"){
                $chartType = "b";
              }
              if($chartType=="Candle"){
                $chartType = "c";
              }

              $log="off";
              if(isset($_GET["log"])== true)
                $log = "on";
              if($ticker != "")
                echo "<img src=\"http://chart.finance.yahoo.com/z?s=". $ticker ."&t=".$timespan."&q=". $chartType ."&l=" . $log. "\">";

            ?>
          </div>
          <div class="col-md-6">
            <h2>Headlines</h2>

          </div>
        </div>
        <h4>See what others are searching: </h4>
        <?php 
        $db = new SQLite3('queries.db');
        $query = "SELECT * FROM t ORDER BY ROWID DESC LIMIT 5";
        $result = $db->query($query);
        $searches = "";
        while($row = $result -> fetchArray()){
        $searches = $searches . $row[0] . ", ";
        }
        $print = substr($searches, 0, -2);
        echo $print;
                      if($ticker != ""){

        $query = "INSERT INTO t (ticker) VALUES ('$ticker')";
        $db->exec($query);
      }
        ?>
      <br><br><a href="../">Back to home</a>
      <br><a href="code.php">View source code</a>
    </div>

    <!-- /.container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <!-- jQuery -->
    <script src="../../js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="../../js/bootstrap.min.js"></script>
  </body>
</html>