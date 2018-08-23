export default (async function (response) {
    let token = null;

    try {
        token = await response;
    } catch (e) {
        console.log(e);
    }
    return token;
})();