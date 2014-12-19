var AWS=require('aws-sdk'),
	sqsQueueUrl = 'https://sqs.ap-northeast-1.amazonaws.com/515132164947/TestSQS',
	sqs;

AWS.config.update({region: 'ap-northeast-1'});

sqs = new AWS.SQS();
for(var i = 0; i< 3; i++){
	sqs.sendMessage({
		MessageBody:'这是个测试'+i,
		QueueUrl:sqsQueueUrl,
		DelaySeconds:0
	},function(err,data){
		if(err){
			console.error(err);
		}else{
			console.log('发送消息成功。');
			console.log(data);
		}
	});
}