var AWS=require('aws-sdk'),
	sqsQueueUrl = 'https://sqs.ap-northeast-1.amazonaws.com/515132164947/TestSQS',
	sqs;

AWS.config.update({region: 'ap-northeast-1'});

sqs = new AWS.SQS();
sqs.receiveMessage({
	QueueUrl:sqsQueueUrl,
	MaxNumberOfMessages:10,
	VisibilityTimeout:60,
	WaitTimeSeconds:10
}, function(err, data){
	if(err){
		console.error(err);
	}else if(data.Messages){
		console.log('接受消息成功。'+data.Messages.length);
		for(var i = 0; i < data.Messages.length; i++){
			var message = data.Messages[i];
			console.log(message.Body);
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
	}
});