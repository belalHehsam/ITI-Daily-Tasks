if ('serviceWorker' in navigator) {

    window.addEventListener("load", event => {
        window.navigator.serviceWorker.register("/sw.js")
            .then(reg => {
                console.log("service Worker Register successfully.. ", reg);
            })
            .catch(err => {
                console.log(err);
            })
    })
}


let deferredPrompt;

const installBtn = document.getElementById('instalBtn')

window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    deferredPrompt = event;
    installBtn.classList.remove("hidden");
})

installBtn.addEventListener("click", function (event) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(choice => {
        console.log('User choice:', choice.outcome);

        deferredPrompt = null;
        installBtn.classList.add("hidden")
    })
})
