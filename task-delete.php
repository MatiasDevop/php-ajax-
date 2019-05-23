<?php
    include('database.php');//always use it to not make other connection.
    if(isset($_POST['id'])){ //its for if exist,always use it to verify
        $id=$_POST['id'];
        $query = "DELETE FROM task WHERE id =$id";
        $result = mysqli_query($connection,$query);
        if(!$result){
            die('Query Failed');
        }
        echo "task delete successfully..";
    }
   
?>