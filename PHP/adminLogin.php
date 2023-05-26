<?php
$connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
$usernameInput = $_POST['usernameInput'];
$passInput = $_POST['passInput'];

$query = "SELECT * FROM `admin` WHERE `uname` = '$usernameInput'";
$data = mysqli_query($connect, $query);
$tobeEcho = array();
if (mysqli_num_rows($data) > 0) {
    $row = mysqli_fetch_array($data);
    if($row['pass']==$passInput){
        $tobeEcho['status'] = 'ok';
        echo json_encode($tobeEcho);
    }
    else{
        $tobeEcho['status'] = 'wrongcredential';
        echo json_encode($tobeEcho);
    }    
}
else{
    $tobeEcho['status'] = 'wrongcredential';
    echo json_encode($tobeEcho);
}

?>