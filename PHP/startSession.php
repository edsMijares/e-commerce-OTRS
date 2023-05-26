<?php
session_start();
$tobeEcho = array();
$usernameInput = $_POST['usernameInput'];
$connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
$query = "SELECT * FROM `userstable` WHERE `uname` = '$usernameInput'";
$data = mysqli_query($connect, $query);
$row = mysqli_fetch_assoc($data);
$_SESSION['uname'] = $row['uname'];
$tobeEcho['status']='ok';
echo json_encode($tobeEcho);
?>