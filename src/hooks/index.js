import {
  useQuery,
  useQueryClient,
  useMutation,
  useQueries,
} from "@tanstack/react-query";
import services from "../services/";

const ENDPOINT = "http://localhost:3001";

const checkStatus = (response) => {
  return useQuery({ queryKey: ["test"], queryFn: services.test });
};

const getAllUsers = (response) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: services.getAllUsers,
  });
};

const getTotalEntries = () => {
  return useQuery({
    queryKey: ["totalEntries"],
    queryFn: () => services.getTotalEntries(),
  });
};

//get all ticket results
const getAllTickets = () => {
  return useQuery({
    queryKey: ["all-tickets"],
    queryFn: services.getAllTickets,
    refetchInterval: 5000,
  });
};

const getTopEntries = (sessionId) => {
  return useQuery({
    queryKey: ["topEntries", { sessionId }],
    queryFn: () => services.getTopEntries(sessionId),
    enabled: !!sessionId,
    refetchInterval: 5000,
  });
};

const createUser = () => {
  return useMutation({
    mutationFn: ({ username, wallet_address }) => {
      return services.createUser({ username, wallet_address });
    },
  });
};

const findUserByWalletAddress = (wallet_address) => {
  return useQuery({
    queryKey: ["users", { wallet_address }],
    queryFn: () => services.findUserByWalletAddress(wallet_address),
    enabled: !!wallet_address,
  });
};

const findOrCreateUserByWalletAddress = (wallet_address, referralAddress) => {
  return useQueryClient({
    queryKey: ["users", { wallet_address, referralAddress }],
    queryFn: services.findUserByWalletAddress(wallet_address).then((res) => {
      if (res.data.message === "User not found") {
        return services.createUser({
          wallet_address,
          referral_address: referralAddress,
        });
      }
      return res.data;
    }),
    enabled: !!wallet_address,
  });
};

const submitUserEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionId,
      userId,
      selected_number,
      total_ticket,
      total_amount,
      referral_address,
      type,
    }) => {
      return services.submitUserEntry({
        sessionId,
        userId,
        selected_number,
        total_ticket,
        total_amount,
        referral_address,
        type,
      });
    },
    onSuccess: () => {
      console.log("success");
    },

    onError: (error) => {
      console.log("error", error);
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["submitUserEntry"] });
      }
    },
  });
};

//get user entries history
const getUserEntriesHistory = (walletAddress) => {
  return useQuery({
    queryKey: ["userEntriesHistory", { walletAddress }],
    queryFn: () => services.getUserEntriesHistory(walletAddress),
    enabled: !!walletAddress,
    refetchInterval: 5000,
  });
};

//get user referral
const getUserReferral = (walletAddress) => {
  return useQuery({
    queryKey: ["userReferral", { walletAddress }],
    queryFn: () => services.getUserReferral(walletAddress),
    enabled: !!walletAddress,
  });
};

const connectTwitter = () => {
  return useMutation({
    mutationFn: () => services.connectTwitter(),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const updateUserDetails = () => {
  return useMutation({
    mutationFn: ({ walletAddress, twitter_handle, twitter_pic }) => {
      return services.updateUserDetails({
        walletAddress,
        twitter_handle,
        twitter_pic,
      });
    },
  });
};

const getUserProfile = (walletAddress) => {
  return useQuery({
    queryKey: ["userProfile", { walletAddress }],
    queryFn: () => services.getUserProfile(walletAddress),
    enabled: !!walletAddress,
  });
};

export {
  checkStatus,
  getAllUsers,
  getTotalEntries,
  getAllTickets,
  createUser,
  findUserByWalletAddress,
  findOrCreateUserByWalletAddress,
  getTopEntries,
  submitUserEntry,
  getUserEntriesHistory,
  getUserReferral,
  connectTwitter,
  updateUserDetails,
  getUserProfile,
};
