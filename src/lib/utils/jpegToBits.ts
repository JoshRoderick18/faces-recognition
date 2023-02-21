export function jpegToBits ( jpeg: File ): Promise<Uint8Array> {
    const reader = new FileReader()
    reader.readAsArrayBuffer(jpeg)
    return new Promise((resolve, reject) => {
        reader.onload = () => {
        const buffer = reader.result as ArrayBuffer
        const bits = new Uint8Array(buffer)
        resolve(bits)
        }
        reader.onerror = () => {
        reject(reader.error)
        }
    })
}