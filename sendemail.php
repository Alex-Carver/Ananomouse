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

    $message = $_POST['message']."\n";//call message
    fwrite($myfile, $message);//write message
    fclose($myfile);//close file and save

   
		$mail = new PHPMailer();

		//if you want to send via SMTP
		$mail->Host = "smtp.gmail.com";//don't change host provider
		//$mail->isSMTP();
		$mail->SMTPAuth = true;//authentication is true don't change
		$mail->Username = "yourname@gmail.com";//your Gmail here
		$mail->Password = "your password";//your Gmail password
		$mail->SMTPSecure = "ssl"; //TLS dont change
		$mail->Port = 465; //587 dont change

		$mail->addAddress('yourhost@domain.com');//Change host email to Gmail domain if using SMTP
		$mail->setFrom($email);//user email
		$mail->Subject = $subject;//user name
		$mail->isHTML(true);//takes html data as true don't change
		$mail->Body = $message;//user message
		$mail->addAttachment($file);

		if ($mail->send())
		    header('Location: thankyou.html');//redirects to thank you page
            exit();
	
	}
?>






