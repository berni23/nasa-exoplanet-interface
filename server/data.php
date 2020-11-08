
<?php



if (isset($_GET['data'])) {


    //&format=csv
    $xml = json_decode(file_get_contents("https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?api_key=ZCrKb54pVc2uAAtKJ2lTo7v9hPSKloPXkenCr1X8&table=exoplanets&format=json"));
    $fp = fopen('data/exoplanets.csv', 'w');


    fputcsv($fp, $xml);
    fclose($fp);
}






?>