import api from './api';

const project = 'famous-palisade-356103';

class RegistryService {

    getRegistry = (registryId: string, region: string) => {
        const url = `/registry/projects/${project}/locations/${region}/registries/${registryId}`;
        return api.get(url);
    }

    getRegistries = () => {
        const url = `/registry/projects/${project}/registries`
        return api.get(url);
    }

    createRegistry = (params: any) => {
        const region = params?.region;
        const url = `/registry/projects/${project}/locations/${region}/registries`;
        return api.post(url, params)
    }

    editRegistry = (registryId: string, params: any) => {
        const region = params?.region;
        const updateMasks = 'event_notification_configs,state_notification_config,mqtt_config,http_config,log_level'
        const url = `/registry/projects/${project}/locations/${region}/registries/${registryId}?updateMask=${updateMasks}`;
        return api.patch(url, params)
    }

    deleteRegistry = (registryId: string, region: string) => {
        const url = `/registry/projects/${project}/locations/${region}/registries/${registryId}`;
        return api.delete(url);
    }

    addCACertificate = (region: string, registryId: string, certObject: any) => {
        const url = `/registry/projects/${project}/locations/${region}/registries/${registryId}/certificate`;
        return api.post(url, certObject);
    }

    deleteCACertificate = (region: string, registryId: string, certObject: any) => {
        const url = `/registry/projects/${project}/locations/${region}/registries/${registryId}/certificate`;
        return api.delete(url, certObject);
    }

}

export default new RegistryService();
