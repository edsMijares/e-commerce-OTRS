<?php
$connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
$tobeEcho = array();
$orderID = $_POST['orderID'];
$itemID = $_POST['itemID'];
$query = "UPDATE `orders` SET `status`='To Ship' WHERE `id`='$orderID'";
$tobeEcho['status'] = 'ok';
mysqli_query($connect,$query);
$queryy = "UPDATE `products` SET `stock`=`stock`-1 WHERE `id`='$itemID'";
mysqli_query($connect,$queryy);
echo json_encode($tobeEcho);
?>