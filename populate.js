var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

//var nb_posts = 200;
var nb_posts = 200;
var nb_per_page = 13;
var nb_pages = Math.ceil(nb_posts / nb_per_page) + 1;

var current_page = 0;
var current_post = 0;

var debug = 1;

// If you want to change the database name, you need to change
// the sails config (config/connections.js)
//var json_output_file = "./.tmp/localDiskDb.db";
var json_output_file = "populate.json";
var vdm_base_uri = "http://www.viedemerde.fr";

// Delete database
fs.unlink(json_output_file, function(err) {
   if (err) { return console.error(err); }
   console.log('File', json_output_file, 'deleted successfully!');
});

while (current_page < nb_pages) {
	var vdm_uri = vdm_base_uri + "?page=" + current_page;
	console.log('GET', vdm_uri, 'OK');
	// Get vdm content
	request({uri: vdm_uri}, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(body);
				
				// Search datas
				$('.article').each(function() {
						var content = $(this).children().first().text();
						var datas = $(this).children().next().children().next().children().next().text();
						var line = datas.split(/\s/);
						if (debug) { 
							console.log("###");
							console.log(content);
							console.log(line[1]);	//date
							console.log(line[3]);	//time
							console.log(line[8]);	//author
							console.log(json_output);
						}
						
						// Make a JSON
						var json_output = JSON.stringify({content: content, date: line[1] + " " + line[3], author: line[8], id: nb_posts});
						
						// Write JSON into database
						if (nb_posts > 0) {
							fs.appendFileSync(json_output_file, json_output + ",");
						}
						
						nb_posts--;
				});
				
			
		}else{
			return console.error('GET', vdm_uri, 'ERR');
		}
	});
	current_page++;
}