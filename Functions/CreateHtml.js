module.exports =  {
  executor: (json) => {
  let html = `<!DOCTYPE html>
  <html lang="en"><head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat Capture Plugin</title>
  </head>
  <style>
    body {
      background: #36393f;
      color: #fff;
      font-family: Whitney,"Helvetica Neue",Helvetica,Arial,sans-serif;
    }
    .message {
      display: flex;
      gap: 1rem;
      margin: 1rem;
    }
    .avatar {
      height: 50px;
      border-radius: 50px;
    }
    .content {
      padding: .2rem;
    }
    .username {
      font-weight: bolder;
      font-size: 1.1rem;
      margin-bottom: 5px;
    }
    .username time {
      color: #72767d;
      font-size: small;
      font-weight: normal;
    }
    .username.bot span {
      background: #5865f2;
      font-size: .7rem;
      padding: 2px 5px;
      border-radius: 4px;
      vertical-align: middle;
    }
    .channel {
      height: 50px;
      display: flex;
      align-items: center;
      gap: .4rem;
      font-weight: bold;
      border-bottom: 1px solid #565f6f;
    }
    .channel span {
      font-size: 1.6rem;
      color: #72767d;
    }
    .channel .topic {
      font-weight: 500;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 14px;
      border-left: 1px solid #565f6f;
      padding: 5px;
    }
    .empty {
      width: 50px;
      height: 50px;
    }
  </style>
  <body>
    <div class="channel">
      <span>#</span> ${json.name} <span class="topic">${json.topic}</span>
    </div>
    <div id="messages">
    ${json.messages.map(message => (message.attachments[0] || message.content)? (
      `<div class="message" ${message.author.username? "": `style="margin: -1rem 1rem;"`}>
      ${message.author.avatar? `<img class="avatar" src="${message.author.avatar}" alt="User Avatar">`: `<div class="empty"></div>`}
      <div class="content">
        ${message.author.username?`<div class="username ${message.bot? "bot": ""}">${message.author.username} ${message.bot? "<span>BOT</span>": ""} <time>${message.timestamp}</time></div>`:""}
        <div class="message-content">${message.content}</div>
        <div class="message-attachments">${message.attachments[0]? `<img src="${message.attachments[0]}">`: ""}</div>
      </div>
    </div>`
    ): "").join("\n")}
    </div>
  </body>
  </html>`

  const file = new File([html], "messages.html", { type: "text/html" });
  return file;
  }
}