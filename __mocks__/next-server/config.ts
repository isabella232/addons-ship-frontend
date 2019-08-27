export default jest.fn(() => ({
  publicRuntimeConfig: {
    SHIP_API_URL: 'api.ship.url',
    APP_BASE_URL: 'ship.url',
    SEGMENT_WRITE_KEY: 'segment-key',
    POLL_INTERVAL: 1000
  }
}));
