const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')

ffmpeg.setFfmpegPath(ffmpegPath)

function humanFileSize(size) {
    var i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
}

async function reverseIcon(path) {
    const newPath = path.replace('.webm', '-reversed.webm')

    return new Promise((res) => ffmpeg(path)
        .inputOptions(
            '-c:v', 'libvpx-vp9',
        )
        .addOptions(
            '-vf', 'reverse',
            '-c:v', 'libvpx-vp9',
            '-af', 'areverse',
        )
        .on('error', (error) => {
            console.log(`Error: ${newPath} => ${error}`)
            res()
        })
        .on('progress', (progress) => {
            if (process.stdout) {
                process.stdout.clearLine?.()
                process.stdout.cursorTo?.(0)
                process.stdout.write?.(`Processing: ${progress.currentFps} fps | ${progress.frames} frames | ${humanFileSize(progress.targetSize * 1024)} | ${progress.timemark}`)
            }
        })
        .on('end', () => {
            console.log(`\nDone: ${newPath}`)
            res()
        })
        .save(newPath)
    )
}

fs.readdirSync('./public/assets/animatedIcons').forEach(async (file) => {
    if (file.includes('-reversed.webm')) return
    await reverseIcon(`./public/assets/animatedIcons/${file}`)
})