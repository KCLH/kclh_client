import { withAuth } from "@/components/withAuth";

import MyAccountUI from "@/components/myAccount/myAccount.presenter";

function MyAccountContainer() {
  return <MyAccountUI />;
}

export default withAuth(MyAccountContainer);
