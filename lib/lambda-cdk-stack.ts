import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';

export class LambdaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const hello = new Function(this, 'HelloHandler', {
      runtime: Runtime.NODEJS_14_X,    // execution environment
      code: Code.fromAsset('lambda'),  // code loaded from "lambda" directory
      handler: 'hello.handler'                // file is "hello", function is "handler"
    });


    // defines an API Gateway REST API resource backed by our "hello" function.
    new LambdaRestApi(this, 'ApiGateway', {
      handler: hello
    });
  }
}
