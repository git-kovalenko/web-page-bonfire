$(document).ready(function(){
	
	var select_currency = document.getElementById('currency');
	select_currency.onchange = currency_change;
	function currency_change(){ 
		var currency = select_currency.value;
		
		//var uls = document.getElementsByClassName('price');
		//var uls = $(".price li:last-child").text();
		
		//$(".price li:first-child").text(currency);
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
				
				//var p = this.children[i].textContent;
				for (var i = 1; i<n; i++){
					this.children[i].textContent = a.toString().slice(i-1, i);
				}
			});
		}
		//uls[0].style.backgroundColor = "red";
	}
	
	currency_change();
	
})