document.getElementById("argv").innerText = "";
setTimeout(() => document.getElementById("argv").innerText += "a", 1000 + 0);
setTimeout(() => document.getElementById("argv").innerText += "r", 1000 + 250);
setTimeout(() => document.getElementById("argv").innerText += "g", 1000 + 650);
setTimeout(() => document.getElementById("argv").innerText += "v", 1000 + 900);
setTimeout(() => {
    const cursor = document.getElementById("cursor");
    cursor.style = "animation: blink 2s steps(1) infinite";
}, 1000 + 900 + 250);

setInterval(window.age = age = () => {
    const birthday = new Date(1193612400000);

    const now = new Date();
    let years = now.getUTCFullYear() - birthday.getUTCFullYear();

    birthday.setUTCFullYear(now.getUTCFullYear());
    if (birthday <= now) {
        birthday.setUTCFullYear(now.getUTCFullYear() + 1);
        years++;
    }
    const birthday_year = birthday.getUTCFullYear();
    years -= (birthday - now) / (3600000 * 24 * (((birthday_year % 4 === 0 && birthday_year % 100 !== 0) || (birthday_year % 400 === 0)) ? 366 : 365));

    document.getElementById("age").innerText = years.toFixed(8);
}, 100);
