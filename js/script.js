'use strict'
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
if (isMobile.any()){
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    if(menuArrows.length > 0){
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function() {
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }
}else{
    document.body.classList.add('_pc');
}
//like button
const like = document.querySelectorAll('.like');
for (let i = 0; i < like.length; i++) {
    like[i].addEventListener('click', (e) => {
       if(e.target.closest('.like')){
           e.target.closest('.like').classList.toggle('active');
        }
    })
}
//rating stars
const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0){
    initRatings()
}

function initRatings(){
    let ratingActive, ratingValue;
    for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        initRating(rating);
    }

    function initRating(rating) {
        initRatingVars(rating);

        setRatingActiveWidth();

        if (rating.classList.contains('rating_set')) {
            setRating(rating)
        }
    }


    function initRatingVars(rating) {
        ratingActive = rating.querySelector('.rating__active');
        ratingValue = rating.querySelector('.rating__value');
    }

    function setRatingActiveWidth(index = ratingValue.innerHTML) {
        const ratingActiveWidth = index / 0.05;
        ratingActive.style.width = `${ratingActiveWidth}%`;
    }

    function setRating(rating) {
        const ratingItems = rating.querySelectorAll('.rating__item');
        for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];
            ratingItem.addEventListener("mouseenter",function (e) {
                initRatingVars(rating);
                setRatingActiveWidth(ratingItem.value);
            });
            ratingItem.addEventListener("mouseleave",function (e) {
                
                setRatingActiveWidth();
            });
            ratingItem.addEventListener("click",function (e) {
                initRatingVars(rating);

                if (rating.dataset.ajax) {
                   setRatingValue(ratingItem.value, rating) 
                }else{
                    ratingValue.innerHTML = index+1;
                    setRatingActiveWidth()
                }
            });

        }
        
    }
    async function setRatingValue(value, rating){
        if(!rating.classList.contains('rating_sending')){
            rating.classList.add('rating_sending');

            let response = await fetch('rating.json',{
                method: 'GET',

                // body: JSON.stringify({
                //     userRating: value
                // }),
                // headers: {
                //     'content-type' :'application/json'
                // }
            });
            if (response.ok) {
                const result = await response.json();

                const newRating = result.newRating;

                ratingValue.innerHTML = newRating;

                setRatingActiveWidth();

                rating.classList.remove('rating_sending');  
            }else{
                alert("Error")

                rating.classList.remove('rating_sending'); 
            }
        }
    }
}


//animation on scroll

const animItems = document.querySelectorAll('._anime-items')

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll)
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;
            
            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((window.pageYOffset  > animItemOffset - animItemPoint) && window.pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active')
            } else{
                if(!animItem.classList.contains('_anim-no-hide')){
                    animItem.classList.remove('_active')
                }
            }
            
        }
    }
    function offset(el){
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}    
    }
    setTimeout(() => {
        animOnScroll();
    },500)
}
//open bug
$(document).ready(function()
{
    $('.openBug').click(function() {
        if(!$('.openBug').hasClass('openDone'))
        {
            setTimeout(()=>{
                $('.openBug').addClass('openDone');
                $('.bug__container').css("right", "0px");
            })
            $('.bug__container').css("display", "block");
        }
        else
        {
            $('.openBug').removeClass('openDone');
            $('.bug__container').css("right", "-999px");
            setTimeout(()=>{
                $('.bug__container').css("display", "none");
            },800)
        }
    });
    $('.closeBug').click(function(){
        $('.openBug').removeClass('openDone');
        $('.bug__container').css("right", "-999px");
        setTimeout(()=>{
            $('.bug__container').css("display", "none");
        },800)
    });

});

//open login
$(document).ready(function()
{
    $('#openLogin').click(function() {
        if(!$('#openLogin').hasClass('openDone'))
        {
            setTimeout(()=>{
                $('#openLogin').addClass('openDone');
                $('#login__container').css("right", "0px");
            })
            $('#login__container').css("display", "block");
        }
        else
        {
            $('#openLogin').removeClass('openDone');
            $('#login__container').css("right", "-999px");
            setTimeout(()=>{
                $('#login__container').css("display", "none");
            },800)
        }
    });
    $('#closeLogin').click(function(){
        $('#openLogin').removeClass('openDone');
        $('#login__container').css("right", "-999px");
        setTimeout(()=>{
            $('#login__container').css("display", "none");
        },800)
    });
});

