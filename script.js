var sketchfabModule = window['sketchfab-iframe'];
var moduleVersion = sketchfabModule.version;

var Sketchfab = sketchfabModule.Sketchfab;
Q = sketchfabModule.Q;

// example with only start stop
var urlid = "6ce8d158a38f41b39db26427c7c65f50";
var iframeWindow = $('#myIframe')[0];
var options = {
	"nocamera":1,
	"autostart":1,
	"transparent":0,
	"controls":0,
	"watermark":0,
	"desc_button":0,
	"stop_button":0,
	"autospin":0
};
var api = new Sketchfab(iframeWindow);


Q.when(api.load(urlid,options)).then(function(data) {
	api.start();
	$("#example-status").text(" Scene Loaded");
}).fail( function(error) {
	$("#example-status").text(" Error can't load scene");
});

$("#example-stop").click(function() {

	Q.when(api.stop()).then(function(data) {
		$("#example-status").text("Scene Stopped");
	}).fail( function(error) {
		$("#example-status").text("Error stop scene");
	});
});

var duration = 4.0;
var targety = 100.0;
var target = [0,0, targety];
var cameraList = [
{ eye: [25,80,100],
	target: [0,0,100],
	text: "Admin Building"
},
{ eye: [10, 0, targety],
	target: target,
	text: "Right"
},
{ eye: [0,10, targety],
	target: target,
	text: "Back"
},
{ eye: [-10,0, targety],
	target: target,
	text: "Left"
}
];
$("#example-list").change(function(){
	autospin:0;
	var currentCamera = $(this).val();
	var cam = cameraList[currentCamera];
	//var nextCamText = cameraList[currentCamera].text;
	//$("#example-camera")[0].innerHTML = cam.text;
	Q.when(api.lookat(cam.eye, cam.target, duration), function() {
		$("#example-camera-status").text("Animation " + cam.text + " finished");
	});
});
/*$('#inputbox').keyup(function(e) {
	if(e.keyCode == 13) {
   api.lookat($(this).val(),[0,0,100], 4);
});*/
