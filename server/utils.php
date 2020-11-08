
<?php


function getDataPath()
{

    return 'data';
}

function writeCSV($path, $data, $header)
{

    $fp = fopen($path, 'w');
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

?>