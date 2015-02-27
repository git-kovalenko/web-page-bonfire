var slider = {
	slides:['slide_1.jpg','slide_2.jpg','slide_3.jpg','slide_4.jpg','slide_5.jpg'],
	frame:0, 
	set: function(frame) { 
		$("#slider > ul li:visible").hide();
		$('#slider > ul li:eq('+frame+')').show();
		
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
	


$(document).ready(function(){
	currency_init();
	
	slider.init();
	setInterval(function() { 
		slider.right();
	},1000);
	
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


