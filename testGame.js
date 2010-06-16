var PLAYGROUND_HEIGHT = 600;
var PLAYGROUND_WIDTH = 800;
var REFRESH_RATE = 30;

var PLAYER_HEIGHT = 16;
var PLAYER_WIDTH = 16;

var MOVEMENT = 2;

//key values
var LEFT = 65;
var RIGHT = 68;
var UP = 87;
var DOWN = 83;

var TILE_SIDE = 8;
var MAP_HEIGHT = PLAYGROUND_HEIGHT;
var MAP_WIDTH = PLAYGROUND_WIDTH;

var mapTile = new $.gameQuery.Animation({ imageURL: "mapPiece.png", numberOfFrame: 1});

function Player(){
	
	return true;
}

var mapCords;

//the mapArray is an array of strings made up of characters that make up a map file
//***(ignore this for now) ***the terrainArray is an array of strings alternating between a single character and the picture address
function makeMap(mapArray)
{
	MAP_HEIGHT = mapArray.length;
	
	mapCords = new Array(MAP_HEIGHT);
	
	var mapLine;
	
	for(var a = 0; a < MAP_HEIGHT; a++)
	{
		mapLine = mapArray[a];
		
		mapCords[a] = new Array(mapLine.length);
		
		if(MAP_WIDTH < mapLine.length)
		{
			MAP_WIDTH = mapLine.length;
		}
		
		for(var b = 0; b < mapLine.length; b++)
		{
			if(mapLine[b] == 'x')
			{
				mapCords[a][b] = 1;
			}
			else
			{
				mapCords[a][b] = 0;
			}
		}
	}
}

$(function(){
	var playerAnim1 = new $.gameQuery.Animation({ imageURL: "playerSprite.png", width: PLAYER_WIDTH, height: PLAYER_HEIGHT});

	$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, refreshRate: REFRESH_RATE, keyTracker: true});
	
		var theMap = ["xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
			"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
			"xx                                    xx",
			"xx                                    xx",
			"xx                                    xx",
			"xx                                    xx",
			"xxxxxxxxxxxxxxxx            xx        xx",
			"xxxxxxxxxxxxxxxx            xx        xx",
			"xx                          xx        xx",
			"xx                          xx        xx",
			"xx                          xx        xx",
			"xx                          xx        xx",
			"xx                          xx        xx",
			"xx                          xx        xx",
			"xx          xxxxxxxx   xxxxxxxxxxxxxxxxx",
			"xx          xxxxxxxx   xxxxxxxxxxxxxxxxx",
			"xx                                    xx",
			"xx                                    xx",
			"xx                                    xx",
			"xxxxxxxx                              xx",
			"xxxxxxxx                              xx",
			"xx                                    xx",
			"xx            xxxxxxxxxxxxxxxxxx      xx",
			"xx            xxxxxxxxxxxxxxxxxx      xx",
			"xx                                    xx",
			"xx                                    xx",
			"xx                                    xx",
			"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
			"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",];
	
	makeMap(theMap);
	
	$.playground().addGroup("background", {posx: 0, posy: 0, height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH}).end()
				.addGroup("shots", {height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH}).end()
				.addTilemap("myTilemap", mapCords, mapTile, {width: 8, height: 8, sizex: MAP_WIDTH, sizey: MAP_HEIGHT, posx: 0, posy: 0}).end()
				.addGroup("player", {posx: 200, posy: 200, height: PLAYER_HEIGHT, width: PLAYER_WIDTH})
					.addSprite("playerDefault", {animation: playerAnim1, posx: 0, posy: 0, width: PLAYER_WIDTH, height: PLAYER_HEIGHT});
	
	$("#player")[0].player = new Player($("#player"));
	
	// this sets the id of the loading bar:
	$().setLoadBar("loadingBar", 400);

	//initialize the start button
	$("#startbutton").click(function(){
		$.playground().startGame(function(){
			$("#welcomeScreen").remove();
		});
	})
	
	/*console.log("PLAYER_WIDTH: "+PLAYER_WIDTH);
	console.log("PLAYER_HEIGHT: "+PLAYER_HEIGHT);
	console.log("TILE_SIDE: "+TILE_SIDE);*/
	
	$.playground().registerCallback(function(){
		//$("#player")[0].player.update();
		if(jQuery.gameQuery.keyTracker[65]){ //this is left! (a)
			var nextpos = parseInt($("#player").css("left"))-MOVEMENT;
			if(nextpos >= 0){
				$("#player").css("left", ""+nextpos+"px");
				
				$("#player").collision(".tileSet,.tileType_0").each(function(){
					$("#player").css("left", ""+(parseInt($(this).css("left"))+TILE_SIDE)+"px");
					//console.log("left: "+$("#player").css("left"));
					//console.log("thisLeft: "+$(this).css("left"));
					//$("#player").css("top", ""+16+"px");
					//$("#player").css("left", ""+16+"px");
				});
			}
		}
		if(jQuery.gameQuery.keyTracker[68]){ //this is right! (d)
			var nextpos = parseInt($("#player").css("left"))+MOVEMENT;
			if(nextpos < PLAYGROUND_WIDTH - PLAYER_WIDTH){
				$("#player").css("left", ""+nextpos+"px");
				
				$("#player").collision(".tileSet,.tileType_0").each(function(){
					$("#player").css("left", ""+(parseInt($(this).css("left"))-PLAYER_WIDTH)+"px");
					//console.log("right: "+$("#player").css("left"));
					//console.log("thisRight: "+$(this).css("left"));
					//$("#player").css("top", ""+16+"px");
					//$("#player").css("left", ""+16+"px");
				});
			}
		}
		if(jQuery.gameQuery.keyTracker[87]){ //this is up! (w)
			var nextpos = parseInt($("#player").css("top"))-MOVEMENT;
			if(nextpos >= 0){
				$("#player").css("top", ""+nextpos+"px");
				
				$("#player").collision(".tileSet,.tileType_0").each(function(){
					$("#player").css("top", ""+(parseInt($(this).css("top"))+TILE_SIDE)+"px");
					//console.log("up: "+$("#player").css("top"));
					//console.log("thisUp: "+$(this).css("top"));
					//$("#player").css("top", ""+16+"px");
					//$("#player").css("left", ""+16+"px");
				});
			}
		}
		if(jQuery.gameQuery.keyTracker[83]){ //this is down! (s)
			var nextpos = parseInt($("#player").css("top"))+MOVEMENT;
			if(nextpos < PLAYGROUND_HEIGHT - PLAYER_HEIGHT){
				$("#player").css("top", ""+nextpos+"px");
				
				$("#player").collision(".tileSet,.tileType_0").each(function(){
					$("#player").css("top", ""+(parseInt($(this).css("top"))-PLAYER_HEIGHT)+"px");
					//console.log("down: " + $("#player").css("top"));
					//console.log("thisDown: "+$(this).css("top"));
					//$("#player").css("top", ""+16+"px");
					//$("#player").css("left", ""+16+"px");
				});
				
			}
		}
		
	}, REFRESH_RATE);
});