// plugins/LoggerPlugin.js
export const LoggerPlugin = {
  nombre:"logger",
  install(bus) {
    bus.on("*",(event,data)=>console.log(`[${new Date().toISOString()}] ${event}:`,
      typeof data==="object" ? JSON.stringify(data).slice(0,100) : data));
  }
};
