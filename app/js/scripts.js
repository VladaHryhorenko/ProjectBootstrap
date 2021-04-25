$( document ).ready(function() {
  
  function checkWidth() {
        var windowWidth = $('body').innerWidth(),
            elem = $('.border-class');
            elem1 = $('.team-card-col');
            elem2 = $('.style-one');
            elem3 = $('.style-two')
          
        if(windowWidth > 991){
          elem.addClass('border-class-lg');
          elem2.addClass('hover-style-one');
          elem3.addClass('hover-style-two')
        }

        if(windowWidth < 992 && windowWidth > 768){
          elem.removeClass('border-class-lg');
          elem.addClass('border-class-md');
          elem1.addClass('team-md-card-wrapper');
          elem2.removeClass('hover-style-one');
          elem3.removeClass('hover-style-two');
        }
        else {
          elem.addClass('border-class-mob');
          elem.removeClass('border-class-md');
          elem1.addClass('team-md-card-wrapper');
          
        }
      }
    
      checkWidth(); // проверит при загрузке страницы
    
      $(window).resize(function(){
        checkWidth(); // проверит при изменении размера окна клиента
      });

      $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
      });
      $('.slider-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        focusOnSelect: true,
        autoplay: true,
        centerMode: true,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 490,
            settings: {
              //arrows: false,
              slidesToShow: 1
            }
          }
        ]
      });
        
  
});