$(document).ready(function(){
    function getProducts(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let search = '%'+urlParams.get('search')+'%';
        if (search == '%'+null+'%') {
            search = '%'
        }
        $.ajax({
            type:'POST',
            url:'./PHP/getProductList.php',
            dataType:'json',
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
            data:{
                search:search
            }, 
            success:function(data){   
                if (data.status=='ok') {
                    let stockStatus = null
                    for (var i = 0; i < data.rows.length; i++) {
                        if(data.rows[i].stock>10){
                            stockStatus = 'Good'
                        }
                        else if(data.rows[i].stock<=10 && !(data.rows[i].stock==0)){
                            stockStatus = 'Short'
                        }
                        else{
                            stockStatus = 'OUT OF STOCK'
                        }
                        var row = $(`<tr onclick="clickRow('`+'row'+i+`')">`);
                        row.append($("<td id="+'row'+i+">").text(data.rows[i].id));
                        row.append($('<td>').text(data.rows[i].productName));
                        row.append($('<td>').text(data.rows[i].stock));
                        row.append($("<td class='"+stockStatus.replace(/\s/g, '')+"'>").text(stockStatus));
                        $('#prodsTable').append(row); 
                    }
                }
            }
        })
    }
    let searchInput = document.getElementById('inputSearch')
    searchInput.addEventListener('input', function(){
        var currentUrl = window.location.href;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let searchValue = urlParams.get('search');
        if (searchValue == null ) {
            var newUrl = currentUrl + '?search='+searchInput.value;            
        }else{
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('search', searchInput.value);
            const newUrl = `${window.location.pathname}?${urlParams.toString()}`;           
            window.history.pushState({ path: newUrl }, '', newUrl);
        }
        window.history.pushState({ path: newUrl }, '', newUrl);
        document.querySelectorAll('#prodsTable tr:not(:first-child)').forEach(row => row.remove());
        getProducts()
    })
    getProducts()
})