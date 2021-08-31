// Import all images
export function importAll(r: __WebpackModuleApi.RequireContext) {
    let images: any = {}
     r.keys().forEach((item, index) => {
        images[item.replace('./', '')] = r(item) })
    return images
   }

export const images = importAll(require.context('./images/houses', false, /\.(png|jpe?g|svg)$/))

export const imagesLength = Object.keys(images).length

// Random number generator for random image
export function* shuffle(arr: any) {
    var i = arr.length
    while(i--) {
        yield arr.splice(Math.floor(Math.random() * (i+1)), 1)[0]
    }
}

export function getRandomRating(arr: any) {
    return arr[Math.floor((Math.random() * arr.length))]
}

// Time delay for loading component
export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
