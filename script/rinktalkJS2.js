var dave = [68,97,118,101,33];
var dave2 = [65,110,100,121,33];
var typed = [0,0,0,0];

$(document).keypress(function(event) {
	var count1 = 0;
	var count2 = 0;

	typed[0]=typed[1];
	typed[1]=typed[2];
	typed[2] = typed[3];
	typed[3] = typed[4];
	typed[4] = event.which;

	for(var i=0;i<=4;i++)
	{
		if(typed[i] == dave[i]){
			count1++;
		}
		if(typed[i] == dave2[i]){
			count2++;
		}
	}
	if(count1 == 5){
		document.getElementById("audio1").play();
		$('#daveImg1').show();
		$('#daveImg1').css({right: "100%"});
		$('#daveImg1').animate({right: "50%"},700,"easeOutQuint");
		$('#daveImg1').animate({right: "-900px"},1000,"easeInQuint");


	}else if(count2 == 5){
		document.getElementById("audio2").play();
		// $('#daveImg2').show();
		// $('#daveImg2').css({right: "100%"});
		// $('#daveImg2').animate({right: "50%"},700,"easeOutQuint");
		// $('#daveImg2').animate({right: "-900px"},1000,"easeInQuint");
	}

});

function loadAssets() {
	$('body').append('<audio id="audio1"><source src="https://jmt521.github.io/RinkTalk/assets/dave.mp3" type="audio/mpeg"></audio><audio id="audio2"><source src="https://jmt521.github.io/RinkTalk/assets/dave2.mp3" type="audio/mpeg"></audio><img src="https://jmt521.github.io/RinkTalk/assets/dave.png" id="daveImg1" class="imgRes">');

}

function movePic() {

}
