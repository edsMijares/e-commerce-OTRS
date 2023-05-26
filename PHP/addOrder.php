<?php
    $connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
    $checkout = $_POST['checkout'];
    $userID = $_POST['userID'];
    $prodID = $_POST['prodID'];
    $quantity = $_POST['quantity'];
    $totalPrice = $_POST['totalPrice'];
    $msg = $_POST['msg'];
    $tobeEcho = array();
    date_default_timezone_set('Asia/Manila');
    $current_time = date('Y-m-d h:i:s A');
    function removeCart($connect,$checkout, $userID, $prodID){
        if($checkout=='true'){
            $query = "DELETE FROM `cart` WHERE `productID`='$prodID' AND `userID`='$userID'";
            mysqli_query($connect,$query);
        }
    }
    function addOrder($connect,$userID,$prodID,$quantity,$totalPrice,$msg,$current_time){
        $query = "INSERT INTO `orders`(`productID`,`userID`,`quantity`,`totalPrice`,`message`,`orderTime`,`status`)VALUE('$prodID','$userID','$quantity','$totalPrice','$msg','$current_time','Pending')";
        mysqli_query($connect,$query);
        $tobeEcho['status'] = 'ok';
        echo json_encode($tobeEcho);   
    }
    removeCart($connect,$checkout,$userID,$prodID);
    addOrder($connect,$userID,$prodID,$quantity,$totalPrice,$msg,$current_time);
?>