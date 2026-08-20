let myPromise = new Promise((ok, no) => {
    let arr = [10, 20, 30];

    if (arr.length > 1) ok(arr.length);
    else no("Array length is 0");
});
myPromise
    .then((x) => {
        let num = x * 10;
        return num;
    })
    .then(() => {
        console.log(y);
    })
    .catch((er) => {
        console.log(er); //if error oucceure will apper as astring not error
    })
    .finally(() => {
        console.log("evry time"); // will apper whatever
    });
