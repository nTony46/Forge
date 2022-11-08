import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apiGateway from 'aws-cdk-lib/aws-apigateway'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ForgeInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this, "BaseLayer", {
      code: lambda.Code.fromAsset("lambda_base_layer/layer.zip"),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_7]
    });

    const apiLambda = new lambda.Function(this, "ApiFunction", {
      runtime: lambda.Runtime.PYTHON_3_7,
      code: lambda.Code.fromAsset("../app/"),
      handler: "forge_api.handler",
      layers: [layer]
    });

    const forgeApi = new apiGateway.RestApi(this, "RestApi", {
      restApiName: "Forge API"
    });

    forgeApi.root.addProxy({
      defaultIntegration: new apiGateway.LambdaIntegration(apiLambda)
    });
  }
}
