const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const { errorMessage, infoMessage } = require('../helpers');
const Config = require('../config');
const Language = require('../language');
const Lang = Language.getString('gigabyte');
const YTV_DESC = "Youtube Document Type Video Downloader"
const YT_NEED = "*You must enter words!*"
const DWLOAD_VID = "*Downloading your video...*"
const YTV_UP = "*Uploading your video...*"
const NO_RESULT = "*Couldn't find anything!*"


if (Config.WORKTYPE == 'private') {

    Asena.addCommand({ pattern: 'dvideo ?(.*)', fromMe: true, desc: Lang.MP4,  deleteCommand: false}, async (message, match) => {

        const link = match[1]
    
        if (!link) return await message.client.sendMessage(message.jid,YT_NEED,MessageType.text)
        await message.client.sendMessage(message.jid,DWLOAD_VID,MessageType.text);
        await axios
          .get(`https://api.zeks.xyz/api/ytplaymp4/2?apikey=THEVINDUapi=${link}`)
          .then(async (response) => {
            const {
              link,
            } = response.data.result
    
            const videoBuffer = await axios.get(link, {responseType: 'arraybuffer'})
    
            await message.client.sendMessage(message.jid,YTV_UP,MessageType.text);
            await message.client.sendMessage(message.jid,Buffer.from(videoBuffer.data), MessageType.document, {mimetype: Mimetype.mp4, ptt: false})
        })
        .catch(
          async (err) => await message.client.sendMessage(message.jid,NO_RESULT,MessageType.text, {quoted: message.data}),
        )
      },
    )
}

else if (Config.WORKTYPE == 'public') {
    Asena.addCommand({ pattern: 'dvideo ?(.*)', fromMe: false, desc: Lang.MP4}, async (message, match) => {

        const link = match[1]
    
        if (!link) return await message.client.sendMessage(message.jid,YT_NEED,MessageType.text, {quoted: message.data})
         await message.client.sendMessage(message.jid,DWLOAD_VID,MessageType.text)
        await axios
          .get(`https://api.zeks.xyz/api/ytplaymp4/2?apikey=THEVINDUapi=${link}`)
          .then(async (response) => {
            const {
              link,
            } = response.data.result
    
            const videoBuffer = await axios.get(link, {responseType: 'arraybuffer'})
    
            await message.client.sendMessage(message.jid,YTV_UP,MessageType.text, {quoted: message.data});
            await message.client.sendMessage(message.jid,Buffer.from(videoBuffer.data), MessageType.document, {mimetype: Mimetype.mp4, ptt: false})
        })
        .catch(
          async (err) => await message.client.sendMessage(message.jid,NO_RESULT,MessageType.text, {quoted: message.data}),
        )
      },
    )
}
