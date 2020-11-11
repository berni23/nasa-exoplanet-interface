<?php
session_start();

$data = json_decode(file_get_contents('php://input'), true);

if ($data['action'] == 'login') {
    $loggedIn = checkLogin($data);
    if ($loggedIn[0]) {
        login($loggedIn[1]);
        echo json_encode(array("status" => 200, "message" => "login successful"));
    } else   echo json_encode(array("status" => 400, "message" => "username or password incorrect"));
} else if ($data['action'] == 'register') {

    if (username_exists($data)) echo json_encode(array("status" => 400, "message" => "username already exists"));
    else {
        $users = getUsers();
        $token = tokenGenerator();
        $newUser = array("username" => $data["username"], "password" => $data["password"], "token" => $token);
        $users[$token] =  $newUser;
        setUsers($users);
        login($newUser);
        echo json_encode(array("status" => 200, "message" => "register successful"));
    }
}


// UTILS

function login($data)
{
    $_SESSION['username'] = $data['username'];
    $_SESSION['token'] = $data['token'];
    $_SESSION['data_path'] = 'data/' . $data['username'];
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

function setUsers($users)
{
    file_put_contents("users.json", json_encode($users));
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

function username_exists($username)
{
    $users = getUsers();
    foreach ($users as $user) {
        if ($user['username'] == $username)  return true;
    }
    return false;
}
