<?php
include('database.php');
$search=$_POST['search'];//here hold the field or variable
if(!empty($search)){
    $query = "SELECT * FROM task WHERE name LIKE '$search%'";
    $result = mysqli_query($connection,$query);
    if(!$result){
        die('query Error'. mysqli_error($connection));
    }
    $json=array();// create the container
    while($row = mysqli_fetch_array($result)){ // from or as of list ,fill it 
        $json[] = array(
            'name'=> $row['name'],
            'description'=> $row['description'],
            'id' => $row['id']
        );
    }
    $jsonstring=json_encode($json);
    echo $jsonstring;
}
?>