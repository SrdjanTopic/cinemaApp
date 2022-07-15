import userService from "../../services/User.service";
import { useParams } from "react-router-dom";
import Message, { MessageProps } from "../../components/shared/Message/Message";
import { useEffect, useState } from "react";

const AccountVerification = () => {
  const params = useParams();
  const verificationToken: string | undefined = params.verificationToken;

  const [messageData, setMessageData] = useState<MessageProps>({
    type: "success",
    message: "verifying account...!",
  });

  useEffect(() => {
    if (verificationToken) {
      userService
        .verifyUser(verificationToken)
        .then(() => {
          setMessageData({
            type: "success",
            message: "Account successfully verified!",
          });
        })
        .catch((e) => {
          setMessageData({
            type: "error",
            message: e.response.data,
          });
        });
    }
  }, []);

  return <Message message={messageData.message} type={messageData.type} />;
};
export default AccountVerification;
