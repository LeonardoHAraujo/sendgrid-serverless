# digitalocean serverless function

*Powered by Leonardo Araújo*

For testing purposes and working documentation,
I created a serverless digitalocean function that send mail with sendgrid.
Simple example.

## Requirements

- [Doctl](https://docs.digitalocean.com/reference/doctl/how-to/install/)

## Instalation

For run `do-func` make following steps:

- Make download for this repository.
- copy `.env.example` to `.env` and put your credentials.
- Make auth with doctl and your digitalocean [auth](https://docs.digitalocean.com/reference/doctl/reference/auth/).
- Create your namespace `doctl serverless namespaces create <Name>`
- Connect with serverless namespace `doctl serverless connect`
- In the root, goto `cd packages/mail/send` and run `npm install --package-lock-only`
- Goto root directory again `cd ../../..`
- Run this command in root directory `doctl serverless deploy . --remote-build`
- Run this command for get url `doctl sbx fn get mail/send --url`
- Make request POST to url.

```sh
curl -X POST https://faas-lon1-917a94a7.doserverless.co/api/v1/web...
  -H "Content-Type: application/json"
  -d '{
    "email": "<Your email in .env>",
    "password": "<Your password in .env>",
    "from": "<Your email verified in sendgrid>",
    "subject": "Sending from do-func",
    "text": "and easy to do anywhere, even with Node.js",
    "html": "<strong>and easy to do anywhere, even with Node.js</strong>"
  }'
```

Output:

```json
{
  "success": [
		{
			"body": "",
			"headers": {
				"access-control-allow-headers": "Authorization, Content-Type, On-behalf-of, x-sg-elas-acl",
				"access-control-allow-methods": "POST",
				"access-control-allow-origin": "https://sendgrid.api-docs.io",
        ...
			},
			"statusCode": 202
		},
	]
}
```

Bonus

*- [Documentation](https://docs.digitalocean.com/tutorials/jamstack-series-part-2-add-serverless-functions-to-app/)*

