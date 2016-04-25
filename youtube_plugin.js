
var util = require('util');
var winston = require('winston');
var youtube_node = require('youtube-node');
var AuthDetails = require("./auth.json");


function YoutubePlugin () {
	this.RickrollUrl = 'https://www.youtube.com/channel/UCvymkgtc1QWxNkqssX1S7eA';
	this.youtube = new youtube_node();
	this.youtube.setKey(AuthDetails.youtube_api_key);
	this.youtube.addParam('type', 'video');
};


YoutubePlugin.prototype.respond = function (query, channel, bot) {
	this.youtube.search(query, 1, function(error, result) {
			if (error) {
				//winston.error("Error querying youtube: " + error);
				bot.sendMessage(channel, "¯\\_(ツ)_/¯");
			}
			else {
				if (!result || !result.items || result.items.length < 1) {
					//winston.error("No results from youtube");
					bot.sendMessage(channel, "¯\\_(ツ)_/¯");
				} else {
					bot.sendMessage(channel, "https://www.youtube.com/channel/UCvymkgtc1QWxNkqssX1S7eA" + result.items[0].id.videoId );
				}
			}
		});

};


module.exports = YoutubePlugin;
