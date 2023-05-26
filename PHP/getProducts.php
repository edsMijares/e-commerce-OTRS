<?php
$connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
$categ = $_POST['categ'];
$search = $_POST['search'];
$query = "SELECT * FROM `products`";
$data = mysqli_query($connect, $query);
$tobeEcho = array();

if (mysqli_num_rows($data) > 0) {
    $tobeEcho['status'] = 'ok';
    while($row = mysqli_fetch_array($data)){
        $tobeEcho['rows'][] = $row;
    }
    echo json_encode($tobeEcho);
} else {
    $tobeEcho['status'] = 'noRecords';
    echo json_encode($tobeEcho);
}

?>