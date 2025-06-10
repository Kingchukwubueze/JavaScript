const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");
const strengthLabel = document.getElementById("strength-label");

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "![@#$%^&*()-_=+[\]{}|;:,.<>?]/";

lengthSlider.addEventListener("input", () =>{
    lengthDisplay.textContent = lengthSlider.value
})
generateButton.addEventListener("click", makePassword)
function makePassword(){
    const length = Number(lengthSlider.value);
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    if(!includeLowercase && !includeNumbers && !includeSymbols && !includeUppercase){
        alert("please select at least one character type")
        return
    }
    const newPassword = createRandomPassword(length,includeLowercase,
        includeNumbers, includeSymbols, includeUppercase
    )
    passwordInput.value = newPassword
    updateStrengthMeter(newPassword)
}

function updateStrengthMeter(password){
    const passwordLength = password.length;
    const hasUpperCase= /[A-Z]/.test(password)
    const hasLowerCase= /[a-z]/.test(password)
    const hasNumbers= /[0-9]/.test(password)
    const hasSymbols= /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password)
    
    let strengthScore =0;
    // here .min gets the minimum value
    // but this will make sure that "at maximum" you get 40
    strengthScore += Math.min(password.length * 2, 40)

    if(hasLowerCase) strengthScore += 15;
    if(hasNumbers) strengthScore += 15;
    if(hasSymbols) strengthScore += 15;
    if(hasUpperCase) strengthScore += 15;

    if(passwordLength < 8){
        strengthScore = Math.min(strengthScore, 40)
    }

//helps to ensure the width of the strength bar is a valid percentage 
 // ensure the width of the strength bar is a valid percentage
 const safeScore = Math.max(5, Math.min(100, strengthScore));
 strengthBar.style.width = safeScore + "%";


let strengthLabelText = " ";
let barColor = ""
if(strengthScore < 40){
    barColor = "#fc8181";
    strengthLabelText = "Weak";
}
 else if(strengthScore < 70){
    barColor = "#fbd38d";
    strengthLabelText = "Medium";
}
 else if(strengthScore > 70){
    barColor = "#68d391";
    strengthLabelText = "Strong";
}
strengthBar.style.backgroundColor = barColor;
strengthLabel.textContent = strengthLabelText;

}

function createRandomPassword(length,includeLowercase,
    includeNumbers, includeSymbols, includeUppercase
){
    let allcharacter =""
    if(includeLowercase) allcharacter += lowercaseLetters;
    if(includeNumbers) allcharacter += numberCharacters;
    if(includeSymbols) allcharacter += symbolCharacters;
    if(includeUppercase) allcharacter += uppercaseLetters;

    let password ="";
    for(let i =0; i<length; i++){
        const randomIndex = Math.floor(Math.random() * allcharacter.length)
        password += allcharacter[randomIndex]
    }
    return password
}

window.addEventListener("DOMContentLoaded", makePassword)
copyButton.addEventListener('click', () => {
    if(!passwordInput.value) return
    navigator.clipboard.writeText(passwordInput.value)
    .then(() => {showCopySuccess})
    .catch((error) => console.log("could not copy", error))
})
function showCopySuccess(){
    copyButton.classList.remove("far", "fa-copy")
    copyButton.classList.add("fas", "fa-checked")
    copyButton.style.color="#48bb78"
}

setTimeout(() => {
   copyButton.classList.remove("fas", "fa-check") 
   copyButton.classList.add("far", "fa-copy") 
   copyButton.style.color = "#"
}, 1500);