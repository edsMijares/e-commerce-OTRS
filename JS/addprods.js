$(document).ready(function(){
    async function getCategories(categSelected){
        await $.ajax({
            type:'POST',
            url:'./PHP/getCategories.php',
            dataType:'json',
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
            success: function(data){
                if(data.status=='ok'){
                    let categories = data
                    for(let i=0;categories.categ.length>i;i++){
                        let newOption = document.createElement('option')
                        newOption.textContent = categories.categ[i]
                        newOption.value = categories.categ[i]
                        $('.selectCateg').append(newOption)
                    }
                    document.getElementById('selectCateg').value = 'Other'
                }
                if(data.status=='error'){
                    console.log(data.error)   
                }
            }
        })
    }
    getCategories()
    $('#submitButton').on('click', function(){
        let categ = document.getElementById('selectCateg').value
        let newCategInput = document.getElementById('nCategInput')
        if(newCategInput.value.trim()){
            categ = newCategInput.value
        }
        var file_data = $('#imgInput').prop('files')[0];
        var form_data = new FormData();
        form_data.append('imgInput', file_data);
        form_data.append('productnameInput', $('#productnameInput').val());
        form_data.append('priceInput', $('#priceInput').val());
        form_data.append('quantityInput', $('#quantityInput').val());
        form_data.append('selectCateg', categ);
        form_data.append('descInput', $('#descInput').val());
        $.ajax({
            url: './PHP/uploadNewProds.php',
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function(response) {
                window.location.reload()
                alert(response.message)
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.responseText)
            }
        });
    })
})