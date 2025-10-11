document.getElementById("argv").innerText = "";
document.getElementById("cursor").style = "";

setTimeout(() => document.getElementById("argv").innerText += "a", 850 + 0);
setTimeout(() => document.getElementById("argv").innerText += "r", 850 + 250);
setTimeout(() => document.getElementById("argv").innerText += "g", 850 + 650);
setTimeout(() => document.getElementById("argv").innerText += "v", 850 + 900);
setTimeout(() => document.getElementById("cursor").style = "animation: blink 2s steps(1) infinite", 850 + 900 + 250);

{
    let updateAge;
    setInterval(updateAge = (document = globalThis.document) => {
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
    updateAge();


    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register("/sw.js");

        navigator.serviceWorker.addEventListener("message", async (event) => {
            const newDOM = new DOMParser().parseFromString(await event.data.text(), "text/html");
            updateAge(newDOM);
            newDOM.getElementById("argv").innerText = "";
            newDOM.getElementById("cursor").style = "";

            document.replaceChild(
                document.adoptNode(newDOM.documentElement),
                document.documentElement
            );
        });
    }
}

