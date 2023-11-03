<?php
    // photo-proof.php

    // Get the 'url' query parameter from the URL
    $imageUrl = isset($_GET['url']) ? $_GET['url'] : '';

    // Use htmlspecialchars to escape the URL before displaying it as the 'src' attribute of the image
    $escapedUrl = htmlspecialchars($imageUrl, ENT_QUOTES, 'UTF-8');
?>

<!-- HTML code -->
<!DOCTYPE html>
<html>
<head>
    <title>Photo Proof</title>
</head>
<body>
    <img src="<?php echo $escapedUrl; ?>" alt="Image">
</body>
</html>
