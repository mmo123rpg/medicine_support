(function($){

    $.fn.modal = function(){

        return this.click(function(e){
           
            e.preventDefault();
            openModal(e); 

            $(".modal-backdrop").on("click", function() {
                closeModal();
            });

            $('[data-dismiss="modal"]').on("click", function() {
                closeModal();
            });

        });
        
        function openModal(e){
            var scrollPos = $(document).scrollTop();
            var target_name = e.currentTarget.dataset.target;
            $("body").addClass("modal-open").css("top",-scrollPos);
            $('<div class="modal-backdrop"></div>').appendTo("body").hide().fadeIn(400);
            $("#" + target_name).fadeIn(400);           
        } 

        function closeModal(){
            var body_top = parseInt($('body').css('top')); 
            $("body").find(".modal").fadeOut(400);
            $(".modal-backdrop").fadeOut("400", function() {
                $(this).remove();    
                $("body").removeClass("modal-open");    
                $("html").scrollTop(body_top*-1);                   
            });                         
            
        } 

        return this;
    };

    
 
 })(jQuery);