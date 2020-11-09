


<?php
session_start();



if (isset($_GET['login'])) {

    $data = json_decode(file_get_contents('php://input'), true);

    $loggedIn = checkLogin($data);

    if ($loggedIn[0]) {

        $_SESSION['username'] = $loggedIn[1]['username'];
        $_SESSION['token'] = $loggedIn[1]['token'];

        echo json_encode(array("status" => 200, "message" => "login successful"));
    } else   echo json_encode(array("status" => 400, "message" => "username or password incorrect"));
}



function tokenGenerator()
{
    $bytes = random_bytes(15);
    $token = bin2hex($bytes);
    if (in_array($token, getUserTokens())) tokenGenerator();
    else return $token;
}


function getUserTokens()
{
    return array_keys(getUsers());
}

function getUsers()
{
    return  json_decode(file_get_contents("users.json"), true);
}


function checkLogin($dataLogin)
{

    $users = getUsers();
    foreach ($users as $user) {

        if ($user['username'] == $dataLogin['username'] && $user['password'] == $dataLogin['password']) {
            return [true, $user];
        }
    }

    return [false, null];
}
