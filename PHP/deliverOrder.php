<?php
$connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
$tobeEcho = array();
$orderID = $_POST['orderID'];
$query = "UPDATE `orders` SET `status`='Delivered' WHERE `id`='$orderID'";
$tobeEcho['status'] = 'ok';
mysqli_query($connect,$query);
echo json_encode($tobeEcho);
?>