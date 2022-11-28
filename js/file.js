var readTextFile = (file) => {
    return new Promise((resolve) => {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = () => {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status == 0) {
                    resolve(rawFile.responseText);
                }
            }
        }
    })
}