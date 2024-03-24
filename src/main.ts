import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

// Slack へのメッセージ送信関数
const sendMessageToSlack = (channel: string, message: string) => {
    const SLACK_BOT_TOKEN = PropertiesService.getScriptProperties().getProperty('SLACK_BOT_TOKEN');
    if (!SLACK_BOT_TOKEN) throw new Error('SLACK_BOT_TOKEN is not set.');

    const url = 'https://slack.com/api/chat.postMessage';
    const payload = {
        channel: channel,
        text: 'echo3: ' + message
    };

    const options: URLFetchRequestOptions = {
        method: 'post',
        contentType: 'application/json',
        headers: { Authorization: `Bearer ${SLACK_BOT_TOKEN}` },
        payload: JSON.stringify(payload)
    };

    UrlFetchApp.fetch(url, options);
}

export const doPost = (e: any) => {
    const reqObj = JSON.parse(e.postData.getDataAsString());

    // Slackから認証コードが送られてきた場合(初回接続時)
    // これをやっておかないと Event Subscriptions で URL が Verify されない
    if (reqObj.type == "url_verification") {
        // 認証コードをそのまま返すことで、アプリをSlackに登録する処理が完了する
        return ContentService.createTextOutput(reqObj.challenge);
    }

    // Slackからのコールバック以外の場合、OKを返して処理を終了する
    if (reqObj.type !== "event_callback" || reqObj.event.type !== "message") {
        return ContentService.createTextOutput("OK");
    }

    // メッセージが編集または削除された場合、OKを返して処理を終了する
    if (reqObj.event.subtype !== undefined) {
        return ContentService.createTextOutput("OK");
    }

    // Slackから送信されたトリガーメッセージ
    const triggerMsg = reqObj.event;
    // ユーザーID
    const userId = triggerMsg.user;
    // メッセージID
    const msgId = triggerMsg.client_msg_id;
    // チャンネルID
    const channelId = triggerMsg.channel;
    // タイムスタンプ
    const ts = triggerMsg.ts;

    // Bot自身によるメッセージである場合、OKを返して処理を終了する
    const SLACK_BOT_USER_ID = PropertiesService.getScriptProperties().getProperty('SLACK_BOT_USER_ID');
    if (!SLACK_BOT_USER_ID) throw new Error('SLACK_BOT_USER_ID is not set.');
    if (userId === SLACK_BOT_USER_ID) {
        return ContentService.createTextOutput("OK");
    }

    sendMessageToSlack(channelId, triggerMsg.text);
    return ContentService.createTextOutput("OK");
}