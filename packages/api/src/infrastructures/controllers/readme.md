router からのリクエストを受け取り、usecase に処理を委譲する。
usecase からのレスポンスを受け取り、router にレスポンスを返す。
必要があれば serializer を使用して、リクエスト・レスポンス内容を変換する。
