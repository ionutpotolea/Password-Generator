const btn = document.getElementById("btn")
const inputs = document.querySelectorAll("main input")
const passLengthEl = document.querySelector("#pass-length")

let passLength = +passLengthEl.value

passLengthEl.addEventListener("change", () => {
    // passLength=passLengthEl.value
    passLength = limitNumber(+passLengthEl.value, +passLengthEl.min, +passLengthEl.max)
    passLengthEl.value = passLength
})
passLengthEl.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {generateAllPaswords}
})

btn.addEventListener("click", generateAllPaswords)

function generateAllPaswords(e){
    if(passLength < passLengthEl.min){passLength = passLengthEl.min}
    else if(passLength > passLengthEl.max){passLength = passLengthEl.max}
    passLengthEl.value = passLength
    
    e.preventDefault()
    inputs.forEach(input => {
          input.value = generateNewPassword()
          input.addEventListener("click", (e) => copyToClipboard(e))
      })
}

let allChars = generateChars()

function generateChars(){
    let allChars = []
    for (let i=32; i<127; i++){
        allChars.push(String.fromCharCode(i))
    }
    return allChars
}

function generateNewPassword(){
    let newPass = []
    for (let i=0; i<passLength; i++){
        let randomNumber = Math.floor(Math.random()*allChars.length)    
        newPass.push(allChars[randomNumber])
    }
    return newPass.join("")
}

function copyToClipboard(e) {
    /* Get the text field */
    let copyText = e.target

    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value).then(function() {
    alert("copied to clipboard!")
    }, function(err) {
    console.log("error!", err)
    });
}

function limitNumber(num, min, max){
    if (num<min){
        return min
    } else if (num>max){
        return max
    } else return num
}