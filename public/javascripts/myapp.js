$(document).ready(function() {

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            $(".eric-nav").css('boxShadow','0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)');
            $(".eric-nav").css('position','fixed');
        } else {
            $(".eric-nav").css('boxShadow','none');
            $(".eric-nav").css('position','relative');
           // document.getElementsByClassName("eric-nav").style.boxShadow = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }







})