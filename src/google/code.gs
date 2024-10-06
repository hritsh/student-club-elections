function doPost(e) {
	var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Votes");
	var data = JSON.parse(e.postData.contents);

	var club = data.club;
	var vote = data.vote;
	var voter = data.voter; // New parameter
	var time = new Date().toLocaleString("en-US", { hour12: true });

	sheet.appendRow([time, club, vote, voter]); // Append voter to the row

	return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Vote recorded" }))
		.setMimeType(ContentService.MimeType.JSON)
		.setHeader("Access-Control-Allow-Origin", "*")
		.setHeader("Access-Control-Allow-Methods", "POST")
		.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function doGet(e) {
	return ContentService.createTextOutput("This web app is working. Use POST to submit votes.")
		.setHeader("Access-Control-Allow-Origin", "*")
		.setHeader("Access-Control-Allow-Methods", "GET")
		.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function doOptions(e) {
	return ContentService.createTextOutput("")
		.setMimeType(ContentService.MimeType.TEXT)
		.setHeader("Access-Control-Allow-Origin", "*")
		.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
		.setHeader("Access-Control-Allow-Headers", "Content-Type");
}
