import { z } from 'zod';
import { createLogger } from './factory.js';
import { LoggerConfigSchema } from './v2/schemas.js';
import type { Logger } from './v2/types.js';

export const DefaultLoggerFactoryConfigSchema = z.strictObject({
    agentId: z.string(),
    config: LoggerConfigSchema,
});

export type DefaultLoggerFactoryConfig = z.output<typeof DefaultLoggerFactoryConfigSchema>;

/**
 * Default logger factory for image-based DI.
 *
 * Images should expose a `LoggerFactory`-shaped object that accepts `{ agentId, config }`
 * and returns a `Logger`.
 */
export const defaultLoggerFactory = {
    configSchema: DefaultLoggerFactoryConfigSchema,
    create: (input: DefaultLoggerFactoryConfig): Logger => {
        return createLogger({ agentId: input.agentId, config: input.config });
    },
};
