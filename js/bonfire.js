$(document).ready(function(){
	currency_init();
	
	slider.init();
	setInterval(function() { 
		slider.right();
	},3000);
	
	
	var brand_slider = $('.brands > ul');
	var next_link = $('.brands > img:last-child');
	var prev_link = $('.brands > img:first-child');
	var is_animate = false;
	var slide_width = $(brand_slider).children().first().outerWidth(true);
	//var scroll_slider = brand_slider.position().left - slide_width;
	var scroll_width = brand_slider.width() / 4;
	
	$(next_link).click( function(){
		//alert(1);
			
		if(!brand_slider.is(':animated')) {
			brand_slider.animate({left: scroll_width}, 500, function(){
			$(brand_slider)
			.find('li:first-child')
			.appendTo(brand_slider);
			});
		}
	});

	
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



