<?php
    $connect = mysqli_connect('localhost','root','','id20282205_motorshopdb');
    $prodName = $_POST['productnameInput'];
    $price = $_POST['priceInput'];
    $quantity = $_POST['quantityInput'];
    $desc = $_POST['descInput'];
    $target_dir = "../pictures/products/"; // specify the directory where the file will be saved
    $target_file = $target_dir . basename($_FILES["imgInput"]["name"]);
    $uploadOk = 1;

    if (file_exists($target_file)) {
        $response = array("message" => "File already Exist");
        echo json_encode($response);
    }
    else{
        if (move_uploaded_file($_FILES["imgInput"]["tmp_name"], $target_file)) {
            $fileName = basename($_FILES["imgInput"]["name"]);
            $sql = "INSERT INTO `products` (`productName`,`proddesc`,`price`,`stock`,`imgName`) VALUES ('$prodName','$desc','$price','$quantity','$fileName')";
            if (mysqli_query($connect, $sql)) {
                $response = array("message" => "File name, name, and email saved to database.");
                echo json_encode($response);
            } else {
                $response = array("message" => "Error saving data to database.");
                echo json_encode($response);
            }
        } else {
            $response = array("message" => "There is an error uploading your image");
            echo json_encode($response);
        }
    }
    mysqli_close($connect);
?>