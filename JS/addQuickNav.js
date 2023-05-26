$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const categ = urlParams.get('categ')
    $.ajax({
        type:'POST',
        url:'./PHP/getCategories.php',
        dataType:'json',
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        },
        success:function(data){
            const categs = document.createElement('div')
            categs.className = 'categsDiv'
            data.rows.sort(function(a, b) {
                if (a === categ) {
                  return -1;
                } else if (b === categ) {
                  return 1; 
                } else if (a === 'Other' || b === 'Other') {
                  return 0;
                }
                return a.localeCompare(b);
              });
            for (let index = 0; index < data.rows.length; index++) {
                const categDiv = document.createElement('div')
                categDiv.className = 'categDiv'
                categDiv.id = 'categ'+index
                const categText = document.createElement('p')
                categText.textContent = data.rows[index]
                categText.className = 'categText'
                categText.id = data.rows[index]
                categDiv.append(categText)
                categs.append(categDiv)
                categDiv.addEventListener('click', function(){
                    window.location.replace('./parts?categ='+data.rows[index])
                })
                if (categ==data.rows[index]) {
                    categText.style.color = 'white'
                    categText.style.fontWeight = 'bolder'
                    categDiv.style.backgroundColor = '#dcc110'
                }
            }
            let quickNav = document.getElementById('quickNav')
            quickNav.append(categs) 
            quickNav.firstElementChild.firstChild.addEventListener('click', function(){
              window.location.replace('./parts')
            })
        }
    })
})