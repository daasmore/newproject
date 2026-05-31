declare const _default: () => {
    port: number;
    nodeEnv: string;
    database: {
        host: string;
        port: number;
        user: string;
        password: string;
        name: string;
    };
    redis: {
        host: string;
        port: number;
        password: string;
    };
    jwt: {
        secret: string;
        expiration: string;
        refreshSecret: string;
        refreshExpiration: string;
    };
    minio: {
        endpoint: string;
        port: number;
        accessKey: string;
        secretKey: string;
        bucket: string;
    };
    frontendUrl: string;
};
export default _default;
