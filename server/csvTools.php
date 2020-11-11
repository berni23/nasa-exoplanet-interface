


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

function getColumns($colname, $arrayNames = [], $path)
{

    if (($fh = fopen($path, "r+")) !== false) {
        $header = fgetcsv($fh, 1000, ",");
        $num_cols = array();
        $col_data = array();
        $array_num_cols = array();

        foreach ($colname as $name) {
            array_push($num_cols, array_search($name, $header));
            $col_data[$name] = array();
        }

        foreach ($arrayNames as $col)  array_push($array_num_cols, array_search($col, $header));
        while (($data = fgetcsv($fh, 1000, ",")) !== false) {

            $push = true;
            foreach ($array_num_cols as $num) {
                if (!$data[$num]) {
                    $push = false;
                    break;
                }
            }

            if ($push) {
                foreach ($num_cols as $num) {
                    array_push($col_data[$colname[$num]], $data[$num]);
                }
            }
        }
        return array("status" => 200, "message" => "data successfully downloaded", "data" => $col_data);
    } else  return array("status" => 400, "message" => "data not found", "data" => null);
}

function getColumn($colname, $path)
{
    if (($fh = fopen($path, "r+")) !== false) {
        $header = fgetcsv($fh, 1000, ",");
        $num_col = array_search($colname, $header);
        $col_data = array();
        while (($data = fgetcsv($fh, 1000, ",")) !== false) {
            array_push($col_data, $data[$num_col]);
        }
    }
    return array("status" => 200, "message" => "data successfully downloaded", "data" => array($colname => $col_data));
}
