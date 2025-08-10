// LANGUAGE TITLE ROTATION
const titleElement = document.querySelector(".mrworldwide");

const texts = [
   { text: "hi! i'm michelle.", lang: "en", dir: "ltr" }, // English 
   { text: "salut! j'suis michelle.", lang: "fr", dir: "ltr" }, // French 
   { text: "你好! 我叫米歇尔.", lang: "zh", dir: "ltr" }, // Chinese (ni hao, wo jiao) ** needs matching font
   { text: "szia! michelle vagyok.", lang: "hu", dir: "ltr" }, // Hungarian 
   { text: "¡hola! soy michelle.", lang: "es", dir: "ltr" }, // Spanish 
   { text: "здрасти! аз съм мишел.", lang: "bg", dir: "ltr" }, // Bulgarian 
   { text: "cześć! jestem michelle.", lang: "pl", dir: "ltr" }, // Polish 
   { text: ".مرحبا! أنا ميشيل", lang: "ar", dir: "rtl" }, // Arabic  
   { text: "नमस्ते! मैं मिशेल हूं.", lang: "hi", dir: "ltr" }, // Hindi **
   { text: "hallo! ich bin michelle.", lang: "de", dir: "ltr" }, // German
   { text: "hej! jeg er michelle.", lang: "da", dir: "ltr" }, // Danish 
   { text: "こんにちは！私はミシェルです。", lang: "ja", dir: "ltr" }, // Japanese 
   { text: "привет! я мишель.", lang: "ru", dir: "ltr" }, // Russian 
   { text: "안녕! 저는 미셸이에요.", lang: "ko", dir: "ltr" }, // Korean **
   { text: ".سلام! من میشل هستم", lang: "fa", dir: "rtl" }, // Persian/Farsi 
];

const pauseBetween = 1000; // ms pause after each string
const typingDelay = 100;   // ms pause between characters

async function Type(str) {
   return new Promise((resolve) => {
      let i = 0;
      function typeChar() {
            if (i < str.length) {
               titleElement.textContent += str[i];
               i++;
               setTimeout(typeChar, typingDelay); // type each character with delay
            } else {
               resolve(); // done typing
            }
      }
      titleElement.textContent = ""; // clear previous
      typeChar();
   });
}

async function typeLoop() {
   while (true) {
      for (const { text, lang, dir } of texts) {
         titleElement.setAttribute("dir", dir);
         titleElement.setAttribute("lang", lang);
         await Type(text);
         await new Promise(res => setTimeout(res, pauseBetween));
      }
   }
}

typeLoop();