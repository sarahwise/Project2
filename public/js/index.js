var video = document.getElementById("vid1");
video.addEventListener("ended", myFunction);

function myFunction() {
    var x = document.getElementById("myDIV");
    video.style.display = "none";
}