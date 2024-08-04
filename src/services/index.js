import axios from "axios";

// const ENDPOINT = "https://api.dragoorbz.com";
// const ENDPOINT = "http://localhost:3001";
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;

class Services {
  test() {
    return axios.get(`${ENDPOINT}`);
  }

  //get all users
  async getAllUsers() {
    return await axios.get(`${ENDPOINT}/users`);
  }

  //get total entires
  async getTotalEntries() {
    return await axios.get(`${ENDPOINT}/user-entries/total-entries`);
  }

  //get all tickets results
  async getAllTickets() {
    return await axios.get(`${ENDPOINT}/ticket-results/`);
  }

  async createUser({ username, wallet_address, referral }) {
    const res = await axios.post(`${ENDPOINT}/users`, {
      username,
      wallet_address,
      referral_address: referral,
    });
    return res;
  }

  async findUserByWalletAddress(wallet_address) {
    return await axios.get(`${ENDPOINT}/users/${wallet_address}`);
  }

  async getTopEntries(sessionId) {
    return await axios.get(`${ENDPOINT}/user-entries/top-entries/${sessionId}`);
  }

  async submitUserEntry({
    sessionId,
    userId,
    selected_number,
    total_ticket,
    total_amount,
    referral_address,
    type,
  }) {
    return await axios.post(`${ENDPOINT}/user-entries`, {
      sessionId,
      userId,
      selected_number,
      total_ticket,
      total_amount,
      referral_address,
      type,
    });
  }

  //get user entries history
  async getUserEntriesHistory(wallet_address) {
    return await axios.get(
      `${ENDPOINT}/user-entries/history/${wallet_address}`
    );
  }

  //get user referral
  async getUserReferral(wallet_address) {
    return await axios.post(`${ENDPOINT}/users/${wallet_address}`);
  }

  async connectTwitter() {
    return await axios.get(`${ENDPOINT}/auth/twitter`);
  }

  async validateTwitter() {
    return await axios.get(`${ENDPOINT}/auth/twitter/callback`, {
      oauth_token,
      oauth_verifier,
    });
  }

  async updateUserDetails({ walletAddress, twitter_handle, twitter_pic }) {
    const res = await axios.put(`${ENDPOINT}/users/`, {
      walletAddress,
      twitter_handle,
      twitter_pic,
    });

    return res;
  }

  async getUserProfile(walletAddress) {
    return await axios.get(`${ENDPOINT}/users/${walletAddress}`);
  }
}

export default new Services();
