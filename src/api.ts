import * as core from '@actions/core'
import Axios from 'axios'
import fs from 'fs-extra'
import FormData from 'form-data'

function getBasicAuthHeader(): String {
  const tenant = core.getInput('hawkbit-tenant')
  const username = core.getInput('hawkbit-username')
  const password = core.getInput('hawkbit-password')
  const token = Buffer.from(`${tenant}\\${username}:${password}`).toString(
    'base64'
  )
  return `Basic ${token}`
}

export default async function uploadArtifact(
  softwareModuleId: number,
  filePath: string,
  fileName?: string
): Promise<null> {
  const hawkbitHostUrl = core.getInput('hawkbit-host-url')
  //const workFileName = fileName ? fileName: filePath.substring(filePath.lastIndexOf('/') + 1)
  const workFileName = filePath.substring(filePath.lastIndexOf('/') + 1)
  const url = `https://${hawkbitHostUrl}/rest/v1/softwaremodules/${softwareModuleId}/artifacts`
  core.info(`${fileName}`)
  core.info(url)
  const form = new FormData()
  form.append('file', fs.createReadStream(filePath), {
    filename: workFileName
  })

  core.info(`read file, trying to upload with name: ${workFileName}`)
  const headers = form.getHeaders()
  headers['Authorization'] = getBasicAuthHeader()
  try {
    const response = await Axios.post(url, form, {
      headers
    })
    return response.data
  } catch (e) {
    core.error(e)
    throw e
  }
}
