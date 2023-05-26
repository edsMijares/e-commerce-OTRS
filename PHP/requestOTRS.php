<?php
session_start();
$connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
$data = array();
$uname = $_SESSION['uname'];
date_default_timezone_set('Asia/Manila');
$current_time = date('Y-m-d h:i:s A');
function getCnum($uname, $connect){
    $data = array();
    $tobeEcho = array();
    $query = "SELECT * FROM `userstable` WHERE `uname`='$uname'";
    $data = mysqli_query($connect,$query);
    if (mysqli_num_rows($data) > 0) {
        $row = mysqli_fetch_array($data);
        return $row['cnum'];
    }
    else{
        $tobeEcho['status'] = 'error';
        echo json_encode($tobeEcho);
    }
}
function getCurrentService($cnum, $connect){
    $data = array();
    $tobeEcho = array();
    $query = "SELECT * FROM `servicerequest` WHERE `cnum`='$cnum' AND (`status`='WAITING' OR `status` = 'NEW!')";
    $data = mysqli_query($connect, $query);
    if (mysqli_num_rows($data) > 0) {
        return TRUE;
    }
    else{
        return FALSE;
    }
}

$tobeEcho = array();
$status = getCurrentService(getCnum($uname,$connect),$connect);
if ($status==FALSE) {
    $query = "SELECT * FROM `userstable` WHERE `uname` = '$uname'";
    $data = mysqli_query($connect, $query);
    $row = mysqli_fetch_array($data);
    $fname = $row['fname'];
    $lname = $row['lname'];
    $cnum = $row['cnum'];
    mysqli_query($connect, "INSERT INTO `servicerequest`(`fname`,`lname`,`cnum`,`time`,`status`)VALUE('$fname','$lname','$cnum','$current_time','NEW!')");
    $tobeEcho['status'] = 'ok';
    echo json_encode($tobeEcho);
}
else{
    $tobeEcho['status'] = 'error';
    echo json_encode($tobeEcho);
}
?>