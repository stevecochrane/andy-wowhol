# andy-wowhol

A silly toy Node app where you input a World of Warcraft realm name and character name, and it then displays that character's avatar in an Andy Warhol pop art style.
This was done to learn more about building applications with Node and Express, and to try making something with the Battle.net API.

A lot of this was learned from the excellent book [Web Development with Node & Express](http://shop.oreilly.com/product/0636920032977.do) by Ethan Brown.

### Setup

If you want to run this locally you'll need to register for a [Battle.net API](https://dev.battle.net/) account. The app expects there to be a `credentials.js` file in
the base directory, which should look like this:

```javascript
module.exports = {
    battlenet: {
        consumerKey: "",
        consumerSecret: ""
    }
};
```

Once you've added that with your key and secret, and assuming you already have [Node](https://nodejs.org/) installed, navigate to the base directory with a command line
interface and do this:

```bash
npm install
gulp
node andy-wowhol.js
```

This will run the application locally. For the best visuals, install the Futura PT font family locally with Typekit.

### Legal Disclaimer

Blizzard is the source of the data, but Blizzard is not endorsing and is not affiliated with this application. This application is consistent with
[Blizzard's Privacy Policy](http://us.blizzard.com/en-us/company/about/privacy.html). Data is provided to players on an "as is" basis consistent with the disclaimers
in Section 7. This application does not collect, use, store or disclose any player's personal information or data in any manner that violates applicable laws, rules
or regulations. This application does not collect, use or store any player's personal information. This application does not collect, store or otherwise intercept
a player's Battle.net password.
