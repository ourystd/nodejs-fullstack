import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Alert, { type TAlertTypes } from "$components/alert";
import Loader from "$components/loader";

import AuthService from "../services/auth.service";

const AccountVerificationPage = () => {
  const { confirmationToken } = useParams();
  console.log({ confirmationToken });
  const [processing, setProcessing] = useState(true);
  const [alertState, setAlertState] = useState<{
    show: boolean;
    type: TAlertTypes;
    msg: string;
  }>({
    show: false,
    type: "success",
    msg: "",
  });

  useEffect(() => {
    if (confirmationToken) {
      AuthService.verify(confirmationToken)
        .then((res) => {
          if (res.ok) {
            setAlertState({
              show: true,
              type: "success",
              msg: res.data?.message || "Successfully verified your email",
            });
            setProcessing(false);
          }
        })
        .catch((err) => {
          setAlertState({
            show: true,
            type: "danger",
            msg: "Failed to verify your email",
          });
          setProcessing(false);
          console.error(err);
        });
    }
  }, [confirmationToken]);

  if (processing) {
    return (
      <div className="flex h-screen">
        <div className="flex justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (alertState.show) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <Alert type={alertState.type} msg={alertState.msg} />
        </div>
      </div>
    );
  }

  return null;
};

export default AccountVerificationPage;
