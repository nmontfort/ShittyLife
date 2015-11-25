var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

// Parameters 
var nb_posts = 200;		// Number of posts
var nb_per_page = 13;	// Number posts per page
var debug = 0;				// Debug mode (0/1)

// Web site uri
var vdm_base_uri = "http://www.viedemerde.fr";

// If you want to change the database name, you need to change
// the sails config (config/connections.js)
var json_output_file = "./.tmp/localDiskDb.db";

var i_nb_posts = nb_posts;
var nb_pages = Math.ceil(nb_posts / nb_per_page) + 1;
var current_page = 0;
var current_post = 0;

// Json structure for Sails
var json_output = {
		"data" : {
			'posts' : []
		},
		"schema" : {
		  "posts": {
		    "content": {"type": "string"},
		    "date": {"type": "date"},
		    "author": {"type": "string"},
		    "id": {"type": "integer", "primaryKey": true, "unique": true},
		  }
		},
		"counters" : {
			"posts": {"id": nb_posts}
		}
};

// Delete database file
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
				
				// Search vdm content
				$('.article').each(function() {
						var content = $(this).children().first().text();
						var datas = $(this).children().next().children().next().children().next().text();
						var line = datas.split(/\s/);
						if (debug) { 
							console.log('###');
							console.log('Content:', content);
							console.log('Date:', line[1]);	//date
							console.log('Time:', line[3]);	//time
							console.log('Author:', line[8]);	//author
						}

						// Create a limit and write database file
						if (json_output.data.posts.length < nb_posts && i_nb_posts > 0) {
							json_output.data.posts.push({content: content, date: line[1] + " " + line[3], author: line[8], id: i_nb_posts});											
						}else{
							if (json_output.data.posts.length == nb_posts && i_nb_posts == 0) {
								fs.appendFileSync(json_output_file, JSON.stringify(json_output));
							}
						}

						i_nb_posts--;
				});				
			
		}else{
			return console.error('GET', vdm_uri, 'ERR');
		}		
	});
	current_page++;

	// force request sync
	setTimeout(function(){
	}, 2000);
}
