function doPost(e) {
	var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Votes");
	var data = JSON.parse(e.postData.contents);

	var club = data.club;
	var vote = data.vote;
	var time = new Date().toLocaleString("en-US", { hour12: true });

	sheet.appendRow([time, club, vote]);

	return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Vote recorded" }))
		.setMimeType(ContentService.MimeType.JSON)
		.setHeader("Access-Control-Allow-Origin", "*");
}

function doGet(e) {
	return ContentService.createTextOutput("This web app is working. Use POST to submit votes.").setHeader(
		"Access-Control-Allow-Origin",
		"*"
	);
}

function doOptions(e) {
	var output = ContentService.createTextOutput();
	output.setMimeType(ContentService.MimeType.TEXT);

	output.setHeader("Access-Control-Allow-Origin", "*");
	output.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
	output.setHeader("Access-Control-Allow-Headers", "Content-Type");

	return output;
}
