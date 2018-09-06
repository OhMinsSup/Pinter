import * as redis from 'redis';
import * as config from '../config/config';

class RedisClient {
    public client: redis.RedisClient | null = null;
    public connectedTime: number | null = null;

    get connected() {
        if (!this.client) return false;
        return this.client.connected;
    }

    public connect() {
        const p = new Promise(
            (resolve, reject) => {
                const client = redis.createClient({
                    host: config.REDIST_HOST || '',
                });

                client.on('error', (err) => {
                    console.log('Redis Error: ', err);
                    reject(err);
                });

                client.on('ready', () => {
                    this.connectedTime = Date.now();
                    console.log('Redis is ready');
                    resolve();
                });
                this.client = client;
            },
        );
        return p;
    }

    public async remove(key: string) {
        if (!this.connected || !this.client) {
            await this.connect();
        }

        if (!this.client) return;
        this.client.del(key);
        console.log('removing key %s', key);
    }

    public async setCache(key: string, value: string, duration: number) {
        if (!this.connected) {
            await this.connect();
        }

        const p = new Promise((resolve, reject) => {
            if (!this.connected || !this.client) {
                reject(new Error('redis not connected'));
                return;
            }

            this.client.set(key, value, 'EX', duration, (err, reply) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(reply); 
            });
        });

        return p;
    }

    public async getCache(key: string) {
        if (!this.connected) {
          await this.connect();
        }
        const p = new Promise((resolve, reject) => {
          this.client.get(key, (err, reply) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(reply);
          });
        });
        return p;
    }
}

const redisClient = new RedisClient();

export default redisClient;