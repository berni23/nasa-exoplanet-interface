
<?php

session_start();

include "utils.php";

$endpoint = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?';
$api_key = 'ZCrKb54pVc2uAAtKJ2lTo7v9hPSKloPXkenCr1X8';
$dataPath = $_SESSION['data_path'];

if (isset($_GET['data'])) {

    $path = $dataPath . '/' . $_GET['data'] . '.csv';
    if (file_exists($path)) echo 'data already avaliable';

    else {

        $table = file_get_contents($endpoint . "?api_key=" . $api_key . "&table=" . $_GET['data'] . "&format=json");
        $data = json_decode($table, true);
        $header = array_keys($data[0]);
        $status = writeCSV($path, $data, $header);
        echo $status;
    }
}
?>