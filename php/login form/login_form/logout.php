<?php
session_start();

session_destroy();
$_SESSION = array();

// delete the cookie. 
setcookie ("PHPSESSID", "", time() - 3600);

header('Location: login.php');