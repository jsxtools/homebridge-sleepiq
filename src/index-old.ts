import type { API } from 'homebridge'

import { PLATFORM_NAME } from './settings.js'
import { ExampleHomebridgePlatform } from './platform.js'

/** Register the platform with Homebridge */
export default (api: API) => {
	api.registerPlatform(PLATFORM_NAME, ExampleHomebridgePlatform)
}
