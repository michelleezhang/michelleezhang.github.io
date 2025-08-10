
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