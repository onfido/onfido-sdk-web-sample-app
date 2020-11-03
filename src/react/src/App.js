import { useEffect, useState } from 'react'
import * as Onfido from 'onfido-sdk-ui'

const getToken = () =>
  new Promise((resolve, reject) => {
    const url = 'https://token-factory.onfido.com/sdk_token'

    const onRequestError = (request) => {
      const error = new Error(`Request failed with status ${request.status}`)
      Object.assign(error, { request })
      reject(error)
    }

    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.setRequestHeader(
      'Authorization',
      `BASIC ${process.env.REACT_APP_SDK_TOKEN_FACTORY_SECRET}`
    )
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.responseText)
        resolve(data.message)
      } else {
        onRequestError(request)
      }
    }
    request.onerror = onRequestError
    request.send()
  })

const App = () => {
  const [onfidoInstance, setOnfidoInstance] = useState(null)

  const initOnfido = async () => {
    try {
      const token = await getToken()

      const instance = Onfido.init({
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

      setOnfidoInstance(instance)
    } catch (err) {
      console.log('err:', err.message, err.request)
    }
  }

  useEffect(() => {
    initOnfido()
    return () => onfidoInstance && onfidoInstance.tearDown()
  }, [])

  return null
}

export default App
