<?php
include('database.php');
    echo "entry edit file";
    $name=$_POST['name'];
    $description=$_POST['description'];
    $id = $_POST['id'];
    echo $name;
    echo $description;
    $query="UPDATE task SET name='$name', description='$description' WHERE id = '$id'";

    $result = mysqli_query($connection,$query);
    if(!$result){
        die('query failed');
    }
    echo "edit success successfully";
?>