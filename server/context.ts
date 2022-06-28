import * as trpc from "@trpc/server";

// Helper function to create a router with your auth app context
export function createRouter() {
  return trpc.router();
}
