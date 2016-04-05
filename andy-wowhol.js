var bodyParser     = require("body-parser");
var compression    = require("compression");
var express        = require("express");
var slashes        = require("connect-slashes");

//  Private credentials
var credentials = require('./credentials.js');

//  Battle.net library
var battlenet = require('./lib/battlenet.js')({
	consumerKey: credentials.battlenet.consumerKey,
	consumerSecret: credentials.battlenet.consumerSecret,
});

var app = express();

app.set("view engine", "jade");
app.set("views", "src/views/");                  //  TODO: set this to dist/views/ once there is a build script in place.

//  Treat "/foo" and "/Foo" as different URLs
app.set("case sensitive routing", true);

//  Treat "/foo" and "/foo/" as different URLs
app.set("strict routing", true);

//  Default to port 3000
app.set("port", process.env.PORT || 3000);

//  Make the static directory publicly accessible
app.use(express.static(__dirname + "/dist/static/"));

//  Compress all requests
app.use(compression());

//  Set up form handling
app.use(bodyParser.urlencoded({ extended: true }));

//  Enforce trailing slashes for URLs
app.use(slashes());

//  Home page
app.get("/", function(req, res) {
    //  TODO: Find out more about CSRF and add support for it (or remove this if it's not necessary)
    res.render("home", { csrf: "CSRF value goes here" });
});

//  Display page
app.get("/display/", function(req, res) {
    res.locals.realmName = req.query.realm;
    res.locals.characterName = req.query.character;

    //  TODO: Eventually this should be passed to the view with AJAX so we can render the rest of the page right away.
    res.locals.testData = battlenet.characterAvatar(req.query.realm, req.query.character, function(data) {
        res.locals.thumbnail = data.thumbnail;
        res.render("display");
    });
});

//  Process form submissions
app.post("/process/", function(req, res) {
    console.log("Form: " + req.query.form);
    console.log("CSRF token: " + req.body._csrf);
    console.log("Realm: " + req.body.realm);
    console.log("Character Name: " + req.body.characterName);

    //  TODO: eventually these should be like "/display/:realm/:character/" instead of a query string.
    res.redirect(303, "/display/?realm=" + req.body.realm + "&character=" + req.body.characterName);
});

//  Custom 404 page
app.use(function(req, res) {
    res.type("text/plain");
    res.status(404);
    res.send("404 - Not Found");
});

//  Custom 500 page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type("text/plain");
    res.status(500);
    res.send("500 - Server Error");
});

app.listen(app.get("port"), function() {
    console.log("Express started on http://localhost:" + app.get("port") + "; press Ctrl-C to terminate.");
});
