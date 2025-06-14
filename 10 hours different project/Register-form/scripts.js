const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener('submit', function(e){
    e.preventDefault();
    const isRequired = checkRequired([username,email,password,confirmPassword])

  let   isFormValid = isRequired;
    if(isRequired){
        const isUsernameValid = checkLength(username, 3, 15)
        const isEmailValid = checkEmail(email)
        const isPasswordValid = checkLength(password, 6, 25)
        const isPasswordMatch = checkPasswordMatch(password, confirmPassword)

        isFormValid = isEmailValid && isUsernameValid&&isPasswordMatch&&isPasswordValid
    }
    if(isFormValid){
        alert("Registration Successful")
        form.reset();
        document.querySelectorAll(".form-group").forEach((group) =>
        group.className = "form-group")
    }
})
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${formatFieldName(input)} must be at least ${min} character`)
        return false
    } else if(input.value.length > max){
        showError(input, `${formatFieldName(input)} must be less than ${max} character`)
        return false
    }else{
        showSuccess(input)
        return true
    }
}
function checkEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email.value.trim())){
        showSuccess(email)
        return true
    } else {
        showError(email, "Email is not valid")
        return false
    }
}
function checkPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, "Password do not match")
        return false
    }
    return true 

}

function checkRequired(inputArray){
    let isValid = true 
    inputArray.forEach(input => {
        if(input.value.trim() === ""){
            showError(input, `${formatFieldName(input)} is required`)
            isValid= false
        }else{
            showSuccess(input)
        }

    })
    return isValid
}
function formatFieldName(input){
   //  input id : username --> Username
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
function showError(input, message){
    const formGroup = input.parentElement;
    formGroup.className = "form-group error"
    const small = formGroup.querySelector('small');
    small.innerText = message
}
function showSuccess(input){
const formGroup = input.parentElement;
formGroup.className = "form-group error"
}