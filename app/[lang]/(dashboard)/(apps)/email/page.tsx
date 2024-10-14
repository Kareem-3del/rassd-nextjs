import React from "react";

import Mail from "./components/mail";
import { cookies } from "next/headers";
import { getEmails } from "@/config/email.config";
import { accounts } from "./data";
const EmailPage = async () => {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  const contacts = {}
  const mails = await getEmails();

  return (
    <Mail
      accounts={accounts}
      mails={mails?.data}
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={4}
      contacts={contacts}
    />
  );
};

export default EmailPage;
