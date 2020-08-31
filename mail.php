<?php

$recepient = "design@artappart.ru";
$sitename = "Заявка с сайта";

$phone = trim($_POST["phone"]);
$checked = trim($_POST["checked"]);
$connect_method = trim($_POST["connect_method"]);

$message = "Телфон: $phone\nКвиз - выбрано: $checked\nМетод связи: $connect_method";

$pagetitle = "Заявка с сайта";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");