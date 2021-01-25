const patternDict = [{
    pattern : "\\b(?<greeting>Hi|Hello|Hey)\\b",
    intent : "Hello"
 },{
    pattern : "\\b(bye|exit)\\b",
    intent : "Exit"
 },{
   pattern : "^([Ii]s|[Ww]ill).*(?<condition>hot|cold|sunny|rainy|cloudy).*(in)\\s(?<city>\\w+([ -.']?[A-Z]\w+)?)\\s(?<time>today|the\\sday\\safter\\stomorrow|tomorrow|in\\stwo\\sdays).*", 
   intent : "Yes or no Weather"
 },{
    pattern : "^[Hh]ow.*(\\sin\\s)\\b(?<city>\\w+([ -.']?[A-Z]\\w+?)?)\\s?\\??$",
    intent : "Human Weather"
 },{
     pattern : "\\b(\\sin\\s)\\b(?<city>\\w+([ -.']?[A-Z]\\w+?)?)\\s?\\??$",
     intent : "Current Weather"
 }];

module.exports = patternDict;