$(document).ready(function(){
	currency_init();
	
	
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


	
