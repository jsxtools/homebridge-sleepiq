import { CharacteristicEventTypes } from 'homebridge';
import { PLATFORM_NAME, PLUGIN_NAME } from './settings.js';
let hap;
let Accessory;
export default (api) => {
    hap = api.hap;
    Accessory = api.platformAccessory;
    api.registerPlatform(PLATFORM_NAME, ExampleIndependentPlatform);
};
class ExampleIndependentPlatform {
    log;
    api;
    constructor(log, config, api) {
        this.log = log;
        this.api = api;
        // probably parse config or something here
        this.publishExampleExternalAccessory('MySwitch 1');
        log.info('Example platform finished initializing!');
    }
    publishExampleExternalAccessory(name) {
        let switchOn = false;
        const uuid = hap.uuid.generate('homebridge:examples:external-switch:' + name);
        const accessory = new Accessory('External Switch', uuid);
        const switchService = new hap.Service.Switch(name);
        switchService.getCharacteristic(hap.Characteristic.On)
            .on("get" /* CharacteristicEventTypes.GET */, (callback) => {
            this.log.info('Current state of the switch was returned: ' + (switchOn ? 'ON' : 'OFF'));
            callback(undefined, switchOn);
        })
            .on("set" /* CharacteristicEventTypes.SET */, (value, callback) => {
            switchOn = value;
            this.log.info('Switch state was set to: ' + (switchOn ? 'ON' : 'OFF'));
            callback();
        });
        accessory.getService(hap.Service.AccessoryInformation)
            .setCharacteristic(hap.Characteristic.Manufacturer, 'Custom Manufacturer')
            .setCharacteristic(hap.Characteristic.Model, 'External Switch');
        accessory.addService(switchService);
        // will be exposed as an additional accessory and must be paired separately with the pincode of homebridge
        this.api.publishExternalAccessories(PLUGIN_NAME, [accessory]);
    }
}
//# sourceMappingURL=independent-platform.js.map