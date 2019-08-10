var currentTime = new Date().getHours();
//morning image for background
if (06 <= currentTime && currentTime < 11) {
    if (document.body) {
        document.body.background = "../assets/images/backgrounds/calm-morning.png";
    }
}

//day image for background
else if (12 <= currentTime && currentTime < 16){
    if (document.body) {
        document.body.background = "../assets/images/backgrounds/calm-day.png";
    }
}
//evening image for background
else if (17 <= currentTime && currentTime < 19) {
    if (document.body) {
        document.body.background = "../assets/images/backgrounds/calm-evening.png";
    }
}
//night image for background
else if (20 <= currentTime && currentTime < 05) {
    if (document.body) {
        document.body.background = "../assets/images/backgrounds/calm-night.png";
    }
}