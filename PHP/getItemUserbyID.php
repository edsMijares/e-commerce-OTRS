<?php
$connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
$itemid = $_POST['itemid'];
$userid = $_POST['userid'];
$tobeEcho = array();
function getItem($connect,$itemid){
    $item = array();
    $query = "SELECT * FROM `products` WHERE `id`='$itemid'";
    $data = mysqli_query($connect,$query);
    if (mysqli_num_rows($data) > 0) {
        $row = mysqli_fetch_array($data);
        $item['prodName'] = $row['productName'];
        $item['price'] = $row['price'];
        $item['id'] = $row['id'];
        return $item;
    }
    else{
        $tobeEcho = array();
        $tobeEcho['status'] = 'error';
        echo json_encode($tobeEcho);
    }    
}
function getUser($connect,$userid){
    $user = array();
    $query = "SELECT * FROM `userstable` WHERE `id`='$userid'";
    $data = mysqli_query($connect,$query);
    if (mysqli_num_rows($data) > 0) {
        $row = mysqli_fetch_array($data);
        $user['id'] = $row['id'];
        $user['fullname'] = ucfirst($row['fname'])." ".ucfirst($row['lname']);
        $user['address'] = strtoupper($row['address']);
        $user['cnum'] = $row['cnum'];
        return $user;
    }
    else{
        $tobeEcho = array();
        $tobeEcho['status'] = 'error';
        echo json_encode($tobeEcho);
    }    
}
$tobeEcho['item'] = getItem($connect,$itemid);
$tobeEcho['user'] = getUser($connect,$userid);
echo json_encode($tobeEcho)

?>