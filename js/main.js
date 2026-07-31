const facebook = document.getElementById("facebook");
const btn = document.querySelector("#join-us");
facebook.addEventListener("click", () => {
    console.log("Clicked!");
    window.open("https://web.facebook.com/scienceseascouts", "_blank");
});

btn.addEventListener("click", () => {
    window.location.href = "joinus.html";
});

