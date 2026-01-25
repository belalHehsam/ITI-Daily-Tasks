function getCookie(cookieName) {
    if (arguments.length != 1)
        throw new Error("getCookie work with one paramter (cookie Name)")
    if (!cookieName || typeof cookieName != "string")
        throw new Error("you should pass the cookie Name and must to be string");

    let cookies = document.cookie.split("; ")
    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].split("=")[0] == cookieName)
            return cookies[i].split("=")[1];
    }
    return undefined;
}

function setCookie(cookieName, cookieValue, expiryDate) {

    if (arguments.length < 2)
        throw new Error("You must send the cookie name and value");

    if (!(typeof arguments[0] == "string" && typeof arguments[1] == "string"))
        throw new Error("the cookie name and value must be string")

    if (expiryDate && !(expiryDate instanceof Date))
        throw new Error("expiryDate must be a Date object");

    if (!expiryDate) {
        document.cookie = `${cookieName}=${cookieValue};` ///session cookie
        return;
    }
    document.cookie = `${cookieName}=${cookieValue};expires=${expiryDate.toUTCString()}` ///persistant cookie
}

function deleteCookie(cookieName) {
    if (typeof cookieName != "string")
        throw new Error("the cookie name must be string")

    if (arguments.length != 1)
        throw new Error("you must send cookie name only")

    if (!hasCookie(cookieName))
        return false;

    document.cookie = `${cookieName}=; max-age=0; path=/`;

    return true;
}


function allCookieList() {
    return document.cookie;
}

function hasCookie(cookieName) {
    let cookies = document.cookie.split("; ")
    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].split("=")[0] == cookieName)
            return true;
    }
    return false;
}

