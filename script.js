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

var cameraList = {};
cameraList["Academic Block"] = { 
	eye: [1250,200,350],
	target: [350,1100,350],
};
cameraList["C Block Side Entrance"] = { 	
	eye: [-650, 200, 50],
	target: [-650,400,50],
};
cameraList["C 102"] = { 	
	eye: [-700, 550, 50],
	target: [800,550,50],
};
cameraList["C 101"] = { 	
	eye: [-600, 550, 50],
	target: [-800,550,50],
};

$("#example-list").change(function(){
	var currentCamera = $("option:selected").text();
	console.log(currentCamera);
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
