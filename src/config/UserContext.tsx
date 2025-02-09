import * as React from "react";
import { identity, NOTIFICATION_EVENTS } from "@deso-core/identity";

type Props = {
  children?: React.ReactNode;
};

interface UserState {
  currentUser: any;
  alternateUsers: any;
  isLoading: boolean;
}

identity.configure({
  spendingLimitOptions: {
    GlobalDESOLimit: 10000000, // 0.01 DESO
    TransactionCountLimitMap: {
      SUBMIT_POST: "UNLIMITED",
      BASIC_TRANSFER: "UNLIMITED",
    },
  },
});

// This is a simple context that will be used to store and share the state of
// the current user's data. Whether you use react context or redux or something
// else is entirely up to you. The shape of the context is also up to you and
// depends on the specific requirements of your app.
const UserContext = React.createContext({
  currentUser: null,
  alternateUsers: null,
  isLoading: false,
});

const fetchUsers = (keys: string[]) => {
  // We are using native browser fetch here but feel free to use any HTTP client you prefer.
  return fetch("https://node.deso.org/api/v0/get-users-stateless", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      PublicKeysBase58Check: keys,
    }),
  })
    .then((res) => res.json())
    .then(({ UserList }) => UserList);
};

const UserProvider = ({ children }: Props) => {
  const [userState, setUserState] = React.useState<UserState>({
    currentUser: null,
    alternateUsers: null,
    isLoading: true,
  });

  React.useEffect(() => {
    // NOTE: This function could be chatty. You might want to implement some
    // caching or memoization to reduce unnecessary network calls. We have not
    // done so here for simplicity and to reduce noise from the example.
    identity.subscribe(({ event, currentUser, alternateUsers }) => {
      // The event property tells us what triggered the subscription callback.
      // The authorize derived key flow is a multi-step asynchronous process. We can use the start
      // of this to set our loading state. Once the flow is complete, the end event will be triggered
      // and subscribe will be called again with the new user state. You can see an exhaustive list of
      // events here: https://github.com/deso-protocol/deso-workspace/blob/main/libs/identity/src/lib/types.ts#L182
      // You can filter on any of these events to trigger different actions in your app, or choose to ignore
      // some of them.
      if (event === NOTIFICATION_EVENTS.AUTHORIZE_DERIVED_KEY_START) {
        setUserState((state) => ({ ...state, isLoading: true }));
        return;
      }

      // NOTE: You can use this callback to update your app state in any way you want.
      // Here we just use a simple useState hook combined with react context. You can
      // use redux, mobx, or any other state management library you want.

      // If your app supports multiple accounts for a user and the current user logs out,
      // you can choose a fallback user to use as the current user from the alternateUsers
      // object. This is a choice you can make depending on the requirements of your own app.
      // Here we just choose the first alternate user as the fallback user. Alternate users
      // are all users that have been logged in to your app and never logged out.
      if (alternateUsers && !currentUser) {
        const fallbackUser = Object.values(alternateUsers)[0];
        identity.setActiveUser(fallbackUser.publicKey);
        // NOTE: setting the active user will trigger a new state change in
        // identity which will re-trigger this callback so we just return
        // here.
        return;
      }

      if (!currentUser) {
        // if no user is logged in or the user has logged out, set our app user state to null
        // All of our components will re-render and update accordingly
        setUserState((state) => ({
          ...state,
          currentUser: null,
          isLoading: false,
        }));
      } else if (currentUser?.publicKey !== userState.currentUser?.PublicKeyBase58Check) {
        // if the user is logged in, fetch the user's details from a node and set the app user state
        // All of our components will re-render and update accordingly. We also fetch any alternate users
        // we may have stored in local storage.
        const alternateUserKeys = Object.values(alternateUsers ?? {})?.map((u) => u.publicKey) ?? [];

        // We set isLoading to true so that we can show a loading indicator wherever
        // we reference the user state in our app.
        setUserState((state) => ({
          ...state,
          isLoading: true,
        }));

        fetchUsers([currentUser.publicKey, ...alternateUserKeys])
          .then((userList) => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const [currentUser, ...alternateUsers] = userList;
            setUserState((state) => ({
              ...state,
              currentUser,
              alternateUsers,
            }));
          })
          .finally(() =>
            setUserState((state) => ({
              ...state,
              isLoading: false,
            })),
          );
      }
    });
  }, []);

  if (userState.isLoading) return null;
  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
