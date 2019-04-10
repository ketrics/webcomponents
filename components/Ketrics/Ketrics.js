export class Ketrics extends Object{
    static import = (meta, module) => {
        const url = new URL(meta.url);
        const repo = meta.url.split("@")[0];
        const version = meta.url.split("@")[1].substring(0, meta.url.split("@")[1].indexOf("/"));
        const moduleUrl = `${repo}@${version}${module}${url.search}`;

        const existingScript = document.getElementById(moduleUrl);

        if (!existingScript) {
            const script = document.createElement('script');
            script.id = btoa(moduleUrl);
            script.src = moduleUrl;
            script.type = 'module';
            document.body.appendChild(script);
        }
    };

    static getAccessToken(){
        const tokens = JSON.parse(localStorage.getItem("tokens"));
        return tokens.access;
    }
}
