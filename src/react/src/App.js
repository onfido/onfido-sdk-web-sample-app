import { useEffect } from 'react'
import * as Onfido from 'onfido-sdk-ui'

const getToken = (onSuccess) => {
  const url = 'https://token-factory.onfido.com/sdk_token'
  const request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.setRequestHeader(
    'Authorization',
    `BASIC ${process.env.REACT_APP_SDK_TOKEN_FACTORY_SECRET}`
  )
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.responseText)
      onSuccess(data.message)
    }
  }
  request.send()
}

const App = () => {
  useEffect(() => {
    let onfidoOut

    getToken((token) => {
      onfidoOut = Onfido.init({
        useModal: false,
        token,
        onComplete: (data) => {
          // callback for when everything is complete
          console.log('Everything is complete', data)
        },
        steps: [
          {
            type: 'welcome',
            options: {
              title: 'Open your new bank account',
            },
          },
          'document',
          'face',
          'complete',
        ],
      })
    })

    return () => onfidoOut && onfidoOut.tearDown()
  }, [])

  return null
}

export default App
