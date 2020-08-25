# hawkbit-upload-artifact-action

GitHub Action for uploading a build result to Hawkbit.

## Usage

### Example Workflow file

An example workflow for uploading an artifact to an existing software module:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Upload Artifact
      uses: cgrotz/iot-hawkbit-action@master
      with:
        file-path: './file-to-upload.bin'
        software-module-id: 12345
        hawkbit-tenant: ${{ secrets.ROLLOUTS_TENANT }}
        hawkbit-username: ${{ secrets.ROLLOUTS_USERNAME }}
        hawkbit-password: ${{ secrets.ROLLOUTS_PASSWORD }}
```
