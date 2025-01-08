const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Métodos expostos ao Renderer process
});
