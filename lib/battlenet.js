var https = require("https");

module.exports = function (battlenetOptions) {
    return {
        characterAvatar: function(realmName, characterName, callback) {
            var options = {
                hostname: "us.api.battle.net",
                port: 443,
                method: "GET",
                path:
                    "/wow/character/" +
                    encodeURIComponent(realmName) +
                    "/" +
                    encodeURIComponent(characterName) +
                    "?locale=en_US" +
                    "&apikey=" + battlenetOptions.consumerKey
            };
            https.request(options, function(res) {
                var data = "";
                res.on("data", function(chunk) {
                    data += chunk;
                });
                res.on("end", function() {
                    callback(JSON.parse(data));
                });
            }).end();
        }
    };
};
