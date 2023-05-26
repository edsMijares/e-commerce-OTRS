<?php
    $connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
    $query = "SELECT DISTINCT categ FROM `products`";
    $data = mysqli_query($connect, $query);
    $tobeEcho = Array();
    if (mysqli_num_rows($data) > 0) {
        while ($row = mysqli_fetch_array($data)) {
            $tobeEcho['rows'][] = $row['categ'];
        }
        $tobeEcho['status'] = 'ok';
        echo json_encode($tobeEcho);
        }   
    else{
        $tobeEcho['status'] = 'error';
        echo json_encode($tobeEcho);
    }
?>