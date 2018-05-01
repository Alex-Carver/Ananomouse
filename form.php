<?php
    if (isset($_POST['s1'])) {
      echo $_POST['name'];
      echo $_POST['email'];

      $myfile = fopen("data.txt", "w") or die("Unable to open file");
      $name = $_POST['name']."\n";
      fwrite($myfile, $name);

      $email = $_POST['email']."\n";
      fwrite($myfile, $email);
      fclose($myfile);
    }
  ?>