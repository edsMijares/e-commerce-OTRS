<?php
session_start();
$connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
$tobeEcho = array();
$prodName = $_POST['prodName'];
$userName = $_SESSION['uname'];

function getUserId($connect, $userName){
    $query = "SELECT * FROM `userstable` WHERE `uname`='$userName'";
    $data = mysqli_query($connect,$query);
    if (mysqli_num_rows($data) > 0) {
        $row = mysqli_fetch_array($data);
        return $row['id'];
    }
    else{
        return 'None';
    }
}
function getProdId($connect, $prodName){
    $query = "SELECT * FROM `products` WHERE `productName`='$prodName'";
    $data = mysqli_query($connect,$query);
    if (mysqli_num_rows($data) > 0) {
        $row = mysqli_fetch_array($data);
        return $row['id'];
    }
    else{
        return 'None';
    }
}
function addToCart($connect,$userId,$prodId){
    $query = "INSERT INTO `cart`(`userID`,`productID`)VALUE('$userId','$prodId')";
    mysqli_query($connect,$query);
    return 'ok';
}
$userId = getUserId($connect,$userName);
$prodId = getProdId($connect,$prodName);
$tobeEcho['status'] = addToCart($connect,$userId,$prodId);
echo json_encode($tobeEcho)
?>