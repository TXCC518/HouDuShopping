const container = document.querySelectorAll('.container')[0];
const signIn = document.querySelector('#sign-in');
const signUp = document.querySelector('#sign-up');

signUp.onclick = function () {
  container.classList.add('active');
}
signIn.onclick = function () {
  container.classList.remove('active');
}