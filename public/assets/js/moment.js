// var currentTime = new Date().getHours();
// //morning image for background
// console.log(currentTime)
// if (5 <= currentTime && currentTime < 10) {
    
//         $("#background").attr("src","/assets/images/backgrounds/calm-morning.png");
// }

// //day image for background
// else if (10 <= currentTime && currentTime < 16){
   
//         $("#background").attr("src","/assets/images/backgrounds/calm-day.png");
   
// }
// //evening image for background
// else if (16 <= currentTime && currentTime < 19) {
    
//         $("#background").attr("src","/assets/images/backgrounds/calm-evening.png");
// }
// //night image for background
// else  {
    
//         $("#background").attr("src","/assets/images/backgrounds/calm-night.png");
//      console.log("evening")
// }

var currentTime = new Date().getHours();
//morning image for background
console.log(currentTime)
currentTime = 6
if (5 <= currentTime && currentTime < 10) {
    
        $("#background").css({"background-image": url("/assets/images/backgrounds/calm-day.png"));
}

//day image for background
else if (10 <= currentTime && currentTime < 16){
   
        $("#background").css("src","/assets/images/backgrounds/calm-day.png");
   
}
//evening image for background
else if (16 <= currentTime && currentTime < 19) {
    
        $("#background").css("src","/assets/images/backgrounds/calm-evening.png");
}
//night image for background
else  {
    
        $("#background").css("src","/assets/images/backgrounds/calm-night.png");
     console.log("evening")
}