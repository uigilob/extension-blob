function $blob(target__$, scoop__$ = {}) {
    //scoop__$ is optional;
    var self__$ = target__$
    var data_el__$ = $qs(target__$.getAttribute("blob-t")) || self__$;
    var cnt_type__$ = data_el__$.getAttribute("blob-typ") || "text/plain";
    var swap__$ = data_el__$.getAttribute("blob-data")
    var fileName__$ = data_el__$.getAttribute("blob-name");
    var url_apply__$ = data_el__$.getAttribute("blob-url-t") || "download";
    if (swap__$ == null) {
        var from_data__$ = data_el__$.getAttribute("blob-swap") /*exmaple textContent or innerHTML ..*/
        if (from_data__$ != null) {
            swap__$ = data_el__$[from_data__$]
        }
    }

    if (cnt_type__$ = "application/json") {
        swap__$ = swap__$.replace(/\$[a-zA-Z_][a-zA-Z0-9_]*/g, function (match__$) {
            try {
                var dynamic_is__$ = match__$.substring(1);
                if (dynamic_is__$ in scoop__$) {
                    return scoop__$[dynamic_is__$]
                }

                return eval(match__$.substring(1));
            } catch (e) {
                return match__$;
            }
        });

        try {
            swap__$ = JSON.stringify(JSON.parse(swap__$), null, 2);

        } catch (e) {
            null;
        }

    }

    var blob = new Blob([swap__$], { type: cnt_type__$ });
    var url = URL.createObjectURL(blob)

    if (url_apply__$ == "apply") {
        data_el__$.setAttribute("href", url)
        data_el__$.setAttribute("download", fileName__$)
    } else if (url_apply__$ == "url") {
        data_el__$.setAttribute("href", url)
    }
    else {
        var link = document.createElement('a');
        link.href = url;
        link.download = fileName__$;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url); // Clean up the URL.createObjectURL
    }



}

document.addEventListener("evn-run",function()
$qsall('[blob-if]').forEach(function (b__$) {
    if (b__$.getAttribute("blob-set") == null) {
        b__$.setAttribute("blob-set", "t")
        event___$ = b__$.getAttribute("blob-if")
        if (event___$ == "void") {
            $blob(b__$)
        } else {
            b__$.addEventListener(event___$, function () {
                $blob(this)
            })
        }
    }
});
});
