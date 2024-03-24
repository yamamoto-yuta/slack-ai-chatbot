import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

// Slack へのメッセージ送信関数
const sendMessageToSlack = (channel: string, message: string) => {
    const token = PropertiesService.getScriptProperties().getProperty('SLACK_BOT_TOKEN');
    if (!token) throw new Error('SLACK_BOT_TOKEN is not set.');

    const url = 'https://slack.com/api/chat.postMessage';
    const payload = {
        channel: channel,
        text: message
    };

    const options: URLFetchRequestOptions = {
        method: 'post',
        contentType: 'application/json',
        headers: { Authorization: `Bearer ${token}` },
        payload: JSON.stringify(payload)
    };

    UrlFetchApp.fetch(url, options);
}

export const doPost = (e: any) => {
    sendMessageToSlack('C04FA2H1S6T', 'Hello!');
}