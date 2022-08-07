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

    editDevice = (deviceId: string, registry: string, region: string, params: any) => {
        const updateMasks = 'blocked,credentials,metadata,log_level'
        const url = `/device/projects/${project}/locations/${region}/registries/${registry}/devices/${deviceId}?updateMask=${updateMasks}`;
        return api.patch(url, params);
    }

    deleteDevice = (deviceId: string, registry: string, region: string) => {
        const url = `/device/projects/${project}/locations/${region}/registries/${registry}/devices/${deviceId}`
        return api.delete(url);
    }

    addPublicKey = (deviceId: string, registryId: string, region: string, certObject: any) => {
        const url = `/device/projects/${project}/locations/${region}/registries/${registryId}/devices/${deviceId}/certificate`;
        return api.post(url, certObject);
    }

    deletePublicKey = (deviceId: string, registryId: string, region: string, certObject: any) => {
        const url = `/device/projects/${project}/locations/${region}/registries/${registryId}/devices/${deviceId}/certificate`;
        return api.delete(url, certObject);
    }
}

export default new DeviceService();
