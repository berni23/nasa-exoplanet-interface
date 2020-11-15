<?php

session_start();

include "utils.php";
$endpoint_archive = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?';
$endpoint_picture = 'https://api.nasa.gov/planetary/apod';
$api_key = 'ZCrKb54pVc2uAAtKJ2lTo7v9hPSKloPXkenCr1X8';
$dataPath = $_SESSION['data_path'];

if (isset($_GET['ask'])) {
    if (!file_exists($dataPath)) {
        mkdir($dataPath);
        chmod($dataPath, 0755);
    }
    $path = $dataPath . '/' . $_GET['ask'] . '.csv';
    if (file_exists($path))  echo json_encode(array("exists" => true, "message" => 'The data fetched from the NASA api was updated on  ' . date("F d Y H:i:s.", filemtime($path)) .  ' Do you want to update it now? Press cancel to continue with the current data'));
    else echo json_encode(array("exists" => false, "message" => "data not found"));
}
if (isset($_GET['data'])) {
    $path = $dataPath . '/' . $_GET['data'] . '.csv';
    $table = file_get_contents($endpoint_archive . "?api_key=" . $api_key . "&table=" . $_GET['data'] . "&format=json");
    $data = json_decode($table, true);
    $header = array_keys($data[0]);
    chmod($path, 0755);
    $status = writeCSV($path, $data, $header);
    echo $status;
}

if (isset($_GET['picture'])) {
    $today = json_decode(file_get_contents($endpoint_picture . "?api_key=" . $api_key), true);
    $yesterday = json_decode(file_get_contents($endpoint_picture . "?api_key=" . $api_key . "&date=" . date('Y-m-d', strtotime("-1 days"))), true);

    $today['date'] = date('d F Y');
    $yesterday['date'] = date('d F Y');
    chmod('picture.json', 0755);
    echo json_encode(array('status' => 200, "data" => array("today" => $today, "yesterday" => $yesterday), "date" => array(date('d F Y'), date('d F Y', strtotime("-1 days")))));
}
