
export const Constants = {
    CAMERA_DEFAULT_HEIGHT: 160,
    BLOCK_WIDTH: 16
}

export enum UnitType {
    OBJECT,     //地图物体
    UNIT,       //战斗单位
}

export function csvHeader(csv: string) {
    const lines = csv.split('\n')
    const delimiters = /[, \t]/
    const headers = lines[0].split(delimiters)
    return headers
}

export function parseCSV(csv: string) {
    const lines = csv.split('\n')
    const result: Map<string, string>[] = []
    const delimiters = /[, \t]/
    const headers = lines[0].split(delimiters)
    // result.push(headers)
    for (let i = 0; i < lines.length; i++) {
        let currentline = lines[i]
        const obj = new Map()
        for (let j = 0; j < headers.length; j++) {
            obj[headers[i]] = currentline[j]
        }
        result.push(obj)
    }
    return result
}
