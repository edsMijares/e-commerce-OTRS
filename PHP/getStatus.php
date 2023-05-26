<?php
$connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
$tobeEcho = array();
$uname = $_POST['uname'];
function getCnum($uname,$connect){
    $tobeEcho = array();
    $query = "SELECT * FROM `userstable` WHERE `uname` = '$uname'";
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
$contactNumber = getCnum($uname,$connect);
$query = "SELECT * FROM `servicerequest` WHERE `cnum`='$contactNumber' AND `status`='WAITING'";
$data = mysqli_query($connect,$query);
if (mysqli_num_rows($data) > 0) {
    $tobeEcho['status'] = 'WAITING';
    echo json_encode($tobeEcho);
}
else{
    $tobeEcho['status'] = 'NEW';
    echo json_encode($tobeEcho);
}
?>