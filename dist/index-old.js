import { PLATFORM_NAME } from './settings.js';
import { ExampleHomebridgePlatform } from './platform.js';
/** Register the platform with Homebridge */
export default (api) => {
    api.registerPlatform(PLATFORM_NAME, ExampleHomebridgePlatform);
};
//# sourceMappingURL=index-old.js.map