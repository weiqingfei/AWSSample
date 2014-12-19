var AWS=require('aws-sdk'),
	sqsQueueUrl = 'https://sqs.ap-northeast-1.amazonaws.com/515132164947/TestSQS',
	sqs;

AWS.config.update({region: 'ap-northeast-1'});

sqs = new AWS.SQS();
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
		sqs.changeMessageVisibility({
			QueueUrl:sqsQueueUrl,
			ReceiptHandle:message.ReceiptHandle,
			VisibilityTimeout:0
		}, function(err,data){
			if(err){
				console.error(err);
			}else{
				console.log('消息已可见。');
				console.log(data);
			}
		});
	}
});