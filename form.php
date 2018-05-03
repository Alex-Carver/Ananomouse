<?php
header('Location: thankyou.html');
exit();
    if (isset($_POST['s1'])) {
      $to = "acarver@advancedmidwestir.com"; // this is your Email address
      $from = $_POST['email']; // this is the sender's Email address
      $subject = "Form submission";//form subject
      echo $_POST['name'];//users name
      echo $_POST['email'];//users email

      $headers = "From:" . $from;//your email
      $headers2 = "From:" . $to;//users email
      mail($to,$subject,$message,$headers);//sends mail
    
  
      $myfile = fopen("data.txt", "w") or die("Unable to open file");//opens data file
      $name = $_POST['name']."\n";// call name 
      fwrite($myfile, $name);//writes name

      $email = $_POST['email']."\n";//call email
      fwrite($myfile, $email);//write email
      fclose($myfile);//close file and save
    }
  ?>

