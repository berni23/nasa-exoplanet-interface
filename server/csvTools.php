


<?php


function writeCSV($path, $data, $header, $option = 'w')
{

    $fp = fopen($path, $option);
    fputcsv($fp, $header);
    $response = "";

    for ($i = 0; $i < count($data); $i++) {
        fputcsv($fp, $data[$i]);
    }
    if ($data && $fp) $response = 'success';
    else  $response = 'error';
    fclose($fp);
    return $response;
};
