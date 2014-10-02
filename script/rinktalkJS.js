var userId = 'pepband';
var autoQueueing = true;
var isNotifying = false;
var notifications = new Array();

$(document).ready(function(){
	FastClick.attach(document.body);
	$('#buttons').buttonset();
	loadAssets();
	setTimeout(autoQueue,15000);
	setTimeout(advanceQueue,30000);
	updateCount();
});

function autoQueue(){
	if(autoQueueing == true){

		var ran = Math.floor((Math.random()*10)+1);
		var ranQueue = Math.floor((Math.random()*10)+1);
		var currentQueue = "";

		if(ranQueue <=7){
			currentQueue = "breakQueue";
		}else{
			currentQueue = "mediaQueue";
		}

		if(ran <= 7){
			addQueueItem(currentQueue, index++, 'dj', 'DJ', 'pending');
		}else{
			addQueueItem(currentQueue, index++, 'ccrew', 'Corner Crew', 'pending');
		}
		setTimeout(autoQueue,(ran*1000)+10000);
	}
}

function advanceQueue(){
	if(autoQueueing == true){
		var ran = Math.floor((Math.random()*10)+1);
		var ranQueue = Math.floor((Math.random()*10)+1);
		var currentQueue = '';
		var message = '';
		
		if(ranQueue <=7){
			currentQueue = "breakQueue";
			message = "Whistle Break";
		}else{
			currentQueue = "mediaQueue";
			message = "Media Timeout";
		}
		
		if(document.getElementById(currentQueue).getElementsByTagName('div').length > 0){
			var remDiv = document.getElementById(currentQueue).getElementsByTagName('div')[0];
			$(remDiv).slideUp('fast',function(){
				$(remDiv).remove();
				var isNext = updateCount();
				playSound(isNext);
				if(isNext == 1){
					message = "You're up: next whistle break"
				}else if(isNext == 2){
					message = "You're up: next timeout"
				}
				notify(message);
			});
		}
		
		setTimeout(advanceQueue,(ran*1000)+15000);
	}
}

function addQueueItem(queueId, itemId, owner, description, status){
	var item = '<div class="queueItem" id="'+itemId+'" data-owner="'+owner+'" data-status="'+status+'" onclick="select(this);">'+description+'</div>';
	$('#'+queueId).append(item);
	$('#'+queueId+' div').last().hide();
	$('#'+queueId+' div').slideDown('fast');
	updateCount();
}

function notify(message){
	if(!isNotifying){
		sendNotify(message);
	}else{
		notifications.push(message);
	}
}

function sendNotify(message){
	$(".alertBox").html("<p>"+message+"</p>");
	$(".alertBox").animate({top:"60px"});
	isNotifying = true;
	setTimeout(function(){
		$(".alertBox").animate({top:"-100px"},function(){
			if(notifications.length > 0){
				var newMessage = notifications[0];
				notifications.shift();
				sendNotify(newMessage);
			}else{
				isNotifying = false;
			}
		});
	},5000)
	
}

function playSound(isNext){
	if(isNext == 1 || isNext == 2){
		document.getElementById('alert1').play();
	}else{
		document.getElementById('alert3').play();
	}
}

function removeQueueItem(){
	$(".selected").slideUp('fast',function(){$(".selected").remove();updateCount();});
	$('#removeButton').fadeOut('fast');
}

function requestQueue(){

}

var index = 0;
function requestQueueAdd(){
	var currentQueue = $('input[type="radio"][name="queues"]:checked').val();
	$('#addButton h3').hide();
	$('#loadingButton').fadeIn();
	document.getElementById('addButton').onclick = null;
	document.getElementById('addButton').style.cursor = 'default';
	setTimeout(function(){
		addQueueItem(currentQueue, index++, 'pepband', 'Pep Band', 'pending');
		$('#loadingButton').hide();
		$('#addButton h3').fadeIn();
		document.getElementById('addButton').onclick = requestQueueAdd;
		document.getElementById('addButton').style.cursor = 'pointer';
		document.getElementById('alert2').play();
		notify("You have been added to the queue");
	},3000);
}

function requestQueueRemove(){
	removeQueueItem();
}

function switchQueue(show,hide){
	$(hide).hide();
	$(show).show();
	$('#queueName').text($('label[for="'+$('input[value="'+show.substr(1)+'"]').attr('id')+'"]').text());
}

function select(which){
	which = $(which);
	if(which.attr('data-owner')==userId){
		if(which.hasClass('selected')){
			which.removeClass('selected');
			$('#removeButton').hide();
		}
		else{
			$('.queueItem').removeClass('selected');
			which.addClass('selected');
			$('#removeButton').fadeIn('fast');
		}
	}
}

function updateCount(){
	var breakCount = -1;
	var mediaCount = -1;
	var breakText = '';
	var mediaText = '';
	var isNext = 0;
	var message = '';

	var breakItems = document.getElementById('breakQueue').getElementsByTagName('div');
	var mediaItems = document.getElementById('mediaQueue').getElementsByTagName('div');

	for(var i=0;i<breakItems.length;i++){
		if(breakItems[i].getAttribute('data-owner') == userId){
			breakCount = i;
			break;
		}
	}

	for(var i=0;i<mediaItems.length;i++){
		if(mediaItems[i].getAttribute('data-owner') == userId){
			mediaCount = i;
			break;
		}
	}

	if(breakCount == 0){
		breakText = 'Next';
		$('#bEnd').text('Break');

		$('#breakCount').fadeIn('fast');
		$('#bEnd').fadeIn('fast');
		$('#breakCount').animate({backgroundColor: "green", color: "white"}, 500);
		isNext = 1;
	} else if(breakCount == -1){
		$('#breakCount').hide();
		$('#bEnd').hide();
		$('#amp').hide();
		$('#breakCount').animate({backgroundColor: "#D1D0CE", color: "black"}, 500);
	} else {
		breakText = (breakCount+1) + '';
		$('#bEnd').text('Breaks');

		$('#breakCount').fadeIn('fast');
		$('#bEnd').fadeIn('fast');
		$('#breakCount').animate({backgroundColor: "#D1D0CE", color: "black"}, 500);
	}

	$('#breakCount').text(breakText);

	if(mediaCount == 0){
		mediaText = 'Next';
		$('#mtEnd').text('Media Timeout');

		$('#mediaCount').fadeIn('fast');
		$('#mtEnd').fadeIn('fast');
		$('#mediaCount').animate({backgroundColor: "green", color: "white"}, 500);
		isNext = 2;
	} else if(mediaCount == -1){
		$('#mediaCount').hide();
		$('#mtEnd').hide();
		$('#amp').hide();
		$('#mediaCount').animate({backgroundColor: "#D1D0CE", color: "black"}, 500);
	} else {
		mediaText = mediaCount+1 + '';
		$('#mtEnd').text('Media Timeouts');

		$('#mediaCount').fadeIn('fast');
		$('#mtEnd').fadeIn('fast');
		$('#mediaCount').animate({backgroundColor: "#D1D0CE", color: "black"}, 500);
	}

	if(mediaCount == -1 && breakCount == -1){
		$('#leftColumn *').hide();
		$('#notQueued').fadeIn('fast');
	} else if(mediaCount != -1 && breakCount != -1){
		$('#amp').fadeIn('fast');
		$('#notQueued').hide();
		$('#youreon').fadeIn('fast');
	} else {
		$('#notQueued').hide();
		$('#youreon').fadeIn('fast');
	}

	$('#mediaCount').text(mediaText);
	return isNext;
}
