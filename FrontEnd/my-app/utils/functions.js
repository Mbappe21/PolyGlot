
export const displayAddr = (addr) => {
    return isNullAddr(addr) ? "null address" : addr
}

export const isNullAddr = (addr) => {
    if(addr !== undefined){
        return parseInt(addr.slice(2)) === 0 ? true : false
    }
    return false
}

export const convertToLang = (number) => {
    const langDict = {1:"English", 2:"French", 3:"Lingala"}
    if(langDict[number]){
        return langDict[number]
    } 
    return "language need not in dict"
}