import api from './api';

const project = 'famous-palisade-356103';

class DeviceService {

    getDevice = (deviceId: string, registry: string, region: string) => {
        const url = `/device/projects/${project}/locations/${region}/registries/${registry}/devices/${deviceId}`
        return api.get(url);
    }

    getDevices = (registry: string, region: string) => {
        const url = `/device/projects/${project}/locations/${region}/registries/${registry}/devices`
        return api.get(url);
    }

    createDevice = (registry: string, region: string, params: any) => {
        const url = `/device/projects/${project}/locations/${region}/registries/${registry}/devices`
        return api.post(url, params)
    }
}

export default new DeviceService();
