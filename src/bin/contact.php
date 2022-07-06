<?php

error_reporting(E_ALL);
ini_set('display_errors', '0');

try{
    // check if fields passed are empty
    if(empty($_POST['name'])  		||
       empty($_POST['email']) 		||
       empty($_POST['subject']) 	||
       empty($_POST['message'])	    ||
       !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
       {
        echo "Please, fill out the form!";
        return false;
       }

    $name = $_POST['name'];
    $email_address = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];


    // create email body and send it	
    $to = '_comma_separated_email_recipients'; // PUT YOUR EMAIL ADDRESS HERE
    $email_subject = "Website contact from:  $name"; // EDIT THE EMAIL SUBJECT LINE HERE
    $email_body = "A message has been sent from:\n\n\n\nNombre: $name\n\nEmail: $email_address\n\nSubject: $subject\n\nMessage:\n$message";
    $headers = "From: no-reply@youremail.com\n";
    $headers .= "Reply-To: $email_address";	
    mail($to,$email_subject,$email_body,$headers);
    return true;
    
}catch(Exception $e){
    echo $e->getMessage();
}
?>