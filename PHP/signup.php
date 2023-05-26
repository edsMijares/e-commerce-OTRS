<?php
$connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
$data = array();
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$gender = $_POST['gender'];
$bday = $_POST['bday'];
$uname = $_POST['uname'];
$pass = $_POST['pass'];
$email = $_POST['email'];
$address = $_POST['address'];
$cnumber = $_POST['cnumber'];

function checkUname($uname, $connect){
    $query = "SELECT * FROM `userstable` WHERE `uname`='$uname'";
    $data = mysqli_query($connect,$query);
    if (mysqli_num_rows($data)>0){
        return TRUE;
    }
}
function checkCnum($cnumber, $connect){
    $query = "SELECT * FROM `userstable` WHERE `cnum`='$cnumber'";
    $data = mysqli_query($connect,$query);
    if (mysqli_num_rows($data)>0){
        return TRUE;
    }
}
function checkemail($email, $connect){
    $query = "SELECT * FROM `userstable` WHERE `email`='$email'";
    $data = mysqli_query($connect,$query);
    if (mysqli_num_rows($data)>0){
        return TRUE;
    }
}
if (checkUname($uname,$connect)==TRUE) {
    $data['status'] = 'unameFound';
    echo json_encode($data);
}
if (checkCnum($cnumber,$connect)==TRUE) {
    $data['status'] = 'cnumFound';
    echo json_encode($data);
}
if (checkemail($email,$connect)==TRUE) {
    $data['status'] = 'emailFound';
    echo json_encode($data);
}
else{
    $query = "INSERT INTO `userstable`(`fname`,`lname`,`gender`,`bday`,`uname`,`pass`,`email`,`address`,`cnum`)VALUE('$fname','$lname','$gender','$bday','$uname','$pass','$email','$address','$cnumber')";
    mysqli_query($connect, $query);
    $data['status'] = 'ok';
    echo json_encode($data);    
}

?>