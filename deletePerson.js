function deleteperson(id){
    console.log(`here ${id}`)
    $.ajax({
        url: '/contact/' + id,
        type: 'DELETE',
        success: function(results){
            window.location.reload(true);
        }
    })
};