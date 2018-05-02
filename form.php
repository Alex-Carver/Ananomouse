<?php
    if (isset($_POST['s1'])) {
      $to = "email@example.com"; // this is your Email address
      $from = $_POST['email']; // this is the sender's Email address
      $subject = "Form submission";//form subject
      $subject2 = "Copy of your form submission";//copy of your form
      echo $_POST['name'];//users name
      echo $_POST['email'];//users email

      $headers = "From:" . $from;//your email
      $headers2 = "From:" . $to;//users email
      mail($to,$subject,$message,$headers);//sends mail
      mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
      echo "Mail Sent. Thank you " . $first_name . ", we will contact you shortly.";//users name and message

      $myfile = fopen("data.txt", "w") or die("Unable to open file");//opens data file
      $name = $_POST['name']."\n";// call name 
      fwrite($myfile, $name);//writes name

      $email = $_POST['email']."\n";//call email
      fwrite($myfile, $email);//write email
      fclose($myfile);//close file and save
    }
  ?>


