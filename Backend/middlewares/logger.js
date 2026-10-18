export const logger = (req, res, next) => {
    console.log('ciao')
    const { method, url } = req
    console.log(`${method}, ${url}`)
    next()
}