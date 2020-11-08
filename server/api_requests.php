
<?php


session_start();

include "utils.php";


$endpoint = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?';
$api_key = 'ZCrKb54pVc2uAAtKJ2lTo7v9hPSKloPXkenCr1X8';
$dataPath = getDataPath();

if (isset($_GET['data'])) {


    $path = $dataPath . '/' . $_GET['data'] . '.csv';

    if (file_exists($path)) echo 'data already avaliable';

    else {

        $data = json_decode(file_get_contents($endpoint . "?api_key=" . $api_key . "table=" . $_GET['data'] . "&format=json"), true);
        $firstRow = $data[0];
        $header = array_keys($firstRow);
        $status = writeCSV($path, $data, $header);
        echo $status;
    }
}
?>