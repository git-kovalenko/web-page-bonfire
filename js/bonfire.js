$(document).ready(function(){
	currency_init();
	
	slider.init();
	setInterval(function() { 
		slider.right();
	},3000);
	
	brand_slider_init();
	

	
})

function currency_init(){
	var dropdown_currency = document.getElementById('currency');
	dropdown_currency.selectedIndex = 0;
	dropdown_currency.onchange = currency_change;
}
	
function currency_change(){ 
	var currency = document.getElementById('currency').value;
	switch (currency) {
		case 'dollars':
			$(".price li:first-child").html("$");
			change_rate(1.15);  //this is an example. In real project price takes from MySQL.
			break
		case 'euro':
			$(".price li:first-child").text("€"); //€ -> Alt+0128
			change_rate(0.87);	//this is an example. In real project price takes from MySQL.			
			break
	}
	$(".price li:first-child").append('<div class="shine"></div>');
	
	function change_rate(rate){
		$.each($(".price"), function(){
			var a = this.textContent;
			a = rate * parseInt(a.replace(/[^0-9]/gm, ''),  10);
			a = a.toFixed(); 
			var n = this.children.length;
			for (var i = 1; i<n; i++){
				this.children[i].textContent = a.toString().slice(i-1, i);
			}
		});
	}
}

var slider = {
	slides:['slide_1.jpg','slide_2.jpg','slide_3.jpg','slide_4.jpg','slide_5.jpg'],
	frame:0, 
	set: function(frame) { 
		$("#slider > ul li:visible").hide();
		$('#slider > ul li:eq('+frame+')').show();
		var ruler = $('#slide_ruler > ul li');
		for (var i = 0; i < 5; i++){
			ruler[i].style.backgroundColor = '';
		}
		ruler[frame].style.backgroundColor = 'white';
	},
	init: function() { 
		var slider_list = document.querySelector("#slider > ul");
		while (slider_list.firstChild){
			slider_list.removeChild(slider_list.firstChild);			
		}
		for (var i = 0; i<5; i++){
			$(slider_list).append('<li><img src="images/'+this.slides[i]+'" alt="Slide '+(i+1)+'"></li>');
		}
		this.set(this.frame);
		$('#slide_ruler > ul').click( function(e){ 
			var target = e.target;
			slider.set($(target).index());
			slider.frame = $(target).index();
		});
	},
	left: function() { 
		this.frame--;
		if(this.frame < 0) this.frame = this.slides.length-1;
		this.set(this.frame);
	},
	right: function() { 
		this.frame++;
		if(this.frame == this.slides.length) this.frame = 0;
		this.set(this.frame);		
	}
};

function brand_slider_init(){
	var brand_slider = $('.brand_logo:first-child');
	var next_link = $('.brands > img:last-child');
	var prev_link = $('.brands > img:first-child');
	var is_animate = false;
	var scroll_width = '25%';
	var animation_time = 400;
	
	$(next_link).click( function(){
		if(!brand_slider.is(':animated')) {
			$('.brand_logo:last-child').insertBefore(brand_slider);
			brand_slider = $('.brand_logo:first-child');
			$(brand_slider).css({margin: '0 0 0 -'+scroll_width});
			brand_slider.animate({margin: '0'}, animation_time);
		}
	});
	$(prev_link).click( function(){
		if(!brand_slider.is(':animated')) {
			brand_slider.animate({margin: '0 0 0 -'+scroll_width}, animation_time, function(){
				var first_slide = $('.brand_logo:first-child');
				$(first_slide).remove();
				$(first_slide).css({margin: '0'});
				$(first_slide).insertAfter('.brand_logo:last-child');
				brand_slider = $('.brand_logo:first-child');
			});
		}
	});
}

