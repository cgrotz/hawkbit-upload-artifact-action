import * as core from '@actions/core'
import uploadArtifact from './api'

async function run(): Promise<void> {
  try {
    const filePath: string = core.getInput('file-path')
    const fileName: string = core.getInput('file-name')
    const softwareModuleId: string = core.getInput('software-module-id')
    uploadArtifact(parseInt(softwareModuleId), filePath, fileName)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
