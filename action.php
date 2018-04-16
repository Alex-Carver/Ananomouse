<?php
if(isset($_POST['field1'])) {
    $data = $_POST['field1'] . '-' .  "\n";
    $ret = file_put_contents('../php/data.txt', $data, FILE_APPEND | LOCK_EX);
    if($ret === false) {
        die('There was an error writing this file');
    }
    else {
        echo "$ret bytes written to file";
    }
}
else {
   die('no post data to process');
}