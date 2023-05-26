<?php
$connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
$tobeEcho = array();
$uname = $_POST['uname'];
function getDetails($uname,$connect){
    $tobeEcho = array();
    $query = "SELECT * FROM `userstable` WHERE `uname` = '$uname'";
    $data = mysqli_query($connect,$query);
    if (mysqli_num_rows($data) > 0) {
        $row = mysqli_fetch_array($data);
        $tobeEcho['status'] = 'ok';
        $tobeEcho['id'] = $row['id'];
        $tobeEcho['fullname'] = strtoupper($row['fname'])." ".strtoupper($row['lname']);
        $tobeEcho['address'] = strtoupper($row['address']);
        $tobeEcho['cnum'] = $row['cnum'];
        echo json_encode($tobeEcho);
    }
    else{
        $tobeEcho['status'] = 'error';
        echo json_encode($tobeEcho);
    }
}
getDetails($uname,$connect)
?>