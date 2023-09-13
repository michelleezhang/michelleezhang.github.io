// LANGUAGE TITLE ROTATION
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
            ]; 
let currentIndex = 0;

function changeText() {
    textElement.textContent = texts[currentIndex];
    currentIndex = (currentIndex + 1) % texts.length;
}

setInterval(changeText, 5000); // Change text every 2 seconds (2000 milliseconds)


// CONTACT FORM -- clears form after submission
document.addEventListener('DOMContentLoaded', function() {
   const form = document.getElementById('contact-form');

   form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
      
      // Serialize the form data (you may need to adjust this based on your form structure)
      const formData = new FormData(form);
      const formDataObject = {};
      formData.forEach((value, key) => {
         formDataObject[key] = value;
      });
      
      // Send the form data to Formspree
      fetch('https://formspree.io/f/mjvzgkeo', {
         method: 'POST',
         body: JSON.stringify(formDataObject),
         headers: {
               'Content-Type': 'application/json'
         }
      })
      .then(response => {
         if (response.ok) {
               // Form submission was successful, reset the form
               form.reset();
               alert('Form submitted successfully!');
         } else {
               // Handle errors or failed submissions here
               alert('Form submission failed.');
         }
      })
      .catch(error => {
         // Handle network or other errors here
         alert('An error occurred while submitting the form.');
      });
   });
});
