import axios from 'axios';
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
}

export default new RegistryService();
