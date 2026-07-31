// Initialize Appwrite
const client = new Appwrite.Client();
client
  .setEndpoint("https://syd.cloud.appwrite.io/v1")
  .setProject("6a651d6c001ab0a52204");

const account = new Appwrite.Account(client);

async function signup(email, password) {
  try {
    const user = await account.create("unique()", email, password);
    console.log("✅ User created:", user);
    return user;
  } catch (err) {
    console.error("❌ Error:", err.message);
    throw err;
  }
}

async function login(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log("✅ Logged in:", session);
    return session;
  } catch (err) {
    console.error("❌ Error:", err.message);
    throw err;
  }
}

async function logout() {
  try {
    await account.deleteSession("current");
    console.log("✅ Logged out");
  } catch (err) {
    console.error("❌ Error:", err.message);
    throw err;
  }
}

async function getCurrentUser() {
  try {
    const user = await account.get();
    console.log("✅ User:", user);
    return user;
  } catch (err) {
    console.error("❌ Not logged in");
    return null;
  }
}
