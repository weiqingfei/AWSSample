var AWS=require('aws-sdk'),
	sqsQueueUrl = 'https://sqs.ap-northeast-1.amazonaws.com/515132164947/TestSQS',
	sqs;

AWS.config.update({
	region: 'ap-northeast-1',
	logger: process.stdout
});

sqs = new AWS.SQS();
sqs.sendMessage({
	MessageBody:'这是个测试，如果你收到这个消息，代表发送成功了。',
	QueueUrl:sqsQueueUrl,
	DelaySeconds:0
},function(err,data){
	if(err){
		console.error(err);
	}else{
		console.log('发送消息成功。');
		console.log(data);
		sqs.receiveMessage({
			QueueUrl:sqsQueueUrl,
			MaxNumberOfMessages:1,
			VisibilityTimeout:60,
			WaitTimeSeconds:3
		}, function(err, data){
			if(err){
				console.error(err);
			}else if(data.Messages){
				console.log('接受消息成功。');
				var message = data.Messages[0];
					//body = JSON.parse(message.body);
				console.log(message);
				sqs.deleteMessage({
					QueueUrl:sqsQueueUrl,
					ReceiptHandle:message.ReceiptHandle
				}, function(err,data){
					if(err){
						console.error(err);
					}else{
						console.log('删除消息成功。');
						console.log(data);
					}
				});
			}
		});
	}
});
