<?php
$connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
$tobeEcho = array();
$prodName = $_POST['prodName'];
function getDetails($prodName,$connect){
    $tobeEcho = array();
    $query = "SELECT * FROM `products` WHERE `productName` = '$prodName'";
    $data = mysqli_query($connect,$query);
    if (mysqli_num_rows($data) > 0) {
        $row = mysqli_fetch_array($data);
        $tobeEcho['status'] = 'ok';
        $tobeEcho['id'] = $row['id'];
        $tobeEcho['price'] = $row['price'];
        $tobeEcho['stock'] = $row['stock'];
        echo json_encode($tobeEcho);
    }
    else{
        $tobeEcho['status'] = 'error';
        echo json_encode($tobeEcho);
    }
}
getDetails($prodName,$connect)
?>