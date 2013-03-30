
var rotomania = {

	settings : {
		className : null,
		maxVisibleItems : 5,
		autoScroll : true,
		autoScrollDelay : 4000,
		autoScrollDirection: "left",
		animationEasing : "linear",
		animationDuration : 1000,
		useNavigationButtons : false,
		leftButtonClassname : null,
		rightButtonClassname : null
	},

	load : function(paramSettings){
		if(paramSettings != null) {
			if(paramSettings.className != null){
				this.settings.className = paramSettings.className;
			}
			else {
				this.log("The CSS className for the element(s) to apply rotomania must be defined in the settings parameter.");
			}
			if(paramSettings.maxVisibleItems != null){
				this.settings.maxVisibleItems = paramSettings.maxVisibleItems;
			}
			if(paramSettings.autoScroll != null){
				this.settings.autoScroll = paramSettings.autoScroll;
			}
			if(paramSettings.autoScrollDelay != null){
				this.settings.autoScrollDelay = paramSettings.autoScrollDelay;
			}
			if(paramSettings.autoScrollDirection != null){
				this.settings.autoScrollDirection = paramSettings.autoScrollDirection;
			}
			if(paramSettings.animationEasing != null){
				this.settings.animationEasing = paramSettings.animationEasing;
			}
			if(paramSettings.animationDuration != null){
				this.settings.animationDuration = paramSettings.animationDuration;
			}
			if(paramSettings.useNavigationButtons != null){
				this.settings.useNavigationButtons = paramSettings.useNavigationButtons;
			}
			if(paramSettings.leftButtonClassname != null){
				this.settings.leftButtonClassname = paramSettings.leftButtonClassname;
			}
			if(paramSettings.rightButtonClassname != null){
				this.settings.rightButtonClassname = paramSettings.rightButtonClassname;
			}

		}

		if(this.settings.useNavigationButtons == true){
			try {
				if(this.settings.leftButtonClassname == null || this.settings.rightButtonClassname == null){
					throw "If 'useNavigationButtons' is true, then 'leftButtonClassname' and 'rightButtonClassname' must be defined in the settings parameter.";
				}

				if(this.settings.leftButtonClassname == "" || this.settings.rightButtonClassname == ""){
					throw "If 'useNavigationButtons' is true, then 'leftButtonClassname' and 'rightButtonClassname' must be defined properly in the settings parameter. An empty string is not allowed.";
				}
			}
			catch(err) {
				this.log(err);
			}
		}

		$("."+this.settings.className).each(function(){

			var animating = false;
			var itemCount = 0;
			var content = $(this).find(".content");
			var items = content.children("div");

			content.css("position","relative");
			items.each(function(){
				$(this).css("position","absolute");
				$(this).css("left", itemCount * $(this).width() + "px");
				itemCount++;
			});

			if(rotomania.settings.useNavigationButtons == true) {

				var leftButton = $(this).find("."+rotomania.settings.leftButtonClassname);
				var rightButton = $(this).find("."+rotomania.settings.rightButtonClassname);

				if(itemCount <= rotomania.settings.maxVisibleItems) {
					leftButton.css('display','none');
					rightButton.css('display','none');
				}
				else{
					leftButton.css('display','block');
					rightButton.css('display','block');

					leftButton.click(function(){
						animateLeft();
					});

					rightButton.click(function(){
						animateRight();
					});

				}

			}

			if(rotomania.settings.autoScroll == true) {

				if(itemCount > rotomania.settings.maxVisibleItems) {

					if(rotomania.settings.autoScrollDirection == "left"){
						window.setInterval(function(){
							animateLeft();
						}, rotomania.settings.autoScrollDelay);
					}

					if(rotomania.settings.autoScrollDirection == "right"){
						window.setInterval(function(){
							animateRight();
						}, rotomania.settings.autoScrollDelay);
					}

				}

			}

			function animateLeft(){

				if(animating == false){
					
					animating = true;

					items.each(function(){

						if( $(this).css("left") == "0px" ) {
							$(this).addClass("first-item");
						}

						$(this).animate({
								left: '-=' + $(this).width()
							}, rotomania.settings.animationDuration, rotomania.settings.animationEasing, function() {

					      		if( $(this).hasClass("first-item") ) {
					      			$(this).removeClass("first-item");
					      			$(this).css("left", (itemCount-1) * $(this).width() + "px");
					      			animating = false;
					      		}
					      		
				    		}
				    	);

					});

				}

			}

			function animateRight(){

				if(animating == false){
					
					animating = true;

					items.each(function(){
						if( $(this).css("left") == (itemCount-1) * $(this).width() + "px" ) {
							$(this).css("left", 0 - $(this).width() + "px");
						}
					});

					items.each(function(){

						$(this).animate({
								left: '+=' + $(this).width()
							}, rotomania.settings.animationDuration, rotomania.settings.animationEasing, function() {
								animating = false;
				    		}
				    	);

					});

				}

			}
			
		});
		
	},

	log : function(msg){
	    setTimeout(function() {
	        throw new Error(msg);
	    }, 0);
	}

};