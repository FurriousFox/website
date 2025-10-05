document.getElementById("argv").innerText = "";
setTimeout(() => document.getElementById("argv").innerText += "a", 1000 + 0);
setTimeout(() => document.getElementById("argv").innerText += "r", 1000 + 250);
setTimeout(() => document.getElementById("argv").innerText += "g", 1000 + 650);
setTimeout(() => document.getElementById("argv").innerText += "v", 1000 + 900);

setTimeout(() => {
    const cursor = document.getElementsByClassName("cursor")[0];
    cursor.style = "animation: blink 2s steps(1) infinite";
}, 1000 + 900 + 250);