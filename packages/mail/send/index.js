'use strict';

const sgMail = require('@sendgrid/mail')

async function main(args) {
  try {
    if ('post' == args.__ow_method) {
      const hasError = validateBody(args)

      if (hasError)
        return hasError

      if (!login(args.email, args.password))
        return {
          'body': { 'error': 'email or password incorrect.' },
          'statusCode': 400
        }

      const message = {
        to: args.email,
        from: args.from,
        subject: args.subject,
        text: args.text,
        html: args.html
      }

      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      const response = await sgMail.send(message)

      if (202 == response[0].statusCode)
        return {
          'body': { 'success': response },
          'statusCode': 200
        }
    }

    return {
      'body': { 'error': 'Method not allowed' },
      'statusCode': 400
    }

  } catch (err) {
    console.log({ err })

    return {
      'body': { 'error': err },
      'statusCode': 400
    }
  }
}

function login(email, password) {
  if (password !== process.env.PASSWORD && email !== process.env.EMAIL)
    return false

  return true
}

function validateBody(body) {
  const due = [
    'email',
    'password',
    'from',
    'subject',
    'text',
    'html',
  ]

  for (let i in due) {
    if (!Object.keys(body).includes(due[i]))
      return {
        'body': { 'error': `Field ${due[i]} is required.` },
        'statusCode': 400
      }
  }
}

module.exports.main = main

