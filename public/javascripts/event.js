var GetEventID = function() {
	var idCounter = 0
	return function() {
		return idCounter++
	}
}()

var MinionCreateEvent = function(playerID, minionType) {
	return {
		type: "MinionCreate",
		playerID: playerID,
		minionType: minionType,
		eventID: playerID+"-"+GetEventID(),
		time: (new Date).getTime()
	}
}

var GameStartEvent = function(playerID) {
	return {
		type: "GameStart",
		eventID: playerID+"-"+GetEventID(),
		time: (new Date).getTime()
	}
}
