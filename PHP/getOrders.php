<?php
    session_start();
    $connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
    $uname = $_SESSION['uname'];
    $status = $_POST['status'];
    function getUserId($connect,$uname){
        $query = "SELECT * FROM `userstable` WHERE `uname`='$uname'";
        $data = mysqli_query($connect,$query);
        if (mysqli_num_rows($data) > 0) {
            $row = mysqli_fetch_array($data);
            return $row['id'];
        }
    }
    function getPendings($connect,$userID,$status){
        $tobeEcho = array();
        $query = "SELECT * FROM `orders` WHERE `userID`='$userID' AND `STATUS`='$status'";
        $data = mysqli_query($connect,$query);
        if (mysqli_num_rows($data) > 0) {
            $tobeEcho['status'] = 'ok';
            while($row = mysqli_fetch_array($data)){
                $tobeEcho['rows'][] = $row;
            }
            echo json_encode($tobeEcho);
        }
        else{
            $tobeEcho['status'] = 'noPendings';
            echo json_encode($tobeEcho);
        }
    }
    $userID = getUserId($connect,$uname);
    getPendings($connect,$userID,$status)
?>