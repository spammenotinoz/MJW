export const SITE_TITLE = 'Midjourney-Web'
export const SITE_DESC = 'Supercharged Experience For MidJourney On Web UI'

export const MAX_TOKENS = 500
export const RATE_LIMIT_COUNT = 5
export const OPS_URL = 'https://artificin.com/prompt-builder/'
export const GITHUB_ORG_URL = 'https://github.com/ConnectAI-E'

// Read the contents of the file synchronously (you can use asynchronous methods as well)
const fileContent: string = fs.readFileSync('/stats/mjw.stats', 'utf-8');

// Export the file content as a constant string
export const MJW_STATS: string = fileContent;
