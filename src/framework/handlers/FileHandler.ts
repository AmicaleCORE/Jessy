const fs = require("fs");

module.exports = function handle(path: string, subDirectories?: boolean): string[] {
    const list: string[] = []

    fs.readdirSync(path).forEach((file: string) => {
        if (subDirectories && fs.lstatSync(`${path}/${file}`).isDirectory()) handle(`${path}/${file}/`, true).forEach((f: string) => list.push(`${file}/${f}`))
        else if (file.endsWith(`.ts`)) list.push(`${file}`)
    })

    return list
}