const textElement = document.getElementById("changing-text");
const texts = ["salut! j'suis michelle.", // French
               "你好! 我叫 米歇尔.", // Chinese (ni hao, wo jiao)
               "szia! michelle vagyok.", // Hungarian
               "¡hola! soy michelle.", // Spanish
               "hallo! ich bin michelle.", // German
               "नमस्ते! मैं मिशेल हूं.", // Hindi
               "cześć! jestem michelle.", // Polish
               "أهلاً! أنا ميشيل.", // Arabic
            //    "привет! я Мишель.", // Russian
               "здрасти! аз съм Мишел.", // Bulgarian
            //    "こんにちは！私はミシェルです。", // Japanese
            //    "hej! jeg er michelle.", // Danish
            //    "안녕! 저는 미셸이에요.", // Korean
               "hi! i'm michelle."
            ]; // Add the text you want to cycle through
let currentIndex = 0;

function changeText() {
    textElement.textContent = texts[currentIndex];
    currentIndex = (currentIndex + 1) % texts.length;
}

setInterval(changeText, 3000); // Change text every 2 seconds (2000 milliseconds)


function clearForm() {
   document.getElementById("contact-form").reset();
}