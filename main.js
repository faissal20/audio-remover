

console.log("Hello, Audio Remover!");

// get all video paths from the input folder
const fs = require('fs');
const path = require('path');

const inputFolder = path.join(__dirname, 'inputs');

let videoFiles = fs.readdirSync(inputFolder).filter(file => {
    return ['.mp4', '.mov', '.avi', '.mkv'].includes(path.extname(file).toLowerCase());
});

// clean the outputs folder
let outputFolder = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
} else {
    fs.readdirSync(outputFolder).forEach(file => {
        fs.unlinkSync(path.join(outputFolder, file));
    });
}

// process each video file
videoFiles.forEach((file, index) => {
    let videoPath = inputFolder + '/' + file;
    backgroundRemoval(videoPath, index);
});


function backgroundRemoval(videoPath, index) {

    let command = `ffmpeg -i ${videoPath} -an -c:v copy outputs/video_no_audio_${index}.mp4`;
    // run the command using child_process
    const { exec } = require('child_process');
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error removing background: ${error.message}`);
            return;
        }
        console.log(`Background removed successfully: ${stdout}`);
    });
}