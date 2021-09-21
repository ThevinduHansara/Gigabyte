const Asena = require('../events');
const config = require('../config');
const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});
let baseURI = '/apps/' + config.HEROKU.APP_NAME;

   var inblock_dsc = ''
    var alr_on = ''
    var alr_off = ''
    var inblock_on = ''
    var inblock_off = ''
    if (config.LANG == 'EN') {
        inblock_dsc = 'Inbox Block'
        alr_on = '*Inbox Block System - ON*'
        alr_off = '*Inbox Block System - OFF*'
        inblock_on = '*Inbox Block System Turned ON!*'
        inblock_off = '*Inbox Block System Turned OFF!*'
    }
    Asena.addCommand({pattern: 'inblock ?(.*)', fromMe: true, desc: inblock_dsc, usage: '.inblock on / off' }, (async (message, match) => {
        if (match[1] == 'off') {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['INBOX_BLOCK']: 'false'
                    } 
                });
                await message.sendMessage(inblock_off)
        } else if (match[1] == 'on') {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['INBOX_BLOCK']: 'true'
                    } 
                });
                await message.sendMessage(inblock_on)
        }
    }));
