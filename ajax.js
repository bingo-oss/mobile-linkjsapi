const stream = weex.requireModule('stream');

let ajax = {
    exec(method,params){
        return new Promise((resolve, reject) => {
            let url = params.url || "";
            let headers = params.headers || {};
            let data = params.data || {};
            let type = params.type || "json";
            let timeout = params.timeout || 30000;

            if(method=="GET"){
                if (url.indexOf("?")<0) {
                    url += "?";
                }
                if (typeof data == "object") {
                    let dLength = Object.keys(data).length;
                    for (let i = 0; i < dLength; i++) {
                        let key = Object.keys(data)[i];
                        let value = encodeURIComponent(data[key]);
                        url += `${key}=${value}`;
                        if (i != dLength - 1) {
                            url += "&";
                        }
                    }
                }
            }
            // headers["Content-Type"]="application/x-www-form-urlencoded";
            // headers["Content-Type"]="application/json";
            let reqParam={
                method:method,
                type: type,
                url: url,
                headers: headers,
                timeout:timeout
            };
            if(method!="GET"){
                if (typeof data == "object") {
                    data = JSON.stringify(data);
                }
                reqParam["body"]=data;
            }
            stream.fetch(reqParam, (res) => {
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