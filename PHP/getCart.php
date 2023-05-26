<?php
    session_start();
    $connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
    $uname = $_SESSION['uname'];
    function getUserId($connect,$uname){
        $query = "SELECT * FROM `userstable` WHERE `uname`='$uname'";
        $data = mysqli_query($connect,$query);
        if (mysqli_num_rows($data) > 0) {
            $row = mysqli_fetch_array($data);
            return $row['id'];
        }
    }
    function getCart($connect,$userId){
        $tobeEcho = array();
        $query = "SELECT * FROM `cart` WHERE `userID`='$userId'";
        $data = mysqli_query($connect,$query);
        if (mysqli_num_rows($data) > 0) {
            $tobeEcho['status']='ok';
            while($row = mysqli_fetch_array($data)){
                $tobeEcho['rows'][] = $row;
            }
            echo json_encode($tobeEcho);
        }
        else{
            $tobeEcho['status'] = 'noCart';
            echo json_encode($tobeEcho);
        }
    }
    $userId = getUserId($connect,$uname);
    getCart($connect,$userId)
?>