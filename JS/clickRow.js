function clickRow(row){
    let searchBar = document.getElementById('inputSearch')
    if (searchBar.hasFocus()) {
        let id = document.getElementById(row).textContent
        window.location.replace("./productUpdate?id="+id)
    }
}