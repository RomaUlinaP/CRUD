$(document).ready(function(){
    $('.delete-news').on('click', function(){
        var id = $(this).data('id');
        var url = '/delete/'+id;
        if(confirm('Delete News?')){
            $.ajax({
                url: url,
                type:'DELETE',
                success: function(result){
                    console.log('Deleting News...');
                    window.location.href='/';
                },
                error:function(err){
                    console.log(err);
                }
            });
        }
    });
    $('.edit-news').on('click', function(){
        $('#edit-form-title').val($(this).data('title'));
        $('#edit-form-content').val($(this).data('content'));
        $('#edit-form-category').val($(this).data('category'));
        $('#edit-form-id').val($(this).data('id'));
    });
});