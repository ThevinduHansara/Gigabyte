const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const axios = require('axios');
const config = require('../config');
const Language = require('../language');
const Lang = Language.getString('gigabyte');
const { errorMessage, infoMessage } = require('../helpers');

if (Config.WORKTYPE == 'private') {

Asena.addCommand({ pattern: 'twt ?(.*)', fromMe: true,  dontAddCommandList: false, desc: Lang.TWT }, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("*Please enter a proper link!*"))

    await message.sendMessage(infoMessage(Lang.LOADINGTV))

    await axios
      .get(`https://api-anoncybfakeplayer.herokuapp.com/twdown?url=${userName}`)
      .then(async (response) => {
        const {
          format,
          result,
        } = response.data

        const profileBuffer = await axios.get(result, {responseType: 'arraybuffer'})

        const msg = `${format}`


      if (msg === 'Image/jpg or png') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })}
		 	 
	if (msg === 'video/mp4') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })}

      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("*Couldn't find anything!*" )),
      )
  },
)

Asena.addCommand({ pattern: 'show ?(.*)', fromMe: true , desc: Lang.SHOW}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("*Please enter a show name!*"))

    await message.sendMessage(infoMessage("Loading..."))

  await axios
      .get(`http://api.tvmaze.com/search/shows?q=${userName}`)
      .then(async (response) => {
        const {
          name,
          type,	
          language,
           status,
	  officialSite,
	  summary,
        } = response.data[0].show

   
        const msg = `*${"Name"}*: ${name}\n*${"Type"}*: ${type}\n*${"Type"}*: ${status}\n*${"Summary"}*: ${summary}\n*${"Official Site"}*: ${officialSite}`
       
       await message.client.sendMessage(message.jid, msg , MessageType.text);
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("*Couldn't find anything!*" )),
      )
  },
)

else if (Config.WORKTYPE == 'public') {

Asena.addCommand({ pattern: 'twt ?(.*)', fromMe: false,  dontAddCommandList: false, desc: Lang.TWT }, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("*Please enter a proper link!*"))

    await message.sendMessage(infoMessage(Lang.LOADINGTV))

    await axios
      .get(`https://api-anoncybfakeplayer.herokuapp.com/twdown?url=${userName}`)
      .then(async (response) => {
        const {
          format,
          result,
        } = response.data

        const profileBuffer = await axios.get(result, {responseType: 'arraybuffer'})

        const msg = `${format}`


      if (msg === 'Image/jpg or png') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })}
		 	 
	if (msg === 'video/mp4') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })}

      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("*Couldn't find anything!*" )),
      )
  },
)

Asena.addCommand({ pattern: 'show ?(.*)', fromMe: false , desc: Lang.SHOW}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("*Please enter a show name!*"))

    await message.sendMessage(infoMessage("*Loading...*"))

  await axios
      .get(`http://api.tvmaze.com/search/shows?q=${userName}`)
      .then(async (response) => {
        const {
          name,
          type,	
          language,
           status,
	  officialSite,
	  summary,
        } = response.data[0].show

   
        const msg = `*${"Name"}*: ${name}\n*${"Type"}*: ${type}\n*${"Type"}*: ${status}\n*${"Summary"}*: ${summary}\n*${"Official Site"}*: ${officialSite}`
       
       await message.client.sendMessage(message.jid, msg , MessageType.text);
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("*Couldn't find anything!*" )),
      )
  },
)
