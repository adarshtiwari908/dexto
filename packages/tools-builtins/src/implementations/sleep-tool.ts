import { z } from 'zod';
import { createLocalToolCallHeader, defineTool } from '@dexto/core';
import type { Tool, ToolExecutionContext } from '@dexto/core';

const SleepInputSchema = z.strictObject({
    ms: z.int().positive().max(600000).describe('Milliseconds to sleep (max 10 minutes)'),
});

/**
 * Internal tool for sleeping/delaying execution.
 */
export function createSleepTool(): Tool<typeof SleepInputSchema> {
    return defineTool({
        id: 'sleep',
        description: 'Pause execution for a specified number of milliseconds.',
        inputSchema: SleepInputSchema,
        presentation: {
            describeHeader: (input) =>
                createLocalToolCallHeader({
                    title: 'Sleep',
                    argsText: `${input.ms}ms`,
                }),
        },
        async execute(input, _context: ToolExecutionContext) {
            const { ms } = input;
            await new Promise((resolve) => setTimeout(resolve, ms));
            return { sleptMs: ms };
        },
    });
}
