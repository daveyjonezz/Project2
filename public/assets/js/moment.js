var currentTime = new Date().getHours();
//morning image for background
if (05 <= currentTime && currentTime < 10) {
    if (document.body) {
        document.body.background = "../assets/images/backgrounds/calm-morning.png";
    }
}

//day image for background
else if (10 <= currentTime && currentTime < 16){
    if (document.body) {
        document.body.background = "../assets/images/backgrounds/calm-day.png";
    }
}
//evening image for background
else if (16 <= currentTime && currentTime < 19) {
    if (document.body) {
        document.body.background = "../assets/images/backgrounds/calm-evening.png";
    }
}
//night image for background
else if (19 <= currentTime && currentTime < 05) {
    if (document.body) {
        document.body.background = "../assets/images/backgrounds/calm-night.png";
    }
}