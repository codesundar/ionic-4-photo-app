<?php
    header('Access-Control-Allow-Origin: *');
    $new_image_name = time()."-".urldecode($_FILES["file"]["name"]);
    if(move_uploaded_file($_FILES["file"]["tmp_name"], "uploads/".$new_image_name)){
        echo $new_image_name;
    }
    else{
        echo "error";
    }
?>