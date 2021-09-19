const { Plugin } = require('powercord/entities');
const { channels, getModule, getModuleByDisplayName } = require("powercord/webpack");
const { open: openModal } = require("powercord/modal");
const createHtml = require("./Functions/CreateHtml")

module.exports = class Choice extends Plugin {
  async startPlugin () {
    const { pushFiles } = await getModule(["pushFiles"]);
    const { getChannel } = await getModule(["getChannel"], false);
    const UploadModal = await getModuleByDisplayName("UploadModal");

    powercord.api.commands.registerCommand({
      command: 'capture',
      aliases: [ 'savechat', 'keep', 'chatkeep' ],
      description: 'Save the chat you don\'t want to lose !',
      usage: '[prefix]capture',
      executor: async () => {
        let messages = document.querySelectorAll(".message-2qnXI6"), json = {name: getChannel(channels.getChannelId()).name,topic: getChannel(channels.getChannelId()).topic, id: channels.getChannelId(), messages: []}
        messages.forEach((msgElement)=> {
          let message = msgElement.querySelector(".contents-2mQqc9")
          let attachments = msgElement.querySelector(".messageAttachment-1aDidq img")?.src
          json.messages.push({
            content: message.querySelector(".messageContent-2qWWxC")?.innerText,
            id: msgElement.getAttribute("id")?.split("-")?.pop(),
            timestamp: message.querySelector("time").getAttribute("datetime"),
            channel: channels.getChannelId(),
            attachments: attachments? [attachments]: [],
            bot: msgElement.getAttribute("data-is-author-bot") === "true"? true: false,
            author: {
              id: msgElement.getAttribute("data-author-id"),
              avatar: message.querySelector("img.avatar-1BDn8e")?.src,
              username: message.querySelector(".username-1A8OIy")?.innerText,
            }
          })
        })
      let file = await createHtml.executor(json)
      pushFiles({ channelId: channels.getChannelId(), files: [file] });
      openModal(UploadModal);
      return {send: false, result: 'Chat saved successfully !'}
      }
    });
  }
  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("capture");
  }
}
