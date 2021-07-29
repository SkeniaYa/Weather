// const signupForm = document.forms.signupForm;

// signupForm?.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   const formData = Object.fromEntries(new FormData(event.target));
//   console.log("formData--->>>", formData);
//   const response = await fetch("/auth/signup", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   });

//   // if (response.status === 401) {

//   // }
//   if (response.status === 418) {
//     signupForm.insertAdjacentHTML(
//       "beforeend",
//       `<a class="nav-link" href="/auth/signin">go to log in</a>`
//     );
//   }

//   if (response.redirected) {
//     window.location = response.url;
//   }
// });
