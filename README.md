# Getting Started SMART on FHIR apps
This starter-kit application is a simple SMART on FHIR App.

* Fetches Patient FHIR data
* Displays Patient information using FHIR Visualizer
* Allows User to Modify Patient information

# Demo
![a gif showing the SMART app in action](https://github.com/SameerDoshi/SameerDoshi.github.io/blob/master/images/SMART-FHIR-Demo.gif?raw=true)




# Running this app locally (quick)
1. ``` yarn install ```
2. ``` yarn start ```
3. [Goto SMART Launcher](https://launch.smarthealthit.org/)
4. Leave everything as default, at the bottom of the form change the launch url to 
```http://localhost:3000```
5. Click Launch

# Deploying the web app to Azure

The React app can be hosted as a static site with [Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/getting-started). You do **not** need approval from Microsoft to deploy your own copy: fork this repository to a GitHub account you control and deploy from that fork. Hosting the files does not provision a FHIR service or configure SMART authentication.

1. Fork this repository, then push or merge the app changes into a branch in your fork. The included workflow is configured to run on `main` and `ask-matt-install-launch-app`; if you use another branch, update the workflow's `push.branches` list to match.
2. Create an Azure Static Web App and select **Other** as the deployment source so Azure doesn't create a second GitHub Actions workflow. The included workflow builds the React app and deploys its `build` directory.
3. In your fork's **Settings → Secrets and variables → Actions**, add the Static Web App deployment token as `AZURE_STATIC_WEB_APPS_API_TOKEN`.
4. Add repository variables `REACT_APP_SMART_CLIENT_ID` and `REACT_APP_SMART_SCOPE` for the public SMART client ID and requested scopes. These values are embedded in the browser bundle, so never put secrets in them. If unset, the app uses the SMART Launcher demo defaults.
5. Push to a configured branch in your fork. Register the resulting HTTPS app URL as a redirect URI with the identity provider.

The build currently uses Node.js 16 because this repository's older Create React App/PostCSS dependency chain fails on newer Node versions.

## Connecting to Azure Health Data Services

For a Microsoft Entra-backed SMART on FHIR setup, follow the current [Azure Health Data Services SMART on FHIR guidance](https://learn.microsoft.com/azure/healthcare-apis/fhir/smart-on-fhir) and the [Entra deployment guide](https://github.com/Azure-Samples/azure-health-data-and-ai-samples/blob/main/samples/smartonfhir-smartnative-v2/docs/deployment-entra.md) for the SMART gateway. To reuse an existing FHIR service, the gateway guide documents the `ExistingFhirServiceId` option and the required one-time FHIR audience and role configuration.

**This starter app is not yet wired to that gateway.** It currently pins `fhirclient` 2.4.0, which lacks the PKCE support required by the gateway's public-client flow (newer `fhirclient` versions support PKCE). Upgrading the library alone is not sufficient: the gateway's SMART discovery/authorization URL and the FHIR service API URL are separate, while this starter currently uses a single server URL for both. The app needs an explicit integration change to authenticate against the gateway and send FHIR requests to the configured service. Changing the client ID or scopes alone is not enough. The Azure sample's [SMART client application](https://github.com/Azure-Samples/azure-health-data-and-ai-samples/tree/main/samples/SMART-Client-Application) demonstrates the gateway-supported flows; use it for an end-to-end Entra integration until this app's SMART client is updated.

The app also includes a patient update form. The current Azure Health Data Services **FHIR SMART User** role supports read and search, not create/update/delete; the update form won't work with that role alone. Don't enable writes against real data until you have designed and configured a separately authorized write flow.



# What's Next?
Think about what this app does.  It has all the boiler plate you need to access and modify a FHIR resrouce.
If you've ever had a piece of functionality you've wanted to add to an EMR you can code it in a SMART on FHIR app- using all the web dev tech you already know. Then just add that app to your EMR.

An example use of this is the Chestist demo app that packages ML assisted image analysis.


#References:
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

[Azure Health Data Services SMART on FHIR guidance](https://learn.microsoft.com/azure/healthcare-apis/fhir/smart-on-fhir)

[SMARTHealth's Quickstart](https://docs.smarthealthit.org/)

[Cerner's Quickstart](https://engineering.cerner.com/smart-on-fhir-tutorial/)


## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
