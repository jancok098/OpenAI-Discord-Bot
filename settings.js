// Load a yaml settings file, or create if it doesn't exist
var yaml = require('js-yaml');
var fs = require('fs');

var default_settings = {
    "text_completion_model": "text-davinci-003",
    "text_completion_temperature": 0.9,
    "conversation": true,
    "imitate_messages_history": 100, //discord only allows 100 messages to be fetched
  }

var settings = {}

try {
  settings = yaml.load(fs.readFileSync('data/settings.yaml', 'utf8'));
} catch (e) {
  console.log(e);
  console.log("Creating new settings file.");
  settings = default_settings;
    fs.writeFileSync('data/settings.yaml', yaml.dump(settings));
}

//function for getting the settings. If the key is not found, get the value from default_settings
settings.get = function(key) {
    if (settings[key] == undefined) {
        return default_settings[key];
    } else {
        return settings[key];
    }
}

//a function for updating the settings
settings.update = function(key, value) {
    settings[key] = value;
    fs.writeFileSync('data/settings.yaml', yaml.safeDump(settings));
}

//export the settings module
module.exports = settings;

