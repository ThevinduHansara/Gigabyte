const Asena = require('../events');
const config = require('../config');
const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});
let baseURI = '/apps/' + config.HEROKU.APP_NAME;

   var l_dsc = ''
    var alr_on = ''
    var alr_off = ''
    var TLINK_on = ''
    var TLINK_off = ''
   
    if (config.LANG == 'EN') {
        l_dsc = 'Anti Whatsapp Group Link'
        alr_on = '*Anti Whatsapp Group Link System Already ON!*'
        alr_off = '*Anti Whatsapp Group Link System Already OFF!*'
        LINKT_on = '*Anti Whatsapp Group Link System Turned ON!*'
        LINKT_off = '*Anti Whatsapp Group Link System Turned OFF!*'
    }
   
    Asena.addCommand({pattern: 'whatsblock ?(.*)', fromMe: true, desc: l_dsc, usage: '.blocklink on / off' }, (async (message, match) => {
        if (match[1] == 'off') {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['WHATS_LINK_BLOCK']: 'false'
                    } 
                });
                await message.sendMessage(LINKT_off)
        } else if (match[1] == 'on') {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['WHATS_LINK_BLOCK']: 'true'
                    } 
                });
                await message.sendMessage(LINKT_on)
        }
    }));
