const channel = new BroadcastChannel("pglite-sync");

export function broadcastChange(message: { type: string; payload?: any }) {
  channel.postMessage(message);
}

export function listenToChanges(
  callback: (message: { type: string; payload?: any }) => void
) {
  channel.onmessage = (event) => {
    callback(event.data);
  };
}
