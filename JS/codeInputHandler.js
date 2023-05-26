let num1 = document.getElementById('num1')
let num2 = document.getElementById('num2')
let num3 = document.getElementById('num3')
let num4 = document.getElementById('num4')
let num5 = document.getElementById('num5')
let num6 = document.getElementById('num6')
let codeDiv = document.getElementById('codeDiv')

num1.addEventListener('input', function(){
    num1.disabled = 'true'
    num2.disabled = false
    num2.focus()
})
num2.addEventListener('input', function(){
    num2.disabled = 'true'
    num3.disabled = false
    num3.focus()
})
num3.addEventListener('input', function(){
    num3.disabled = 'true'
    num4.disabled = false
    num4.focus()
})
num4.addEventListener('input', function(){
    num4.disabled = 'true'
    num5.disabled = false
    num5.focus()
})
num5.addEventListener('input', function(){
    num5.disabled = 'true'
    num6.disabled = false
    num6.focus()
})
num6.addEventListener('input', function(){
    num6.disabled = 'true'
    verify(num1.value, num2.value, num3.value, num4.value, num5.value, num6.value)
})
codeDiv.addEventListener('click', function(){
    num1.disabled = false
    num1.value = null
    num2.value = null
    num3.value = null
    num4.value = null
    num5.value = null
    num6.value = null
    num1.focus()
})
