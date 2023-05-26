function openTab(tabElement,bgElement, divElement){
    document.getElementById(tabElement).style.color = "white"
    document.getElementById(bgElement).style.backgroundColor = "#F55139"
    document.getElementById(divElement).style.visibility = "visible"

}
function resetStyle(tabText, tabElement, bgElement){
    for(const text in tabText){
        const elementText = tabText[text] 
        const elementBg = "background"+text.charAt(0).toUpperCase() + text.slice(1)
        const elementDiv = text+'Div'
        document.getElementById(elementDiv).style.visibility = "hidden"
        if(tabElement!=elementText){
            document.getElementById(elementText).style.color = "black"
            document.getElementById(elementBg).style.backgroundColor = "white"
        }
    }
}

const tabText = {
    cart: "cartText",
    pending: "pendingText",
    toShip: "toShipText",
    received: "receivedText",
    completed: "completedText"
}
for(const text in tabText){
    const tabElement = text+"Text"
    const bgElement = "background"+text.charAt(0).toUpperCase() + text.slice(1)
    const divElement = text+'Div'
    document.getElementById(tabElement).onclick = function(){
        resetStyle(tabText, tabElement, bgElement)
        openTab(tabElement, bgElement, divElement)
    }
}