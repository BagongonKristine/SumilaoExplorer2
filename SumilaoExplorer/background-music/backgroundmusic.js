document.addEventListener("DOMContentLoaded", function() {
    if (typeof audio === 'undefined') {
        const audio = document.createElement('audio');
        audio.src = '../assets/best-adventure-ever-122726.mp3'; // Ensure this path is correct
        audio.autoplay = true;
        audio.loop = true;
        document.body.appendChild(audio);
    }
});
