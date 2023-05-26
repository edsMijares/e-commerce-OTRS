<?php
$connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
$tobeEcho = array();
$uname = $_POST['uname'];
function getUserCnum($uname,$connect){
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
$contactNumber = getUserCnum($uname,$connect);
$query = "DELETE FROM `servicerequest` WHERE `cnum`='$contactNumber' AND (`status`='WAITING' OR `status` = 'NEW!')";
mysqli_query($connect,$query);
$tobeEcho['status']='ok';
echo json_encode($tobeEcho)
?>