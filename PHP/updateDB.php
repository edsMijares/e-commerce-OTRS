<?php
$data = json_decode(file_get_contents('php://input'), true);
$status = $_POST['status'];
file_put_contents('./dbStat.txt', $status);
$tobeEcho = array();
$tobeEcho['status'] = $status;
?>

