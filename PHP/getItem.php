<?php
    $connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
    $tobeEcho = array();
    $prodId = $_POST['prodId'];
    $query = "SELECT * FROM `products` WHERE `id`='$prodId'";
    $data = mysqli_query($connect,$query);
    $row = mysqli_fetch_array($data);
    $tobeEcho['itemImg'] = $row['imgName'];
    $tobeEcho['prodName'] = $row['productName'];
    $tobeEcho['stock'] = $row['stock'];
    $tobeEcho['price'] = $row['price'];
    echo json_encode($tobeEcho)
?>