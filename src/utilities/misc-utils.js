export  function nullifyEmpty(data) {
    for (const key in data) {
        if (data.hasOwnProperty(key) && data[key] === '') {
            data[key] = null;
        }
    }
    return data;
}