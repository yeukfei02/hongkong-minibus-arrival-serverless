# hongkong-minibus-arrival-serverless

Hong Kong Minibus Arrival Api in aws lambda (香港小巴到站時間Api)

documentation: <https://documenter.getpostman.com/view/3827865/Uyr5pL4d>

api url: <https://ymoczz3eyd.execute-api.ap-southeast-1.amazonaws.com/prod>

## Requirement

- install yarn
- install node (v16+)
- install serverless

## Testing and run

```zsh
// test api in local
$ yarn run dev

// deploy to serverless
$ yarn run deploy

// open serverless dashboard
$ yarn run dashboard

// lint code
$ yarn run lint

// format code
$ yarn run format

// run test case
$ yarn run test

// remove serverless services in aws (api gateway, lambda, s3, cloudformation)
$ yarn run remove
```
