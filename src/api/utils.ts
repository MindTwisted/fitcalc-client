import { AxiosError } from 'axios';

export const getViolationsFromAxiosError = (error: AxiosError) => error.response?.data.data?.violations || {};