//open local
$(document).ready(function()
{
    $('.openLocal').click(function() {
        if(!$('.openLocal').hasClass('openDone'))
        {
            setTimeout(()=>{
                $('.openLocal').addClass('openDone');
                $('.local__container').css("right", "0px");
            })
            $('.local__container').css("display", "block");
        }
        else
        {
            $('.openLocal').removeClass('openDone');
            $('.local__container').css("right", "-999px");
            setTimeout(()=>{
                $('.local__container').css("display", "none");
            },800)
        }
    });
    $('.closeLocal').click(function(){
        $('.openLocal').removeClass('openDone');
        $('.local__container').css("right", "-999px");
        setTimeout(()=>{
            $('.local__container').css("display", "none");
        },800)
    });
    

    //radio
    $.each($('.language__box'), function(index, val){
        if($(this).find('input').prop('checked')==true){
            $(this).addClass('active');
        }
    });
    $(document).on('click', '.language__box', function(event){
        $(this).parents('.language__wrapper').find('.language__box').removeClass('active');
        $(this).parents('.language__wrapper').find('.language__box input').prop('checked', false);
        $(this).toggleClass('active');
        $(this).find('input').prop('checked', true);
        return false;
    })

    $.each($('.currency__box'), function(index, val){
        if($(this).find('input').prop('checked')==true){
            $(this).addClass('active');
        }
    });
    $(document).on('click', '.currency__box', function(event){
        $(this).parents('.currency__wrapper').find('.currency__box').removeClass('active');
        $(this).parents('.currency__wrapper').find('.currency__box input').prop('checked', false);
        $(this).toggleClass('active');
        $(this).find('input').prop('checked', true);
        return false;
    })
});
//open search
$(document).ready(function()
{
    $('.openSearch').click(function() {
        if(!$('.openSearch').hasClass('openDone'))
        {
            setTimeout(()=>{
                $('.openSearch').addClass('openDone');
                $('.search__container').css("right", "0px");
            })
            $('.search__container').css("display", "block");
        }
        else
        {
            $('.openSearch').removeClass('openDone');
            $('.search__container').css("right", "-999px");
            setTimeout(()=>{
                $('.search__container').css("display", "none");
            },800)
        }
    });
    $('.closeSearch').click(function(){
        $('.openSearch').removeClass('openDone');
        $('.search__container').css("right", "-999px");
        setTimeout(()=>{
            $('.search__container').css("display", "none");
        },800)
    });
    

    //spoiler
    $('.spoiler__title').click(function(event){
        $(this).toggleClass('active').next().slideToggle(300);
        if($('.spoiler__block').hasClass('.one')){
            $('.spoiler__title').not($(this)).removeClass('active');
            $('.block__text').not($(this).next()).slideUp(300);
        }
    });

    // swap img
    $('.swap-img').click(function(event){
        $(this).addClass('active');
        $(this).closest('.swap-main').prop('src', this.src);
        if($('.hover__iner').hasClass('onlyOne')){
            $('.swap-img').not($(this)).removeClass('active');
            
        }
    })
});



// const like = document.querySelectorAll('.like');
// for (let i = 0; i < like.length; i++) {
//     like[i].addEventListener('click', (e) => {
    //    if(e.target.closest('.like')){
    //        e.target.closest('.like').classList.toggle('active');
    //     }
//     })
// }
//swap image
// const swapMain = document.querySelectorAll('.swap-main');
// const swapImg = document.querySelectorAll('.swap-img');
// for (let index = 0; index < swapImg.length; index++) {
//     swapImg[index].addEventListener('click', (e) => {
//     if(e.target.closest('.swap-img')){
//         e.target.closest('.swap-img').classList.add('active');
//     }
//     if( swapImg[index].classList.contains('active')){
//         swapImg[index].classList.remove('active');
//     }
//     })
    
// }
