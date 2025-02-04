<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = htmlspecialchars($_POST["first-name"]);
    $last_name = htmlspecialchars($_POST["last-name"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars($_POST["phone"]);
    $message = htmlspecialchars($_POST["message"]);

    $to = "family@history.com"; // Change to your email
    $subject = "پیام جدید از فرم تماس وبسایت";
    $headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";

    $body = "شما یک پیام جدید از طریق فرم تماس دریافت کردید:\n\n";
    $body .= "نام: $first_name $last_name\n";
    $body .= "ایمیل: $email\n";
    $body .= "شماره تماس: $phone\n\n";
    $body .= "پیام:\n$message\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "پیام شما با موفقیت ارسال شد!";
    } else {
        echo "خطا در ارسال پیام. لطفاً دوباره تلاش کنید.";
    }
} else {
    echo "درخواست نامعتبر!";
}
?>
