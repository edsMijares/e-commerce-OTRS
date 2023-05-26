let burgMenu = document.getElementById("menuButton")
let menu = document.getElementById("menu")
let xButton = document.getElementById("xButton")
let logButton = document.getElementById("logButton")

burgMenu.addEventListener('click', function(){
    menu.classList.add('menuvisible')
    menu.classList.remove('menuhidden')
    burgMenu.style.visibility = "hidden"
    xButton.style.visibility = "visible"
})
function closeMenu(){
    menu.classList.add('menuhidden')
    menu.classList.remove('menuvisible')
    burgMenu.style.visibility = "visible"
    xButton.style.visibility = "hidden"
}
xButton.addEventListener("click", function(){
    closeMenu()
})

