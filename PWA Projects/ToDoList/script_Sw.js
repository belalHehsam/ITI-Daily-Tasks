if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/sw.js")
        .then(reg => {
            console.log("Services Worker Registerd ...", reg);
        })
        .catch(err => console.log(err))
}
