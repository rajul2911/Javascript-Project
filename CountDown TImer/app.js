const endDate= "14 March 2025 10:00 AM";
let inputs=document.querySelectorAll("input");

const clock=()=>{
    let end= new Date(endDate);
    let now = new Date();
    let diff = end - now;
    if (diff <= 0) {
        inputs.forEach(input => input.value = "00");
        return;
    }
     let days = Math.floor(diff / (1000 * 60 * 60 * 24));
     let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
     let minutes = Math.floor((diff / (1000 * 60)) % 60);
     let seconds = Math.floor((diff / 1000) % 60);
 
     inputs[0].value = days;
     inputs[1].value = hours;
     inputs[2].value = minutes;
     inputs[3].value = seconds;
};

setInterval(clock, 1000);


window.onload = clock;