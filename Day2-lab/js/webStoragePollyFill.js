if (
    typeof window.localStorage === "undefined" ||
    typeof window.sessionStorage === "undefined"
) {
    (function () {
        var Storage = function (type) {
            var storageKey = type === "session" ? "__sessionStorage__" : "__localStorage__";

            function setData(data) {
                var jsonData = JSON.stringify(data);
                if (type === "session") {
                    setCookie(storageKey, jsonData);
                } else {
                    var expiryDate = new Date();
                    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                    setCookie(storageKey, jsonData, expiryDate);
                }
            }

            function getData() {
                var jsonData = getCookie(storageKey);
                if (jsonData === undefined || jsonData === null) {
                    return {};
                }
                try {
                    return JSON.parse(jsonData);
                } catch (e) {
                    return {};
                }
            }

            function clearData() {
                deleteCookie(storageKey);
            }

            var data = getData();

            function calculateLength() {
                var count = 0;
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        count++;
                    }
                }
                return count;
            }

            return {
                length: calculateLength(),

                clear: function () {
                    data = {};
                    this.length = 0;
                    clearData();
                },

                getItem: function (key) {
                    data = getData();
                    return data[key] === undefined ? null : data[key];
                },

                key: function (index) {
                    data = getData();
                    var keys = Object.keys(data);
                    if (index < 0 || index >= keys.length) {
                        return null;
                    }
                    return keys[index];
                },

                removeItem: function (key) {
                    data = getData();
                    if (data.hasOwnProperty(key)) {
                        delete data[key];
                        this.length--;
                        setData(data);
                    }
                },

                setItem: function (key, value) {
                    data = getData();
                    var isNewKey = !data.hasOwnProperty(key);
                    data[key] = String(value);
                    if (isNewKey) {
                        this.length++;
                    }
                    setData(data);
                },
            };
        };

        if (typeof window.localStorage === "undefined") {
            window.localStorage = new Storage("local");
        }

        if (typeof window.sessionStorage === "undefined") {
            window.sessionStorage = new Storage("session");
        }
    })();
}