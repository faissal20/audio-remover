

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

if (!fs.existsSync('temps')) {
    fs.mkdirSync('temps');
} else {
    fs.readdirSync('temps').forEach(file => {
        fs.unlinkSync(path.join('temps', file));
    }
    );
}

// process each video file
videoFiles.forEach((file, index) => {
    let videoPath = inputFolder + '/' + file;
    backgroundRemoval(videoPath, index);

});


function backgroundRemoval(index) {

    let command = `ffmpeg -i ${videoPath} -an -c:v copy temps/video_no_audio_${index}.mp4`;
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

function fixTheAspectRatio(file, index) {
    // ffmpeg -i "outputs/video_no_audio_${index}.mp4" -vf "crop=ih*9/16:ih" -c:a copy output_9x16.mp4
    let command = `ffmpeg -i temps/video_no_audio_${index}.mp4 -vf "crop=ih*9/16:ih" outputs/fixed_aspect_ratio_${index}.mp4`;
    // run the command using child_process
    const { exec } = require('child_process');
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error fixing aspect ratio: ${error.message}`);
            return;
        }
        console.log(`Aspect ratio fixed successfully: ${stdout}`);
    });
}   