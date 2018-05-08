<?php

    //php mailer includeds
    $msg = "";
	use PHPMailer\PHPMailer\PHPMailer;
	include_once "PHPMailer/PHPMailer.php";
	include_once "PHPMailer/Exception.php";
	include_once "PHPMailer/SMTP.php";

	if (isset($_POST['submit'])) {
		$subject = $_POST['subject'];//subject from user
		$email = $_POST['email'];//email from user
		$message = $_POST['message'];//message from user

    //stores data in file
    $myfile = fopen("data.txt", "w") or die("Unable to open file");//opens data file
    $subject = $_POST['subject']."\n";// call name 
    fwrite($myfile, $subject);//writes name

    $email = $_POST['email']."\n";//call email
    fwrite($myfile, $email);//write email
    fclose($myfile);//close file and save

   
		$mail = new PHPMailer();

		//if you want to send via SMTP
		$mail->Host = "smtp.gmail.com";
		//$mail->isSMTP();
		$mail->SMTPAuth = true;
		$mail->Username = "acarver12344@gmail.com";//your Gmail here
		$mail->Password = "your password";//your password
		$mail->SMTPSecure = "ssl"; //TLS
		$mail->Port = 465; //587

		$mail->addAddress('acarver12344@gmail.com');//your Gmail here
		$mail->setFrom($email);
		$mail->Subject = $subject;
		$mail->isHTML(true);
		$mail->Body = $message;
		$mail->addAttachment($file);

		if ($mail->send())
		    header('Location: thankyou.html');
            exit();
	
	}
?>






