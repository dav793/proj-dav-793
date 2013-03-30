
var pages = {

    home : {

    	loadCarousel : function(){
            
            var settings = {
                className : "rotomania-carousel",
                autoScroll : false,
                animationEasing : "easeOutExpo",
                animationDuration : 650,
                useNavigationButtons : true,
                leftButtonClassname : "left-btn",
                rightButtonClassname : "right-btn"
            };

            rotomania.load(settings);

        },

        init : function(){
            pages.home.loadCarousel();
        }

    },
    
    general : {
    	
    	footerHeightAdjust : function(){

            var docHeight = 0;

			$(document).ready(function() {

                docHeight = $("#wrapper").height();

                if( $(window).height() > $("#wrapper").height() ) {
                    $("#wrapper").height( $("#wrapper").height() + ( $("body").height() - $("#wrapper").height() ) );
                }
                else {
                    if( $("#wrapper").height() > docHeight ) {
                        $("#wrapper").height( $(window).height() );
                    }
                }
                
            });

            $(window).resize(function(){

                if( $(window).height() > $("#wrapper").height() ) {
                    $("#wrapper").height( $("#wrapper").height() + ( $("body").height() - $("#wrapper").height() ) );
                }
                else {
                    if( $("#wrapper").height() > docHeight ) {
                        $("#wrapper").height( $(window).height() );
                    }
                }

            });

    	},

        navAccountBoxAdjust : function(){

            var accountBoxHorizontalOffset = parseInt($("nav #account-box").css("right"));
            var hitPoint = null;

            var colliders_selector = "nav #account-box";
            var obstacles_selector = ".search-box";
            var hits = null;

            $(document).ready(function(){

                hits = $(colliders_selector).collision(obstacles_selector);

                if(typeof hits.html() != 'undefined') {
                    hitPoint = window.innerWidth;
                    $("nav #account-box").css("right","");
                    $("nav #account-box").css("left","20px");
                    $("nav #account-box").css("text-align","left");
                }

                if(hitPoint != null && window.innerWidth > hitPoint) {
                    $("nav #account-box").css("left","");
                    $("nav #account-box").css("right","20px");
                    $("nav #account-box").css("text-align","right");
                }

            });

            $(window).resize(function(){

                hits = $(colliders_selector).collision(obstacles_selector);

                if(typeof hits.html() != 'undefined') {
                    hitPoint = window.innerWidth;
                    $("nav #account-box").css("right","");
                    $("nav #account-box").css("left","20px");
                    $("nav #account-box").css("text-align","left");
                }

                if(hitPoint != null && window.innerWidth > hitPoint) {
                    $("nav #account-box").css("left","");
                    $("nav #account-box").css("right","20px");
                    $("nav #account-box").css("text-align","right");
                }

            });

        },

        widthAdjust : function(){

            $(document).ready(function() {
                
                if( window.innerWidth < $("#header-container").outerWidth() ) {
                    $("#wrapper").width($(document).width());
                    $("html").css("overflow-x","scroll");
                }
                else {
                    $("#wrapper").width(window.innerWidth);
                    $("html").css("overflow-x","hidden");
                }

            });

            $(window).resize(function(){

                if( window.innerWidth < $("#header-container").outerWidth() ) {
                    $("#wrapper").width($(document).width());
                    $("html").css("overflow-x","scroll");
                }
                else {
                    $("#wrapper").width(window.innerWidth);
                    $("html").css("overflow-x","hidden");
                }

            });

        }
    	
    },

    globalInit : function(){
        pages.general.footerHeightAdjust();
        pages.general.navAccountBoxAdjust();
        pages.general.widthAdjust();
    }
    
};
