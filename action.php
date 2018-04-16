<?php  
	$path = 'data.txt';
	if (isset($_POST['field1'])){
		$fh = fopen($path,"a+");
		$string = $_POST['field1'].' - ';
		fwrite($fh,$string);//write information to text file
		fclose($fh);//closes file
	} 
?>