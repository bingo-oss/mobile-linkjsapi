const stream = weex.requireModule('stream');

let ajax = {
    exec(method,params){
        return new Promise((resolve, reject) => {
            let url = params.url || "";
            let headers = params.headers || {};
            let data = params.data || {};
            let type = params.type || "json";

            if (typeof data == "object") {
                data = JSON.stringify(data);
            }

            if(method=="GET"){
                if (!url.includes("?")) {
                    url += "?";
                }
                if (typeof data == "object") {
                    for (let key in data) {
                        url += `&${key}=${encodeURIComponent(data[key])}`;
                    }
                }
            }
            // headers["Content-Type"]="application/x-www-form-urlencoded";
            // headers["Content-Type"]="application/json";
            stream.fetch({
                method:method,
                type: type,
                url: url,
                headers: headers,
                body: data
            }, (res) => {
                if (res.ok) {
                    resolve(res.data, res.status, res.statusText);
                } else {
                    reject(res.status, res.statusText);
                }
            });
        });
    }
}

module.exports = ajax;