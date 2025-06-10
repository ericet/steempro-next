import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";
import SAvatar from "./SAvatar";
import { useAppDispatch, useAppSelector } from "@/constants/AppFunctions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useLogin } from "./auth/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { withdrawVesting } from "@/libs/steem/condenser";
import { saveLoginHandler } from "@/hooks/redux/reducers/LoginReducer";
import { getCredentials, getSessionKey } from "@/utils/user";
import moment from "moment";
import { isNumeric } from "@/utils/helper";
import { Slider } from "@heroui/slider";
import { steemToVest, vestToSteem } from "@/utils/helper/vesting";
import KeychainButton from "./KeychainButton";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  cancel?: boolean;
}

const PowerDownModal = (props: Props): React.ReactNode => {
  const { cancel, isOpen, onOpenChange } = props;
  const loginInfo = useAppSelector((state) => state.loginReducer.value);
  const globalData = useAppSelector((state) => state.steemGlobalsReducer.value);
  const dispatch = useAppDispatch();
  const [confirmCheck, setConfirmCheck] = useState(cancel || false);
  const { data: session } = useSession();
  const { authenticateUser, isAuthorized } = useLogin();
  const [amount, setAmount] = useState(cancel ? "0" : "");

  const availableBalance = vestToSteem(
    loginInfo.vests_own - loginInfo.vests_out - loginInfo.powerdown +loginInfo.powerdown_done,
    globalData.steem_per_share 
  );

  const withdrawMutation = useMutation({
    mutationFn: (data: { key: string; amount: number; isKeychain?: boolean }) =>
      withdrawVesting(
        loginInfo,
        data.key,
        data.amount,
        data.isKeychain,
        globalData
      ),
    onSettled(data, error, variables, context) {
      if (error) {
        toast.error(error.message || JSON.stringify(error));
        return;
      }

      const withdrawVests = steemToVest(
        variables.amount,
        globalData.steem_per_share
      );

      dispatch(
        saveLoginHandler({
          ...loginInfo,
          powerdown: withdrawVests,
          next_powerdown: cancel ? 0 : moment().add(7, "days").unix(),
          powerdown_rate: cancel ? 0 : Number(withdrawVests) / 4,
        })
      );

      onOpenChange(false);
      if (cancel) toast.success(`Power down canceled`);
      else
        toast.success(
          `${variables.amount?.toLocaleString()} Steem power down started`
        );
    },
  });

  async function handleWithdraw(isKeychain?: boolean) {
    if (!isNumeric(amount)) {
      toast.info("Invalid amount");
      return;
    }
    if (!cancel && Number(amount) < 0.001) {
      toast.info("Use only 3 digits of precison");
      return;
    }

    if (Number(amount) > availableBalance) {
      toast.info("Insufficient funds");
      return;
    }

    if (!isKeychain) {
      authenticateUser();
      if (!isAuthorized()) {
        return;
      }
    }

    const credentials = getCredentials(getSessionKey(session?.user?.name));
    if (!credentials?.key) {
      toast.error("Invalid credentials");
      return;
    }

    withdrawMutation.mutate({
      key: credentials?.key ?? "",
      amount: cancel ? 0 : Number(amount),
      isKeychain: isKeychain || credentials.keychainLogin,
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      hideCloseButton
      isDismissable={false}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {cancel ? "Cancel Power Down" : "" + "Power Down"}
            </ModalHeader>
            <ModalBody className=" flex flex-col gap-6">
              <div className="flex flex-col gap-4 items-start">
                <Slider
                  label="Amount"
                  radius="lg"
                  step={0.001}
                  showTooltip
                  isDisabled={cancel}
                  value={Number(amount)}
                  maxValue={availableBalance}
                  minValue={0}
                  defaultValue={cancel ? 0 : 0.1}
                  onChange={(value) => setAmount(String(value))}
                  className="max-w-md"
                  marks={[
                    {
                      value: availableBalance * 0.25,
                      label: "25%",
                    },
                    {
                      value: availableBalance * 0.5,
                      label: "50%",
                    },
                    {
                      value: availableBalance * 0.8,
                      label: "80%",
                    },
                  ]}
                />

                <Input
                  label="Amount"
                  size="sm"
                  isDisabled={cancel}
                  isRequired
                  value={amount}
                  onValueChange={setAmount}
                  endContent={<SAvatar size="xs" username={loginInfo.name} />}
                />

                {!!loginInfo.powerdown && (
                  <p className="text-tiny text-justify">
                    {`You're currently powering down ${vestToSteem(
                      loginInfo.powerdown,
                      globalData.steem_per_share
                    )?.toLocaleString()} STEEM, 
                                with ${vestToSteem(
                                  loginInfo.powerdown_done,
                                  globalData.steem_per_share
                                )?.toLocaleString()} STEEM paid out so far. 
                                Changing the power down amount will reset the payout schedule.`}
                  </p>
                )}

                {!!loginInfo.vests_out && (
                  <p className="text-tiny  text-justify">
                    {`You're delegating ${vestToSteem(
                      loginInfo.vests_out,
                      globalData.steem_per_share
                    )?.toLocaleString()} STEEM. 
                                This amount is locked and can't be powered down until the delegation is removed, which takes 5 days.`}
                  </p>
                )}

                {parseFloat(amount) > availableBalance - 5 && (
                  <p className="text-tiny text-justify text-red-400">
                    {`Leaving less than 5 STEEM POWER in your account is not recommended and can leave your account in a unusable state.`}
                  </p>
                )}
              </div>

              <Checkbox
                size="sm"
                isSelected={confirmCheck}
                isDisabled={withdrawMutation.isPending}
                onValueChange={setConfirmCheck}
              >
                Confirm {(cancel ? "Cancel " : "") + "Power Down"}
              </Checkbox>
            </ModalBody>
            <ModalFooter className=" justify-between">
              <KeychainButton
                onPress={() => handleWithdraw(true)}
                isDisabled={!confirmCheck || withdrawMutation.isPending}
              />

              <div className=" flex items-center gap-2">
                <Button
                  size="sm"
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  isDisabled={withdrawMutation.isPending}
                >
                  Close
                </Button>

                <Button
                  size="sm"
                  color="primary"
                  onPress={() => handleWithdraw()}
                  isLoading={withdrawMutation.isPending}
                  isDisabled={!confirmCheck || withdrawMutation.isPending}
                >
                  {(cancel ? "Cancel " : "") + "Power Down"}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PowerDownModal;
