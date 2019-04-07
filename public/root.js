
// 點選TODO list nav bar 切換顯示
$('.nav__completed').click(function(){
    $('.nav__completed').addClass('active');
    $('.nav__mytask').removeClass('active');
    $('.task__inprogress').hide();
    $('.task__completed').show();
});

$('.nav__mytask').click(function(){
    $('.nav__mytask').addClass('active');
    $('.nav__completed').removeClass('active');
    $('.task__completed').hide();
    $('.task__inprogress').show();
});