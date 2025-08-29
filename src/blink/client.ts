import { createClient } from "@blinkdotnew/sdk";

const blink = createClient({
  projectId: "lynkz-link-shortener-dashboard-2qwzl2ps",
  authRequired: false, // Will be enabled per component as needed
});

export default blink;
