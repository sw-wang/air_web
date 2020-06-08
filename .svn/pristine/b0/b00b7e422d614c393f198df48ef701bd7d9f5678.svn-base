export const base64toFile = (dataurl) => {
    var bytes = window.atob(dataurl.split(',')[1])
    var ab = new ArrayBuffer(bytes.length)
    var ia = new Uint8Array(ab)
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
    }
    return new Blob([ab], { type: 'image/jpg' })
}
