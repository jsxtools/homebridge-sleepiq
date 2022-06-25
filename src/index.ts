import type { IncomingMessage, Server, ServerResponse } from 'http'
import type { API, CharacteristicSetCallback, CharacteristicValue, DynamicPlatformPlugin, HAP, Logging, PlatformConfig, Service } from 'homebridge'

import * as http from 'http'
import { APIEvent, CharacteristicEventTypes, PlatformAccessory, PlatformAccessoryEvent } from 'homebridge'

import { PLATFORM_NAME, PLUGIN_NAME } from './settings.js'

export default (api: API) => {
	api.registerPlatform(PLATFORM_NAME, ExampleDynamicPlatform)
}

class ExampleDynamicPlatform implements DynamicPlatformPlugin {
	/** Logging functions. */
	private readonly log: Logging

	/** Homebridge API. */
	private readonly api: API

	/** HomeKit Accessory Server. */
	private readonly hap: HAP

	private requestServer?: Server

	private readonly accessories: PlatformAccessory[] = []

	constructor(log: Logging, config: PlatformConfig, api: API) {
		this.log = log
		this.api = api
		this.hap = api.hap

		log.info('Example platform finished initializing!')

		/*
		 * When this event is fired, homebridge restored all cached accessories from disk and did call their respective
		 * `configureAccessory` method for all of them. Dynamic Platform plugins should only register new accessories
		 * after this event was fired, in order to ensure they weren't added to homebridge already.
		 * This event can also be used to start discovery of new accessories.
		 */
		api.on(APIEvent.DID_FINISH_LAUNCHING, () => {
			log.info('Example platform `didFinishLaunching`')

			// The idea of this plugin is that we open a http service which exposes api calls to add or remove accessories
			this.createHttpService()
		})
	}

	/*
	 * This function is invoked when homebridge restores cached accessories from disk at startup.
	 * It should be used to setup event handlers for characteristics and update respective values.
	 */
	configureAccessory(accessory: PlatformAccessory): void {
		let { hap, log } = this

		log('Configuring accessory %s', accessory.displayName)

		accessory.on(PlatformAccessoryEvent.IDENTIFY, () => {
			log('%s identified!', accessory.displayName)
		})

		let internal = {
			Manufacturer: 'Example Manufacturer',
			Model: 'Example Model',
			Name: 'Example Name',
			SerialNumber: 'Example SerialNumber',
			FirmwareRevision: 'Example FirmwareRevision',
		}

		const characteristics = {
			get Manufacturer() {
				return internal.Manufacturer
			},
			set Manufacturer(value) {
				internal.Manufacturer = value
			},
			get Model() {
				return internal.Model
			},
			set Model(value) {
				internal.Model = value
			},
			get Name() {
				return internal.Name
			},
			set Name(value) {
				internal.Name = value
			},
			get SerialNumber() {
				return internal.SerialNumber
			},
			set SerialNumber(value) {
				internal.SerialNumber = value
			},
			get FirmwareRevision() {
				return internal.FirmwareRevision
			},
			set FirmwareRevision(value) {
				internal.FirmwareRevision = value
			},
		}

		const service = accessory.getService(hap.Service.AccessoryInformation)!

		for (const [ name, descriptor ] of Object.entries(Object.getOwnPropertyDescriptors(characteristics))) {
			// @ts-ignore
			service.getCharacteristic(hap.Characteristic[name]).onGet(descriptor.get).onSet(descriptor.set)
		}

		this.accessories.push(accessory)
	}

	// --------------------------- CUSTOM METHODS ---------------------------

	addAccessory(name: string) {
		let { api, hap, log } = this
		let Accessory = api.platformAccessory

		log.info('Adding new accessory with name %s', name)

		// uuid must be generated from a unique but not changing data source, name should not be used in the most cases. But works in this specific example.
		const uuid = hap.uuid.generate(name)
		const accessory = new Accessory(name, uuid)

		accessory.addService(hap.Service.AccessoryInformation, 'Test Light', 'USER_DEFINED_SUBTYPE')

		this.configureAccessory(accessory) // abusing the configureAccessory here

		api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory])
	}

	removeAccessories() {
		let { api, log } = this
		// we don't have any special identifiers, we just remove all our accessories

		log.info('Removing all accessories')

		api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, this.accessories)
		this.accessories.splice(0, this.accessories.length) // clear out the array
	}

	createHttpService() {
		let { log } = this

		this.requestServer = http.createServer(this.handleRequest.bind(this))
		this.requestServer.listen(18081, () => log.info('Http server listening on 18081...'))
	}

	private handleRequest(request: IncomingMessage, response: ServerResponse) {
		if (request.url === '/add') {
			this.addAccessory(new Date().toISOString())
		} else if (request.url === '/remove') {
			this.removeAccessories()
		}

		response.writeHead(204) // 204 No content
		response.end()
	}

	// ----------------------------------------------------------------------

}