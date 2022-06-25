"use strict";
// import type { API, AccessoryPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge'
// import { PLATFORM_NAME, PLUGIN_NAME } from './settings.js'
// export default (api: API) => {
// 	const Service = api.hap.Service
// 	const Characteristic = api.hap.Characteristic
// 	api.registerAccessory('homebridge-web-door', 'WebDoor', WebDoor)
// }
// class WebDoor implements AccessoryPlugin {
// 	constructor(log, config) {
// 		this.log = log
// 		this.name = config.name
// 		this.requestArray = ['currentPosition', 'targetPosition', 'positionState']
// 		this.manufacturer = config.manufacturer || packageJson.author
// 		this.serial = config.serial || this.apiroute
// 		this.model = config.model || packageJson.name
// 		this.firmware = config.firmware || packageJson.version
// 		this.service = new Service.Door(this.name)
// 	}
// 	identify(callback) {
// 		this.log('Identify requested!')
// 		callback()
// 	}
// 	_getStatus(callback) {
// 		const url = this.apiroute + '/status'
// 		this.log.debug('Getting status: %s', url)
// 		this._httpRequest(url, '', 'GET', function (error, response, responseBody) {
// 			if (error) {
// 				this.log.warn('Error getting status: %s', error.message)
// 				this.service.getCharacteristic(Characteristic.PositionState).updateValue(new Error('Polling failed'))
// 				callback(error)
// 			} else {
// 				this.log.debug('Device response: %s', responseBody)
// 				try {
// 					const json = JSON.parse(responseBody)
// 					this.service.getCharacteristic(Characteristic.PositionState).updateValue(json.positionState)
// 					this.log.debug('Updated positionState to: %s', json.positionState)
// 					this.service.getCharacteristic(Characteristic.CurrentPosition).updateValue(json.currentPosition)
// 					this.log.debug('Updated currentPosition to: %s', json.currentPosition)
// 					this.service.getCharacteristic(Characteristic.TargetPosition).updateValue(json.targetPosition)
// 					this.log.debug('Updated targetPosition to: %s', json.targetPosition)
// 					callback()
// 				} catch (e) {
// 					this.log.warn('Error parsing status: %s', e.message)
// 				}
// 			}
// 		}.bind(this))
// 	},
// 	_httpHandler(characteristic, value) {
// 		switch (characteristic) {
// 			case 'positionState': {
// 				this.service.getCharacteristic(Characteristic.PositionState).updateValue(value)
// 				this.log('Updated %s to: %s', characteristic, value)
// 				break
// 			}
// 			case 'currentPosition': {
// 				this.service.getCharacteristic(Characteristic.CurrentPosition).updateValue(value)
// 				this.log('Updated %s to: %s', characteristic, value)
// 				break
// 			}
// 			case 'targetPosition': {
// 				this.service.getCharacteristic(Characteristic.TargetPosition).updateValue(value)
// 				this.log('Updated %s to: %s', characteristic, value)
// 				break
// 			}
// 			case 'obstructionDetected': {
// 				this.service.getCharacteristic(Characteristic.ObstructionDetected).updateValue(value)
// 				this.log('Updated %s to: %s', characteristic, value)
// 				break
// 			}
// 			default: {
// 				this.log.warn('Unknown characteristic "%s" with value "%s"', characteristic, value)
// 			}
// 		}
// 	},
// 	setTargetPosition(value, callback) {
// 		const url = this.apiroute + '/setTargetPosition?value=' + value
// 		this.log.debug('Setting targetPosition: %s', url)
// 		this._httpRequest(url, '', this.http_method, function (error, response, responseBody) {
// 			if (error) {
// 				this.log.warn('Error setting targetPosition: %s', error.message)
// 				callback(error)
// 			} else {
// 				this.log('Set targetPosition to %s', value)
// 				callback()
// 			}
// 		}.bind(this))
// 	},
// 	getServices: function () {
// 		this.informationService = new Service.AccessoryInformation()
// 		this.informationService
// 			.setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
// 			.setCharacteristic(Characteristic.Model, this.model)
// 			.setCharacteristic(Characteristic.SerialNumber, this.serial)
// 			.setCharacteristic(Characteristic.FirmwareRevision, this.firmware)
// 		this.service
// 			.getCharacteristic(Characteristic.TargetPosition)
// 			.on('set', this.setTargetPosition.bind(this))
// 		this._getStatus(function () {})
// 		setInterval(function () {
// 			this._getStatus(function () {})
// 		}.bind(this), this.pollInterval * 1000)
// 		return [this.informationService, this.service]
// 	}
// }
//# sourceMappingURL=index-door.js.map