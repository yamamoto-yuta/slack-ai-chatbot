# slack-ai-chatbot

Slack 上で動作する AI チャットボットを GAS で作成するリポジトリ。

## 環境構築

```
$ git clone git@github.com:yamamoto-yuta/slack-ai-chatbot.git
$ cd slack-ai-chatbot/
$ docker compose build
$ docker compose up -d
$ docker exec -it <CONTAINER_ID> bash
[In the conatiner]# clasp login
    1. 出てきた URL にアクセス
    2. Google アカウントでログイン
    3. "localhost:***" という無効な URL に遷移すれば OK
    4. 別ターミナルでコンテナ内に入り、 curl 'localhost:***（さっきの無効な URL）'
    5. ターミナルにログイン成功の旨が出ていればOK
[In the container]# clasp clone <PROJECT_ID>
```
