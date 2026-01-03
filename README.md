# 🎵 Video Audio Remover (FFmpeg + Node.js)

A simple Node.js script that **batch removes audio from videos** using **FFmpeg**.  
All videos inside the `inputs/` folder are processed automatically and saved without audio in the `outputs/` folder.

---

## 🚀 Features

- Batch process multiple videos
- Supports common formats: `.mp4`, `.mov`, `.avi`, `.mkv`
- Preserves original video quality (no re-encoding)
- Fast processing using FFmpeg
- Simple and lightweight

---

## 📁 Project Structure

project-root/
│
├── inputs/ # Put your videos here
├── outputs/ # Audio-free videos will be saved here
├── index.js # Main script
└── README.md


## 🛠 Requirements

- **Node.js** (v14+ recommended)
- **FFmpeg** installed and available in your system PATH

### Check FFmpeg installation
```bash
ffmpeg -version
```