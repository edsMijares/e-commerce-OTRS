<?php
$connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
$data = array();
$id = $_POST['id'];
$query = "UPDATE `servicerequest` SET `status` = 'WAITING' WHERE `id` = '$id'";
mysqli_query($connect, $query);
$data['status'] = 'ok';
echo json_encode($data);