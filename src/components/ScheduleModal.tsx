import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import React, { useState } from "react";
import { DatePicker } from "@heroui/date-picker";
import { now, getLocalTimeZone, ZonedDateTime } from "@internationalized/date";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onDateTimeChange: (datetime: ZonedDateTime | null) => void;
  startTime?: ZonedDateTime;
}
export default function ScheduleModal(props: Props) {
  const { isOpen, onOpenChange } = props;
  const [dateTime, setDateTime] = useState<ZonedDateTime | null>(
    props.startTime ?? now(getLocalTimeZone()).add({ minutes: 1 })
  );

  function handleConfirm() {
    props.onDateTimeChange(dateTime);
    onOpenChange(false);
  }

  return (
    <Modal isOpen={isOpen} hideCloseButton onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Select Date and Time
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <DatePicker
                  label="Select Date and Time"
                  variant="flat"
                  hourCycle={24}
                  hideTimeZone
                  value={dateTime}
                  onChange={setDateTime}
                  minValue={now(getLocalTimeZone()) as any}
                  showMonthAndYearPickers
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleConfirm}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
